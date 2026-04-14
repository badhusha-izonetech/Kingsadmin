import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-dental.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Dental training" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="da-container relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">Clinical Excellence Starts Here</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            Practical dental training built for real clinical confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Learn from experienced mentors, explore focused dental programs, and build skills you can use immediately in practice.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Explore Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Academy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
