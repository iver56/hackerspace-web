/*
 Talks to /api/door and displays the returned status on #door-status.
 If the api doesn't return a JSON object (with .responseJSON)
 it will fail silently on page load.
 The user may click on #door-status to attempt a reload,
 and if the api still doesn't work it will fail with an alert.
 */

var openString = "Hackerspace er åpent. Velkommen inn!";
var closedString = "Hackerspace er dessverre ikke åpent nå. Vil du ha beskjed når døra åpnes? Legg til HACKERSPACE på <a href=\"http://justyo.co\">Yo</a>.";

var doorStatus = function (showAlert) {
    var doorstatusDiv = $("#door-status");
    var jqxhr = $.getJSON("api/door", console.log("door fetch success"));
    jqxhr.done(console.log("door fetch second success"));
    jqxhr.fail(console.log("door fetch error"));
    jqxhr.always(function() {
      console.log("door fetch complete");
      if (jqxhr.responseJSON === undefined) {
        if (showAlert) {
          alert("Det ser ut som dør-APIet vårt ikke fungerer.\n" +
            "Si gjerne fra om det på hackerspace@idi.ntnu.no eller #hackerspace på EFNet.");
        }
        return;
      }
    });

    jqxhr.complete(function () {
        console.log("door fetch second complete");
        if (jqxhr.responseJSON[0].isOpen) {
            doorstatusDiv.html(openString);
            doorstatusDiv.addClass('alert-success');
            doorstatusDiv.removeClass('alert-info');
        } else {
            doorstatusDiv.html(closedString);
        }
    });
};

$(document).ready(doorStatus(false));
