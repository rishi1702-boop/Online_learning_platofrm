import React, { useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import { FiX, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';

export default function QuizBuilderModal({ courseId, sectionId, onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }
  ]);
  const [saving, setSaving] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctOptionIndex: 0 }
    ]);
  };

  const handleRemoveQuestion = (idx) => {
    if (questions.length === 1) return;
    const newQ = [...questions];
    newQ.splice(idx, 1);
    setQuestions(newQ);
  };

  const handleQuestionChange = (idx, field, value) => {
    const newQ = [...questions];
    newQ[idx][field] = value;
    setQuestions(newQ);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const newQ = [...questions];
    newQ[qIdx].options[oIdx] = value;
    setQuestions(newQ);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Quiz title is required');
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        toast.error(`Question ${i + 1} text is required`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          toast.error(`Option ${j + 1} for Question ${i + 1} is required`);
          return;
        }
      }
    }

    setSaving(true);
    try {
      const res = await axiosInstance.post(`/instructor-api/add-quiz/${courseId}/${sectionId}`, {
        title,
        questions
      });
      toast.success('Quiz added successfully!');
      onSuccess(res.data.payload); // returns updated course
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add quiz');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Build a Quiz</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm border border-slate-200 transition">
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">Quiz Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Final Assessment"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-medium text-slate-700"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">Questions</h3>
            </div>
            
            {questions.map((q, qIdx) => (
              <div key={qIdx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl relative">
                {questions.length > 1 && (
                  <button 
                    onClick={() => handleRemoveQuestion(qIdx)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                    title="Remove Question"
                  >
                    <FiTrash2 size={18} />
                  </button>
                )}
                
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">{qIdx + 1}</span>
                  Question
                </h4>
                
                <input 
                  type="text"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIdx, 'questionText', e.target.value)}
                  placeholder="Enter question text here..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-medium text-slate-700"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="relative">
                      <div className="flex items-center">
                        <label className="flex items-center gap-2 absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
                          <input 
                            type="radio" 
                            name={`correct-${qIdx}`}
                            checked={q.correctOptionIndex === oIdx}
                            onChange={() => handleQuestionChange(qIdx, 'correctOptionIndex', oIdx)}
                            className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-gray-300"
                            title="Mark as correct answer"
                          />
                        </label>
                        <input 
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                          placeholder={`Option ${oIdx + 1}`}
                          className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition text-sm ${
                            q.correctOptionIndex === oIdx ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-slate-200 focus:border-indigo-400'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-wider">Select the radio button next to the correct option.</p>
              </div>
            ))}
          </div>

          <button 
            onClick={handleAddQuestion}
            className="mt-6 flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition px-4 py-2 rounded-xl hover:bg-indigo-50"
          >
            <FiPlus /> Add Another Question
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-70 transition shadow-lg shadow-indigo-200"
          >
            {saving ? 'Saving...' : <><FiSave size={18}/> Save Quiz</>}
          </button>
        </div>
      </div>
    </div>
  );
}
