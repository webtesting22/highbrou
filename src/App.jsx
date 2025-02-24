import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove Router from here
import "./App.css";
import HomeRoutes from "./Components/HomeRoutes/HomeRoutes";
import HighbrouNavigation from "./Components/HighbrouNavigation/HighbrouNavigation";
import AboutUs from "./Components/AboutUs/AboutUs";
import Services from "./Components/Services/Services";
import AllProjects from "./Components/AllProjects/Allprojects";
import Footer from "./Components/Footer/Footer";
import Career from "./Components/Careers/Carrer";
import BackToTop from "./Components/BackToTop/BackToTop";
import Contact from "./Components/Contact/Contact";
import OurApproach from "./Components/OurApproach/OurApproach";
import ApplicationView from "./Components/ApplicationView/ApplicationView";

function App() {
  return (
    <>
      <HighbrouNavigation />
      <Routes>
        <Route path="/" element={<HomeRoutes />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our-approach" element={<OurApproach />} />
        <Route path="/highbrouapplicationView" element={<ApplicationView />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
