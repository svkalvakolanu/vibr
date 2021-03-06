import React, { useState } from "react";
import SongDetail from "../SongDetail/SongDetail";
import Buttons from "../Buttons/Buttons";
import Header from "../Header/Header";
import VolumeButtons from "../VolumeButtons/VolumeButtons";
import Animation from "../Animation/Animation";

const Overlay = props => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  let toggleHover = () => {
    if (isHovering) {
      setIsHovering(false);
    } else {
      setIsHovering(true);
    }
  };

  let cursorMove = () => {
    setIsHovering(true);
    setIsMoving(true);
    setTimeout(() => {
      setIsHovering(false);
    }, 3500);
    fadeCursor();
  };

  let fadeCursor = () => {
    setTimeout(() => {
      setIsMoving(false);
    }, 7000);
  };

  return (
    <div onClick={() => cursorMove()}>
      <Animation
        isMoving={isMoving}
        visualizer={props.visualizer}
        simple={props.simple}
        songData={props.songData}
      />
      <div className="modal" id="overlay-display">
        <div
          id={"overlay-content"}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          onMouseMove={cursorMove}
          className={
            (isHovering ? "overlay-content-show " : "overlay-content-hide ") +
            (!isMoving ? "cursor-fade" : "")
          }
        >
          <div className="container">
            <Header
              toggleRemixModal={props.toggleRemixModal}
              toggleFullScreen={props.toggleFullScreen}
              songData={props.songData}
              fs={props.fs}
              updateVisualizer={props.updateVisualizer}
              visualizer={props.visualizer}
              toggleSimple={props.toggleSimple}
            />
            <SongDetail songData={props.songData} />
            <Buttons
              advanceSong={props.advanceSong}
              prevSong={props.prevSong}
              playPause={props.playPause}
              currentSong={props.currentSong}
              isPlaying={props.isPlaying}
            />
            <VolumeButtons
              decreaseVolume={props.decreaseVolume}
              increaseVolume={props.increaseVolume}
              volume={props.volume}
            />
          </div>
        </div>

        <style jsx>{`
        .modal {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 2;
          overflow: auto;
        }

        .overlay-content-hide {
          opacity: 0;
          -webkit-transition: all 3.5s ease-in;
          -moz-transition: all 3.5s ease-in;
          -moz-transition: all 3.5s ease-in
          -ms-transition: all 3.5s ease-in;
          -ms-transition: all 3.5s ease-in;
          -o-transition: all 3.5s ease-in;
          -o-transition: all 3.5s ease-in;
          transition: all 3.5s ease-in;
          transition: all 3.5s ease-in;
          color: white;
          background-color: RGBA(0,0,0,.01);
        }
        .cursor-fade {
          cursor: none;
        }
        .container {
          position: fixed;
          height: 100%;
          width: 100%;
        }
        .overlay-content-show {
          opacity: 1;
          display: block;
          transition: all 800ms ease-out;
          color: white;
        }
      `}</style>
      </div>
    </div>
  );
};

export default Overlay;
