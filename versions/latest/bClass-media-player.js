/***
 * * Bclass media player v2.1.0
 * * Copyright 2021 ("https://github.com/EW-EndWall/bClass-media-player/blob/main/LICENSE")
 * * Licensed ("Bik Public License 4.0")
 * * License Update ("28/09/2024")
 */
/*
 * --------
 * | todo |
 * --------
 * partial load
 * descriptions affter
 */
// * ------------
// * sound player
// * ------------
document.addEventListener("DOMContentLoaded", () => {
  if ($(".sound-player-container").length) {
    const soundPlayerList = [];
    $(".sound-player-container").each((index, element) => {
      // * --------------------------------------------------
      const soundPlayerContainer = $(element);
      const soundElement = soundPlayerContainer.find("audio")[0];
      // * push sound player
      soundPlayerList.push(soundElement);
      const soundPlayerBroken = soundPlayerContainer.find(
        ".sound-player-broken"
      );
      const soundPlayerHoverLoadBtn = soundPlayerContainer.find(
        ".sound-player-hover-load"
      );
      const soundPlayerLoading = soundPlayerContainer.find(
        ".sound-player-loading"
      );
      // * sound player informaion
      const soundPlayerAlbum = soundPlayerContainer.find(".sound-player-album");
      const soundPlayerTitle = soundPlayerContainer.find(".sound-player-title");
      const soundPlayerArtistName = soundPlayerContainer.find(
        ".sound-player-artist-name"
      );
      const soundPlayerPoster = soundPlayerContainer.find(
        ".sound-player-poster"
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
      const soundPlayerTimmerHover = soundPlayerContainer.find(
        ".sound-player-timmer-hover"
      );
      // * sound player buttons
      const soundPlayerCenterControls = soundPlayerContainer.find(
        ".sound-player-center-controls"
      );
      const soundPlayerBackBtn = soundPlayerContainer.find(
        ".sound-player-back-btn"
      );
      const soundPlayerForwardBtn = soundPlayerContainer.find(
        ".sound-player-forward-btn"
      );
      const soundPlayerControls = soundPlayerContainer.find(
        ".sound-player-controls"
      );
      const soundPlayerVolumeBtn = soundPlayerContainer.find(
        ".sound-player-volume"
      );
      const soundPlayerVolumeIcon = soundPlayerContainer.find(
        ".sound-player-volume-icon"
      );
      const soundPlayerShuffleBtn = soundPlayerContainer.find(
        ".sound-player-shuffle-btn"
      );
      const soundPlayerShuffleIcon = soundPlayerContainer.find(
        ".sound-player-shuffle-icon"
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
      const soundPlayerAutoPlayBtn = soundPlayerContainer.find(
        ".sound-player-autoplay-btn"
      );
      const soundPlayerSpeedBtn = soundPlayerContainer.find(
        ".sound-player-speed-btn a"
      );
      const soundPlayerSpeedText = soundPlayerContainer.find(
        ".sound-player-speed-text"
      );
      const soundPlayerSubTitleTrack = soundPlayerContainer.find(
        "track[kind='subtitles']"
      );
      const soundPlayerSubTitleBtn = soundPlayerContainer.find(
        ".sound-player-subtitle-btn a"
      );
      const soundPlayerSubTitleText = soundPlayerContainer.find(
        ".sound-player-subtitle-text"
      );
      const soundPlayerQualityBtn = soundPlayerContainer.find(
        ".sound-player-quality-btn"
      );
      const soundPlayerQualityText = soundPlayerContainer.find(
        ".sound-player-quality-text"
      );
      const soundPlayerNextPlayBtn = soundPlayerContainer.find(
        ".sound-player-nextplay-btn"
      );
      const soundPlayerRepeatBtn = soundPlayerContainer.find(
        ".sound-player-repeat-btn"
      );
      const soundPlayerRepeatIcon = soundPlayerContainer.find(
        ".sound-player-repeat-icon"
      );
      const soundPlayerSubTitleTexts = soundPlayerContainer.find(
        ".sound-player-subtitle-texts"
      );
      // *----------
      soundPlayerTimmerHover.hide();
      soundPlayerBackBtn.hide();
      soundPlayerForwardBtn.hide();
      soundPlayerSubTitleTexts.hide();
      // * sound player settings
      const soundPlayerSubTitleApi =
        soundPlayerSettings.SubTitleApi || "/api/subtitle/";
      let currentSoundIndex = 0;
      let soundPlayerHoverLoad = soundPlayerSettings.HoverLoad || true;
      const soundPlayerSkipTime = soundPlayerSettings.SkipTime || 5;
      let soundPlayerAutoPlay =
        localStorage.getItem("sound-player-autoplay") === "true";
      let soundPlayerSpeed = localStorage.getItem("sound-player-speed") || "1";
      let soundPlayerSubtitle =
        localStorage.getItem("sound-player-subtitle") || "close";
      let soundPlayerQuality =
        localStorage.getItem("sound-player-quality") || "auto";
      let soundPlayerNextPlay =
        localStorage.getItem("sound-player-nextplay") === "true";
      let soundPlayerShuffle =
        localStorage.getItem("sound-player-shuffle") === "true";
      let soundPlayerRepeat =
        localStorage.getItem("sound-player-repeat") === "true";
      let soundPlayerTimmerIsDragging = false;
      // * quality list
      const soundQualityList = [];
      soundPlayerContainer
        .find("source")
        .toArray()
        .forEach((source) => {
          const label = source.getAttribute("label");
          const url = source.getAttribute("src");
          soundQualityList.push([label, url]);
        });
      // * sound information
      let sounds =
        soundQualityList.length && soundQualityList.slice(-1)[0][1]
          ? [
              {
                id: soundElement.getAttribute("media-id"),
                title: soundElement.getAttribute("media-title"),
                artist: soundElement.getAttribute("artist"),
                album: soundElement.getAttribute("album"),
                img: [
                  {
                    src: soundElement.getAttribute("poster"),
                    sizes: "512x512",
                    type: "image/jpg",
                  },
                ],
                url: soundQualityList,
              },
            ]
          : false;
      // * local song is get list
      if (!sounds) {
        sounds =
          JSON.parse(localStorage.getItem("sound-player-playlist")) || [];
        if (!sounds.length) {
          soundPlayerControls.hide();
          soundPlayerCenterControls.hide();
          soundPlayerPoster.hide();
          soundPlayerBroken.show();
          soundPlayerContainer.find("audio").css("visibility", "hidden");
        }
      }
      // * sound player info
      const toggleSoundPlayerMedia = (album, poster, title, artist) => {
        if (soundPlayerAlbum.length && album) soundPlayerAlbum.text(album);
        if (soundPlayerTitle.length && title) soundPlayerTitle.text(title);
        if (soundPlayerArtistName.length && artist)
          soundPlayerArtistName.text(artist);
        if (poster) soundPlayerPoster.find("img").attr("src", poster[0].src);
      };
      // * sound timmer changle
      const toggleSoundPlayerTimmer = (time) => {
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
      };
      // * sound current time changle
      const toggleSoundPlayerCurrentTime = (time) => {
        if (soundPlayerCurrentTime.length) {
          soundPlayerCurrentTime.text(time);
        }
      };
      // * sound total time changle
      const toggleSoundPlayerTotalTime = (time) => {
        if (soundPlayerTotalTime.length) {
          soundPlayerTotalTime.text(time);
        }
      };
      // * load sound
      const toggleSoundPlayerLoadMedia = (index) => {
        // * media info load
        const toggleSoundPlayerLoadMediaStart = (sound) => {
          const title = sound.title ? sound.title : null;
          const artist = sound.artist ? sound.artist : null;
          const album = sound.album ? sound.album : null;
          const poster = sound.img ? sound.img : null;
          // * player info
          toggleSoundPlayerMedia(album, poster, title, artist);
          // * timmer value
          toggleSoundPlayerTimmer(0);
          // * stop previous sound
          soundElement.src = "";
          // * Upload new sound
          const soundUrl =
            soundPlayerQuality == "auto"
              ? sound.url.slice(-1)[0]
              : sound.url.find((item) => item[0] === soundPlayerQuality) ||
                sound.url[sound.url.length - 1];
          soundElement.src = soundUrl[1];
          // * if load media change time
          soundElement.addEventListener("loadedmetadata", () => {
            // * Update times when new sound is uploaded
            toggleSoundPlayerCurrentTime(
              playerFormatTime(soundElement.currentTime)
            );
            toggleSoundPlayerTotalTime(playerFormatTime(soundElement.duration));
          });
        };
        const sound = sounds[index];
        switch (sounds.length) {
          case 0:
            // * if not sound
            soundPlayerPlayPauseBtn.hide();
            soundPlayerNextBtn.hide();
            soundPlayerPreviousBtn.hide();
            soundPlayerRepeatBtn.hide();
            soundPlayerShuffleBtn.hide();
            break;
          case 1:
            // * if 1 sound
            soundPlayerNextBtn.hide();
            soundPlayerPreviousBtn.hide();
            soundPlayerRepeatBtn.hide();
            soundPlayerShuffleBtn.hide();
            toggleSoundPlayerLoadMediaStart(sound);
            break;

          default:
            toggleSoundPlayerLoadMediaStart(sound);
            break;
        }
      };
      // * sound volume changle
      const toggleSoundPlayerVolume = (vol) => {
        if (soundPlayerVolumeBtn.length) {
          soundPlayerVolumeBtn.val(vol);
          // *Adjust volume based on value of soundbar
          soundElement.volume = vol;
          // * Save volume to localStorage
          localStorage.setItem("player-volume", vol);
          if (vol > 0.75) {
            soundPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-high"></i>'
            );
          } else if (vol > 0.25) {
            soundPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-low"></i>'
            );
          } else if (vol > 0) {
            soundPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-off"></i>'
            );
          } else {
            soundPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-xmark"></i>'
            );
          }
        }
      };
      // * sound shuffle option
      const toggleSoundPlayerShuffle = (status) => {
        soundPlayerShuffleIcon.html(
          status
            ? '<i class="fa-solid fa-shuffle"></i>'
            : '<i class="fa-solid fa-right-left"></i>'
        );
        soundPlayerShuffleBtn
          .find("input")
          .prop("checked", status ? true : false);
        soundPlayerShuffle = status;
        localStorage.setItem("sound-player-shuffle", status);
      };
      // * sound repeat option
      const toggleSoundPlayerRepeat = (status) => {
        soundPlayerRepeatIcon.html(
          status
            ? '<i class="fa-solid fa-repeat"></i>'
            : '<i class="fa-solid fa-arrow-up-a-z"></i>'
        );
        soundPlayerRepeatBtn
          .find("input")
          .prop("checked", status ? true : false);
        soundPlayerRepeat = status;
        localStorage.setItem("sound-player-repeat", status);
      };
      // * media autoplay option
      const toggleSoundPlayerAutoPlay = (status) => {
        soundPlayerAutoPlayBtn
          .find("input")
          .prop("checked", status ? true : false);
        soundPlayerAutoPlay = status;
        localStorage.setItem("sound-player-autoplay", status);
      };
      // * media nextplay option
      const toggleSoundPlayerNextPlay = (status) => {
        soundPlayerNextPlayBtn
          .find("input")
          .prop("checked", status ? true : false);
        soundPlayerNextPlay = status;
        localStorage.setItem("sound-player-nextplay", status);
      };
      // * media speed option
      const toggleSoundPlayerSpeed = (status) => {
        const text = soundPlayerSpeedBtn
          .find("span")
          .filter((index, element) => {
            return $(element).attr("value") === status;
          })
          .text();
        soundPlayerSpeedText.text(text);
        soundPlayerSpeed = status;
        localStorage.setItem("sound-player-speed", status);
        soundElement.playbackRate = status;
      };
      // * media quality option
      const toggleSoundPlayerQuality = (status) => {
        if (sounds.length) {
          localStorage.setItem("sound-player-quality", status);
          const url = sounds[currentSoundIndex].url;
          // * media play or pause
          let soundElementPause = false;
          if (!soundElement.paused) {
            soundElementPause = true;
            soundElement.pause();
          }
          // * quality changle
          const currentTime = soundElement.currentTime;
          if (soundPlayerQuality == "auto") {
            soundElement.src = url.slice(-1)[0][1];
          } else {
            const sound =
              url.find((item) => item[0] === status) || url.slice(-1)[0];
            soundElement.src = sound[1];
            status = sound[0];
          }
          soundPlayerQuality = status;
          soundPlayerQualityText.text(
            status != "auto" ? status + "kbps" : status
          );
          soundElement.currentTime = currentTime;
          soundElementPause ? soundElement.play() : soundElement.pause();
        }
      };
      // * guality create
      const toggleSoundPlayerQualityAppend = () => {
        if (sounds.length) {
          const target = soundPlayerQualityBtn.find("li");
          let createElement = target.clone();
          sounds[currentSoundIndex].url.forEach((source) => {
            const label = source[0];
            createElement = createElement.clone();
            createElement
              .find("span")
              .attr("value", label)
              .text(label + "kbps");
            target.after(createElement);
          });
        }
      };
      // * Get a random sound index
      const getRandomSoundIndex = () => {
        return Math.floor(Math.random() * sounds.length);
      };
      // * Switch sound to next sound (partially updated with upload)
      const toggleSoundPlayerNextMedia = () => {
        // * If we are not in shuffle mode and not in repeat mode and the last sound has been played, stop playing and go back to the first sound.
        if (
          !soundPlayerShuffle &&
          !soundPlayerRepeat &&
          currentSoundIndex === sounds.length - 1 &&
          !soundPlayerNextPlay
        ) {
          // * back to first sound
          currentSoundIndex = 0;
          toggleSoundPlayerLoadMedia(currentSoundIndex);
          // * stop playing the sound
          toggleSoundPlayerPauseMedia();
          return;
        }
        if (sounds.length > 1) {
          if (soundPlayerShuffle) {
            // * shuffle sound
            currentSoundIndex = getRandomSoundIndex();
          } else {
            // * next sound and is last sound to first sound
            currentSoundIndex = (currentSoundIndex + 1) % sounds.length;
          }
        } else {
          currentSoundIndex = 0;
        }
        const isPlay = !soundElement.paused;
        // * load sound
        toggleSoundPlayerLoadMedia(currentSoundIndex);
        if (isPlay || soundPlayerAutoPlay) {
          // * play sound
          toggleSoundPlayerPlayMedia();
        }
      };
      // * Switch sound to previous sound
      const toggleSoundPlayerPreviousMedia = () => {
        if (soundElement.currentTime < 5) {
          // * If the current time is less than 5 seconds, go to the previous sound
          currentSoundIndex =
            currentSoundIndex === 0 ? sounds.length - 1 : currentSoundIndex - 1;
          const isPlay = !soundElement.paused;
          toggleSoundPlayerLoadMedia(currentSoundIndex);
          if (isPlay || soundPlayerAutoPlay) {
            // * play sound
            toggleSoundPlayerPlayMedia();
          }
        } else {
          // * If the current time is more than 5 seconds, restart the current sound
          soundElement.currentTime = 0;
        }
      };
      // * format time in minutes and seconds
      const playerFormatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      };
      // * sound timer click
      if (soundPlayerTimmer.length) {
        soundPlayerTimmer.on("click", (index, element) => {
          if (soundElement.currentTime) {
            const progressBarRect = index.target.getBoundingClientRect();
            const clickX = index.clientX - progressBarRect.left;
            const progressBarWidth = progressBarRect.width;
            const progressPercentage = clickX / progressBarWidth;
            const newTime = soundElement.duration * progressPercentage;
            soundElement.currentTime = newTime;
          }
        });
        soundPlayerTimmer
          .on("mousemove", (index, element) => {
            const progressBarRect = index.target.getBoundingClientRect();
            const clickX = index.clientX - progressBarRect.left;
            const progressBarWidth = progressBarRect.width;
            const progressPercentage = clickX / progressBarWidth;
            const time = (soundElement.duration * progressPercentage).toFixed(
              0
            );
            const newTime =
              time < 0
                ? 0
                : time > soundElement.duration
                ? soundElement.duration
                : time;
            if (newTime != "NaN") {
              soundPlayerTimmerHover.show();
              const w =
                clickX < 0
                  ? 0
                  : clickX > progressBarWidth
                  ? progressBarWidth
                  : clickX;
              const marginValue = w - soundPlayerTimmerHover.innerWidth() / 2;
              soundPlayerTimmerHover
                .find("span")
                .text(playerFormatTime(newTime));
              soundPlayerTimmerHover.css("margin-left", marginValue);
            }
          })
          .on("mouseout", () => {
            soundPlayerTimmerHover.hide();
          });
      }
      // * rewind
      const toggleSoundPlayerForwardMedia = () => {
        if (
          soundElement.currentTime + soundPlayerSkipTime >=
          soundElement.duration
        ) {
          soundElement.currentTime = soundElement.duration;
        } else {
          soundElement.currentTime += soundPlayerSkipTime;
        }
      };
      // * fast forward
      const toggleSoundPlayerBackMedia = () => {
        if (0 >= soundElement.currentTime - soundPlayerSkipTime) {
          soundElement.currentTime = 0;
        } else {
          soundElement.currentTime -= soundPlayerSkipTime;
        }
      };
      // * sound start/stop
      const toggleSoundPlayerPlayPauseMedia = () => {
        if (!soundElement.paused) {
          toggleSoundPlayerPauseMedia();
        } else {
          toggleSoundPlayerPlayMedia();
        }
      };
      // * sound volume up
      const toggleSoundPlayerVolumeUp = () => {
        const newVol = parseFloat(soundElement.volume) + 0.1;
        if (newVol <= 1) {
          toggleSoundPlayerVolume(newVol);
        }
      };
      // * sound volume down
      const toggleSoundPlayerVolumeDown = () => {
        const newVol = parseFloat(soundElement.volume) - 0.1;
        if (newVol >= 0) {
          toggleSoundPlayerVolume(newVol);
        }
      };
      // * navigator info create
      const toggleSoundPlayerMediaSessionNavigator = (
        title,
        artist,
        album,
        poster
      ) => {
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: artist,
            album: album,
            artwork: poster,
          });
          navigator.mediaSession.setActionHandler("previoustrack", () => {
            // * Transitions to the previous sound
            toggleSoundPlayerPreviousMedia();
          });
          navigator.mediaSession.setActionHandler("nexttrack", () => {
            // * Transition to next sound
            toggleSoundPlayerNextMedia();
          });
        }
      };
      // * sound play pause icon
      const toggleSoundPlayerPlayPauseIcon = () => {
        soundPlayerPlayPauseBtn.html(
          !soundElement.paused
            ? '<i class="fa-solid fa-pause"></i>'
            : '<i class="fa-solid fa-play"></i>'
        );
      };
      // * start playing the sound
      const toggleSoundPlayerPlayMedia = () => {
        // * is multiplay
        soundPlayerList.forEach((index, element) => {
          if (!index.hasAttribute("multiplay")) index.pause();
        });
        // * changle play pause icon
        toggleSoundPlayerPlayPauseIcon();
        // * sound play
        soundElement.play();
        // * media speed add
        if (soundPlayerSpeed != 1) soundElement.playbackRate = soundPlayerSpeed;
        // * navigator info
        const data = sounds[currentSoundIndex];
        toggleSoundPlayerMediaSessionNavigator(
          data.title,
          data.artist,
          data.album,
          data.img
        );
      };
      // * pause sound
      const toggleSoundPlayerPauseMedia = () => {
        // * changle play pause icon
        toggleSoundPlayerPlayPauseIcon();
        // * sound pause
        soundElement.pause();
      };
      // * media subtitle option
      const toggleSoundPlayerSubTitle = (status) => {
        // * subtitle write
        const subtitleWrite = (src) => {
          // *
          const subtitleWriteFunc = () => {
            const currentTime = soundElement.currentTime;
            const duration = soundElement.duration;
            // * Check if currentTime and duration are valid finite numbers
            if (
              !isNaN(currentTime) &&
              isFinite(currentTime) &&
              !isNaN(duration) &&
              isFinite(duration)
            ) {
              // * if chandle lang stop listen
              if (soundPlayerSubTitle != status) {
                soundElement.removeEventListener(
                  "timeupdate",
                  subtitleWriteFunc
                );
                soundPlayerSubTitleTexts.text("");
                soundPlayerSubTitleTexts.hide();
              }
              // * Upload subtitle file
              fetch(src)
                .then((response) => {
                  if (response.status === 200) {
                    return response.text();
                  } else {
                    throw new Error("404");
                  }
                })
                .then((data) => {
                  // * Process subtitle data
                  const subtitles = data.split("\n\n");
                  subtitles.forEach((subtitle) => {
                    const [time, text] = subtitle.split("\n");
                    const [start, end] = time
                      .split(" --> ")
                      .map((timeString) => {
                        const timeParts = timeString.split(":").map(parseFloat);
                        return (
                          timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]
                        );
                      });
                    // * Does the current time match the subtitle range?
                    if (currentTime >= start && currentTime <= end) {
                      soundPlayerSubTitleTexts.text(text);
                      soundPlayerSubTitleTexts.show();
                    } else if (currentTime > end) {
                      soundPlayerSubTitleTexts.hide();
                    }
                  });
                })
                .catch((data) => {
                  soundPlayerSubTitleTexts.show();
                  soundPlayerSubTitleTexts.text(data);
                  // * stop listen
                  soundElement.removeEventListener(
                    "timeupdate",
                    subtitleWriteFunc
                  );
                });
            }
          };

          if (soundPlayerSubTitleTexts.length) {
            soundElement.addEventListener("timeupdate", subtitleWriteFunc);
          }
        };

        const text = soundPlayerSubTitleBtn
          .find("span")
          .filter((index, element) => {
            return $(element).attr("value") === status;
          })
          .text();
        soundPlayerSubTitleText.text(text);
        soundPlayerSubTitle = status;
        localStorage.setItem("sound-player-subtitle", status);
        if (status != "close") {
          const lag = soundPlayerSubTitleTrack.filter((index, element) => {
            return $(element).attr("srclang") === status;
          });
          if (lag.length) {
            // * open subtitle
            const src = lag.attr("src");
            subtitleWrite(src);
          } else {
            // * api
            const soundId = sounds[currentSoundIndex]
              ? sounds[currentSoundIndex].id
              : null;
            if (soundId) {
              const src =
                soundPlayerSubTitleApi +
                "/" +
                soundId +
                "/" +
                soundPlayerSubTitle;
              subtitleWrite(src);
            } else {
              soundPlayerSubTitleTexts.text("error");
            }
          }
        } else {
          // * subtitle close
          soundPlayerSubTitleTexts.hide();
        }
      };
      // * is video data loaded
      const soundIsLoad = () => {
        return soundElement.readyState >= 3 ? true : false;
      };
      // * shortcut keys
      $(document).on("keydown", (index, element) => {
        switch (index.keyCode) {
          // * Space bar
          case 32:
            toggleSoundPlayerPlayPauseMedia();
            break;
          // * right arrow
          case 37:
            toggleSoundPlayerBackMedia();
            break;
          // * Up arrow
          case 38:
            toggleSoundPlayerVolumeUp();
            break;
          // * Left arrow
          case 39:
            toggleSoundPlayerForwardMedia();
            break;
          // * Down arrow
          case 40:
            toggleSoundPlayerVolumeDown();
            break;
          // * MediaNextTrack
          case 176:
            toggleSoundPlayerNextMedia();
            break;
          // * MediaPreviousTrack
          case 177:
            toggleSoundPlayerPreviousMedia();
            break;

          default:
            break;
        }
      });
      // * Update timmer bar
      soundElement.addEventListener("timeupdate", () => {
        const currentTime = soundElement.currentTime;
        const duration = soundElement.duration;
        // * Check if currentTime and duration are valid finite numbers
        if (
          !isNaN(currentTime) &&
          isFinite(currentTime) &&
          !isNaN(duration) &&
          isFinite(duration)
        ) {
          // * timmer time
          toggleSoundPlayerTimmer((currentTime / duration) * 100);
          // * Display the current time and total time
          toggleSoundPlayerCurrentTime(playerFormatTime(currentTime));
          toggleSoundPlayerTotalTime(playerFormatTime(duration));
        }
      });
      // * sound ended
      soundElement.addEventListener("ended", () => {
        // * sound pause
        toggleSoundPlayerPauseMedia();
        if (soundPlayerRepeat) {
          toggleSoundPlayerLoadMedia(currentSoundIndex);
          // * sound play
          toggleSoundPlayerPlayMedia();
        } else {
          // * next sound check
          if (soundPlayerNextPlay) {
            // * sound next
            toggleSoundPlayerNextMedia();
          }
        }
      });
      // * is preload none
      if (soundElement.preload === "none") {
        soundPlayerLoading.hide();
        // * This event is triggered while the sound is playing and the data is just loading
        soundElement.addEventListener("play", () => {
          soundPlayerLoading.show();
          soundPlayerCenterControls.hide();
        });
        // * This event is triggered when sound data is loaded
        soundElement.addEventListener("loadeddata", () => {
          soundPlayerLoading.hide();
          soundPlayerCenterControls.show();
          soundPlayerBackBtn.show();
          soundPlayerForwardBtn.show();
        });
      } else {
        // * This event is triggered when sound data is loaded
        soundElement.addEventListener("loadeddata", () => {
          soundPlayerLoading.hide();
          soundPlayerCenterControls.show();
          soundPlayerBackBtn.show();
          soundPlayerForwardBtn.show();
        });
        // * This event is triggered while the sound is playing and the data is just loading
        soundElement.addEventListener("waiting", () => {
          soundPlayerLoading.show();
          soundPlayerCenterControls.hide();
        });
      }
      // * is playing
      soundElement.addEventListener("playing", () => {
        // * This event is triggered when the sound starts playing
        soundPlayerLoading.hide();
        toggleSoundPlayerPlayPauseIcon();
        soundPlayerCenterControls.show();
        soundPlayerBackBtn.show();
        soundPlayerForwardBtn.show();
      });
      // * is pause
      soundElement.addEventListener("pause", () => {
        // * This event is triggered when sound is stopped
        toggleSoundPlayerPlayPauseIcon();
        soundPlayerBackBtn.hide();
        soundPlayerForwardBtn.hide();
      });
      if (soundPlayerHoverLoadBtn.length && soundPlayerHoverLoad) {
        const media = soundPlayerContainer.find("sound");
        const res = sounds[currentSoundIndex].img.slice(-1)[0].src;
        soundPlayerHoverLoadBtn.on("mouseover", () => {
          soundPlayerHoverLoadBtn.removeAttr("style");
          media.removeAttr("style");
          soundElement.volume = 0;
          soundElement.play();
        });
        soundPlayerHoverLoadBtn.on("mouseout", () => {
          soundElement.pause();
          soundElement.currentTime = 0;
          if (res) media.css({ opacity: 0 });
          soundPlayerHoverLoadBtn.css({
            "background-image": "url(" + res + "",
            "background-repeat": "no-repeat",
            "background-size": "contain",
            "background-position": "center center",
          });
        });
      }
      // * load first sound
      toggleSoundPlayerLoadMedia(currentSoundIndex);
      toggleSoundPlayerVolume(localStorage.getItem("player-volume") || 1);
      toggleSoundPlayerRepeat(soundPlayerRepeat);
      toggleSoundPlayerShuffle(soundPlayerShuffle);
      toggleSoundPlayerAutoPlay(soundPlayerAutoPlay);
      toggleSoundPlayerSpeed(soundPlayerSpeed);
      toggleSoundPlayerSubTitle(soundPlayerSubtitle);
      toggleSoundPlayerQuality(soundPlayerQuality);
      toggleSoundPlayerNextPlay(soundPlayerNextPlay);
      toggleSoundPlayerQualityAppend();
      // * If autoplay is on
      if (soundPlayerAutoPlay && soundElement.src) {
        soundElement.play();
      }
      // * back forward
      soundPlayerBackBtn.on("click", () => {
        toggleSoundPlayerBackMedia();
      });
      // * fast forward
      soundPlayerForwardBtn.on("click", () => {
        toggleSoundPlayerForwardMedia();
      });
      // * auto play option
      soundPlayerAutoPlayBtn.on("click", () => {
        toggleSoundPlayerAutoPlay(!soundPlayerAutoPlay);
      });
      // * next play media
      soundPlayerNextPlayBtn.on("click", () => {
        toggleSoundPlayerNextPlay(!soundPlayerNextPlay);
      });
      // * media play speed option
      soundPlayerSpeedBtn.on("click", (index, element) => {
        toggleSoundPlayerSpeed($(index.target).text());
        // * menu close
        soundPlayerSpeedBtn
          .closest(".sound-player-speed-btn")
          .siblings("a")
          .click();
      });
      // * media sub title option
      soundPlayerSubTitleBtn.on("click", (index, element) => {
        toggleSoundPlayerSubTitle($(index.target).attr("value"));
        // * menu close
        soundPlayerSubTitleBtn
          .closest(".sound-player-subtitle-btn")
          .siblings("a")
          .click();
      });
      // * media quality option
      soundPlayerQualityBtn.find("a").on("click", (index, element) => {
        toggleSoundPlayerQuality($(index.target).attr("value"));
        // * menu close
        soundPlayerQualityBtn.siblings("a").click();
      });
      // * main btn
      // * Trigger on clicking the start/stop button of the sound
      soundPlayerPlayPauseBtn.on("click", toggleSoundPlayerPlayPauseMedia);
      // * Trigger on previous sound button click
      soundPlayerPreviousBtn.on("click", toggleSoundPlayerPreviousMedia);
      // * Trigger on next sound button click
      soundPlayerNextBtn.on("click", toggleSoundPlayerNextMedia);
      // * options btn
      // * Trigger when soundbar's value changes
      soundPlayerVolumeBtn.on("input", (index, element) => {
        toggleSoundPlayerVolume($(index.currentTarget).val());
      });
      // * Trigger when shuffle button is clicked
      soundPlayerShuffleBtn.on("click", () => {
        toggleSoundPlayerShuffle(!soundPlayerShuffle);
        // * If shuffle is enabled and repeat is also enabled, disable repeat
        if (soundPlayerShuffle && soundPlayerRepeat) {
          toggleSoundPlayerRepeat(false);
        }
      });
      // * Trigger on clicking play again
      soundPlayerRepeatBtn.on("click", () => {
        toggleSoundPlayerRepeat(!soundPlayerRepeat);
        // * If repeat is enabled and shuffle is also enabled, disable shuffle
        if (soundPlayerRepeat && soundPlayerShuffle) {
          toggleSoundPlayerShuffle(false);
        }
      });
    });
  }
});
//   -----------------------------------------------------------------------------
// * ------------
// * video player
// * ------------
document.addEventListener("DOMContentLoaded", () => {
  if ($(".video-player-container").length) {
    const videoPlayerList = [];
    $(".video-player-container").each((index, element) => {
      // * --------------------------------------------------
      const videoPlayerContainer = $(element);
      const videoElement = videoPlayerContainer.find("video")[0];
      // * push video player
      videoPlayerList.push(videoElement);
      const videoPlayerBroken = videoPlayerContainer.find(
        ".video-player-broken"
      );
      const videoPlayerScreen = videoPlayerContainer.find(
        ".video-player-screen"
      );
      const videoPlayerHoverLoadBtn = videoPlayerContainer.find(
        ".video-player-hover-load"
      );
      const videoPlayerLoading = videoPlayerContainer.find(
        ".video-player-loading"
      );
      // * video player informaion
      const videoPlayerAlbum = videoPlayerContainer.find(".video-player-album");
      const videoPlayerTitle = videoPlayerContainer.find(".video-player-title");
      const videoPlayerArtistName = videoPlayerContainer.find(
        ".video-player-artist-name"
      );
      // * video player time
      const videoPlayerCurrentTime = videoPlayerContainer.find(
        ".video-player-currentTime"
      );
      const videoPlayerTotalTime = videoPlayerContainer.find(
        ".video-player-totalTime"
      );
      const videoPlayerTimmer = videoPlayerContainer.find(
        ".video-player-timmer"
      );
      const videoPlayerTimmerHover = videoPlayerContainer.find(
        ".video-player-timmer-hover"
      );
      // * video player buttons
      const videoPlayerCenterControls = videoPlayerContainer.find(
        ".video-player-center-controls"
      );
      const videoPlayerBackBtn = videoPlayerContainer.find(
        ".video-player-back-btn"
      );
      const videoPlayerForwardBtn = videoPlayerContainer.find(
        ".video-player-forward-btn"
      );
      const videoPlayerControls = videoPlayerContainer.find(
        ".video-player-controls"
      );
      const videoPlayerVolumeBtn = videoPlayerContainer.find(
        ".video-player-volume"
      );
      const videoPlayerVolumeIcon = videoPlayerContainer.find(
        ".video-player-volume-icon"
      );
      const videoPlayerShuffleBtn = videoPlayerContainer.find(
        ".video-player-shuffle-btn"
      );
      const videoPlayerShuffleIcon = videoPlayerContainer.find(
        ".video-player-shuffle-icon"
      );
      const videoPlayerPreviousBtn = videoPlayerContainer.find(
        ".video-player-prev-btn"
      );
      const videoPlayerPlayPauseBtn = videoPlayerContainer.find(
        ".video-player-play-pause-btn"
      );
      const videoPlayerNextBtn = videoPlayerContainer.find(
        ".video-player-next-btn"
      );
      const videoPlayerAutoPlayBtn = videoPlayerContainer.find(
        ".video-player-autoplay-btn"
      );
      const videoPlayerSpeedBtn = videoPlayerContainer.find(
        ".video-player-speed-btn a"
      );
      const videoPlayerSpeedText = videoPlayerContainer.find(
        ".video-player-speed-text"
      );
      const videoPlayerSubTitleTrack = videoPlayerContainer.find(
        "track[kind='subtitles']"
      );
      const videoPlayerSubTitleBtn = videoPlayerContainer.find(
        ".video-player-subtitle-btn a"
      );
      const videoPlayerSubTitleText = videoPlayerContainer.find(
        ".video-player-subtitle-text"
      );
      const videoPlayerQualityBtn = videoPlayerContainer.find(
        ".video-player-quality-btn"
      );
      const videoPlayerQualityText = videoPlayerContainer.find(
        ".video-player-quality-text"
      );
      const videoPlayerNextPlayBtn = videoPlayerContainer.find(
        ".video-player-nextplay-btn"
      );
      const videoPlayerDescriptionsBtn = videoPlayerContainer.find(
        ".video-player-descriptions-btn"
      );
      const videoPlayerRepeatBtn = videoPlayerContainer.find(
        ".video-player-repeat-btn"
      );
      const videoPlayerRepeatIcon = videoPlayerContainer.find(
        ".video-player-repeat-icon"
      );
      const videoPlayerFullScreenBtn = videoPlayerContainer.find(
        ".video-player-fullscreen-btn"
      );
      const videoPlayerCinemaBtn = videoPlayerContainer.find(
        ".video-player-cinema-btn"
      );
      const videoPlayerPıpBtn = videoPlayerContainer.find(
        ".video-player-pip-btn"
      );
      // *----------
      videoPlayerTimmerHover.hide();
      videoPlayerBackBtn.hide();
      videoPlayerForwardBtn.hide();
      // * video player settings
      const videoPlayerSubTitleApi =
        videoPlayerSettings.SubTitleApi || "/api/subtitle/";
      let currentVideoIndex = 0;
      let videoPlayerHoverLoad = videoPlayerSettings.HoverLoad || true;
      const videoPlayerSkipTime = videoPlayerSettings.SkipTime || 5;
      let videoPlayerDescriptions =
        localStorage.getItem("video-player-descriptions") === "true";
      let videoPlayerAutoPlay =
        localStorage.getItem("video-player-autoplay") === "true";
      let videoPlayerSpeed = localStorage.getItem("video-player-speed") || "1";
      let videoPlayerSubtitle =
        localStorage.getItem("video-player-subtitle") || "close";
      let videoPlayerQuality =
        localStorage.getItem("video-player-quality") || "auto";
      let videoPlayerNextPlay =
        localStorage.getItem("video-player-nextplay") === "true";
      let videoPlayerShuffle =
        localStorage.getItem("video-player-shuffle") === "true";
      let videoPlayerRepeat =
        localStorage.getItem("video-player-repeat") === "true";
      let videoPlayerTimmerIsDragging = false;
      // * quality list
      const videoQualityList = [];
      videoPlayerContainer
        .find("source")
        .toArray()
        .forEach((source) => {
          const label = source.getAttribute("label");
          const url = source.getAttribute("src");
          videoQualityList.push([label, url]);
        });
      // * video information
      let videos =
        videoQualityList.length && videoQualityList.slice(-1)[0][1]
          ? [
              {
                id: videoElement.getAttribute("media-id"),
                title: videoElement.getAttribute("media-title"),
                artist: videoElement.getAttribute("artist"),
                album: videoElement.getAttribute("album"),
                img: [
                  {
                    src: videoElement.getAttribute("poster"),
                    sizes: "512x512",
                    type: "image/jpg",
                  },
                ],
                url: videoQualityList,
              },
            ]
          : false;
      // * local song is get list
      if (!videos) {
        videos =
          JSON.parse(localStorage.getItem("video-player-playlist")) || [];
        if (!videos.length) {
          videoPlayerControls.hide();
          videoPlayerCenterControls.hide();
          videoPlayerBroken.show();
          videoPlayerContainer.find("video").css("visibility", "hidden");
        }
      }
      // * video player info
      const toggleVideoPlayerMedia = (album, poster, title, artist) => {
        if (videoPlayerAlbum.length && album) videoPlayerAlbum.text(album);
        if (videoPlayerTitle.length && title) videoPlayerTitle.text(title);
        if (videoPlayerArtistName.length && artist)
          videoPlayerArtistName.text(artist);
        if (poster) videoElement.poster = poster[0].src;
      };
      // * video timmer changle
      const toggleVideoPlayerTimmer = (time) => {
        if (videoPlayerTimmer.length) {
          videoPlayerTimmer.on("mousedown", () => {
            videoPlayerTimmerIsDragging = true;
          });
          videoPlayerTimmer.on("mouseup", () => {
            videoPlayerTimmerIsDragging = false;
          });
          if (!videoPlayerTimmerIsDragging) {
            videoPlayerTimmer.val(time);
          }
        }
      };
      // * video current time changle
      const toggleVideoPlayerCurrentTime = (time) => {
        if (videoPlayerCurrentTime.length) {
          videoPlayerCurrentTime.text(time);
        }
      };
      // * video total time changle
      const toggleVideoPlayerTotalTime = (time) => {
        if (videoPlayerTotalTime.length) {
          videoPlayerTotalTime.text(time);
        }
      };
      // * load video
      const toggleVideoPlayerLoadMedia = (index) => {
        // * media info load
        const toggleVideoPlayerLoadMediaStart = (video) => {
          const title = video.title ? video.title : null;
          const artist = video.artist ? video.artist : null;
          const album = video.album ? video.album : null;
          const poster = video.img ? video.img : null;
          // * player info
          toggleVideoPlayerMedia(album, poster, title, artist);
          // * timmer value
          toggleVideoPlayerTimmer(0);
          // * stop previous video
          videoElement.src = "";
          // * Upload new video
          const videoUrl =
            videoPlayerQuality == "auto"
              ? video.url.slice(-1)[0]
              : video.url.find((item) => item[0] === videoPlayerQuality) ||
                video.url[video.url.length - 1];
          videoElement.src = videoUrl[1];
          // * if load media change time
          videoElement.addEventListener("loadedmetadata", function () {
            // * Update times when new video is uploaded
            toggleVideoPlayerCurrentTime(
              playerFormatTime(videoElement.currentTime)
            );
            toggleVideoPlayerTotalTime(playerFormatTime(videoElement.duration));
          });
        };
        const video = videos[index];
        switch (videos.length) {
          case 0:
            // * if not video
            videoPlayerPlayPauseBtn.hide();
            videoPlayerNextBtn.hide();
            videoPlayerPreviousBtn.hide();
            videoPlayerRepeatBtn.hide();
            videoPlayerShuffleBtn.hide();
            break;
          case 1:
            // * if 1 video
            videoPlayerNextBtn.hide();
            videoPlayerPreviousBtn.hide();
            videoPlayerRepeatBtn.hide();
            videoPlayerShuffleBtn.hide();
            toggleVideoPlayerLoadMediaStart(video);
            break;

          default:
            toggleVideoPlayerLoadMediaStart(video);
            break;
        }
      };
      // * video volume changle
      const toggleVideoPlayerVolume = (vol) => {
        if (videoPlayerVolumeBtn.length) {
          videoPlayerVolumeBtn.val(vol);
          // *Adjust volume based on value of videobar
          videoElement.volume = vol;
          // * Save volume to localStorage
          localStorage.setItem("player-volume", vol);
          if (vol > 0.75) {
            videoPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-high"></i>'
            );
          } else if (vol > 0.25) {
            videoPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-low"></i>'
            );
          } else if (vol > 0) {
            videoPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-off"></i>'
            );
          } else {
            videoPlayerVolumeIcon.html(
              '<i class="fa-solid fa-volume-xmark"></i>'
            );
          }
        }
      };
      // * video shuffle option
      const toggleVideoPlayerShuffle = (status) => {
        videoPlayerShuffleIcon.html(
          status
            ? '<i class="fa-solid fa-shuffle"></i>'
            : '<i class="fa-solid fa-right-left"></i>'
        );
        videoPlayerShuffleBtn
          .find("input")
          .prop("checked", status ? true : false);
        videoPlayerShuffle = status;
        localStorage.setItem("video-player-shuffle", status);
      };
      // * video repeat option
      const toggleVideoPlayerRepeat = (status) => {
        videoPlayerRepeatIcon.html(
          status
            ? '<i class="fa-solid fa-repeat"></i>'
            : '<i class="fa-solid fa-arrow-up-a-z"></i>'
        );
        videoPlayerRepeatBtn
          .find("input")
          .prop("checked", status ? true : false);
        videoPlayerRepeat = status;
        localStorage.setItem("video-player-repeat", status);
      };
      // * media autoplay option
      const toggleVideoPlayerAutoPlay = (status) => {
        videoPlayerAutoPlayBtn
          .find("input")
          .prop("checked", status ? true : false);
        videoPlayerAutoPlay = status;
        localStorage.setItem("video-player-autoplay", status);
      };
      // * media nextplay option
      const toggleVideoPlayerNextPlay = (status) => {
        videoPlayerNextPlayBtn
          .find("input")
          .prop("checked", status ? true : false);
        videoPlayerNextPlay = status;
        localStorage.setItem("video-player-nextplay", status);
      };
      // * media description option
      const toggleVideoPlayerDescriptions = (status) => {
        videoPlayerDescriptionsBtn
          .find("input")
          .prop("checked", status ? true : false);
        videoPlayerDescriptions = status;
        localStorage.setItem("video-player-descriptions", status);
      };
      // * media speed option
      const toggleVideoPlayerSpeed = (status) => {
        const text = videoPlayerSpeedBtn
          .find("span")
          .filter((index, element) => {
            return $(element).attr("value") === status;
          })
          .text();
        videoPlayerSpeedText.text(text);
        videoPlayerSpeed = status;
        localStorage.setItem("video-player-speed", status);
        videoElement.playbackRate = status;
      };
      // * media quality option
      const toggleVideoPlayerQuality = (status) => {
        if (videos.length) {
          localStorage.setItem("video-player-quality", status);
          const url = videos[currentVideoIndex].url;
          // * media play or pause
          let videoElementPause = false;
          if (!videoElement.paused) {
            videoElementPause = true;
            videoElement.pause();
          }
          // * quality changle
          const currentTime = videoElement.currentTime;
          if (videoPlayerQuality == "auto") {
            videoElement.src = url.slice(-1)[0][1];
          } else {
            const video =
              url.find((item) => item[0] === status) || url.slice(-1)[0];
            videoElement.src = video[1];
            status = video[0];
          }
          videoPlayerQuality = status;
          videoPlayerQualityText.text(status != "auto" ? status + "p" : status);
          videoElement.currentTime = currentTime;
          videoElementPause ? videoElement.play() : videoElement.pause();
        }
      };
      // * guality create func
      const toggleVideoPlayerQualityAppend = () => {
        if (videos.length) {
          const target = videoPlayerQualityBtn.find("li");
          let createElement = target.clone();
          videos[currentVideoIndex].url.forEach((source) => {
            const label = source[0];
            createElement = createElement.clone();
            createElement
              .find("span")
              .attr("value", label)
              .text(label + "p");
            target.after(createElement);
          });
        }
      };
      // * Switch video to next video (partially updated with upload)
      const toggleVideoPlayerNextMedia = () => {
        // * If we are not in shuffle mode and not in repeat mode and the last video has been played, stop playing and go back to the first video.
        if (
          !videoPlayerShuffle &&
          !videoPlayerRepeat &&
          currentVideoIndex === videos.length - 1 &&
          !videoPlayerNextPlay
        ) {
          // * back to first video
          currentVideoIndex = 0;
          toggleVideoPlayerLoadMedia(currentVideoIndex);
          // * stop playing the video
          toggleVideoPlayerPauseMedia();
          return;
        }
        if (videos.length > 1) {
          if (videoPlayerShuffle) {
            // * shuffle video
            currentVideoIndex = getRandomVideoIndex();
          } else {
            // * next video and is last video to first video
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
          }
        } else {
          currentVideoIndex = 0;
        }
        const isPlay = !videoElement.paused;
        // * load video
        toggleVideoPlayerLoadMedia(currentVideoIndex);
        if (isPlay || videoPlayerAutoPlay) {
          // * play video
          toggleVideoPlayerPlayMedia();
        }
      };
      // * Switch video to previous video
      const toggleVideoPlayerPreviousMedia = () => {
        if (videoElement.currentTime < 5) {
          // * If the current time is less than 5 seconds, go to the previous video
          currentVideoIndex =
            currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1;
          const isPlay = !videoElement.paused;
          toggleVideoPlayerLoadMedia(currentVideoIndex);
          if (isPlay || videoPlayerAutoPlay) {
            // * play video
            toggleVideoPlayerPlayMedia();
          }
        } else {
          // * If the current time is more than 5 seconds, restart the current video
          videoElement.currentTime = 0;
        }
      };
      // * Function to format time in minutes and seconds
      const playerFormatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      };
      // * video timer click
      if (videoPlayerTimmer.length) {
        videoPlayerTimmer.on("click", (index, element) => {
          const progressBarRect = index.target.getBoundingClientRect();
          const clickX = index.clientX - progressBarRect.left;
          const progressBarWidth = progressBarRect.width;
          const progressPercentage = clickX / progressBarWidth;
          const newTime = videoElement.duration * progressPercentage;
          videoElement.currentTime = newTime;
        });
        videoPlayerTimmer
          .on("mousemove", (index, element) => {
            const progressBarRect = index.target.getBoundingClientRect();
            const clickX = index.clientX - progressBarRect.left;
            const progressBarWidth = progressBarRect.width;
            const progressPercentage = clickX / progressBarWidth;
            const time = (videoElement.duration * progressPercentage).toFixed(
              0
            );
            const newTime =
              time < 0
                ? 0
                : time > videoElement.duration
                ? videoElement.duration
                : time;
            if (newTime != "NaN") {
              videoPlayerTimmerHover.show();
              const w =
                clickX < 0
                  ? 0
                  : clickX > progressBarWidth
                  ? progressBarWidth
                  : clickX;
              const marginValue = w - videoPlayerTimmerHover.innerWidth() / 2;
              videoPlayerTimmerHover
                .find("span")
                .text(playerFormatTime(newTime));
              videoPlayerTimmerHover.css("margin-left", marginValue);
            }
          })
          .on("mouseout", () => {
            videoPlayerTimmerHover.hide();
          });
      }
      // * rewind
      const toggleVideoPlayerForwardMedia = () => {
        if (
          videoElement.currentTime + videoPlayerSkipTime >=
          videoElement.duration
        ) {
          videoElement.currentTime = videoElement.duration;
        } else {
          videoElement.currentTime += videoPlayerSkipTime;
        }
      };
      // * fast forward
      const toggleVideoPlayerBackMedia = () => {
        if (0 >= videoElement.currentTime - videoPlayerSkipTime) {
          videoElement.currentTime = 0;
        } else {
          videoElement.currentTime -= videoPlayerSkipTime;
        }
      };
      // * video start/stop function
      const toggleVideoPlayerPlayPauseMedia = () => {
        if (!videoElement.paused) {
          toggleVideoPlayerPauseMedia();
        } else {
          toggleVideoPlayerPlayMedia();
        }
      };
      // * video volume up function
      const toggleVideoPlayerVolumeUp = () => {
        const newVol = parseFloat(videoElement.volume) + 0.1;
        if (newVol <= 1) {
          toggleVideoPlayerVolume(newVol);
        }
      };
      // * video volume down function
      const toggleVideoPlayerVolumeDown = () => {
        const newVol = parseFloat(videoElement.volume) - 0.1;
        if (newVol >= 0) {
          toggleVideoPlayerVolume(newVol);
        }
      };
      // * navigator info create
      const toggleVideoPlayerMediaSessionNavigator = (
        title,
        artist,
        album,
        poster
      ) => {
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: artist,
            album: album,
            artwork: poster,
          });
          navigator.mediaSession.setActionHandler("previoustrack", () => {
            // * Transitions to the previous video
            toggleVideoPlayerPreviousMedia();
          });
          navigator.mediaSession.setActionHandler("nexttrack", () => {
            // * Transition to next video
            toggleVideoPlayerNextMedia();
          });
        }
      };
      // * video play pause icon
      const toggleVideoPlayerPlayPauseIcon = () => {
        videoPlayerPlayPauseBtn.html(
          !videoElement.paused
            ? '<i class="fa-solid fa-pause"></i>'
            : '<i class="fa-solid fa-play"></i>'
        );
      };
      // * start playing the video
      const toggleVideoPlayerPlayMedia = () => {
        // * is multiplay
        videoPlayerList.forEach((index, element) => {
          if (!index.hasAttribute("multiplay")) index.pause();
        });
        // * changle play pause icon
        toggleVideoPlayerPlayPauseIcon();
        // * video play
        videoElement.play();
        // * media speed add
        if (videoPlayerSpeed != 1) videoElement.playbackRate = videoPlayerSpeed;
        // * navigator info
        const data = videos[currentVideoIndex];
        toggleVideoPlayerMediaSessionNavigator(
          data.title,
          data.artist,
          data.album,
          data.img
        );
      };
      // * pause video
      const toggleVideoPlayerPauseMedia = () => {
        // * changle play pause icon
        toggleVideoPlayerPlayPauseIcon();
        // * video pause
        videoElement.pause();
      };
      // * media cinema option
      const toggleVideoPlayerCinema = (element) => {
        if (element.hasClass(".active")) {
          videoPlayerScreen.removeAttr("style");
          element.removeClass(".active");
          element.html('<i class="fa-solid fa-arrows-left-right-to-line"></i>');
        } else {
          videoPlayerScreen.css({
            padding: "0",
            margin: "0",
            "min-width": "100%",
          });
          element.addClass(".active");
          element.html(
            '<i class="fa-solid fa-down-left-and-up-right-to-center transform-rotate-45"></i>'
          );
        }
      };
      // * media subtitle option
      const toggleVideoPlayerSubTitle = (status) => {
        const text = videoPlayerSubTitleBtn
          .find("span")
          .filter((index, element) => {
            return $(element).attr("value") === status;
          })
          .text();
        videoPlayerSubTitleText.text(text);
        videoPlayerSubTitle = status;
        localStorage.setItem("video-player-subtitle", status);
        if (status != "close") {
          const lag = videoPlayerSubTitleTrack.filter((index, element) => {
            return $(element).attr("srclang") === status;
          });
          if (lag.length) {
            // * open subtitle
            lag[0].track.mode = "showing";
          } else {
            // * api
            const videoId = videos[currentVideoIndex]
              ? videos[currentVideoIndex].id
              : null;
            if (videoId) {
              const track = videoPlayerContainer
                .find("track[kind='subtitles']")
                .filter((index, element) => {
                  return $(element).attr("default") === "true";
                });
              if (track.length == 0) {
                let e = document.createElement("track");
                e.setAttribute(
                  "src",
                  videoPlayerSubTitleApi +
                    "/" +
                    videoId +
                    "/" +
                    videoPlayerSubTitle
                );
                e.setAttribute("kind", "subtitles");
                e.setAttribute("default", "true");
                videoElement.append(e);
              } else {
                track[0].setAttribute(
                  "src",
                  videoPlayerSubTitleApi +
                    "/" +
                    videoId +
                    "/" +
                    videoPlayerSubTitle
                );
              }
            }
          }
        } else {
          // * turn off subtitles
          if (videoPlayerSubTitleTrack.length)
            videoPlayerSubTitleTrack[0].track.mode = "hidden";
        }
      };
      // * media fulscreen option
      const toggleVideoPlayerFullScreen = (element) => {
        // * Full screen exit
        const exitFullScreen = () => {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            // * Firefox
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            // * Chrome, Safari Opera
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            // * IE11
            document.msExitFullscreen();
          }
        };
        // * Full screen open
        const enterFullScreen = () => {
          let elem = document.documentElement;
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            // * Firefox
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            // * Chrome, Safari Opera
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            // * IE11
            elem.msRequestFullscreen();
          }
        };
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        ) {
          // * If in full screen mode, close full screen
          element.html('<i class="fa-solid fa-expand"></i>');
          exitFullScreen();
          videoPlayerScreen.removeAttr("style");
          videoPlayerCinemaBtn.removeAttr("style");
        } else {
          // * If not in full screen mode, open full screen
          element.html('<i class="fa-solid fa-compress"></i>');
          enterFullScreen();
          videoPlayerScreen.css({
            position: "absolute",
            top: 0,
            left: 0,
            "min-width": "100vw",
            "min-height": "100vh",
            "z-index": "9999999",
          });
          videoPlayerCinemaBtn.hide();
        }
      };
      // * is video data loaded
      const videoIsLoad = () => {
        return videoElement.readyState >= 3 ? true : false;
      };
      // * shortcut keys
      $(document).on("keydown", (index, element) => {
        switch (index.keyCode) {
          // * Space bar
          case 32:
            toggleVideoPlayerPlayPauseMedia();
            break;
          // * right arrow
          case 37:
            toggleVideoPlayerBackMedia();
            break;
          // * Up arrow
          case 38:
            toggleVideoPlayerVolumeUp();
            break;
          // * Left arrow
          case 39:
            toggleVideoPlayerForwardMedia();
            break;
          // * Down arrow
          case 40:
            toggleVideoPlayerVolumeDown();
            break;
          // * MediaNextTrack
          case 176:
            toggleVideoPlayerNextMedia();
            break;
          // * MediaPreviousTrack
          case 177:
            toggleVideoPlayerPreviousMedia();
            break;

          default:
            break;
        }
      });
      // * Update timmer bar
      videoElement.addEventListener("timeupdate", () => {
        const currentTime = videoElement.currentTime;
        const duration = videoElement.duration;
        // * Check if currentTime and duration are valid finite numbers
        if (
          !isNaN(currentTime) &&
          isFinite(currentTime) &&
          !isNaN(duration) &&
          isFinite(duration)
        ) {
          // * timmer time
          toggleVideoPlayerTimmer((currentTime / duration) * 100);
          // * Display the current time and total time
          toggleVideoPlayerCurrentTime(playerFormatTime(currentTime));
          toggleVideoPlayerTotalTime(playerFormatTime(duration));
        }
      });
      // * video ended
      videoElement.addEventListener("ended", () => {
        // * video pause
        toggleVideoPlayerPauseMedia();
        if (videoPlayerRepeat) {
          toggleVideoPlayerLoadMedia(currentVideoIndex);
          // * video play
          toggleVideoPlayerPlayMedia();
        } else {
          // * next video check
          if (videoPlayerNextPlay) {
            // * video next
            toggleVideoPlayerNextMedia();
          }
        }
      });
      // * is preload none
      if (videoElement.preload === "none") {
        videoPlayerLoading.hide();
        // * This event is triggered while the video is playing and the data is just loading
        videoElement.addEventListener("play", () => {
          videoPlayerLoading.show();
          videoPlayerCenterControls.hide();
        });
        // * This event is triggered when video data is loaded
        videoElement.addEventListener("loadeddata", () => {
          videoPlayerLoading.hide();
          videoPlayerCenterControls.show();
          videoPlayerBackBtn.show();
          videoPlayerForwardBtn.show();
        });
      } else {
        // * This event is triggered when video data is loaded
        videoElement.addEventListener("loadeddata", () => {
          videoPlayerLoading.hide();
          videoPlayerCenterControls.show();
          videoPlayerBackBtn.show();
          videoPlayerForwardBtn.show();
        });
        // * This event is triggered while the video is playing and the data is just loading
        videoElement.addEventListener("waiting", () => {
          videoPlayerLoading.show();
          videoPlayerCenterControls.hide();
        });
      }
      // * is playing
      videoElement.addEventListener("playing", () => {
        videoPlayerControls.toggleClass("animation-up-hover");
        // * This event is triggered when the video starts playing
        videoPlayerLoading.hide();
        toggleVideoPlayerPlayPauseIcon();
        videoPlayerCenterControls.show();
        videoPlayerBackBtn.show();
        videoPlayerForwardBtn.show();
      });
      // * is pause
      videoElement.addEventListener("pause", () => {
        videoPlayerControls.toggleClass("animation-up-hover");
        // * This event is triggered when video is stopped
        toggleVideoPlayerPlayPauseIcon();
        videoPlayerBackBtn.hide();
        videoPlayerForwardBtn.hide();
      });
      if (videoPlayerHoverLoadBtn.length && videoPlayerHoverLoad) {
        const media = videoPlayerContainer.find("video");
        const res = videos[currentVideoIndex].img.slice(-1)[0].src;
        let isVideoElement;
        videoPlayerHoverLoadBtn.on("mouseenter", () => {
          videoPlayerHoverLoadBtn.removeAttr("style");
          media.removeAttr("style");
          videoElement.volume = 0;
          isVideoElement = videoElement.play();
        });
        videoPlayerHoverLoadBtn.on("mouseout", () => {
          isVideoElement.then((_) => {
            videoElement.pause();
            videoElement.currentTime = 0;
          });
          if (res) media.css({ opacity: 0 });
          videoPlayerHoverLoadBtn.css({
            "background-image": "url(" + res + "",
            "background-repeat": "no-repeat",
            "background-size": "contain",
            "background-position": "center center",
          });
        });
      }
      // * load first video
      toggleVideoPlayerLoadMedia(currentVideoIndex);
      toggleVideoPlayerVolume(localStorage.getItem("player-volume") || 1);
      toggleVideoPlayerRepeat(videoPlayerRepeat);
      toggleVideoPlayerShuffle(videoPlayerShuffle);
      toggleVideoPlayerAutoPlay(videoPlayerAutoPlay);
      toggleVideoPlayerSpeed(videoPlayerSpeed);
      toggleVideoPlayerSubTitle(videoPlayerSubtitle);
      toggleVideoPlayerQuality(videoPlayerQuality);
      toggleVideoPlayerNextPlay(videoPlayerNextPlay);
      toggleVideoPlayerDescriptions(videoPlayerDescriptions);
      toggleVideoPlayerQualityAppend();
      // * If autoplay is on
      if (videoPlayerAutoPlay && videoElement.src) {
        videoElement.play();
      }
      // * back forward
      videoPlayerBackBtn.on("click", () => {
        toggleVideoPlayerBackMedia();
      });
      // * fast forward
      videoPlayerForwardBtn.on("click", () => {
        toggleVideoPlayerForwardMedia();
      });
      // * auto play option
      videoPlayerAutoPlayBtn.on("click", () => {
        toggleVideoPlayerAutoPlay(!videoPlayerAutoPlay);
      });
      // * next play media
      videoPlayerNextPlayBtn.on("click", () => {
        toggleVideoPlayerNextPlay(!videoPlayerNextPlay);
      });
      // * Enable Picture-in-Picture when the video is clicked
      videoPlayerPıpBtn.on("click", () => {
        if (videoIsLoad()) {
          if (videoElement !== document.pictureInPictureElement) {
            videoElement.requestPictureInPicture();
          } else {
            document.exitPictureInPicture();
          }
        }
      });
      // * cinema mode options
      videoPlayerCinemaBtn.on("click", (index, element) => {
        toggleVideoPlayerCinema($(index.currentTarget));
      });
      // * media description mode option
      videoPlayerDescriptionsBtn.on("click", () => {
        toggleVideoPlayerDescriptions(!videoPlayerDescriptions);
      });
      // * media play speed option
      videoPlayerSpeedBtn.on("click", (index, element) => {
        toggleVideoPlayerSpeed($(index.target).text());
        // * menu close
        videoPlayerSpeedBtn
          .closest(".video-player-speed-btn")
          .siblings("a")
          .click();
      });
      // * media sub title option
      videoPlayerSubTitleBtn.on("click", (index, element) => {
        toggleVideoPlayerSubTitle($(index.target).attr("value"));
        // * menu close
        videoPlayerSubTitleBtn
          .closest(".video-player-subtitle-btn")
          .siblings("a")
          .click();
      });
      // * media quality option
      videoPlayerQualityBtn.find("a").on("click", (index, element) => {
        toggleVideoPlayerQuality($(index.target).attr("value"));
        // * menu close
        videoPlayerQualityBtn.siblings("a").click();
      });
      // * media full screen option
      videoPlayerFullScreenBtn.on("click", (index, element) => {
        toggleVideoPlayerFullScreen($(element));
      });
      // * main btn
      // * Trigger on clicking the start/stop button of the video
      videoPlayerPlayPauseBtn.on("click", toggleVideoPlayerPlayPauseMedia);
      // * Trigger on previous video button click
      videoPlayerPreviousBtn.on("click", toggleVideoPlayerPreviousMedia);
      // * Trigger on next video button click
      videoPlayerNextBtn.on("click", toggleVideoPlayerNextMedia);
      // * options btn
      // * Trigger when videobar's value changes
      videoPlayerVolumeBtn.on("input", (index, element) => {
        toggleVideoPlayerVolume($(index.currentTarget).val());
      });
      // * Trigger when shuffle button is clicked
      videoPlayerShuffleBtn.on("click", () => {
        toggleVideoPlayerShuffle(!videoPlayerShuffle);
        // * If shuffle is enabled and repeat is also enabled, disable repeat
        if (videoPlayerShuffle && videoPlayerRepeat) {
          toggleVideoPlayerRepeat(false);
        }
      });
      // * Trigger on clicking play again
      videoPlayerRepeatBtn.on("click", () => {
        toggleVideoPlayerRepeat(!videoPlayerRepeat);
        // * If repeat is enabled and shuffle is also enabled, disable shuffle
        if (videoPlayerRepeat && videoPlayerShuffle) {
          toggleVideoPlayerShuffle(false);
        }
      });
    });
  }
});
