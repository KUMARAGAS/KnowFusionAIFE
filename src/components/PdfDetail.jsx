import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Chat from './Chat';
import StatusBadge, { formatDate } from './StatusBadge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText, Download, ChevronLeft, Loader2, BookOpen, MessageSquare, Brain, ListChecks, Bookmark } from 'lucide-react';
import Quiz from './Quiz';

const tabs = [
  { key: 'summary', label: 'Summary', Icon: BookOpen },
  { key: 'chat', label: 'Chat', Icon: MessageSquare },
  { key: 'quiz', label: 'Quiz', Icon: Brain },
];

const MarkdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mt-7 mb-3 flex items-center gap-2">
      <Bookmark className="w-4 h-4 shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 mb-4">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 rounded-r-lg px-4 py-3 my-4">
      <p className="text-sm text-indigo-700 dark:text-indigo-300 italic leading-relaxed">{children}</p>
    </div>
  ),
  code: ({ children, ...props }) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code className="bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 text-xs font-mono px-1.5 py-0.5 rounded">
          {children}
        </code>
      );
    }
    return (
      <pre className="bg-slate-900 dark:bg-slate-800 text-slate-100 rounded-xl p-4 overflow-x-auto my-4 text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    );
  },
  hr: () => <hr className="my-6 border-slate-200 dark:border-slate-700" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-600 dark:text-slate-400">
      {children}
    </td>
  ),
};

export default function PdfDetail({ pdf, onBack, onDownload }) {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to All Notes
        </button>

        {/* PDF Header Card */}
        <Card className="mb-6 border-slate-200 dark:border-slate-700 shadow-sm dark:bg-slate-800">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl text-slate-900 dark:text-white">{pdf.originalName}</CardTitle>
                <div className="flex items-center gap-3 mt-1.5">
                  <StatusBadge status={pdf.status} className="!px-2.5 !py-0.5 !text-xs" />
                  <span className="text-xs text-slate-400 dark:text-slate-500">{formatDate(pdf.createdAt)}</span>
                </div>
              </div>
            </div>
            {pdf.status === 'processed' && pdf.summary && (
              <Button variant="outline" size="sm" onClick={() => onDownload(pdf._id)} className="shrink-0 gap-1.5">
                <Download className="w-4 h-4" />
                Download
              </Button>
            )}
          </CardHeader>
        </Card>

        {/* Failed state */}
        {pdf.status === 'failed' && (
          <Card className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="pt-6"><p className="text-red-700 dark:text-red-300 text-sm">Processing failed. Please try uploading again.</p></CardContent>
          </Card>
        )}

        {/* Processing state */}
        {(pdf.status === 'uploaded' || pdf.status === 'processing') && (
          <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
                <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                  {pdf.status === 'uploaded' ? 'Your PDF has been queued for processing...' : 'Generating summary and building knowledge base...'}
                </p>
              </div>
              <div className="mt-4 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-1.5">
                <div className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full transition-all duration-500" style={{ width: pdf.status === 'uploaded' ? '20%' : '60%' }} />
              </div>
              <p className="text-blue-500 dark:text-blue-400 text-xs mt-2">This may take a few minutes depending on the PDF size</p>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        {pdf.status === 'processed' && (
          <>
            <div className="flex gap-1 mb-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-1">
              {tabs.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === key
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {activeTab === 'summary' && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                {/* Gradient header */}
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/20">
                      <ListChecks className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold text-lg">Lecture Summary</h2>
                      <p className="text-indigo-100 text-xs mt-0.5">AI-generated overview of your lecture content</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                  <div className="max-w-none">
                    <ReactMarkdown components={MarkdownComponents}>{pdf.summary}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <Chat fileId={pdf._id} fileName={pdf.originalName} />
            )}

            {activeTab === 'quiz' && (
              <Quiz fileId={pdf._id} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
