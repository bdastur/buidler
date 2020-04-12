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