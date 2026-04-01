import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import apparelLogo from "@/assets/apparel_logo.jpg";

const Index = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left: Video Section */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block bg-[hsl(220,30%,5%)]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="https://videos.pexels.com/video-files/6963744/6963744-uhd_2732_1440_25fps.mp4"
        />
        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, hsla(220,30%,5%,0.15) 2px, hsla(220,30%,5%,0.15) 4px)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[hsl(220,30%,5%)] via-transparent to-[hsl(225,65%,52%,0.12)]" />
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(225,65%,52%) 1px, transparent 1px), linear-gradient(90deg, hsl(225,65%,52%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-16 left-12 right-12 z-20"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-4 h-[2px] bg-primary"
          />
          <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight text-primary-foreground">
            Welcome to{" "}
            <span className="text-primary">AGLens</span>.
          </h2>
          <p className="mt-4 max-w-md font-mono text-xs uppercase tracking-[0.2em] leading-relaxed text-primary-foreground/50">
            Apparel Group's unified retail intelligence platform — driving
            sharper decisions across every brand, store, and market.
          </p>
        </motion.div>
      </div>

      {/* Right: Login Form */}
      <div className="flex w-full items-center justify-center bg-muted/30 px-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card w-full max-w-md p-10"
        >
          <div className="mb-8">
            <div className="mb-6">
              <img src={apparelLogo} alt="Apparel Group" className="h-24 w-auto" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              One lens. Every insight.
            </h1>
          </div>

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

          <p className="mt-8 text-center text-xs text-muted-foreground">
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
