#!/usr/bin/env python
# -*- coding: utf-8 -*-

import random

def get_new_price(current_price):
    price_fluctuation = random.randint(1, 7)
    up_down = random.randint(0, 2)
    if up_down == 1:
        price_fluctuation = current_price - price_fluctuation
    else:
        price_fluctuation += current_price

    return price_fluctuation


def get_price_difference(old_price, new_price):
    return  (new_price - old_price)


def sell_stock(accumulated_stock, sell_price, sell_quantity):
    #print("Selling: %d, %d, %d" % (accumulated_stock, sell_price, sell_quantity))
    if accumulated_stock == 0:
        return(0, accumulated_stock)

    if accumulated_stock < sell_quantity:
        sell_quantity = accumulated_stock

    #print("Selling sell qty: %d " % sell_quantity)

    gain = int(sell_price) * int(sell_quantity)
    accumulated_stock -= sell_quantity
    #print("Gain: %d, accumuated now: %d" % (gain, accumulated_stock))
    return (gain, accumulated_stock)


def buy_stock(balance, stock_price, buy_quantity):
    #print("Buying: %d, %d, %d" % (balance, stock_price, buy_quantity))
    max_buy_capacity = int(balance/stock_price)
    if max_buy_capacity < buy_quantity:
        buy_quantity = max_buy_capacity

    if buy_quantity == 0:
        return(balance, buy_quantity)

    cost_basis = int(stock_price) * int(buy_quantity)
    balance = balance - cost_basis
    return (balance, buy_quantity)


def make_buy_sell_recommendation(strategy, **kwargs):
    operation = "na"
    result = {}

    percent_change = kwargs['percent_change']
    cumulative_drop = kwargs['cumulative_drop']
    cumulative_rise = kwargs['cumulative_rise']
    d5_avg_change = kwargs['d5_avg_change'] 
    d10_avg_change = kwargs['d10_avg_change']
    d20_avg_change = kwargs['d20_avg_change']
    buy_threshold = kwargs['buy_threshold']
    sell_threshold = kwargs['sell_threshold']

    if strategy == 'consequitive_price_movement':
        if percent_change < 0:
            cumulative_rise = 0
            cumulative_drop += percent_change
            if (percent_change < buy_threshold) or (cumulative_drop < buy_threshold):
                operation = "buy"
        else:
            cumulative_drop = 0
            cumulative_rise += percent_change
            if (percent_change > sell_threshold) or (cumulative_rise > sell_threshold):
                operation = "sell"
    elif strategy == "5d_avg":
        if d5_avg_change < 0:
            if d5_avg_change < buy_threshold:
                operation = "buy"
        else:
            if d5_avg_change > sell_threshold:
                operation = "sell"
    elif strategy == "10d_avg":
        if d10_avg_change < 0:
            if d10_avg_change < buy_threshold:
                operation = "buy"
        else:
            if d10_avg_change > sell_threshold:
                operation = "sell"
    elif strategy == "20d_avg":
        if d20_avg_change < 0:
            if d20_avg_change < buy_threshold:
                operation = "buy"
        else:
            if d20_avg_change > sell_threshold:
                operation = "sell"
    
    result['recommendation'] = operation
    result['cumulative_drop'] = cumulative_drop
    result['cumulative_rise'] = cumulative_rise

    return result


def calculate_avg_change(change_list):
    sum = 0
    for val in change_list:
        sum += val

    return float(sum)


def get_current_value(balance, stock_price, shares_accumulated):
    if shares_accumulated > 0:
        current_value = balance + (int(stock_price) * int(shares_accumulated))
    else:
        current_value = balance

    return current_value
