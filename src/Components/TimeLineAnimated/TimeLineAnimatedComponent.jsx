import React from "react";
import { Row, Col } from "antd";
import "./TimeLineAnimatedComponent.css"
import { IoIosArrowRoundDown } from "react-icons/io";
// import HighbroTimeLinePc from "./HighbroTimeLinePc.png"
import higbroTimeLine from "./UpdatedTimeline.png"
import image1 from "./1.svg"
import image2 from "./2.svg"
import image3 from "./3.svg"
import image4 from "./4.svg"
import image5 from "./5.svg"
import image6 from "./6.svg"
import image7 from "./7.svg"
import MobileTimeline from "./MobileTimeline.png"
const TimeLineAnimatedComponent = () => {

    return (
        <>
            <section id="TimeLineAnimatedContainer">

                <div className="sectionPadding">
                    <h2 className="TimelineSectionHeading" data-aos="fade-up"
                        data-aos-duration="1000">Our Journey Through Time</h2>
                    {/* <div className="AbsoluteContainer">
                        <img src={HighbroTimeLinePc} alt="" className="TimelineImageonPc" />
                        <div>
                            <div className="TimelineContentContainer">
                                <div>
                                    <span>2016</span>
                                    <h4>Humble Beginnings</h4>
                                </div>
                                <div>
                                    <span>2018</span>
                                    <h4>Humble Beginnings</h4>
                                </div>
                                <div>
                                    <span>2019</span>
                                    <h4>Humble Beginnings</h4>
                                </div>
                                <div>
                                    <span>2020</span>
                                    <h4>Humble Beginnings</h4>
                                </div>
                                <div>
                                    <span>2022</span>
                                    <h4>Humble Beginnings</h4>
                                </div>
                                <div>
                                    <span>2024</span>
                                    <h4>Humble Beginnings</h4>
                                </div>
                                <div>
                                    <span>2025</span>
                                    <h4>Humble Beginnings</h4>
                                </div>

                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <img src={MobileTimeline} alt="" style={{width:"100%"}}/> */}
               <div className="OnlyPCCode">
               <div className="TimelineImages" >
                    <img src={image1} alt="" data-aos="fade-up" data-aos-duration="1000" />
                    <img src={image2} alt="" data-aos="fade-up" data-aos-duration="1000" />
                    <img src={image3} alt="" data-aos="fade-up" data-aos-duration="1000" />
                    <img src={image4} alt="" data-aos="fade-up" data-aos-duration="1000" />
                    <img src={image5} alt="" data-aos="fade-up" data-aos-duration="1000" />
                    <img src={image6} alt="" data-aos="fade-up" data-aos-duration="1000" />
                    <img src={image7} alt="" data-aos="fade-up" data-aos-duration="1000" />
                </div>
               </div>
                <img src={MobileTimeline} alt="" style={{width:"100%"}} className="OnlyMobile"/>
                {/* <Row>
                        {TimeLineContentData.map((item, index) => (
                            <Col lg={24} key={index} style={{ width: "100%" }}>
                                <div className="AnimatedHoverAnimationTimeline">
                                    <div className="ContentContainerTimeline">
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                    <IoIosArrowRoundDown />
                                    <hr />
                                </div>
                            </Col>
                        ))}
                    </Row> */}
            </section>
        </>
    )
}
export default TimeLineAnimatedComponent