#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yahoofinancials


def get_historical_price_data(ticker_symbol,
                              start_date, end_date, 
                              frequency='weekly'):
    '''
    The API returns historical price data.
    '''
    yf = yahoofinancials.YahooFinancials(ticker_symbol)

    data = yf.get_historical_price_data(start_date, end_date, frequency)
    return data


