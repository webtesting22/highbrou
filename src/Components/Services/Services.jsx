import React, { useState, useEffect } from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import { Row, Col } from "antd";
import WhatWeDoCardsData from "../WhatWeDoHome/WhatWeDoData";
import "./Services.css";
import SectorsWeServe from "../SectorsWeServe/SectorsWeServe";
import Expertise from "../Expertise/Expertise";
import ServicesTopComImage from "./ServicesTopComImage.jpg"
const Services = () => {
    const [activeImage, setActiveImage] = useState(WhatWeDoCardsData[0].img); // Default to the first image

    const handleHover = (img) => {
        setActiveImage(img); // Update background image on hover
    };
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section id="ServicesContainer">
                <CommonTopBannerDynamic
                    heading="Services"
                    subheading="Empowering The Future Of Infrastructure"
                    image={ServicesTopComImage}
                />
                <div className="sectionPadding" style={{ paddingBottom: "0px" }}>
                    <div>
                        <div className="WhatWeDoServicesContentContainer">
                            <div className="HeaderContainerWhatWeDo">
                                <span>WHAT WE DO?</span>
                                <h2>Transforming Ideas Into Structural Excellence</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="HoverAnimatedImageContainer"
                    style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "background-image 0.5s ease-in-out", // Smooth transition
                    }}
                >
                    <Row>
                        {WhatWeDoCardsData.map((item, index) => (
                            <Col lg={8} key={index}>
                                <div
                                    className="HoverAnimationContentContainer"
                                    onMouseEnter={() => handleHover(item.img)} // Update image on hover
                                >
                                    {/* <div>
                                        <img src={item.img} alt="" />
                                    </div> */}
                                    <div>
                                        <div className="HoverableCardContent">
                                            <h2>{item.title}</h2>
                                            <div>
                                                <span>{item.tagline}</span>

                                                <div>
                                                    {item.descriptionDetails}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
            <SectorsWeServe />
            <Expertise />
        </>
    );
};

export default Services;
