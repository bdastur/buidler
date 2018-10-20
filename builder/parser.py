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
    def __init__(self):
        pass
