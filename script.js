let playBtn = document.querySelectorAll(".button-controls span")[1];
let forwardBtn = document.querySelectorAll(".button-controls span")[2];
let previousBtn = document.querySelectorAll(".button-controls span")[0];
let songNameFeild = document.querySelector(".song-name");
let singerNameFeild = document.querySelector(".singer-name");
let body = document.querySelector("body");
let container = document.querySelector(".container");
let isSongPlaying = false;
let audio = document.createElement("audio");
body.appendChild(audio);
audio.setAttribute("preload" , "metadata");
let positionControl = document.querySelector(".position-controls input");
positionControl.value = 0;
let volumeControl = document.querySelector(".volume-controls input");
volumeControl.value = 100;
// let songTime = 0;
let songIndex = 0;
let songs = [
  {
    songName : "Kalimba",
    singerName : "Mr. Scruff",
    path : "Music/Kalimba.mp3"
  }, 
  {
    songName : "Maid with the Flaxen Hair",
    singerName : "Richard Stoltzman",
    path : "Music/Maid with the Flaxen Hair.mp3"
  },
  {
    songName : "Sleep Away",
    singerName : "Bob Acri",
    path : "Music/Sleep Away.mp3"
  }
]

songNameFeild.innerText = songs[songIndex]["songName"];
singerNameFeild.innerText = songs[songIndex]["singerName"];

volumeControl.addEventListener("change", function() {
  let audioVolume = (volumeControl.value / 100);
  audio.volume = audioVolume;
  document.querySelector(".current-volume").innerHTML = volumeControl.value;
  let volumeIcon = document.querySelector(".volume-controls span");

  if(audio.volume == 0) {
    volumeIcon.innerText = "volume_off";
  }
  else {
    volumeIcon.innerText = "volume_up";
  }
});

forwardBtn.addEventListener('click', function() {
  audio.pause();
  isSongPlaying = false;
  playBtn.innerHTML = "play_circle_filled";
  body.classList.remove("music-on");
  songIndex = ((songIndex + 1) % songs.length);
  songNameFeild.innerText = songs[songIndex]["songName"];
  singerNameFeild.innerText = songs[songIndex]["singerName"];
})

previousBtn.addEventListener('click', function(){
  audio.pause();
  isSongPlaying = false;
  playBtn.innerHTML = "play_circle_filled";
  body.classList.remove("music-on");
  songIndex = songIndex - 1;
  if(songIndex == -1) {
    songIndex = (songIndex % songs.length) + songs.length;
  }
  songNameFeild.innerText = songs[songIndex]["songName"];
  singerNameFeild.innerText = songs[songIndex]["singerName"];
})

playBtn.addEventListener('click', playSong);

function playSong() {
  if(isSongPlaying) {
    pauseSong();
    isSongPlaying = false;
  } else {
    isSongPlaying = true;
    if(positionControl.value == 0) {
      startSong();
    } else {
      resumeSong();
    }
  }
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "play_circle_filled";
  body.classList.remove("music-on");
}

function startSong() {
  audio.src = songs[songIndex]["path"];
  audio.onloadedmetadata = function() {
    positionControl.max = audio.duration;
  }
  audio.play();
  playBtn.innerHTML = "pause_circle_filled";
  body.classList.add("music-on");

  audio.ontimeupdate = function() {
    positionControl.value = audio.currentTime;
  }
}

function resumeSong() {
  audio.src = songs[songIndex]["path"];
  audio.currentTime = parseInt(positionControl.value);
  audio.onloadedmetadata = function() {
    positionControl.max = audio.duration;
  }
  audio.play();
  playBtn.innerHTML = "pause_circle_filled";
  body.classList.add("music-on");

  audio.ontimeupdate = function() {
    positionControl.value = audio.currentTime;
  }
}

audio.onended = function() {
  isSongPlaying = false;
  playBtn.innerHTML = "play_circle_filled";
  body.classList.remove("music-on");
  positionControl.value = 0;
}


// positionControl.onmousedown = function() { // works well on PC but not on mobile devices
//   audio.ontimeupdate = null;
//   audio.pause();
//   isSongPlaying = false;
//   playBtn.innerHTML = "play_circle_filled";
//   body.classList.remove("music-on");
// }


//Works on PC as well as on mobile devices
positionControl.onpointerdown = function() {
  audio.ontimeupdate = null;
  audio.pause();
  isSongPlaying = false;
  playBtn.innerHTML = "play_circle_filled";
  body.classList.remove("music-on");
}



