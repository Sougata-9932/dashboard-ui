import { Send, Paperclip } from 'lucide-react';
import clsx from 'clsx';
import { useState, useCallback, useRef, useEffect } from 'react';

interface Message {
    id: number;
    role: 'ai' | 'user';
    content: string;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'ai', content: "Hi! I'm ready to analyze your document. Upload a file to get started!" },
        { id: 2, role: 'ai', content: "I can extract key points, summarize content, and answer questions about your documents." },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = useCallback(() => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            role: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponses = [
                "That's an interesting question! Based on the document analysis, I can help you with that.",
                "I've processed your request. Here are the key insights from the data.",
                "Great question! Let me analyze that for you based on the uploaded document.",
                "I understand. I'll extract the relevant information for you right away.",
            ];

            const aiMessage: Message = {
                id: Date.now() + 1,
                role: 'ai',
                content: aiResponses[Math.floor(Math.random() * aiResponses.length)]
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    }, [inputValue]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }, [handleSend]);

    return (
        <div className="h-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="flex items-center gap-3 p-4 border-b border-slate-50">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">AI</div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">AI Assistant</p>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-xs text-slate-400">Online</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 flex flex-col gap-3">
                {messages.map((msg) => (
                    <div key={msg.id} className={clsx("flex gap-3 max-w-[85%] animate-fadeIn", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-600">AI</div>
                        )}
                        <div className={clsx(
                            "p-3 rounded-2xl text-sm leading-relaxed",
                            msg.role === 'ai' ? "bg-slate-900 text-white rounded-tl-none" : "bg-slate-100 text-slate-800 rounded-tr-none"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-600">AI</div>
                        <div className="flex gap-1 bg-slate-900 p-3 rounded-2xl rounded-tl-none">
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.1s]" />
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-50">
                <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-100 focus-within:ring-2 focus-within:ring-slate-900/10 transition-all">
                    <Paperclip size={18} className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-800 placeholder:text-slate-400"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className={clsx(
                            "p-1.5 rounded-full transition-all cursor-pointer",
                            inputValue.trim()
                                ? "bg-slate-900 text-white hover:opacity-90"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
