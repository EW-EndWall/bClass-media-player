// ! test func
// const songdata = [
//   {
//     title: "Fear [Copyright Free]",
//     artist: "NEFFEX",
//     album: "No.73",
//     poster: [
//       {
//         src: "https://github.endwall.pw/demo-content/images/images4.jpg",
//         sizes: "96x96",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images4.jpg",
//         sizes: "128x128",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images4.jpg",
//         sizes: "192x192",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images4.jpg",
//         sizes: "256x256",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images4.jpg",
//         sizes: "384x384",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images4.jpg",
//         sizes: "512x512",
//         type: "image/jpg",
//       },
//     ],
//     url: "https://github.endwall.pw/demo-content/sounds/sound0.mp3",
//   },
//   {
//     title: "Mirror [Copyright Free]",
//     artist: "NEFFEX",
//     album: "No.79",
//     poster: [
//       {
//         src: "https://github.endwall.pw/demo-content/images/images2.jpg",
//         sizes: "96x96",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images2.jpg",
//         sizes: "128x128",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images2.jpg",
//         sizes: "192x192",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images2.jpg",
//         sizes: "256x256",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images2.jpg",
//         sizes: "384x384",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images2.jpg",
//         sizes: "512x512",
//         type: "image/jpg",
//       },
//     ],
//     url: "https://github.endwall.pw/demo-content/sounds/sound1.mp3",
//   },
//   {
//     title: "Nocturnal Soul (Royalty Free Music)",
//     artist: "Sonum",
//     album: "Royalty",
//     poster: [
//       {
//         src: "https://github.endwall.pw/demo-content/images/images8.jpg",
//         sizes: "96x96",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images8.jpg",
//         sizes: "128x128",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images8.jpg",
//         sizes: "192x192",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images8.jpg",
//         sizes: "256x256",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images8.jpg",
//         sizes: "384x384",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images8.jpg",
//         sizes: "512x512",
//         type: "image/jpg",
//       },
//     ],
//     url: "https://github.endwall.pw/demo-content/sounds/sound2.mp3",
//   },
//   {
//     title: "Unsolved Issues (Royalty Free Music)",
//     artist: "Magnus Ludvigsson",
//     album: "Royalty",
//     poster: [
//       {
//         src: "https://github.endwall.pw/demo-content/images/images9.jpg",
//         sizes: "96x96",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images9.jpg",
//         sizes: "128x128",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images9.jpg",
//         sizes: "192x192",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images9.jpg",
//         sizes: "256x256",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images9.jpg",
//         sizes: "384x384",
//         type: "image/jpg",
//       },
//       {
//         src: "https://github.endwall.pw/demo-content/images/images9.jpg",
//         sizes: "512x512",
//         type: "image/jpg",
//       },
//     ],
//     url: "https://github.endwall.pw/demo-content/sounds/sound3.mp3",
//   },
// ];
// localStorage.setItem("sound-player-songs", JSON.stringify(songdata));
// ----------------------------------------------
// loadPartialSong(currentSongIndex, 25);
// loadNextSong();

// function loadPartialSong(index, startTime = 0) {
//   const song = songs[index];

//   mediaSessionNavigator(song.title, song.artist, song.album, song.poster);

//   songTitle.text(song.title);
//   artistName.text(song.artist);

//   // * Download and play the whole song if the song duration is less than 20 seconds
//   if (audioElement.duration < 20) {
//     audioElement.src = song.url;
//   } else {
//     // * It will be played by adding the loaded start time
//     audioElement.src = ""; // * stop previous song
//     audioElement.src = song.url + "#t=" + startTime; // * load new song
//   }
// }
// // * partial loading
// function loadNextSong() {
//   if (playerShuffle) {
//     // * If shuffle is enabled, load a new random song
//     currentSongIndex = getRandomSongIndex();
//   } else {
//     // * Otherwise, play the next song in order
//     currentSongIndex = (currentSongIndex + 1) % songs.length;
//   }

//   // * Let's use a loop to make it play the indexes sequentially
//   let startingIndex = currentSongIndex;
//   while (true) {
//     loadSong(currentSongIndex);
//     // loadPartialSong(currentSongIndex);
//     playSong();

//     // * Exit loop when song is played sequentially
//     if (currentSongIndex === startingIndex) {
//       break;
//     }

//     // * Increase start time by 20 seconds for partial reload
//     const startTime = audioElement.currentTime + 20;
//     if (startTime >= audioElement.duration) {
//       // * If the start time is longer than the total time of the song, skip to the next song
//       currentSongIndex = (currentSongIndex + 1) % songs.length;
//     } else {
//       // * Partial load and play if start time is ok
//       loadPartialSong(currentSongIndex, startTime);
//       playSong();
//       // * Enable the "Previous" button when playing the next song
//       break;
//     }
//   }
// }

// --------------------------------------------------------------
// // * Tracking changes in progress value
// const observer = new MutationObserver(() => {
//   togglePlayPauseIcon();
// });

// // * start monitoring
// observer.observe(document.getElementById("progress"), {
//   attributes: true,
//   attributeFilter: ["value"],
// });
// --------------------------------------------------------------
/*
 * --------
 * | todo |
 * --------
 * multiplay adında atrubut koy varsa coklu calma aktif olsun
 * en son kaldığı yerden devam etsin
 * eğer önceki veya sonraki yok ise butonları kapat
 */

if ($(".sound-player-container").length) {
  // * sound player loading
  const soundPlayerLoading = $(".sound-player-loading");
  // * sound player informaion
  const soundPlayerAlbum = $(".sound-player-album");
  const soundPlayerImg = $(".sound-player-img");
  const soundPlayerSongTitle = $(".sound-player-song-title");
  const soundPlayerArtistName = $(".sound-player-artist-name");
  // * sound player time
  const soundPlayerCurrentTime = $(".sound-player-currentTime");
  const soundPlayerTotalTime = $(".sound-player-totalTime");
  const soundPlayerTimmer = $(".sound-player-timmer");
  // * sound player buttons
  const soundPlayerVolume = $(".sound-player-volume");
  const soundPlayerVolumeIcon = $(".sound-player-volume-icon");
  const soundPlayerShuffleBtn = $(".sound-player-shuffle-btn");
  const soundPlayerPreviousBtn = $(".sound-player-prev-btn");
  const soundPlayerPlayPauseBtn = $(".sound-player-play-pause-btn");
  const soundPlayerNextBtn = $(".sound-player-next-btn");
  const soundPlayerRepeatBtn = $(".sound-player-repeat-btn");
  // * sound player settings
  let currentSongIndex = 0;
  const soundPlayerSkipTime = 5;
  let soundPlayerShuffle = localStorage.getItem("player-shuffle") === "true";
  let soundPlayerRepeat = localStorage.getItem("player-repeat") === "true";
  // * Song information
  let songs = JSON.parse(localStorage.getItem("sound-player-songs")) || [];

  // * Function to format time in minutes and seconds
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // * start playing the song
  function playSong() {
    togglePlayPauseIcon();
    audioElement.play();
  }

  // * pause song
  function pauseSong() {
    togglePlayPauseIcon();
    audioElement.pause();
  }

  // * Get a random song index
  function getRandomSongIndex() {
    return Math.floor(Math.random() * songs.length);
  }

  // * Switch song to next song (partially updated with upload)
  function nextSong() {
    // * If we are not in shuffle mode and not in repeat mode and the last song has been played, stop playing and go back to the first song.
    if (
      !soundPlayerShuffle &&
      !soundPlayerRepeat &&
      currentSongIndex === songs.length - 1
    ) {
      // * back to first song
      currentSongIndex = 0;
      loadSong(currentSongIndex);
      // * stop playing the song
      pauseSong();
      return;
    }
    // * In other cases, switch the song to the next song
    if (soundPlayerShuffle) {
      currentSongIndex = getRandomSongIndex();
    } else {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    // * load song
    loadSong(currentSongIndex);
    // * play song
    playSong();
  }

  // * Switch song to previous song
  function previousSong() {
    if (audioElement.currentTime < 5) {
      // * If the current time is less than 5 seconds, go to the previous song
      currentSongIndex =
        currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
      loadSong(currentSongIndex);
      playSong();
    } else {
      // * If the current time is more than 5 seconds, restart the current song
      audioElement.currentTime = 0;
    }
  }

  // * rewind
  function goForward() {
    if (
      audioElement.currentTime + soundPlayerSkipTime >=
      audioElement.duration
    ) {
      audioElement.currentTime = audioElement.duration;
    } else {
      audioElement.currentTime += soundPlayerSkipTime;
    }
  }

  // * fast forward
  function goBack() {
    if (0 >= audioElement.currentTime - soundPlayerSkipTime) {
      audioElement.currentTime = 0;
    } else {
      audioElement.currentTime -= soundPlayerSkipTime;
    }
  }

  // * load song
  function loadSong(index) {
    // !buradaki indexin yerine direk song u yolla ?
    const song = songs[index];
    // *
    mediaSessionNavigator(song.title, song.artist, song.album, song.poster);
    // * player info
    togglePlayer(song.album, song.poster.pop().src, song.title, song.artist);

    // * timmer value
    toggleTimmer(0);

    // * stop previous song
    audioElement.src = "";
    // * Upload new song
    audioElement.src = song.url;

    audioElement.addEventListener("loadedmetadata", function () {
      // * Update times when new song is uploaded
      toggleCurrentTime(formatTime(audioElement.currentTime));
      toggleTotalTime(formatTime(audioElement.duration));
    });
  }

  // *
  function mediaSessionNavigator(title, artist, album, poster) {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: album,
        artwork: poster,
      });
      navigator.mediaSession.setActionHandler("previoustrack", function () {
        // * Transitions to the previous song
        previousSong();
      });
      navigator.mediaSession.setActionHandler("nexttrack", function () {
        // * Transition to next song
        nextSong();
      });
    }
  }

  // * Trigger on clicking the start/stop button of the song
  soundPlayerPlayPauseBtn.on("click", togglePlayPause);
  // * Trigger on previous song button click
  soundPlayerPreviousBtn.on("click", previousSong);
  // * Trigger on next song button click
  soundPlayerNextBtn.on("click", nextSong);

  // * Trigger when shuffle button is clicked
  soundPlayerShuffleBtn.on("click", function () {
    toggleShuffle(!soundPlayerShuffle);
    // * If shuffle is enabled and repeat is also enabled, disable repeat
    if (soundPlayerShuffle && soundPlayerRepeat) {
      toggleRepeat(false);
    }
  });

  // * Trigger on clicking play again
  soundPlayerRepeatBtn.on("click", function () {
    toggleRepeat(!soundPlayerRepeat);
    // * If repeat is enabled and shuffle is also enabled, disable shuffle
    if (soundPlayerRepeat && soundPlayerShuffle) {
      toggleShuffle(false);
    }
  });

  // * Creating an audio player
  const audioElement = new Audio();

  // * Update timmer bar
  audioElement.addEventListener("timeupdate", function () {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    // * Check if currentTime and duration are valid finite numbers
    if (
      !isNaN(currentTime) &&
      isFinite(currentTime) &&
      !isNaN(duration) &&
      isFinite(duration)
    ) {
      // * timmer time
      toggleTimmer((currentTime / duration) * 100);

      // * Display the current time and total time
      toggleCurrentTime(formatTime(currentTime));
      toggleTotalTime(formatTime(duration));
    }
  });
  // * sound ended
  audioElement.addEventListener("ended", function () {
    pauseSong();
    if (soundPlayerRepeat) {
      loadSong(currentSongIndex);
      playSong();
    } else {
      nextSong();
    }
  });

  // * get local volume data
  toggleVolume(localStorage.getItem("player-volume") || 1);

  // * Trigger when soundbar's value changes
  soundPlayerVolume.on("input", function () {
    toggleVolume($(this).val());
  });

  // * sound timer click
  if (soundPlayerTimmer.length) {
    soundPlayerTimmer.on("click", function (e) {
      const progressBarRect = this.getBoundingClientRect();
      const clickX = e.clientX - progressBarRect.left;
      const progressBarWidth = progressBarRect.width;
      const progressPercentage = clickX / progressBarWidth;
      const newTime = audioElement.duration * progressPercentage;
      audioElement.currentTime = newTime;
    });
  }

  // * shortcut keys
  $(document).on("keydown", function (event) {
    switch (event.keyCode) {
      // * Space bar
      case 32:
        togglePlayPause();
        break;
      // * right arrow
      case 37:
        goBack();
        break;
      // * Up arrow
      case 38:
        increaseVolume();
        break;
      // * Left arrow
      case 39:
        goForward();
        break;
      // * Down arrow
      case 40:
        decreaseVolume();
        break;
      // * MediaNextTrack
      case 176:
        nextSong();
        break;
      // * MediaPreviousTrack
      case 177:
        previousSong();
        break;

      default:
        break;
    }
  });

  // * sound volume up function
  function increaseVolume() {
    const newVolume = parseFloat(audioElement.volume) + 0.1;
    if (newVolume <= 1) {
      toggleVolume(newVolume);
    }
  }

  // * sound volume down function
  function decreaseVolume() {
    const newVolume = parseFloat(audioElement.volume) - 0.1;
    if (newVolume >= 0) {
      toggleVolume(newVolume);
    }
  }

  // * sound start/stop function
  function togglePlayPause() {
    if (!audioElement.paused) {
      pauseSong();
    } else {
      playSong();
    }
  }

  // * sound play pause icon
  function togglePlayPauseIcon() {
    soundPlayerPlayPauseBtn.html(
      !audioElement.paused
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>'
    );
  }

  // * sound player info
  function togglePlayer(album, poster, title, artist) {
    if (soundPlayerAlbum.length && album) soundPlayerAlbum.text(album);
    if (soundPlayerImg.length && poster) soundPlayerImg.attr("src", poster);
    if (soundPlayerSongTitle.length && title) soundPlayerSongTitle.text(title);
    if (soundPlayerArtistName.length && artist)
      soundPlayerArtistName.text(artist);
  }

  // * sound timmer changle
  let soundPlayerTimmerIsDragging = false;
  function toggleTimmer(time) {
    if (soundPlayerTimmer.length) {
      soundPlayerTimmer.on("mousedown", () => {
        soundPlayerTimmerIsDragging = true;
      });
      soundPlayerTimmer.on("mouseup", () => {
        soundPlayerTimmerIsDragging = false;
      });
      if (!soundPlayerTimmerIsDragging) {
        soundPlayerTimmer.val(time);
      }
    }
  }

  // * sound current time changle
  function toggleCurrentTime(time) {
    if (soundPlayerCurrentTime.length) {
      soundPlayerCurrentTime.text(time);
    }
  }

  // * sound total time changle
  function toggleTotalTime(time) {
    if (soundPlayerTotalTime.length) {
      soundPlayerTotalTime.text(time);
    }
  }

  // * sound volume changle
  function toggleVolume(vol) {
    if (soundPlayerVolume.length) {
      soundPlayerVolume.val(vol);
      // *Adjust volume based on value of soundbar
      audioElement.volume = vol;
      // * Save volume to localStorage
      localStorage.setItem("player-volume", vol);
      if (vol > 0.75) {
        soundPlayerVolumeIcon.html('<i class="fa-solid fa-volume-high"></i>');
      } else if (vol > 0.25) {
        soundPlayerVolumeIcon.html('<i class="fa-solid fa-volume-low"></i>');
      } else if (vol > 0) {
        soundPlayerVolumeIcon.html('<i class="fa-solid fa-volume-off"></i>');
      } else {
        soundPlayerVolumeIcon.html('<i class="fa-solid fa-volume-xmark"></i>');
      }
    }
  }

  // * sound shuffle mod
  function toggleShuffle(status) {
    soundPlayerShuffleBtn.html(
      status
        ? '<i class="fa-solid fa-shuffle"></i>'
        : '<i class="fa-solid fa-right-left"></i>'
    );
    soundPlayerShuffle = status;
    localStorage.setItem("player-shuffle", status);
  }

  // * sound repeat mod
  function toggleRepeat(status) {
    soundPlayerRepeatBtn.html(
      status
        ? '<i class="fa-solid fa-repeat"></i>'
        : '<i class="fa-solid fa-arrow-up-a-z"></i>'
    );
    soundPlayerRepeat = status;
    localStorage.setItem("player-repeat", status);
  }

  // audioElement.addEventListener("timeupdate", () => {
  //   const percentLoaded = (audioElement.buffered.end(0) / audioElement.duration) * 100;
  //   audioTimmerLoader.val(percentLoaded);
  // });

  audioElement.addEventListener("loadeddata", () => {
    // * This event is triggered when audio data is loaded
    soundPlayerLoading.hide();
  });

  audioElement.addEventListener("waiting", () => {
    // * This event is triggered while the audio is playing and the data is just loading
    soundPlayerLoading.show();
  });

  audioElement.addEventListener("playing", () => {
    // * This event is triggered when the sound starts playing
    soundPlayerLoading.hide();
    togglePlayPauseIcon();
  });

  audioElement.addEventListener("pause", () => {
    // * This event is triggered when audio is stopped
    togglePlayPauseIcon();
  });

  // * load first song
  loadSong(currentSongIndex);
  toggleRepeat(soundPlayerRepeat);
  toggleShuffle(soundPlayerShuffle);
}
