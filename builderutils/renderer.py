#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

class FlaskRenderer(object):

    def __init__(self):
        pass

    def setup_environment(self, renderRoot, renderObj):
        ''' Setup Flask Environment

        :type  argument:  data type
        :param  argument:  description

        :returns:
        '''
        renderProjectPath = os.path.join(renderRoot, renderObj['app_name'])
        if not os.path.exists(renderProjectPath):
            os.mkdir(renderProjectPath)

        templatesDir = os.path.join(renderProjectPath, 'templates')
        staticDir = os.path.join(renderProjectPath, 'static')
        jsDir = os.path.join(staticDir, 'js')
        cssDir = os.path.join(staticDir, 'css')

        if not os.path.exists(templatesDir):
            os.mkdir(templatesDir)

        if not os.path.exists(staticDir):
            os.mkdir(staticDir)

        if not os.path.exists(jsDir):
            os.mkdir(jsDir)

        if not os.path.exists(cssDir):
            os.mkdir(cssDir)




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

        if renderObj['app_type'] == 'flask':
            flaskRenderer = FlaskRenderer()
            flaskRenderer.setup_environment(renderRoot, renderObj)


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






