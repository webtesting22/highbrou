import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import "./AboutHomeContent.css"
import { MdOutlineArrowRight } from "react-icons/md";
import BackOverlayImage from "./BackOverlayImage.png"
import { Link } from "react-router-dom";
import Sectionimage from "./Sectionimage.jpg"
const HomePageAbout = () => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <section id="HomePageAboutContainer">
                {/* <img src={BackOverlayImage} alt="" /> */}
                <div className="HomePageAboutContentContainer sectionPadding">
                    <Row>
                        <Col lg={12} md={24}>
                            <div className="AboutContentContainer">
                                <div>
                                    <span>About us?</span>
                                    <h1>Your Dream Engineering Partner</h1>
                                    <p>At Highbrou Engineering Pvt. Ltd, we specialize in turning visionary concepts into enduring and impactful structures. With more than a decade of expertise in structural engineering, we excel in crafting precision-driven solutions tailored to diverse project needs.
                                    </p>
                                    <p>Our portfolio spans high-rise buildings, intricate industrial facilities, hospitality venues, and government infrastructure. Each project reflects our unwavering commitment to quality, innovation, and resilience.</p>
                                   <Link to="/about-us"> <button className="AnimatedBtnContainer">Learn More<MdOutlineArrowRight /></button></Link>
                                </div>
                            </div>
                        </Col>

                        <Col lg={12} md={24}>
                            <div className="AboutHomeImageContainer">
                                <img style={{ transform: `translateY(${offsetY * 0.1}px)` }} src={Sectionimage} alt="about-us-highbrou-image" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}
export default HomePageAbout