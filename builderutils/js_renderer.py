#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import builderutils.logger as logger
import builderutils.renderer as renderer


class JSRenderer(object):
    def __init__(self, htmlTemplate, jsTemplate,
                 userConfig, renderProjectPath, renderRoot="/tmp/buidler"):
        self.htmlTemplate = htmlTemplate
        self.jsTemplate = jsTemplate
        self.renderObj = userConfig
        self.renderProjectPath = renderProjectPath
        self.renderRoot = renderRoot
        self.renderer = renderer.Renderer()

        # Setup logging
        builderLogger = logger.BuilderLogger(name=__name__)
        self.logger = builderLogger.logger


    def renderJSComponents(self):
        self.logger.debug("Render JS components")

        htmlTemplate = self.htmlTemplate
        htmlComponents = self.renderObj['components']['html']
        self.logger.debug("HTML Components: %s ", htmlComponents)

        renderedData = ''

        for viewName, htmlInfo in htmlComponents.items():
            # We need to go through and add components here
            for component, componentInfo in htmlInfo['components'].items():
                componentInfo['id'] = component
                print "Component: ", componentInfo
                if componentInfo['type'] == "button":
                    renderedData += self.renderer.render_j2_template_string(
                        self.jsTemplate['event_handler'], componentInfo)

        print "JS Rendered data: ", renderedData
        # Create a html file

        fileName = "eventhandler.js"

        filePath = os.path.join(self.renderProjectPath, "static/js")
        filePath = os.path.join(filePath, fileName)
        print "File path: ", filePath
        print "Rendered data: ", renderedData

        with open(filePath, 'w') as fHandle:
            fHandle.write(renderedData)

