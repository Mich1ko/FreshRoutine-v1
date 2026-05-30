import { useState, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import { playlist } from '../data/playlist.js';

function MusicPlayer({ isPlaying, setIsPlaying }) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [shuffleOrder, setShuffleOrder] = useState([]);
    const [shufflePos, setShufflePos] = useState(0);
    const howler = useState(null)
}

export default MusicPlayer

// Track changes = load a new sound
useEffect(() => {
    const sound = new Howl({
        src: [playlist.src],
        html5: true,
        volume: 0.5,
    });
    howler.current = sound;

    return () => {
        sound.unload();
    };
}, [trackIndex])

useEffect(() => {
    if (isPlaying) {
        sound
    }
    else {

    }
})
// Playing or pause effect

useEffect(() => {
    if (!howlRef.current) return
    if (isPlaying) {
        howlRef.current.play()
    } else {
        howlref.current.pause()
    }
}, [isPlaying]);

// shuffle logic
function buildShuffleOrder(length) {
    const arr = Array.from({ length }, (_, i) => i)
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        arr[i], arr[j] = arr[j], arr[i];
    }
    return arr
}