#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import os
import random
from prettytable import PrettyTable
import investlib.utils as utils



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

    output_table = PrettyTable()
    output_table.field_names = [
        "Date", "Old Stock Price", "New Stock Price",
        "%change", "Operation", "Balance", "Shares",
        "Current Value", "% gain/loss", "Avg change", "Recommendation"]
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

        change = utils.get_price_difference(old_price, stock_price)
        percent_change = float(float(change)/float(old_price) * 100)
        if len(five_day_avg) > 4:
            five_day_avg.pop(0)
        five_day_avg.append(percent_change)
        avg_change = utils.calculate_avg_change(five_day_avg)

        kwargs = {}
        kwargs['percent_change'] = percent_change
        kwargs['cumulative_rise'] = cumulative_rise
        kwargs['cumulative_drop'] = cumulative_drop
        kwargs['buy_threshold'] = buy_threshold
        kwargs['sell_threshold'] = sell_threshold
        recommendation = utils.make_buy_sell_recommendation(strategies[0], **kwargs)

        if percent_change < 0:
            cumulative_rise = 0
            cumulative_drop += percent_change
            if (percent_change < buy_threshold) or (cumulative_drop < buy_threshold):
                balance, bought = utils.buy_stock(balance, stock_price, buy_batch)
                shares_accumulated += bought
                operation = "buy"
        else:
            cumulative_drop = 0
            cumulative_rise += percent_change
            if (percent_change > sell_threshold) or (cumulative_rise > sell_threshold):
                #print("%f is > %f, so we sell" % (percent_change, sell_threshold))
                gain, shares_accumulated = utils.sell_stock(shares_accumulated, stock_price, sell_batch)
                balance += gain
                operation = "sell"

        if shares_accumulated > 0:
            current_value = balance + (int(stock_price) * int(shares_accumulated))
        else:
            current_value = balance

        balance_change = utils.get_price_difference(start_balance, current_value)
        percent_gain_loss = float(float(balance_change)/float(start_balance) * 100)

        output_table.add_row([date, format(old_price, ".2f"), format(stock_price, ".2f"),
            format(percent_change, ".2f"),
            operation, balance, shares_accumulated, current_value,
            format(percent_gain_loss, ".2f"), format(avg_change, ".2f"), recommendation['recommendation']])


        if day_count == 30:
            day_count = 0
            output_table.add_row([
                "Date", "Old Stock Price", "New Stock Price",
                "%change", "Operation", "Balance", "Shares",
                "Current Value", "% gain/loss", "Avg change", "Recommendation"])
            output_table.add_row([
                "----", "----", "----", "----", "----", "----", "----", "----",
                "----", "----", "----"])

        day_count += 1

        obj = {
            'date': date,
            'balance': balance,
            'shares': shares_accumulated,
            'current_value': current_value
        }
        summary.append(obj)

    print(output_table)
    return summary


@click.group()
def cli():
    pass

@cli.group('stocksim')
def stocksim():
    print("Stock sim")

@stocksim.command()
@click.option("-s", "--stock", type=str,         help="Stock ticker, eg: SPY", required=True)
@click.option("-b", "--start-balance", type=int, help="Start balance (default: 10000)", default=10000)
@click.option("--buy-threshold", type=float,     help="%change that triggers a buy (default: 1.0)", default=1.0)
@click.option("--sell-threshold", type=float,    help="%change that triggers a sell (default: 2.0)", default=2.0)
@click.option("--buy-batch", type=int,           help="Max batch for buys (default: 10)", default=10)
@click.option("--sell-batch", type=int,          help="Max batch for sell (default: 20)", default=20)
def run(stock, start_balance, buy_threshold, sell_threshold, buy_batch, sell_batch):
    user_input = {
        'start_balance': start_balance,
        'buy_threshold': buy_threshold,
        'sell_threshold': sell_threshold,
        'stock_price': 100,
        'buy_batch': buy_batch,
        'sell_batch': sell_batch,
        'transactions': 1000,
        'stock': stock
    }
    print("User input: ", user_input)
    obj = run_stock_iterations("spy", **user_input)


def main():
    cli.add_command(stocksim)

    cli()


if __name__ == '__main__':
    main()

