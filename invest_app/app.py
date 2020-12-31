#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import (Flask, jsonify, render_template, request)
from flask import render_template
from flask_cors import CORS

import random

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'Hello from the secret world of Flask! ;)'


@app.route("/")
def handle_index():
    return (render_template('index.html'))



def main():
    app.run(host='127.0.0.1', port=5006, debug=True)

if __name__ == '__main__':
    main()

