import React, { useEffect, useState } from "react";
import { Table, Input, message } from "antd";

const { Search } = Input;

const ApplicationView = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4040/api/highbrou/getAllJobApplications");
            const data = await response.json();

            if (response.ok) {
                setApplications(data.applications || []);
            } else {
                message.error(data.message || "Failed to fetch applications");
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            message.error("An error occurred while fetching job applications.");
        } finally {
            setLoading(false);
        }
    };

    // Handle search filtering
    const filteredApplications = applications.filter((app) =>
        Object.values(app).some(
            (value) =>
                typeof value === "string" && value.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    // Extract unique qualification options for filtering
    const qualificationFilters = [
        ...new Set(applications.map((app) => app.highestQualification).filter(Boolean)),
    ].map((qualification) => ({ text: qualification, value: qualification }));

    // Extract unique notice period options for filtering
    const noticePeriodFilters = [
        ...new Set(applications.map((app) => app.noticePeriod).filter(Boolean)),
    ].map((period) => ({ text: period, value: period }));

    // Define table columns with sorting and filtering
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => `${record.firstName || ""} ${record.lastName || ""}`,
            sorter: (a, b) => (a.firstName || "").localeCompare(b.firstName || ""),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "Qualification",
            dataIndex: "highestQualification",
            key: "highestQualification",
            filters: qualificationFilters,
            onFilter: (value, record) => record.highestQualification === value,
        },
        {
            title: "Passing Year",
            dataIndex: "passingYear",
            key: "passingYear",
            sorter: (a, b) => a.passingYear - b.passingYear,
        },
        {
            title: "Current CTC",
            dataIndex: "currentCTC",
            key: "currentCTC",
            sorter: (a, b) => a.currentCTC - b.currentCTC,
        },
        {
            title: "Expected CTC",
            dataIndex: "expectedCTC",
            key: "expectedCTC",
            sorter: (a, b) => a.expectedCTC - b.expectedCTC,
        },
        {
            title: "Experience",
            dataIndex: "experience",
            key: "experience",
            sorter: (a, b) => a.experience - b.experience,
        },
        {
            title: "Notice Period",
            dataIndex: "noticePeriod",
            key: "noticePeriod",
            filters: noticePeriodFilters,
            onFilter: (value, record) => record.noticePeriod === value,
        },
        {
            title: "Resume",
            dataIndex: "resume",
            key: "resume",
            render: (resume) =>
                resume ? (
                    <a href={`${resume}`} target="_blank" rel="noopener noreferrer">
                        View Resume
                    </a>
                ) : (
                    "N/A"
                ),
        },
        {
            title: "Applied On",
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => new Date(date).toLocaleDateString(),
        },
    ];

    return (
        <section id="ApplicationViewContainer" style={{ padding: "20px" }}>
            <h2>Job Applications</h2>

            {/* Search Input */}
            <Search
                placeholder="Search by Name, Email, Mobile, Qualification..."
                allowClear
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 400, marginBottom: 16 }}
            />

            {/* Table with search, sorting, and filters */}
            <Table
                columns={columns}
                dataSource={filteredApplications.map((app) => ({ ...app, key: app._id }))}
                loading={loading}
                bordered
                pagination={{ pageSize: 10 }}
            />
        </section>
    );
};

export default ApplicationView;
