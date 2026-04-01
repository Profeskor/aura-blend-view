import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import apparelLogo from "@/assets/apparel_logo.jpg";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left: Video Section */}
      <div className="relative hidden w-1/2 lg:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-overlay absolute inset-0 h-full w-full"
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-16 left-12 right-12"
        >
          <h2 className="font-heading text-4xl font-bold leading-tight text-primary-foreground">
            Welcome back to
            <br />
            AGLens.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Streamline your workflow, collaborate seamlessly, and bring your
            ideas to life — all in one place.
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
              <img src={apparelLogo} alt="Apparel Group" className="h-16 w-auto" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Sign in to AGLens
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@apparelglobal.com"
                  className="login-input w-full pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="login-input w-full pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button variant="premium" className="w-full" type="submit">
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-6">
            <Button variant="outline" className="h-12 w-full rounded-xl">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
                <path d="M11 0H0V11H11V0Z" fill="#F25022" />
                <path d="M23 0H12V11H23V0Z" fill="#7FBA00" />
                <path d="M11 12H0V23H11V12Z" fill="#00A4EF" />
                <path d="M23 12H12V23H23V12Z" fill="#FFB900" />
              </svg>
              Sign in with Microsoft SSO
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button className="font-semibold text-primary transition-colors hover:text-primary/80">
              Contact IT Admin
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
