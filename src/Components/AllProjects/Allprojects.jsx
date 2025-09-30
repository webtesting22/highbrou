import React, { useEffect, useState, useMemo } from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import "./ProjectsPage.css";
import { Row, Col, Select, Modal } from "antd";
import ProjectsData from "./ProjectsData";
import { CiFilter } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";

// Utility function to create URL-friendly slugs
const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .trim();
};

const AllProjects = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // State for filters
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Get unique categories from actual project data - memoized to prevent re-creation
    const uniqueCategories = useMemo(() => {
        return [...new Set(ProjectsData.map(project => project.category))].filter(Boolean);
    }, []);

    // Handle scroll to top and scroll events
    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            if (window.innerWidth <= 900) {
                setIsFilterVisible(window.scrollY > 300);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle URL parameter for category filtering
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const categoryFromUrl = urlParams.get('category');

        if (categoryFromUrl && uniqueCategories.includes(categoryFromUrl)) {
            setSelectedCategories([categoryFromUrl]);
        } else if (!categoryFromUrl) {
            setSelectedCategories([]);
        }
    }, [location.search, uniqueCategories]);

    // Handle Category Selection
    const handleCategoryChange = (values) => {
        setSelectedCategories(values || []);

        // Update URL to reflect the selected categories (optional - for shareable URLs)
        try {
            const url = new URL(window.location);
            if (values && values.length > 0) {
                url.searchParams.set('category', values[0]);
            } else {
                url.searchParams.delete('category');
            }

            // Only update URL if it's different to prevent unnecessary navigation
            if (url.toString() !== window.location.toString()) {
                window.history.replaceState({}, '', url);
            }
        } catch (error) {
            console.log('URL update skipped');
        }
    };

    // Handle card click to navigate to single project page
    const handleProjectClick = (project) => {
        const slug = createSlug(project.heading);
        navigate(`/allprojects/${slug}`);
    };

    // Filtered Projects Based on Selected Categories
    const filteredProjects = useMemo(() => {
        let projects = selectedCategories.length > 0
            ? ProjectsData.filter(project => selectedCategories.includes(project.category))
            : ProjectsData;
        
        // Sort by ID in descending order (latest first)
        return projects.sort((a, b) => b.id - a.id);
    }, [selectedCategories]);

    return (
        <>
            <section id="AllProjectsPageContainer">
                <CommonTopBannerDynamic
                    heading="Our Projects"
                    subheading="Our Works, Our Standards"
                    image="/Images/ProjectsTopBanner.jpg"
                />
                <div>
                    <div className="sectionPadding" style={{ position: "relative" }}>
                        <h2 className="ProjectsSectionHeading">Our Portfolio</h2>

                        <div className="ProjectsMainContainer">
                            {/* Filter Section - Top */}
                            <div className="ProjectsFilterTop">
                                <Row gutter={[16, 16]} align="middle">
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <div className="FilterTitle">
                                            <h3>Filter by Category</h3>
                                            {/* <p>Showing {filteredProjects.length} of {ProjectsData.length} projects</p> */}
                                        </div>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Select categories to filter"
                                            style={{ width: '100%' }}
                                            onChange={handleCategoryChange}
                                            value={selectedCategories}
                                            allowClear
                                            options={uniqueCategories.map(category => ({
                                                label: category,
                                                value: category
                                            }))}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            {/* Projects Grid - Full Width */}
                            <div className="ProjectsGrid">
                                <Row gutter={[24, 24]}>
                                    {filteredProjects.map((project, index) => (
                                        <Col lg={8} md={12} sm={12} xs={24} key={project.id || index}>
                                            <div
                                                className="ProjectCard"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleProjectClick(project);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="ProjectCardImageContainer">
                                                    {Array.isArray(project.image) && project.image.length > 0 && (
                                                        <img
                                                            src={project.image[0]}
                                                            alt={project.heading}
                                                            loading="lazy"
                                                            className="ProjectCardImage"
                                                        />
                                                    )}
                                                    <div className="ProjectCardOverlay">
                                                        <div className="ProjectCardContent">
                                                            <h3>{project.heading}</h3>
                                                            <p>{project.category}</p>
                                                            {/* <button></button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>

                        {/* Floating Filter Button for Mobile */}
                        {isFilterVisible && (
                            <button
                                className="FloatingFilterButton"
                                onClick={() => setIsFilterModalVisible(true)}
                            >
                                <CiFilter />
                            </button>
                        )}

                        {/* Filter Modal for Mobile */}
                        <Modal
                            title="Filter by Category"
                            open={isFilterModalVisible}
                            onCancel={() => setIsFilterModalVisible(false)}
                            closable={false}
                            footer={null}
                        >
                            <h3 style={{ color: "black" }}>Showing {filteredProjects.length} of {ProjectsData.length} projects</h3>
                            <br />
                            <Select
                                mode="multiple"
                                placeholder="Select categories to filter"
                                style={{ width: '100%' }}
                                onChange={handleCategoryChange}
                                value={selectedCategories}
                                allowClear
                                options={uniqueCategories.map(category => ({
                                    label: category,
                                    value: category
                                }))}
                            />

                            <div style={{ marginTop: "20px", textAlign: "right", display: "flex", justifyContent: "end" }}>
                                <button
                                    className="AnimatedBtnContainer"
                                    onClick={() => setIsFilterModalVisible(false)}
                                >
                                    Apply
                                </button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllProjects;
