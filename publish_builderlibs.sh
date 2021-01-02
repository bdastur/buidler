#!/bin/bash
set -e

# Parse arguments

function show_usage() {
    echo "Usage: "
    echo "  Simple Usage: "
    echo "  ---------------"
    echo " ./publish_builderlibs.sh"
    echo ""
    echo "Options: "
    echo "-----------------"
    echo " -d <dest path> Destination path to copy js/css library files   (Default: sandbox)"
    echo " -c <count>     Iteration count                                 (Default: 500)"
    echo " -i <interval>  Interval (in secs) to copy files                (Default: 5)"
    echo " -m             Minify js files. If enabled will copy minified"
    echo  "                     builderlib.min.js to <dest path>          (Default: false)"
    echo " -p             Production (only copy minified file)            (Default: false)"
    echo "------------------------------------------------------------------"
    exit 0
}

destination_path="sandbox"
iter_count=500
interval=5
minify="false"
production="false"
output_file="builderlib.min.js"
input_file_list="jslibs/utils.js jslibs/content_components.js jslibs/components.js"

CMD_OPTIONS="c:d:i:mph"

#terser --compress --mangle --output /tmp/builder.min.js -- jslibs/utils.js jslibs/content_components.js jslibs/components.js

while getopts ${CMD_OPTIONS} option; do
    case $option in
        c)
            iter_count=${OPTARG}
            ;;
        d)
            destination_path=${OPTARG}
            ;;
        i)
            interval=${OPTARG}
            ;;
        m)
            minify="true"
            ;;
        p)  production="true"
            ;;
        h)
            show_usage
            ;;
        :) echo "Error: option option \"-$OPTARG\" needs argument"; echo "error :";;
        *) echo "Error: Invalid option \"-$OPTARG\""; echo "invalid option error";;
    esac
done


minified_file="${destination_path}/static/js/builder/${output_file}"
css_path="${destination_path}/static/css/."
js_path="${destination_path}/static/js/builder/."
thirdparty_path="${destination_path}/static/thirdparty"

echo "Publish builderlibs"
echo "Destination: ${destination_path}"
echo "Iterations: ${iter_count}"
echo "Interval: ${interval}"
echo "Minify: ${minify}"
echo "Production env: ${production}"
echo "Minified file: ${minified_file}"

if [[ ! -d $css_path ]]; then
    mkdir -p $css_path
fi

if [[ ! -d $js_path ]]; then
    mkdir -p $js_path
fi

if [[ ! -d $thirdparty_path ]]; then
    mkdir -p $thirdparty_path
fi

for (( c=0; c<=${iter_count}; c++ ))
do
    cp csslibs/*.css ${css_path}
    cp -R thirdparty/ ${thirdparty_path}

    if [[ ${minify} == "true" ]]; then
        echo "terser --compress --mangle --output ${minified_file} -- ${input_file_list}"
        terser --compress --mangle --output $minified_file -- ${input_file_list}
    fi

    if [[ ${production} == "false" ]]; then
        cp jslibs/*.js ${js_path}
        echo "[$c] Copied csslibs/*.css to ${css_path}, jslibs/*.js to ${js_path},  thirdparty/ to ${thirdparty_path}"
    else
        echo "[$c] Copied csslibs/*.css to ${css_path}, thirdparty/ to ${thirdparty_path}"
    fi

    sleep ${interval}
done

