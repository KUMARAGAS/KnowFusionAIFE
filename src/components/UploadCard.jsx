import { useState, useRef } from 'react';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';

export default function UploadCard({ onUpload, uploading, uploadError }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === 'application/pdf') onUpload(f);
  };

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onUpload(f);
    e.target.value = '';
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative mb-8 border-2 border-dashed rounded-2xl p-10 md:p-14 text-center cursor-pointer transition-all ${
        dragOver
          ? 'border-indigo-400 bg-indigo-50 scale-[1.01]'
          : 'border-slate-300 bg-white/60 hover:border-indigo-300 hover:bg-indigo-50/30'
      } ${uploading ? 'pointer-events-none opacity-70' : ''}`}
    >
      <input ref={inputRef} type="file" accept="application/pdf" onChange={handleChange} className="hidden" disabled={uploading} />

      {uploading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-2xl bg-blue-100">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-800">Uploading PDF...</p>
            <p className="text-sm text-slate-400 mt-1">Please wait while we process your file</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-2xl transition-colors ${dragOver ? 'bg-indigo-100' : 'bg-slate-100'}`}>
            <Upload className={`w-10 h-10 transition-colors ${dragOver ? 'text-indigo-600' : 'text-slate-400'}`} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-800">
              {dragOver ? 'Drop your PDF here' : 'Upload a Lecture Note'}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Drag and drop your PDF here, or click to browse
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> PDF only</span>
            <span>•</span>
            <span>No file size limit</span>
            <span>•</span>
            <span>Free for students</span>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {uploadError}
        </div>
      )}
    </div>
  );
}
