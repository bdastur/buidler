#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
from flask import render_template
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Hello from the secret world of Flask! ;)'


@app.route("/")
def handle_index():
    return (render_template('index.html'))


@app.route("/navbars")
def handle_navbars():
    return (render_template('navbars.html'))


@app.route("/layouts")
def handle_layouts():
    return render_template('layouts.html')


@app.route("/tables")
def handle_tables():
    return render_template('tables.html')

@app.route("/cards")
def handle_cards():
    return render_template('cards.html')

@app.route("/dashboard1")
def handle_sample_dashboard():
    return render_template("dashboard1.html")

@app.route("/forms")
def handle_forms():
    return render_template("forms.html")

def main():
    app.run(host='127.0.0.1', port=5005, debug=True)

if __name__ == '__main__':
    main()

