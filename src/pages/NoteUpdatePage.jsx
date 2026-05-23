import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';
import UploadCard from '../components/UploadCard';
import PdfList from '../components/PdfList';
import PdfDetail from '../components/PdfDetail';
import {
  useGetAllPDFsQuery,
  useUploadPdfMutation,
  useDeletePDFMutation,
  useLazyDownloadSummaryQuery,
} from '../lib/api/api';
import { setSelectedId, setUploadError } from '../lib/features/uiSlice';

export default function NoteUpdatePage() {
  const dispatch = useDispatch();
  const { selectedId, uploadError } = useSelector((state) => state.ui);
  const [pollsActive, setPollsActive] = useState(false);

  const { data: pdfs = [] } = useGetAllPDFsQuery(undefined, {
    pollingInterval: pollsActive ? 3000 : 0,
  });

  useEffect(() => {
    const anyProcessing = pdfs.some(
      (p) => p.status === 'uploaded' || p.status === 'processing'
    );
    setPollsActive(anyProcessing);
  }, [pdfs]);

  const [uploadPdf, { isLoading: uploading }] = useUploadPdfMutation();
  const [deletePDF] = useDeletePDFMutation();
  const [triggerDownload] = useLazyDownloadSummaryQuery();

  const handleUpload = async (file) => {
    try {
      dispatch(setUploadError(null));
      const result = await uploadPdf(file).unwrap();
      toast.success('PDF uploaded', { description: 'Processing has started. You will be notified when ready.' });
      dispatch(setSelectedId(result.data._id));
    } catch (err) {
      const msg = err.data?.error || err.message;
      dispatch(setUploadError(msg));
      toast.error('Upload failed', { description: msg });
    }
  };

  const handleSelect = (id) => dispatch(setSelectedId(id));

  const handleDelete = async (id, e) => {
    e.stopPropagation();
toast.success('Lecture note deleted', { description: 'The summary and chat history will also be removed.' });
    try {
      await deletePDF(id).unwrap();
      toast.success('Lecture note deleted');
      if (selectedId === id) dispatch(setSelectedId(null));
    } catch (err) {
      toast.error('Failed to delete', { description: err.data?.error || err.message });
    }
  };

  const handleDownload = async (id) => {
    try {
      const text = await triggerDownload(id).unwrap();
      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `summary-${id}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Summary downloaded');
    } catch (err) {
      toast.error('Download failed', { description: err.data?.error || err.message });
    }
  };

  const selectedPdf = pdfs.find((p) => p._id === selectedId);

  if (selectedPdf) {
    return <PdfDetail pdf={selectedPdf} onBack={() => dispatch(setSelectedId(null))} onDownload={handleDownload} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 md:p-10 text-white mb-8 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span className="text-indigo-200 text-sm font-medium">AI-Powered Study Assistant</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Upload Your Lecture Notes</h1>
            <p className="text-indigo-100 text-base max-w-xl">
              Transform your PDFs into searchable knowledge. Get AI-powered summaries, source-cited answers, 
              and persistent chat sessions — all from your own course material.
            </p>
          </div>
        </div>

        <UploadCard onUpload={handleUpload} uploading={uploading} uploadError={uploadError} />

        <PdfList pdfs={pdfs} onSelect={handleSelect} onDelete={handleDelete} uploading={uploading} />
      </div>
    </div>
  );
}
