import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, Button, Card } from "antd";
import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import ProjectsData from "./ProjectsData";
import "./ProjectsPage.css";

const SingleProject = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [autoPlayInterval, setAutoPlayInterval] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Find project by slug
        const foundProject = ProjectsData.find(p => {
            const projectSlug = p.heading
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            return projectSlug === slug;
        });
        
        setProject(foundProject);
    }, [slug]);

    // Auto-play slider effect
    useEffect(() => {
        if (project && Array.isArray(project.image) && project.image.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex => 
                    prevIndex === project.image.length - 1 ? 0 : prevIndex + 1
                );
            }, 2000);
            
            setAutoPlayInterval(interval);
            
            return () => clearInterval(interval);
        }
    }, [project]);

    const handleBackClick = () => {
        navigate("/allprojects");
    };

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        // Reset auto-play when user manually selects image
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    };

    const handlePrevImage = () => {
        if (project && Array.isArray(project.image)) {
            setCurrentImageIndex(prevIndex => 
                prevIndex === 0 ? project.image.length - 1 : prevIndex - 1
            );
        }
    };

    const handleNextImage = () => {
        if (project && Array.isArray(project.image)) {
            setCurrentImageIndex(prevIndex => 
                prevIndex === project.image.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    if (!project) {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
                <h2>Project not found</h2>
                <Button onClick={handleBackClick}>Back to Projects</Button>
            </div>
        );
    }

    const projectImages = Array.isArray(project.image) ? project.image : [project.image];
    const currentImage = projectImages[currentImageIndex];

    return (
        <>
            <section id="SingleProjectContainer">
                <div className="sectionPadding">
                    <div className="SingleProjectContent">
                        {/* Back Button */}
                        {/* <div className="ProjectBackButton">
                            <Button 
                                icon={<ArrowLeftOutlined />} 
                                onClick={handleBackClick}
                                className="BackButton"
                                size="large"
                            >
                                Back to Projects
                            </Button>
                        </div> */}

                        {/* Project Title Section */}
                        <div className="ProjectTitleSection">
                            <h1 className="ProjectTitle">{project.heading}</h1>
                            <p className="ProjectCategory">{project.category}</p>
                            {/* {project.tagline && <p className="ProjectTagline">{project.tagline}</p>} */}
                        </div>

                        {/* E-commerce Style Image Gallery */}
                        <Row gutter={[32, 32]} style={{ marginTop: "40px" }}>
                            {/* Thumbnail Navigation - Left Side */}
                            <Col lg={4} md={6} sm={24} xs={24}>
                                <div className="ThumbnailNavigation">
                                    {projectImages.map((imgSrc, index) => (
                                        <div 
                                            key={index} 
                                            className={`ThumbnailWrapper ${index === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => handleImageClick(index)}
                                        >
                                            <img
                                                src={imgSrc}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="ThumbnailImage"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Col>

                            {/* Main Image Display - Right Side */}
                            <Col lg={20} md={18} sm={24} xs={24}>
                                <div className="MainImageContainer">
                                    <div className="ImageSliderWrapper">
                                        <img
                                            src={currentImage}
                                            alt={`${project.heading} - Image ${currentImageIndex + 1}`}
                                            className="MainProjectImage"
                                            loading="lazy"
                                        />
                                        
                                        {/* Navigation Arrows */}
                                        {projectImages.length > 1 && (
                                            <>
                                                <button 
                                                    className="SliderNavButton prev"
                                                    onClick={handlePrevImage}
                                                >
                                                    <LeftOutlined />
                                                </button>
                                                <button 
                                                    className="SliderNavButton next"
                                                    onClick={handleNextImage}
                                                >
                                                    <RightOutlined />
                                                </button>
                                            </>
                                        )}

                                        {/* Image Counter */}
                                        <div className="ImageCounter">
                                            {currentImageIndex + 1} / {projectImages.length}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Project Information - Bottom */}
                        <Row gutter={[32, 32]} style={{ marginTop: "60px" }}>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <Card className="ProjectInfoCard">
                                    <Row gutter={[32, 32]}>
                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <div className="ProjectDetailsSection">
                                                <h3>Project Details</h3>
                                                <div className="ProjectDescription">
                                                    {project.description}
                                                </div>
                                            </div>
                                        </Col>
                                        {/* <Col lg={12} md={24} sm={24} xs={24}>
                                            <div className="ProjectSpecsSection">
                                                <h3>Project Specifications</h3>
                                                <div className="ProjectSpecs">
                                                    <div className="SpecItem">
                                                        <strong>Category:</strong>
                                                        <span>{project.category}</span>
                                                    </div>
                                                    {project.tagline && (
                                                        <div className="SpecItem">
                                                            <strong>Tagline:</strong>
                                                            <span>{project.tagline}</span>
                                                        </div>
                                                    )}
                                                    <div className="SpecItem">
                                                        <strong>Total Images:</strong>
                                                        <span>{projectImages.length}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SingleProject; 