import { useState, useRef, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([
    { role: 'assistant', content: 'Hi there! I am your AI learning assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/common-api/chatbot', {
        message: userMessage.content,
        history: history.slice(1) // send history without initial greeting if preferred
      });

      const data = response.data;
      
      if (data.success) {
        setHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setHistory(prev => [...prev, { role: 'assistant', content: "Oops! I'm having trouble connecting right now." }]);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setHistory(prev => [...prev, { role: 'assistant', content: "Network error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`bg-white border border-gray-200 rounded-2xl shadow-2xl mb-4 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'w-80 h-[450px] opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span className="font-semibold">AI Assistant</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {history.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-violet-600 text-white rounded-tr-sm' 
                    : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />
          <button 
            type="submit"
            disabled={!message.trim() || isLoading}
            className="bg-violet-600 text-white rounded-xl p-2 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full p-4 shadow-lg shadow-violet-900/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} absolute bottom-0 right-0`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default Chatbot;
