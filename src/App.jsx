import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomeRoutes from "./Components/HomeRoutes/HomeRoutes";
import HighbrouNavigation from "./Components/HighbrouNavigation/HighbrouNavigation";
import AboutUs from "./Components/AboutUs/AboutUs";
import Services from "./Components/Services/Services";
import AllProjects from "./Components/AllProjects/Allprojects";
import SingleProject from "./Components/AllProjects/SingleProject";
import Footer from "./Components/Footer/Footer";
import Career from "./Components/Careers/Carrer";
import BackToTop from "./Components/BackToTop/BackToTop";
import Contact from "./Components/Contact/Contact";
import OurApproach from "./Components/OurApproach/OurApproach";
import ApplicationView from "./Components/ApplicationView/ApplicationView";
import CaseStudies from "./Components/CaseStudies/CaseStudies";
import Profile from "./Components/Profile/Profile";
import ViewProfile from "./Components/Profile/ViewProfile";

function App() {
  const { pathname } = useLocation();
  const portfolioFullscreen = pathname === "/view-profile";

  return (
    <>
      {!portfolioFullscreen && <HighbrouNavigation />}
      <Routes>
        <Route path="/" element={<HomeRoutes />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/allprojects/:slug" element={<SingleProject />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our-approach" element={<OurApproach />} />
        <Route path="/highbrouapplicationView" element={<ApplicationView />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-profile" element={<ViewProfile />} />
      </Routes>
      {!portfolioFullscreen && <Footer />}
      {!portfolioFullscreen && <BackToTop />}
    </>
  );
}

export default App;
