#!/usr/bin/env python
# -*- coding: utf-8 -*-


import yaml
import unittest
import yamale
import builderutils.parser as parser


class TestDataHelper(object):
    def __init__(self):
        self.testConfigFile = "/tmp/testdata.yaml"
        self.createConfigFile()

    def getConfigObject(self, type="default"):
        testData = {}
        testData["default"] = {
            "name": "Basic Template definition",
            "app_type": "flask",
            "app_name": "simple_application",
            "components": {
                "box1": {
                    "loc": {"row": 0, "column": 0, "column_size": 12},
                    "type": "string",
                },
                "box2": {
                    "loc": {"row": 1, "column": 0, "column_size": 12},
                    "type": "string",
                },
            },
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
        self.assertTrue(
            pobj.validated is True, "Parser utils not initialized successfully!"
        )
        print("Pobj: ", pobj)

    def test_yamale_basic(self):
        schema = yamale.make_schema("../configs/schema.yaml")
        data = TestDataHelper()
        data = yamale.make_data("/tmp/testdata.yaml", parser="ruamel")
        yamale.validate(schema, data)
