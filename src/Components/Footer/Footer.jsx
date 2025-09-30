import React from "react";
import "./Footer.css"
import { Row, Col, Image } from "antd";
import highbrou_logo from "./FooterWhiteLogo.png"
import FooterBackOverlayImage from "./FooterBackOverlayImage.png"
import NavigationLinks from "../HighbrouNavigation/NavigationLinks";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <section id="FooterContainer">

                <div>
                    <div className="sectionPadding">
                        <div className="FooterbackImageOverlay">
                            <img src={FooterBackOverlayImage} alt="" loading="lazy" />

                        </div>
                        <Row>
                            <Col lg={10}>
                                <div className="FooterLogoContainer">
                                    <div className="LogoPlacingContainer">
                                        <Link to="/"> <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/highbrou (1).png" alt="" /></Link>
<br /><br />

                                        <div className="AddressAndSocialLinksContainer">
                                            <Row>
                                                <Col>
                                                    <div>
                                                        <div className="OfficeAddressContainer">
                                                            {/* <IoLocationSharp/> */}
                                                            <p>Head Office : Keytech Park, A-1202, Swami Vivekananda Rd, Mahatma Jyotiba Phule Nagar, Jogeshwari West, Mumbai, Maharashtra 400102.</p>
                                                        </div>
                                                        <div className="OfficeAddressContainer">
                                                            {/* <IoLocationSharp/> */}
                                                            <p>Registered Office: 8-8-252, New Rashidpura N10, CIDCO, Aurangabad 431003.</p>
                                                        </div>
                                                        {/* div */}
                                                        <Link to="mailto:info@highbrou.com"><p style={{ marginBottom: "0px" }}>info@highbrou.com</p></Link>
                                                        <p style={{ marginTop: "0px" }}>Call: <Link to="tel:+91-9579307313" style={{ color: "white" }}>+91-9579307313.</Link></p>

                                                    </div>
                                                </Col>
                                                <Col>

                                                </Col>
                                            </Row>
                                        </div>

                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="NavigationLinksContainer">
                                    <Row>
                                        {NavigationLinks.map((item, index) => (
                                            <Col lg={24} style={{ width: "100%" }}>
                                                <p key={index}><Link to={item.path}>{item.link}</Link></p>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <p style={{ color: "white", marginTop: "0px" }}><b>ISO 9001:2015 Certificate of Registration</b></p>
                                <div className="ISOContainer">
                                    <Image src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/ISO Certificate Highbrou _page-0001.jpg" alt="" />
                                </div>
                                <br /><br />
                            </Col>
                        </Row>
                        <div className="CopywriteText">
                            <p>@2025 <Link to="https://www.outleadsolutions.com/" target="_blank"><b>OutLead Solutions</b></Link>. All rights reserved.</p>
                            <div style={{ display: "flex", gap: "10px" }}>
                                {/* <FaLinkedin style={{color:"white"}}/> */}
                                <Link to="https://www.linkedin.com/company/highbrou/" target="_blank"><FaLinkedin style={{ color: "white" }} /></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
export default Footer