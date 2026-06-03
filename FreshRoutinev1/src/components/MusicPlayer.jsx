import { useState, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import { playlist } from '../data/playlist.js';

function MusicPlayer({ isPlaying, setIsPlaying }) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [shuffleOrder, setShuffleOrder] = useState([]);
    const [shufflePos, setShufflePos] = useState(0);
    const howlRef = useRef(null)
}

export default MusicPlayer

// Track changes = load a new sound
useEffect(() => {
    const sound = new Howl({
        src: [playlist[trackIndex].src],
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
        [arr[i], arr[j] = arr[j], arr[i]];
    }
    return arr
}

// handle Next
function handleNext() {
    if (isShuffle) {
        const nextPos = (shuffleOrder + 1) % shuffleOrder.length
        setShufflePos(nextPos);
        setTrackIndex(shuffleOrder[nextPos]);
    } else {
        setTrackIndex(prev => (prev + 1) % playlist.length);

    }
}

// handle Prev
function handlePrev() {
    if (isShuffle) {
        const prevPos = (shuffleOrder - 1 + shuffleOrder.length) % shuffleOrder.length
        setShufflePos(prevPos);
        setTrackIndex(shuffleOrder[prevPos]);
    } else {
        setTrackIndex(prev => (prev - 1 + playlist.length) % playlist.length);

    }
}