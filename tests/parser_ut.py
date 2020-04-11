#!/usr/bin/env python
# -*- coding: utf-8 -*-


import yaml
import unittest
import yamale
import builderutils.parser as parser
import builderutils.dom as dom


class TestDataHelper(object):
    def __init__(self):
        self.testConfigFile = "/tmp/testdata.yaml"
        self.testDomFile = "/tmp/testdom.yaml"
        self.createConfigFile()

    def getConfigObject(self, type="default"):
        testData = {}
        testData["default"] = {
            "name": "Basic Template definition",
            "app_type": "flask",
            "app_name": "simple_application",
            "components": {
                "html": {
                    "element": "html",
                    "head": {
                        "element": "head",
                        "stylesheets": {
                            "element": "stylesheet",
                            "links": [
                                "../thirdparty/bootstrap-3.3.7-dist/css/bootstrap.min.css",
                                "dummy.css"
                            ]
                        }
                    },
                    "body": {
                        "element": "body",
                        "box1": {
                            "element": "div",
                            "loc": {"row": 0, "column": 0, "column_size": 12},
                            "type": "string",
                        },
                        "box2": {
                            "element": "div",
                            "loc": {"row": 1, "column": 0, "column_size": 12},
                            "type": "string",
                        }
                    }
                }
            },
        }
        return testData[type]

    def getDomObject(self):
        domData = {
           "html": {
               "element": "html",
               "children": {
                   "head": {
                       "element": "head",
                       "children": {
                           "link0": {
                               "element": "link",
                               "rel": "stylesheet",
                               "href": "../thirdparty/bootstrap-3.3.7-dist/css/bootstrap.min.css"
                           }
                       }
                   },
                   "body": {
                       "element": "body",
                       "children": {
                           "div0": {
                               "element": "div",
                               "class": "container-fluid",
                               "children": {
                                   "row0": {
                                       "element": "div",
                                       "class": "row",
                                       "children": {
                                           "col0": {
                                               "element": "div",
                                               "class": "col-sm-12",
                                               "children": {
                                                   "h33": {
                                                       "element": "h3",
                                                       "text": "This is a test"
                                                   }
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                       }
                   }
               }
           }
        }
        return domData

    def createConfigFile(self):
        data = self.getConfigObject()
        with open(self.testConfigFile, "w") as outfile:
            yaml.dump(data, outfile, default_flow_style=False)

        data = self.getDomObject()
        self.domData = data
        with open(self.testDomFile, "w") as outfile:
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

class DomUt(unittest.TestCase):
    def test_dom_parse(self):
        print("Test DOM parse")
        testData = TestDataHelper()
        pobj = parser.ConfigParser(testData.testConfigFile)
        domObj = dom.DomManager(pobj.parsedData)
        domObj.parseDomTree(testData.domData['html'])

    def test_dom_build(self):
        print("Build DOM object")
        testData = TestDataHelper()
        pobj = parser.ConfigParser(testData.testConfigFile)
        domObj = dom.DomManager(pobj.parsedData)
        domObj.buildDomTree(pobj.parsedData)
