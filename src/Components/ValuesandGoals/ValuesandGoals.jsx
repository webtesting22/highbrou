import React from "react";
import "./ValuesGoals.css"
import GoalsBack from "./GoalsBack.jpg"
const ValuesandGoals = () => {
    return (
        <>
            <section >
                <div className="sectionPadding">

                    <div className="AnimatedStikcyContainer">
                        <div className="ValuesGoalsMainheading">
                            <h2 data-aos="fade-up"
                                data-aos-duration="1000">Core Values and Strategic Goals
                            </h2>
                            <p data-aos="fade-up"
                                data-aos-duration="1300">Our values are the foundation of our success.
                                Empowering progress with every decision we make.</p>
                        </div>
                        <div className="StickyCards">
                            <div data-aos="fade-up"
                                data-aos-duration="1000">
                                <div className="BlackOverlayColor">

                                </div>
                                <img src="https://images.pexels.com/photos/258160/pexels-photo-258160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                                <div className="ValuesContentContainer">
                                    <div>
                                        <h2>VALUES</h2>
                                        <p><b>Innovation:</b> We are committed to developing forward-thinking solutions for every project, embracing both creativity and practicality.</p>
                                        <p><b>Integrity:</b> We maintain honesty and transparency in every client interaction, upholding our commitments and building trust.
                                        </p>
                                        <p><b>Quality:</b> Excellence is non-negotiable; we prioritize accuracy and attention to detail in every design.</p>
                                        <p><b>Client-Centricity:</b> Our clients’ needs guide our approach, from initial concept to project completion.</p>
                                        <p><b>Sustainability:</b> We design structures that stand the test of time while considering environmental impact and resource efficiency.</p>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="BlackOverlayColor">

                                </div>
                                <img src={GoalsBack} alt="" />
                                <div className="GoalsContentContainer">

                                    <div>
                                        <h2>GOALS</h2>
                                        <p><b>Expand Market Presence:</b> Grow our footprint in Tier 1 and Tier 2 cities in India, and strategically enter Gulf markets.</p>
                                        <p><b>Drive Client Success:</b> Help clients achieve faster project timelines and higher
                                            structural quality with reduced risks and delays.</p>
                                        <p><b>Lead with Innovation:</b> Continuously enhance our engineering processes to offer the most advanced and efficient solutions.</p>
                                        <p><b>Build Lasting Relationships:</b> Develop long-term, trust-based partnerships with architects, developers, and EPC contractors through exceptional service and support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ValuesandGoals