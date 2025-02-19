import React from "react";
import "./CommonTopBanner.css";

const CommonTopBannerDynamic = ({ heading, subheading, image }) => {
    return (
        <>
            <section id="CommonTopBannerContainer">
                <div className="AdjustBannerContainer">
                    <div className="OverlayOpacityContainer"></div>
                    <img src={image} alt="Banner Background" />
                    <div className="taglineContentContainer">
                        <div className="sectionPadding TopBannerSpanAdjust">
                            <span data-aos="fade-up"
     data-aos-duration="1000">{heading}</span>
                            <h2 data-aos="fade-up"
     data-aos-duration="1500">{subheading}</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CommonTopBannerDynamic;
