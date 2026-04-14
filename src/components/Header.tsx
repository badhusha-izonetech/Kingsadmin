import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, UserCircle, X } from "lucide-react";
import dentalLogo from "@/assets/dental-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Faculty", to: "/faculty" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
  { label: "Achievements", to: "/achievements" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="da-container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={dentalLogo} alt="Kings Dental Academy" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
          <div>
            <p className="font-display text-lg font-bold leading-none text-primary sm:text-2xl">
              Kings Dental Academy
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
              Empower Smiles Through Knowledge
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary lg:flex"
          >
            <UserCircle className="h-4 w-4" />
            Admin
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-full p-2 text-foreground transition-colors hover:bg-secondary hover:text-primary lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-card lg:hidden">
          <div className="da-container py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                navigate("/admin/login");
              }}
              className="mt-2 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <UserCircle className="h-4 w-4" />
              Admin Login
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
