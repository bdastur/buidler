#!/bin/bash

removepath="/investlib/tests"
pypath=$(pwd)
pypath=${pypath/$removepath/""}
echo "Pypath: $pypath"


echo "set PYTHONPATH to $pypath"

export PYTHONPATH=$pypath
python -m unittest invest_ut

