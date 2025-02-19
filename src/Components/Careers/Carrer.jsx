import React, { useState, useEffect } from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import { Row, Col, Modal, Form, Input, Button, message, Tag, Upload, notification } from "antd";
import { MdOutlineArrowRight } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import Topback from "./Topback.jpeg"
import "./Careers.css"
const Career = () => {
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [form] = Form.useForm();
    const [resumeLink, setResumeLink] = useState(null);

    const handleResumeChange = async (info) => {
        if (!info.file) return;

        try {
            const file = info.file;
            const fileType = file.type;

            // Request upload policy from the backend
            const response = await fetch("http://localhost:4040/api/chats/uploadPolicy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWJkNGM4YWQ3NzczMjc5YzVhZTM4MCIsInJvbGUiOiJtb2RlcmF0b3IiLCJleHAiOjE3MzAwMjc4MzksInBocyI6e30sImlhdCI6MTcyNDg0MzgzOH0.gNjc_Z5LD9vqtZ7V15CQhXsAdXrhbW9OEwOMEDz7MMg`,

                },
                body: JSON.stringify({
                    fileName: encodeURIComponent(file.name),
                    mime: fileType,
                    acl: "public-read",
                }),
            });

            const data = await response.json();

            if (data?.data?.fields && data?.data?.url) {
                // Prepare form data
                const formData = new FormData();
                Object.entries(data.data.fields).forEach(([key, value]) => formData.append(key, value));
                formData.append("file", file);

                // Upload file to the S3 bucket
                const uploadResponse = await fetch(data.data.url, {
                    method: "POST",
                    body: formData,
                });



                if (uploadResponse.ok) {
                    const finalUrl = `${data.data.url}/${encodeURIComponent(data.filePath)}`;
                    setResumeLink(finalUrl);
                    console.log("Resume uploaded successfully:", finalUrl);
                    notification.success({
                        message: "Upload Successful",
                        description: "Your resume has been uploaded successfully.",
                    });
                } else {
                    notification.error({ message: "Resume upload failed" });
                    notification.error({
                        message: "Upload Failed",
                        description: "Error while uploading Resume. Please try again.",
                    });
                }
            } else {
                notification.error({ message: "Failed to get upload URL" });
            }
        } catch (error) {
            console.error("Upload error:", error);
            notification.error({ message: "Error while uploading resume" });
        }
    };

    const handleResumeRemove = () => {
        setResumeLink(null); // Clear resume link when file is removed
    };

    const handleSubmit = async (values) => {
        if (!resumeLink) {
            message.error("Please upload your resume.");
            return;
        }

        // Convert resumeLink to filename if needed
        // const resumeFileName = resumeLink.split("/").pop(); // Extracts "resume.pdf"

        // Construct JSON payload
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            mobile: values.mobile,
            email: values.email,
            highestQualification: values.qualification,
            passingYear: Number(values.passingYear),
            currentCTC: Number(values.currentCTC),
            expectedCTC: Number(values.expectedCTC),
            permanentAddress: values.permanentAddress,
            currentAddress: values.currentAddress,
            experience: Number(values.experience),
            noticePeriod: values.noticePeriod,
            resume: resumeLink,
        };

        try {
            const response = await fetch("http://localhost:4040/api/highbrou/addJobApplication", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("🛠 API Response:", data);
            if (response.ok) {
                message.success(data.message);
                form.resetFields();
                setResumeLink(""); // Reset resume link
                handleCancel(); // Close modal
                notification.success({
                    message: "Application Submitted",
                    description: "Your job application has been successfully submitted.",
                });
            } else {
                message.error(data.message || "Error submitting application");
                notification.error({
                    message: "Submission Failed",
                    description: data.message || "Error submitting application. Please try again.",
                });
            }
        } catch (error) {
            message.error("An error occurred while submitting the application.");
            console.error("Error:", error);
        }
    };


    const CareerPostData = [
        {
            postTitle: "Design Engineer - BIM Structures",
            postDate: "13 November, 2024",
            location: "Mumbai, Maharashtra, India",
            jobtype: [
                "Remote", "Full-time"
            ],
            jobdescription: <>
                <div>
                    <p><b>Location: </b> Mumbai, Maharashtra, India</p>
                    <div>
                        <p><b>About the job</b></p>
                        <p><b>Company Description</b></p>
                        <p>Highbrou Engineering Pvt. Ltd. is dedicated to redefining the role of an engineering partner by delivering cutting-edge technical consulting services in Structural Engineering. With expertise in tall buildings, PEB warehouses, stadiums, and more, our seasoned engineers bring decades of combined experience to each project. Our vision is to exceed client expectations by providing innovative and sustainable solutions, supported by a team proficient in BIM tools for quality results.</p>
                        <p><b>Role Description</b></p>
                        <p>This is a full-time remote role for a Design Engineer - BIM Structures at Highbrou Engineering Pvt. Ltd. The Design Engineer will be responsible for tasks related to design engineering, BIM, computer-aided design (CAD), etc.</p>
                        <p><b> Key Responsibilities:</b></p>
                        <ul>
                            <li>Create structural drawings in Revit (seldom in AutoCAD)</li>
                            <li>Check drawings for compliance with project specs </li>
                            <li>Manage project documentation & filing systems </li>
                            <li>Collaborate with the project team for updates & revisions </li>
                            <li>Prepare structural framing layouts from Architectural designs</li>
                            <li>Produce detailed GA layouts, sections & RCC rebar drawings</li>
                            <li>Generate structural steel details, connections, BOM, BBS, etc.</li>
                        </ul>
                        <p><b> Requirements:</b></p>
                        <ul>
                            <li>Diploma in Civil Engineering (BE Civil is a plus) </li>
                            <li>3-5 years of BIM experience in buildings/infrastructure projects </li>
                            <li>Proficient in Revit Structures & AutoCAD</li>
                            <li>Knowledge of Dynamo & automation is a bonus </li>
                            <li>Great communication & teamwork skills</li>
                            <li>Remote work-friendly</li>
                        </ul>
                    </div>
                </div>
            </>
        },
        {
            postTitle: "Structural Design Engineer",
            postDate: "4 January 2025",
            location: "Mumbai Metropolitan Region",
            jobtype: [
                "Hybrid", "Full-time", "0 of 10 skills match"
            ],
            jobdescription: <>
                <div>
                    <p><b>Location: </b> Mumbai Metropolitan Region</p>

                    <div>
                        <p><b>About the job</b></p>
                        <p>Tips: Provide a summary of the role, what success in the position looks like, and how this role fits into the organization overall.</p>
                        <p><b>Role and Responsibilities:</b></p>
                        <ul>
                            <li>Developing structural design models.</li>
                            <li>Performing calculations and analysis for various structural projects.</li>
                            <li>Preparing design reports, drawings, and specifications.</li>
                            <li>Collaborating with clients, architects, and project teams.</li>
                            <li>Ensuring compliance with building codes and standards.
                            </li>
                        </ul>
                        <p><b>Experience Level:</b></p>
                        <ul>
                            <li>Preferably 3–6 years of experience in structural design.</li>
                            <li>Proficiency in software tools like ETABS, SAFE, STAAD.Pro, AutoCAD, and Revit.</li>
                        </ul>
                        <p><b>Required Skills:</b></p>
                        <ul>
                            <li>Strong knowledge of RCC and steel design.
                            </li>
                            <li>Familiarity with BIM workflows.</li>
                            <li>Ability to perform dynamic and seismic analysis.</li>
                            <li>Problem-solving mindset and attention to detail.
                            </li>
                        </ul>
                        <p><b>Location and Work Mode:</b></p>
                        <ul>
                            <li>The position allows for remote work, aligning with Highbrou's work-from-home policy.
                            </li>
                            <li>Candidates must have their own computer system meeting the company's configuration requirements and a professional workspace.
                            </li>
                        </ul>
                        <p><b>Compensation and Benefits:</b></p>
                        <ul>
                            <li>Competitive salary based on experience and skills.</li>
                            <li>Opportunities for training and professional growth.
                            </li>
                        </ul>
                        <p><b>Additional Considerations:</b></p>
                        <ul>
                            <li>The engineer should have excellent communication skills to coordinate with clients and team members effectively.
                            </li>
                            <li>A strong commitment to delivering high-quality, innovative designs.
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        },
        {
            postTitle: "Senior Structural Draftsman (RCC & Steel)",
            postDate: "- 2025",
            location: "Mumbai Metropolitan Region",
            jobtype: [
                "Hybrid", "Full-time", "0 of 10 skills match"
            ],
            jobdescription: <>
                <div>
                    <p><b>About the job</b></p>
                    <p><b>Responsibilities</b></p>
                    <ul>
                        <li>Undertake CAD / BIM drafting work</li>
                        <li>Prepare high quality civil structural and infrastructural drawings</li>
                        <li>Examine and check drawings to ensure compliance with project requirements and specifications</li>
                        <li>Maintain and adhere to office and project filing systems / documentation</li>
                        <li>Assist in administration and documentation of projects, including prepare manuals</li>
                        <li>Work closely with the project team on any update and changes to drawings
                        </li>
                        <li> ⁠Prepare concept structural framing drawings from scratch using Architectural layouts</li>
                        <li>Prepare detailed GA layouts and sections as per project requirement</li>
                        <li>Prepare rebar details for RCC elements</li>
                        <li>Prepare Structural steel details including GA layouts & connection details</li>
                        <li>⁠Prepare GFC drawings</li>
                        <li>Prepare bar bending schedule</li>
                    </ul>
                    <p><b>Requirements</b></p>
                    <ul>
                        <li>⁠Diploma in Civil Engineering / ITI in CAD drafting or equivalent</li>
                        <li>Min 5 years’ drafting experience, preferably in civil or infrastructure projects</li>
                        <li>Proficient in AutoCAD software, knowledge in Revit BIM will be an added advantage</li>
                        <li>Excellent interpersonal and communication skills</li>
                        <li>⁠Ability to work remotely within a team</li>
                    </ul>
                </div>
            </>
        }


    ]
    const handleFileChange = (e) => {
        const selectedFile = e.file;
        if (selectedFile) {
            // Check file type and size
            const isValidType = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(selectedFile.type);
            const isValidSize = selectedFile.size <= 1 * 1024 * 1024;

            if (!isValidType) {
                message.error("Only PDF or DOCX files are allowed!");
                setFile(null); // Reset file on invalid type
            } else if (!isValidSize) {
                message.error("File size should be under 1MB!");
                setFile(null); // Reset file on invalid size
            } else {
                setFile(selectedFile); // Set valid file
            }
        }
    };
    const openDescriptionModal = (post) => {
        setSelectedPost(post);
        setIsDescriptionModalOpen(true);
    };

    const openApplyModal = () => {
        setIsDescriptionModalOpen(false);
        setIsApplyModalOpen(true);

    };

    const handleCancel = () => {
        setIsDescriptionModalOpen(false);
        setIsApplyModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>

            <section id="CareerContainer">
                <CommonTopBannerDynamic
                    heading="Our Career"
                    subheading="Our Journey, Our Tomorrow"
                    image={Topback}
                />
                <div className="CareerPostContainer sectionPadding">
                    <Row>
                        {CareerPostData.map((item, index) => (
                            <Col lg={12} md={12} key={index} style={{ width: "100%", padding: "10px" }}>
                                <div className="BorderHoverCard">

                                    <div className="HoverableCardContent">
                                        <span><FaCalendar /> &nbsp;{item.postDate}</span>
                                        <h2>{item.postTitle}</h2>
                                        <p>{item.location}</p>
                                        <div>
                                            {Array.isArray(item.jobtype) ? (
                                                item.jobtype.map((type, idx) => (
                                                    <Tag key={idx} color="blue">{type}</Tag>
                                                ))
                                            ) : null}
                                        </div>
                                        {/* <p>{item.jobdescription}</p> */}
                                        <br />
                                        <button className="AnimatedBtnContainer" onClick={() => openDescriptionModal(item)}>View Job Description <MdOutlineArrowRight /></button>
                                    </div>
                                    <hr />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <Modal
                    title={selectedPost?.postTitle || ""}
                    open={isDescriptionModalOpen}
                    onCancel={handleCancel}
                    width={1000}
                    footer={[

                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <button className="AnimatedBtnContainer" onClick={openApplyModal} key="apply">Apply Now <MdOutlineArrowRight /></button>
                        </div>
                    ]}
                    className="ModalContentJob"
                >
                    <p style={{ fontSize: "16px" }}>{selectedPost?.jobdescription}</p>
                </Modal>
                <Modal
                    title={`Apply for ${selectedPost?.postTitle || ""}`}
                    open={isApplyModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
                >
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                { required: true, message: "Please enter your first name!" },
                                { min: 2, message: "First name must be at least 2 characters!" },
                                { max: 50, message: "First name cannot exceed 50 characters!" },
                                { pattern: /^[A-Za-z\s]+$/, message: "First name should only contain letters!" }
                            ]}
                        >
                            <Input placeholder="Enter your first name" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                { required: true, message: "Please enter your last name!" },
                                { min: 2, message: "Last name must be at least 2 characters!" },
                                { max: 50, message: "Last name cannot exceed 50 characters!" },
                                { pattern: /^[A-Za-z\s]+$/, message: "Last name should only contain letters!" }
                            ]}
                        >
                            <Input placeholder="Enter your last name" />
                        </Form.Item>

                        <Form.Item
                            name="mobile"
                            label="Mobile Number"
                            rules={[
                                { required: true, message: "Please enter your mobile number!" },
                                { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number!" }
                            ]}
                        >
                            <Input placeholder="Enter your mobile number" maxLength={10} />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Please enter your email!" },
                                { type: "email", message: "Enter a valid email address!" }
                            ]}
                        >
                            <Input placeholder="Enter your email address" />
                        </Form.Item>

                        <Form.Item
                            name="qualification"
                            label="Highest Qualification"
                            rules={[
                                { required: true, message: "Please enter your qualification!" },
                                { min: 2, message: "Qualification must be at least 2 characters!" },
                                { max: 100, message: "Qualification cannot exceed 100 characters!" },
                                { pattern: /^[A-Za-z\s]+$/, message: "Qualification should only contain letters!" }
                            ]}
                        >
                            <Input placeholder="Enter your highest qualification" />
                        </Form.Item>

                        <Form.Item
                            name="passingYear"
                            label="Passing Year"
                            rules={[
                                { required: true, message: "Please enter your passing year!" },
                                { pattern: /^(19|20)\d{2}$/, message: "Enter a valid 4-digit year between 1900 and 2099!" }
                            ]}
                        >
                            <Input placeholder="Enter your passing year" maxLength={4} />
                        </Form.Item>

                        <Form.Item
                            name="currentCTC"
                            label="Current CTC (in INR)"
                            rules={[
                                { required: true, message: "Please enter your current CTC!" },
                                { pattern: /^[0-9]+$/, message: "CTC should only contain numbers!" },
                                {
                                    validator: (_, value) =>
                                        value && value < 100000000
                                            ? Promise.resolve()
                                            : Promise.reject("Enter a realistic CTC (less than 10 Cr)!")
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Enter your current CTC" />
                        </Form.Item>

                        <Form.Item
                            name="expectedCTC"
                            label="Expected CTC (in INR)"
                            rules={[
                                { required: true, message: "Please enter your expected CTC!" },
                                { pattern: /^[0-9]+$/, message: "CTC should only contain numbers!" },
                                {
                                    validator: (_, value) =>
                                        value && value < 100000000
                                            ? Promise.resolve()
                                            : Promise.reject("Enter a realistic expected CTC (less than 10 Cr)!")
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Enter your expected CTC" />
                        </Form.Item>

                        <Form.Item
                            name="permanentAddress"
                            label="Permanent Address"
                            rules={[
                                { required: true, message: "Please enter your permanent address!" },
                                { min: 10, message: "Address must be at least 10 characters long!" }
                            ]}
                        >
                            <Input.TextArea placeholder="Enter your permanent address" rows={3} />
                        </Form.Item>

                        <Form.Item
                            name="currentAddress"
                            label="Current Address"
                            rules={[
                                { required: true, message: "Please enter your current address!" },
                                { min: 10, message: "Address must be at least 10 characters long!" }
                            ]}
                        >
                            <Input.TextArea placeholder="Enter your current address" rows={3} />
                        </Form.Item>

                        <Form.Item
                            name="experience"
                            label="Total Years of Experience in Relevant Job Profile"
                            rules={[
                                { required: true, message: "Please enter your experience!" },
                                { pattern: /^[0-9]+$/, message: "Experience should only contain numbers!" },
                                {
                                    validator: (_, value) =>
                                        value >= 0 && value <= 50
                                            ? Promise.resolve()
                                            : Promise.reject("Enter a valid experience (0-50 years)!")
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Enter your total years of experience" />
                        </Form.Item>

                        <Form.Item
                            name="noticePeriod"
                            label="Notice Period with Current Employer (in days)"
                            rules={[
                                { required: true, message: "Please enter your notice period!" },
                                { pattern: /^[0-9]+$/, message: "Notice period should only contain numbers!" },
                                {
                                    validator: (_, value) =>
                                        value >= 0 && value <= 365
                                            ? Promise.resolve()
                                            : Promise.reject("Notice period must be between 0 and 365 days!")
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Enter your notice period in days" />
                        </Form.Item>

                        <Form.Item
                            name="resume"
                            label="Resume (PDF or DOCX only, Max 1MB)"
                            rules={[{ required: true, message: "Please upload your resume!" }]}
                        >
                            <Upload
                                accept=".pdf,.docx"
                                beforeUpload={() => false} // Prevent automatic upload
                                onChange={handleResumeChange}
                                showUploadList={true}
                                maxCount={1} // Ensures only one file is uploaded
                                onRemove={handleResumeRemove}
                            >
                                <Button>Click to Upload</Button>
                            </Upload>
                        </Form.Item>


                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Form.Item>
                                <Button className="AnimatedBtnContainer" id="AnimatedBtnContainer" htmlType="submit">
                                    Submit Application
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                </Modal>
            </section>
        </>
    )
}
export default Career