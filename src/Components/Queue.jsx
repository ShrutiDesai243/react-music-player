import React from 'react'
import style from './MusicPlayer.module.css'

const Queue = ({song, idx, setIndex, setIsPlaying})=>{
  return (
    <div
      className={style.queueSong}
      onClick={() => {
        setIndex(idx);
        setIsPlaying(true);
      }}
    >
      <img
        src={song.image}
        alt=""
        className={style.image}
      />

      <h4 >{song.name}</h4>
    </div>
  );
};

export default Queue