import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import{toast} from 'sonner';

import {
  useGenerateQuizMutation,
  useSubmitQuizAnswersMutation,
  useGetQuizSessionsByFileIdQuery,
  useLazyGetQuizSessionByIdQuery,
  useDeleteQuizSessionMutation,
} from '../lib/api/api';
import {
  Loader2, Sparkles, CheckCircle2, XCircle, Brain, ArrowLeft, RotateCcw,
  Clock, History, Award, Plus, Trash2,
} from 'lucide-react';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function Quiz({ fileId }) {
  const { data: sessionList = [] } = useGetQuizSessionsByFileIdQuery(fileId);

  const [generateQuiz, { isLoading: isGenerating, error: genError }] = useGenerateQuizMutation();
  const [submitAnswers, { isLoading: isSubmitting }] = useSubmitQuizAnswersMutation();
  const [getSession] = useLazyGetQuizSessionByIdQuery();
  const [deleteQuiz] = useDeleteQuizSessionMutation();

  // UI state
  const [view, setView] = useState('history'); // 'history' | 'config' | 'active' | 'results'
  const [config, setConfig] = useState({ count: 5, chapter: '' });
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultQuiz, setResultQuiz] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleNewQuiz = () => {
    setView('config');
    setActiveQuiz(null);
    setSelectedAnswers({});
    setShowResults(false);
    setResultQuiz(null);
    setCurrentIndex(0);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setShowResults(false);
    setResultQuiz(null);
    try {
      const body = { fileId, count: config.count, chapter: config.chapter };
      if (!body.chapter) delete body.chapter;
      const result = await generateQuiz(body).unwrap();
      setActiveQuiz(result.data);
      setSelectedAnswers({});
      setCurrentIndex(0);
      setView('active');
    } catch { }
  };

  const handleSelect = (index) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: index }));
  };

  const handleSubmitQuiz = async () => {
    try {
      console.log('📤 Submitting quiz answers:', { quizId: activeQuiz._id, answers: selectedAnswers });
      const result = await submitAnswers({
        quizId: activeQuiz._id,
        answers: selectedAnswers,
      }).unwrap();
      console.log('✅ Quiz submitted successfully:', result);
      setResultQuiz({
        ...result.data,
        questions: activeQuiz.questions,
        title: activeQuiz.title,
      });
      setView('results');
      setShowResults(true);
    } catch (error) {
      console.error('❌ Quiz submission error:', error);
      alert(`Error: ${error?.data?.error || error?.message || 'Failed to submit quiz'}`);
    }
  };

  const handleViewPastResult = async (quizId) => {
    try {
      const quiz = await getSession(quizId).unwrap();
      setResultQuiz(quiz);
      setShowResults(true);
      setView('results');
    } catch { }
  };

  const handleBackToHistory = () => {
    setView('history');
    setActiveQuiz(null);
    setResultQuiz(null);
    setShowResults(false);
  };

  const handleDeleteQuiz = async (quizId, e) => {
    e.stopPropagation();
    toast.success('Quiz deleted');
    try {
      await deleteQuiz(quizId).unwrap();
    } catch { }
  };

  const handleRetry = () => {
    setView('config');
    setActiveQuiz(null);
    setSelectedAnswers({});
    setShowResults(false);
    setResultQuiz(null);
    setCurrentIndex(0);
  };

  // --- Render: History ---
  if (view === 'history') {
    return (
      <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Quiz Center
            </CardTitle>
            <Button onClick={handleNewQuiz} size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" />
              New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sessionList.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <Brain className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
              <p className="font-medium">No quizzes yet</p>
              <p className="text-sm mt-1">Generate a quiz from this lecture to test your knowledge.</p>
              <Button onClick={handleNewQuiz} className="mt-4 gap-1.5">
                <Sparkles className="w-4 h-4" />
                Generate Your First Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {sessionList.map((s) => (
                <div key={s._id} className="flex items-center gap-1">
                  <button
                    onClick={() => handleViewPastResult(s._id)}
                    className="flex-1 text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate">{s.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(s.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-slate-400">{s.questionCount} questions</span>
                          {s.chapter && (
                            <span className="text-xs text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                              {s.chapter}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        {s.completed ? (
                          <div className="flex items-center gap-1.5">
                            <Award className={`w-4 h-4 ${(s.score / s.total) >= 0.7 ? 'text-green-500' : (s.score / s.total) >= 0.4 ? 'text-yellow-500' : 'text-red-500'}`} />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              {s.score}/{s.total}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                            Not completed
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={(e) => handleDeleteQuiz(s._id, e)}
                    className="shrink-0 p-2 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 opacity-60 hover:opacity-100 transition-all"
                    title="Delete quiz"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // --- Render: Config Form ---
  if (view === 'config') {
    return (
      <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <button onClick={handleBackToHistory} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              New Quiz
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Number of Questions
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={config.count}
                onChange={(e) => setConfig((c) => ({ ...c, count: Number(e.target.value) }))}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Specific Topic / Chapter <span className="text-slate-400 dark:text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={config.chapter}
                onChange={(e) => setConfig((c) => ({ ...c, chapter: e.target.value }))}
                placeholder="e.g. Chapter 3, Neural Networks, etc."
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-colors"
              />
            </div>
            <Button type="submit" disabled={isGenerating} className="w-full gap-2">
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating Questions...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Generate Quiz</>
              )}
            </Button>
            {genError && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg px-4 py-2 border border-red-200 dark:border-red-800">
                {genError.data?.error || genError.message || 'Failed to generate quiz'}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    );
  }

  // --- Render: Results (from history or after submission) ---
  if (view === 'results' && resultQuiz) {
    const questions = resultQuiz.questions;
    const isPastResult = resultQuiz.completed !== undefined;
    // For active quiz submission results, score/total is in the outer wrapper
    const score = resultQuiz.score ?? 0;
    const total = resultQuiz.total ?? questions?.length ?? 0;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const gradeColor = percentage >= 80 ? 'text-green-600 dark:text-green-400' : percentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';
    const gradeBg = percentage >= 80 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : percentage >= 50 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';

    return (
      <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <button onClick={handleBackToHistory} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              {resultQuiz.title || 'Quiz Results'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`mb-6 rounded-xl border p-6 text-center ${gradeBg}`}>
            <p className={`text-4xl font-bold ${gradeColor}`}>{percentage}%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{score} of {total} correct</p>
          </div>

          <div className="space-y-6">
            {questions.map((q, qi) => {
              const answers = resultQuiz.answers || {};
              const selected = answers[String(qi)] !== undefined ? Number(answers[String(qi)]) : undefined;
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={qi} className={`rounded-xl border p-4 ${
                  isCorrect
                    ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10'
                    : selected !== undefined
                      ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 ${isCorrect ? 'text-green-600 dark:text-green-400' : selected !== undefined ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`}>
                      {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : selected !== undefined ? <XCircle className="w-5 h-5" /> : <span className="text-xs font-mono">{qi + 1}</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-sm mb-2">{qi + 1}. {q.question}</p>
                      <div className="space-y-1">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className={`text-sm px-3 py-1.5 rounded-lg ${
                            oi === q.correctIndex
                              ? 'bg-green-200/60 dark:bg-green-800/40 text-green-800 dark:text-green-300 font-medium'
                              : oi === selected && oi !== q.correctIndex
                                ? 'bg-red-200/60 dark:bg-red-800/40 text-red-800 dark:text-red-300'
                                : 'text-slate-600 dark:text-slate-400'
                          }`}>
                            <span className="font-mono mr-2">{OPTION_LABELS[oi]}.</span>
                            {opt}
                            {oi === q.correctIndex && <span className="ml-2 text-xs text-green-700 dark:text-green-400">✓ Correct</span>}
                          </div>
                        ))}
                      </div>
                      {q.explanation && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic leading-relaxed">{q.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={handleBackToHistory} variant="outline" className="gap-1.5">
              <History className="w-4 h-4" />
              Back to History
            </Button>
            <Button onClick={handleRetry} className="gap-1.5">
              <RotateCcw className="w-4 h-4" />
              New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- Render: Active Quiz ---
  if (!activeQuiz || !activeQuiz.questions) return null;
  const { questions } = activeQuiz;
  const question = questions[currentIndex];
  const hasAnswered = selectedAnswers[currentIndex] !== undefined;
  const allAnswered = questions.every((_, i) => selectedAnswers[i] !== undefined);

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBackToHistory} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Quiz
            </CardTitle>
          </div>
          <span className="text-sm text-slate-400 dark:text-slate-500">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mt-2">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-slate-800 dark:text-slate-200 mb-4 leading-relaxed">
          {currentIndex + 1}. {question.question}
        </p>
        <div className="space-y-2 mb-6">
          {question.options.map((opt, oi) => {
            const isSelected = selectedAnswers[currentIndex] === oi;
            return (
              <button
                key={oi}
                onClick={() => handleSelect(oi)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <span className="font-mono font-medium mr-3">{OPTION_LABELS[oi]}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))} disabled={currentIndex === 0} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex-1" />
          {currentIndex < questions.length - 1 ? (
            <Button onClick={() => setCurrentIndex((i) => i + 1)} disabled={!hasAnswered}>Next</Button>
          ) : (
            <Button onClick={handleSubmitQuiz} disabled={!allAnswered || isSubmitting} className="gap-1.5">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {isSubmitting ? 'Submitting...' : 'See Results'}
            </Button>
          )}
        </div>

        <div className="flex gap-1.5 mt-5 justify-center">
          {questions.map((_, qi) => (
            <button
              key={qi}
              onClick={() => setCurrentIndex(qi)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                qi === currentIndex
                  ? 'bg-indigo-500 scale-125'
                  : selectedAnswers[qi] !== undefined
                    ? 'bg-indigo-300 dark:bg-indigo-500'
                    : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
