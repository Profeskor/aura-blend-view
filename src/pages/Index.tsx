import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import apparelLogo from "@/assets/apparel_logo.png";
import heroCreative from "@/assets/hero_creative.png";
import simsLogo from "@/assets/sims_logo.png";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Side - Video/Image */}
      <div className="relative hidden w-1/2 lg:block overflow-hidden">
        <motion.img
          src={heroCreative}
          alt="OmniLens Dashboard"
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />

        {/* Animated light sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
        />

        {/* Floating bokeh particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: [6, 10, 4, 8, 5][i],
              height: [6, 10, 4, 8, 5][i],
              background: `rgba(255,255,255,${[0.15, 0.1, 0.2, 0.08, 0.12][i]})`,
              left: `${[15, 40, 70, 25, 60][i]}%`,
              top: `${[20, 50, 30, 70, 80][i]}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, [10, -15, 8, -10, 12][i], 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: [5, 7, 4, 6, 8][i],
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}

        {/* Vignette overlay */}
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
              <span className="ml-3 align-middle rounded-md bg-white/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-white/80">
                Beta
              </span>
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
            className="w-full rounded-2xl border border-black/8 bg-white p-10 shadow-lg"
          >
            {/* Microsoft SSO Button */}
            <Button variant="premium" className="w-full" type="button" onClick={() => navigate("/dashboard")}>
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
