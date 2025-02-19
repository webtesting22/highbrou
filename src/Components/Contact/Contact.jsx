import React, { useEffect } from "react";
import "./Contact.css"
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import { Row, Col } from "antd";
import Contactback from "./Contactback.jpg"
const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <section>
                <CommonTopBannerDynamic
                    heading="Contact"
                    subheading="Reach Out"
                    image={Contactback}
                />
                <div>
                    <div className="sectionPadding">
                        <div className="ContactMapContainers">
                            <Row>
                                <Col lg={12} md={24}>
                                    <div>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.432927403572!2d72.83481317554114!3d19.1325176820837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b73c5242d02d%3A0x830f8cb8100ea9d9!2sAmbrosia%20Designs%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1737977644081!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </Col>
                                <Col lg={12} md={24}>
                                    <div>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.6250942472197!2d75.34347627555914!3d19.898046581483268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba2a8dbbc0ebf%3A0x640b651e020e4dbf!2sHighbrou%20Engineering%20Private%20Limited!5e0!3m2!1sen!2sin!4v1737977672788!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Contact