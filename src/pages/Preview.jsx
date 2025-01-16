import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Preview = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);

    // AI response
    setTimeout(() => {
      const aiResponse = "Namaste Saar! Your message has been received with the enthusiasm of a cricket fan during World Cup finals! 🏏";
      setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center gradient-text">Paj33tooor Chatbot</h1>
        <div className="bg-gray-900/50 rounded-lg p-4 h-[32rem] overflow-y-auto mb-4 border border-[#FF9933]/20">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              Start a conversation with Paj33tooor! Warning: Side effects may include excessive laughter and chai cravings! 😅
            </div>
          )}
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-[#FF9933] text-white'
                    : 'bg-[#138808] text-white'
                }`}
              >
                {message.text}
              </span>
            </motion.div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-3 rounded-lg bg-gray-800 text-white border border-[#FF9933]/20 focus:border-[#FF9933]/50 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Preview;
