import React from 'react'

import style from './MusicPlayer.module.css'

const Player = ({
  song,
  audioRef,
  isPlaying,
  playPause,
  nextSong,
  prevSong,
  shuffleSong,
  likedSong,
  isLiked,
  currentTime,
  duration,
  updateTime,
  loadDuration,
  seekSong,
  volume,
  changeVolume
}) => {
  return (
    <div className={style.playBox}>

      <div className={style.top}>
        <audio
          ref={audioRef}
          src={song.url}
          onTimeUpdate={updateTime}
          onLoadedMetadata={loadDuration}
          onEnded={nextSong}
        />

        <img
          src={song.image}
          alt=""
          className={style.img}
        />

        <marquee>
          <span>{song.name}</span>
        </marquee>
      </div>


      {/* PROGRESS BAR */}
      <div className={style.progressContainer}>

        <span>
          {Math.floor(currentTime / 60)}:
          {String(Math.floor(currentTime % 60)).padStart(2, "0")}
        </span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={seekSong}
          className={style.progress}
        />

        <span>
          {Math.floor(duration / 60)}:
          {String(Math.floor(duration % 60)).padStart(2, "0")}
        </span>

      </div>


      {/* CONTROLS */}
      <div className={style.control}>

        <button onClick={shuffleSong}>
          <i className="fa-solid fa-shuffle"></i>
        </button>

        <button onClick={prevSong}>
          <i className="fa-solid fa-backward-step"></i>
        </button>

        <button onClick={playPause}>
          {
            isPlaying
              ? <i className="fa-solid fa-pause"></i>
              : <i className="fa-solid fa-play"></i>
          }
        </button>

        <button onClick={nextSong}>
          <i className="fa-solid fa-forward-step"></i>
        </button>

        <div className={style.volumeBox}>
            <i
              className={
                volume === 0
                  ? "fa-solid fa-volume-xmark"
                  : volume < 0.5
                  ? "fa-solid fa-volume-low"
                  : "fa-solid fa-volume-high"
              }
            ></i>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={changeVolume}
            className={style.volumeSlider}
          />
        </div>

        <button onClick={() => likedSong(song)}>
          <i
            className={
              isLiked
                ? `fa-solid fa-heart ${style.liked}`
                : "fa-regular fa-heart"
            }
          ></i>
        </button>

      </div>

    </div>
    
  )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}

export default Player