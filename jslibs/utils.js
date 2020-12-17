function AddWindowLoadEvent(func) {
    var oldOnLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldOnLoad) {
                oldOnLoad();
            }
            func();
        }
    }
}


// An AJAX Wrapper.
function ajaxCall(url,
                  success_callback,
                  error_callback,
                  data,
                  method,
                  contentType = "application/x-www-form-urlencoded") {
    if (url == undefined || success_callback == undefined
       || error_callback == undefined) {
        console.log("AJAX Call requires url, success \
                     callback and error callback");
        return;
    }
    if (method == undefined) {
        console.log("Method is undefined... set it to GET");
        method = "GET";
    }
    console.log("Conttent type: " + contentType);

    $.ajax({
        url: url,
        success: success_callback,
        error: error_callback,
        dataType: "json",
        data: data,
        contentType: contentType,
        timeout: (1000 * 1),
        async: true //Default is true.
    });
}
