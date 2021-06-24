// This was a script previosly embedded into mlk.html. Its no longer needed, as we now use plyr, with just the HTML5 audio player for fallback


// Previos HTML controls that were never used

<div id="controls" style="display:none;">
	<button id="play-pause" title="play" onclick="togglePlayPause()"><i class='fa fa-play'></i></button>
	<button id="volume-button" title="volume" onclick="showHideVolume()"><i class='fa fa-volume-up'></i></button>
	<div id="progress-text"></div>
<!-- 							<div id="audio-progress-bar"><span id="audio-progress"></span></div> -->
	<input id="audio-progress" min="0" max="100" step="0.01" value="0" type="range" onchange="updateTime()" oninput="updateTime()"/>
	<input id="volume-slider" min="0" max="1" step="0.0001" value="1" type="range" onchange="setVolume()" oninput="setVolume()" style="display:none;"/>
</div>

// 							IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 							Uncomment audio.controls and controls.style to use custom audio controlls
							var audio = document.getElementById("episode-player");
						  // audio.controls = false;
						  
						  var controls = document.getElementById("controls");
						  // controls.style.display = 'inline';
						  
						  audio.currentTime = 0.01;
						  
						  audio.addEventListener('play', function() {
						  	ga('send', 'event', 'Play Episode', 'played');
						  	console.log("GA event sent: Played");
						  });
						  
						  audio.addEventListener('ended', function() {
						  	ga('send', 'event', 'Play Entire Episode', 'ended');
						  	console.log("GA event sent: Ended");
						  });
						  
						  function getParameterByName(name, url) { //Thanks to http://stackoverflow.com/a/901144/1224973
							  if (!url) url = window.location.href;
							  name = name.replace(/[\[\]]/g, "\\$&");
							  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
							    results = regex.exec(url);
							  if (!results) return null;
							  if (!results[2]) return '';
							  return decodeURIComponent(results[2].replace(/\+/g, " "));
							}
							
							var urlSetTime = getParameterByName('time');
							
							if(urlSetTime) {
								audio.currentTime = urlSetTime;
								urlSetTime = null; //Clear this when we parse it so we can use it for sharing.
							}
						  						  
						  function togglePlayPause() {
							  var playpause = document.getElementById("play-pause");
							  if (audio.paused || audio.ended) {
							    playpause.title = "pause";
							    playpause.innerHTML = "<i class='fa fa-pause'></i>";
							    audio.play();
							  }else{
							    playpause.title = "play";
							    playpause.innerHTML = "<i class='fa fa-play'></i>";
							    audio.pause();
							  }
							}
							
							function showHideVolume() {
								var volumeSlider = document.getElementById("volume-slider");
								if(volumeSlider.style.display === 'inline') {
									volumeSlider.style.display = 'none';
								}else{
									volumeSlider.style.display = 'inline';
								}
							}
							
							function setVolume() {
							  var volumeSlider = document.getElementById("volume-slider");
							  var volumeButton = document.getElementById("volume-button");
							  
							  audio.volume = volumeSlider.value;
							  if(volumeSlider.value == 0) {
								  volumeButton.innerHTML = "<i class='fa fa-volume-off'> </i><i class='fa fa-times'> </i>";
							  }else if(volumeSlider.value < 0.5) {
								  volumeButton.innerHTML = "<i class='fa fa-volume-down'></i>";
							  }else {
								  volumeButton.innerHTML = "<i class='fa fa-volume-up'></i>";
							  }
							}
							
							function updateProgress() {
							  var progress = document.getElementById("audio-progress");
							  var progressText = document.getElementById("progress-text");
							  var value = 0;
							  if (audio.currentTime > 0) {
							    value = Math.floor((100 / audio.duration) * audio.currentTime);
							  }
							  progress.value = value;
							  progressText.innerHTML = toMinSec(audio.currentTime)+'/'+toMinSec(audio.duration);
							}
							
							function updateTime() {
								var progress = document.getElementById("audio-progress");
								value = Math.floor(progress.value*10)/10;
								
								audio.currentTime = (value/100)*audio.duration;
							}
							
							function toMinSec(num) {
								sec = Math.floor(num % 60);
								return (Math.floor(num/60))+':'+(sec > 10 ? "" + sec: "0" + sec);
							}
							
							audio.addEventListener("timeupdate", updateProgress, false);
							audio.addEventListener("timeupdate", urlSetTimeSet, false);
							audio.addEventListener("ended", 
								function() { 
									var playpause = document.getElementById("play-pause");
									playpause.title = "play";
								  playpause.innerHTML = "<i class='fa fa-play'></i>"; 
								}, false);
								
// 						SOCIAL SHARING SECTION

						function urlSetTimeSet() {
							var useTimeCheck = document.getElementById("include-timestamp");
							if(useTimeCheck.checked) {
								urlSetTime = Math.floor(audio.currentTime);
							}else{
								urlSetTime = null;
							}	
						}

						function onClickFBShare() {
							if(urlSetTime) {
								var fb = window.open("https://www.facebook.com/sharer/sharer.php?u=https://commonthreadpodcast.com/mlk?time="+urlSetTime, "pop", "width=600, height=600, scrollbars=no");
							}else{
								var fb = window.open("https://www.facebook.com/sharer/sharer.php?u=https://commonthreadpodcast.com/mlk", "pop", "width=600, height=600, scrollbars=no");
							}
						}
						
						function onClickTwShare() {
							if(urlSetTime) {
								var tw = window.open("https://twitter.com/intent/tweet?url=commonthreadpodcast.com/mlk&text=The%20Common%20Thread%20Podcast%20on%20MLK.%20commonthreadpodcast.com/mlk?time="+urlSetTime, "pop", "width=600, height=600, scrollbars=no");
							}else{
								var tw = window.open("https://twitter.com/intent/tweet?url=commonthreadpodcast.com/mlk&text=The%20Common%20Thread%20Podcast%20on%20MLK.%20commonthreadpodcast.com/mlk", "pop", "width=600, height=600, scrollbars=no");
							}
						}
						
						function onClickLinkShare() {
							var linkBox = document.getElementById("share-link-box");
							var linkCopy = document.getElementById("link-copy-button");
							linkBox.style.display = "inline";
							linkCopy.style.display = "inline";
							
							if(urlSetTime) {
								linkBox.value = 'commonthreadpodcast.com/mlk?time='+urlSetTime;
							}else{
								linkBox.value = 'commonthreadpodcast.com/mlk';
							}
						}
						
						function timestampCheckChanged() {
							urlSetTimeSet();
							onClickLinkShare();
						}
						
						var x = 0;
						
						function onClickCopyLink() {
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
