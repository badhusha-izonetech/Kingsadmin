import trainingImg from "@/assets/training.jpg";

const InfoSection = () => {
  return (
    <section className="da-section" id="about">
      <div className="da-container grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">About Us</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            A focused academy for practical, modern dental learning
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Kings Dental Academy supports clinicians through structured dental education, live demonstrations, and hands-on practice designed to close the gap between theory and confident execution.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="font-display text-xl font-semibold text-primary">Vision</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Build confident dentists through accessible, practice-ready training.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="font-display text-xl font-semibold text-primary">Mission</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Deliver meaningful dental upskilling through mentorship, technology, and repetition.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
          <img src={trainingImg} alt="Dental academy training session" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
