import { Link } from "react-router";
import { Sparkles, Check, Zap, Shield, Users, FileText, Brain, Infinity } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out KnowFusion's core features.",
    features: [
      "3 PDF uploads per month",
      "AI-powered summaries",
      "Basic Q&A chat",
      "5 quiz questions per document",
      "Standard support",
    ],
    cta: "Get Started",
    href: "/upload",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For serious students who want to ace their exams.",
    features: [
      "Unlimited PDF uploads",
      "Advanced AI summaries with chapter breakdown",
      "Unlimited Q&A chat sessions",
      "Full-length quizzes (up to 20 questions)",
      "Quiz history & analytics",
      "Priority support",
      "Export notes & summaries",
    ],
    cta: "Start Free Trial",
    href: "/upload",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For study groups and small classrooms.",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Shared study spaces",
      "Collaborative note-taking",
      "Team quiz leaderboards",
      "Admin dashboard",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    href: "/upload",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Absolutely. You get a 14-day free trial of Pro with no commitment. Cancel anytime.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel anytime from your account settings. You'll retain access until the end of your billing period.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pb-16 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent dark:from-indigo-800/10" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                tier.highlighted
                  ? "border-indigo-300 dark:border-indigo-600 bg-white dark:bg-slate-800 shadow-xl shadow-indigo-200/20 dark:shadow-indigo-900/20 scale-105"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{tier.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check className="w-4 h-4 mt-0.5 text-indigo-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {tier.name === "Free" ? (
                <Link
                  to={tier.href}
                  className="w-full text-center py-3 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {tier.cta}
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      tier.highlighted
                        ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-500 hover:to-blue-400 shadow-sm"
                        : "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </SignInButton>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Everything you need to study smarter
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "Smart Summaries", desc: "AI distills pages into concise notes automatically." },
              { icon: Brain, title: "Quiz Generator", desc: "Turn any document into practice tests instantly." },
              { icon: Zap, title: "Instant Answers", desc: "Ask questions and get answers from your material." },
              { icon: Shield, title: "Your Data Stays Yours", desc: "Enterprise-grade encryption keeps notes private." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 [&[open]]:border-indigo-200 dark:[&[open]]:border-indigo-800 transition-colors"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-medium text-slate-900 dark:text-white list-none">
                {faq.q}
                <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-slate-600 dark:text-slate-400">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your study habits?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Join thousands of students who study smarter with KnowFusion.
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
              <Sparkles className="w-5 h-5" />
              Start Free — No Credit Card Required
            </button>
          </SignInButton>
        </div>
      </section>
    </div>
  );
}
