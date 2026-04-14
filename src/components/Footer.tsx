import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import dentalLogo from "@/assets/dental-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background" id="contact">
      <div className="da-container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src={dentalLogo} alt="Kings Dental Academy" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-display text-xl font-bold text-primary">Kings Dental Academy</p>
              <p className="text-sm text-muted-foreground">Advanced clinical education for dentists</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Hands-on dental training programs, mentorship, and continuing education designed to help clinicians grow with confidence.
          </p>
        </div>

        <div>
          <p className="mb-4 font-display text-xl font-semibold text-foreground">Quick Links</p>
          <div className="grid gap-2 text-sm">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">Home</Link>
            <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">About</Link>
            <Link to="/programs" className="text-muted-foreground transition-colors hover:text-primary">Programs</Link>
            <Link to="/gallery" className="text-muted-foreground transition-colors hover:text-primary">Gallery</Link>
            <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 font-display text-xl font-semibold text-foreground">Contact</p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <span>Promenade Road, Cantonment, Tiruchirappalli, Tamil Nadu</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 87789 51171</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@kingsdentalacademy.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Copyright {new Date().getFullYear()} Kings Dental Academy
      </div>
    </footer>
  );
};

export default Footer;
