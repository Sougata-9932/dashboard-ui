export function GraphView() {
    return (
        <div className="h-full w-full relative bg-slate-100/50 rounded-3xl overflow-hidden p-8 flex items-center justify-center">
            <div className="relative w-full h-full max-w-lg max-h-[300px]">
                {/* Central Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="bg-white px-6 py-3 rounded-full shadow-md text-slate-800 font-medium border border-slate-200">
                        General Analysis Agent
                    </div>
                </div>

                {/* Surrounding Nodes */}
                <div className="absolute top-0 left-10">
                    <div className="bg-white/80 px-4 py-2 rounded-full text-xs text-slate-500 border border-slate-200">Starting Agent</div>
                </div>
                <div className="absolute bottom-10 right-10">
                    <div className="bg-white/80 px-4 py-2 rounded-full text-xs text-slate-500 border border-slate-200">Data Source A</div>
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2">
                    <div className="bg-white/80 px-4 py-2 rounded-full text-xs text-slate-500 border border-slate-200">Data Analysis Agent</div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
                    <path d="M100 30 L 250 150 L 400 150" fill="none" stroke="black" strokeWidth="1" strokeDasharray="5,5" />
                    <path d="M250 150 L 400 250" fill="none" stroke="black" strokeWidth="1" strokeDasharray="5,5" />
                </svg>
            </div>
        </div>
    );
}
