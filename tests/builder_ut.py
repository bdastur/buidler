#!/usr/bin/env python
# -*- coding: utf-8 -*-


import unittest
import yaml
import builderutils.parser as parser
import builderutils.renderer as renderer
import builderutils.flask_renderer as flask_renderer



class BuilderUT(unittest.TestCase):
    def getConfigObject(self, type='default'):
        testData = {}
        testData['default'] = {
            "name": "Test definition",
            "app_type": "flask",
            "app_name": "testapplication",
            "components": {
                "html": {
                    "index": {
                        "type": "html",
                        "title": "Simple page",
                        "components": {
                            "text":  {
                                "type": "string",
                                "data": "A test string"
                            }
                        }
                    }
                },
                "app": {
                    "filename": "app.py",
                    "hostname": "0.0.0.0",
                    "port": 5002,
                    "debug": True,
                    "routes": {
                        "index": {
                            "uri": "/",
                            "methods": ["GET"],
                            "view_filename": "index.html"
                        }
                    }
                }
            }
        }
        return testData[type]

    def createConfigFile(self):
        testConfigFile = "/tmp/testdata.yaml"

        data = self.getConfigObject()
        with open(testConfigFile, "w") as outfile:
            yaml.dump(data, outfile, default_flow_style=False)

        return testConfigFile

    def testNone(self):
        print "Empty test!"

    def testParserInitialize(self):
        print "Parser Initialize test"

        # Valid keys
        dataKeys = ['flask_template', 'user_config', 'html_template']
        # Create a test config file
        configFile = self.createConfigFile()
        parserObj = parser.BuilderParser(configFile,
                                         templateRoot="../templates")
        self.assertTrue(len(parserObj.parsedData) == 3)
        self.assertEqual(parserObj.parsedData.keys(),
                         dataKeys, msg="Unexpected keys!")

    def testRenderHtml(self):
        print "Test basic Rendering."

        # Create a test config file
        configFile = self.createConfigFile()

        # Get ParserObj
        parserObj = parser.BuilderParser(configFile,
                                         templateRoot="../templates")

        renderObj = renderer.Renderer()
        renderObj.build_staging_environment(parserObj.parsedData)

        userConfig = parserObj.parsedData['user_config']
        htmlTemplate = parserObj.parsedData['html_template']
        flaskTemplate = parserObj.parsedData['flask_template']

        renderObj.build_html_documents(htmlTemplate, userConfig)
        renderObj.build_flask_app(flaskTemplate, userConfig)

    def testNewRenderHtml(self):
        print "Test refactored renderer"

        flaskRendererObj = flask_renderer.FlaskRenderer(None)
        self.assertEqual(flaskRendererObj.initialized, False,
                         "Expected initializedFalse")

        # Crete a test config file
        configFile = self.createConfigFile()
        flaskRendererObj = flask_renderer.FlaskRenderer(configFile)

        self.assertEqual(flaskRendererObj.initialized, False,
                         "Exepcted initialized True")

        flaskRendererObj = flask_renderer.FlaskRenderer(configFile,
                                                        templateRoot="../templates")

        self.assertEqual(flaskRendererObj.initialized, True,
                         "Exepcted initialized True")
        flaskRendererObj.renderFlaskApplication()


