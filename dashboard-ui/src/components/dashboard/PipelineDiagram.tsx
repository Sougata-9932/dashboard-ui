import { GitBranch, FileText, Search, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

interface PipelineConfig {
    depth: 'basic' | 'deep';
    mode: 'auto' | 'manual';
    throughput: 'standard' | 'high';
}

interface PipelineDiagramProps {
    config: PipelineConfig;
}

export function PipelineDiagram({ config }: PipelineDiagramProps) {
    const isDeep = config.depth === 'deep';
    const isHigh = config.throughput === 'high';
    const isManual = config.mode === 'manual';

    return (
        <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-100 p-8 flex items-center justify-center relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.2]"
                style={{
                    backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 flex items-center gap-12">
                {/* Entry Node */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600 transition-all duration-300">
                        <FileText size={24} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Input</span>
                </div>

                {/* Arrow 1 */}
                <div className="w-8 h-px bg-slate-200 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-slate-200" />
                </div>

                {/* Primary Agent / Parallel Block */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-16 h-16 bg-slate-900 rounded-3xl shadow-xl flex items-center justify-center text-white ring-4 ring-slate-100 group-hover:scale-110 transition-transform duration-300">
                            <Search size={28} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">OCR & Parse</span>
                    </div>

                    {isHigh && (
                        <div className="flex flex-col items-center gap-3 group animate-fadeIn">
                            <div className="w-16 h-16 bg-slate-200 rounded-3xl shadow-sm flex items-center justify-center text-slate-500 border border-slate-300 group-hover:bg-slate-300 transition-all">
                                <Search size={24} />
                            </div>
                            <span className="text-[10px] font-medium text-slate-400">Parallel Instance</span>
                        </div>
                    )}
                </div>

                {/* Arrow to Next Layer */}
                <div className="w-12 h-px bg-slate-200 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-slate-200" />
                </div>

                {/* Branching Logic */}
                <div className="flex flex-col gap-8 relative">
                    {/* Top Branch: Analysis */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="px-6 py-3 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center gap-3 hover:shadow-lg transition-shadow cursor-default">
                            <Cpu size={18} className="text-purple-500" />
                            <span className="text-sm font-semibold text-slate-700">AI Analyzer</span>
                        </div>
                    </div>

                    {/* Conditional Manual Review if enabled */}
                    {isManual && (
                        <div className="flex flex-col items-center gap-3 animate-fadeIn">
                            <div className="px-6 py-3 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3 shadow-sm">
                                <AlertCircle size={18} className="text-rose-500" />
                                <span className="text-sm font-semibold text-rose-700">Human Review</span>
                            </div>
                        </div>
                    )}

                    {/* Extra Analysis Layer if Deep */}
                    {isDeep && (
                        <div className="flex flex-col items-center gap-3 animate-fadeIn">
                            <div className="px-6 py-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3 shadow-sm">
                                <GitBranch size={18} className="text-amber-500" />
                                <span className="text-sm font-semibold text-amber-700">Deep Extraction</span>
                            </div>
                        </div>
                    )}

                    {/* Connecting Vertical Bar */}
                    {(isManual || isDeep) && (
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-[calc(100%-20px)] border-l-2 border-y-2 border-slate-200 rounded-l-lg" />
                    )}
                </div>

                {/* Final Arrow */}
                <div className="w-12 h-px bg-slate-200 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-slate-200" />
                </div>

                {/* Output Node */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-100 transition-all duration-300">
                        <CheckCircle2 size={24} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600">Complete</span>
                </div>
            </div>

            {/* Config Overlay Labels */}
            <div className="absolute bottom-4 left-6 flex gap-4">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <div className={`w-1.5 h-1.5 rounded-full ${isDeep ? 'bg-amber-400' : 'bg-slate-300'}`} />
                    Depth: {config.depth}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <div className={`w-1.5 h-1.5 rounded-full ${isManual ? 'bg-rose-400' : 'bg-slate-300'}`} />
                    Mode: {config.mode}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <div className={`w-1.5 h-1.5 rounded-full ${isHigh ? 'bg-green-400' : 'bg-slate-300'}`} />
                    Load: {config.throughput}
                </div>
            </div>
        </div>
    );
}
