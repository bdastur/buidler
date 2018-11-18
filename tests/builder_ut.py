#!/usr/bin/env python
# -*- coding: utf-8 -*-


import unittest
import yaml
import builderutils.parser as parser



class builderUT(unittest.TestCase):
    def createConfigFile(self):
        testConfigFile = "/tmp/testdata.yaml"
        data = {
            "name": "Test definition",
            "app_type": "flask",
            "app_name": "testapplication",
            "components": {
                "html": {
                    "index": {
                        "type": "html",
                        "title": "Simple page",
                        "components": {
                            "basic": "A teest string"
                        }
                    }
                }
            }
        }
        with open(testConfigFile, "w") as outfile:
            yaml.dump(data, outfile, default_flow_style=False)

        return testConfigFile

    def testNone(self):
        print "Empty test!"

    def testParserInitialize(self):
        print "Parser Initialize test"

        # Create a test config file
        configFile = self.createConfigFile()
        parserObj = parser.BuilderParser(configFile, templateRoot="../templates")


