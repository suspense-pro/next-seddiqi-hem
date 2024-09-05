import React, { useEffect, useRef, useState } from "react";
import styles from "./video.module.scss";
import classNames from "classnames";
import VideoPlay from "@assets/images/svg/VideoPlay";
import VideoPause from "@assets/images/svg/VideoPause";
const Video = ({ video, className = "", autoPlay = true, showPlay = true }) => {
  //   console.log("video----", video);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && autoPlay) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.7 }
    );
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", function () {
        setIsPlaying(false);
      });
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef?.current]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && videoRef.current.paused) {
        videoRef.current.play().catch((error) => {});
      } else {
        videoRef.current.pause();
      }
      setIsMuted(true);
    }
  }, [isPlaying]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const toggleMuteUnmute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted((prevIsMuted) => !prevIsMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      if (isPlaying && videoRef.current.paused) {
        videoRef.current.play().catch((error) => {});
      } else {
        videoRef.current.pause();
      }
      setIsMuted(true);
    }
  };

  return (
    <div className={classNames(styles.videoPlayerWrapper, className)}>
      {/* {!isLoaded && <div className={styles.skeleton}></div>} */}
      {video && (
        <video
          ref={videoRef}
          loop={true}
          muted={isMuted}
          autoPlay={autoPlay}
          className={styles.videoPlayer}
          onLoadedData={handleVideoLoad}
          style={{
            background: "#000101",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          poster={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}?protocol=https`}
          src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
        >
          <source
            src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
            data-res="High"
            data-bitrate="2119"
            data-label="High"
            type="video/mpeg4"
          />
          <source
            src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_480p?protocol=https`}
            data-res="Medium"
            data-bitrate="689"
            data-label="Medium"
            type="video/mpeg4"
          />
          <source
            src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/webm_480p?protocol=https`}
            data-res="Medium"
            data-bitrate="624"
            data-label="Medium"
            type="video/webm"
          />
        </video>
      )}

      <div className={styles.actionButtonContainer}>
        {(showPlay || !autoPlay) && (
          <div
            className={styles.actionButtonAlignment}
            onClick={togglePlayPause}
          >
            {isPlaying ? <VideoPause /> : <VideoPlay />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
