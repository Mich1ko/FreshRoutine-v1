import { useEffect, useRef } from 'react'

function MusicPlayer({ player }) {
    const {
        duration,
        handleMute,
        handleNext,
        handlePrev,
        isMuted,
        isPlaying,
        isShuffle,
        isVolumeOpen,
        playlistLength,
        seekPosition,
        seekTo,
        setIsPlaying,
        setIsSeeking,
        setIsVolumeOpen,
        setSeekPosition,
        setVolumeFromPercent,
        toggleShuffle,
        track,
        trackIndex,
        volume,
    } = player
    const volumeControlRef = useRef(null)

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
    }, [isVolumeOpen, setIsVolumeOpen])

    function formatTime(secs) {
        if (!secs || isNaN(secs) || secs < 0) return '0:00'
        const mins = Math.floor(secs / 60)
        const remainingSecs = Math.floor(secs % 60)
        return `${mins}:${String(remainingSecs).padStart(2, '0')}`
    }

    const volumeIcon = isMuted || volume === 0
        ? 'muted'
        : volume === 0.5
            ? 'low'
            : 'high'

    return (
        <div className="mt-auto">
            <div className="border-t border-slate-200/70 mb-4 dark:border-slate-700/70" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 mb-3">
                Music
            </p>

            <div className="rounded-xl bg-white/60 border border-slate-200/60 px-4 py-3 shadow-sm mb-3 transition-colors duration-500 dark:border-slate-700/70 dark:bg-slate-950/50 dark:shadow-none">
                <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800 truncate leading-tight dark:text-slate-100">
                            {track.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 truncate dark:text-slate-500">
                            {track.artist}
                        </p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 tabular-nums flex-shrink-0 dark:bg-slate-800 dark:text-slate-400">
                        {trackIndex + 1}/{playlistLength}
                    </span>
                </div>

                <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] tabular-nums font-medium text-slate-400 mb-1 dark:text-slate-500">
                        <span>{formatTime(seekPosition)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div className="relative flex items-center group">
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            step={0.1}
                            value={seekPosition}
                            onMouseDown={() => setIsSeeking(true)}
                            onTouchStart={() => setIsSeeking(true)}
                            onChange={(event) => {
                                setSeekPosition(Number(event.target.value))
                            }}
                            onMouseUp={(event) => {
                                setIsSeeking(false)
                                seekTo(Number(event.target.value))
                            }}
                            onTouchEnd={(event) => {
                                setIsSeeking(false)
                                seekTo(Number(event.target.value))
                            }}
                            aria-label="Track playback position"
                            className="w-full h-1.5 accent-amber-500 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
                <button
                    type="button"
                    title="Shuffle"
                    onClick={toggleShuffle}
                    className={`rounded-lg p-2 transition-all duration-150 flex-shrink-0 ${isShuffle
                        ? 'text-amber-500 bg-amber-50 shadow-sm dark:bg-amber-500/10 dark:text-amber-400'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 3 21 3 21 8" />
                        <line x1="4" y1="20" x2="21" y2="3" />
                        <polyline points="21 16 21 21 16 21" />
                        <line x1="15" y1="15" x2="21" y2="21" />
                    </svg>
                </button>

                <button
                    type="button"
                    title="Previous"
                    onClick={handlePrev}
                    className="rounded-lg p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150 flex-shrink-0 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={() => setIsPlaying((current) => !current)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white shadow-md shadow-amber-500/30 hover:bg-amber-600 hover:shadow-amber-500/40 active:scale-95 transition-all duration-150 flex-shrink-0"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </button>

                <button
                    type="button"
                    title="Next"
                    onClick={handleNext}
                    className="rounded-lg p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150 flex-shrink-0 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
                    </svg>
                </button>

                <div ref={volumeControlRef} className="relative flex items-center">
                    <button
                        type="button"
                        onClick={() => setIsVolumeOpen((current) => !current)}
                        title="Volume"
                        aria-label="Toggle volume controls"
                        aria-expanded={isVolumeOpen}
                        className={`rounded-lg p-2 transition-all duration-150 flex-shrink-0 ${isVolumeOpen
                            ? 'text-amber-500 bg-amber-50 shadow-sm dark:bg-amber-500/10 dark:text-amber-400'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
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
                        <div className="absolute right-0 bottom-full mb-2 flex w-40 max-w-[calc(100vw-2rem)] items-center gap-2 overflow-hidden rounded-lg border border-slate-200/70 bg-white px-2 py-2 shadow-md z-10 dark:border-slate-700 dark:bg-slate-900">
                            <button
                                type="button"
                                onClick={handleMute}
                                title={isMuted ? 'Unmute' : 'Mute'}
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                                className="rounded-md p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150 flex-shrink-0 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
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
                                onChange={(event) => setVolumeFromPercent(event.target.value)}
                                className="min-w-0 flex-1 h-1 accent-amber-500 cursor-pointer"
                                title={`Volume: ${isMuted ? 0 : Math.round(volume * 100)}%`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer
