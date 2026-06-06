import { useState, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import { playlist } from '../data/playlist.js';

function MusicPlayer({ isPlaying, setIsPlaying }) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [shuffleOrder, setShuffleOrder] = useState([]);
    const [shufflePos, setShufflePos] = useState(0);
    const howlRef = useRef(null)

    const track = playlist[trackIndex];

    // Track changes = load a new sound
    useEffect(() => {
        const sound = new Howl({
            src: [track.src],
            html5: true,
            volume: 0.5,
            onload: () => {
                if (isPlaying) {
                    sound.play();
                }
            }
        });
        howlRef.current = sound;

        if (isPlaying) {
            sound.play();
        }

        return () => {
            sound.unload();
        };
    }, [trackIndex])

    // Playing or pause effect
    useEffect(() => {
        if (!howlRef.current) return
        if (isPlaying) {
            howlRef.current.play()
        } else {
            howlRef.current.pause()
        }
    }, [isPlaying]);

    // shuffle logic
    function buildShuffleOrder(length) {
        const arr = Array.from({ length }, (_, i) => i)
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }

    // handle Next
    function handleNext() {
        if (isShuffle) {
            const nextPos = (shufflePos + 1) % shuffleOrder.length
            setShufflePos(nextPos);
            setTrackIndex(shuffleOrder[nextPos]);
        } else {
            setTrackIndex(prev => (prev + 1) % playlist.length);
        }
    }

    // handle Prev
    function handlePrev() {
        if (isShuffle) {
            const prevPos = (shufflePos - 1 + shuffleOrder.length) % shuffleOrder.length
            setShufflePos(prevPos);
            setTrackIndex(shuffleOrder[prevPos]);
        } else {
            setTrackIndex(prev => (prev - 1 + playlist.length) % playlist.length);
        }
    }

    return null;
}

export default MusicPlayer