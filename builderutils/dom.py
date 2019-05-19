#!/usr/bin/env python

import builderutils.logger as logger

SAMPLE_DOM = {
    "tag": "<html>",
    "endtag": "</html>",
    "children": [
        {
            "tag": "<head>",
            "endtag": "</head>"
        },
        {
            "tag": "<body>",
            "endtag": "</body>",
            "children": [
                {
                    "tag": "<div class='container'>",
                    "endtag": "</div>",
                    "children": [
                        {
                            "tag": "<div>",
                            "endtag": "</div>",
                            "type": "text",
                            "loc": {
                                "row": 0,
                                "column": 0,
                                "column_size": 3
                            },
                            "text": "This is a test"
                        },
                        {
                            "tag": "<div>",
                            "endtag": "</div>",
                            "type": "text",
                            "loc": {
                                "row": 1,
                                "column": 0,
                                "column_size": 3
                            },
                            "text": "This is a second test"
                        }
                    ]
            ]
        }
    ]
}

class DomManager(object):
    def __init__(self, userConfig):
        self.domTree = {}
        self.userConfig = userConfig

    def buildDomTree(self):
        print("user config: ", self.userConfig)
        # Add root element
        element = {}
        element["tag"] = "<html>"
        element["endtag"] = "</html>"
        self.domTree["root"] = element
        self.domTree["root"]["children"] = []

        # Add children
        element = {}
        element["tag"] = "<head>"
        element["endtag"] = "</head>"
        self.domTree["root"]["children"].append(element)

    @staticmethod
    def parseDomTree(root):
        print(root["tag"])
        if "children" in root:
            for child in root["children"]:
                #print("Child: ", child)
                DomManager.parseDomTree(child)
        print(root['endtag'])


