import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, autoplay=true, controls=true, muted=false }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url={url}
        width='100%'
        height='100%'
        controls={controls}
        playing={autoplay}
        muted={muted}
      />
    </div>
  );
};

export default VideoPlayer;
