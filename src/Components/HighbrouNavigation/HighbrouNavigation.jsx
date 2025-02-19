import React, { useState, useEffect } from "react";
import "./HighbrouNavigation.css";
import { Link } from "react-router-dom";
import { Drawer, Collapse } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import NavigationLinks from "./NavigationLinks";
import HighbrouLogo from "./highbrou_logo.webp";

const { Panel } = Collapse;

const HighbrouNavigation = () => {
    const [scrolling, setScrolling] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    // Handle drawer toggle
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Handle closing the drawer after selecting a link
    const handleLinkClick = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            {/* Main Navigation Bar */}
            <section className={`NavigationBarContainer ${scrolling ? "scrolled" : ""}`}>
                <div className="AnimatedNavigation">
                    <div className="mainDevideContainer">
                        <div className="LogoContainer">
                            <Link to="/">
                                <img src={HighbrouLogo} alt="Highbrou Logo" />
                            </Link>
                        </div>
                        <div className="NavigationLinksContainer desktopOnly">
                            <ul>
                                {NavigationLinks.map((item, index) => (
                                    <li key={index}>
                                        {item.sublinks ? (
                                            <>
                                                <span>{item.link}</span>
                                                <div className="dropdown">
                                                    <ul>
                                                        {item.sublinks.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <Link to={subItem.path} onClick={handleLinkClick}>
                                                                    {subItem.link}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                        ) : (
                                            <Link to={item.path} onClick={handleLinkClick}>
                                                {item.link}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mobileOnly">
                            <MenuOutlined onClick={toggleDrawer} style={{ color: "black" }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Drawer for Mobile View */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={toggleDrawer}
                open={isDrawerOpen}
                className="MobileDrawer"
            >
                <Collapse accordion>
                    {NavigationLinks.map((item, index) =>
                        item.sublinks ? (
                            <Panel header={item.link} key={index} className="NavPanel">
                                <ul>
                                    {item.sublinks.map((subItem, subIndex) => (
                                        <li key={subIndex} style={{ padding: "5px 0px" }}>
                                            <Link to={subItem.path} onClick={handleLinkClick} style={{ color: "black", }}>
                                                {subItem.link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Panel>
                        ) : (
                            <div key={index} className="NavPanel no-collapse" style={{ padding: "10px 40px" }}>
                                <Link to={item.path} onClick={handleLinkClick} style={{ color: "black" }}>
                                    {item.link}
                                </Link>
                            </div>
                        )
                    )}
                </Collapse>
            </Drawer>
        </>
    );
};

export default HighbrouNavigation;
