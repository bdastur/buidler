#!/usr/bin/env python
# -*- coding: utf-8 -*-


import unittest
import builder.parser as parser


class builderUT(unittest.TestCase):
    def testNone(self):
        print "Empty test!"

    def testParserInitialize(self):
        print "Parser Initialize test"
        parserObj = parser.ConfigParser()
        self.assertNotEqual(parserObj, None, msg="Expected not None")
