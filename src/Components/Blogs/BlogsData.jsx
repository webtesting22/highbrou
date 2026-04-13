/**
 * Static blog posts. Spandrel article is rendered by SpandrelBeamArticle.jsx (React-only).
 */
const BlogsData = [
  {
    id: 1,
    slug: "smarter-spandrel-beam-design",
    title: "Safe to Calculate. A Nightmare to Build.",
    subtitle:
      "A structurally correct design that cannot be built is not really a solution. Here is how we learned to solve both problems at once — and what it means for your project.",
    /** Original publication / listing year (matches article © 2025) */
    date: "2025",
    category: "Structural Engineering · Case Study",
    excerpt:
      "Imagine receiving structural drawings where one beam calls for 14 diagonal reinforcement bars — all criss-crossing inside a single concrete beam. Your formwork team stares at the cage of steel and wonders how they are supposed to pour concrete through it.",
    coverImage:
      "/blog-assets/Conventional diagonally reinforced spandrel beams.png",
    authors: [
      {
        name: "Hiba Farook Ayar",
        linkedinUrl: "https://www.linkedin.com/in/hiba-farook-ayar-95793a217",
      },
      {
        name: "Maria Momin",
        linkedinUrl: null,
      },
    ],
  },
];

export default BlogsData;
