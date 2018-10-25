#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import yaml


class ConfigParser(object):
    def __init__(self, configFile="./builder_conf.yaml"):

        if not os.path.exists(configFile):
            print "Could not find %s" % configFile
            return

        self.parsedData = yaml.safe_load(configFile)
        print "parsed yaml: ", self.parsedData


class BuilderParser(object):
    def __init__(self, configFile):
        if not os.path.exists(configFile):
            print "Require a builder config file"
            return
        self.parsedData = {}
        self.parsedData['user_config'], err = self.parse_yaml_config(configFile)
        if err != 0:
            print "Failed to parse config %s" % configFile
            return
        self.parsedData['html_template'], err = self.parse_html_template()
        if err != 0:
            print "Failed to parse html template %s" % configFile

        self.parsedData['flask_template'], err = self.parse_flask_template()
        if err != 0:
            print "Failed to parse flask template %s" % configFile

        print "Parsed Data: ", self.parsedData

    def parse_yaml_config(self, configFile):
        with open(configFile, 'r') as fHandle:
            try:
                parsedData = yaml.safe_load(fHandle)
            except yaml.YAMLError as error:
                print "Failed to parse builde cofig %s [%s]" % \
                (configFile, error)
                return None, 1

        return parsedData, 0

    def read_template_file(self, templateRoot, fileName):
        ''' one line description

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        filePath = os.path.join(templateRoot, fileName)
        with open(filePath, 'r') as fHandle:
            data = fHandle.read()
        return data

    def parse_html_template(self):
        ''' Parse html template

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        templateRoot = "./templates/html"
        html_section = {}
        html_section['doctype'] = self.read_template_file(templateRoot,
                                                           "doctype.j2")
        html_section['header'] = self.read_template_file(templateRoot,
                                                         "html_header.j2")
        html_section['head'] = self.read_template_file(templateRoot,
                                                       "html_head.j2")
        html_section['body'] = self.read_template_file(templateRoot,
                                                       "html_body.j2")
        html_section['scripts'] = self.read_template_file(templateRoot,
                                                          "html_scripts.j2")
        return html_section, 0

    def parse_flask_template(self):
        ''' Parse flask templates

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        templateRoot = "./templates/flask"
        flask_section = {}
        flask_section['header'] = self.read_template_file(templateRoot,
                                                          "pyheader.j2")
        flask_section['imports'] = self.read_template_file(templateRoot,
                                                           "pyimports.j2")
        flask_section['app_init'] = self.read_template_file(templateRoot,
                                                             "pyflask_init.j2")
        flask_section['app_run'] = self.read_template_file(templateRoot,
                                                             "pyflask_run.j2")
        flask_section['app_route'] = self.read_template_file(templateRoot,
                                                             "pyflask_route.j2")

        return flask_section, 0
