import React from "react";
import { Row, Col } from "antd";
import "./SectorsWeServer.css"
import BUILDINGEXCELLENCE from "./BUILDINGEXCELLENCE.svg"
import INDUSTRIALFACILITY from "./INDUSTRIALFACILITY.svg"
import METALBUILDING from "./METALBUILDING.svg"
import OILANDGASEXCELLENCE from "./OILANDGASEXCELLENCE.svg"
import QUALITYRESOURCING from "./QUALITYRESOURCING.svg"
import CONNECTINGTHEWORLD from "./CONNECTINGTHEWORLD.svg"
const SectorsWeServe = () => {

    const SectorsCardsData = [
        {
            title: "BUILDING EXCELLENCE",
            icon:BUILDINGEXCELLENCE,
            tagline: "From residences to high-rise commercial structures."
        },
        {
            title: "INDUSTRIAL FACILITY",
            icon:INDUSTRIALFACILITY,
            tagline: "Structuring spaces for optimized industrial operations."
        },
        {
            title: "PRE-ENGINEERED METAL BUILDING",
            icon:METALBUILDING,
            tagline: "Modern and efficient modular designer."
        },
        {
            title: "CONNECTING THE WORLD",
            icon:CONNECTINGTHEWORLD,
            tagline: "Infrastructure that supports essential energy services."
        },
        {
            title: "OIL AND GAS EXCELLENCE",
            icon:OILANDGASEXCELLENCE,
            tagline: "From residential to high-rise commercial structures."
        },
        {
            title: "QUALITY RESOURCING",
            icon:QUALITYRESOURCING,
            tagline: "The tiny ship today stiller.",
        }
    ]
    return (
        <>
            <section id="SectorsWeServeContainer">
                <div className="SectorsWeServeContentContainer sectionPadding">
                    <div className="HeaderContainerWhatWeDo">
                        <span>SECTORS WE SERVE</span>
                        <h2>CRAFTING EXCELLENCE ACROSS DIVERSE SECTORS</h2>
                    </div>
                    <div className="RowAdjustBorder">
                        <Row>
                            {SectorsCardsData.map((item, index) => (
                                <Col lg={8} md={12} style={{ width: "100%" }} key={index}>
                                    <div className="sectorsCardsContainer">
                                       <div>
                                       <img src={item.icon} alt="" />
                                        <h2>{item.title}</h2>
                                        <p>{item.tagline}</p>
                                       </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </section>
        </>
    )
}
export default SectorsWeServe