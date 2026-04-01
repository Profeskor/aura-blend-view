import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import apparelLogo from "@/assets/apparel_logo.jpg";
import cyborgHero from "@/assets/cyborg_hero.jpg";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left: Animated Hero */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden lg:flex bg-background">
        {/* Subtle gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />

        {/* Animated floating image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center px-12"
        >
          <motion.img
            src={cyborgHero}
            alt="AGLens Intelligence"
            className="h-[420px] w-auto rounded-3xl object-cover shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            width={1024}
            height={1440}
          />

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <img src={apparelLogo} alt="Apparel Group" className="mx-auto mb-5 h-12 w-auto" />
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Welcome to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(225, 65%, 52%), hsl(260, 60%, 58%))" }}
              >
                AGLens
              </span>
            </h2>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Apparel Group's unified retail intelligence platform — driving
              sharper decisions across every brand, store, and market.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="hidden w-px bg-border lg:block" />

      {/* Right: Login */}
      <div className="relative flex w-full items-center justify-center px-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
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
