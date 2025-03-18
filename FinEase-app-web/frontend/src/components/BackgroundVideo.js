import React from 'react';
import styled from 'styled-components';
import videoSrc from '../assets/background-videos.mp4';


const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Place la vidéo en arrière-plan */
  overflow: hidden;
`;

const Video = styled.video`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover; /* Assure que la vidéo couvre tout l'écran */
`;

const Overlay = styled.div`
top: 0;
left: 0;
width: 100%;
heigth: 100%;
background: rgba (0, 0, 0, 0.5);
`;

const BackgroundVideo = () => {
  return (
    <VideoContainer>
      <Video autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo en arrière-plan.
      </Video>
      <Overlay />
    </VideoContainer>
  );
};

export default BackgroundVideo;
