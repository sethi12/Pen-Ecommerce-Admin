"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, LogIn, Check } from "lucide-react";

export function PenZoneLogo() {
  return (
    <a href="/" className="group flex flex-col items-center gap-2" aria-label="PenZone home">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {/* Fallback icon in case image is missing, you can keep your Image tag here */}
        <Image
          src="/logo.png"
          alt="PenZone Logo"
          width={64}
          height={64}
          priority
          className="absolute inset-0 h-full w-full object-contain p-2 brightness-0 invert"
        />
      </div>
      <span className="font-display text-xl font-bold tracking-widest text-white/90">
        PENZONE
      </span>
    </a>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Prevent hydration mismatch for animations
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate authentication API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email && password) {
        router.push("/dashboard");
      } else {
        setError("Please enter valid admin credentials.");
      }
    } catch (err) {
      setError("An error occurred during sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black selection:bg-amber-500/30">
      {/* --- Animated Background Orbs --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            transform: ["translate(0px, 0px) scale(1)", "translate(50px, -50px) scale(1.1)", "translate(0px, 0px) scale(1)"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-amber-600/20 blur-[120px]"
        />
        <motion.div
          animate={{
            transform: ["translate(0px, 0px) scale(1)", "translate(-50px, 50px) scale(1.2)", "translate(0px, 0px) scale(1)"],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[130px]"
        />
        <motion.div
          animate={{
            transform: ["translate(0px, 0px) scale(1)", "translate(30px, 30px) scale(0.9)", "translate(0px, 0px) scale(1)"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[20%] h-[300px] w-[300px] rounded-full bg-rose-600/10 blur-[100px]"
        />
      </div>

      {/* --- Glassmorphism Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-10">
          
          {/* Header */}
          <div className="mb-10 flex flex-col items-center space-y-4 text-center">
            <PenZoneLogo />
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-white/90">
                Admin Portal
              </h1>
              <p className="text-sm text-white/50">
                Secure access to the management console
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-md"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/40">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@penzone.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-amber-500/50 focus:bg-white/10 focus:ring-4 focus:ring-amber-500/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/70">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/40">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-amber-500/50 focus:bg-white/10 focus:ring-4 focus:ring-amber-500/10"
                />
              </div>
            </div>

            {/* Custom Checkbox */}
            <div className="flex items-center justify-between py-2">
              <label className="group flex cursor-pointer items-center gap-3">
                <div className="relative flex h-5 w-5 items-center justify-center rounded-md border border-white/20 bg-white/5 transition-colors group-hover:border-amber-500/50">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className={`absolute transition-opacity duration-200 ${rememberMe ? 'opacity-100' : 'opacity-0'}`}>
                    <Check className="h-3.5 w-3.5 text-amber-400" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  Remember this device
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3.5 text-sm font-semibold text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In to Console
                  <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} PenZone Co. — Admin System
        </p>
      </motion.div>
    </div>
  );
}