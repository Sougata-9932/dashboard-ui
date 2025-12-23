import { BarChart3, TrendingUp, Download, Share2, FileText, ArrowRight } from 'lucide-react';

interface ResultsViewProps {
    taskId: string | null;
}

export function ResultsView({ taskId }: ResultsViewProps) {
    if (!taskId) return null;

    return (
        <div className="h-full w-full bg-slate-50/50 rounded-3xl overflow-hidden flex flex-col min-h-0">
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analysis Results</h2>
                        <p className="text-slate-500">Task ID: {taskId} • Completed just now</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                            <Share2 size={18} />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                            <Download size={18} />
                            <span className="font-medium text-sm">Export Report</span>
                        </button>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {/* ... metrics ... */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-50 rounded-xl">
                                <TrendingUp size={20} className="text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">Total Revenue</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800 mb-1">$1.2M</div>
                        <div className="text-xs font-medium text-green-600 flex items-center gap-1">
                            +12.5% <span className="text-slate-400">vs last period</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-xl">
                                <BarChart3 size={20} className="text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">Growth Rate</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800 mb-1">8.4%</div>
                        <div className="text-xs font-medium text-blue-600 flex items-center gap-1">
                            Steady <span className="text-slate-400">performance</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 rounded-xl">
                                <FileText size={20} className="text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">Insights Generated</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800 mb-1">14</div>
                        <div className="text-xs font-medium text-purple-600 flex items-center gap-1">
                            High confidence <span className="text-slate-400">score</span>
                        </div>
                    </div>
                </div>

                {/* Main Analysis Section */}
                <div className="grid grid-cols-3 gap-6 h-96">
                    {/* Chart Visualization (Mock) */}
                    <div className="col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                        <h3 className="font-bold text-slate-800 mb-6">Revenue Trend</h3>

                        {/* Visual CSS-only Bar Chart */}
                        <div className="absolute inset-x-6 bottom-6 top-20 flex items-end justify-between gap-4">
                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                <div key={i} className="w-full bg-slate-50 rounded-t-xl relative group-hover:bg-slate-100 transition-colors duration-300">
                                    <div
                                        className="absolute bottom-0 inset-x-0 bg-slate-900 rounded-t-xl transition-all duration-1000 ease-out"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-lg transition-opacity whitespace-nowrap">
                                            ${h}0k
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Findings List */}
                    <div className="col-span-1 bg-slate-900 p-6 rounded-3xl shadow-lg text-white">
                        <h3 className="font-bold text-lg mb-6">Key Findings</h3>
                        <div className="space-y-4">
                            {[
                                "Q3 revenue exceeded targets by 15%.",
                                "Customer acquisition cost dropped by 4%.",
                                "Subscription tier B is top performer."
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-400">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed font-light">{item}</p>
                                </div>
                            ))}
                        </div>

                        <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                            View Full Analysis <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Extra filler content to enable scrolling for testing */}
                <div className="mt-8 p-6 bg-white rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4">Detailed Breakdown</h3>
                    <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                        Detailed data table would appear here...
                    </div>
                </div>

            </div>
        </div>
    );
}
