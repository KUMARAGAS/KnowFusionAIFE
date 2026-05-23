import { Link } from 'react-router';
import { Sparkles, Upload, FileText, MessageSquare } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Study Companion
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Turn Your Lecture PDFs Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Smart Study Guides
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Upload your lecture notes, get clean AI-powered summaries, and ask questions about your material — all in one place. Your data stays private, and every answer cites a source.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-7 py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-blue-400 transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
            >
              <Upload className="w-4 h-4" />
              Start Summarizing — It&apos;s Free
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-7 py-3 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <FileText className="w-4 h-4" />
              See How It Works
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-lg mx-auto">
            {[
              { value: '100%', label: 'Private' },
              { value: 'Source-', label: 'Grounded' },
              { value: 'Unlimited', label: 'Free' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { Icon: Upload, step: '1', title: 'Upload PDF', desc: 'Drag & drop your lecture notes' },
            { Icon: Sparkles, step: '2', title: 'AI Processes', desc: 'Summary & knowledge base built' },
            { Icon: MessageSquare, step: '3', title: 'Ask & Learn', desc: 'Chat with your material' },
          ].map(({ Icon, step, title, desc }) => (
            <div key={step} className="flex items-center gap-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
