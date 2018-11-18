#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import shutil
import jinja2


class FlaskRenderer(object):
    def __init__(self):
        pass

    def setup_environment(self, renderRoot, renderObj):
        ''' Setup Flask Environment

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        renderProjectPath = os.path.join(renderRoot,
                                         renderObj['user_config']['app_name'])
        if not os.path.exists(renderProjectPath):
            os.mkdir(renderProjectPath)

        templatesDir = os.path.join(renderProjectPath, 'templates')
        staticDir = os.path.join(renderProjectPath, 'static')
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

        return renderProjectPath



class Renderer(object):
    def __init__(self):
        self.projectStagingDir = ""

    def build_staging_environment(self, renderObj):
        ''' Build a new staging path where code gets rendered.

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        renderRoot = "/tmp/builder"
        if not os.path.exists(renderRoot):
            os.mkdir(renderRoot)

        if renderObj['user_config']['app_type'] == 'flask':
            flaskRenderer = FlaskRenderer()
            self.projectStagingDir = flaskRenderer.setup_environment(
                renderRoot, renderObj)


    def render_j2_template(self, templateFile, searchPath,
                           renderObj):
        ''' The API will render a Jinja2 template

        :type  templateFile:  String
        :param templateFile: Name of the template file

        :type  searchPath: String
        :param searchPath: Path to the templates directory

        :type  renderObj:  dict
        :param renderObj: Dictionary object to substitute the template vars

        :returns:
        '''
        template_loader = jinja2.FileSystemLoader(searchpath=searchpath)
        env = jinja2.Environment(loader=template_loader,
                                 trim_blocks=True,
                                 lstrip_blocks=True)
        template = env.get_template(templateFile)
        renderedData = template.render(renderObj)

        return renderedData

    def render_j2_template_string(self, templateString, renderObj):
        ''' one line description

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        env = jinja2.Environment(loader=jinja2.BaseLoader,
                                 trim_blocks=True,
                                 lstrip_blocks=True)
        template = env.from_string(templateString)
        renderedData = template.render(renderObj)
        return renderedData

    def build_html_documents(self, htmlTemplate, renderObj):
        ''' one line description

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        htmlComponents = renderObj['components']['html']
        print "html components: ", htmlComponents

        for viewName, htmlInfo in htmlComponents.items():
            renderedData = ""
            # Header
            headerTemplate = htmlTemplate['header']
            renderedData += self.render_j2_template_string(headerTemplate,
                                                            htmlInfo)

            # Head
            headTemplate = htmlTemplate['head']
            renderedData += self.render_j2_template_string(headTemplate,
                                                            htmlInfo)

            # Head End
            renderedData += "</head>\n"

            # Body
            bodyTemplate = htmlTemplate['body']
            print "Body template: ", bodyTemplate
            renderedData += self.render_j2_template_string(bodyTemplate,
                                                        htmlInfo)

            # Body end
            renderedData += "</body>\n"

            # HTML End
            renderedData += "</html>\n"
            print "RenderedData: ", renderedData

            # Create a html file
            print renderObj['components']

            fileName = htmlInfo.get('file_name', viewName + ".html")
            print "File name to create: ", fileName

            filePath = os.path.join(self.projectStagingDir, "templates")
            filePath = os.path.join(filePath, fileName)
            print "File path: ", filePath
            print "Rendered data: ", renderedData

            with open(filePath, 'w') as fHandle:
                fHandle.write(renderedData)

            # Copy static resources
            self.build_static_resources(renderObj)

    def build_static_resources(self, renderObj):
        ''' Static JS, CSS resource creation

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        staticFilePath = os.path.join(self.projectStagingDir, "static")


        # Copy CSS Resources
        if os.path.exists(staticFilePath):
            shutil.rmtree(staticFilePath)

        try:
            shutil.copytree(renderObj['static_dir'], staticFilePath)
        except Exception as e:
            print "Directory not copied. ", e



    def build_flask_app(self, flaskTemplate, renderObj):
        ''' one line description

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        appInfo = renderObj['components']['app']
        flaskRoutes = appInfo['routes']

        print "app info: ", appInfo
        print "flask Routes: ", flaskRoutes

        renderedData = ""
        # Header
        flaskTmpl = flaskTemplate['header']
        renderedData += self.render_j2_template_string(flaskTmpl,
                                                       appInfo)

        # Flask Imports
        flaskTmpl = flaskTemplate['imports']
        renderedData += self.render_j2_template_string(flaskTmpl,
                                                       appInfo)

        # Flask App initialization
        flaskTmpl = flaskTemplate['app_init']
        renderedData += self.render_j2_template_string(flaskTmpl,
                                                       appInfo)

        # Flask routes
        for routeName, routeInfo in flaskRoutes.items():
            print "routename: ", routeName, routeInfo
            flaskTmpl = flaskTemplate['app_route']
            renderedData += self.render_j2_template_string(flaskTmpl,
                                                       routeInfo)

        # Flask Run
        flaskTmpl = flaskTemplate['app_run']
        renderedData += self.render_j2_template_string(flaskTmpl,
                                                       appInfo)
        print renderedData

        # Create a html file
        fileName = "app.py"
        print "File name to create: ", fileName

        filePath = os.path.join(self.projectStagingDir, fileName)
        print "File path: ", filePath
        with open(filePath, 'w') as fHandle:
            fHandle.write(renderedData)



