import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./WhyUs.css";
import { Row, Col } from "antd";
// import BackImage from "./BackImage.jpeg";
import BackImage from "./BackImage.jpeg"
import pattern from "./pattern.webp";

const Counter = ({ value, suffix, trigger }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;

        let current = 0;
        const duration = 2000; // 2 seconds for the animation
        const increment = value / (duration / 16); // 16ms per frame (~60fps)
        setCount(0); // Reset the counter before starting the animation

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                clearInterval(timer);
                setCount(value);
            } else {
                setCount(Math.ceil(current));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, trigger]); // Rerun the effect whenever `trigger` changes

    return (
        <h2>
            {count}
            {suffix}
        </h2>
    );
};

const WhyUs = () => {
    const { ref, inView } = useInView({ threshold: 0.3 });

    const WhyChooseUsData = [
        { title: "PROJECT COMPLETED", value: 100, suffix: "+" },
        { title: "CLIENT SATISFACTION", value: 98, suffix: "%" },
        { title: "YEARS OF INNOVATION", value: 10, suffix: "+" },
        { title: "sq.ft OF STRUCTURES DELIVERED", value: 1, suffix: "cr+" },
    ];

    return (
        <>
            <section id="WhyUsContainer">
                <div>
                    <Row>
                        <Col lg={12} md={24}>
                            <div className="BackImageBackWhyUs">
                                <img src={BackImage} alt="" />
                            </div>
                        </Col>
                        <Col lg={12} md={24}>
                            <div className="sectionPadding" style={{ position: "relative" }}>
                                <div className="WhyUsContentHomePage">
                                    <div className="BackOverlayImage">
                                        <img src={pattern} alt="" />
                                    </div>
                                    <span>WHY CHOOSE US?</span>
                                    {/* <h2>WHY CHOOSE US?</h2> */}
                                    <p>
                                        Over a decade of expertise, a portfolio of complex projects,
                                        and a commitment to excellence.
                                    </p>
                                    <div className="CounterContainerWhyUs" ref={ref}>
                                        <Row>
                                            {WhyChooseUsData.map((item, index) => (
                                                <Col lg={12} key={index}>
                                                    <div className="CounterBoxContainer">
                                                        <Counter
                                                            value={item.value}
                                                            suffix={item.suffix}
                                                            trigger={inView} // Trigger reset and animation
                                                        />
                                                        <p>{item.title}</p>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default WhyUs;
