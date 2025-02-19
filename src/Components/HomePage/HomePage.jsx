import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Row, Col } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import CarousalImage1 from "./CarousalImage1.jpeg"
import CarousalImage2 from "./CarousalImage2.jpeg"
import Homeback from "./Homeback.jpg"
import CarousalImage3 from "./CarousalImage3.jpg"
import CarousalImage4 from "./CarousalImage4.jpg"
import Icon1 from "./Icon1.svg"
import Icon2 from "./Icon2.svg"
import Icon3 from "./Icon3.svg"
import Icon4 from "./Icon4.svg"
const imageUrls = [
    Homeback,
    CarousalImage4,
    CarousalImage3,
    // CarousalImage1,
    CarousalImage2,
];

const HomePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]); // State to hold preloaded images
    const [loading, setLoading] = useState(true); // Loading state

    // Function to preload images
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages = await Promise.all(
                imageUrls.map((src) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => resolve(src);
                    });
                })
            );

            setImages(loadedImages); // Update state with preloaded images
            setLoading(false); // Mark loading as complete
        };

        preloadImages();
    }, []);

    // Change image every 4 seconds
    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [loading, images.length]);
    return (
        <>
            <section className="AnimatedHomePageContainer">
                <div className="AnimatedImageContainer">
                    <div className="BackOverlayContainer"></div>
                    <div className="ImagesContainer">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className={`carousel-image ${index === currentIndex ? "visible" : "hidden"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="HeightContainer">
                        <div className="headingContainer">
                            <h1>Structural visions soar, <span>Innovation at our core,</span>  From skyline to span,<span> We engineer the plan</span></h1>
                        </div>
                        <div className="HoverTextPoints">
                            <Row style={{ width: "100%" }}>
                                <Col lg={6} md={12} style={{ width: "100%" }}>
                                    <div className="HoverItem" data-aos="fade-up"
                                        data-aos-duration="1000">
                                        <div>
                                            <h4><img src={Icon1} alt="" className="Icon"/> CUTTING EDGE DESIGN</h4>
                                            <FaArrowRightLong />
                                        </div>
                                        <div className="HoverContainer">
                                            <p>Our state-of-the-art technology creates structures that others only dream of</p>
                                        </div>
                                        <hr />
                                    </div>
                                </Col>
                                <Col lg={6} md={12} style={{ width: "100%" }}>

                                    <div className="HoverItem" data-aos="fade-up"
                                        data-aos-duration="1500">
                                        <h4><img src={Icon2} alt="" className="Icon"/> PRECISION ENGINEERING</h4>
                                        <FaArrowRightLong />
                                        <div className="HoverContainer">
                                            <p>We Deliver accuracy down to the milimeter, ensuring perfect execution every time.</p>
                                        </div>
                                        <hr />
                                    </div>
                                </Col>
                                <Col lg={6} md={12} style={{ width: "100%" }}>
                                    <div className="HoverItem" data-aos="fade-up"
                                        data-aos-duration="2000">
                                        <h4><img src={Icon4} alt="" className="Icon"/>SUSTAINABLE SOLUTIONS</h4>
                                        <FaArrowRightLong />
                                        <div className="HoverContainer">
                                            <p>Our eco-friendly designs are setting new standards in green engineering.</p>
                                        </div>
                                        <hr />
                                    </div>
                                </Col>
                                <Col lg={6} md={12} style={{ width: "100%" }}>
                                    <div className="HoverItem" data-aos="fade-up"
                                        data-aos-duration="2500">
                                        <h4><img src={Icon3} alt="" className="Icon"/> RAPID DELIVERY </h4>
                                        <FaArrowRightLong />
                                        <div className="HoverContainer">
                                            <p>We work at the speed of innovation, without compromising on quality.</p>
                                        </div>
                                        <hr />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
