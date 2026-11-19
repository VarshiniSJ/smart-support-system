
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Headphones,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  User,
} from "lucide-react";

import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password || (isSignup && !name.trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      if (isSignup) {
        await api.post("/api/auth/register", {
          name: name.trim(),
          email: email.trim(),
          password,
        });

        setSuccess("Account created successfully! Please sign in.");

        setIsSignup(false);
        setName("");
        setPassword("");
      } else {
        const response = await api.post("/api/auth/login", {
          email: email.trim(),
          password,
        });

        const userData = response.data;

        if (!userData.token) {
          setError("Login response did not contain an authentication token.");
          return;
        }

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        if (userData.role === "CUSTOMER") {
          navigate("/customer-dashboard");
        } else if (userData.role === "AGENT") {
          navigate("/agent-dashboard");
        } else if (userData.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          setError("User role not recognized.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          error.response.data.error ||
          "Something went wrong. Please try again."
        );
      } else {
        setError("Unable to connect to the server. Please check your backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen w-full grid-cols-1 overflow-hidden bg-white lg:grid-cols-[1.05fr_0.95fr]">

        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#101b35] p-12 text-white lg:flex xl:p-16">
          <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full border border-white/10" />
          <div className="absolute -right-16 -top-16 h-[320px] w-[320px] rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500">
              <Headphones size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SmartSupport</h1>
              <p className="text-xs text-slate-400">Support made smarter</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-xl"
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-medium text-blue-200">
              <Sparkles size={14} />
              Your support experience, simplified
            </div>

            <h2 className="text-4xl font-bold leading-[1.2] tracking-tight xl:text-5xl">
              Every request.
              <br />
              Every update.
              <br />
              <span className="text-blue-400">One smart place.</span>
            </h2>

            <p className="mt-7 max-w-md text-base leading-8 text-slate-400">
              Stay connected with your support team, manage requests,
              and follow every update through one simple workspace.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="font-semibold">Easy communication</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Stay updated with your support team.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-semibold">Track every request</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Know exactly where your tickets stand.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-semibold">Secure workspace</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Your support experience stays protected.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <p className="relative z-10 text-xs text-slate-500">
            © 2026 SmartSupport. All rights reserved.
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-12 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[430px]"
          >
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Headphones size={23} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">SmartSupport</h1>
                <p className="text-xs text-slate-400">Support made smarter</p>
              </div>
            </div>

            <div className="mb-9">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[2px] text-blue-600">
                {isSignup ? "Get started" : "Welcome back"}
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {isSignup ? "Create your account" : "Sign in to your account"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {isSignup
                  ? "Create an account to access your SmartSupport workspace."
                  : "Enter your details to access your SmartSupport workspace."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full name
                  </label>
                  <div className="flex h-[54px] items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-blue-500">
                    <User size={19} className="shrink-0 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-full w-full bg-transparent text-sm outline-none"
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <div className="flex h-[54px] items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-blue-500">
                  <Mail size={19} className="shrink-0 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-full w-full bg-transparent text-sm outline-none"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="flex h-[54px] items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-blue-500">
                  <Lock size={19} className="shrink-0 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-full w-full bg-transparent text-sm outline-none"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="shrink-0 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                    ? "Create account"
                    : "Sign in to SmartSupport"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="my-7 text-center text-sm text-slate-500">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              {" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                  setSuccess("");
                }}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-600" />
              <p className="text-xs leading-6 text-slate-500">
                Your account is protected. Your password is securely encrypted.
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Login;
