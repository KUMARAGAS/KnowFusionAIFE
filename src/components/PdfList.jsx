import { FileText, BookOpen, MessageSquare, Layers } from 'lucide-react';
import PdfCard from './PdfCard';

export default function PdfList({ pdfs, onSelect, onDelete, uploading }) {
  const processedCount = pdfs.filter((p) => p.status === 'processed').length;
  const totalSessions = pdfs.reduce((sum, p) => sum + (p.chatCount || 0), 0);

  return (
    <>
      {/* Stats bar */}
      {pdfs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'PDFs Processed', value: processedCount, Icon: FileText, color: 'text-indigo-600 bg-indigo-100' },
            { label: 'Total Uploads', value: pdfs.length, Icon: Layers, color: 'text-purple-600 bg-purple-100' },
            { label: 'Pages Indexed', value: pdfs.reduce((s, p) => s + (p.pageCount || 0), 0) || '—', Icon: BookOpen, color: 'text-emerald-600 bg-emerald-100' },
            { label: 'Chat Sessions', value: totalSessions || '—', Icon: MessageSquare, color: 'text-amber-600 bg-amber-100' },
          ].map(({ label, value, Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-400">{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {pdfs.length === 0 && !uploading && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-4 rounded-2xl bg-slate-100 inline-flex mb-4">
            <FileText className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No lecture notes yet</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Upload a PDF to get started. Your summaries, chat sessions, and knowledge base will appear here.
          </p>
        </div>
      )}

      {/* Grid */}
      {pdfs.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Your Lecture Notes
              <span className="text-slate-400 font-normal text-base ml-2">({pdfs.length})</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pdfs.map((pdf, i) => (
              <PdfCard key={pdf._id} pdf={pdf} index={i} onSelect={onSelect} onDelete={onDelete} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
