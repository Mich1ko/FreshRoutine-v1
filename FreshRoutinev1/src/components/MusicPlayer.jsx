import { useState, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import { playlist } from '../data/playlist.js';

function MusicPlayer({ isPlaying, setIsPlaying }) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [shuffleOrder, setShuffleOrder] = useState([]);
    const [shufflePos, setShufflePos] = useState(0);
    const howlRef = useRef(null)
    const [volume, setVolume] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)
    const [prevVolume, setPrevVolume] = useState(0.5)
    const [isVolumeOpen, setIsVolumeOpen] = useState(false)
    const volumeControlRef = useRef(null)

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
        howlRef.current.volume(isMuted ? 0 : volume)
    }, [volume, isMuted]);

    useEffect(() => {
        if (!isVolumeOpen) return

        function handlePointerDown(event) {
            if (!volumeControlRef.current?.contains(event.target)) {
                setIsVolumeOpen(false)
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setIsVolumeOpen(false)
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isVolumeOpen])

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

    function handleMute() {
        if (isMuted) {

            setIsMuted(false)
            setVolume(prevVolume)
        } else {
            setPrevVolume(volume)
            setIsMuted(true)
        }
    }

    const volumeIcon = isMuted || volume === 0
        ? 'muted'
        : volume === 0.5
            ? 'low'
            : 'high'

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
                <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800 truncate leading-tight">
                            {track.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 truncate">
                            {track.artist}
                        </p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 tabular-nums flex-shrink-0">
                        {trackIndex + 1}/{playlist.length}
                    </span>
                </div>

                {/* Fake progress bar — decorative for now */}
                <div className="mt-3 h-1 rounded-full bg-slate-200 overflow-hidden">
                    <div
                        className={`h-full rounded-full bg-amber-400 transition-all duration-1000 ${isPlaying ? 'w-2/5' : 'w-0'}`}
                    />
                </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-center gap-3 mt-4">
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
                    className={`rounded-lg p-2 transition-all duration-150 flex-shrink-0 ${isShuffle
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
                    className="rounded-lg p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150 flex-shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                    </svg>
                </button>

                {/* Play / Pause — primary button */}
                <button
                    type="button"
                    onClick={() => setIsPlaying(prev => !prev)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white shadow-md shadow-amber-500/30 hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-95 transition-all duration-150 flex-shrink-0"
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
                    className="rounded-lg p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150 flex-shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
                    </svg>
                </button>

                {/* Volume control */}
                <div ref={volumeControlRef} className="relative flex items-center">
                    {/* Speaker icon button */}
                    <button
                        type="button"
                        onClick={() => setIsVolumeOpen(prev => !prev)}
                        title="Volume"
                        aria-label="Toggle volume controls"
                        aria-expanded={isVolumeOpen}
                        className={`rounded-lg p-2 transition-all duration-150 flex-shrink-0 ${isVolumeOpen
                            ? 'text-amber-500 bg-amber-50 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                            }`}
                    >
                        {volumeIcon === 'muted' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        )}
                        {volumeIcon === 'low' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                        )}
                        {volumeIcon === 'high' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                        )}
                    </button>

                    {isVolumeOpen && (
                        <div className="absolute right-0 bottom-full mb-2 flex w-40 max-w-[calc(100vw-2rem)] items-center gap-2 overflow-hidden rounded-lg border border-slate-200/70 bg-white px-2 py-2 shadow-md z-10">
                            <button
                                type="button"
                                onClick={handleMute}
                                title={isMuted ? 'Unmute' : 'Mute'}
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                                className="rounded-md p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150 flex-shrink-0"
                            >
                                {volumeIcon === 'muted' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                )}
                                {volumeIcon === 'low' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                )}
                                {volumeIcon === 'high' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                )}
                            </button>

                            <span className="text-[10px] text-slate-400 tabular-nums w-7 text-right flex-shrink-0">
                                {isMuted ? 0 : Math.round(volume * 100)}%
                            </span>

                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={isMuted ? 0 : Math.round(volume * 100)}
                                onChange={(e) => {
                                    const newVol = Number(e.target.value) / 100
                                    setVolume(newVol)
                                    if (newVol > 0 && isMuted) setIsMuted(false)
                                    if (newVol === 0) setIsMuted(true)
                                }}
                                className="min-w-0 flex-1 h-1 accent-amber-500 cursor-pointer"
                                title={`Volume: ${isMuted ? 0 : Math.round(volume * 100)}%`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer
