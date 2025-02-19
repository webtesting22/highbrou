import React, { useState } from "react";
import "./OurTeamFounders.css";
import { Row, Col, Modal } from "antd";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import ShaikhIsmail from "./ShaikhIsmail.JPG"
import ShaikhKashif1 from "./ShaikhKashif1.jpg"
const OurTeamFounders = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const FoundersData = [
        {
            memberName: "SAYYAD WAJED ALI",
            position: "Director",
            tagline: "Structural engineer with over 10+ years of experience specializing in high-rise buildings and infrastructure projects.",
            image: "/Images/team1.webp",
            qualificationDetails: (
                <div>
                    <ul>
                        <li>Graduate in Civil Engineering from Dr. BAMU university</li>
                        <li>Structural Engineer with 10+ years of experience in high-rise buildings, infrastructure, and industrial projects.</li>
                        <li>Skilled at delivering innovative solutions for complex projects, including high-rises and large-scale developments.</li>
                    </ul>
                </div>
            ),
        },
        {
            memberName: "SARFARAZ SHAIKH",
            position: "Associate Director",
            tagline: "Experienced engineering consultant with 20+ years in the industry, successfully delivering 200+ projects across sectors.",
            image: "/Images/team2.webp",
            qualificationDetails: (
                <div>
                    <ul>
                        <li>A Mechanical Engineering graduate from Mumbai</li>
                        <li>Proficient consultant with over 20 years of experience in the MEP industry.</li>
                        <li>Has successfully completed 200+ projects across various sectors.</li>
                        <li>Leads branding, expansion, and growth strategies at Highbrow Engineering.</li>
                    </ul>
                </div>
            ),
        },
    ];

    const showModal = (person) => {
        setSelectedPerson(person);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPerson(null);
    };

    const InverstorsDetails = [
        {
            image: "/Images/team1.webp",
            name: "SAYYAD WAJED ALI",
            details: <>
                <p>Sayyad Wajed Ali, a Civil Engineering graduate from Dr. BAMU University, brings over 10 years of expertise in high-rise structures and infrastructure. As a Board of Director, he plays a key role in driving innovation and engineering excellence in the company.</p>
            </>
        },
        {
            image: ShaikhIsmail,
            name: "Shaikh Ismail",
            details: <>
                <p>An accounting graduate with extensive experience in real estate transactions, Ismail specializes in financial planning, resource management, and project funding. His expertise in cost structuring and financial optimization ensures seamless execution of large-scale structural engineering projects.</p>
            </>
        },
        {
            image: ShaikhKashif1,
            name: "Shaikh Mohammed Kashif",
            details: <>
                <p>A business graduate with a deep understanding of operational strategy and corporate growth, Kashif excels in business development, market expansion, and strategic partnerships. His expertise in optimizing workflows, streamlining processes, and driving efficiency contributes to the company's continued success in the engineering and manufacturing sectors.</p>
            </>
        },

    ]

    return (
        <>
            <section>
                <div>
                    <div className="sectionPadding">
                        <div className="OurTeamFoundersContentHeader">
                            <span> &nbsp;Guided by Expertise, Driven by Passion.</span>
                            <h2>Our Leaders</h2>
                        </div>
                        <div className="FoundersAnimatedCards">
                            {/* <Row>
                                {FoundersData.map((item, index) => (
                                    <Col lg={10} md={24} key={index} style={{ width: "100%" }}>
                                        <div
                                            className="FounderAnimatedCard"
                                            onClick={() => showModal(item)} // Open modal on click
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="FounderOverlayOnHover"></div>
                                            <img src={item.image} alt={item.memberName} />
                                            <div className="FoundersInfoContentContainer">
                                                <div>
                                                    <span>{item.position}</span>
                                                    <h2>{item.memberName}</h2>
                                                </div>
                                                <div>
                                                    <FaFacebookSquare />
                                                    <FaLinkedin />
                                                    <AiFillInstagram />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row> */}
                            <Row>
                                {FoundersData.map((item, index) => (
                                    <Col lg={12} md={24} key={index} style={{ width: "100%" }} data-aos="fade-up"
                                        data-aos-delay={`${index * 200}`}>
                                        <div

                                            onClick={() => showModal(item)} // Open modal on click
                                            style={{ cursor: "pointer" }}
                                            id="FounderCardMainContainer"
                                        >

                                            <div className="FounderImageContainer">
                                                <img src={item.image} alt={item.memberName} />
                                            </div>
                                            <div className="FounderInfo">
                                                <div>
                                                    <span style={{ textTransform: "uppercase" }}>{item.position}</span>
                                                    <h2>{item.memberName}</h2>
                                                    <p>{item.tagline}</p>
                                                </div>
                                                <div>
                                                    <FaFacebookSquare />
                                                    <FaLinkedin />
                                                    <FaInstagramSquare />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <br /><br /><br />
                        <div className="OurInverstorsContentContainer">
                            <div>
                                <Row>
                                    <Col lg={10}>
                                        <div className="InverstorsTeamContainerContent">
                                            <div>
                                                <h2>Board of Directors</h2>
                                                <p>We seek visionary and dynamic individuals who are driven to create a lasting impact and contribute to our growth and innovation.</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={14}>
                                        <div id="InvestorsCardSwiperContainer">
                                            <Swiper
                                                slidesPerView={2}
                                                spaceBetween={30}
                                                loop={true}
                                                autoplay={{
                                                    delay: 2500,
                                                    disableOnInteraction: false,
                                                }}
                                                modules={[Autoplay, Pagination]}
                                                className="mySwiper"
                                                style={{ height: "100%" }}
                                                breakpoints={{
                                                    0: { slidesPerView: 1, spaceBetween: 10 }, // For mobile devices
                                                    768: { slidesPerView: 2, spaceBetween: 30 }, // For tablets and larger screens
                                                }}
                                            >
                                                {InverstorsDetails.map((item, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className="InvestorsCardFormat" onClick={() => showModal(item)} style={{ cursor: "pointer" }}>
                                                            <div>
                                                                <div className="InvestorImage">
                                                                    <img src={item.image} alt="" />
                                                                </div>
                                                                <div className="InvestorsNameAndContent">
                                                                    <h2>{item.name}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}

                                            </Swiper>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    {/* <div className="sectionPadding"> */}

                    {/* </div> */}
                </div>


                {/* Ant Design Modal */}
                <Modal
                    title={selectedPerson?.name || selectedPerson?.memberName}
                    open={isModalOpen}
                    onCancel={handleCloseModal}
                    footer={null}
                    width={500}
                >
                    {selectedPerson && (
                        <>
                            <div className="ModalImageContainer">
                                <img
                                    src={selectedPerson.image}
                                    alt={selectedPerson.name || selectedPerson.memberName}
                                    className="ModalFounderImage"
                                />
                            </div>
                            <div className="ModalDetails">
                                {selectedPerson.details || selectedPerson.qualificationDetails}
                            </div>
                        </>
                    )}
                </Modal>
            </section >
        </>
    );
};

export default OurTeamFounders;
