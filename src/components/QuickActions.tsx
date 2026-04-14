import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const programs = [
  {
    id: "fellowships",
    title: "Fellowship Programs",
    description: "Structured long-form clinical learning with mentor support and practical exposure.",
    highlights: ["Clinical mentorship", "Hands-on training", "Career-oriented modules"],
  },
  {
    id: "masterships",
    title: "Mastership Programs",
    description: "Focused upskilling tracks for dentists who want deeper procedural confidence.",
    highlights: ["Advanced workflows", "Live demonstrations", "Small cohort learning"],
  },
  {
    id: "shortcourse",
    title: "Short Courses",
    description: "Compact modules for busy professionals who want targeted learning outcomes.",
    highlights: ["Weekend-friendly", "Skill refreshers", "Immediate practical value"],
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <section className="da-section" id="our-programs">
      <div className="da-container">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Programs</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Choose the learning path that fits your practice
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/programs")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all programs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <article key={program.id} className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Kings Dental Academy</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{program.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{program.description}</p>
              <div className="mt-6 space-y-3">
                {program.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="rounded-full bg-primary/10 p-1 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    {highlight}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => navigate(`/programs/${program.id}`)}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
