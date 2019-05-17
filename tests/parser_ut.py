#!/usr/bin/env python
# -*- coding: utf-8 -*-


import yaml
import unittest
import builderutils.parser as parser


class TestDataHelper(object):
    def __init__(self):
        self.testConfigFile = "/tmp/testdata.yaml"
        self.createConfigFile()

    def getConfigObject(self, type='default'):
        testData = {}
        testData['default'] = {
            "name": "Basic Template definition",
            "app_type": "flask",
            "app_name": "simple_application",
            "components": {
                "box1": {
                    "loc": { "row": 0, "column": 0, "column_size": 12},
                    "type": "string"
                },
                "box2": {
                    "loc": { "row": 1, "column": 0, "column_size": 12},
                    "type": "string"
                }
            }
        }
        return testData[type]

    def createConfigFile(self):

        data = self.getConfigObject()
        with open(self.testConfigFile, "w") as outfile:
            yaml.dump(data, outfile, default_flow_style=False)


class ParserUt(unittest.TestCase):
    def test_parser_basic(self):
        print("Test parser")
        testData = TestDataHelper()

        pobj = parser.ConfigParser(testData.testConfigFile)
        print("Pobj: ", pobj)

