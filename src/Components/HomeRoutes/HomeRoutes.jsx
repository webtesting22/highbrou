import React from "react";
import HomePage from "../HomePage/HomePage";
import HomePageAbout from "../HomePageAbout/HomePageAbout";
import AttachBacktext from "../AttachmentBack/AttachmentBackText";
import WhatWeDoHome from "../WhatWeDoHome/WhatWeDoHome";
import WhyUs from "../WhyUs/WhyUs";

const HomeRoutes = () => {
    return (
        <>
            <section className="HomeRoutes">
                <HomePage />
                <HomePageAbout />
                <AttachBacktext />
                <WhatWeDoHome />
                <WhyUs />
            </section>
        </>
    )
}
export default HomeRoutes