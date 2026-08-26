import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Howl } from 'howler'
import { playlist } from '../data/playlist.js'

function buildShuffleOrder(length) {
  const order = Array.from({ length }, (_, index) => index)

  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[order[index], order[swapIndex]] = [order[swapIndex], order[index]]
  }

  return order
}

export function useMusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [shuffleOrder, setShuffleOrder] = useState([])
  const [, setShufflePos] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [prevVolume, setPrevVolume] = useState(0.5)
  const [seekPosition, setSeekPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isVolumeOpen, setIsVolumeOpen] = useState(false)

  const howlRef = useRef(null)
  const handleNextRef = useRef(null)
  const latestPlaybackRef = useRef({ isPlaying, volume, isMuted })
  const track = playlist[trackIndex]

  useEffect(() => {
    latestPlaybackRef.current = { isPlaying, volume, isMuted }
  }, [isPlaying, volume, isMuted])

  const handleNext = useCallback(() => {
    setSeekPosition(0)
    setDuration(0)

    if (isShuffle) {
      setShufflePos((currentPos) => {
        const order = shuffleOrder.length ? shuffleOrder : buildShuffleOrder(playlist.length)
        const nextPos = (currentPos + 1) % order.length

        setShuffleOrder(order)
        setTrackIndex(order[nextPos])

        return nextPos
      })
      return
    }

    setTrackIndex((currentIndex) => (currentIndex + 1) % playlist.length)
  }, [isShuffle, shuffleOrder])

  const handlePrev = useCallback(() => {
    setSeekPosition(0)
    setDuration(0)

    if (isShuffle) {
      setShufflePos((currentPos) => {
        const order = shuffleOrder.length ? shuffleOrder : buildShuffleOrder(playlist.length)
        const prevPos = (currentPos - 1 + order.length) % order.length

        setShuffleOrder(order)
        setTrackIndex(order[prevPos])

        return prevPos
      })
      return
    }

    setTrackIndex((currentIndex) => (currentIndex - 1 + playlist.length) % playlist.length)
  }, [isShuffle, shuffleOrder])

  useEffect(() => {
    handleNextRef.current = handleNext
  }, [handleNext])

  useEffect(() => {
    const sound = new Howl({
      src: [track.src],
      html5: true,
      volume: latestPlaybackRef.current.isMuted ? 0 : latestPlaybackRef.current.volume,
      onload: () => {
        const loadedDuration = sound.duration()
        if (loadedDuration) setDuration(loadedDuration)
      },
      onplay: () => {
        const loadedDuration = sound.duration()
        if (loadedDuration) setDuration(loadedDuration)
      },
      onend: () => {
        setSeekPosition(0)
        handleNextRef.current?.()
      },
    })

    howlRef.current = sound

    if (latestPlaybackRef.current.isPlaying) {
      sound.play()
    }

    return () => {
      sound.unload()
    }
  }, [track.src])

  useEffect(() => {
    let intervalId

    if (isPlaying) {
      intervalId = setInterval(() => {
        if (howlRef.current && !isSeeking) {
          const currentPosition = howlRef.current.seek()

          if (typeof currentPosition === 'number' && !Number.isNaN(currentPosition)) {
            setSeekPosition(currentPosition)
          }

          const currentDuration = howlRef.current.duration()
          if (
            currentDuration &&
            typeof currentDuration === 'number' &&
            !Number.isNaN(currentDuration) &&
            currentDuration > 0
          ) {
            setDuration(currentDuration)
          }
        }
      }, 250)
    }

    return () => clearInterval(intervalId)
  }, [isPlaying, isSeeking])

  useEffect(() => {
    if (!howlRef.current) return

    if (isPlaying) {
      howlRef.current.play()
    } else {
      howlRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!howlRef.current) return
    howlRef.current.volume(isMuted ? 0 : volume)
  }, [volume, isMuted])

  const toggleShuffle = useCallback(() => {
    setIsShuffle((currentShuffle) => {
      const nextShuffle = !currentShuffle

      if (nextShuffle) {
        const order = buildShuffleOrder(playlist.length)
        const currentPos = Math.max(0, order.indexOf(trackIndex))

        setShuffleOrder(order)
        setShufflePos(currentPos)
      }

      return nextShuffle
    })
  }, [trackIndex])

  const handleMute = useCallback(() => {
    setIsMuted((currentMuted) => {
      if (currentMuted) {
        setVolume(prevVolume)
        return false
      }

      setPrevVolume(volume)
      return true
    })
  }, [prevVolume, volume])

  const setVolumeFromPercent = useCallback((percent) => {
    const nextVolume = Number(percent) / 100

    setVolume(nextVolume)
    setIsMuted(nextVolume === 0)
  }, [])

  const seekTo = useCallback((position) => {
    if (howlRef.current) {
      howlRef.current.seek(position)
    }
    setSeekPosition(position)
  }, [])

  return useMemo(() => ({
    duration,
    handleMute,
    handleNext,
    handlePrev,
    isMuted,
    isPlaying,
    isSeeking,
    isShuffle,
    isVolumeOpen,
    playlistLength: playlist.length,
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
  }), [
    duration,
    handleMute,
    handleNext,
    handlePrev,
    isMuted,
    isPlaying,
    isSeeking,
    isShuffle,
    isVolumeOpen,
    seekPosition,
    seekTo,
    setVolumeFromPercent,
    toggleShuffle,
    track,
    trackIndex,
    volume,
  ])
}
