import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CommonTopBannerDynamic from "../CommonTopBanner/CommonTopBannerDynamic";
import BlogsData from "./BlogsData";
import SpandrelBeamArticle from "./SpandrelBeamArticle";
import "./SingleBlog.css";

const DOC_TITLE = "Highbrou Engineering | Precision Structural Solutions";

const SingleBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = BlogsData.find((b) => b.slug === slug);
    setPost(found || null);
  }, [slug]);

  useEffect(() => {
    if (!post?.title) return;
    document.title = `${post.title} | Highbrou Engineering`;
    return () => {
      document.title = DOC_TITLE;
    };
  }, [post?.title]);

  const handleBack = () => navigate("/blog");

  if (!post) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Blog post not found</h2>
        <Button type="primary" onClick={handleBack} style={{ marginTop: 16 }}>
          Back to Blog
        </Button>
      </div>
    );
  }

  if (slug === "smarter-spandrel-beam-design") {
    return (
      <>
        <div className="sectionPadding" style={{ paddingBottom: 0 }}>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            style={{ paddingLeft: 0, color: "#2989bc", marginBottom: 8 }}
          >
            Back to Blog
          </Button>
        </div>
        <SpandrelBeamArticle key={slug} post={post} />
        <div className="sectionPadding" style={{ paddingTop: 24 }}>
          <Link to="/blog" style={{ color: "#2989bc" }}>
            ← All articles
          </Link>
        </div>
      </>
    );
  }

  const captions = post.imageCaptions || [];

  return (
    <>
      <CommonTopBannerDynamic
        heading={post.category}
        subheading={post.title}
        image="/Images/ProjectsTopBanner.jpg"
      />
      <section id="SingleBlogContainer" className="sectionPadding">
        <div className="SingleBlogInner">
          <div className="SingleBlogBack">
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              style={{ paddingLeft: 0, color: "#2989bc" }}
            >
              Back to Blog
            </Button>
          </div>

          <div className="SingleBlogMeta">
            <span className="SingleBlogCategory">{post.category}</span>
            <span className="SingleBlogDate">{post.date}</span>
          </div>

          <h1 className="SingleBlogTitle">{post.title}</h1>

          {post.sections?.map((section) => (
            <div className="SingleBlogSection" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}

          {Array.isArray(post.images) && post.images.length > 0 && (
            <div className="SingleBlogFigures">
              <h3>Technical illustrations</h3>
              {post.images.map((src, index) => (
                <figure className="SingleBlogFigure" key={src}>
                  <img
                    src={encodeURI(src)}
                    alt={captions[index] || `Diagram ${index + 1}`}
                    loading="lazy"
                  />
                  {captions[index] && (
                    <figcaption className="SingleBlogCaption">
                      {captions[index]}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          <div style={{ marginTop: 40 }}>
            <Link to="/blog">← All articles</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlog;
