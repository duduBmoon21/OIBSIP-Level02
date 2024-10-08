// // JavaScript for a simple interaction on the play button
// // document.getElementById('playVideo').addEventListener('click', function() {
// //     alert('Video Play Feature Coming Soon!');
// // });

// // Load the IFrame Player API code asynchronously.
// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;

// // This function creates an <iframe> and YouTube player after the API code downloads.
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: 'YOUR_VIDEO_ID', 
//     events: {
//       'onReady': onPlayerReady
//     }
//   });
// }

// // The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   var playButton = document.getElementById("playVideo");
//   playButton.addEventListener("click", function() {
//     player.playVideo();
//   });
// }
