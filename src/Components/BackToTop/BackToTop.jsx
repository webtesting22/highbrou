import React, { useState, useEffect } from "react";
import "./BackToTop.css";
import { FaArrowUpLong } from "react-icons/fa6";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when the page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <div className="back-to-top" onClick={scrollToTop}>
        <div className="pulse"><FaArrowUpLong style={{color:"white"}}/></div>
      </div>
    )
  );
};

export default BackToTop;
