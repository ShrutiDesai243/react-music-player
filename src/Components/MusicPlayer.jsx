import React, {useRef, useState, useEffect} from "react";
import song1 from '../assets/Saudebaazi.mp3'
import video from '../assets/Maza Konkan Bhari.mp4'
import song2 from '../assets/Piyu Bole.mp3'
import song3 from '../assets/Achha Ji Main Haari.mp3'
import song4 from '../assets/Bade Achhe Lagte Hain Balika Badhu 128 Kbps.mp3'
import song5 from '../assets/Afreen Afreen.mp3'
import song6 from '../assets/ManMandira.mp3'
import song7 from '../assets/Kuhu Kuhu Bole Koyaliya.mp3'
import song8 from '../assets/Thodi Der.mp3'
import song9 from '../assets/Pal pal dil ke pass.mp3'
import style from './MusicPlayer.module.css'
import Player from "./Player.jsx";
import Queue from "./Queue.jsx";

const MusicPlayer = () => {
  let songs = [
    {
      url: song1,
      name: "Saudebaazi",
      image: "https://i.ytimg.com/vi/-_fKCIzJlUQ/maxresdefault.jpg"
    },
    {
      url: video,
      name: "Maza Kokan Bhaari",
      image: "https://c.saavncdn.com/129/Maza-Konkan-Bhari-From-Gharat-Ganpati-Marathi-2024-20240617100119-500x500.jpg"
    },
    {
      url: song2,
      name: "Piyu Bole",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgGRuYDUExmWGRbv3hepiK3ES5pcqKPKu1IZH8O4GxFTAfOk2m82x3rOU&s=10"
    },
    {
      url: song3,
      name: "Achha Ji Main Haari",
      image: "https://i.ytimg.com/vi/WBdYi-Dh3sQ/hqdefault.jpg"
    },
    {
      url: song4,
      name: "Bade Achhe Lagte Hain",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkkFgMb26vat21-ZmlAyx6kHEMLNcPZ557G_woQv9C4A&s"
    },
    {
      url: song5,
      name: "Afreen Afreen",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe1hD8OFwqK8lBdDPLtQLNXn3D3pCnYkCtEjmqS1rC6slaRCfCizfy8ezz&s=10"
    },
    {
      url: song6,
      name: "Man Mandira",
      image: "https://i.ytimg.com/vi/qOyheu75Eh8/maxresdefault.jpg"
    },
    {
      url: song7,
      name: "Kuhu Kuhu Bole Koyaliya",
      image: "https://i.ytimg.com/vi/MKXyTbe9cUc/hqdefault.jpg"
    },
    {
      url: song8,
      name: "Thodi Der",
      image: ""
    },
    {
      url: song9,
      name: "Pal Pal Dil Ke Paas",
      image: ""
    }
  ];
    
  const audioRef = useRef(null);

  const [index, setIndex] = useState(0);

  const [liked, setLiked] = useState([])

  const [isPlaying, setIsPlaying] = useState(false);

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("all");

  const [showFilter, setShowFilter] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  const playPause = () => {
    if(isPlaying){
      // console.log(audioRef.current);
      
      audioRef.current.pause();
    }else{
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setIndex(prev => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setIndex(prev => (prev - 1 + songs.length) % songs.length);
  };

  const shuffleSong = () => {
    let randomIndex;

    do{
      randomIndex = Math.floor(
        Math.random() * songs.length
      );
    }while(randomIndex === index);

    setIndex(randomIndex);
  };

  
  // const isLiked = liked.includes(songs[index]);
  const isLiked = liked.some((item) => item.url === songs[index].url);

  const likedSong = (song) => {
    if (liked.some((item) => item.url === song.url)) {
      setLiked(liked.filter((item) => item.url !== song.url));

    } else {
      setLiked([...liked, song]);
    }
  };
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [index]);

  let displayedSongs;

  if (filter === "favorites") {
    displayedSongs = liked;
  } else {
    displayedSongs = songs;
  }

  displayedSongs = displayedSongs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const loadDuration = () => {
    setDuration(audioRef.current.duration);
  };

  const seekSong = (e) => {
    const newTime = Number(e.target.value);

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    console.log(audioRef.current);
  };

  const changeVolume = (e) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      
      
    }
  };

  return (
    <div className={style.sec}>
        <h1 className={style.heading}>Music Player</h1>
        <div className={style.main}>
          
          <Player
            song={songs[index]}
            audioRef={audioRef}
            isPlaying={isPlaying}
            playPause={playPause}
            nextSong={nextSong}
            prevSong={prevSong}
            shuffleSong={shuffleSong}
            likedSong={likedSong}
            isLiked={isLiked}
            currentTime={currentTime}
            duration={duration}
            updateTime={updateTime}
            loadDuration={loadDuration}
            seekSong={seekSong}
            volume={volume}
            changeVolume={changeVolume}
          />
          
          <section className={style.queue}>
            <div className={style.queueTop}>
              
              <div className={style.searchbar}>
                <i className="fa-solid fa-search"></i>

                <input
                  type="search"
                  className={style.searchIn}
                  placeholder="Type song name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className={style.filterContainer}>
                <button onClick={() => setShowFilter(!showFilter)}>
                  <i className="fa-solid fa-filter"></i>
                </button>

                {showFilter && (
                  <div className={style.filterMenu}>
                    <button
                      onClick={() => {
                        setFilter("all");
                        setShowFilter(false);
                      }}
                    >
                      All Songs
                    </button>

                    <button
                      onClick={() => {
                        setFilter("favorites");
                        setShowFilter(false);
                      }}
                    >
                      ♥ Favorites
                    </button>
                  </div>
                )}
              </div>

            </div>

            <div className={style.songList}>
            {displayedSongs.length === 0 ? (
              <p className={style.noSongs}>
                No songs found
              </p>
            ) : (
              displayedSongs.map((song) => {
                const originalIndex = songs.indexOf(song);

                return (
                  <Queue
                    key={song.url}
                    song={song}
                    setIndex={setIndex}
                    setIsPlaying={setIsPlaying}
                    idx={originalIndex}
                  />
                );
              })
            )}
            </div>
          </section>
          
        </div>
    </div>
  )
}

export default MusicPlayer