import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './BackGround.css';
import { FaPause, FaPlay } from "react-icons/fa6";

const BackGround = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="background-container">
    <video ref={videoRef} className="background fade-in" autoPlay loop muted>
      <source src= "/video_bg3.mp4" type="video/mp4" />
    </video>
    <img src="/slogan.png" className="centered-image" alt="Slogan"/>
    <div className="button-container">
      <button1 onClick={() => navigate('/workout-plans')}>WORKOUT PLANS</button1>
      <button2 onClick={() => navigate('/meal-plans')}>NUTRITION PLANS</button2>
    </div>
    {isPlaying ? (
      <FaPause className="button-fa" onClick={handlePause} />
    ) : (
      <FaPlay className="button-fa" onClick={handlePlay} />
    )}
    </div>
  );
};

export default BackGround;
