import React, { useEffect, useState } from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import "./ProjectsPage.css";
import { Modal, Row, Col, Image, Checkbox } from "antd";
import ProjectsData from "./ProjectsData";
import NavigationLinks from "../HighbrouNavigation/NavigationLinks";
import AllProjectsTopComBanner from "./AllProjectsTopComBanner.jpg";
import { CiFilter } from "react-icons/ci";
import ProjectsTopBanner from "./ProjectsTopBanner.jpg"

const AllProjects = () => {
    const projectCategory = NavigationLinks.find(link => link.link === "Projects +");

    // State for Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

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

    // Open Modal with Selected Project
    const showModal = (project) => {
        setSelectedProject(project);
        setIsModalVisible(true);
    };

    // Close Modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedProject(null);
    };

    // Handle Category Selection
    const handleCategoryChange = (checkedValues) => {
        setSelectedCategories(checkedValues);
    };

    // Filtered Projects Based on Selected Categories
    const filteredProjects = selectedCategories.length > 0
        ? ProjectsData.filter(project => selectedCategories.includes(project.category))
        : ProjectsData;

    return (
        <>
            <section id="AllProjectsPageContainer">
                <CommonTopBannerDynamic
                    heading="Our Projects"
                    subheading="Our Works, Our Standards"
                    image={ProjectsTopBanner}
                />
                <div>
                    <div className="sectionPadding" style={{ position: "relative" }}>
                        <h2 className="ProjectsSectionHeading">Our Portfolio</h2>

                        <div className="AnimatedScrollingCards">
                            <div>
                                <Row>
                                    <Col lg={12}>
                                        <div className="ProjectsNamesCategoriesContainer">
                                            <h3 style={{ color: "black", marginBottom: "0px" }}>Total Projects: {filteredProjects.length}</h3>
                                            <Checkbox.Group
                                                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                                onChange={handleCategoryChange}
                                                value={selectedCategories}
                                            >
                                                <ul>
                                                    {projectCategory?.sublinks.map((subcategory, index) => (
                                                        <Checkbox key={index} value={subcategory.link}>
                                                            <li >{subcategory.link}</li>
                                                        </Checkbox>
                                                    ))}
                                                </ul>
                                            </Checkbox.Group>


                                        </div>
                                    </Col>
                                    <Col lg={12} style={{ width: "100%" }}>
                                        {filteredProjects.map((item, index) => (
                                            <div
                                                className="ProjectsCardsContainer"
                                                key={index}
                                                onClick={() => showModal(item)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <div className="heightContainer">
                                                    <div className="OverlayContainerShadow"></div>
                                                    {Array.isArray(item.image) && item.image.length > 0 && (
                                                        <img src={item.image[0]} alt={item.heading} />
                                                    )}
                                                    <div className="HoverContainerContainer">
                                                        <h2>{item.heading}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>
                            </div>
                            <Modal
                                title={selectedProject?.heading}
                                open={isModalVisible}
                                onCancel={handleCancel}
                                footer={null}
                                width={700}
                            >

                                {selectedProject && (
                                    <div>
                                        <div style={{ display: "flex", flexWrap: "wrap", padding: "5px" }}>

                                            {Array.isArray(selectedProject?.image) ? (
                                                <>
                                                    {selectedProject.image.map((imgSrc, imgIndex) => (
                                                        <Image
                                                            className="ModalInsideGalleryImage"
                                                            key={imgIndex}
                                                            src={imgSrc}
                                                            alt={`${selectedProject.heading} - ${imgIndex + 1}`}
                                                        />
                                                    ))}
                                                </>
                                            ) : (
                                                <Image
                                                    className="ModalInsideGalleryImage"
                                                    src={selectedProject?.image}
                                                    alt={selectedProject?.heading}
                                                />
                                            )}
                                        </div>
                                        <p><b>Description:</b></p>
                                        {selectedProject.description}
                                    </div>
                                )}
                            </Modal>
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

                        {/* Filter Modal */}
                        <Modal
                            title="Filter by Category"
                            open={isFilterModalVisible}
                            onCancel={() => setIsFilterModalVisible(false)}
                            closable={false}  // Removes the close (X) button
                            footer={null}  // Removes the default footer
                        >
                            <h3 style={{ color: "black" }}>Total Projects: {filteredProjects.length}</h3>
                            <br />
                            <Checkbox.Group
                                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                                onChange={handleCategoryChange}
                                value={selectedCategories}
                            >
                                {projectCategory?.sublinks.map((subcategory, index) => (
                                    <Checkbox key={index} value={subcategory.link}>
                                        {subcategory.link}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>

                            {/* Apply Button */}
                            <div style={{ marginTop: "20px", textAlign: "right", display: "flex", justifyContent: "end" }}>
                                <button
                                    className="AnimatedBtnContainer"
                                    onClick={() => setIsFilterModalVisible(false)}  // Close modal on click
                                >
                                    Apply
                                </button>
                            </div>
                        </Modal>

                    </div>
                </div>
            </section >


        </>
    );
};

export default AllProjects;
