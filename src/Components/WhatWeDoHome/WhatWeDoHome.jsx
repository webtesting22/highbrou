import React from "react";
import "./WhatWeDoHome.css"
import { Row, Col } from "antd";
import WhatWeDoCardsData from "./WhatWeDoData";
import { Link } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
const WhatWeDoHome = () => {

    return (
        <>
            <section className="sectionPadding" id="WhatWeDoHome">
                <div className="WhatWeDoCardsContainer">
                    <div className="HeaderContainerWhatWeDo">
                        <span data-aos="fade-up"
                            data-aos-duration="1000">WHAT WE DO?</span>
                        <h2 data-aos="fade-up"
                            data-aos-duration="1500">Transforming Ideas Into Structural Excellence</h2>
                    </div>
                    <div className="WhatWeDoHoverableCards">
                        <div>
                            <Row>
                                {WhatWeDoCardsData.map((item, index) => (
                                    <Col key={index} lg={8} md={12} data-aos="fade-up"
                                        data-aos-delay={`${index * 200}`} data-aos-duration="1000">
                                        <Link to="/services">
                                            <div className="BorderHoverCard">
                                                <div className="HoverableCardImage">
                                                    <img src={item.img} alt={item.title} />
                                                </div>
                                                <div className="HoverableCardContent">
                                                    <span>{item.tagline}</span>
                                                    <h2>{item.title}</h2>

                                                </div>
                                                <hr />
                                            </div>
                                        </Link>
                                    </Col>
                                ))}

                            </Row>
                            <br /><br />
                            <Link to="/allprojects"> <button className="AnimatedBtnContainer">All Projects<MdOutlineArrowRight /></button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default WhatWeDoHome