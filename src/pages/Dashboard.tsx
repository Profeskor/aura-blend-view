import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, Globe, Lock } from "lucide-react";
import apparelLogo from "@/assets/apparel_logo.png";
import simsLogo from "@/assets/sims_logo.png";

const modules = [
  {
    title: "Scenario Planner",
    icon: BarChart3,
    comingSoon: false,
    path: "/scenario-planner",
  },
  {
    title: "Customer360",
    icon: Users,
    comingSoon: true,
  },
  {
    title: "Brand Insights",
    icon: TrendingUp,
    comingSoon: true,
  },
  {
    title: "Country Insights",
    icon: Globe,
    comingSoon: true,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-muted/50">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-border bg-background px-8 py-3">
        <div className="flex items-center gap-3">
          <img src={apparelLogo} alt="Apparel Group" className="h-10 w-auto" />
          <span className="text-lg font-heading font-semibold text-foreground tracking-tight">
            OmniLens
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
            U
          </div>
        </div>
      </header>

      {/* Module Grid */}
      <main className="mx-auto max-w-5xl px-8 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-heading text-2xl font-semibold text-foreground"
        >
          Modules
        </motion.h1>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md ${
                  mod.comingSoon
                    ? "cursor-default opacity-60"
                    : "cursor-pointer"
                }`}
              >
                {mod.comingSoon && (
                  <span className="absolute right-3 top-3">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                )}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {mod.title}
                </span>
                {mod.comingSoon && (
                  <span className="mt-1.5 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    Coming Soon
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-4 text-center text-[0.7rem] text-muted-foreground">
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
