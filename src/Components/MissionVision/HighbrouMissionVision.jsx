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
                                    <span> &nbsp;Innovation, Sustainability, Precision, and Client-Centricity</span>
                                    <h2>Empowering the Future of Infrastructure</h2>
                                </div>
                            </Col>
                            <Col lg={24}>
                                <div>
                                    <div>
                                        <div className="MissionContainer">
                                            <div className="MissionIconContainer">

                                            </div>
                                            <div className="MissionContentContainer">
                                                <h2>MISSION</h2>
                                                <p>Our mission is to deliver world-class structural solutions that address our clients' unique challenges, combining precision engineering with an innovative problem-solving approach. We aim to create sustainable, resilient, and efficient structures that balance design, functionality, and durability</p>
                                            </div>
                                        </div>
                                        <div className="VisionContainer">
                                            <div className="VisionIconContainer">

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