import { FileText, Trash2, Eye } from 'lucide-react';
import StatusBadge, { formatDate } from './StatusBadge';
import { useState } from 'react';

const cardColors = ['from-indigo-500 to-blue-500', 'from-purple-500 to-pink-500', 'from-emerald-500 to-teal-500', 'from-amber-500 to-orange-500', 'from-rose-500 to-red-500'];

export default function PdfCard({ pdf, onSelect, onDelete, index = 0 }) {
  const [hover, setHover] = useState(false);
  const isProcessing = pdf.status === 'uploaded' || pdf.status === 'processing';
  const gradient = cardColors[index % cardColors.length];

  return (
    <div
      className={`relative bg-white rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer overflow-hidden ${
        isProcessing ? 'opacity-80' : hover ? 'shadow-lg -translate-y-1' : 'hover:shadow-md hover:-translate-y-0.5'
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onSelect(pdf._id)}
    >
      {/* Color top bar */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
            <FileText className="w-4 h-4" />
          </div>
          <StatusBadge status={pdf.status} />
        </div>

        <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {pdf.originalName}
        </h3>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">{formatDate(pdf.createdAt)}</span>

          {/* Actions appear on hover */}
          {hover && (
            <div className="flex gap-1 animate-in fade-in slide-in-from-right-1 duration-200">
              <button
                onClick={(e) => { e.stopPropagation(); onSelect(pdf._id); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="View"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => onDelete(pdf._id, e)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
