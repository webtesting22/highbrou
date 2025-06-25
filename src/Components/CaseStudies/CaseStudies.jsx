import React from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";

const CaseStudies = () => {
    return (
        <>
            <div>
                <CommonTopBannerDynamic
                    heading="Case Studies"
                    subheading="Our Case Studies"
                    image="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/CaseStudiesBack.jpg"
                />
                <div>
                    <div className="sectionPadding">
                        <h2 className="TimelineSectionHeading aos-init aos-animate" data-aos="fade-up">
                            Our Case Studies
                        </h2>
                        <div className="TimelineContainer">
                            <div className="TimelineItem">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CaseStudies;