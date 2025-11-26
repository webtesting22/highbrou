import React, { useState, useEffect } from "react";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import { Row, Col, Modal, Form, Input, Select, Button, message, Tag, Upload, notification } from "antd";
import { MdOutlineArrowRight } from "react-icons/md";
import { FaCalendar, FaCopy } from "react-icons/fa";
import Topback from "./Topback.jpeg"
import "./Careers.css"
const { Option } = Select;
const Career = () => {
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [form] = Form.useForm();
    const [resumeLink, setResumeLink] = useState(null);
    const apibaseUrl = import.meta.env.VITE_BASE_URL;

    // Function to create URL slug from job title
    const createJobSlug = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    // Function to find job by slug
    const findJobBySlug = (slug) => {
        return CareerPostData.find(job => createJobSlug(job.postTitle) === slug);
    };

    // Function to copy job link to clipboard
    const copyJobLink = async () => {
        if (!selectedPost) return;

        const jobSlug = createJobSlug(selectedPost.postTitle);
        const currentUrl = window.location.origin + window.location.pathname;
        const jobUrl = `${currentUrl}?job=${jobSlug}`;

        try {
            await navigator.clipboard.writeText(jobUrl);
            message.success('Job link copied to clipboard!');
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = jobUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            message.success('Job link copied to clipboard!');
        }
    };

    // Check URL parameters on component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const jobSlug = urlParams.get('job');

        if (jobSlug) {
            const job = findJobBySlug(jobSlug);
            if (job) {
                setSelectedPost(job);
                setIsDescriptionModalOpen(true);
            }
        }

        window.scrollTo(0, 0);
    }, []);

    const handleResumeChange = async (info) => {
        if (!info.file) return;

        try {
            const file = info.file;
            const fileType = file.type;

            // Request upload policy from the backend
            const response = await fetch(`${apibaseUrl}/chats/uploadPolicy`, {
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
            jobPosition: values.jobPosition,
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
            const response = await fetch(`${apibaseUrl}/highbrou/addJobApplication`, {
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
            postTitle: "Business Development Manager",
            postDate: "12 Jul, 2025",
            location: "Dubai (Full-time)",
            jobtype: [
                "Full-time"
            ],
            jobdescription: <>
                <div>
                    <p><b>Location:</b> Dubai (Full-time)</p>
                    <p><b>Employment Type:</b> Full-time</p>
                    <p><b>Experience Level:</b> Senior (5+ years)</p>
                    <p><b>Industry:</b> Structural Engineering / Construction Services</p>
                    <div>
                        <p><b>About Highbrou Engineering:</b></p>
                        <p>Highbrou Engineering is a leading Dubai-based structural consulting firm collaborating with top-tier developers, architects, and EPC contractors. We deliver innovative framing systems, sustainable solutions, and material-optimization strategies that drive cost savings, expedite schedules, and expand design freedom. Our marquee portfolio includes premium residential towers, commercial landmarks, and critical infrastructure across Dubai and the MENA region.</p>
                        <p><b>Role Overview:</b></p>
                        <p>We’re seeking an accomplished Business Development Manager who already excels in structural engineering sales and possesses an extensive, Dubai-based professional network. You will own strategic market engagement, forge high-value partnerships, and consistently achieve the highest sales conversion rates.</p>

                        <p><b>Key Responsibilities:</b></p>
                        <ul>
                            <li><b>Strategic Prospecting & Pipeline Ownership:</b> Leverage your established contacts—developers, architects, contractors—to generate high-quality leads. Independently qualify and prioritize opportunities to maintain a robust, predictable sales funnel.</li>
                            <li><b>Relationship Leadership:</b> Act as the principal ambassador for Highbrou, fostering deep, trust-based relationships at C-level and project leadership levels. Cultivate repeat business and referrals through proactive client engagement and service excellence.</li>
                            <li><b>High-Impact Presentations & Proposals:</b> Architect persuasive, technically rigorous proposals in collaboration with engineering teams. Present tailored solutions that highlight Highbrou’s proven track record in cost savings, buildability, and innovation.</li>
                            <li><b>Top-Tier Negotiation & Deal Closing:</b> Drive complex negotiations on scope, pricing, and contract terms to secure profitable, long-term engagements. Consistently exceed monthly, quarterly, and annual revenue targets.</li>
                            <li><b>Market Intelligence & Advisory:</b> Monitor market dynamics, competitor strategies, and regulatory shifts; translate insights into actionable growth initiatives. Advise executive leadership on emerging opportunities and risk mitigation.</li>
                            <li><b>Performance Metrics & Reporting:</b> Maintain real-time visibility into your pipeline and sales performance using company CRM. Report on key metrics—conversion rates, average deal size, sales cycle efficiency, and revenue attainment.</li>
                        </ul>

                        <p><b>Qualifications & Skills:</b></p>
                        <ul>
                            <li>Bachelor’s or Master’s degree in Engineering, Business Administration, or related field.</li>
                            <li>8+ years of progressive business development or sales leadership experience in structural engineering or related consulting services.</li>
                            <li>Proven top-tier sales conversion record—evidence of outperforming peers and industry benchmarks.</li>
                            <li>Deep-rooted professional network within Dubai’s real estate and construction ecosystem.</li>
                            <li>Exceptional negotiation, communication, and executive-level presentation skills.</li>
                            <li>Autonomous, results-driven, and accustomed to operating in a goal-oriented, high-accountability environment.</li>
                            <li>Proficiency with CRM systems (Zoho CRM, Salesforce, etc) and LinkedIn Sales Navigator.</li>
                        </ul>

                        <p><b>Compensation & Benefits:</b></p>
                        <ul>
                            <li>Competitive base salary, aligned with senior market benchmarks.</li>
                            <li>Lucrative commission structure with uncapped earnings tied to performance.</li>
                            <li>Opportunity to lead strategic growth initiatives and influence company direction.</li>
                            <li>Access to marquee project engagements and a collaborative leadership team.</li>
                        </ul>

                        {/* <p><b>How to Apply:</b></p>
                        <p>If you’re a results-oriented sales leader with a commanding presence in Mumbai’s structural engineering market, we want to hear from you.<br />
                            Apply on our website career page: <a href="https://www.highbrou.com">www.highbrou.com</a></p> */}
                    </div>
                </div>
            </>
        },
        {
            postTitle: "Design Engineer - BIM Structures",
            postDate: "12 Mar, 2025",
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
            postDate: "12 Mar, 2025",
            location: "Mumbai Metropolitan Region",
            jobtype: [
                "Remote", "Full-time"
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
                            <li>Experience with International projects (specifically UAE & Gulf) is required with strong knowledge and hands on experience with American and Euro codes</li>
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
            postDate: "12 Mar, 2025",
            location: "Mumbai Metropolitan Region",
            jobtype: [
                "Remote", "Full-time"
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
        },
        {
            postTitle: "Lead Structural Engineer",
            postDate: "28 Apr, 2025",
            location: "Mumbai, India (Hybrid: Remote with on-site client meetings as needed)",
            jobtype: [
                "Remote", "Full-time"
            ],
            jobdescription: <>
                <div>
                    <p><b>About Highbrou Engineering Pvt. Ltd.:</b></p>
                    <p>Highbrou Engineering Pvt. Ltd., based in Mumbai, is a leading structural consultancy delivering innovative, efficient, and code-compliant solutions across high-rise buildings, industrial, and infrastructure sectors. We seamlessly integrate advanced technologies with traditional engineering excellence to stay ahead globally.</p>
                    <p><b>Roles & Responsibilities:</b></p>
                    <p><b>Structural Design & Analysis:</b></p>
                    <ul>
                        <li>Lead design of diverse structures ensuring safety, stability, and compliance with IS, BS, ACI, and Eurocodes.
                        </li>
                        <li>⁠Execute detailed analysis using ETABS, STAAD.Pro, SAFE, Revit; handle foundation and superstructure designs for concrete and steel structures.
                        </li>
                        <li> ⁠Interpret geotechnical reports for design parameters; optimize loads, seismic, and wind loading schemes.
                        </li>
                        <li>  ⁠Specialize in large-span, pre-cast, post-tensioned, and RCC structures with strong lateral stability understanding.
                        </li>
                        <li>Apply advanced simulations to predict structural behavior, incorporating parametric and generative design methods.
                        </li>
                    </ul>
                    <p><b>Project Leadership:
                    </b></p>
                    <ul>
                        <li>Manage multiple projects, ensuring adherence to timelines, budgets, and quality.</li>
                        <li>Coordinate with architects, MEP consultants, and contractors for smooth project delivery.</li>
                        <li>Review design outputs and mentor junior engineers and drafters.</li>
                    </ul>
                    <p><b>Client Engagement:
                    </b></p>
                    <ul>
                        <li>⁠Act as the technical face for client interactions and project presentations.
                        </li>
                        <li>Attend meetings, gather client requirements, and propose effective structural solutions.</li>
                    </ul>
                    <p><b>Quality Assurance & Compliance:</b></p>
                    <ul>
                        <li>⁠Implement rigorous quality checks and ensure full compliance with relevant codes and international standards.</li>
                        <li>Review, approve, and oversee design documentation before delivery.</li>
                    </ul>
                    <p><b>Innovation & Continuous Improvement:</b></p>
                    <ul>
                        <li>⁠Stay updated with the latest trends and tools in engineering innovation.</li>
                        <li>Introduce and implement new technologies like BIM workflows, generative designs, and sustainability practices.</li>
                    </ul>
                    <p><b>Documentation & Reporting:</b></p>
                    <ul>
                        <li>Prepare comprehensive design reports, technical specifications, and project proposals.</li>
                        <li>Maintain organized records for project submissions and internal use.</li>
                    </ul>
                    <p><b>Qualifications & Eligibility:</b></p>
                    <ul>
                        <li>⁠Master’s degree in Structural Engineering (mandatory).</li>
                        <li>12+ years’ experience in structural design with leadership roles in reputed MNCs.</li>
                        <li>⁠Experience with international codes, sustainable design, and green building certifications.</li>
                        <li>⁠Proficiency in ETABS, STAAD.Pro, SAFE, Revit; knowledge of Grasshopper, Rhino, Dynamo is a plus.</li>
                        <li>Strong grasp of BIM processes and multidisciplinary coordination.
                        </li>
                        <li>Excellent leadership, communication, and decision-making skills.</li>
                        <li>Exposure to full project delivery cycles is essential.</li>
                    </ul>
                    <p><b>Company Benefits & Offerings:</b></p>
                    <ul>
                        <li>Work Flexibility: Hybrid setup with remote working and site visits as needed.
                        </li>
                        <li>Professional Growth: Continuous learning programs, mentorship, and leadership opportunities.
                        </li>
                        <li>Compensation: Competitive salary with performance-linked incentives and annual bonuses.
                        </li>
                        <li>Work Culture: Inclusive, collaborative environment with innovation-driven practices.
                        </li>
                        <li>Work-Life Balance: 5-day workweek supporting personal and professional wellbeing.</li>
                    </ul>
                </div>
            </>
        },
        {
            postTitle: "Trainee Engineer — Structural Design",
            postDate: "29 Sep, 2025",
            location: "Mumbai Metropolitan Region (Remote-first; occasional site/office visits)",
            jobtype: [
                "Remote", "Full-time"
            ],
            jobdescription: <>
                <div>
                    <p><b>Location:</b> Mumbai Metropolitan Region (Remote-first; occasional site/office visits)</p>
                    <p><b>Employment Type:</b> Full-time — remote with periodic on-site/client interactions</p>
                    <div>
                        <p><b>About Highbrou Engineering</b></p>
                        <p>Highbrou Engineering is a Mumbai-based structural consulting firm delivering value-focused, buildable structural solutions for developers, architects and contractors. We work on residential, commercial and tall-building projects across India and in international markets.</p>
                        
                        <p><b>Role Summary</b></p>
                        <p>We are hiring a Trainee Engineer — Structural Design. This is an entry-level technical role for candidates who hold a Master's degree in Structural Engineering (M.Tech / M.E. in Structures). Fresh Master's and candidates with up to 1 year of professional experience are encouraged to apply. This role focuses on hands-on learning in structural modelling, analysis, computational methods and drawing production while working closely with senior engineers.</p>

                        <p><b>Key Responsibilities:</b></p>
                        <ul>
                            <li>Assist in building and updating structural models in ETABS / SAFE / STAAD.Pro and similar tools under supervision.</li>
                            <li>Perform basic design calculations and checks (RCC & steel) and prepare calculation sheets for review.</li>
                            <li>Prepare parts of design reports, specification notes and deliverable packages.</li>
                            <li>Produce and update drawings and mark-ups in AutoCAD / Revit; support BIM coordination and model version control.</li>
                            <li>Learn and apply computational engineering workflows (scripting, parametric design, automation) to streamline modelling and repetitive calculations.</li>
                            <li>Support integration of computation outputs into design checks and reports.</li>
                            <li>Participate in internal learning sessions, design reviews and client/architect coordination (normally with a senior present).</li>
                            <li>Follow QA/QC checklists and implement senior feedback to improve deliverables.</li>
                            <li>Maintain organised project documentation and file structures.</li>
                        </ul>

                        <p><b>Essential Qualifications & Skills:</b></p>
                        <ul>
                            <li>Master's degree (M.Tech / M.E.) in Structural Engineering — applications from other disciplines will not be considered. Fresh graduates or candidates with up to 1 year of experience are encouraged to apply.</li>
                            <li>Strong fundamentals in RCC and steel structural behaviour and design concepts.</li>
                            <li>Basic or beginner proficiency (hands-on or coursework) with structural software: ETABS, SAFE, STAAD.Pro, AutoCAD, Revit, ROBOT Structural Analysis, Tekla Structures (any combination — familiarity is acceptable).</li>
                            <li>Basic programming / computational skills: familiarity or coursework experience in one or more of C, C#, C++, Python, Grasshopper, Dynamo or similar tools.</li>
                            <li>A clear keen interest in computational engineering as applied to structural design — automation, scripts, parametric modelling and algorithmic problem solving.</li>
                            <li>Problem-solving orientation — able to reason through design challenges, propose constructive alternatives and not just perform routine calculations.</li>
                            <li>Good numerical aptitude, attention to detail and clear written & verbal communication in English.</li>
                            <li>Reliable home workstation (PC/laptop) and professional workspace with stable internet.</li>
                        </ul>

                        <p><b>Desirable (Accelerates Onboarding):</b></p>
                        <ul>
                            <li>Course projects or miniprojects demonstrating scripts or parametric models (Python, Grasshopper, Dynamo, or similar).</li>
                            <li>Any exposure to international codes or project workflows (Gulf/UAE) is a plus.</li>
                            <li>A short portfolio with model screenshots, one sample calculation and/or a small script that automates a calculation is helpful.</li>
                        </ul>

                        <p><b>Location & Work Mode:</b></p>
                        <ul>
                            <li>Remote-first role aligned with Highbrou's work-from-home policy.</li>
                            <li>Candidate must own a computer, meeting company configuration requirements (specs to be shared during interview).</li>
                            <li>Occasional site visits or in-person meetings in Mumbai (or abroad) may be required depending on project needs.</li>
                        </ul>

                        <p><b>Assessment & Selection Process:</b></p>
                        <ul>
                            <li>Short online screening (MCQ + short modelling or calculation task).</li>
                            <li>Practical short take-home task that may include: a basic modelling screenshot, a simple hand calculation, and a short coding/computation snippet or explanation of an algorithmic approach (to assess computational interest).</li>
                            <li>Technical interview with senior engineers (includes problem-solving scenarios, software demonstration and discussion of any computational work submitted).</li>
                            <li>HR / culture-fit discussion.</li>
                        </ul>

                        <p><b>Compensation & Learning Support:</b></p>
                        <ul>
                            <li>Competitive salary commensurate with qualifications and experience.</li>
                            <li>Structured mentorship, regular technical reviews and access to internal training sessions focused on both conventional structural design and computational engineering.</li>
                            <li>Support for skill development and practical exposure to modern workflows (scripting, BIM integration, automation).</li>
                        </ul>

                        <p><b>How to Apply:</b></p>
                        <p>Send your CV and a short portfolio (model screenshots, one sample calculation and/or a brief code/script example) to the email or apply via the job portal. Applications that do not include a Master's in Structural Engineering will not be considered.</p>
                    </div>
                </div>
            </>
        },


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

        // Update URL without refreshing the page
        const jobSlug = createJobSlug(post.postTitle);
        const newUrl = `${window.location.pathname}?job=${jobSlug}`;
        window.history.pushState({}, '', newUrl);
    };

    const openApplyModal = () => {
        setIsDescriptionModalOpen(false);
        setIsApplyModalOpen(true);

    };

    const handleCancel = () => {
        setIsDescriptionModalOpen(false);
        setIsApplyModalOpen(false);
        form.resetFields();

        // Clear URL parameters when closing modal
        const newUrl = window.location.pathname;
        window.history.pushState({}, '', newUrl);
    };

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
                        {CareerPostData
                            .sort((a, b) => {
                                // Parse dates and sort by latest first
                                const dateA = new Date(a.postDate);
                                const dateB = new Date(b.postDate);
                                return dateB - dateA; // Latest first
                            })
                            .map((item, index) => (
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
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{selectedPost?.postTitle || ""}</span>
                            <Button
                                type="text"
                                icon={<FaCopy />}
                                onClick={copyJobLink}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                Copy Link
                            </Button>
                        </div>
                    }
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
                            name="jobPosition"
                            label="Job Position"
                            rules={[{ required: true, message: "Please select a job position!" }]}
                        >
                            <Select placeholder="Select a job position">
                                {CareerPostData.map((job) => (
                                    <Option key={job.postTitle} value={job.postTitle}>
                                        {job.postTitle}
                                    </Option>
                                ))}
                            </Select>
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
                            label={selectedPost?.location === "Dubai (Full-time)" ? "Current Annual CTC (in AED)" : "Current Annual CTC (in INR Lakhs)"}
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
                            <Input type="number" placeholder="eg. 3,80,0000" />
                        </Form.Item>

                        <Form.Item
                            name="expectedCTC"
                            label={selectedPost?.location === "Dubai (Full-time)" ? "Expected Annual CTC (in AED)" : "Expected Annual CTC (in INR Lakhs)"}
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
                            <Input type="number" placeholder="eg. 3,80,0000" />
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