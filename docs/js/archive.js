---
layout: null
---

/* Only run this if we are online*/
if (window.navigator.onLine) {
  var suppressButterBar = false;
  /* This JSON file contains a current list of all docs versions of Docker */
  $.getJSON("/js/archives.json", function(result){
    var outerDivStart = '<div style="padding-top: 10px; padding-bottom: 10px; min-height: 34px; border: 1px solid #254356; background-color: #FFE1C0; color: #254356"><div class="container"><div style="text-align: center"><span id="archive-list">当前是Rancher&nbsp;' + RancherVersion + '的文档，点击<a style="color: #254356; text-decoration: underline !important" href="/">latest docs</a> 跳转到最新版本或者选择不同的版本:&nbsp;&nbsp;</span>' +
                               '<span style="z-index: 1001" class="dropdown">';
    var listStart = '<ul class="dropdown-menu" role="menu" aria-labelledby="archive-menu">';
    var listEnd = '</ul>';
    var outerDivEnd = '</span></div></div></div>';
    var buttonCode = null;
    var listItems = new Array();
    $.each(result, function(i, field){
      if ( field.name == RancherVersion && field.current ) {
        // We are the current version so we don't need a butterbar
        suppressButterBar = true;
      } else {
        var prettyName = 'Rancher ' + field.name.replace("v", "");
        // If this archive has current = true, and we don't already have a button
        if ( field.current && buttonCode == null ) {
          // Get the button code
          buttonCode = '<button id="archive-menu" data-toggle="dropdown" class="btn dropdown-toggle" style="border: 1px solid #254356; background-color: #fff; color: #254356;">' + prettyName  + '&nbsp;(current) &nbsp;<span class="caret"></span></button>';
          // The link is different for the current release
          listItems.push('<li role="presentation"><a role="menuitem" tabindex="-1" href="/">' + prettyName + '</a></li>');
        } else {
          listItems.push('<li role="presentation"><a role="menuitem" tabindex="-1" href="/' + field.name + '/">' + prettyName + '</a></li>');
        }
      }
    });
    // only append the butterbar if we are NOT the current version
    // Also set the isArchive variable to true if it's an archive. It defaults
    // to true, set in _layouts/docs.html. We default to true because it looks
    // better in CSS to show stuff than to hide stuff onLoad.
    if ( suppressButterBar == false ) {
      $( 'body' ).prepend(outerDivStart + buttonCode + listStart + listItems.join("") + listEnd + outerDivEnd);
      isArchive = true;
      console.log("Detected that this is an archive.");
    } else {
      isArchive = false;
      console.log("This is not an archive. Suppressing the archive versions bar");
    }
  });
}