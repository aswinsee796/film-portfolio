import { useRef, useState } from 'react'
import backgroundTrack from '../../assets/newmusic.mp3'

function MusicToggle() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [statusText, setStatusText] = useState('Music Off')

  const handleToggleMusic = async () => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      setStatusText('Music Off')
      return
    }

    try {
      await audioRef.current.play()
      setIsPlaying(true)
      setStatusText('Music On')
    } catch {
      setIsPlaying(false)
      setStatusText('Tap Again To Allow Audio')
    }
  }

  return (
    <section className="music-section" aria-label="Music controls">
      <p className="music-label">Music</p>
      <button
        type="button"
        className={`music-toggle-switch ${isPlaying ? 'is-on' : ''}`}
        onClick={handleToggleMusic}
        role="switch"
        aria-checked={isPlaying}
        aria-label="Toggle music"
      >
        <span className="music-toggle-knob" />
      </button>
      <span className={`music-status ${isPlaying ? 'is-on' : 'is-off'}`}>{statusText}</span>
      <audio ref={audioRef} loop preload="metadata">
        <source src={backgroundTrack} type="audio/mpeg" />
      </audio>
    </section>
  )
}

export default MusicToggle
