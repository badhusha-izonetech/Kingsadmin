const stats = [
  { value: "1500+", label: "Doctors Trained" },
  { value: "10+", label: "Years Experience" },
  { value: "40+", label: "Hands-On Workshops" },
  { value: "95%", label: "Learner Satisfaction" },
];

const StateSection = () => {
  return (
    <section className="da-section bg-card/40">
      <div className="da-container">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">At A Glance</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Outcomes that reflect real training impact
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
              <p className="font-display text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StateSection;
