import { Play, RotateCw, Settings, MessageSquare, ChevronDown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ExecutionViewProps {
    onBack?: () => void;
}

export function ExecutionView({ onBack }: ExecutionViewProps) {
    const [activeNode, setActiveNode] = useState<string | null>('__start__');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'system', content: string }[]>([
        { role: 'system', content: 'Ready to execute the workflow. Please provide input parameters or click submit to start.' }
    ]);
    const [isRunning, setIsRunning] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const runSimulation = () => {
        setIsRunning(true);
        // Step 1: User input
        if (inputValue) {
            setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
            setInputValue('');
        }

        // Sequence
        const sequence = [
            { node: '__start__', msg: 'Initializing workflow...', delay: 500 },
            { node: 'agent', msg: 'Agent analyzing request...', delay: 1500 },
            { node: 'action', msg: 'Executing tool: specific_tool_call', delay: 2500 },
            { node: 'agent', msg: 'Processing tool output...', delay: 3500 },
            { node: '__end__', msg: 'Workflow completed successfully.', delay: 4500 }
        ];

        let totalDelay = 0;

        sequence.forEach(({ node, msg, delay }) => {
            setTimeout(() => {
                setActiveNode(node);
                setMessages(prev => [...prev, { role: 'system', content: msg }]);
            }, delay);
            totalDelay = delay;
        });

        // Redirect after finish
        setTimeout(() => {
            onBack?.();
        }, totalDelay + 1000);
    };

    return (
        <div className="flex h-full bg-white text-slate-600 rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            {/* Left Panel - Graph Visualization */}
            <div className="w-1/2 flex flex-col border-r border-slate-100 relative">
                {/* Header */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-500 hover:text-slate-800"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition-colors text-slate-600">
                            <Settings size={12} />
                            Interrupts
                        </button>
                    </div>
                </div>

                {/* Graph Canvas Area */}
                <div className="flex-1 bg-white relative flex items-center justify-center p-8 overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Nodes - Mock Layout */}
                    <div className="relative w-full max-w-md h-[400px]">
                        {/* Start Node */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 p-3 rounded-xl border border-purple-200 bg-purple-50 text-center shadow-sm">
                            <span className="text-purple-700 font-mono text-sm">__start__</span>
                        </div>
                        {/* Arrow 1 */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-16 w-0.5 bg-slate-200">
                            <div className="absolute bottom-0 -left-[3px] text-slate-300 transform scale-75">▼</div>
                        </div>

                        {/* Agent Node */}
                        <div className={`absolute top-28 left-1/2 -translate-x-1/2 w-48 p-4 rounded-xl border transition-all duration-300 ${activeNode === 'agent' ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-100 ring-2 ring-purple-100' : 'border-purple-200 bg-white'}`}>
                            <div className="text-center">
                                <span className="text-purple-900 font-medium text-lg">agent</span>
                            </div>
                        </div>

                        {/* Action Node */}
                        <div className={`absolute top-64 left-10 w-40 p-4 rounded-xl border transition-all duration-300 ${activeNode === 'action' ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100 ring-2 ring-blue-100' : 'border-blue-200 bg-blue-50/30'}`}>
                            <div className="text-center">
                                <span className="text-blue-700 font-medium text-lg">action</span>
                            </div>
                        </div>

                        {/* End Node */}
                        <div className={`absolute top-64 right-10 w-40 p-4 rounded-xl border transition-all duration-300 ${activeNode === '__end__' ? 'border-amber-500 bg-amber-50 shadow-lg shadow-amber-100 ring-2 ring-amber-100' : 'border-amber-200 bg-amber-50/30'}`}>
                            <div className="text-center">
                                <span className="text-amber-700 font-mono text-sm">__end__</span>
                            </div>
                        </div>

                        {/* Connecting Lines (Simplified SVG) */}
                        <svg className="absolute inset-0 pointer-events-none w-full h-full text-slate-300">
                            {/* Agent to Action */}
                            <path d="M 200 180 Q 200 220 120 250" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2" />
                            {/* Agent to End */}
                            <path d="M 250 180 Q 250 220 330 250" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2" />
                            {/* Action to Agent */}
                            <path d="M 120 250 Q 100 220 180 180" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                {/* Input Panel */}
                <div className="h-48 border-t border-slate-100 bg-white p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-2 text-xs text-slate-500">
                        <span className="font-medium">Input</span>
                        <ChevronDown size={14} />
                    </div>
                    <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                        <MessageSquare size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">Messages</span>
                        <span className="ml-auto text-xs px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-400 shadow-sm">Optional</span>
                    </div>
                    <div className="mt-auto flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            <Settings size={14} />
                            Configurable
                        </button>
                        <button
                            onClick={runSimulation}
                            disabled={isRunning}
                            className="ml-auto flex items-center gap-2 px-6 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRunning ? (
                                <>
                                    <RotateCw size={14} className="animate-spin" />
                                    Running...
                                </>
                            ) : (
                                <>
                                    <Play size={14} className="fill-current" />
                                    Submit
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Activity Log */}
            <div className="w-1/2 flex flex-col bg-slate-50/50">
                <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white">
                    <span className="text-sm font-medium text-slate-700">Activity & Chat</span>
                    <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs shadow-sm">
                        <button className="px-3 py-1 bg-slate-100 text-slate-600 font-medium">Pretty</button>
                        <button className="px-3 py-1 hover:bg-slate-50 text-slate-400 bg-white">JSON</button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    {/* Chat Messages Area */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto font-mono">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] text-sm p-3 rounded-xl shadow-sm ${msg.role === 'user'
                                    ? 'bg-slate-900 text-white rounded-tr-sm'
                                    : msg.role === 'system'
                                        ? 'bg-slate-100 text-slate-500 text-xs border border-slate-200'
                                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input Area */}
                    <div className="p-4 border-t border-slate-100 bg-white">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isRunning && runSimulation()}
                                placeholder="Type a message..."
                                disabled={isRunning}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all pr-12 disabled:opacity-50 placeholder-slate-400"
                            />
                            <button
                                onClick={runSimulation}
                                disabled={isRunning}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50"
                            >
                                <MessageSquare size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
