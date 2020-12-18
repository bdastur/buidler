/*
 * openTab
 * openTab API is used in conjunction with custom tabs.
*/
function openTab(evt, tabHeadingClass, tabContentClass, tabContentId) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName(tabContentClass);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName(tabHeadingClass);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabContentId).style.display = "block";
    evt.currentTarget.className += " active";
  }

  
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
