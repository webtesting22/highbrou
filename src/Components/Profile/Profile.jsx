import React, { useEffect } from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import { MdOutlinePictureAsPdf, MdOutlineOpenInNew, MdOutlineDownload } from "react-icons/md";
import "./Profile.css";

const Profile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const pdfUrl = "/pdf/highbrou.pdf";

    return (
        <section id="ProfileContainer">
            <CommonTopBannerDynamic
                heading="Profile"
                subheading="Brochure, credentials & capabilities"
                image="/Images/ContactTopBanner.jpeg"
            />
            <div className="profilePage">
                <div className="sectionPadding">
                    <div className="profileIntro">
                        <p className="profileEyebrow">Company document</p>
                        <h2 className="profileIntroTitle">Highbrou company profile</h2>
                        <p className="profileIntroText">
                            Browse our profile below or open the PDF in a new tab. You can also download
                            a copy to share with your team.
                        </p>
                        <div className="profileActions">
                            <a
                                className="profileBtn profileBtnPrimary"
                                href={pdfUrl}
                                download="Highbrou-company-profile.pdf"
                            >
                                <MdOutlineDownload aria-hidden />
                                Download PDF
                            </a>
                            <a
                                className="profileBtn profileBtnGhost"
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MdOutlineOpenInNew aria-hidden />
                                Open in new tab
                            </a>
                        </div>
                    </div>

                    <div className="profileViewerCard">
                        <div className="profileViewerToolbar">
                            <span className="profileViewerLabel">
                                <MdOutlinePictureAsPdf aria-hidden />
                                Live preview
                            </span>
                            <p className="profileViewerHint">Scroll inside the frame to read the full document.</p>
                        </div>
                        <div className="profileIframeWrap">
                            <iframe title="Highbrou company profile (PDF)" src={pdfUrl} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
