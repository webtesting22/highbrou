import React from "react";
import "./HighbrouMissionVisionContainer.css"
import { Row, Col } from "antd";
const HighbrouMissionVision = () => {
    return (
        <>
            <section id="HighbrouMissionVisionContainer">
                <div>
                    <div className="sectionPadding">
                        <Row>
                            <Col lg={24}>
                                <div className="MissionVisionPageTaglineHeading">
                                    <span data-aos="fade-up"
                                        data-aos-duration="1000"> &nbsp;Innovation, Sustainability, Precision, and Client-Centricity</span>
                                    <h2 data-aos="fade-up"
                                        data-aos-duration="1500">Empowering the Future of Infrastructure</h2>
                                </div>
                            </Col>
                            <Col lg={24}>
                                <div>
                                    <div>
                                        <div className="MissionContainer" data-aos="fade-up"
                                            data-aos-duration="1000">
                                            <div className="MissionIconContainer">
                                                <img src="/Images/fluent_target-arrow-20-filled (1).svg" alt="" />
                                            </div>
                                            <div className="MissionContentContainer">
                                                <h2>MISSION</h2>
                                                <p>Our mission is to deliver world-class structural solutions that address our clients' unique challenges, combining precision engineering with an innovative problem-solving approach. We aim to create sustainable, resilient, and efficient structures that balance design, functionality, and durability.</p>
                                            </div>
                                        </div>
                                        <div className="VisionContainer" data-aos="fade-up"
                                            data-aos-duration="1500">
                                            <div className="VisionIconContainer">
                                                <img src="/Images/humbleicons_bulb (1).svg" alt="" />
                                            </div>
                                            <div className="VisionContentContainer">
                                                <h2>VISION</h2>
                                                <p>To be the preferred structural engineering partner globally, known for pioneering efficient, sustainable, and aesthetic designs that inspire and elevate the built environment.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HighbrouMissionVision