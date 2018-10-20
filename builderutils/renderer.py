#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os


class Renderer(object):
    def __init__(self):
        pass

    def build_staging_environment(self, renderObj):
        ''' Build a new staging path where code gets rendered.

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        renderRoot = "/tmp/builder"
        if not os.path.exists(renderRoot):
            os.mkdir(renderRoot)

        renderProjectPath = os.path.join(renderRoot, renderObj['app_name'])
        if not os.path.exists(renderProjectPath):
            os.mkdir(renderProjectPath)


    def render_j2_template(self, templateFile, searchPath,
                           renderObj):
        ''' The API will render a Jinja2 template

        :type  templateFile:  String
        :param templateFile: Name of the template file

        :type  searchPath: String
        :param searchPath: Path to the templates directory

        :type  renderObj:  dict
        :param renderObj: Dictionary object to substitute the template vars

        :returns:
        '''
        pass






