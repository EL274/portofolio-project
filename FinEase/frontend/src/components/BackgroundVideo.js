import React from 'react';
import backgroundVideo from '../assets/background-video.mp4';
import './BackgroundVideo.css';

const BackgroundVideo = () => (
  <video autoPlay muted loop id="background-video">
    <source src={backgroundVideo} type="video/mp4" />
    Votre navigateur ne supporte pas la lecture de vidéos.
  </video>
);

export default BackgroundVideo;
