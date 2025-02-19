import React, { useRef, useState,useEffect } from "react";
import "./HighBrouWorkVideo.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { Link } from "react-router-dom";
const HighBrouWorkVideo = () => {
    const videoRef = useRef(null); // Reference to the video element
    const [isPlaying, setIsPlaying] = useState(true); // State to track play/pause

    const handleVideoToggle = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying); // Toggle the play state
        }
    };
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7; // Set video speed to 90% of normal speed
        }
    }, []);
    return (
        <>
            <section id="HightBrouWorkVideoContainer">
                <div className="VideoContainer">
                    <div className="VideoOverlay"></div>
                    <video
                        ref={videoRef}
                        src="/Images/Highbrou website intro 1240x698.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="HighBrouWorkVideo"
                    ></video>
                    <div className="HighBrouQuateContainer">
                        <div className="HeaderContainer sectionPadding">
                            <h2>Building Dreams with Precision and Purpose</h2>
                            <button
                                className={`VideoToggleButton ${isPlaying ? "playing" : "paused"}`}
                                onClick={handleVideoToggle}
                            >
                                {isPlaying ? (
                                    <FaPause />

                                ) : (
                                    <FaPlay />
                                )}
                            </button>
                        </div>
                        <p>Showcasing <Link to="/" style={{color:"white"}}><b>Highbrou</b></Link> Engineering's Expertise in Structural Excellence</p>

                    </div>
                </div>
            </section>
        </>
    );
};

export default HighBrouWorkVideo;
