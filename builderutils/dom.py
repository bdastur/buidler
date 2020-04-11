#!/usr/bin/env python

import builderutils.logger as logger


class DomManager(object):
    def __init__(self, userConfig):
        self.domTree = {}
        self.userConfig = userConfig

    def buildDomTree(self, userConfig):
        print("user config: ", self.userConfig)
        # Add root element
        stylesheets = [
            "../thirdparty/bootstrap-3.3.7-dist/css/bootstrap.min.css"
        ]
        element = {}
        element["element"] = "html"
        self.domTree["root"] = element
        self.domTree["root"]["children"] = {}

        # Add children
        element = {}
        element["element"] = "head"
        self.domTree["root"]["children"]["head"] = element

        # Add stylesheet links
        for stylesheet in stylesheets:
            element = {}
            element["element"] = "link"
            element["rel"] = "stylesheet"
            element["href"] = stylesheet
            self.domTree["root"]["children"]

        print("Dom tree: ", self.domTree)

    def parseDomTree(self, root):
        methodName = "render_{0}_element".format(root['element'])
        try:
            renderFunction = getattr(self, methodName)
            renderedString = renderFunction(root)
            print(renderedString)
        except AttributeError:
            tag = "<" + root["element"] + ">"
            print(tag)

        if "children" in root:
            children = root['children']
            for child in children:
                self.parseDomTree(root['children'][child])
        endtag = "</" + root["element"] + ">"
        print(endtag)

    @staticmethod
    def render_html_element(node):
        tag = "<html>"
        return tag

    @staticmethod
    def render_head_element(node):
        tag = "<head>"
        return tag

    @staticmethod
    def render_link_element(node):
        renderedString = "<{0} rel={1} href=\"{2}\">".format(node["element"], node["rel"], node["href"])
        return renderedString

    @staticmethod
    def render_div_element(node):
        renderedString = "<{0} class={1}>".format(node["element"], node["class"])
        return renderedString

    @staticmethod
    def render_h3_element(node):
        renderedString = "<{0}>{1}".format(node["element"], node["text"])
        return renderedString