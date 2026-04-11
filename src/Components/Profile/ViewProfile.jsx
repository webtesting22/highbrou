import React, { useEffect } from "react";
import "./ViewProfile.css";

const PORTFOLIO_SRC = "/pdf/HEPL_Portfolio.html";

/**
 * Full-window portfolio at /view-profile — same HTML as /pdf/HEPL_Portfolio.html
 * with a clean URL when opened in a new tab.
 */
const ViewProfile = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Portfolio | Highbrou Engineering";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="viewProfileRoot">
      <iframe
        className="viewProfileFrame"
        title="Highbrou Engineering company portfolio"
        src={PORTFOLIO_SRC}
      />
    </div>
  );
};

export default ViewProfile;
