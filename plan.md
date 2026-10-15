<div class="queue-container">
  <!-- Search Header -->
  <div class="search-bar-wrapper">
    <input type="text" placeholder="Type song name..." />
  </div>

  <!-- Song Items -->
  <div class="song-list">
    <div class="song-item">Saudebaazi</div>
    <div class="song-item">Maza Kokan Bhaari</div>
    <div class="song-item">Piyu Bole</div>
    <!-- remaining songs -->
  </div>
</div>

/* Sidebar Queue Container */
.queue-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box; /* Prevents padding from breaking boundaries */
  background: rgba(255, 255, 255, 0.1); /* Keeps background transparent */
  backdrop-filter: blur(10px);
  border-radius: 16px;
  max-height: 100vh; /* Adjust as needed */
  overflow: hidden; /* Prevents list from rendering outside sidebar borders */
}

/* Search Bar Area */
.search-bar-wrapper {
  flex-shrink: 0; /* Prevents search bar from shrinking */
  margin-bottom: 16px; /* Creates clean gap above song list */
}

/* Song List Container (Scrollable area below search) */
.song-list {
  flex: 1;
  overflow-y: auto; /* List scrolls inside here, staying BELOW search bar */
  padding-right: 8px; /* Extra breathing space for scrollbar */
}

5. What should you do with the Queue?

I would not create a new sidebar yet.

You already have:

┌──────────────────────┐
│      Player          │
│                      │
│       Album art      │
│                      │
│  🔀 ⏮ ▶ ⏭ ♡         │
└──────────────────────┘

┌──────────────────────┐
│ 🔍 Search song...    │
│                      │
│ 🖼 Saudebaazi        │
│ 🖼 Afreen Afreen     │
│ 🖼 Man Mandira       │
│ 🖼 Piyu Bole         │
└──────────────────────┘

Your existing queue is a perfect place for:

All Songs | Favorites

You can later add a small filter:

[ All Songs ] [ ♥ Favorites ]

and your search box can work on whichever list is selected.

So I would not add another sidebar. It will make your current simple UI unnecessarily complicated.

6. What about images?

I actually recommend not adding external thumbnail URLs for every song.

You have already noticed the problem:

If I add a new song, I don't want to find another image.

That's a good design decision.

Instead, create a default music-player artwork and use it whenever song.image is empty.

For example:

<img
  src={song.image || "/default-music.png"}
  alt={song.name}
  className={style.img}
/>

Then your array can simply be:

{
  url: song8,
  name: "Thodi Der"
}

No image required.

But there's an even nicer option for your project.

Generate artwork from the song name

Instead of an image, you can create a box:

<div className={style.musicImage}>
  <i className="fa-solid fa-music"></i>
  <span>{song.name}</span>
</div>

Then every new song automatically gets artwork.

For example:

┌────────────────────┐
│                    │
│        ♪           │
│                    │
│     Thodi Der      │
│                    │
└────────────────────┘

This means your song object only needs:

{
  url: song8,
  name: "Thodi Der"
}

I prefer this for your current project. It's simple and you don't have to hunt for thumbnails.




7. Your final song array can therefore become simpler

Instead of:

{
  url: song8,
  name: "Thodi Der",
  image: ""
}

just:

{
  url: song8,
  name: "Thodi Der"
}

And for the songs where you already have images:

{
  url: song5,
  name: "Afreen Afreen",
  image: "..."
}

Then Player can decide:

{song.image ? (
  <img
    src={song.image}
    alt={song.name}
    className={style.img}
  />
) : (
  <div className={style.musicImage}>
    <i className="fa-solid fa-music"></i>
    <span>{song.name}</span>
  </div>
)}

That's a perfectly reasonable use of a ternary operator.

So your next steps should be only these

Don't add anything else yet.

Task	Status
Song array	✅ Done
Dynamic Player	✅ Done
Next	✅ Done
Previous	✅ Done
Shuffle	✅ Done
Play/Pause	✅ Done
Auto-play next selected song	🔨 Fix now
Heart/favorites	🔨 Fix now
Dynamic Queue	✅ Done
Search	🔨 After this
Current-song highlight	Next
Progress bar	Later
Volume	Later

And keep your heart button. Your original idea was good; we just need to connect it to React state properly.




### Liked Songs doubts:
Yes — let's make these three things very clear, without changing your whole code.

## 1. Why `likedSong(index)` doesn't receive your song index

You have:

```jsx
<button onClick={likedSong}>
```

When you click a button, React automatically gives the click event to the function.

So this:

```jsx
onClick={likedSong}
```

is roughly like:

```js
likedSong(event);
```

It does **not** mean:

```js
likedSong(index);
```

That's why if your function is:

```js
const likedSong = (index) => {
```

the `index` there is actually the **event object**, not your song index.

### If you wanted to pass the index

You would have to explicitly do:

```jsx
<button onClick={() => likedSong(index)}>
```

But in your case, we don't even need to pass the index. We can pass the current `song`.

---

# 2. Your `likedSong` function

Change your current function:

```js
const likedSong = (index)=>{
  if (liked.includes(songs[index])) {
    liked.splice(index,1,0)
  }
  else{
    setLiked([...liked,songs[index]])
  }
}
```

to:

```js
const likedSong = (song) => {
  if (liked.includes(song)) {
    setLiked(liked.filter((item) => item !== song));
  } else {
    setLiked([...liked, song]);
  }
};
```

### What is happening?

Suppose:

```js
liked = [
  songs[0],
  songs[2]
]
```

and you click `songs[0]`.

This:

```js
liked.includes(song)
```

asks:

> Is this song already inside my liked array?

Yes → remove it:

```js
liked.filter((item) => item !== song)
```

If it isn't there → add it:

```js
setLiked([...liked, song]);
```

---

# 3. How to call `likedSong` from Player

In `MusicPlayer.jsx`, you pass the function:

```jsx
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
/>
```

But before that, you need:

```js
const isLiked = liked.includes(songs[index]);
```

## Where exactly?

Put it **after your `useState` declarations and before your functions**.

So your section should look like:

```js
const audioRef = useRef(null);

const [index, setIndex] = useState(0);

const [liked, setLiked] = useState([]);

const [isPlaying, setIsPlaying] = useState(false);


// ADD IT HERE
const isLiked = liked.includes(songs[index]);


const playPause = () => {
  ...
};
```

That's all.

---

# 4. Then change `Player.jsx`

Your Player currently has something like:

```js
const Player = ({
  song,
  audioRef,
  isPlaying,
  playPause,
  nextSong,
  prevSong,
  shuffleSong,
  likedSong
}) => {
```

Add `isLiked`:

```js
const Player = ({
  song,
  audioRef,
  isPlaying,
  playPause,
  nextSong,
  prevSong,
  shuffleSong,
  likedSong,
  isLiked
}) => {
```

Then your heart button becomes:

```jsx
<button onClick={() => likedSong(song)}>
  <i
    className={
      isLiked
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart"
    }
  ></i>
</button>
```

Notice this:

```jsx
onClick={() => likedSong(song)}
```

We're explicitly saying:

> When clicked, call `likedSong` and give it the current song.

---

# 5. The complete flow

Suppose currently:

```js
index = 2
```

Then:

```js
songs[index]
```

means:

```js
songs[2]
```

which might be:

```js
{
  url: song7,
  name: "Kuhu Kuhu Bole Koyaliya",
  image: "..."
}
```

Then:

```jsx
<Player song={songs[index]} />
```

passes that song to Player.

Then when you click ❤️:

```jsx
onClick={() => likedSong(song)}
```

sends that song back to MusicPlayer.

Then:

```js
likedSong(song)
```

checks:

```js
liked.includes(song)
```

If not liked:

```js
setLiked([...liked, song]);
```

If already liked:

```js
setLiked(liked.filter((item) => item !== song));
```

And:

```js
const isLiked = liked.includes(songs[index]);
```

tells Player whether the **currently playing song** is liked.

Therefore the icon changes:

```text
Not liked → ♡
             ↓ click
Liked     → ♥
             ↓ click
Not liked → ♡
```

### One important correction to my previous answer

I mentioned `setIsPlaying(true)` in `Queue`, but you don't necessarily need to pass that around if you handle song changes with `useEffect`. We can keep your code simpler by fixing the autoplay with `useEffect` in `MusicPlayer` next.


### useEffect for next audio not autoplaying:
Add it in **`MusicPlayer.jsx`**, inside the `MusicPlayer` component, **after your `playPause`, `nextSong`, `prevSong`, etc. functions** and before the `return`.

Also first change your import to include `useEffect`.

### Your code should look like this:

```jsx
import React, { useRef, useState, useEffect } from "react";
```

Then inside `MusicPlayer`:

```jsx
const MusicPlayer = () => {

  // songs array
  let songs = [
    // ...
  ];

  const audioRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const isLiked = liked.includes(songs[index]);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
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

    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === index);

    setIndex(randomIndex);
  };

  const likedSong = (song) => {
    if (liked.includes(song)) {
      setLiked(liked.filter((item) => item !== song));
    } else {
      setLiked([...liked, song]);
    }
  };


  // ADD useEffect HERE
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [index]);


  return (
    // ...
  );
};
```

### So the structure is:

```text
useState
   ↓
isLiked
   ↓
playPause()
   ↓
nextSong()
   ↓
prevSong()
   ↓
shuffleSong()
   ↓
likedSong()
   ↓
useEffect()       ← ADD HERE
   ↓
return
```

### What happens now?

When you click **Next**:

```js
setIndex(...)
```

changes `index`.

Because you have:

```js
}, [index]);
```

the `useEffect` runs again.

Then:

```js
audioRef.current.play();
```

plays the newly selected song.

So:

**Next → index changes → useEffect runs → new song plays.**
