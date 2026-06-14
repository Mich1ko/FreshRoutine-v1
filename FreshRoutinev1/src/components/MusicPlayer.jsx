import { useState, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import { playlist } from '../data/playlist.js';

function MusicPlayer({ isPlaying, setIsPlaying }) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [shuffleOrder, setShuffleOrder] = useState([]);
    const [shufflePos, setShufflePos] = useState(0);
    const howlRef = useRef(null)
    const [volume, setVolume] = useRef(0.5)
    const [muted, setIsMuted] = useRef(false)
    const [prevVolume, setPrevVolume] = useRef(0.5)

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

    //telling howler the new volume
    //When volume OR isMuted changes → tell Howler the new volume:
    useEffect(() => {
        if (!howlRef.current) return
        howlRef.volume.value = muted ? 0 : volume
    }, [volume, muted]);

    const current = howlRef.current.volume()
    howlRef.current.volume(0.75)
    howlRef.current.volume(0)
    howlRef.current.volume(1)
    howlRef.current.volume(slidervolume / 100)

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

    function muteToggle() {
        if (isMuted) {

            setIsMuted(false)
            setVolume(prevVolume)
        } else {
            setPrevVolume(setVolume)
            setIsMuted(true)
        }
    }

    return (
        <div className="mt-auto">
            {/* Divider */}
            <div className="border-t border-slate-200/70 mb-4" />

            {/* Section label */}
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 mb-3">
                Music
            </p>

            {/* Track info */}
            <div className="rounded-xl bg-white/60 border border-slate-200/60 px-4 py-3 shadow-sm mb-3">
                <p className="text-xs font-semibold text-slate-800 truncate leading-tight">
                    {track.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {track.artist}
                </p>

                {/* Fake progress bar — decorative for now */}
                <div className="mt-3 h-1 rounded-full bg-slate-200 overflow-hidden">
                    <div
                        className={`h-full rounded-full bg-amber-400 transition-all duration-1000 ${isPlaying ? 'w-2/5' : 'w-0'
                            }`}
                    />
                </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between gap-1">

                {/* Shuffle toggle */}
                <button
                    type="button"
                    title="Shuffle"
                    onClick={() => {
                        const next = !isShuffle
                        setIsShuffle(next)
                        if (next) {
                            setShuffleOrder(buildShuffleOrder(playlist.length))
                            setShufflePos(0)
                        }
                    }}
                    className={`rounded-lg p-2 transition-all duration-150 ${isShuffle
                        ? 'text-amber-500 bg-amber-50 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                >
                    {/* Shuffle icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 3 21 3 21 8" />
                        <line x1="4" y1="20" x2="21" y2="3" />
                        <polyline points="21 16 21 21 16 21" />
                        <line x1="15" y1="15" x2="21" y2="21" />
                    </svg>
                </button>

                {/* Previous */}
                <button
                    type="button"
                    title="Previous"
                    onClick={handlePrev}
                    className="rounded-lg p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                    </svg>
                </button>

                {/* Play / Pause — primary button */}
                <button
                    type="button"
                    onClick={() => setIsPlaying(prev => !prev)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white shadow-md shadow-amber-500/30 hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-95 transition-all duration-150"
                >
                    {isPlaying ? (
                        /* Pause icon */
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        /* Play icon */
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </button>

                {/* Next */}
                <button
                    type="button"
                    title="Next"
                    onClick={handleNext}
                    className="rounded-lg p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
                    </svg>
                </button>

                {/* Track count pill */}
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-1 tabular-nums">
                    {trackIndex + 1}/{playlist.length}
                </span>

            </div>
        </div>
    );
}

export default MusicPlayer