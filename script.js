
let songs = ["Alan Walker - Fade.mp3", "M4SONIC - Weapon.mp3", "NCS - Ark.mp3"];
let covers = ["Walker.jpg", "M4SONIC.jpg", "NCS.jpg"];

let currentSongIndex = 0;
let audio = new Audio();
let isShuffleEnabled = false;
let isRepeatEnabled = false;

function loadSong() {
  audio.src = songs[currentSongIndex];
  audio.addEventListener('ended', handleSongEnd);
  audio.addEventListener('timeupdate', updateProgressBar);
  updatePlayer();
}






function updatePlayer() {
    let albumArt = document.querySelector('.album-art');
    let songTitle = document.querySelector('.song-title');
    let artistName = document.querySelector('.artist-name');
    let progressBar = document.querySelector('.progress-bar');
    let playlistItems = document.querySelectorAll('.playlist li');

albumArt.style.backgroundImage = 'url(' + covers[currentSongIndex] + ')';
songTitle.textContent = songs[currentSongIndex].split(".")[0];

for (let i = 0; i < playlistItems.length; i++) {
if (i === currentSongIndex) {
  playlistItems[i].classList.add('active');
} else {
  playlistItems[i].classList.remove('active');
}
}
}








function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}




function nextSong() {
  if (isShuffleEnabled) {
    currentSongIndex = getRandomIndex();
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong();
  audio.play();
}





function previousSong() {
  if (isShuffleEnabled) {
    currentSongIndex = getRandomIndex();
  } else {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  }
  loadSong();
  audio.play();
}




function selectSong(index) {
  currentSongIndex = index;
  loadSong();
  audio.play();
}





function changeVolume(value) {
  audio.volume = value / 100;
}




function toggleMute() {
  audio.muted = !audio.muted;
}




function toggleShuffle() {
isShuffleEnabled = !isShuffleEnabled;
let shuffleButton = document.querySelector('.player button:nth-child(11)');
shuffleButton.classList.toggle('active');
}




function toggleRepeat() {
isRepeatEnabled = !isRepeatEnabled;
let repeatButton = document.querySelector('.player button:nth-child(12)');
repeatButton.classList.toggle('active');
}



function handleSongEnd() {
  if (isRepeatEnabled) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextSong();
  }
}




function getRandomIndex() {
    let index = Math.floor(Math.random() * songs.length);
  if (index === currentSongIndex) {
    index = getRandomIndex();
  }
  return index;
}




function updateProgressBar() {
    let progressBar = document.querySelector('.progress-bar');
    let progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
}



function seek(event) {
    let progressBar = document.querySelector('.progress-bar');
    let progress = (event.clientX - progressBar.parentElement.getBoundingClientRect().left) / progressBar.parentElement.offsetWidth;
    let newTime = audio.duration * progress;

audio.currentTime = newTime;
}



audio.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    let progressBar = document.querySelector('.progress-bar');
    let progress = (audio.currentTime / audio.duration) * 100;
progressBar.style.width = progress + '%';
}


loadSong();