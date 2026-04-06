import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, Globe, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apparelLogo from "@/assets/apparel_logo.png";
import simsLogo from "@/assets/sims_logo.png";

const modules = [
  {
    title: "Scenario Planner",
    description: "Model and compare business scenarios with real-time data simulations.",
    icon: BarChart3,
    comingSoon: false,
  },
  {
    title: "Customer360",
    description: "Unified customer profiles across all touchpoints and channels.",
    icon: Users,
    comingSoon: true,
  },
  {
    title: "Brand Insights",
    description: "Deep-dive analytics on brand performance and market positioning.",
    icon: TrendingUp,
    comingSoon: true,
  },
  {
    title: "Country Insights",
    description: "Geo-level intelligence across all operating markets.",
    icon: Globe,
    comingSoon: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(var(--foreground) / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Top Bar */}
      <header className="relative flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-8 py-3">
        <div className="flex items-center gap-3">
          <img src={apparelLogo} alt="Apparel Group" className="h-10 w-auto" />
          <div className="h-6 w-px bg-border" />
          <span className="text-lg font-heading font-semibold text-foreground tracking-tight">
            OmniLens
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Welcome back</span>
          <div className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center text-background text-xs font-semibold">
            U
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-5xl px-8 pt-20 pb-32">
        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h1 className="font-heading text-4xl font-bold text-foreground tracking-tight">
            What would you like to explore?
          </h1>
          <p className="mt-3 text-muted-foreground text-base">
            Select a module to get started
          </p>
        </motion.div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            const isActive = !mod.comingSoon;

            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                whileHover={isActive ? { y: -6, scale: 1.02 } : {}}
                className={`group relative flex flex-col items-start rounded-2xl border p-7 transition-all duration-300 min-h-[280px] ${
                  isActive
                    ? "cursor-pointer bg-card border-border hover:shadow-[0_20px_50px_-15px_hsl(var(--foreground)/0.12)]"
                    : "cursor-default bg-muted/20 border-dashed border-border/30"
                }`}
              >
                {/* Coming soon badge */}
                {mod.comingSoon && (
                  <div className="absolute right-4 top-4 rounded-md border border-border/40 bg-card px-2.5 py-1">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Soon
                    </span>
                  </div>
                )}

                {/* Icon */}
                <Icon className={`h-8 w-8 mb-auto ${isActive ? "text-foreground" : "text-muted-foreground/40"}`} strokeWidth={1.5} />

                {/* Title */}
                <h3 className={`text-lg font-heading font-semibold mt-6 ${isActive ? "text-foreground" : "text-muted-foreground/50"}`}>
                  {mod.title}
                </h3>

                {/* Description */}
                <p className={`mt-2 text-sm leading-relaxed ${isActive ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
                  {mod.description}
                </p>

                {/* Launch button for active modules */}
                {isActive && (
                  <motion.button
                    onClick={() => navigate("/scenario-planner")}
                    className="mt-6 flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Launch
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-5 text-center text-[0.7rem] text-muted-foreground">
        © 2026 Apparel Group | Powered by{" "}
        <img
          src={simsLogo}
          alt="SIMS"
          className="inline-block h-7 w-auto ml-1 align-middle"
        />
      </footer>
    </div>
  );
};

export default Dashboard;
