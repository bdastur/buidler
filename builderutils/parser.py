#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import yaml


class ConfigParser(object):
    def __init__(self, configFile="./builder_conf.yaml"):

        if not os.path.exists(configFile):
            print "Could not find %s" % configFile
            return

        parsedYaml = yaml.safe_load(configFile)
        print "parsed yaml: ", parsedYaml


class BuilderParser(object):
    def __init__(self, configFile):
        if not os.path.exists(configFile):
            print "Require a builder config file"
            return
        parsedData, err = self.parse_builder_config(configFile)
        if err != 0:
            print "Failed to parse config %s" % configFile
            return

        print "Parsed Data: ", parsedData


    def parse_builder_config(self, configFile):
        with open(configFile, 'r') as fHandle:
            try:
                parsedData = yaml.safe_load(fHandle)
            except yaml.YAMLError as error:
                print "Failed to parse builde cofig %s [%s]" % \
                (configFile, error)
                return None, 1

        return parsedData, 0
