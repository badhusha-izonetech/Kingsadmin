import { useParams, Link } from "react-router-dom";
import { announcements } from "@/data/announcement";
import Header from "@/components/Header";
import { ArrowLeft, Calendar } from "lucide-react";

const AnnouncementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const announcement = announcements.find((a) => a.id === Number(id));

  if (!announcement) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-primary mb-4">Announcement Not Found</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 animate-fade-in">
      {/* Banner */}
      <div className="w-full h-48 sm:h-64 md:h-80 bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-center">
        <div className="text-center px-4">
          <span className="uppercase tracking-[0.3em] text-xs text-primary/60">Announcement</span>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-16 pb-20 max-w-3xl">
        <article className="bg-card border border-primary/10 rounded-lg p-8 sm:p-12 shadow-card">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight mb-6">
            {announcement.title}
          </h1>

          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8 pb-8 border-b border-primary/10">
            <Calendar className="w-4 h-4 text-primary/60" />
            <time>{announcement.date}</time>
          </div>

          <div className="text-foreground/80 leading-relaxed text-base sm:text-lg space-y-4">
            <p>{announcement.description}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-primary/10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 rounded text-primary text-sm uppercase tracking-widest hover:bg-primary/10 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </article>
      </div>
    </main>
  );

};

export default AnnouncementDetail;
