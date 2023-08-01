let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songImg = document.querySelector(".songImg");
let forwardIcon = document.querySelector("#forwardIcon");
let backwardIcon = document.querySelector("#backwardIcon");

// song URLs here
const songs = [
  "songs/1.mp3", 
  "songs/2.mp3",
  "songs/3.mp3"
];

// song names here
const songTitles = [
  "Zehen", 
  "Laaya",
  "Nadiyon Sa"
];

// image URLs here
const songImages = [
  "images/1.jpg", 
  "images/2.jpg",
  "images/3.jpg"
];

let currentSongIndex = 0;

// Function to load the current song and image
function loadSongAndImage() {
  song.src = songs[currentSongIndex];
  songImg.src = songImages[currentSongIndex];
  document.getElementById("songName").innerText = songTitles[currentSongIndex];
  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = 0; // Set initial progress to 0
  };
}

// Load the first song and image initially
loadSongAndImage();

function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  } else {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
}

song.ontimeupdate = function () {
  progress.value = song.currentTime;
};

progress.oninput = function () {
  song.currentTime = progress.value;
};

// progress.onclick = function (event) {
//   event.stopPropagation();
//   playPause();
// };

progress.onclick = function (event) {
  const mouseX = event.pageX - this.offsetLeft; // Get the clicked position
  const width = this.offsetWidth; // Get the total width of the progress bar
  const duration = song.duration; // Get the total duration of the song

  // Calculate the new time based on the clicked position and the total duration
  const newTime = (mouseX / width) * duration;

  // Set the current time of the song to the new calculated time
  song.currentTime = newTime;

  // Play the song from the new time
  if (song.paused) {
    playPause();
  }
};

let progressInterval;

song.onplay = function () {
  progressInterval = setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
};

song.onpause = song.onended = function () {
  clearInterval(progressInterval);
};

// Function to go to the next song
function goToNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSongAndImage();
  if (!song.paused) {
    song.play();
  }
}

// Function to go to the previous song
function goToPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSongAndImage();
  if (!song.paused) {
    song.play();
  }
}

// Event listener for clicking the forward icon
forwardIcon.addEventListener("click", () => {
  goToNextSong();
});

// Event listener for clicking the backward icon
backwardIcon.addEventListener("click", () => {
  goToPreviousSong();
});

// Function to show or hide the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("songList");
  sidebar.classList.toggle("active");
}

// Event listener for clicking the "bars" icon (hamburger icon)
document.getElementById("bars").addEventListener("click", toggleSidebar);

// Event listener for clicking on a song in the sidebar
document.querySelectorAll(".sidebar li").forEach((songItem) => {
  songItem.addEventListener("click", () => {
      const songName = songItem.innerText;
      const index = songTitles.indexOf(songName);
      if (index !== -1) {
          currentSongIndex = index;
          loadSongAndImage();
          if (!song.paused) {
              song.play();
          }


          // Hide the sidebar after clicking a song in the sidebar
          toggleSidebar();
      }
  });
});

