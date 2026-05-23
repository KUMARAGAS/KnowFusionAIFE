import { Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const statusConfig = {
  uploaded: { label: 'Queued', color: 'text-yellow-600 bg-yellow-50', Icon: Clock },
  processing: { label: 'Processing', color: 'text-blue-600 bg-blue-50', Icon: Loader2 },
  processed: { label: 'Ready', color: 'text-green-600 bg-green-50', Icon: CheckCircle },
  failed: { label: 'Failed', color: 'text-red-600 bg-red-50', Icon: AlertCircle },
};

export function formatDate(dateString) {
  const d = new Date(dateString);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

export default function StatusBadge({ status, className = '' }) {
  const cfg = statusConfig[status] || { label: status, color: 'text-slate-600 bg-slate-50', Icon: Clock };
  const isProcessing = status === 'processing';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color} ${className}`}>
      <cfg.Icon className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
      {cfg.label}
    </span>
  );
}
