import clsx from 'clsx';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function AgentSelector() {
    const [selected, setSelected] = useState<number | null>(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const agents = [
        { name: 'General Purpose Agent', description: 'Versatile AI for general tasks' },
        { name: 'Data Analysis Agent', description: 'Specialized in data insights' },
        { name: 'Document Parser', description: 'Extract structured data' },
        { name: 'Summary Generator', description: 'Create concise summaries' },
    ];

    const handleStartProcessing = () => {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <h3 className="text-lg font-semibold text-slate-800">Select Your Agent</h3>

            <div className="grid grid-cols-2 gap-3">
                {agents.map((agent, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(idx)}
                        className={clsx(
                            "py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border cursor-pointer text-left",
                            selected === idx
                                ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                        )}
                    >
                        <div className="font-semibold">{agent.name}</div>
                        <div className={clsx("text-xs mt-1", selected === idx ? "text-slate-300" : "text-slate-400")}>
                            {agent.description}
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={handleStartProcessing}
                disabled={selected === null || isProcessing}
                className={clsx(
                    "mt-auto w-full py-3 rounded-xl font-medium transition-all shadow-lg duration-200 cursor-pointer flex items-center justify-center gap-2",
                    isProcessing
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20 active:scale-[0.98]"
                )}
            >
                {isProcessing ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Sparkles size={16} />
                        Start Processing
                    </>
                )}
            </button>
        </div>
    );
}
