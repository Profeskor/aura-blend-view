import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import apparelLogo from "@/assets/apparel_logo.jpg";

const Index = () => {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-background">
      {/* Full-screen Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          style={{
            filter: "hue-rotate(190deg) saturate(1.5) brightness(0.6) contrast(1.1)",
            background: "linear-gradient(135deg, hsl(var(--primary-navy)), hsl(var(--primary-green)))",
          }}
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,32,128,0.55), rgba(16,32,128,0.35)), radial-gradient(circle, transparent 22%, rgba(0,0,0,0.88) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <img
            src={apparelLogo}
            alt="Apparel Group"
            className="h-32 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          />
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card w-full max-w-[420px] p-10"
        >
          {/* Card Header */}
          <div className="mb-8 text-center">
            <h1 className="font-heading text-[2.5rem] font-bold leading-tight tracking-tight bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              One lens. Every insight.
            </h1>
          </div>

          {/* Microsoft SSO Button */}
          <Button variant="premium" className="w-full" type="button">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
              <path d="M11 0H0V11H11V0Z" fill="#F25022" />
              <path d="M23 0H12V11H23V0Z" fill="#7FBA00" />
              <path d="M11 12H0V23H11V12Z" fill="#00A4EF" />
              <path d="M23 12H12V23H23V12Z" fill="#FFB900" />
            </svg>
            Sign in with Microsoft
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Access is managed by your organization.
            <br />
            Contact IT Admin if you need assistance.
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 text-[0.7rem] text-muted-foreground/50"
        >
          © 2026 Apparel Group | Powered by AI
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
