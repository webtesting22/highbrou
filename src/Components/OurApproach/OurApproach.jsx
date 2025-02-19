import React, { useEffect } from "react";
import OurApprochtimelineImage from "./OurApprochTimeline.png"
import "./OurApproch.css"
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import ApproachImage1 from "./1.png"
import ApproachImage2 from "./2.png"
import ApproachImage3 from "./3.png"
import ApproachImage4 from "./4.png"
import ApproachImage5 from "./5.png"
import ApproachImage6 from "./6.png"
import ApproachImage7 from "./7.png"
import OurApprochBackAttach from "./Our ApprochBackAttach.jpg"
import OurApprochTopBack from "./OurApprochTopBack.jpg"
import OurApprochMobile from "./OurApprochMobile.png"
const OurApproach = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <section id="OurApprochContainer">
                <CommonTopBannerDynamic
                    heading="Our Approach"
                    subheading="Excellence & Innovation"
                    image={OurApprochTopBack}
                />
                <div className="OurApprochContentContainer">
                    {/* <img src={OurApprochBackAttach} alt="" /> */}
                    <div className="sectionPadding">
                        <h2>Our Approach</h2>
                    </div>
                    <div className="OnlyPCCode">
                        <div className="ourApprochImageContainer">
                            <img src={ApproachImage1} alt="" data-aos="fade-up" data-aos-duration="1000" />
                            <img src={ApproachImage2} alt="" data-aos="fade-up" data-aos-duration="1000" />
                            <img src={ApproachImage3} alt="" data-aos="fade-up" data-aos-duration="1000" />
                            <img src={ApproachImage4} alt="" data-aos="fade-up" data-aos-duration="1000" />
                            <img src={ApproachImage5} alt="" data-aos="fade-up" data-aos-duration="1000" />
                            <img src={ApproachImage6} alt="" data-aos="fade-up" data-aos-duration="1000" />
                            <img src={ApproachImage7} alt="" data-aos="fade-up" data-aos-duration="1000" />

                        </div>
                    </div>
                    <img src={OurApprochMobile} alt="" className="OnlyMobile" style={{ width: "100%" }} />
                </div>
            </section>
        </>
    )
}
export default OurApproach