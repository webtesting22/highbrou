import ProjectsData from '../AllProjects/ProjectsData';

// Get unique categories from actual project data
const getUniqueCategories = () => {
    return [...new Set(ProjectsData.map(project => project.category))].filter(Boolean);
};

const NavigationLinks = [
    {
        link: "About Us",
        path: "/about-us"
    },
    {
        link: "Services",
        path: "/services"
    },
    {
        link: "Projects +",
        sublinks: getUniqueCategories().map(category => ({
            link: category,
            // path: `/allprojects?category=${encodeURIComponent(category)}`
            path: `/allprojects`
        })),
        path: "/allprojects"
    },
    {
        link: "Our Approach",
        path: "/our-approach"
    },
    // {
    //     link: "Case Studies",
    //     path: "/case-studies"
    // },
    {
        link: "Career",
        path: "/career"
    },
    {
        link: "Contact",
        path: "/contact"
    }
]

export default NavigationLinks