import React from "react";
import { Link } from "react-router-dom";
import "./SpandrelBeamArticle.css";

const IMG = {
  conventional:
    "/blog-assets/Conventional diagonally reinforced spandrel beams.png",
  embedded: "/blog-assets/Spandrel beams with embedded I-section.png",
  section:
    "/blog-assets/Section of the spandrel beams with embedded I-section.png",
};

/**
 * Client content for "Safe to Calculate. A Nightmare to Build." — rendered in React (no iframe).
 */
const SpandrelBeamArticle = ({ post }) => {
  const authors = post?.authors || [];

  const renderAuthors = () => {
    if (!authors.length) return null;
    const nodes = [];
    authors.forEach((a, i) => {
      if (i > 0) nodes.push(" & ");
      if (a.linkedinUrl) {
        nodes.push(
          <a
            key={a.name}
            href={a.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {a.name}
          </a>
        );
      } else {
        nodes.push(<span key={a.name}>{a.name}</span>);
      }
    });
    return (
      <>
        {nodes} · Highbrou Engineering · Case Study
      </>
    );
  };

  return (
    <div className="spandrelArticleRoot">
      <section className="sa-hero">
        <div className="sa-heroInner">
          <div className="sa-heroTag">
            Structural Engineering · Project Insight
          </div>
          <h1>
            Safe to Calculate.
            <br />
            <em>A Nightmare to Build.</em>
          </h1>
          <p className="sa-heroDeck">
            A structurally correct design that cannot be built is not really a
            solution. Here is how we learned to solve both problems at once —
            and what it means for your project.
          </p>
          <div className="sa-heroMeta">
            By {renderAuthors()}
          </div>
        </div>
      </section>

      <article className="sa-article">
        <p>
          Imagine receiving a set of structural drawings and discovering that
          one of the beams calls for{" "}
          <strong>14 diagonal reinforcement bars</strong> — all
          criss-crossing inside a single concrete beam the width of your
          forearm. Your formwork team stares at the cage of steel and wonders
          how on earth they are supposed to pour concrete through it.
        </p>
        <p>
          This was the exact situation we faced on a recent project. The beams
          in question were spandrel beams — the structural members that span
          between columns at the edge of a floor, often carrying significant
          loads from above. When those loads are heavy enough, standard
          structural codes require a specific solution: diagonal reinforcement.
          It works. It is safe. And on paper, it looks perfectly reasonable.
        </p>
        <p>On site, it is a different story entirely.</p>

        <hr className="sa-divider" />

        <h2>The problem with &quot;structurally correct&quot;</h2>
        <p>
          Structural engineering is often evaluated on one metric: does it carry
          the load? Codes are met, calculations check out, drawings are issued.
          But there is a second question that deserves equal weight — can it
          actually be built, well, by real people on a real site?
        </p>
        <p>
          Dense reinforcement creates a cascade of site problems that rarely
          show up in the engineer&apos;s office. Bars placed too close together
          prevent concrete from flowing freely, creating voids and weak spots
          inside the finished beam. Workers struggle to align and tie dozens of
          bars in a confined space, slowing the entire programme. Quality
          control becomes difficult. And when concrete cannot be properly
          vibrated around a cage of steel, the structure you pour may not be
          the structure you designed.
        </p>

        <div className="sa-pullQuote">
          <p>
            &quot;A beam that looks right on a drawing but cannot be built
            correctly is not a safe beam — it is a problem waiting to be
            discovered.&quot;
          </p>
        </div>

        <p>
          In our project, the conventional diagonal reinforcement solution for a
          few beams resulted in exactly this scenario. It required 14 diagonal
          bars at 100mm spacing, doubled. Several other beams were similarly
          congested. The site team flagged the concern early, and instead of
          simply saying &quot;it meets code, proceed,&quot; we listened.
        </p>

        <hr className="sa-divider" />

        <div className="sa-infographic">
          <div className="sa-infographicTitle">
            Before &amp; After — The Design Transformation
          </div>
          <div className="sa-baGrid">
            <div className="sa-baCol before">
              <div className="sa-baColHeader">
                <div className="sa-baColIcon" aria-hidden>
                  <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line
                      x1="2"
                      y1="2"
                      x2="11"
                      y2="11"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="11"
                      y1="2"
                      x2="2"
                      y2="11"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="sa-baColLabel">Conventional Design</div>
                  <div className="sa-baColSub">Diagonal reinforcement only</div>
                </div>
              </div>
              <div className="sa-baDrawing">
                <img src={encodeURI(IMG.conventional)} alt="" loading="lazy" />
              </div>
              <div className="sa-baItems">
                {[
                  "14–16 diagonal bars inside a single beam — dense and difficult to tie",
                  "Concrete cannot flow freely through the congested cage",
                  "High risk of voids, honeycombing, and poor compaction",
                  "Slow, labour-intensive installation on site",
                  "Quality control is nearly impossible to verify",
                ].map((text) => (
                  <div className="sa-baItem" key={text}>
                    <div className="sa-baDot">✕</div>
                    <div>{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sa-baCol after">
              <div className="sa-baColHeader">
                <div className="sa-baColIcon" aria-hidden>
                  <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline
                      points="2,7 5,10 11,3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  <div className="sa-baColLabel">Revised Design</div>
                  <div className="sa-baColSub">
                    Embedded ISMB 150 steel section
                  </div>
                </div>
              </div>
              <div className="sa-baDrawing">
                <img src={encodeURI(IMG.embedded)} alt="" loading="lazy" />
              </div>
              <div className="sa-baItems">
                {[
                  "ISMB 150 steel I-section carries a major share of the load",
                  "Reinforcement reduced dramatically — cage is clean and open",
                  "Concrete pours and compacts properly around the section",
                  "Faster, more straightforward installation for the site team",
                  "Same structural safety — zero compromise on load capacity",
                ].map((text) => (
                  <div className="sa-baItem" key={text}>
                    <div className="sa-baDot">✓</div>
                    <div>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="sa-divider" />

        <h2>Section detail</h2>
        <p>
          Composite spandrel section with embedded steel and rationalised
          reinforcement (illustrative).
        </p>
        <figure className="sa-sectionFigure">
          <img
            src={encodeURI(IMG.section)}
            alt="Section of spandrel beams with embedded I-section"
            loading="lazy"
          />
        </figure>

        <hr className="sa-divider" />

        <h2>Rethinking the solution from the ground up</h2>
        <p>
          We did not simply reduce the number of bars and hope for the best.
          That would have been irresponsible. Instead, we went back to first
          principles: what forces are these beams actually carrying, and what is
          the most efficient way to resist them — both structurally and
          practically?
        </p>
        <p>
          The answer we arrived at was a hybrid design. By embedding a standard
          rolled steel I-section — an ISMB 150 — within the concrete beam, the
          steel member could take on a substantial portion of the force demand.
          This is not a novel concept in structural engineering, but applying it
          thoughtfully in this context required careful analysis to ensure the
          steel and concrete work together correctly, that connections are
          properly detailed, and that nothing is sacrificed in terms of safety.
        </p>
        <p>
          The result was a beam that still comfortably carries every load it
          needs to — but one that a contractor can actually build with
          confidence. The ISMB 150 sections were positioned 1,000mm either side
          of the support, the remaining reinforcement was rationalised, and the
          beam cage became something a site team could assemble, check, and pour
          concrete through without heroic effort.
        </p>

        <div className="sa-process">
          {[
            {
              n: "1",
              t: "Site team raised the concern",
              p: "Instead of proceeding with a code-compliant but difficult design, the construction team flagged the congestion issue early. We listened and took it seriously.",
            },
            {
              n: "2",
              t: "Back to first principles",
              p: "We re-evaluated what forces the beam was actually resisting and asked: what is the most efficient structural system that can be built reliably on site?",
            },
            {
              n: "3",
              t: "Hybrid steel-concrete solution developed",
              p: "An ISMB 150 steel section was embedded within the beam, taking on a major share of the force demand and allowing significant reduction in reinforcement.",
            },
            {
              n: "4",
              t: "Structural safety verified and drawings revised",
              p: "The revised design was fully analysed to confirm it carries the required loads. New drawings were issued and the site team could proceed with confidence.",
            },
          ].map((step) => (
            <div className="sa-processStep" key={step.n}>
              <div className="sa-stepNum">{step.n}</div>
              <div className="sa-stepContent">
                <h3>{step.t}</h3>
                <p>{step.p}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="sa-divider" />

        <h2>What this means in practice — for you</h2>
        <p>
          If you are a contractor or developer, the implications are
          straightforward. Design decisions made in an engineering office have a
          direct effect on your programme, your costs, and your risk profile on
          site.
        </p>
        <p>
          Congested reinforcement means slower pours, more labour hours, a
          higher chance of rework if concrete quality is found to be inadequate,
          and more time spent on site supervision. These costs are real — and
          they are rarely accounted for in the original contract sum, because
          they emerge during execution rather than during design.
        </p>

        <div className="sa-stats">
          <div className="sa-statCard">
            <div className="sa-statNum">14 → 8</div>
            <div className="sa-statLabel">
              Diagonal bars reduced in beam B53
            </div>
          </div>
          <div className="sa-statCard">
            <div className="sa-statNum">12 → 6</div>
            <div className="sa-statLabel">
              Diagonal bars reduced in beam B54
            </div>
          </div>
          <div className="sa-statCard">
            <div className="sa-statNum">Zero</div>
            <div className="sa-statLabel">
              Compromise on structural safety or load capacity
            </div>
          </div>
        </div>

        <p>
          An engineer who thinks only about the calculation — and not about the
          people who will build what they design — creates risk that gets
          transferred down the chain to the contractor. At best, this means
          difficult conversations during construction. At worst, it means
          structural defects that only become apparent much later.
        </p>

        <div className="sa-pullQuote">
          <p>
            &quot;Good structural engineering is invisible. You do not notice it
            because the building goes up smoothly, on time, without
            incident.&quot;
          </p>
        </div>

        <p>
          The hybrid beam solution we developed was not just a technical
          achievement. It was a decision to take responsibility for what happens
          on site, not just what appears on a drawing.
        </p>

        <hr className="sa-divider" />

        <h2>Is your project facing a similar challenge?</h2>
        <p>
          Spandrel beams with heavy loads are one scenario. But the same
          principle — that buildability and structural integrity must be designed
          together, not traded off against each other — applies across a wide
          range of structural challenges. Transfer beams, deep coupling beams,
          heavily loaded connections, tight floor-to-floor heights where
          conventional solutions simply do not fit.
        </p>
        <p>
          If you are in the early stages of a project and concerned about how the
          structure will behave on site, or if you are already in construction
          and encountering problems with a design that looks right but is proving
          difficult to execute, there is usually a smarter path forward. It
          requires an engineer who is willing to ask a different question — not
          just &quot;does it work?&quot; but &quot;can it be built?&quot;
        </p>
        <p>
          That is the kind of engineering we practise at Highbrou.
        </p>

        <div className="sa-cta">
          <h2>Facing a difficult structural problem?</h2>
          <p>
            Whether you are a contractor dealing with congested reinforcement, a
            developer planning a complex building, or a project manager looking
            to de-risk your structure — we would be glad to hear from you. We
            bring structural rigour and site practicality to the same
            conversation.
          </p>
          <Link to="/contact" className="sa-ctaBtn">
            Talk to our team →
          </Link>
        </div>

        <p className="sa-articleFooter">
          © 2025 Highbrou Engineering · Precision Structural Solutions ·{" "}
          <a href="https://www.highbrou.com">www.highbrou.com</a>
        </p>
      </article>
    </div>
  );
};

export default SpandrelBeamArticle;
