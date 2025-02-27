import React,{useEffect} from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import TimeLineAnimatedComponent from "../TimeLineAnimated/TimeLineAnimatedComponent";
import HighbrouMissionVision from "../MissionVision/HighbrouMissionVision";
import ValuesandGoals from "../ValuesandGoals/ValuesandGoals";
import OurTeamFounders from "../OurTeamFounders/OurTeamFounders";
import HighBrouWorkVideo from "../HighBrouWorkVideo/HightBrouWorkVideo";
const AboutUs = () => {
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section id="AboutUsContainer">
                <CommonTopBannerDynamic
                    heading="About"
                    subheading="High Standards, Innovative Solutions"
                    image="/Images/AboutUsback.webp"
                />
                <TimeLineAnimatedComponent/>
                <HighbrouMissionVision/>
                <ValuesandGoals/>
                <HighBrouWorkVideo/>
                <OurTeamFounders/>
               
            </section>
        </>
    )
}
export default AboutUs