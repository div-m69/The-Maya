import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Sparkles, Menu, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Message } from '../types';
import { Message as MessageComponent } from '../components/Message';
import { Sidebar } from '../components/Sidebar';
import { chatService } from '../services/api';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm MAYA. I can help you find government schemes or provide business advice. How can I help you today?",
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        // If query mentions "scheme", use scheme search (temporary logic until full Router)
        if (input.toLowerCase().includes('scheme') || input.toLowerCase().includes('loan') || input.toLowerCase().includes('subsidy')) {
            const schemes = await chatService.searchSchemes(userMsg.content);
            
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: schemes.length > 0 
                    ? "Here are some schemes that might help you:" 
                    : "I couldn't find any specific schemes matching your criteria right now.",
                timestamp: new Date(),
                type: 'scheme-list',
                schemes: schemes.map(s => ({
                    id: s.id.toString(),
                    name: s.name,
                    category: s.category,
                    description: s.description,
                    benefits: s.benefits,
                    relevance_score: 90, // Placeholder
                    explanation: "Matched based on your query", // Placeholder
                    key_benefit: s.benefits.substring(0, 50) + "..."
                }))
            };
            setMessages(prev => [...prev, aiMsg]);
        } else {
            // Fallback for general chat (currently just testing AI connection)
            // In future, this will hit the LangGraph router
             const response = await chatService.testAi(userMsg.content);
             const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.response, // Adjust based on actual API response structure
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, aiMsg]);
        }

    } catch (error) {
        console.error("Error sending message:", error);
        const errorMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: "Sorry, I encountered an error while processing your request.",
            timestamp: new Date(),
            type: 'text'
        };
        setMessages(prev => [...prev, errorMsg]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full">
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setSidebarOpen(!isSidebarOpen)} 
                    className="text-text-secondary hover:text-white transition-colors"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-sm font-medium text-text-secondary">MAYA</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">Help</Button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((msg) => (
              <MessageComponent key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-black via-black/95 to-transparent">
          <div className="max-w-4xl mx-auto space-y-4">
             {/* Quick Actions */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                    { icon: <Search size={14} />, label: 'Find Schemes' },
                    { icon: <Sparkles size={14} />, label: 'Brand Ideas' },
                    { icon: <TrendingUp size={14} />, label: 'Market Research' },
                ].map((action, i) => (
                    <button 
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all whitespace-nowrap text-sm text-text-secondary hover:text-white"
                        onClick={() => setInput(action.label)}
                    >
                        {action.icon}
                        {action.label}
                    </button>
                ))}
             </div>

             {/* Input Bar */}
             <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-50 blur transition duration-500" />
                <div className="relative flex items-center bg-black rounded-full border border-white/10 px-4 py-2 shadow-2xl">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about your business..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-text-secondary px-4 py-2"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                    </button>
                </div>
             </div>
             <p className="text-center text-xs text-text-secondary">
                MAYA AI can make mistakes. Consider checking important information.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
