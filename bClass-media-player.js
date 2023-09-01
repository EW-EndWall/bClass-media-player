$(document).ready(function () {
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
   */
  if ($(".sound-player-container").length) {
    // * check .sound-player-list
    if ($(".sound-player-list").length) {
      // * add song list
      $(".sound-player-list a").on("click", function () {
        const audioElement = $(this).children("audio")[0];
        const addData = [
          {
            title: audioElement.title,
            artist: audioElement.getAttribute("artist"),
            album: audioElement.getAttribute("album"),
            poster: [
              {
                src: audioElement.getAttribute("poster"),
                sizes: "512x512",
                type: "image/jpg",
              },
            ],
            url: audioElement.src,
          },
        ];
        // * add data
        let localData =
          JSON.parse(localStorage.getItem("sound-player-songs")) || [];
        localData = localData.concat(addData);
        localStorage.setItem("sound-player-songs", JSON.stringify(localData));
      });
    }

    // * audio player list
    let soundPlayerAudio = [];
    $(".sound-player-container").each(function () {
      let soundPlayerContainer = $(this);
      const audioElement = soundPlayerContainer.find("audio").length
        ? soundPlayerContainer.find("audio")[0]
        : new Audio();
      // * push audio player
      soundPlayerAudio.push(audioElement);
      // * sound player loading
      const soundPlayerLoading = soundPlayerContainer.find(
        ".sound-player-loading"
      );
      // * sound player informaion
      const soundPlayerAlbum = soundPlayerContainer.find(".sound-player-album");
      const soundPlayerImg = soundPlayerContainer.find(".sound-player-img");
      const soundPlayerSongTitle = soundPlayerContainer.find(
        ".sound-player-song-title"
      );
      const soundPlayerArtistName = soundPlayerContainer.find(
        ".sound-player-artist-name"
      );
      // * sound player time
      const soundPlayerCurrentTime = soundPlayerContainer.find(
        ".sound-player-currentTime"
      );
      const soundPlayerTotalTime = soundPlayerContainer.find(
        ".sound-player-totalTime"
      );
      const soundPlayerTimmer = soundPlayerContainer.find(
        ".sound-player-timmer"
      );
      // * sound player buttons
      const soundPlayerVolumeAll = $(".sound-player-volume");
      const soundPlayerVolumeIconAll = $(".sound-player-volume-icon");
      const soundPlayerShuffleBtnAll = $(".sound-player-shuffle-btn");
      const soundPlayerShuffleBtn = soundPlayerContainer.find(
        ".sound-player-shuffle-btn"
      );
      const soundPlayerPreviousBtn = soundPlayerContainer.find(
        ".sound-player-prev-btn"
      );
      const soundPlayerPlayPauseBtn = soundPlayerContainer.find(
        ".sound-player-play-pause-btn"
      );
      const soundPlayerNextBtn = soundPlayerContainer.find(
        ".sound-player-next-btn"
      );
      const soundPlayerRepeatBtnAll = $(".sound-player-repeat-btn");
      const soundPlayerRepeatBtn = soundPlayerContainer.find(
        ".sound-player-repeat-btn"
      );
      // * sound player settings
      let currentSongIndex = 0;
      const soundPlayerSkipTime = 5;
      let soundPlayerShuffle =
        localStorage.getItem("player-shuffle") === "true";
      let soundPlayerRepeat = localStorage.getItem("player-repeat") === "true";
      // * Song information
      let songs = audioElement.src
        ? [
            {
              title: audioElement.title,
              artist: audioElement.getAttribute("artist"),
              album: audioElement.getAttribute("album"),
              poster: [
                {
                  src: audioElement.getAttribute("poster"),
                  sizes: "512x512",
                  type: "image/jpg",
                },
              ],
              url: audioElement.src,
            },
          ]
        : false;

      // * if local song is get list
      let songisLocal = false;
      if (!songs) {
        songs = JSON.parse(localStorage.getItem("sound-player-songs")) || [];
        songisLocal = true;
      }

      // * local song is get list
      function getSongLocal() {
        if (songisLocal) {
          songs = JSON.parse(localStorage.getItem("sound-player-songs"));
        }
      }

      // * Function to format time in minutes and seconds
      function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }

      // * start playing the song
      function playSong() {
        // * if local song is get list
        getSongLocal();
        // * is multiplay
        soundPlayerAudio.forEach(function (e) {
          if (!e.hasAttribute("multiplay")) e.pause();
        });
        // * changle play pause icon
        togglePlayPauseIcon();
        // * song play
        audioElement.play();
      }

      // * pause song
      function pauseSong() {
        // * if local song is get list
        getSongLocal();
        // * changle play pause icon
        togglePlayPauseIcon();
        // * song pause
        audioElement.pause();
      }

      // * Get a random song index
      function getRandomSongIndex() {
        return Math.floor(Math.random() * songs.length);
      }

      // * Switch song to next song (partially updated with upload)
      function nextSong() {
        // * if local song is get list
        getSongLocal();
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
        // * if local song is get list
        getSongLocal();
        if (audioElement.currentTime < 5) {
          // * If the current time is less than 5 seconds, go to the previous song
          currentSongIndex =
            currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
          loadSong(currentSongIndex);
          // * song play
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
        const song = songs[index];
        switch (songs.length) {
          case 0:
            // * if not song
            soundPlayerPlayPauseBtn.hide();
            soundPlayerNextBtn.hide();
            soundPlayerPreviousBtn.hide();
            soundPlayerRepeatBtn.hide();
            soundPlayerShuffleBtn.hide();
            break;
          case 1:
            // * if 1 song
            soundPlayerNextBtn.hide();
            soundPlayerPreviousBtn.hide();
            soundPlayerRepeatBtn.hide();
            soundPlayerShuffleBtn.hide();
            loadStart(song);
            break;

          default:
            loadStart(song);
            break;
        }
        function loadStart(song) {
          // *
          mediaSessionNavigator(
            song.title,
            song.artist,
            song.album,
            song.poster
          );
          // * player info
          togglePlayer(
            song.album,
            song.poster.pop().src,
            song.title,
            song.artist
          );

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
      soundPlayerShuffleBtnAll.on("click", function () {
        toggleShuffle(!soundPlayerShuffle);
        // * If shuffle is enabled and repeat is also enabled, disable repeat
        if (soundPlayerShuffle && soundPlayerRepeat) {
          toggleRepeat(false);
        }
      });

      // * Trigger on clicking play again
      soundPlayerRepeatBtnAll.on("click", function () {
        toggleRepeat(!soundPlayerRepeat);
        // * If repeat is enabled and shuffle is also enabled, disable shuffle
        if (soundPlayerRepeat && soundPlayerShuffle) {
          toggleShuffle(false);
        }
      });

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
        // * song pause
        pauseSong();
        if (soundPlayerRepeat) {
          loadSong(currentSongIndex);
          // * song play
          playSong();
        } else {
          // * song next
          nextSong();
        }
      });

      // * get local volume data
      toggleVolume(localStorage.getItem("player-volume") || 1);

      // * Trigger when soundbar's value changes
      soundPlayerVolumeAll.on("input", function () {
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
          // * song pause
          pauseSong();
        } else {
          // * song play
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
        if (soundPlayerSongTitle.length && title)
          soundPlayerSongTitle.text(title);
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
        if (soundPlayerVolumeAll.length) {
          soundPlayerVolumeAll.val(vol);
          // *Adjust volume based on value of soundbar
          audioElement.volume = vol;
          // * Save volume to localStorage
          localStorage.setItem("player-volume", vol);
          if (vol > 0.75) {
            soundPlayerVolumeIconAll.html(
              '<i class="fa-solid fa-volume-high"></i>'
            );
          } else if (vol > 0.25) {
            soundPlayerVolumeIconAll.html(
              '<i class="fa-solid fa-volume-low"></i>'
            );
          } else if (vol > 0) {
            soundPlayerVolumeIconAll.html(
              '<i class="fa-solid fa-volume-off"></i>'
            );
          } else {
            soundPlayerVolumeIconAll.html(
              '<i class="fa-solid fa-volume-xmark"></i>'
            );
          }
        }
      }

      // * sound shuffle mod
      function toggleShuffle(status) {
        soundPlayerShuffleBtnAll.html(
          status
            ? '<i class="fa-solid fa-shuffle"></i>'
            : '<i class="fa-solid fa-right-left"></i>'
        );
        soundPlayerShuffle = status;
        localStorage.setItem("player-shuffle", status);
      }

      // * sound repeat mod
      function toggleRepeat(status) {
        soundPlayerRepeatBtnAll.html(
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
      // * is preload none
      if (audioElement.preload === "none") {
        soundPlayerLoading.hide();
        audioElement.addEventListener("play", () => {
          // This event is triggered while the audio is playing and the data is just loading
          soundPlayerLoading.show();
        });

        audioElement.addEventListener("loadeddata", () => {
          // * This event is triggered when audio data is loaded
          soundPlayerLoading.hide();
        });
      } else {
        audioElement.addEventListener("loadeddata", () => {
          // * This event is triggered when audio data is loaded
          soundPlayerLoading.hide();
        });

        audioElement.addEventListener("waiting", () => {
          // * This event is triggered while the audio is playing and the data is just loading
          soundPlayerLoading.show();
        });
      }
      // * is playing
      audioElement.addEventListener("playing", () => {
        // * This event is triggered when the sound starts playing
        soundPlayerLoading.hide();
        togglePlayPauseIcon();
      });
      // * is pause
      audioElement.addEventListener("pause", () => {
        // * This event is triggered when audio is stopped
        togglePlayPauseIcon();
      });
      // * load first song
      loadSong(currentSongIndex);
      toggleRepeat(soundPlayerRepeat);
      toggleShuffle(soundPlayerShuffle);
    });
  }
});
