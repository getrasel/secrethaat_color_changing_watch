import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess?: () => void;
  onBackToSite?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToSite,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "15981598") {
      sessionStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("admin_authenticated", "true");
      setError("");
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate("/admin");
      }
    } else {
      setError("পাসওয়ার্ড ভুল হয়েছে! সঠিক পাসওয়ার্ড দিয়ে আবার চেষ্টা করুন।");
    }
  };

  const handleBack = () => {
    if (onBackToSite) {
      onBackToSite();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-bangla">
      {/* Background space glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Back to site button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all cursor-pointer z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ওয়েবসাইটে ফিরে যান</span>
      </button>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <span>অ্যাডমিন প্যানেল</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h1>
          <p className="text-sm text-slate-400">
            অর্ডার দেখতে পাসওয়ার্ড দিয়ে লগইন করুন
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="পাসওয়ার্ড দিন..."
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-xs font-semibold text-red-400 pt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 active:scale-98 transition-all cursor-pointer"
          >
            লগইন করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
