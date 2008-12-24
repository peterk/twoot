/*
 * The Twitter request code is based on the jquery tweet extension by http://tweet.seaofclouds.com/
 *
 * */
var LAST_UPDATE;

//Reverse collection
jQuery.fn.reverse = function() {
  return this.pushStack(this.get().reverse(), arguments);
}; 


(function($) {
 $.fn.gettweets = function(o){
 	return this.each(function(){
		 var list = $('ul.tweet_list').prependTo(this);
		 var url = 'http://twitter.com/statuses/friends_timeline.json' + getSinceParameter();
		 
		 $.getJSON(url, function(data){
			 $.each(data.reverse(), function(i, item) { 
				if($("#msg-" + item.id).length == 0) { // <- fix for twitter caching which sometimes have problems with the "since" parameter
				 	list.prepend('<li id="msg-' + item.id + '"><img class="profile_image" src="' + item.user.profile_image_url + '" alt="' + item.user.name + '" /><span class="time" title="' + item.created_at + '">' + relative_time(item.created_at) + '</span> <a class="user" href="javascript:addAddress(\'' + item.user.screen_name + '\')">' + item.user.screen_name + '</a><div class="tweet_text">' + item.text.replace(/(\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+)/g, '<a href="$1">$1</a>').replace(/[\@]+([A-Za-z0-9-_]+)/g, '<a href="http://twitter.com/$1">@$1</a>').replace(/[&lt;]+[3]/g, "<tt class='heart'>&#x2665;</tt>") + '</div></li>');

					// Don't want Growl notifications? Comment out the following method call
					fluid.showGrowlNotification({
						title: item.user.name + " @" + item.user.screen_name,
						description: item.text,
						priority: 2,
						icon: item.user.profile_image_url
					});

					}
				 });
			 });
		 });
 };
})(jQuery);


function relative_time(time_value) {
	var values = time_value.split(" ");
	time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	var parsed_date = Date.parse(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	delta = delta + (relative_to.getTimezoneOffset() * 60);
	if (delta < 60) {
		return '< a minute ago';
	} else if(delta < 120) {
		return 'a minute ago';
	} else if(delta < (45*60)) {
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if(delta < (90*60)) {
		return 'an hour ago';
	} else if(delta < (24*60*60)) {
		return '' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else {
		return (parseInt(delta / 86400)).toString() + ' days ago';
	}
};


//get all span.time and recalc from title attribute
function recalcTime() {
	$('span.time').each( 
			function() {
				$(this).text(relative_time($(this).attr("title")));
			}
	)
}


function getSinceParameter() {
	if(LAST_UPDATE == null) {
		return "";
	} else {
		return "?since=" + LAST_UPDATE;
	}
}

function showAlert(message) {
	$("#alert p").text(message);
	$("#alert").fadeIn("fast");
	return;
}


function refreshMessages() {
	showAlert("Getting new tweets...");
	$(".tweets").gettweets();
	LAST_UPDATE = new Date().toGMTString();	
	$("#alert").fadeOut(2000);
	return;
}

function addAddress(screen_name) {
	$("#status").val($("#status").val() + ' @' + screen_name + ' ');
	$("#status").focus();
	return;
}

function setStatus(status_text) {
	$.post("http://twitter.com/statuses/update.json", { status: status_text, source: "twoot" }, function(data) { checkStatus(); refreshStatusField(); }, "json" );
	return;
}

function refreshStatusField() {
	//maybe show some text below field with last message sent?
	refreshMessages();
	$("#status_count").text("140");
	$('html').animate({scrollTop:0}, 'fast'); 
	return;
}

function updateStatusCount() {
    window.statusCount = 140 - $("#status").val().length;
    $("#status_count").text(window.statusCount.toString());
    return;
}

function checkStatus () {
    var origColor = $('#status').css("background-color");
    if ($('#status').val().length == 140) {
	    $("#status").val("Twoosh!").css("background-color","#52FF55").fadeOut('slow', function() {
	      $("#status").val("").css("background-color", origColor).fadeIn('slow');
	    });
    } else {
        $('#status').val($("#status").val()).css("background-color","#52FF55").fadeOut('slow', function() {
            $('#status').val("").css("background-color", origColor).fadeIn('slow');
        });
    }
}

// set up basic stuff for first load
$(document).ready(function(){

		//get the user's messages
        refreshMessages();

		//add event capture to form submit
        $("#status_entry").submit(function() {
         setStatus($("#status").val());
         return false;
        });

		//set timer to reload messages every 70 secs
		window.setInterval("refreshMessages()", 65000);

		//set timer to recalc timestamps every 60 secs
		window.setInterval("recalcTime()", 60000);

		//Bind r key to request new messages
		$(document).bind('keydown', {combi:'r', disableInInput: true}, refreshMessages);
});
