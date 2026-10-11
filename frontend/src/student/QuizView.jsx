import React, { useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiAward } from 'react-icons/fi';

export default function QuizView({ quiz, courseId, sectionId }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null); // { score, passed, total }
  const [submitting, setSubmitting] = useState(false);

  const handleOptionSelect = (qIndex, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    // Validate all answered
    if (Object.keys(answers).length < quiz.questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      // Format answers as array
      const answersArray = Array.from({ length: quiz.questions.length }).map((_, i) => answers[i]);
      const res = await axiosInstance.post(`/user-api/attempt-quiz/${courseId}/${quiz._id}`, {
        answers: answersArray
      });
      setResult(res.data.payload);
      toast.success("Quiz submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-900 rounded-xl max-w-2xl mx-auto my-12 border border-slate-800">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${result.passed ? 'bg-emerald-900/50 text-emerald-400' : 'bg-rose-900/50 text-rose-400'}`}>
          {result.passed ? <FiAward size={48} /> : <FiXCircle size={48} />}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {result.passed ? "Congratulations!" : "Keep Practicing!"}
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          You scored <span className="font-bold text-white">{result.score}</span> out of {result.totalQuestions}
        </p>
        
        <div className="w-full space-y-4">
          <h3 className="text-lg font-bold text-slate-300 mb-4 border-b border-slate-800 pb-2">Review Answers</h3>
          {quiz.questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctOptionIndex;
            return (
              <div key={i} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-900/10 border-emerald-900/50' : 'bg-rose-900/10 border-rose-900/50'}`}>
                <p className="text-sm font-medium text-slate-200 mb-3">{i + 1}. {q.questionText}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    let optStyle = "text-slate-400";
                    if (oIdx === q.correctOptionIndex) optStyle = "text-emerald-400 font-bold";
                    else if (oIdx === userAnswer && !isCorrect) optStyle = "text-rose-400 line-through";
                    
                    return (
                      <div key={oIdx} className={`text-sm flex items-center gap-2 ${optStyle}`}>
                        {oIdx === q.correctOptionIndex && <FiCheckCircle size={14} />}
                        {oIdx === userAnswer && !isCorrect && <FiXCircle size={14} />}
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => {
            setResult(null);
            setAnswers({});
          }}
          className="mt-8 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{quiz.title}</h2>
        <p className="text-slate-400">Answer the following questions to test your knowledge.</p>
      </div>

      <div className="space-y-8">
        {quiz.questions.map((q, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              <span className="text-violet-500 mr-2">{i + 1}.</span> {q.questionText}
            </h3>
            <div className="space-y-3">
              {q.options.map((opt, oIdx) => (
                <label 
                  key={oIdx} 
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition border ${
                    answers[i] === oIdx 
                      ? 'bg-violet-900/30 border-violet-500' 
                      : 'bg-slate-800 border-transparent hover:bg-slate-700'
                  }`}
                >
                  <input 
                    type="radio"
                    name={`question-${i}`}
                    checked={answers[i] === oIdx}
                    onChange={() => handleOptionSelect(i, oIdx)}
                    className="w-4 h-4 text-violet-600 bg-slate-900 border-slate-600 focus:ring-violet-600"
                  />
                  <span className={answers[i] === oIdx ? 'text-violet-100 font-medium' : 'text-slate-300'}>
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting || Object.keys(answers).length < quiz.questions.length}
          className="px-8 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition"
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
}
