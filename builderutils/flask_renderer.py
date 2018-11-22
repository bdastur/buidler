#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import shutil
import jinja2
import builderutils.logger as logger
import builderutils.parser as parser
import builderutils.renderer as renderer
import builderutils.html_renderer as html_renderer


class FlaskRenderer(object):
    def __init__(self, configFile, templateRoot="./templates"):
        self.initialized = False
        self.renderRoot = "/tmp/builder"

        # Initialize logging
        builderLogger = logger.BuilderLogger(name=__name__)
        self.logger = builderLogger.logger

        if configFile is None:
            self.logger.error("Config file is None")
            return

        if not os.path.exists(configFile):
            self.logger.error("Config file [%s] does not exists" % configFile)
            return

        if not os.path.exists(templateRoot):
            self.logger.error("No flask templates at %s" % templateRoot)
            return

        # Parse our templates
        self.parserObj = parser.BuilderParser(configFile,
                                              templateRoot=templateRoot)
        if self.parserObj.initialized is not True:
            self.logger.error("Could not Parse config or templates!")
            return

        if self.setupStagingEnvironment() != 0:
            self.logger.error("Failed to setup Staging Environment!")
            return

        self.initialized = True

    def getUserConfig(self):
        return self.parserObj.getUserConfig()

    def getFlaskTemplate(self):
        return self.parserObj.getFlaskTemplate()

    def getHTMLTemplate(self):
        return self.parserObj.getHTMLTemplate()

    def setupStagingEnvironment(self):
        ''' Createe a staging environment

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        # Validate input
        userConfig = self.parserObj.parsedData.get('user_config', None)
        if userConfig is None:
            self.logger.error("user_config is Empty!")
            return -1

        app_type = self.parserObj.parsedData['user_config'].get('app_type', None)
        if app_type is None:
            self.logger.error("Could not find app_type in user config!")
            return -1

        if app_type != "flask":
            self.logger.error("app_type should be flask")
            return -1

        return self.__setupStagingDirectories()


    def __setupStagingDirectories(self):
        ''' Setup Flask Environment

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        renderRoot = self.renderRoot
        if not os.path.exists(renderRoot):
            try:
                os.mkdir(renderRoot)
            except OSError as err:
                self.logger.error("Failed to create folder %s", renderRoot)
                return -1

        renderObj = self.parserObj.parsedData

        self.renderProjectPath = os.path.join(renderRoot,
                                         renderObj['user_config']['app_name'])
        if not os.path.exists(self.renderProjectPath):
            os.mkdir(self.renderProjectPath)

        templatesDir = os.path.join(self.renderProjectPath, 'templates')
        staticDir = os.path.join(self.renderProjectPath, 'static')
        jsDir = os.path.join(staticDir, 'js')
        cssDir = os.path.join(staticDir, 'css')

        if not os.path.exists(templatesDir):
            os.mkdir(templatesDir)

        if not os.path.exists(staticDir):
            os.mkdir(staticDir)

        if not os.path.exists(jsDir):
            os.mkdir(jsDir)

        if not os.path.exists(cssDir):
            os.mkdir(cssDir)

        return 0

    def renderFlaskApplication(self):
        ''' Render the Flask application
        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        self.renderer = renderer.Renderer()

        userConfig = self.parserObj.parsedData['user_config']
        htmlTemplate = self.parserObj.parsedData['html_template']

        self.htmlRenderer = html_renderer.HTMLRenderer(
            htmlTemplate, userConfig, self.renderProjectPath, self.renderRoot)

        self.renderFlaskPythonApplication()

        self.htmlRenderer.buildHTMLDocument()

    def renderFlaskPythonApplication(self):
        flaskTemplate = self.parserObj.parsedData['flask_template']
        renderObj = self.parserObj.parsedData['user_config']

        appInfo = renderObj['components']['app']
        flaskRoutes = appInfo['routes']

        print "app info: ", appInfo
        print "flask Routes: ", flaskRoutes

        renderedData = ""
        # Header
        flaskTmpl = flaskTemplate['header']
        renderedData += self.renderer.render_j2_template_string(flaskTmpl,
                                                       appInfo)

        # Flask Imports
        flaskTmpl = flaskTemplate['imports']
        renderedData += self.renderer.render_j2_template_string(flaskTmpl,
                                                       appInfo)

        # Flask App initialization
        flaskTmpl = flaskTemplate['app_init']
        renderedData += self.renderer.render_j2_template_string(flaskTmpl,
                                                       appInfo)

        # Flask routes
        for routeName, routeInfo in flaskRoutes.items():
            print "routename: ", routeName, routeInfo
            flaskTmpl = flaskTemplate['app_route']
            renderedData += self.renderer.render_j2_template_string(flaskTmpl,
                                                       routeInfo)

        # Flask Run
        flaskTmpl = flaskTemplate['app_run']
        renderedData += self.renderer.render_j2_template_string(flaskTmpl,
                                                       appInfo)
        print renderedData

        # Create a html file
        fileName = "app.py"
        print "File name to create: ", fileName

        filePath = os.path.join(self.renderProjectPath, fileName)
        print "File path: ", filePath
        with open(filePath, 'w') as fHandle:
            fHandle.write(renderedData)


