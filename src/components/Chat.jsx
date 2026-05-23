import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {toast} from 'sonner';
import { Button } from './ui/button';
import { MessageSquare, Plus, Trash2, History as HistoryIcon, Loader2 } from 'lucide-react';
import {
  useAskQuestionMutation,
  useGetSessionsByFileIdQuery,
  useLazyGetSessionByIdQuery,
  useDeleteChatSessionMutation,
} from '../lib/api/api';

const Chat = ({ fileId, fileName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [askQuestion, { isLoading, error: apiError }] = useAskQuestionMutation();
  const [getSession] = useLazyGetSessionByIdQuery();
  const { data: sessionList = [] } = useGetSessionsByFileIdQuery(fileId, { skip: !fileId });
  const [deleteChatSession] = useDeleteChatSessionMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading, sessionId]);

  useEffect(() => {
    if (!fileId || loaded) return;
    if (sessionList.length > 0) {
      const latest = sessionList[0];
      setSessionId(latest._id);
      setSelectedSessionId(latest._id);
      setMessages(latest.messages || []);
    }
    setLoaded(true);
  }, [fileId, sessionList, loaded]);

  const handleNewSession = () => {
    setSessionId(null);
    setSelectedSessionId(null);
    setMessages([]);
  };

  const handleSelectSession = async (sid) => {
    try {
      const session = await getSession(sid).unwrap();
      setSelectedSessionId(sid);
      setSessionId(sid);
      setMessages(session.messages || []);
    } catch { }
  };

  const handleDeleteSession = async (sid, e) => {
    e.stopPropagation();
    toast.success('Deleting session...');

    try {
      await deleteChatSession(sid).unwrap();
      if (selectedSessionId === sid) {
        setSessionId(null);
        setSelectedSessionId(null);
        setMessages([]);
      }
    } catch { }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: question }]);

    try {
      const body = sessionId
        ? { sessionId, question }
        : { fileId, question };

      const result = await askQuestion(body).unwrap();

      if (result.sessionId && result.sessionId !== sessionId) {
        setSessionId(result.sessionId);
        setSelectedSessionId(result.sessionId);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: result.answer }]);
    } catch { }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* History sidebar */}
      <div className="md:w-64 shrink-0">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <HistoryIcon className="w-3.5 h-3.5" />
              Sessions
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewSession}
              className="h-7 px-2 text-xs gap-1 text-slate-500"
            >
              <Plus className="w-3.5 h-3.5" />
              New
            </Button>
          </div>
          <div className="max-h-[450px] overflow-y-auto p-1.5 space-y-0.5">
            {sessionList.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-6">
                No chat sessions yet
              </p>
            ) : (
              sessionList.map((s) => (
                <div key={s._id} className="group flex items-center gap-0.5">
                  <button
                    onClick={() => handleSelectSession(s._id)}
                    className={`flex-1 text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                      selectedSessionId === s._id
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="truncate font-medium text-sm">
                      {s.title || 'Chat session'}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {s.messages?.length || 0} messages
                    </div>
                  </button>
                  <button
                    onClick={(e) => handleDeleteSession(s._id, e)}
                    className="shrink-0 p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 opacity-60 hover:opacity-100 transition-all"
                    title="Delete session"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Chat
            </span>
            {fileName && (
              <span className="text-xs text-slate-400 dark:text-slate-500 truncate">
                — {fileName}
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && !isLoading && (
                <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500 text-sm text-center px-4">
                  <div>
                    <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-200 dark:text-slate-600" />
                    <p className="font-medium">Ask a question about your lecture</p>
                    <p className="text-xs mt-1">
                      {sessionId
                        ? 'Continue this conversation or start a new session'
                        : 'Your first question will create a new chat session'}
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-md'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {apiError && (
                <div className="flex justify-center">
                  <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg px-3 py-2 border border-red-200 dark:border-red-800">
                    {apiError.data?.error || apiError.message || 'Request failed'}
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 disabled:opacity-50 transition-colors"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-5 gap-1.5"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
