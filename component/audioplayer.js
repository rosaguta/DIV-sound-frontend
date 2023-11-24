import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ src , socket}) => {
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const handleEnded = () => {
      setPlaying(false);
    };

    audioRef.current.addEventListener('ended', handleEnded);

    // return () => {
    //   audioRef.current.removeEventListener('ended', handleEnded);
    // };
  }, []);
  

  const togglePlay = () => {
    if(!window.location.href.includes('shared')){
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        {
          audioRef.current.play();
        }
        
      }
      setPlaying(!isPlaying);
    }else{
        const currenturl = window.location.href
        const parts = currenturl.split('/');
        const lastPart = parts[parts.length - 1];
        socket.emit('wiebel',src,lastPart)
      }
    
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div>
      <audio ref={audioRef} src={src} volume={volume} />
      <button onClick={togglePlay}>{isPlaying ? 'Playing' : 'Play'}</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default AudioPlayer;
