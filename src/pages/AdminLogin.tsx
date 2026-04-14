import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, User, Lock, ArrowLeft } from "lucide-react";
import dentalLogo from "@/assets/dental-logo.png";
import { Link } from "react-router-dom";


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate frontend-only login
    setTimeout(() => {
      localStorage.setItem("adminToken", "frontend-demo-token-" + Date.now());
      navigate("/admin/dashboard");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-[440px] animate-in fade-in zoom-in-95 duration-500">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-bold text-sm uppercase tracking-widest group"
        >
          <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to website
        </Link>
        <div className="bg-card border border-border shadow-2xl rounded-[32px] overflow-hidden">

          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-[28px] flex items-center justify-center mb-6 border border-primary/20">
                <img src={dentalLogo} alt="Logo" className="w-12 h-12" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-primary tracking-tight mb-2">
                Admin Panel
              </h1>
              <p className="text-muted-foreground font-semibold text-sm">
                Dental Academy Management System
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Username
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                   <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-12 h-14 rounded-2xl border-[#c9a84c]/30 !bg-[#1a150e] text-white focus:!bg-[#1a150e] focus:border-[#c9a84c] transition-all [&:-webkit-autofill]:shadow-[0_0_0_1000px_#1a150e_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                   <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-12 h-14 rounded-2xl border-[#c9a84c]/30 !bg-[#1a150e] text-white focus:!bg-[#1a150e] focus:border-[#c9a84c] transition-all [&:-webkit-autofill]:shadow-[0_0_0_1000px_#1a150e_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-primary text-primary-foreground font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex gap-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Login to Dashboard
                  </>
                )}
              </Button>

              <div className="pt-4 text-center">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                  Secure Institutional Access
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Front-End Demo Mode Active
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
