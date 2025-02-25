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
import ShaikhIsmail from "./Image (1).png"
import ShaikhKashif1 from "./k4.jpg"
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
        // {
        //     image: "/Images/team1.webp",
        //     name: "SAYYAD WAJED ALI",
        //     details: <>
        //         <p>Sayyad Wajed Ali, a Civil Engineering graduate from Dr. BAMU University, brings over 10 years of expertise in high-rise structures and infrastructure. As a Board of Director, he plays a key role in driving innovation and engineering excellence in the company.</p>
        //     </>
        // },
        {
            image: ShaikhIsmail,
            name: "Shaikh Ismail",
            tagline: "A finance expert with extensive experience in project development, driving strategic growth at Highbrou Engineering.",
            details: <>
                <p>With a strong background in finance and extensive experience in real estate investments and project development, Mr. Shaikh Ismail plays a pivotal role in strategic decision-making and business expansion at Highbrou Engineering. His expertise in financial planning and asset management contributes to the firm’s sustainable growth and ability to undertake large-scale projects.</p>
            </>
        },
        {
            image: ShaikhKashif1,
            name: "Shaikh Mohammed Kashif",
            tagline: "A business graduate specializing in real estate markets, enhancing project feasibility and development strategies at Highbrou Engineering.",
            details: <>
                <p>A business graduate with a deep understanding of real estate markets and development strategies, Mr. Mohammed Kashif brings valuable industry insights that help shape Highbrou Engineering’s vision. His experience in land acquisitions, project feasibility, and market dynamics strengthens the firm’s ability to align engineering solutions with real-world development challenges.</p>
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
                                                    {/* <FaFacebookSquare />
                                                    <FaLinkedin />
                                                    <FaInstagramSquare /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <br />
                        <div className="OurInverstorsContentContainer">
                            <div className="FoundersAnimatedCards">
                                <Row>
                                    {/* <Col lg={10}>
                                        <div className="InverstorsTeamContainerContent">
                                            <div>
                                                <h2>Board of Directors</h2>
                                                <p>At Highbrou Engineering, our leadership team brings together expertise in structural engineering, project development, and strategic growth, ensuring innovative and technically sound solutions for our clients.</p>
                                            </div>
                                        </div>
                                    </Col> */}
                                    {/* <Col lg={12}> */}
                                    {InverstorsDetails.map((item, index) => (
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
                                                        <h2>{item.name}</h2>
                                                        <p>{item.tagline}</p>
                                                    </div>
                                                    <div>
                                                        {/* <FaFacebookSquare />
                                                        <FaLinkedin />
                                                        <FaInstagramSquare /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                    {/* <div id="InvestorsCardSwiperContainer">
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
                                        </div> */}
                                    {/* </Col> */}
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
