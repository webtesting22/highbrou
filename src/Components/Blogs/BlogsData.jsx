/**
 * Static blog posts. Add new entries here; list and detail pages read from this array.
 */
const BlogsData = [
  {
    id: 1,
    slug: "smarter-spandrel-beam-design",
    title:
      "Smarter Spandrel Beam Design – Blending Structural Safety with Site Practicality",
    date: "February 2026",
    category: "Structural Engineering",
    excerpt:
      "In one of our recent projects, we were tasked with designing spandrel beams subjected to heavy loads. The conventional solution required diagonally reinforced beams — but execution on site became a real challenge.",
    coverImage: "/Images/ProjectsImages/SKYLIGHTROOF1.png",
    images: [
      "/blog-assets/Conventional diagonally reinforced spandrel beams.png",
      "/blog-assets/Spandrel beams with embedded I-section.png",
      "/blog-assets/Section of the spandrel beams with embedded I-section.png",
    ],
    imageCaptions: [
      "Conventional diagonally reinforced spandrel beams (B53 / B54) — dense diagonal reinforcement for shear and torsion.",
      "Spandrel beams with embedded I-section (ISMB 150) — hybrid steel–concrete approach along the beam.",
      "Section detail — composite section with embedded I-section and reduced bar congestion.",
    ],
    sections: [
      {
        heading: "The Challenge",
        body:
          "In one of our recent projects, we were tasked with designing spandrel beams subjected to heavy loads. The conventional solution required diagonally reinforced beams to safely resist the forces. However, in several locations, this resulted in as many as 14 diagonal reinforcement bars within a single beam. While structurally sound, this approach created significant execution challenges on site. The dense reinforcement made placement, alignment, and concreting extremely difficult for the construction team.",
      },
      {
        heading: "What We Did Differently",
        body:
          "Instead of insisting on the standard solution, we stepped back and re-evaluated the problem from both a structural and constructability perspective. After internal brainstorming and technical evaluation, we developed an alternative solution: embedding an I-section steel member within the spandrel beam. This hybrid approach allowed the steel section to take a significant portion of the force demand, reducing reinforcement congestion while maintaining structural safety and performance.",
      },
      {
        heading: "The Outcome",
        body:
          "The revised design ensured the beam remained fully capable of carrying the required loads, while dramatically improving site feasibility. Reinforcement congestion was minimised, installation became more practical, and construction efficiency improved — without compromising safety or design intent.",
      },
    ],
  },
];

export default BlogsData;
