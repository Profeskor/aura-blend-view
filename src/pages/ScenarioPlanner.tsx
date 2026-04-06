import { useRef } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";
import {
  ChevronDown,
  Upload,
  LayoutGrid,
  Settings,
  Clock,
  Download,
  Copy,
  Sparkles,
  ArrowLeft,
  TriangleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import apparelLogo from "@/assets/apparel_logo.png";
import simsLogo from "@/assets/sims_logo.png";
import InsightsChatbot from "@/components/InsightsChatbot";

// --- Static Data ---

const kpiCards = [
  { label: "FY SALES", value: "6,410.0M", base: "Base: 7,603.4M", delta: "▼ -1,193.4M (-15.7%)", negative: true },
  { label: "FY GROSS PROFIT", value: "3,681.6M", base: "Base: 4,440.3M", delta: "▼ -758.7M (-17.1%)", negative: true },
  { label: "FY GP%", value: "57.4%", base: "Base: 58.4%", delta: "▼ -1.0pp", negative: true },
  { label: "FY CLOSING STOCK", value: "1,840.8M", base: "Base: 1,207.1M", delta: "▲ +633.7M (+52.5%)", negative: false },
  { label: "FY WEIGHTED AVG", value: "15.7%", base: "Blended across all brands", delta: "", negative: false },
];

const impactSummary = [
  { metric: "FY Sales", base: "7,603.4M", scenario: "6,410.0M", delta: "-1,193.4M", deltaPercent: "-15.7%", negative: true },
  { metric: "FY COGS", base: "3,163.1M", scenario: "2,728.4M", delta: "-434.8M", deltaPercent: "-13.7%", negative: true },
  { metric: "FY Gross Profit", base: "4,440.3M", scenario: "3,681.6M", delta: "-758.7M", deltaPercent: "-17.1%", negative: true },
  { metric: "FY GP%", base: "58.4%", scenario: "57.4%", delta: "-1.0pp", deltaPercent: "-1.6%", negative: true },
  { metric: "FY Inwards", base: "3,153.0M", scenario: "3,244.5M", delta: "+91.5M", deltaPercent: "+2.9%", negative: false },
  { metric: "FY Closing Stock", base: "1,207.1M", scenario: "1,840.8M", delta: "+633.7M", deltaPercent: "+52.5%", negative: false },
];

const seasonSummary = [
  { season: "SS", salesBase: "3,763.9M", salesScn: "2,987.3M", salesDelta: "-776.6M", salesDeltaPct: "-20.6%", gpBase: "2,213.2M", gpScn: "1,719.0M", gpPctBase: "58.8%", gpPctScn: "57.5%", inwardsBase: "1,690.2M" },
  { season: "FW", salesBase: "3,839.5M", salesScn: "3,422.7M", salesDelta: "-416.8M", salesDeltaPct: "-10.9%", gpBase: "2,227.1M", gpScn: "1,962.6M", gpPctBase: "58.0%", gpPctScn: "57.3%", inwardsBase: "1,462.8M" },
];

const monthlySalesData = [
  { month: "Jan", base: 532, scenario: 539, actual: 530 },
  { month: "Feb", base: 505, scenario: 459, actual: 500 },
  { month: "Mar", base: 831, scenario: 607, actual: 820 },
  { month: "Apr", base: 554, scenario: 387, actual: 0 },
  { month: "May", base: 705, scenario: 516, actual: 0 },
  { month: "Jun", base: 637, scenario: 479, actual: 0 },
  { month: "Jul", base: 615, scenario: 473, actual: 0 },
  { month: "Aug", base: 665, scenario: 523, actual: 0 },
];

const gpTrendData = [
  { month: "Jan", baseGP: 56.6, scenarioGP: 57.2 },
  { month: "Feb", baseGP: 59.4, scenarioGP: 58.8 },
  { month: "Mar", baseGP: 61.0, scenarioGP: 58.4 },
  { month: "Apr", baseGP: 57.8, scenarioGP: 56.2 },
  { month: "May", baseGP: 59.0, scenarioGP: 57.6 },
  { month: "Jun", baseGP: 57.9, scenarioGP: 56.6 },
  { month: "Jul", baseGP: 56.6, scenarioGP: 55.3 },
  { month: "Aug", baseGP: 58.9, scenarioGP: 57.7 },
];

const inventoryData = [
  { month: "Jan", baseStock: 1178, scenarioStock: 1270 },
  { month: "Feb", baseStock: 1250, scenarioStock: 1400 },
  { month: "Mar", baseStock: 1150, scenarioStock: 1500 },
  { month: "Apr", baseStock: 1350, scenarioStock: 1700 },
  { month: "May", baseStock: 1500, scenarioStock: 1900 },
  { month: "Jun", baseStock: 1600, scenarioStock: 2050 },
  { month: "Jul", baseStock: 1650, scenarioStock: 2100 },
  { month: "Aug", baseStock: 1700, scenarioStock: 2197 },
];

const inwardsData = [
  { month: "Jan", inwardsBase: 233, inwardsPlan: 300 },
  { month: "Feb", inwardsBase: 280, inwardsPlan: 350 },
  { month: "Mar", inwardsBase: 420, inwardsPlan: 533 },
  { month: "Apr", inwardsBase: 380, inwardsPlan: 400 },
  { month: "May", inwardsBase: 310, inwardsPlan: 280 },
  { month: "Jun", inwardsBase: 250, inwardsPlan: 230 },
  { month: "Jul", inwardsBase: 200, inwardsPlan: 180 },
  { month: "Aug", inwardsBase: 180, inwardsPlan: 170 },
];

const monthlyBreakdown = [
  { month: "Jan", salesBase: "532.0M", salesScn: "538.9M", salesDelta: "+6.9M", cogsBase: "231.0M", cogsScn: "230.6M", cogsDelta: "-356,669", gpBase: "301.1M", gpScn: "308.3M", gpDelta: "+7.3M" },
  { month: "Feb", salesBase: "505.2M", salesScn: "459.0M", salesDelta: "-46.2M", cogsBase: "205.0M", cogsScn: "189.0M", cogsDelta: "-16.0M", gpBase: "300.2M", gpScn: "270.0M", gpDelta: "-30.2M" },
  { month: "Mar", salesBase: "830.8M", salesScn: "607.2M", salesDelta: "-223.6M", cogsBase: "324.0M", cogsScn: "252.3M", cogsDelta: "-71.6M", gpBase: "506.8M", gpScn: "354.8M", gpDelta: "-152.0M" },
  { month: "Apr", salesBase: "553.7M", salesScn: "386.8M", salesDelta: "-167.0M", cogsBase: "233.5M", cogsScn: "169.5M", cogsDelta: "-64.0M", gpBase: "320.2M", gpScn: "217.2M", gpDelta: "-103.0M" },
  { month: "May", salesBase: "705.4M", salesScn: "516.0M", salesDelta: "-189.4M", cogsBase: "289.5M", cogsScn: "218.8M", cogsDelta: "-70.7M", gpBase: "415.9M", gpScn: "297.3M", gpDelta: "-118.6M" },
  { month: "Jun", salesBase: "636.7M", salesScn: "479.4M", salesDelta: "-157.4M", cogsBase: "267.7M", cogsScn: "208.0M", cogsDelta: "-59.7M", gpBase: "369.0M", gpScn: "271.4M", gpDelta: "-97.6M" },
  { month: "Jul", salesBase: "615.3M", salesScn: "472.6M", salesDelta: "-142.7M", cogsBase: "267.0M", cogsScn: "211.4M", cogsDelta: "-55.6M", gpBase: "348.3M", gpScn: "261.2M", gpDelta: "-87.1M" },
  { month: "Aug", salesBase: "665.4M", salesScn: "522.9M", salesDelta: "-142.6M", cogsBase: "273.9M", cogsScn: "221.2M", cogsDelta: "-52.7M", gpBase: "391.6M", gpScn: "301.7M", gpDelta: "-89.9M" },
  { month: "Sep", salesBase: "512.4M", salesScn: "432.5M", salesDelta: "-79.9M", cogsBase: "213.2M", cogsScn: "185.8M", cogsDelta: "-27.4M", gpBase: "299.2M", gpScn: "246.7M", gpDelta: "-52.5M" },
  { month: "Oct", salesBase: "534.2M", salesScn: "482.5M", salesDelta: "-51.7M", cogsBase: "216.9M", cogsScn: "199.4M", cogsDelta: "-17.6M", gpBase: "317.3M", gpScn: "283.1M", gpDelta: "-34.1M" },
  { month: "Nov", salesBase: "740.3M", salesScn: "740.3M", salesDelta: "--", cogsBase: "316.0M", cogsScn: "316.5M", cogsDelta: "+523,805", gpBase: "424.3M", gpScn: "423.8M", gpDelta: "-523,805" },
  { month: "Dec", salesBase: "771.8M", salesScn: "771.8M", salesDelta: "--", cogsBase: "325.4M", cogsScn: "325.8M", cogsDelta: "+427,865", gpBase: "446.5M", gpScn: "446.0M", gpDelta: "-427,865" },
];

const ScenarioPlanner = () => {
  const navigate = useNavigate();

  const dashboardContext = `Scenario: Base_Scenario | Country: All | Brand: All Brands

KPI Summary:
${kpiCards.map((k) => `- ${k.label}: ${k.value} (${k.base}) ${k.delta}`).join("\n")}

Impact Summary (FY):
${impactSummary.map((r) => `- ${r.metric}: Base ${r.base} → Scenario ${r.scenario} (Delta: ${r.delta}, ${r.deltaPercent})`).join("\n")}

Season Summary:
${seasonSummary.map((r) => `- ${r.season}: Sales Base ${r.salesBase} → SCN ${r.salesScn} (${r.salesDelta}, ${r.salesDeltaPct}), GP Base ${r.gpBase} → SCN ${r.gpScn}, GP% ${r.gpPctBase} → ${r.gpPctScn}`).join("\n")}

Monthly Breakdown:
${monthlyBreakdown.map((r) => `- ${r.month}: Sales ${r.salesBase}→${r.salesScn} (${r.salesDelta}), COGS ${r.cogsBase}→${r.cogsScn} (${r.cogsDelta}), GP ${r.gpBase}→${r.gpScn} (${r.gpDelta})`).join("\n")}

GP% Trend: ${gpTrendData.map((d) => `${d.month}: Base ${d.baseGP}% / Scenario ${d.scenarioGP}%`).join(", ")}

Inventory: ${inventoryData.map((d) => `${d.month}: Base ${d.baseStock}M / Scenario ${d.scenarioStock}M`).join(", ")}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background px-6 py-2.5">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-base font-heading font-bold text-foreground tracking-tight">
            OmniLens
          </span>
          <nav className="flex items-center gap-1 ml-4">
            {[
              { label: "Data Upload", icon: Upload },
              { label: "Scenario Builder", icon: LayoutGrid },
              { label: "Dashboards", icon: LayoutGrid, active: true },
              { label: "Configuration", icon: Settings },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Clock className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center text-background text-xs font-semibold">
              SV
            </div>
            <span className="text-sm font-medium text-foreground">Sunil Varma</span>
            <span className="text-[0.6rem] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-semibold">admin</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Overview Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-heading font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Scenario, brand, and country analysis in one view.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-5 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Scenario *
              </label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                <span className="text-foreground">Base_Scenario</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Country
              </label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                <span className="text-muted-foreground">-- Select country --</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Brand
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                  <span className="text-muted-foreground">-- All Brands --</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <button className="px-3 py-2.5 rounded-lg border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  All Brands
                </button>
                <button className="px-3 py-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Generate AI Insights Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Sparkles className="h-4 w-4" />
            Generate AI Insights
          </button>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-xl border border-border bg-card p-5 mb-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {kpiCards.map((kpi) => (
              <div key={kpi.label}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {kpi.label}
                </p>
                <p className="text-2xl font-heading font-bold text-foreground leading-tight">
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.base}</p>
                {kpi.delta && (
                  <p className={`text-xs font-medium mt-1 ${kpi.negative ? "text-destructive" : "text-emerald-600"}`}>
                    {kpi.delta}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-border bg-card mb-6"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-heading font-semibold text-foreground">Impact Summary</h2>
              <span className="text-[0.65rem] px-2 py-0.5 rounded border border-border bg-background font-medium text-muted-foreground">
                FY Totals
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Copy className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Download className="h-3.5 w-3.5" />
                CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Metric</th>
                  <th className="text-right px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Base</th>
                  <th className="text-right px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Scenario</th>
                  <th className="text-right px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Delta</th>
                  <th className="text-right px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Delta %</th>
                </tr>
              </thead>
              <tbody>
                {impactSummary.map((row) => (
                  <tr key={row.metric} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">{row.metric}</td>
                    <td className="px-5 py-3.5 text-right text-muted-foreground">{row.base}</td>
                    <td className="px-5 py-3.5 text-right text-muted-foreground">{row.scenario}</td>
                    <td className={`px-5 py-3.5 text-right font-medium ${row.negative ? "text-destructive" : "text-emerald-600"}`}>
                      {row.negative ? "▼" : "▲"} {row.delta}
                    </td>
                    <td className={`px-5 py-3.5 text-right font-medium ${row.negative ? "text-destructive" : "text-emerald-600"}`}>
                      {row.negative ? "▼" : "▲"} {row.deltaPercent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Season Summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-xl border border-border bg-card mb-6"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-heading font-semibold text-foreground">Season Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Season", "Sales Base", "Sales SCN", "Sales Delta", "Sales Δ%", "GP Base", "GP SCN", "GP% Base", "GP% SCN", "Inwards Base"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seasonSummary.map((row) => (
                  <tr key={row.season} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{row.season}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.salesBase}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.salesScn}</td>
                    <td className="px-4 py-3 font-medium text-destructive">{row.salesDelta}</td>
                    <td className="px-4 py-3 font-medium text-destructive">{row.salesDeltaPct}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.gpBase}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.gpScn}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.gpPctBase}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.gpPctScn}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.inwardsBase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Charts Row 1: Monthly Sales Bridge + GP% Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h3 className="text-base font-heading font-semibold text-foreground mb-4">Monthly Sales Bridge</h3>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={monthlySalesData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} tickFormatter={(v) => `${v}M`} />
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="base" name="Base" fill="hsl(142 60% 45%)" radius={[2, 2, 0, 0]} barSize={18} />
                <Bar dataKey="scenario" name="Scenario" fill="hsl(0 0% 80%)" radius={[2, 2, 0, 0]} barSize={18} />
                <Bar dataKey="actual" name="Actual" fill="hsl(220 70% 55%)" radius={[2, 2, 0, 0]} barSize={18} />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h3 className="text-base font-heading font-semibold text-foreground mb-4">GP% Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={gpTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} tickFormatter={(v) => `${v}%`} domain={[54, 62]} />
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="baseGP" name="Base GP%" stroke="hsl(0 0% 60%)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="6 3" />
                <Line type="monotone" dataKey="scenarioGP" name="Scenario GP%" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2: Inventory Trajectory + Inwards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h3 className="text-base font-heading font-semibold text-foreground mb-4">Inventory Trajectory</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} tickFormatter={(v) => `${v}M`} />
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="baseStock" name="Base Closing Stock" stroke="hsl(0 0% 60%)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="6 3" />
                <Line type="monotone" dataKey="scenarioStock" name="Scenario Closing Stock" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h3 className="text-base font-heading font-semibold text-foreground mb-4">Inwards: Base vs Plan</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={inwardsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }} tickFormatter={(v) => `${v}M`} />
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="inwardsBase" name="Inwards Base" stroke="hsl(0 0% 60%)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="6 3" />
                <Line type="monotone" dataKey="inwardsPlan" name="Inwards Plan" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Monthly Breakdown Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-border bg-card mb-8"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-heading font-semibold text-foreground">Monthly Breakdown</h2>
              <span className="text-[0.65rem] px-2 py-0.5 rounded border border-border bg-background font-medium text-muted-foreground">
                All Brands
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                Columns
              </button>
              <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Copy className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Download className="h-3.5 w-3.5" />
                CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Month", "Sales Base", "Sales SCN", "Sales Delta", "COGS Base", "COGS SCN", "COGS Delta", "GP Base", "GP SCN", "GP Delta"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyBreakdown.map((row) => {
                  const salesNeg = row.salesDelta.startsWith("-");
                  const cogsNeg = row.cogsDelta.startsWith("-");
                  const gpNeg = row.gpDelta.startsWith("-");
                  return (
                    <tr key={row.month} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{row.month}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.salesBase}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.salesScn}</td>
                      <td className={`px-4 py-3 font-medium ${salesNeg ? "text-destructive" : row.salesDelta === "--" ? "text-muted-foreground" : "text-emerald-600"}`}>
                        {row.salesDelta}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.cogsBase}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.cogsScn}</td>
                      <td className={`px-4 py-3 font-medium ${cogsNeg ? "text-destructive" : "text-emerald-600"}`}>
                        {row.cogsDelta}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.gpBase}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.gpScn}</td>
                      <td className={`px-4 py-3 font-medium ${gpNeg ? "text-destructive" : "text-emerald-600"}`}>
                        {row.gpDelta}
                      </td>
                    </tr>
                  );
                })}
                {/* FY TOTAL row */}
                <tr className="bg-muted/30 font-semibold">
                  <td className="px-4 py-3 text-foreground">FY TOTAL</td>
                  <td className="px-4 py-3 text-foreground">7,603.4M</td>
                  <td className="px-4 py-3 text-foreground">6,410.0M</td>
                  <td className="px-4 py-3 text-destructive">-1,193.4M</td>
                  <td className="px-4 py-3 text-foreground">3,163.1M</td>
                  <td className="px-4 py-3 text-foreground">2,728.4M</td>
                  <td className="px-4 py-3 text-destructive">-434.8M</td>
                  <td className="px-4 py-3 text-foreground">4,440.3M</td>
                  <td className="px-4 py-3 text-foreground">3,681.6M</td>
                  <td className="px-4 py-3 text-destructive">-758.7M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* AI Chatbot */}
      <InsightsChatbot dashboardContext={dashboardContext} />

      {/* Footer */}
      <footer className="border-t border-border py-5 text-center text-[0.7rem] text-muted-foreground">
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

export default ScenarioPlanner;
