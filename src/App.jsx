import React from 'react'
import style from './Components/MusicPlayer.module.css'
import MusicPlayer from './Components/MusicPlayer.jsx'

const App = () => {
  return (
    <div className={style.body}>
      <MusicPlayer/>
    </div>
  )
}

export default App