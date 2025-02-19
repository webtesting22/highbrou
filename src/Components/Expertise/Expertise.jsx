import React from "react";
import { Row, Col } from "antd";
import "./Expertise.css"
import RAPIDDELIVERY from "./RAPIDDELIVERY.jpeg"
import CUTTINGEDGEDESIGN from "./CUTTINGEDGEDESIGN.jpg"
import PRECISIONENGINEERING from "./PRECISIONENGINEERING.jpg"
import SUSTAINABLESOLUTIONS from "./SUSTAINABLESOLUTIONS.jpeg"
import Pioneering from "./Pioneering3.jpg"
const Expertise = () => {

    const ExpertiseData = [
        {
            title: "CUTTING-EDGE DESIGN",
            image: CUTTINGEDGEDESIGN,
            tagline: "Our state-of-the-art technology creates structures that others only dream of."
        },
        {
            title: "PRECISION ENGINEERING",
            image: Pioneering,
            tagline: "We deliver accuracy down to the millimeter, ensuring perfect execution every time."
        },
        {
            title: "SUSTAINABLE SOLUTIONS",
            image: SUSTAINABLESOLUTIONS,
            tagline: "Our eco-friendly designs are setting new standards in green engineering."
        },
        {
            title: "RAPID DELIVERY",
            image: RAPIDDELIVERY,
            tagline: "We work at the speed of innovate/ion, without compromising on quality."
        }
    ]
    return (
        <>
            <section id="ExpertiseContainer">
                <div className="sectionPadding">
                    <div className="HeaderContainerWhatWeDo">
                        <span>UNPARALLELED EXPERTISE</span>
                        <h2>PIONEERING EXCELLENCE</h2>
                    </div>
                    <Row>
                        {ExpertiseData.map((item, index) => (
                            <Col lg={6} md={12} key={index}>
                                <div className="BorderHoverCard">
                                    <div className="HoverableCardImage">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="HoverableCardContent">
                                        <h2>{item.title}</h2>
                                        <span>{item.tagline}</span>
                                    </div>
                                    <hr />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </>
    )
}
export default Expertise