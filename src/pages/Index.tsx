import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import apparelLogo from "@/assets/apparel_logo.png";
import heroCreative from "@/assets/hero_creative.png";
import simsLogo from "@/assets/sims_logo.png";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Side - Video/Image */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src={heroCreative}
          alt="OmniLens Dashboard"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end justify-start p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-heading text-4xl font-bold text-white drop-shadow-lg">
              OmniLens
            </h2>
            <p className="mt-2 text-sm text-white/60 font-medium">
              One lens. Every insight.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Sign In Content */}
      <div className="relative flex w-full flex-col items-center justify-center lg:w-1/2 bg-[hsl(0_0%_96%)]"
      >
        <div className="flex w-full max-w-[420px] flex-col items-center px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-10"
          >
            <img
              src={apparelLogo}
              alt="Apparel Group"
              className="h-28 w-auto"
            />
          </motion.div>

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full rounded-2xl border border-black/10 bg-white/70 p-10 shadow-xl backdrop-blur-md"
          >
            {/* Microsoft SSO Button */}
            <Button variant="premium" className="w-full" type="button">
              Sign in with Microsoft
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-black/50">
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
            className="mt-10 text-[0.7rem] text-black/40"
          >
            © 2026 Apparel Group | Powered by <img src={simsLogo} alt="SIMS" className="inline-block h-7 w-auto ml-1 align-middle" />
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Index;
