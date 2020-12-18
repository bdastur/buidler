#!/bin/bash
set -e

# Parse arguments

echo "Usage: "
echo "  Simple Usage: "
echo "     ./setup_sandbox.sh  Defaults: [/sandbox, 500, 5] "
echo "  Override defaults: "
echo "     ./setup_sandbox.sh <destination path> <iteration> <interval> "
echo "------------------------------------------------------------------"


destination_path=${1:-"sandbox"}
iter_count=${2:-500}
interval=${3:-5}

css_path="${destination_path}/static/css/."
js_path="${destination_path}/static/js/builder/."
thirdparty_path="${destination_path}/static/thirdparty"

#for x in {1..${iter_count}}
for (( c=0; c<=${iter_count}; c++ ))
do
    cp csslibs/*.css ${css_path}
    cp jslibs/*.js ${js_path}
    cp -R thirdparty/ ${thirdparty_path}

    echo "[$c] Copied csslibs/*.css to ${css_path}, jslibs/*.js to ${js_path},  thirdparty/ to ${thirdparty_path}"
    sleep ${interval}
done

