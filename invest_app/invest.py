#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
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

    if strategy == 'consequitive_price_movement':
        percent_change = kwargs['percent_change']
        cumulative_drop = kwargs['cumulative_drop']
        cumulative_rise = kwargs['cumulative_rise']
        buy_threshold = kwargs['buy_threshold']
        sell_threshold = kwargs['sell_threshold']

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

        result['recommendation'] = operation
        result['cumulative_drop'] = cumulative_drop
        result['cumulative_rise'] = cumulative_rise

    return result


def calculate_avg_change(change_list):
    sum = 0
    for val in change_list:
        sum += val

    return float(sum)



def run_stock_iterations(symbol, **kwargs):
    summary = []

    balance = int(kwargs['start_balance'])
    buy_threshold = -float(kwargs['buy_threshold'])
    sell_threshold = float(kwargs['sell_threshold'])
    stock_price = int(kwargs['stock_price']) 
    buy_batch = int(kwargs['buy_batch']) 
    sell_batch = int(kwargs['sell_batch'])
    shares_accumulated = 0
    transactions = int(kwargs['transactions'])
    strategies = ['consequitive_price_movement',
                  'five_day_moving_rate']

    cumulative_rise = 0
    cumulative_drop = 0
    percent_gain_loss = 0
    start_balance = balance

    five_day_avg = []
    day_count = 0

    filename = "%s.csv" % symbol
    filepath = os.path.join("/tmp", filename)

    if not os.path.exists(filepath):
        print("File does not exist")
        return summary 

    print("[Date]       Old Stock Price  New Stock Price  %Change    Operation   Balance  Shares Current Value %_gain_loss  Avg change")
    initiate = True
    for line in open(filepath, 'r'):
        operation = "NA"
        old_price = stock_price

        columns = line.split(",")
        # Get Closing price:
        try:
            stock_price = float(columns[4])
        except ValueError:
            continue
        date = columns[0]
        if initiate:
            initiate = False
            old_price = stock_price
            continue

        change = get_price_difference(old_price, stock_price)
        percent_change = float(float(change)/float(old_price) * 100)
        if len(five_day_avg) > 4:
            five_day_avg.pop(0)
        five_day_avg.append(percent_change)
        avg_change = calculate_avg_change(five_day_avg)

        kwargs = {}
        kwargs['percent_change'] = percent_change
        kwargs['cumulative_rise'] = cumulative_rise
        kwargs['cumulative_drop'] = cumulative_drop
        kwargs['buy_threshold'] = buy_threshold
        kwargs['sell_threshold'] = sell_threshold
        recommendation = make_buy_sell_recommendation(strategies[0], **kwargs)

        if percent_change < 0:
            cumulative_rise = 0
            cumulative_drop += percent_change
            if (percent_change < buy_threshold) or (cumulative_drop < buy_threshold):
                balance, bought = buy_stock(balance, stock_price, buy_batch)
                shares_accumulated += bought
                operation = "buy"
        else:
            cumulative_drop = 0
            cumulative_rise += percent_change
            if (percent_change > sell_threshold) or (cumulative_rise > sell_threshold):
                #print("%f is > %f, so we sell" % (percent_change, sell_threshold))
                gain, shares_accumulated = sell_stock(shares_accumulated, stock_price, sell_batch)
                balance += gain
                operation = "sell"

        if shares_accumulated > 0:
            current_value = balance + (int(stock_price) * int(shares_accumulated))
        else:
            current_value = balance

        balance_change = get_price_difference(start_balance, current_value)
        percent_gain_loss = float(float(balance_change)/float(start_balance) * 100)


        print("[%s] %12f %15f %15f %5s %10d %8d %11d %15f %10f %10s" % \
                (date, old_price, stock_price, percent_change, operation, 
                 balance, shares_accumulated, current_value, percent_gain_loss, avg_change, recommendation['recommendation']))

        obj = {
            'date': date,
            'balance': balance,
            'shares': shares_accumulated,
            'current_value': current_value
        }
        summary.append(obj)


    return summary


