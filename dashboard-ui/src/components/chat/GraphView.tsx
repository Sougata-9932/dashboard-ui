interface GraphViewProps {
    selectedTaskId?: string | null;
}

export function GraphView({ selectedTaskId }: GraphViewProps) {
    if (!selectedTaskId) {
        return (
            <div className="h-full w-full relative bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Select a Task</h3>
                <p className="text-slate-500 max-w-sm">
                    Select a completed task from the navigation menu to view its processing workflow and results.
                </p>
            </div>
        );
    }

    return (
        <div className="h-full w-full relative bg-slate-100/50 rounded-3xl overflow-hidden p-8 flex items-center justify-center">
            <div className="absolute top-6 left-6 z-30">
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium text-slate-600">Task ID: {selectedTaskId}</span>
                </div>
            </div>

            {/* Fixed size container to ensure nodes and SVG lines always align perfectly */}
            <div className="relative w-[500px] h-[300px] flex-shrink-0">
                {/* Central Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="bg-white px-6 py-3 rounded-full shadow-md text-slate-800 font-medium border border-slate-200 whitespace-nowrap">
                        General Analysis Agent
                    </div>
                </div>

                {/* Surrounding Nodes */}
                <div className="absolute top-0 left-10">
                    <div className="bg-white/80 px-4 py-2 rounded-full text-xs text-slate-500 border border-slate-200 whitespace-nowrap">Starting Agent</div>
                </div>
                <div className="absolute bottom-10 right-10">
                    <div className="bg-white/80 px-4 py-2 rounded-full text-xs text-slate-500 border border-slate-200 whitespace-nowrap">Data Source A</div>
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2">
                    <div className="bg-white/80 px-4 py-2 rounded-full text-xs text-slate-500 border border-slate-200 whitespace-nowrap">Data Analysis Agent</div>
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
