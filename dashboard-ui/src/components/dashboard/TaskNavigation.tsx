import { useState } from 'react';
import { CheckCircle2, Search, Filter, Clock, Loader2, ArrowRight } from 'lucide-react';

export interface Task {
    id: string;
    name: string;
    status: 'completed' | 'processing';
    timestamp: string;
    type: string;
}

interface TaskNavigationProps {
    onSelectTask: (taskId: string) => void;
    selectedTaskId: string | null;
}

const MOCK_TASKS: Task[] = [
    {
        id: 't-1',
        name: 'Q3 Financial Report Analysis',
        status: 'completed',
        timestamp: '2 mins ago',
        type: 'Financial Analysis'
    },
    {
        id: 't-2',
        name: 'Customer Feedback Sentiment',
        status: 'completed',
        timestamp: '15 mins ago',
        type: 'Sentiment Analysis'
    },
    {
        id: 't-3',
        name: 'Real-time Market Data Stream',
        status: 'processing',
        timestamp: 'Just now',
        type: 'Market Watch'
    },
    {
        id: 't-4',
        name: 'Competitor Feature Scan',
        status: 'completed',
        timestamp: '3 hours ago',
        type: 'Competitive Analysis'
    },
    {
        id: 't-5',
        name: 'Supply Chain Optimization',
        status: 'completed',
        timestamp: 'Yesterday',
        type: 'Logistics'
    }
];

export function TaskNavigation({ onSelectTask, selectedTaskId }: TaskNavigationProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'processing'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTasks = MOCK_TASKS.filter(task => {
        const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'all' || task.status === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="bg-white rounded-3xl shadow-sm h-full flex flex-col overflow-hidden border border-slate-100">
            {/* Header Area */}
            <div className="p-6 pb-2 bg-white z-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-slate-800 text-xl">Tasks</h2>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all text-sm"
                    />
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-slate-100 rounded-xl mb-2">
                    {(['all', 'completed', 'processing'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${activeTab === tab
                                    ? 'bg-white text-slate-800 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scrollbar">
                <div className="h-2"></div> {/* Spacer */}
                {filteredTasks.map((task) => (
                    <button
                        key={task.id}
                        onClick={() => onSelectTask(task.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${selectedTaskId === task.id
                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20'
                                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-md'
                            }`}
                    >
                        {/* Hover Indicator */}
                        {selectedTaskId !== task.id && (
                            <div className="absolute inset-y-0 left-0 w-1 bg-slate-900 transform -translate-x-full transition-transform group-hover:translate-x-0" />
                        )}

                        <div className="flex justify-between items-start mb-3">
                            <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${selectedTaskId === task.id
                                    ? 'bg-white/10 text-slate-100 border border-white/10'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}>
                                {task.status === 'completed' ? (
                                    <CheckCircle2 size={12} className={selectedTaskId === task.id ? 'text-green-400' : 'text-green-600'} />
                                ) : (
                                    <Loader2 size={12} className={`animate-spin ${selectedTaskId === task.id ? 'text-blue-400' : 'text-blue-600'}`} />
                                )}
                                <span className="capitalize">{task.status}</span>
                            </div>
                            <span className={`text-xs font-medium flex items-center gap-1 ${selectedTaskId === task.id ? 'text-slate-400' : 'text-slate-400'
                                }`}>
                                <Clock size={12} />
                                {task.timestamp}
                            </span>
                        </div>

                        <h3 className={`font-bold text-sm mb-1 line-clamp-2 ${selectedTaskId === task.id ? 'text-white' : 'text-slate-800'
                            }`}>
                            {task.name}
                        </h3>

                        <div className={`text-xs ${selectedTaskId === task.id ? 'text-slate-400' : 'text-slate-500'}`}>
                            {task.type}
                        </div>

                        {selectedTaskId === task.id && (
                            <div className="absolute bottom-4 right-4 text-white/20">
                                <ArrowRight size={20} />
                            </div>
                        )}
                    </button>
                ))}

                {filteredTasks.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Search className="text-slate-300" size={20} />
                        </div>
                        <p className="text-slate-500 text-sm font-medium">No tasks found</p>
                        <p className="text-slate-400 text-xs mt-1">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
