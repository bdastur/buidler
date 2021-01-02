#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import (Flask, jsonify, render_template, request)
from flask import render_template
from flask_cors import CORS
import investlib.invest as invest

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'Hello from the secret world of Flask! ;)'


@app.route("/")
def handle_index():
    return (render_template('index.html'))


@app.route("/chart", methods=["GET", "POST"])
def handle_chart_generate():
    print("Request data: ", request.args)
    user_data = request.args.to_dict(flat=True)

    user_input = {
        'start_balance': 10000,
        'buy_threshold': 1.0,
        'sell_threshold': 1.0,
        'stock_price': 100,
        'buy_batch': 10,
        'sell_batch': 10,
        'transactions': 1000,
        'stock': 'SPY',
        'start_date': '2010-01-01',
        'end_date': '2020-12-31',
        'price_type': 'close',
        'frequency': 'weekly'
    }
    for key,value in user_data.items():
        user_input[key] = value


    print("Final user innput to investlib: ", user_input)

    obj = invest.run_stock_iterations(user_data['stock'], **user_input)

    return jsonify(obj)


def main():
    app.run(host='127.0.0.1', port=5006, debug=True)

if __name__ == '__main__':
    main()

