import React, { useEffect } from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import {
  MdOutlineOpenInNew,
  MdOutlineDownload,
  MdOutlineDescription,
} from "react-icons/md";
import "./Profile.css";

const PORTFOLIO_HTML = "/pdf/HEPL_Portfolio.html";
const PORTFOLIO_PDF = "/pdf/highbrou.pdf";
/** Clean URL when opening the portfolio in a new tab */
const VIEW_PROFILE_PATH = "/profile";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="ProfileContainer">
      <CommonTopBannerDynamic
        heading="Profile"
        subheading="Company portfolio & credentials"
        image="/Images/ContactTopBanner.jpeg"
      />
      <div className="profilePage">
        <div className="sectionPadding">
          <div className="profileIntro">
            <p className="profileEyebrow">Portfolio</p>
            <h2 className="profileIntroTitle">Company portfolio</h2>
            <p className="profileIntroText">
              Preview uses the HTML portfolio for a fast load. The PDF is
              generated from that same file. Download the PDF, or open the
              portfolio in a new tab at a short URL.
            </p>
            <div className="profileActions">
              <a
                className="profileBtn profileBtnPrimary"
                href={PORTFOLIO_PDF}
                download="Highbrou-portfolio.pdf"
              >
                <MdOutlineDownload aria-hidden />
                Download Portfolio
              </a>
              <a
                className="profileBtn profileBtnGhost"
                href={VIEW_PROFILE_PATH}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdOutlineOpenInNew aria-hidden />
                View portfolio in new tab
              </a>
            </div>
          </div>

          <div className="profileViewerCard profileViewerCard--portfolio">
            <div className="profileViewerToolbar">
              <span className="profileViewerLabel">
                <MdOutlineDescription aria-hidden />
                Portfolio preview
              </span>
              <p className="profileViewerHint">
                HTML portfolio preview (fast load).
              </p>
            </div>
            <div className="profileIframeWrap profileIframeWrap--tall">
              <iframe
                title="Highbrou Engineering company portfolio"
                src={PORTFOLIO_HTML}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
