import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    Award,
    BookOpenCheck,
    Building2,
    FlaskConical,
    Globe,
    GraduationCap,
    Hospital,
    Medal,
    Microscope,
    Star,
    Stethoscope,
    TrendingUp,
    Trophy,
    Users,
    ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

type CounterStat = {
    icon: LucideIcon;
    label: string;
    target: number;
    suffix: string;
};

const keyStats: CounterStat[] = [
    { icon: TrendingUp, label: "Placement Rate", target: 90, suffix: "%" },
    { icon: Stethoscope, label: "Successful Procedures", target: 10000, suffix: "+" },
    { icon: BookOpenCheck, label: "Clinical Sessions", target: 500, suffix: "+" },
    { icon: Users, label: "Doctors Trained", target: 1200, suffix: "+" },
    { icon: Hospital, label: "Partner Clinics", target: 80, suffix: "+" },
];

const timelineEvents = [
    {
        year: "2024",
        icon: Trophy,
        title: "Best Dental Training Institute Award",
        description: "Recognized nationally for excellence in advanced dental training and student outcomes.",
    },
    {
        year: "2023",
        icon: GraduationCap,
        title: "300 Students Successfully Graduated",
        description: "A strong graduating batch with placements and clinical readiness across top practices.",
    },
    {
        year: "2022",
        icon: Globe,
        title: "Hosted International Dental Conference",
        description: "Brought together global speakers and clinicians for live demonstrations and knowledge exchange.",
    },
];

const awardBatches = [
    {
        title: "MOI Training Batches",
        icon: Trophy,
        batches: ["Batch 2024", "Batch 2023"],
    },
    {
        title: " IDA Certified Batches",
        icon: Medal,
        batches: ["Batch 2024", "Batch 2023"],
    },
];

const certifications = [
    "Recognized by Dental Council",
    "ISO Certified Training Institute",
    "Affiliated with reputed universities",
];

const placementStats: CounterStat[] = [
    { icon: TrendingUp, label: "Placement Rate", target: 90, suffix: "%" },
    { icon: Hospital, label: "Top Hospital Placements", target: 240, suffix: "+" },
    { icon: Building2, label: "Successful Private Clinics", target: 160, suffix: "+" },
];

const placementHighlights = [
    "Alumni working in top dental hospitals",
    "Graduates running successful clinics",
    "Career support with interview prep and referrals",
];

const researchStats: CounterStat[] = [
    { icon: Microscope, label: "Research Papers", target: 48, suffix: "+" },
    { icon: FlaskConical, label: "Clinical Case Studies", target: 120, suffix: "+" },
    { icon: Globe, label: "Conference Presentations", target: 35, suffix: "+" },
];

const researchHighlights = [
    "Research papers published in international dental journals",
    "Faculty-student collaborations in implantology and prosthodontics",
    "Regular publication of clinical outcome reports",
];

const studentStats: CounterStat[] = [
    { icon: Award, label: "Research Competition Winners", target: 40, suffix: "+" },
    { icon: Hospital, label: "Students Placed in Top Hospitals", target: 300, suffix: "+" },
    { icon: Users, label: "Advanced Clinical Mentorship Picks", target: 85, suffix: "+" },
    { icon: BookOpenCheck, label: "Case Presentations by Students", target: 110, suffix: "+" },
];

const studentHighlights = [
    "Students who won research competitions",
    "Students placed in top hospitals or clinics",
    "Hands-on achievers selected for advanced clinical mentorship",
    "Students presenting cases in inter-college dental forums",
];

type AnimatedCounterProps = {
    end: number;
    suffix?: string;
    durationMs?: number;
};

const AnimatedCounter = ({ end, suffix = "", durationMs = 1500 }: AnimatedCounterProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const frameMs = 16;
        const totalFrames = Math.max(1, Math.round(durationMs / frameMs));
        const increment = end / totalFrames;

        const timer = window.setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                window.clearInterval(timer);
                return;
            }
            setCount(Math.floor(start));
        }, frameMs);

        return () => window.clearInterval(timer);
    }, [end, durationMs]);

    const formatted = useMemo(() => new Intl.NumberFormat("en-US").format(count), [count]);

    return (
        <span>
            {formatted}
            {suffix}
        </span>
    );
};

const useSectionInView = () => {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = ref.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
};

const StatCard = ({ icon: Icon, label, target, suffix, run }: CounterStat & { run: boolean }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 md:p-6 text-center shadow-[0_12px_40px_-22px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-gradient-to-br hover:from-amber-400/12 hover:via-amber-300/8 hover:to-transparent hover:shadow-[0_14px_34px_-18px_rgba(251,191,36,0.65)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-70" />
        <div className="mb-3 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon className="h-6 w-6 animate-pulse" />
            </div>
        </div>
        <p className="font-display text-3xl md:text-4xl font-bold text-primary">
            {run ? <AnimatedCounter end={target} suffix={suffix} /> : `0${suffix}`}
        </p>
        <p className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">{label}</p>
    </div>
);

const Achievements = () => {
    const heroStats = useSectionInView();
    const placementSection = useSectionInView();
    const researchSection = useSectionInView();
    const studentSection = useSectionInView();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section className="relative overflow-hidden py-12 border-b border-border bg-gradient-to-b from-background via-background to-muted/20">
                    <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-36 left-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="da-container relative">
                        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 font-body text-sm transition-colors group">
                            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Homepage
                        </Link>
                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-amber-400 leading-tight">
                            Achievements
                        </h1>
                        <p className="mt-3 text-lg md:text-xl font-medium text-foreground/85 max-w-3xl">
                            Awards, Outcomes, and Measurable Impact
                        </p>
                        <p className="mt-3 text-muted-foreground max-w-3xl">
                            A trust-first showcase of awards, certified batches, placements, publications, and student success.
                        </p>
                    </div>
                </section>

                <section ref={heroStats.ref} className="py-14 border-b border-border bg-muted/10">
                    <div className="da-container">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">Performance Snapshot</h2>
                        <p className="mt-2 text-muted-foreground">Animated highlights of academy outcomes and growth.</p>
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {keyStats.map((stat) => (
                                <StatCard key={stat.label} {...stat} run={heroStats.isVisible} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-14 border-b border-border">
                    <div className="da-container">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">Awards & Recognitions</h2>
                        <p className="mt-2 text-muted-foreground">Recognized batches with clear year-wise credentials.</p>
                        <div className="mt-6 grid md:grid-cols-2 gap-5">
                            {awardBatches.map((group) => {
                                const BatchIcon = group.icon;
                                return (
                                    <div
                                        key={group.title}
                                        className="group rounded-2xl border border-border/70 bg-card p-6 shadow-[0_8px_28px_-18px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="inline-flex rounded-full bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                            <BatchIcon className="h-6 w-6 animate-pulse" />
                                        </div>
                                        <h3 className="mt-3 text-lg font-semibold">{group.title}</h3>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {group.batches.map((batch) => (
                                                <span
                                                    key={batch}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                                >
                                                    <Star className="h-3.5 w-3.5" />
                                                    {batch}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="py-14 border-b border-border bg-muted/10">
                    <div className="da-container">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">Certifications & Accreditations</h2>
                        <p className="mt-2 text-muted-foreground">Important for institutional trust and credibility.</p>
                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                            {certifications.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-amber-400/35 bg-gradient-to-br from-amber-400/12 via-amber-300/8 to-transparent p-5 shadow-[0_12px_30px_-20px_rgba(251,191,36,0.65)]"
                                >
                                    <p className="font-medium text-amber-200">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={placementSection.ref} className="py-14 border-b border-border">
                    <div className="da-container">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">Placement & Career Success</h2>
                        <p className="mt-2 text-muted-foreground">Designed to attract and reassure career-focused students.</p>
                        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {placementStats.map((stat) => (
                                <StatCard key={stat.label} {...stat} run={placementSection.isVisible} />
                            ))}
                        </div>
                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                            {placementHighlights.map((item) => (
                                <div key={item} className="rounded-xl border border-border/70 bg-card p-5 shadow-sm">
                                    <p className="text-foreground">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={researchSection.ref} className="py-14 border-b border-border bg-muted/10">
                    <div className="da-container">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">Research & Publications</h2>
                        <p className="mt-2 text-muted-foreground">Academic contributions that strengthen clinical authority.</p>
                        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {researchStats.map((stat) => (
                                <StatCard key={stat.label} {...stat} run={researchSection.isVisible} />
                            ))}
                        </div>
                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                            {researchHighlights.map((item) => (
                                <div key={item} className="rounded-xl border border-border/70 bg-card p-5 shadow-sm">
                                    <p className="text-foreground">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={studentSection.ref} className="py-14 border-b border-border">
                    <div className="da-container">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">Student Achievements</h2>
                        <p className="mt-2 text-muted-foreground">Statistical outcomes highlighting student excellence.</p>
                        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {studentStats.map((stat) => (
                                <StatCard key={stat.label} {...stat} run={studentSection.isVisible} />
                            ))}
                        </div>
                        <div className="mt-6 grid md:grid-cols-2 gap-4">
                            {studentHighlights.map((item) => (
                                <div key={item} className="rounded-xl border border-border/70 bg-card p-5 shadow-sm">
                                    <p className="text-foreground">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="da-container">
                        <h2 className="font-display text-2xl md:text-3xl font-bold">Achievement Timeline</h2>
                        <p className="mt-2 text-muted-foreground">A quick look at milestone moments across recent years.</p>

                        <div className="relative mt-10">
                            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
                            <div className="absolute left-4 top-0 h-full w-px bg-border md:hidden" />

                            <div className="space-y-8 md:space-y-12">
                                {timelineEvents.map((event, index) => {
                                    const TimelineIcon = event.icon;
                                    return (
                                        <div key={event.year} className="relative grid md:grid-cols-2 md:gap-10 items-center">
                                            <div className={`md:px-10 ${index % 2 === 0 ? "md:order-1 md:text-right" : "md:order-2"}`}>
                                                <div className="ml-10 md:ml-0 rounded-2xl border border-amber-400/35 bg-gradient-to-br from-amber-400/12 via-amber-300/8 to-transparent p-5 shadow-[0_12px_30px_-20px_rgba(251,191,36,0.65)]">
                                                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{event.year}</p>
                                                    <h3 className="mt-2 text-lg md:text-xl font-semibold text-foreground">{event.title}</h3>
                                                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                                                </div>
                                            </div>

                                            <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} hidden md:block`} />

                                            <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
                                                    <TimelineIcon className="h-5 w-5 animate-pulse" aria-hidden="true" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Achievements;