import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  location: string;
  rating: number;
  review: string;
  title: string;
  type: "text" | "video";
  videoUrl?: string;
  // Use a real image URL or import — falls back to initials avatar
  photo?: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sarah Thompson",
    designation: "Implantologist",
    location: "London, UK",
    rating: 5,
    title: "World-Class Training",
    review:
      "The Dental Academy transformed my clinical practice. The hands-on implant training was world-class, and the mentorship I received gave me the confidence to handle even the most complex cases.",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    avatar: "ST",
  },
  {
    id: 2,
    name: "Dr. Rajesh Patel",
    designation: "Prosthodontist",
    location: "Mumbai, India",
    rating: 5,
    title: "Excellent Program",
    review:
      "Enrolling in the advanced prosthodontics program was the best decision of my career. The digital workflow integration training alone was worth the investment. Highly recommend to any dental professional.",
    type: "text",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    avatar: "RP",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    designation: "General Dentist",
    location: "Sydney, Australia",
    rating: 5,
    title: "Life-Changing Experience",
    review:
      "As a general dentist looking to expand into implantology, the step-by-step curriculum was perfect. The live patient sessions gave me real-world experience I couldn't get anywhere else.",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    avatar: "EC",
  },
  {
    id: 4,
    name: "Dr. Mohammed Al-Rashid",
    designation: "Oral Surgeon",
    location: "Dubai, UAE",
    rating: 5,
    title: "Unmatched Expertise",
    review:
      "The faculty at Dental Academy are truly world-class. Their expertise in full-arch rehabilitation and zygomatic implants is unmatched. I returned to my practice with skills that set me apart.",
    type: "text",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    avatar: "MA",
  },
  {
    id: 5,
    name: "Dr. Lisa Müller",
    designation: "Periodontist",
    location: "Berlin, Germany",
    rating: 4,
    title: "Premium Learning Environment",
    review:
      "Exceptional training environment with cutting-edge technology. The simulation labs prepared me thoroughly before working with live patients. A premium experience from start to finish.",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    photo: "https://randomuser.me/api/portraits/women/90.jpg",
    avatar: "LM",
  },
  {
    id: 6,
    name: "Dr. James Okonkwo",
    designation: "Endodontist",
    location: "Lagos, Nigeria",
    rating: 5,
    title: "Revolutionary Techniques",
    review:
      "The Dental Academy's endodontics masterclass revolutionized my approach to complex root canal treatments. The microscope-guided techniques I learned have dramatically improved my success rates.",
    type: "text",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    avatar: "JO",
  },
];

/* ─── Design tokens (match screenshot exactly) ─── */
const G = {
  gold: "#C9A84C",
  goldDim: "rgba(201,168,76,0.25)",
  goldFaint: "rgba(201,168,76,0.08)",
  cardBg: "#181510",
  sectionBg: "#0e0c08",
  border: "#2c2510",
  borderHover: "#C9A84C",
  textHeading: "#ffffff",
  textBody: "#7a7060",
  textName: "#ffffff",
  textRole: "#C9A84C",
  divider: "rgba(201,168,76,0.18)",
};

/* ─── Gold star ─── */
const Star = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      d="M12 2l2.939 5.955 6.572.955-4.755 4.635 1.122 6.539L12 17.27l-5.878 3.814 1.122-6.539L2.489 8.91l6.572-.955L12 2z"
      fill={filled ? G.gold : "#2e2810"}
      stroke={filled ? G.gold : "#3a3215"}
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Quote SVG (matches screenshot — double-comma style) ─── */
const QuoteIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path
      d="M0 18V11C0 8 .7 5.6 2.1 3.8 3.5 1.9 5.6.7 8.4.3L9.2 2.4C7.4 2.9 6.1 3.7 5.2 4.8 4.3 5.9 3.9 7.3 3.9 9H8V18H0ZM12.8 18V11C12.8 8 13.5 5.6 14.9 3.8 16.3 1.9 18.4.7 21.2.3L22 2.4C20.2 2.9 18.9 3.7 18 4.8 17.1 5.9 16.7 7.3 16.7 9H20.8V18H12.8Z"
      fill={G.gold}
    />
  </svg>
);

/* ─── Avatar: photo with fallback initials ─── */
const Avatar = ({ photo, initials }: { photo?: string; initials: string }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      width: 46, height: 46,
      borderRadius: "50%",
      border: `1.5px solid ${G.goldDim}`,
      overflow: "hidden",
      flexShrink: 0,
      background: "#1e1a08",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {photo && !imgError ? (
        <img
          src={photo}
          alt={initials}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ color: G.gold, fontSize: 13, fontWeight: 700, fontFamily: "Georgia, serif" }}>
          {initials}
        </span>
      )}
    </div>
  );
};

/* ─── Video modal ─── */
const VideoModal = ({ url, onClose }: { url: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}
  >
    <motion.div
      initial={{ scale: 0.93, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.93, opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%", maxWidth: 820,
        aspectRatio: "16/9",
        background: "#000",
        border: `1px solid ${G.goldDim}`,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 12, right: 12, zIndex: 10,
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(0,0,0,0.7)",
          border: `1px solid ${G.goldDim}`,
          color: G.gold,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <X size={15} />
      </button>
      <iframe
        src={url + "?autoplay=1&rel=0"}
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Video testimonial"
      />
    </motion.div>
  </motion.div>
);

/* ─── Single card ─── */
const TestimonialCard = ({
  t,
  onPlay,
}: {
  t: Testimonial;
  onPlay: (url: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: G.cardBg,
        border: `1px solid ${hovered ? G.borderHover : G.border}`,
        borderRadius: 6,
        padding: "28px 26px 24px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? `0 0 24px rgba(201,168,76,0.12), 0 8px 40px rgba(0,0,0,0.6)`
          : "0 4px 20px rgba(0,0,0,0.5)",
        height: 480,
      }}
    >
      {/* Subtle top gold shimmer on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${G.gold}, transparent)`
          : "transparent",
        transition: "background 0.4s ease",
      }} />

      {/* Row 1: Quote circle + Stars */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        {/* Quote icon circle */}
        <div style={{
          width: 48, height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2a2210, #1a1508)",
          border: `1px solid ${hovered ? G.gold : "#3a2e14"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 0.3s",
        }}>
          <QuoteIcon />
        </div>

        {/* Stars */}
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < t.rating} />
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        color: "rgb(201, 168, 76)",
        fontSize: 17,
        fontWeight: 700,
        fontFamily: "Georgia, serif",
        marginBottom: 12,
        lineHeight: 1.35,
        letterSpacing: "0.01em",
      }}>
        "{t.title}"
      </h3>

      {/* Review body */}
      <p style={{
        color: "#ffffff",
        fontSize: 14,
        lineHeight: 1.82,
        fontFamily: "Georgia, serif",
        marginBottom: 20,
        flex: 1,
      }}>
        {t.review}
      </p>

      {/* Video play button */}
      {t.type === "video" && t.videoUrl && (
        <button
          onClick={() => onPlay(t.videoUrl!)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: 20,
            color: G.gold,
            fontSize: 13,
            fontFamily: "Georgia, serif",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{
            width: 32, height: 32,
            borderRadius: "50%",
            border: `1px solid ${G.gold}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}>
            <Play style={{ width: 12, height: 12, fill: G.gold, color: G.gold, marginLeft: 2 }} />
          </span>
          Watch Video Review
        </button>
      )}

      {/* Divider */}
      <div style={{
        height: 1,
        background: G.divider,
        marginBottom: 18,
      }} />

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <Avatar photo={t.photo} initials={t.avatar} />
        <div>
          <p style={{
            color: G.textName,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            lineHeight: 1.3,
            marginBottom: 3,
          }}>
            {t.name}
          </p>
          <p style={{
            color: G.textRole,
            fontSize: 12,
            fontFamily: "Georgia, serif",
            letterSpacing: "0.02em",
          }}>
            {t.designation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Section ─── */
const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background: G.sectionBg,
        padding: "24px 0 32px",
        fontFamily: "Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
      className="md:py-[48px] md:pb-[56px]"
    >
      {/* Background radial glow */}
      <div style={{
        position: "absolute",
        top: "10%", left: "50%",
        transform: "translate(-50%, 0)",
        width: 700, height: 300,
        background: `radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 16px", position: "relative" }} className="md:px-6">

        {/* ── Section Header ── */}
        <motion.div
          style={{ textAlign: "center", marginBottom: 40 }}
          className="md:mb-[60px]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2.5 }}
        >
          {/* Ornamental gold rule */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10, marginBottom: 18,
          }}>
            <div style={{ height: 1, width: 56, background: `linear-gradient(to right, transparent, ${G.gold})` }} />
            <div style={{ width: 5, height: 5, background: G.gold, transform: "rotate(45deg)" }} />
            <div style={{ height: 1, width: 56, background: `linear-gradient(to left, transparent, ${G.gold})` }} />
          </div>

          <p style={{
            color: G.gold,
            fontSize: 10.5,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Student Testimonials
          </p>

          <h2 style={{
            color: "#f5ecd8",
            fontSize: "clamp(22px, 3.8vw, 44px)",
            fontWeight: 700,
            letterSpacing: "0.01em",
            marginBottom: 14,
            lineHeight: 1.2,
          }}>
            Voices of Excellence
          </h2>

          <p style={{
            color: "#c9a84c",
            fontSize: 14.5,
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.75,
          }}>
            Hear from dental professionals who have transformed their careers
            through our world-class training programs.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div style={{ position: 'relative' }}>
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            style={{
              display: "flex",
              gap: 16,
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: 8,
            }}
            className="md:gap-[22px]"
          >
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 3, delay: index * 0.3, ease: [0.2, 0, 0, 1] }}
                style={{
                  minWidth: 300,
                  maxWidth: 300,
                  flexShrink: 0,
                }}
                className="md:min-w-[360px] md:max-w-[360px]"
              >
                <TestimonialCard t={t} onPlay={setActiveVideo} />
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex"
              style={{
                position: 'absolute',
                left: -16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1px solid ${G.gold}`,
                background: G.cardBg,
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                color: G.gold,
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex"
              style={{
                position: 'absolute',
                right: -16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1px solid ${G.gold}`,
                background: G.cardBg,
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                color: G.gold,
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
