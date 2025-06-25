import React, { useEffect, useState } from "react";
import { Table, Input, message, Select, Slider, InputNumber } from "antd";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import "./JobApplicationheading.css";

const { Search } = Input;
const { Option } = Select;

const ApplicationView = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedJobPositions, setSelectedJobPositions] = useState([]);
    const [selectedPassingYears, setSelectedPassingYears] = useState([]);
    const [selectedCTCRanges, setSelectedCTCRanges] = useState([]);
    const [currentCTCRange, setCurrentCTCRange] = useState([0, 0]);
    const [expectedCTCRange, setExpectedCTCRange] = useState([0, 0]);

    const currentCTCValues = applications.map(app => app.currentCTC || 0);
    const expectedCTCValues = applications.map(app => app.expectedCTC || 0);

    const minCurrentCTC = Math.min(...currentCTCValues, 0);
    const maxCurrentCTC = Math.max(...currentCTCValues, 100);

    const minExpectedCTC = Math.min(...expectedCTCValues, 0);
    const maxExpectedCTC = Math.max(...expectedCTCValues, 100);

    useEffect(() => {
        fetchApplications();
    }, []);
    const apibaseUrl = import.meta.env.VITE_BASE_URL;

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apibaseUrl}/highbrou/getAllJobApplications`);
            const data = await response.json();
            if (response.ok) {
                const apps = data.applications || [];
                setApplications(apps);

                const currentCTCValues = apps.map(app => app.currentCTC || 0);
                const expectedCTCValues = apps.map(app => app.expectedCTC || 0);

                const minCurrent = Math.min(...currentCTCValues);
                const maxCurrent = Math.max(...currentCTCValues);

                const minExpected = Math.min(...expectedCTCValues);
                const maxExpected = Math.max(...expectedCTCValues);

                setCurrentCTCRange([minCurrent, maxCurrent]);
                setExpectedCTCRange([minExpected, maxExpected]);
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

    const filteredApplications = applications
        .filter(app =>
            app.currentCTC >= currentCTCRange[0] && app.currentCTC <= currentCTCRange[1]
        )
        .filter(app =>
            app.expectedCTC >= expectedCTCRange[0] && app.expectedCTC <= expectedCTCRange[1]
        )

        .filter(app =>
            Object.values(app).some(
                value =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        )
        .filter(app =>
            selectedJobPositions.length > 0
                ? selectedJobPositions.includes(app.jobPosition)
                : true
        )
        .filter(app =>
            selectedPassingYears.length > 0
                ? selectedPassingYears.includes(app.passingYear)
                : true
        )
        .filter(app => {
            if (selectedCTCRanges.length > 0) {
                return selectedCTCRanges.some(([min, max]) => app.currentCTC >= min && app.currentCTC <= max);
            }
            return true;
        });


    const qualificationFilters = [
        ...new Set(applications.map(app => app.highestQualification).filter(Boolean)),
    ].map(q => ({ text: q, value: q }));

    const noticePeriodFilters = [
        ...new Set(applications.map(app => app.noticePeriod).filter(Boolean)),
    ].map(n => ({ text: n, value: n }));

    const columns = [
        {
            title: "Name",
            key: "name",
            render: (_, record) => `${record.firstName || ""} ${record.lastName || ""}`,
            sorter: (a, b) => (a.firstName || "").localeCompare(b.firstName || ""),
        },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Position Applied", dataIndex: "jobPosition", key: "jobPosition" },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
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
            render: resume =>
                resume ? (
                    <a href={resume} target="_blank" rel="noopener noreferrer">
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
            render: date => new Date(date).toLocaleDateString(),
        },
    ];
    const handleClearAllFilters = () => {
        setSearchText("");
        setSelectedJobPositions([]);
        setSelectedPassingYears([]);
        setSelectedCTCRanges([]);

        const currentCTCValues = applications.map(app => app.currentCTC || 0);
        const expectedCTCValues = applications.map(app => app.expectedCTC || 0);

        setCurrentCTCRange([Math.min(...currentCTCValues), Math.max(...currentCTCValues)]);
        setExpectedCTCRange([Math.min(...expectedCTCValues), Math.max(...expectedCTCValues)]);
    };



    const handleDownloadCsvForGoogleSheets = () => {
        const exportData = filteredApplications.map(app => ({
            Name: `${app.firstName || ""} ${app.lastName || ""}`,
            Email: app.email || "",
            "Position Applied": app.jobPosition || "",
            Mobile: app.mobile || "",
            Qualification: app.highestQualification || "",
            "Passing Year": app.passingYear || "",
            "Current CTC": app.currentCTC || "",
            "Expected CTC": app.expectedCTC || "",
            Experience: app.experience || "",
            "Notice Period": app.noticePeriod || "",
            Resume: app.resume || "",
            "Applied On": new Date(app.createdAt).toLocaleDateString() || "",
        }));

        // Convert to CSV
        const header = Object.keys(exportData[0]).join(",");
        const rows = exportData.map(row =>
            Object.values(row)
                .map(value => `"${String(value).replace(/"/g, '""')}"`)
                .join(",")
        );
        const csvContent = [header, ...rows].join("\n");

        // Create blob and trigger download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "JobApplications.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };

    return (
        <div>
            <CommonTopBannerDynamic
                heading="JobApplications"
                image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <section id="ApplicationViewContainer" className="sectionPadding">
                <div className="JobApplicationheading">
                    <h2>Job Applications</h2>
                </div>

                <br />
                <br />


                {/* Dropdown Filters */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
                    <Search
                        placeholder="Search by Name, Email, Mobile, Qualification..."
                        allowClear
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300, marginBottom: 16 }}
                    />

                    <Select
                        mode="multiple"
                        placeholder="Filter by Job Position"
                        allowClear
                        style={{ width: 200, height: "50px" }}
                        onChange={setSelectedJobPositions}
                        value={selectedJobPositions}

                    >
                        {[...new Set(applications.map(app => app.jobPosition).filter(Boolean))].map(pos => (
                            <Option key={pos} value={pos}>
                                {pos}
                            </Option>
                        ))}
                    </Select>

                    <Select
                        mode="multiple"
                        placeholder="Filter by Passing Year"
                        allowClear
                        style={{ width: 200, height: "50px" }}
                        onChange={setSelectedPassingYears}
                        value={selectedPassingYears}
                    >
                        {[...new Set(applications.map(app => app.passingYear).filter(Boolean))]
                            .sort()
                            .map(year => (
                                <Option key={year} value={year}>
                                    {year}
                                </Option>
                            ))}
                    </Select>
                    <div style={{ width: 300 }}>
                        <p style={{ marginBottom: 4 }}>Current CTC (LPA):</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <InputNumber
                                min={minCurrentCTC}
                                max={currentCTCRange[1]}
                                value={currentCTCRange[0]}
                                onChange={value => setCurrentCTCRange([value, currentCTCRange[1]])}
                            />
                            <span>to</span>
                            <InputNumber
                                min={currentCTCRange[0]}
                                max={maxCurrentCTC}
                                value={currentCTCRange[1]}
                                onChange={value => setCurrentCTCRange([currentCTCRange[0], value])}
                            />
                        </div>
                        <Slider
                            range
                            min={minCurrentCTC}
                            max={maxCurrentCTC}
                            value={currentCTCRange}
                            onChange={setCurrentCTCRange}
                        />
                    </div>

                    {/* === Expected CTC Filter === */}
                    <div style={{ width: 300 }}>
                        <p style={{ marginBottom: 4 }}>Expected CTC (LPA):</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <InputNumber
                                min={minExpectedCTC}
                                max={expectedCTCRange[1]}
                                value={expectedCTCRange[0]}
                                onChange={value => setExpectedCTCRange([value, expectedCTCRange[1]])}
                            />
                            <span>to</span>
                            <InputNumber
                                min={expectedCTCRange[0]}
                                max={maxExpectedCTC}
                                value={expectedCTCRange[1]}
                                onChange={value => setExpectedCTCRange([expectedCTCRange[0], value])}
                            />
                        </div>
                        <Slider
                            range
                            min={minExpectedCTC}
                            max={maxExpectedCTC}
                            value={expectedCTCRange}
                            onChange={setExpectedCTCRange}
                        />
                    </div>
                    <button onClick={handleClearAllFilters} style={{ padding: "0 12px", height: "32px" }}>
                        Clear All Filters
                    </button>
                    {/* <Select
                        mode="multiple"
                        placeholder="Filter by Current CTC (LPA)"
                        allowClear
                        style={{ width: 240 }}
                        onChange={setSelectedCTCRanges}
                        value={selectedCTCRanges}
                    >
                        <Option value={[0, 3]}>0 - 3 LPA</Option>
                        <Option value={[3, 6]}>3 - 6 LPA</Option>
                        <Option value={[6, 10]}>6 - 10 LPA</Option>
                        <Option value={[10, 100]}>10+ LPA</Option>
                    </Select> */}

                </div>

                {/* Table */}
                <div style={{ overflow: "auto", width: "100%" }}>
                    <Table
                        columns={columns}
                        dataSource={filteredApplications.map(app => ({ ...app, key: app._id }))}
                        loading={loading}
                        bordered
                        pagination={{ pageSize: 10 }}
                    />
                </div>

                <button onClick={handleDownloadCsvForGoogleSheets} style={{ padding: "0 12px", height: "32px" }}>
                    Download to Google Sheets
                </button>

            </section>
        </div>
    );
};

export default ApplicationView;
