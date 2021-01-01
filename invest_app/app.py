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

    status = {}
    status['status'] = "success"
    status["msg"] = "this is a test"
    status["values"] = [44, 433, 43, 44, 33, 433, 344]

    obj = invest.run_stock_iterations("spy", **user_data)

    return jsonify(obj)


def main():
    app.run(host='127.0.0.1', port=5006, debug=True)

if __name__ == '__main__':
    main()

