import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Sparkles, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/upload", label: "Upload Notes" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useUser();

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-900 dark:text-white">KnowFusion</span>
              <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 font-medium">AI Study Companion</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Clerk Auth */}
            <div className="ml-2 flex items-center">
              {isSignedIn ? (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full border-2 border-indigo-200 dark:border-indigo-700",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              ) : (
                <SignInButton mode="modal">
                  <button className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-indigo-500 hover:to-blue-400 transition-all shadow-sm">
                    <Sparkles className="w-4 h-4" />
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>

            {isSignedIn && (
              <Link
                to="/upload"
                className="ml-2 inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-indigo-500 hover:to-blue-400 transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full border-2 border-indigo-200 dark:border-indigo-700",
                  },
                }}
                afterSignOutUrl="/"
              />
            ) : (
              <SignInButton mode="modal">
                <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </button>
              </SignInButton>
            )}
            <button
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 text-center">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
