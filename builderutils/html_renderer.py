#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import shutil
import builderutils.logger as logger
import builderutils.renderer as renderer


class HTMLRenderer(object):
    def __init__(self, htmlTemplate, renderObject,
                  renderProjectPath,
                 renderRoot="/tmp/builder"):
        # Initialize logging
        builderLogger = logger.BuilderLogger(name=__name__)
        self.logger = builderLogger.logger

        self.htmlTemplate = htmlTemplate
        self.renderObj = renderObject
        self.renderProjectpath = renderProjectPath
        self.renderRoot = renderRoot
        self.renderer = renderer.Renderer()

    def renderHtmlComponent(self, componentInfo):
        ''' Render HTML components

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        self.logger.debug("Render Component: %s", componentInfo['type'])
        renderedComponent = ''
        if componentInfo['type'] == "string":
            renderedComponent += "<p>"
            renderedComponent += componentInfo['data']
            renderedComponent += "</p>"
            renderedComponent += "\n"

            # Component template
            textComponent = self.htmlTemplate['text_component']
            renderedComponent += self.renderer.render_j2_template_string(
                textComponent, componentInfo)

        self.logger.debug("Rendered component: %s", renderedComponent)
        return renderedComponent

    def buildHTMLDocument(self):
        ''' Build HTML documents

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        htmlTemplate = self.htmlTemplate
        htmlComponents = self.renderObj['components']['html']
        self.logger.debug("HTML Components: %s ", htmlComponents)

        for viewName, htmlInfo in htmlComponents.items():
            renderedData = ""
            # Header
            headerTemplate = htmlTemplate['header']
            renderedData += self.renderer.render_j2_template_string(headerTemplate,
                                                            htmlInfo)

            # Head
            headTemplate = htmlTemplate['head']
            renderedData += self.renderer.render_j2_template_string(headTemplate,
                                                            htmlInfo)

            # Head End
            renderedData += "</head>\n"

            # Body
            bodyTemplate = htmlTemplate['body']
            print "Body template: ", bodyTemplate
            renderedData += self.renderer.render_j2_template_string(bodyTemplate,
                                                        htmlInfo)

            # We need to go through and add components here
            # for component, componentInfo in htmlInfo['components'].items():
            #     print "Component >>> ", component
            #     componentInfo['id'] = component
            #     renderedData += self.renderHtmlComponent(componentInfo)

            # Add scripts
            scriptTemplate = htmlTemplate['scripts']
            print "Scripts: ", scriptTemplate
            renderedData += self.renderer.render_j2_template_string(
                scriptTemplate, htmlInfo)

            print "BRD: :::: here add body end."
            # Body end
            renderedData += "test"
            renderedData += "</body>\n"
            print "BRDLLLL    RenderedData: ", renderedData

            # HTML End
            renderedData += "</html>\n"
            print "RenderedData: ", renderedData

            # Create a html file

            fileName = htmlInfo.get('file_name', viewName + ".html")
            print "File name to create: ", fileName

            filePath = os.path.join(self.renderProjectpath, "templates")
            filePath = os.path.join(filePath, fileName)
            print "File path: ", filePath
            print "Rendered data: ", renderedData

            with open(filePath, 'w') as fHandle:
                fHandle.write(renderedData)

            # Copy static resources
            self.buildStaticResources(self.renderObj)

    def buildStaticResources(self, renderObj):
        ''' Static JS, CSS resource creation

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        staticFilePath = os.path.join(self.renderProjectpath, "static")

        # Copy CSS Resources
        if os.path.exists(staticFilePath):
            shutil.rmtree(staticFilePath)

        try:
            shutil.copytree(renderObj['static_dir'], staticFilePath)
        except Exception as e:
            print "Directory not copied. ", e
