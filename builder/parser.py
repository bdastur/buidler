#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml


class ConfigParser(object):
    def __init__(self, configFile="./builder_conf.yaml"):
        parsedYaml = yaml.safe_load(configFile)


class BuilderParser(object):
    def __init__(self):
        pass
