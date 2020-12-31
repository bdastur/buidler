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
    cumulative_rise = 0
    cumulative_drop = 0

    print("Symbol: %s, kwargs: %s" % (symbol, kwargs))

    print("Start balance: ", kwargs['start_balance'])

    filename = "%s.csv" % symbol
    filepath = os.path.join("/tmp", filename)

    if not os.path.exists(filepath):
        print("File does not exist")
        return summary 

    print("[Date]       Old Stock Price  New Stock Price  %Change  Operation    Balance  Shares")
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

        print("[%s] %10f %10f %22f %5s %14d %6d %5d" % \
                (date, old_price, stock_price, percent_change, operation, balance, shares_accumulated, current_value))

        obj = {
            'date': date,
            'balance': balance,
            'shares': shares_accumulated,
            'current_value': current_value
        }
        summary.append(obj)


    return summary


