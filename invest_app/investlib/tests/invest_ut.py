#!/usr/bin/env python
# -*- coding: utf-8 -*-

import unittest
import investlib.yfhelper as yfhelper


class InvestUt(unittest.TestCase):
    def test_get_historical_price_data(self):
        expected_val = 324.8900146484375

        data = yfhelper.get_historical_price_data('SPY', 
            '2020-01-02', '2020-01-04')

        print("High Price: ", format(data['SPY']['prices'][0]['high'], ".2f"))

        self.assertEqual(expected_val, data['SPY']['prices'][0]['high'],
                         msg="Not the same")

    def test_get_historical_price_data_invalid_ticker(self):
        expected_val = []
        data = yfhelper.get_historical_price_data('SPY1',
            '2020-01-02', '2020-01-04')

        prices = data['SPY1']['prices']
        self.assertEqual(expected_val, prices,
                         msg="Expected %s, got %s" % (expected_val, prices))
