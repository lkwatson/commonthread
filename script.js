//AUDIO CONTROLS, OTHER STUFF
$( document ).ready(function() {
	
	plyr.setup('.plyr',{controls:['play-large', 'play', 'progress', 'current-time', 'mute', 'volume'],volume:8,displayDuration:false});

	var audio = document.getElementById("episode-player");
	
	var controls = document.getElementById("controls");
	
	audio.currentTime = 0.01;
	
	audio.addEventListener('play', function() {
		ga('send', 'event', 'Play Episode', 'played');
		console.log("GA event sent: Played");
	});
	
	audio.addEventListener('ended', function() {
		ga('send', 'event', 'Play Entire Episode', 'ended');
		console.log("GA event sent: Ended");
	});

	var urlSetTime = getParameterByName('time');
	
	if(urlSetTime) {
		audio.currentTime = urlSetTime;
		urlSetTime = null; //Clear this when we parse it so we can use it for sharing.
	}

	function getParameterByName(name, url) { //Thanks to http://stackoverflow.com/a/901144/1224973
	  if (!url) url = window.location.href;
	  name = name.replace(/[\[\]]/g, "\\$&");
	  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
	    results = regex.exec(url);
	  if (!results) return null;
	  if (!results[2]) return '';
	  return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	
	//SOCIAL SHARING
	
	urlSetTimeSet = function() {
		var useTimeCheck = document.getElementById("include-timestamp");
		if(useTimeCheck.checked) {
			urlSetTime = Math.floor(audio.currentTime);
		}else{
			urlSetTime = null;
		}	
	}
	
	onClickFBShare = function() {
		if(urlSetTime) {
			var fb = window.open("https://www.facebook.com/sharer/sharer.php?u=https://bucommonthread.com/mlk?time="+urlSetTime, "pop", "width=600, height=600, scrollbars=no");
		}else{
			var fb = window.open("https://www.facebook.com/sharer/sharer.php?u=https://bucommonthread.com/mlk", "pop", "width=600, height=600, scrollbars=no");
		}
	}
	
	onClickTwShare = function() {
		if(urlSetTime) {
			var tw = window.open("https://twitter.com/intent/tweet?url=bucommonthread.com/mlk&text=The%20Common%20Thread%20Podcast%20on%20MLK.%20bucommonthread.com/mlk?time="+urlSetTime, "pop", "width=600, height=600, scrollbars=no");
		}else{
			var tw = window.open("https://twitter.com/intent/tweet?url=bucommonthread.com/mlk&text=The%20Common%20Thread%20Podcast%20on%20MLK.%20bucommonthread.com/mlk", "pop", "width=600, height=600, scrollbars=no");
		}
	}
	
	onClickLinkShare = function() {
		var linkBox = document.getElementById("share-link-box");
		var linkCopy = document.getElementById("link-copy-button");
		linkBox.style.display = "inline";
		linkCopy.style.display = "inline";
		
		if(urlSetTime) {
			linkBox.value = 'bucommonthread.com/mlk?time='+urlSetTime;
		}else{
			linkBox.value = 'bucommonthread.com/mlk';
		}
	}
	
	timestampCheckChanged = function() {
		urlSetTimeSet();
		onClickLinkShare();
	}
	
	var x = 0;
	
	onClickCopyLink = function() {
		x++;
		var linkBox = document.getElementById("share-link-box");
		var linkCopy = document.getElementById("link-copy-button");
		linkBox.select();
		document.execCommand('copy');
		
		if(linkCopy.innerHTML === ' Copy to Clipboard') {
			linkCopy.innerHTML = 'Copied!';
		}else{
			linkCopy.innerHTML = 'Copied! ' + x + ' times';
		}
	}
});