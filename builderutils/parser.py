#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import yaml
import yamale
import builderutils.logger as logger


class ConfigParser(object):
    BUILDER_CONFIG = "/etc/builder/builder.yaml"

    def __init__(self, configFile):
        pLogger = logger.BuilderLogger(name=__name__)
        self.logger = pLogger.logger
        self.logger.info("Initialize Config Parser!")
        self.validated = False

        # Parse builder config
        self.builderConfig = {}
        self.builderConfig, err = self.parse_yaml_config(ConfigParser.BUILDER_CONFIG)
        if err != 0:
            self.logger.error(
                "Failed to parse builder config {0}".format(ConfigParser.BUILDER_CONFIG)
            )
            return

        self.schema = self.builderConfig.get("schema", None)
        if self.schema is None:
            self.logger.error(
                "Require schema to be defined in builder config {0}".format(
                    ConfigParser.BUILDER_CONFIG
                )
            )
            return

        # Validate input
        if configFile is None:
            self.logger.error("Config File is not valid")
            return
        if not os.path.exists(configFile):
            self.logger.error("ConfigFile %s not found", configFile)
            return

        if not os.path.exists(self.schema):
            self.logger.error("Schema %s not found", self.schema)
            return

        self.parsedData = {}
        self.parsedData["user_config"], err = self.parse_yaml_config(configFile)
        self.validated = True
        self.logger.info("Parser Initialized!")

    def __repr__(self):
        userData = self.parsedData["user_config"]
        app_name = userData["app_name"]
        app_type = userData["app_type"]

        print("app name: ", app_name)
        print("app type: ", app_type)

        repr_string = (
            "User Configuration: \n"
            + "   Application name: {0} \n Application type: {1} \n".format(
                app_name, app_type
            )
        )

        repr_string = repr_string + "   Components: \n"
        for componentName in userData["components"]:
            component = userData["components"][componentName]
            repr_string += "      Component: {0} \n      Location: Row: {1}, Col: {2}, Size: {3} \n".format(
                componentName,
                component["loc"]["row"],
                component["loc"]["column"],
                component["loc"]["column_size"],
            )

        return str(repr_string)

    def parse_yaml_config(self, configFile):
        with open(configFile, "r") as fHandle:
            try:
                parsedData = yaml.safe_load(fHandle)
            except yaml.YAMLError as error:
                print("Failed to parse builde cofig %s [%s]" % (configFile, error))
                return None, 1

        return parsedData, 0


class TemplateParser(object):
    def __init__(self):
        pass



class BuilderParser(object):
    def __init__(self, configFile, templateRoot="./templates"):

        self.initialized = False
        # Initialize Logger
        builderLogger = logger.BuilderLogger(name=__name__)
        self.logger = builderLogger.logger
        if configFile is None:
            self.logger.error("Config file is None!")
            return

        self.logger.debug("Template Root: %s" % templateRoot)

        if not os.path.exists(configFile):
            self.logger.error("Config file [%s] does not exist", configFile)
            return

        # Get Static dir path
        staticDir = os.path.join(os.path.dirname(templateRoot), "static")
        if not os.path.exists(staticDir):
            print("Static folder not found")
            self.logger.error("Static templates [%s] not found", staticDir)
            return

        self.parsedData = {}
        self.parsedData["user_config"], err = self.parse_yaml_config(configFile)
        self.parsedData["user_config"]["static_dir"] = staticDir
        if err != 0:
            print("Failed to parse config %s" % configFile)
            return
        self.parsedData["html_template"], err = self.parse_html_template(
            templateRoot=templateRoot
        )
        if err != 0:
            print("Failed to parse html template %s" % configFile)
            return

        self.parsedData["flask_template"], err = self.parse_flask_template(
            templateRoot=templateRoot
        )
        if err != 0:
            print("Failed to parse flask template %s" % configFile)
            return

        self.parsedData["js_template"], err = self.parseJSTemplates(
            templateRoot=templateRoot
        )
        if err != 0:
            print("Failed to parse js template %s" % configFile)
            return

        self.initialized = True
        self.logger.debug("Parser initialized. Parsed data: %s", self.parsedData)

    def parse_yaml_config(self, configFile):
        with open(configFile, "r") as fHandle:
            try:
                parsedData = yaml.safe_load(fHandle)
            except yaml.YAMLError as error:
                print("Failed to parse builde cofig %s [%s]" % (configFile, error))
                return None, 1

        return parsedData, 0

    def read_template_file(self, templateRoot, fileName):
        """ one line description

        :type  argument:  data type
        :param  argument:  description

        :returns:
        """
        filePath = os.path.join(templateRoot, fileName)
        with open(filePath, "r") as fHandle:
            data = fHandle.read()
        return data

    def parse_html_template(self, templateRoot="./templates"):
        """ Parse html template

        :type  argument:  data type
        :param  argument:  description

        :returns:
        """
        htmlTemplateRoot = os.path.join(templateRoot, "html")
        html_section = {}
        html_section["doctype"] = self.read_template_file(
            htmlTemplateRoot, "doctype.j2"
        )
        html_section["header"] = self.read_template_file(
            htmlTemplateRoot, "html_header.j2"
        )
        html_section["head"] = self.read_template_file(htmlTemplateRoot, "html_head.j2")
        html_section["body"] = self.read_template_file(htmlTemplateRoot, "html_body.j2")
        html_section["scripts"] = self.read_template_file(
            htmlTemplateRoot, "html_scripts.j2"
        )
        # Add component templates
        html_section["text_component"] = self.read_template_file(
            htmlTemplateRoot, "component_text.j2"
        )

        html_section["button_component"] = self.read_template_file(
            htmlTemplateRoot, "component_button.j2"
        )

        return html_section, 0

    def parseJSTemplates(self, templateRoot="./templates"):
        """ parse JS templates

        :type  templateRoot: string
        :param  templateRoot:  Path to the templates

        :returns:
        """
        jsTemplateRoot = os.path.join(templateRoot, "js")
        js_section = {}
        js_section["event_handler"] = self.read_template_file(
            jsTemplateRoot, "eventhandler.js.j2"
        )

        return js_section, 0

    def parse_flask_template(self, templateRoot="./templates"):
        """ Parse flask templates

        :type  argument:  data type
        :param  argument:  description

        :returns:
        """
        flaskTemplateRoot = os.path.join(templateRoot, "flask")
        flask_section = {}
        flask_section["header"] = self.read_template_file(
            flaskTemplateRoot, "pyheader.j2"
        )
        flask_section["imports"] = self.read_template_file(
            flaskTemplateRoot, "pyimports.j2"
        )
        flask_section["app_init"] = self.read_template_file(
            flaskTemplateRoot, "pyflask_init.j2"
        )
        flask_section["app_run"] = self.read_template_file(
            flaskTemplateRoot, "pyflask_run.j2"
        )
        flask_section["app_route"] = self.read_template_file(
            flaskTemplateRoot, "pyflask_route.j2"
        )

        return flask_section, 0

    def getUserConfig(self):
        return self.parsedData["user_config"]

    def getFlaskTemplate(self):
        return self.parsedData["flask_template"]

    def getHTMLTemplate(self):
        return self.parsedData["html_template"]

    def getJSTemplate(self):
        return self.parsedData["js_template"]
