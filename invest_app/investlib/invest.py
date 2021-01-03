#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import os
import random
from prettytable import PrettyTable
import investlib.utils as utils
import investlib.yfhelper as yfhelper



def run_stock_iterations(symbol, **kwargs):
    summary = []

    balance =         int(kwargs['start_balance'])
    buy_threshold =   -float(kwargs['buy_threshold'])
    sell_threshold =  float(kwargs['sell_threshold'])
    stock_price =     int(kwargs['stock_price'])
    buy_batch =       int(kwargs['buy_batch'])
    sell_batch =      int(kwargs['sell_batch'])
    transactions =    int(kwargs['transactions'])
    strategy =        kwargs['strategy']

    strategies =      ['consequitive_price_movement',
                       'five_day_moving_rate']
    symbol = symbol.upper()

    shares_accumulated = 0
    cumulative_rise = 0
    cumulative_drop = 0
    percent_gain_loss = 0
    start_balance = balance

    d5_avg = []
    d10_avg = []
    d20_avg = []
    day_count = 0
    avg_cost_basis = 0

    # Get historical price data from YahooFinancials.
    start_date = kwargs['start_date']
    end_date = kwargs['end_date']
    price_type = kwargs['price_type']
    frequency = kwargs['frequency']
    data = yfhelper.get_historical_price_data(symbol,
           start_date, end_date, frequency=frequency)
    prices = data[symbol]['prices']


    output_table = PrettyTable()
    output_table.field_names = [
        "Date", "Old Stock Price", "New Stock Price",
        "%change", "Operation", "Balance", "Shares",
        "Current Value", "% gain/loss", "d5 change", "d10 chng", "d20 chng", "Recommendation", "Avg cost basis"]
    initiate = True

    for price in prices:
        operation = "NA"
        old_price = stock_price

        # Get Closing price:
        try:
            stock_price = float(price[price_type])
        except ValueError:
            continue
        date = price['formatted_date']
        if initiate:
            initiate = False
            old_price = stock_price
            continue

        change = utils.get_price_difference(old_price, stock_price)
        percent_change = float(float(change)/float(old_price) * 100)
        if len(d5_avg) > 4:
            d5_avg.pop(0)
        d5_avg.append(percent_change)
        d5_avg_change = utils.calculate_avg_change(d5_avg)

        if len(d10_avg) > 9:
            d10_avg.pop(0)
        d10_avg.append(percent_change)
        d10_avg_change = utils.calculate_avg_change(d10_avg)

        if len(d20_avg) > 19:
            d20_avg.pop(0)
        d20_avg.append(percent_change)
        d20_avg_change = utils.calculate_avg_change(d20_avg)


        kwargs = {}
        kwargs['percent_change'] = percent_change
        kwargs['cumulative_rise'] = cumulative_rise
        kwargs['cumulative_drop'] = cumulative_drop
        kwargs['d5_avg_change'] = d5_avg_change
        kwargs['d10_avg_change'] = d10_avg_change
        kwargs['d20_avg_change'] = d20_avg_change
        kwargs['buy_threshold'] = buy_threshold
        kwargs['sell_threshold'] = sell_threshold
        recommendation = utils.make_buy_sell_recommendation(strategy, **kwargs)
        cumulative_rise = recommendation['cumulative_rise']
        cumulative_drop = recommendation['cumulative_drop']

        if recommendation['recommendation'] == "buy":
            balance, bought = utils.buy_stock(balance, stock_price, buy_batch)
            avg_cost_basis = ((avg_cost_basis * shares_accumulated) + (stock_price *  bought)) / (shares_accumulated + bought)
            shares_accumulated += bought
            operation = "buy"
        elif recommendation['recommendation'] == "sell":
            gain, shares_accumulated = utils.sell_stock(shares_accumulated, stock_price, sell_batch)
            balance += gain
            operation = "sell"

        current_value = utils.get_current_value(balance, stock_price, shares_accumulated)

        balance_change = utils.get_price_difference(start_balance, current_value)
        percent_gain_loss = float(float(balance_change)/float(start_balance) * 100)

        output_table.add_row([date, format(old_price, ".2f"), format(stock_price, ".2f"),
            format(percent_change, ".2f"),
            operation, balance, shares_accumulated, current_value,
            format(percent_gain_loss, ".2f"), format(d5_avg_change, ".2f"), 
            format(d10_avg_change, ".2f"), format(d20_avg_change, ".2f"), recommendation['recommendation'], 
            format(avg_cost_basis, ".2f")])


        if day_count == 30:
            day_count = 0
            output_table.add_row([
                "Date", "Old Stock Price", "New Stock Price",
                "%change", "Operation", "Balance", "Shares",
                "Current Value", "% gain/loss", "d5 change", 
                "d10 change", "d20 change", "Recommendation", "Avg cost basis"])
            output_table.add_row([
                "----", "----", "----", "----", "----", "----", "----", "----",
                "----", "----", "----", "----", "----", "-----"])

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
@click.option("--start-date", type=str,          help="Start date for historical price. (default: 2015-01-01)", default="2015-01-01")
@click.option("--end-date", type =str,           help="End date for historical price. (default: 2020-12-31)", default="2020-12-31")
@click.option("--price-type", type=click.Choice(["high", "low", "open", "close"]), help="Price type: 'high', 'low', 'open', 'close' (Default: close)", default="close")
@click.option("--frequency", type=click.Choice(["daily", "weekly", "monthly"]), help="Frequency: 'daily', 'weekly', 'monthly' (Default: weekly)", default="weekly")
@click.option("-b", "--start-balance", type=int, help="Start balance (default: 10000)", default=10000)
@click.option("--buy-threshold", type=float,     help="%change that triggers a buy (default: 1.0)", default=1.0)
@click.option("--sell-threshold", type=float,    help="%change that triggers a sell (default: 2.0)", default=2.0)
@click.option("--buy-batch", type=int,           help="Max batch for buys (default: 10)", default=10)
@click.option("--sell-batch", type=int,          help="Max batch for sell (default: 20)", default=20)
@click.option("--strategy", 
    type=click.Choice(["consequitive_price_movement", "5d_avg", "10d_avg", "20d_avg"]), help="Strategy (Default: consequitive_price_movement)", default="consequitive_price_movement")
def run(stock, start_date, end_date, price_type, frequency, start_balance, buy_threshold, sell_threshold, buy_batch, sell_batch, strategy):
    user_input = {
        'start_balance': start_balance,
        'buy_threshold': buy_threshold,
        'sell_threshold': sell_threshold,
        'stock_price': 100,
        'buy_batch': buy_batch,
        'sell_batch': sell_batch,
        'transactions': 1000,
        'stock': stock.upper(),
        'start_date': start_date,
        'end_date': end_date,
        'price_type': price_type,
        'frequency': frequency,
        'strategy': strategy
    }
    print("User input: ", user_input)
    obj = run_stock_iterations(stock.upper(), **user_input)


def main():
    cli.add_command(stocksim)

    cli()

if __name__ == '__main__':
    main()

