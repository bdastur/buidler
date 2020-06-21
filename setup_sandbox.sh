#!/bin/bash
set -ex

echo "Setup sandbox"

cp csslibs/*.css sandbox/static/css/.
cp jslibs/*.js sandbox/static/js/builder/.
cp -R thirdparty/ sandbox/static/thirdparty
