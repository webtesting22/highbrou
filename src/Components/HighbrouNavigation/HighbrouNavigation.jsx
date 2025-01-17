import React, { useState, useEffect } from "react";
import "./HighbrouNavigation.css";
import NavigationLinks from "./NavigationLinks";
import HighbrouLogo from "./highbrou_logo.webp"
import { Link } from "react-router-dom";
const HighbrouNavigation = () => {
    const [scrolling, setScrolling] = useState(false);

    // Listen to the window scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true); // Change the state when scrolled more than 50px
            } else {
                setScrolling(false); // Reset when at the top
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <section className={`NavigationBarContainer ${scrolling ? "scrolled" : ""}`}>
                <div className="AnimatedNavigation">
                    <div className="mainDevideContainer">
                        <div className="LogoContainer">
                            <Link to="/">
                                <img src={HighbrouLogo} alt="" />
                            </Link>
                        </div>
                        <div className="NavigationLinksContainer">
                            <ul>
                                {NavigationLinks.map((item, index) => (
                                    <li key={index}>
                                        {/* Render link */}
                                        {item.sublinks ? (
                                            <>
                                                <span>{item.link}</span>
                                                <ul className="dropdown">
                                                    <div>
                                                        {item.sublinks.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                {subItem.link}
                                                            </li>
                                                        ))}
                                                    </div>

                                                </ul>
                                            </>
                                        ) : (
                                            <Link to={item.path}> <li >{item.link}</li></Link>

                                        )}
                                    </li>
                                ))}
                            </ul>
                            {/* <div>
                                 <button>Contact Us</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HighbrouNavigation;