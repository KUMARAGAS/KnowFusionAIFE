import { Link } from 'react-router';
import {
  Upload, Sparkles, MessageSquare, FileText, Search, Brain, Shield,
  Database, Layers, CheckCircle, ArrowRight, BookOpen,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    Icon: Upload,
    title: 'Upload Your Lecture PDF',
    desc: 'Drag and drop any PDF — lecture slides, textbook chapters, research papers. We support academic documents of all sizes.',
    details: [
      'Drag & drop or click to browse',
      'Files stored securely in Cloudinary',
      'Progress bar shows upload status',
    ],
    image: null,
  },
  {
    number: '02',
    Icon: Brain,
    title: 'AI Parses Every Page',
    desc: 'Each page is converted to an image and processed through Gemini Vision AI — extracting text, tables, diagrams, and code blocks with full structural context.',
    details: [
      'Vision-based PDF parsing (not just raw text)',
      'Preserves tables, diagrams & code blocks',
      'Content split into searchable chunks',
    ],
    image: null,
  },
  {
    number: '03',
    Icon: Database,
    title: 'Knowledge Base Built',
    desc: 'Every chunk is converted into a vector embedding and stored in MongoDB. Your document becomes a persistent, searchable knowledge base — not just a single chat session.',
    details: [
      'Vector embeddings for semantic search',
      'Persistent storage across sessions',
      'Each chunk maintains source citation',
    ],
    image: null,
  },
  {
    number: '04',
    Icon: FileText,
    title: 'Get Your Summary',
    desc: 'A clean, structured academic summary is generated automatically — with key concepts, definitions, and organized sections you can read or download.',
    details: [
      'Markdown-formatted lecture summary',
      'Key terms and concepts extracted',
      'Download as text file for offline use',
    ],
    image: null,
  },
  {
    number: '05',
    Icon: MessageSquare,
    title: 'Ask Questions & Get Cited Answers',
    desc: 'When you ask a question, the system performs a vector similarity search across thousands of chunks to find the most relevant content. The AI answers using only your lecture material — with source citations.',
    details: [
      'Semantic search across all your content',
      'Answers cite specific source chunks',
      'Session history preserved for later review',
    ],
    image: null,
  },
  {
    number: '06',
    Icon: Search,
    title: 'Test Yourself with Quizzes',
    desc: 'Generate multiple-choice quizzes from any lecture. Choose the number of questions, focus on a specific chapter, and get instant feedback with explanations.',
    details: [
      'AI-generated questions from your content',
      'Configurable question count & topics',
      'Score tracking and answer explanations',
    ],
    image: null,
  },
];

const features = [
  { Icon: Shield, title: '100% Private', desc: 'Your lecture notes never train public AI models. Your data stays yours.' },
  { Icon: Layers, title: 'Persistent History', desc: 'All summaries, chats, and quizzes are saved. Come back anytime and continue where you left off.' },
  { Icon: Search, title: 'Source-Grounded', desc: 'Every answer cites specific chunks from your PDF. You can verify where the information came from.' },
  { Icon: BookOpen, title: 'Academic Structure', desc: 'Structured summaries with objectives, key terms, and organized sections — not raw text dumps.' },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Step-by-Step Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            How KnowFusion Works
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From uploading a PDF to quizzing yourself on the material — here&apos;s exactly what happens at each step.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-16">
          {steps.map(({ number, Icon, title, desc, details }, i) => (
            <div key={number} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-indigo-100 dark:from-indigo-700 dark:to-indigo-900 hidden md:block" />
              )}

              <div className="md:flex gap-8 items-start">
                {/* Step number + icon */}
                <div className="hidden md:flex flex-col items-center shrink-0 w-16">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-indigo-400 dark:text-indigo-500 mt-2">{number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 mt-4 md:mt-0">
                  {/* Mobile step indicator */}
                  <div className="flex items-center gap-3 md:hidden mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-indigo-400 dark:text-indigo-500">{number}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>

                  <ul className="mt-4 space-y-2">
                    {details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-3">
            Why Students Use KnowFusion
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10 max-w-xl mx-auto">
            Built specifically for academic workflows — not a general-purpose chat tool
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Ready to Try It?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            Upload your first lecture PDF and see the difference. No account needed.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-indigo-500 hover:to-blue-400 transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
          >
            Start Summarizing — It&apos;s Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
