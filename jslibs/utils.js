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

