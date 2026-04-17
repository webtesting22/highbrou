import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { RightOutlined } from "@ant-design/icons";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import BlogsData from "./BlogsData";
import "./BlogList.css";

const BlogList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sortedPosts = useMemo(
    () => [...BlogsData].sort((a, b) => b.id - a.id),
    [],
  );

  return (
    <>
      <section id="BlogPageContainer">
        <CommonTopBannerDynamic
          heading="Blog"
          subheading="Insights from our engineering practice"
          image="/Images/ProjectsTopBanner.jpg"
        />
        <div className="sectionPadding" style={{ position: "relative" }}>
          <h2 className="BlogSectionHeading">Articles</h2>
          <div className="BlogMainContainer">
            <div className="BlogGrid">
              <Row gutter={[24, 24]}>
                {sortedPosts.map((post) => (
                  <Col lg={8} md={12} sm={24} xs={24} key={post.id}>
                    <Link
                      to={`/blog/${post.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <article className="BlogCard">
                        <div className="BlogCardImageContainer">
                          <img
                            src={encodeURI(post.coverImage)}
                            alt=""
                            loading="lazy"
                            className="BlogCardImage"
                          />
                        </div>
                        <div className="BlogCardBody">
                          <div className="BlogCardMeta">
                            <span className="BlogCardCategory">
                              {post.category}
                            </span>
                            <span className="BlogCardDate">{post.date}</span>
                          </div>
                          <h3 className="BlogCardTitle">{post.title}</h3>
                          <p className="BlogCardExcerpt">{post.excerpt}</p>
                          <span className="BlogCardLink">
                            Read more <RightOutlined />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
