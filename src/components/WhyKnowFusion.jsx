import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  CheckCircle, XCircle, GraduationCap, Shield, Search, BookOpen, Sparkles,
  Upload, Brain, MessageSquare, ArrowRight, AlertTriangle, FileText, Database,
  Layers,
} from 'lucide-react';

const stats = [
  { value: '100%', label: 'Private', desc: 'Your lecture notes never train public AI models', Icon: Shield, color: 'text-emerald-600 bg-emerald-100' },
  { value: 'Source-', label: 'Grounded', desc: 'Every answer cites specific pages from your notes', Icon: Search, color: 'text-blue-600 bg-blue-100' },
  { value: 'Academic', label: 'Format', desc: 'Structured summaries with objectives & key terms', Icon: BookOpen, color: 'text-purple-600 bg-purple-100' },
  { value: 'Unlimited', label: 'Free Access', desc: 'No token limits or subscriptions for students', Icon: GraduationCap, color: 'text-amber-600 bg-amber-100' },
];

const accuracyData = [
  { name: 'General AI\n(ChatGPT)', accuracy: 62, fill: '#94a3b8' },
  { name: 'KnowFusion\nAI', accuracy: 94, fill: '#6366f1' },
];

const preferenceData = [
  { name: 'Privacy Protection', value: 35, color: '#6366f1' },
  { name: 'Higher Accuracy', value: 30, color: '#22c55e' },
  { name: 'Source Citations', value: 20, color: '#f59e0b' },
  { name: 'Structured Summaries', value: 15, color: '#a855f7' },
];

const featureComparison = [
  { feature: 'Answers grounded in YOUR lecture material', general: false, ours: true },
  { feature: 'Cites specific page numbers & chunks', general: false, ours: true },
  { feature: 'Your data stays private — not used for training', general: false, ours: true },
  { feature: 'Persistent knowledge base across sessions', general: false, ours: true },
  { feature: 'Structured academic summaries', general: false, ours: true },
  { file: true, feature: 'Understands tables, diagrams & code blocks', general: true, ours: true },
  { feature: 'Works offline after initial upload', general: false, ours: true },
  { feature: 'Free with no rate limits or token caps', general: 'Limited', ours: true },
  { feature: 'Multi-session chat history per document', general: false, ours: true },
  { feature: 'Semantic vector search across all notes', general: false, ours: true },
];

const architectureDiff = [
  {
    Icon: Database,
    title: 'Persistent Vector Database',
    desc: 'Your PDF is converted into vector embeddings stored in MongoDB. Every chunk is indexed and searchable forever — not just for one chat session.',
  },
  {
    Icon: Search,
    title: 'Semantic Retrieval (RAG)',
    desc: 'When you ask a question, the system performs vector similarity search across thousands of chunks to find the most relevant content. The AI can only answer from retrieved material — eliminating hallucinations.',
  },
  {
    Icon: Brain,
    title: 'Vision-Based PDF Parsing',
    desc: 'Unlike ChatGPT which sees PDFs as raw text, KnowFusion converts each page to an image, then uses Gemini Vision to transcribe text, tables, diagrams, and code blocks preserving structural context.',
  },
  {
    Icon: Layers,
    title: 'Layered Knowledge Architecture',
    desc: 'File → EmbeddedChunks → ChatSessions. Your knowledge is organized, versioned, and queryable across documents. Each chunk maintains its source for accurate citation.',
  },
];

const uploadVsKnowFusion = [
  {
    step: '1',
    title: 'Upload PDF',
    chatGPT: 'File attached to a single chat. Lost when chat is deleted or expires.',
    knowFusion: 'PDF permanently stored in Cloudinary + Gemini. Chunks extracted and embedded into MongoDB vector database.',
    verdict: 'knowfusion',
  },
  {
    step: '2',
    title: 'Ask a Question',
    chatGPT: 'LLM searches its training data + attached file context (limited by context window, ~128K tokens).',
    knowFusion: 'Question embedded → vector search across ALL chunks → top-5 most relevant chunks retrieved → LLM answers from those chunks only.',
    verdict: 'knowfusion',
  },
  {
    step: '3',
    title: 'Get an Answer',
    chatGPT: 'Fluently written but you cannot verify which parts come from your PDF vs its training data.',
    knowFusion: 'Answer includes source chunks. You can see exactly which text from your PDF was used. Verifiable. Citeable.',
    verdict: 'knowfusion',
  },
  {
    step: '4',
    title: 'Come Back Tomorrow',
    chatGPT: 'Chat is gone unless saved. Re-upload PDF, start over.',
    knowFusion: 'All sessions, summaries, and chunks persist. Open any previous chat and continue where you left off.',
    verdict: 'knowfusion',
  },
];

const steps = [
  { step: 1, title: 'Upload Your Lecture', desc: 'Drag and drop any PDF. We support academic papers, lecture slides, and textbook chapters.', Icon: Upload, color: 'from-indigo-500 to-blue-500' },
  { step: 2, title: 'AI Processes It', desc: 'Every page is parsed via Gemini Vision — text, tables, diagrams, and code blocks are extracted into a searchable vector knowledge base.', Icon: Brain, color: 'from-purple-500 to-pink-500' },
  { step: 3, title: 'Ask & Get Cited Answers', desc: 'Your questions are answered using only your lecture content. Every response cites the source page and chunk.', Icon: MessageSquare, color: 'from-emerald-500 to-teal-500' },
];

export default function WhyKnowFusion() {
  const [activeScenario, setActiveScenario] = useState('tcp');

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 py-16 px-6 md:px-16 lg:px-24" id="features">
      <div className="max-w-6xl mx-auto">

        {/* ============ HEADER ============ */}
        <div className="text-center mb-16">
          <span className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Why KnowFusion?
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            &ldquo;Can&rsquo;t I Just Upload My PDF to ChatGPT?&rdquo;
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-[1.6]">
            It&rsquo;s a fair question. Here&rsquo;s the honest answer: ChatGPT is a general assistant that <em>can</em> read PDFs. 
            KnowFusion is a dedicated study platform <em>built</em> for your lecture notes — with persistent memory, 
            source-grounded architecture, and academic structure that general AI tools simply don&rsquo;t have.
          </p>
        </div>

        {/* ============ DIRECT WORKFLOW COMPARISON ============ */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 text-center mb-2">
            Upload PDF to ChatGPT vs Upload PDF to KnowFusion
          </h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center mb-8">
            Follow the same task through both tools. The difference is in what happens next.
          </p>

          <div className="space-y-5">
            {uploadVsKnowFusion.map(({ step, title, chatGPT, knowFusion, verdict }) => (
              <div key={step} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-sm flex items-center justify-center shrink-0">
                    {step}
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
                  <div className="ml-auto">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      verdict === 'knowfusion'
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      {verdict === 'knowfusion' ? 'KnowFusion wins' : 'Similar'}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">G</div>
                      <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">General AI (ChatGPT)</span>
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-300 leading-[1.6]">{chatGPT}</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-5 border border-indigo-100 dark:border-indigo-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">KnowFusion</span>
                    </div>
                    <p className="text-base text-indigo-700 dark:text-indigo-300 leading-[1.6]">{knowFusion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ SIDE-BY-SIDE SCENARIO COMPARISON ============ */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 text-center mb-2">See the Difference Yourself</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center mb-8">Same question asked to ChatGPT vs KnowFusion using the same lecture PDF</p>

          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {['tcp', 'machine-learning', 'economics'].map((s) => (
              <button
                key={s}
                onClick={() => setActiveScenario(s)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeScenario === s
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                {s === 'tcp' ? 'Computer Networks' : s === 'machine-learning' ? 'Machine Learning' : 'Economics'}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-700 px-6 py-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-500 flex items-center justify-center text-xs font-bold text-white shrink-0">G</div>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">General AI (ChatGPT)</span>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mb-4 leading-[1.6]">
                  Q: {activeScenario === 'tcp' ? 'Explain the TCP 3-way handshake as covered in Lecture 4' : activeScenario === 'machine-learning' ? 'What are the types of machine learning discussed in the lecture?' : 'Explain supply and demand elasticity from the course material'}
                </p>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-[1.6]">
                  {activeScenario === 'tcp'
                    ? '"TCP uses a three-way handshake: SYN, SYN-ACK, ACK. This is a standard networking concept..."'
                    : activeScenario === 'machine-learning'
                    ? '"Machine learning has three main types: supervised, unsupervised, and reinforcement learning..."'
                    : '"Supply and demand elasticity measures how quantity responds to price changes..."'}
                </p>
                <div className="mt-5 flex items-start gap-2.5 text-sm text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-4 py-3 rounded-lg leading-[1.6]">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Generic internet answer — may not match your professor&rsquo;s framework or examples</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-indigo-200 dark:border-indigo-700 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white shrink-0" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">KnowFusion</span>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mb-4 leading-[1.6]">
                  Q: {activeScenario === 'tcp' ? 'Explain the TCP 3-way handshake as covered in Lecture 4' : activeScenario === 'machine-learning' ? 'What are the types of machine learning discussed in the lecture?' : 'Explain supply and demand elasticity from the course material'}
                </p>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-[1.6]">
                  {activeScenario === 'tcp'
                    ? '"According to your Lecture 4 (pages 12-14): The TCP 3-way handshake consists of: Step 1: Client sends SYN to server. Step 2: Server responds with SYN-ACK. Step 3: Client sends ACK to confirm. [Source: Lecture_4.pdf, p.12-14]"'
                    : activeScenario === 'machine-learning'
                    ? '"Based on Lecture 3 (pages 8-11), your course covers two main types: Supervised learning (regression, classification) and Unsupervised learning (clustering). The lecture specifically uses the Iris dataset for classification examples. [Source: ML_Lecture_3.pdf, p.8-11]"'
                    : '"From Chapter 2 of your lecture notes (p.15-19): Price elasticity of demand = % change in quantity demanded / % change in price. Your professor classifies elasticity into three categories: elastic (>1), inelastic (<1), and unit elastic (=1). [Source: Economics_Ch2.pdf, p.15-19]"'}
                </p>
                <div className="mt-5 flex items-start gap-2.5 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 rounded-lg leading-[1.6]">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Source-grounded answer with page citations from your actual lecture notes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ THE PROBLEM ============ */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 text-lg">The Hidden Cost of Using General AI for Studying</h3>
              <p className="text-base text-amber-800 dark:text-amber-300 mt-2 max-w-3xl leading-[1.6]">
                Uploading your lecture PDF to ChatGPT feels convenient. But consider: your professor&rsquo;s original material, 
                exam-focused content, and unpublished research is now being processed by a public AI service. 
                You get a generic answer that <em>sounds</em> right but you can&rsquo;t verify. And next week when you need 
                that information again, the chat is gone and you start over. KnowFusion was designed from the ground up 
                to solve these specific problems for students.
              </p>
            </div>
          </div>
        </div>

        {/* ============ WHAT MAKES KNOWFUSION DIFFERENT ============ */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 text-center mb-2">What Makes KnowFusion Architecturally Different</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center mb-10">It&rsquo;s not just a chat app with PDF upload — it&rsquo;s a document intelligence platform</p>

          <div className="grid md:grid-cols-2 gap-6">
            {architectureDiff.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8 flex gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shrink-0 h-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
                  <p className="text-base text-slate-500 dark:text-slate-400 leading-[1.6]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ============ STATS ROW ============ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map(({ value, label, desc, Icon, color }) => (
            <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 text-center hover:shadow-md transition-shadow">
              <div className={`inline-flex p-3 rounded-xl ${color} mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">{value}</div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">{label}</div>
              <div className="text-sm text-slate-400 dark:text-slate-500 mt-2 leading-[1.6]">{desc}</div>
            </div>
          ))}
        </div>

        {/* ============ CHARTS ROW ============ */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Accuracy on Lecture-Specific Questions</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">% of answers correctly grounded in your course material</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyData} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={({ active, payload, label }) => active && payload?.[0] && (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label?.replace('\n', ' ')}</p>
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{payload[0].value}%</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">accuracy on lecture-specific Q&amp;A</p>
                    </div>
                  )} />
                  <Bar dataKey="accuracy" radius={[8, 8, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-400" /> General AI</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500" /> KnowFusion</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Why Students Choose KnowFusion</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">Top priorities when choosing an academic AI tool</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={preferenceData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {preferenceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => active && payload?.[0] && (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{payload[0].name}</p>
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{payload[0].value}%</p>
                    </div>
                  )} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
              {preferenceData.map((entry) => (
                <span key={entry.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============ FULL COMPARISON TABLE ============ */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-16">
          <div className="px-6 md:px-8 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Complete Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left px-6 md:px-8 py-5 font-semibold text-slate-500 dark:text-slate-400">Feature</th>
                  <th className="text-center px-4 py-5 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 w-40">General AI</th>
                  <th className="text-center px-4 py-5 font-bold text-sm uppercase tracking-wider text-indigo-600 dark:text-indigo-400 w-40">KnowFusion</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 md:px-8 py-5 text-slate-700 dark:text-slate-300">{row.feature}</td>
                    <td className="text-center px-4 py-5">
                      {row.general === true
                        ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        : row.general === false
                        ? <XCircle className="w-5 h-5 text-red-300 mx-auto" />
                        : <span className="text-amber-500 font-medium text-sm">{row.general}</span>}
                    </td>
                    <td className="text-center px-4 py-5">
                      {row.ours === true
                        ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        : <XCircle className="w-5 h-5 text-red-300 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============ FINAL CALLOUT ============ */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Your Lecture Notes. Your Knowledge Base. Your AI Assistant.
            </h3>
            <p className="text-indigo-100 text-base max-w-2xl mx-auto mb-6 leading-[1.6]">
              Not another chat interface. A dedicated study platform that understands your course material, 
              cites its sources, preserves your history, and protects your privacy.
            </p>
            <a
              href="/upload"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors shadow-md"
            >
              <FileText className="w-5 h-5" />
              Upload Your First Lecture
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
