import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import apparelLogo from "@/assets/apparel_logo.jpg";
import cyborgHero from "@/assets/cyborg_hero.jpg";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left: Cyborg Hero */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img
          src={cyborgHero}
          alt="AGLens Intelligence"
          className="absolute inset-0 h-full w-full object-cover"
          width={1024}
          height={1440}
        />
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,4%)] via-transparent to-[hsl(222,30%,4%,0.4)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(222,30%,4%,0.6)]" />

        {/* Apparel Group logo top-left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute left-10 top-10 z-20"
        >
          <img src={apparelLogo} alt="Apparel Group" className="h-14 w-auto brightness-200 invert" />
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-12 left-10 right-10 z-20"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-4 h-[2px]"
            style={{ background: "linear-gradient(90deg, hsl(185, 80%, 55%), hsl(260, 60%, 58%))" }}
          />
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white/90">
            Welcome to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(185, 80%, 55%), hsl(260, 60%, 58%))" }}
            >
              AGLens
            </span>
            .
          </h2>
          <p className="mt-3 max-w-sm font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed text-white/40">
            Apparel Group's unified retail intelligence platform — driving
            sharper decisions across every brand, store, and market.
          </p>
        </motion.div>
      </div>

      {/* Right: Login */}
      <div className="relative flex w-full items-center justify-center px-6 lg:w-1/2">
        {/* Bokeh / glow effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[hsl(185,80%,55%,0.08)] blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[hsl(260,60%,58%,0.08)] blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md rounded-2xl border border-border/50 bg-card p-10 shadow-xl"
        >

          <div className="mb-10 text-center">
            <h1
              className="font-heading text-4xl font-bold italic bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(225, 65%, 52%), hsl(260, 60%, 58%))" }}
            >
              AGLens
            </h1>
            <p className="mt-1 text-sm tracking-widest text-muted-foreground">
              Merchandising Intelligence
            </p>
          </div>

          <Button
            variant="premium"
            className="w-full h-12 text-sm font-semibold"
            type="button"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
              <path d="M11 0H0V11H11V0Z" fill="#F25022" />
              <path d="M23 0H12V11H23V0Z" fill="#7FBA00" />
              <path d="M11 12H0V23H11V12Z" fill="#00A4EF" />
              <path d="M23 12H12V23H23V12Z" fill="#FFB900" />
            </svg>
            Sign in with Microsoft
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="mt-8 text-center text-[11px] text-muted-foreground">
            Access is managed by your organization.
            <br />
            Contact IT Admin if you need assistance.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
