import { Layers, GitBranch, Workflow, CheckCircle2, Clock, Loader2, Play, ChevronDown, MoreHorizontal, User } from 'lucide-react';
import { useState } from 'react';
import { PipelineDiagram } from '../dashboard/PipelineDiagram';

interface LayersViewProps {
    onNavigate?: (view: 'execution') => void;
}

export function LayersView({ onNavigate }: LayersViewProps) {
    const [activeWorkflow, setActiveWorkflow] = useState<number | null>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pipelineConfig, setPipelineConfig] = useState({
        depth: 'basic' as 'basic' | 'deep',
        mode: 'auto' as 'auto' | 'manual',
        throughput: 'standard' as 'standard' | 'high'
    });

    interface WorkflowStep {
        name: string;
        status: string;
        assignee: string;
        time?: string;
    }

    interface Workflow {
        id: number;
        name: string;
        status: string;
        description: string;
        progress: number;
        lastRun: string;
        steps: WorkflowStep[];
    }

    const workflows: Workflow[] = [
        {
            id: 0,
            name: 'Document Processing Pipeline',
            status: 'idle',
            description: 'Automated end-to-end document handling pipeline',
            progress: 0,
            lastRun: 'Never',
            steps: [
                { name: 'Upload', status: 'pending', assignee: 'System' },
                { name: 'Parse', status: 'pending', assignee: 'OCR Bot' },
                { name: 'Analyze', status: 'pending', assignee: 'AI Engine' },
                { name: 'Summarize', status: 'pending', assignee: 'GPT-4' },
                { name: 'Export', status: 'pending', assignee: 'System' }
            ]
        },
        {
            id: 1,
            name: 'Data Analysis Workflow',
            status: 'idle',
            description: 'Data ingestion and visualization pipeline',
            progress: 0,
            lastRun: 'Never',
            steps: [
                { name: 'Ingest', status: 'pending', assignee: 'Data Loader' },
                { name: 'Clean', status: 'pending', assignee: 'Sanitizer' },
                { name: 'Analyze', status: 'pending', assignee: 'Analytics Engine' },
                { name: 'Visualize', status: 'pending', assignee: 'Dashboard' }
            ]
        },
        {
            id: 2,
            name: 'Smart Task Force',
            status: 'idle',
            description: 'Your personal team of digital assistants working together',
            progress: 0,
            lastRun: 'Never',
            steps: [
                { name: 'Understanding Goals', status: 'pending', assignee: 'Team Lead' },
                { name: 'Making a Plan', status: 'pending', assignee: 'Planner' },
                { name: 'Doing the Work', status: 'pending', assignee: 'Maker' },
                { name: 'Checking Safety', status: 'pending', assignee: 'Safety Guard' },
                { name: 'Quality Review', status: 'pending', assignee: 'Reviewer' },
                { name: 'Delivering Results', status: 'pending', assignee: 'Delivery Bot' }
            ]
        },
    ];



    return (
        <div className="h-full max-w-6xl mx-auto flex flex-col animate-fadeIn px-4 pb-4">
            <div className="shrink-0 py-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-slate-100 rounded-xl">
                            <Layers className="text-slate-700" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Workflow Layers</h2>
                            <p className="text-sm text-slate-500">Manage and monitor your processing pipelines</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                            Refresh
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                            <Workflow size={16} />
                            New Workflow
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                {/* Workflow List */}
                <div className="col-span-4 space-y-3 overflow-y-auto custom-scrollbar pr-2 h-full">
                    {workflows.map((workflow) => (
                        <button
                            key={workflow.id}
                            onClick={() => {
                                setActiveWorkflow(workflow.id);
                                setIsModalOpen(false);
                            }}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-200 cursor-pointer border relative overflow-hidden group shrink-0 ${activeWorkflow === workflow.id
                                ? 'bg-slate-900 text-white shadow-xl scale-[1.02] border-slate-900'
                                : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm border-slate-100 hover:border-slate-300'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-sm">{workflow.name}</h3>
                                <div className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${workflow.status === 'active'
                                    ? activeWorkflow === workflow.id ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
                                    : activeWorkflow === workflow.id ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {workflow.status}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs opacity-80 mb-3">
                                <span className="flex items-center gap-1.5">
                                    <GitBranch size={12} />
                                    {workflow.steps.length} steps
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={12} />
                                    {workflow.lastRun}
                                </span>
                            </div>

                            {/* Mini Progress Bar */}
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                                <div
                                    className={`h-full transition-all duration-500 ${activeWorkflow === workflow.id ? 'bg-green-500' : 'bg-slate-200'
                                        }`}
                                    style={{ width: `${workflow.progress}%` }}
                                />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Workflow Details */}
                <div className="col-span-8 h-full min-h-0">
                    {activeWorkflow !== null && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-bold text-slate-800">
                                            {workflows[activeWorkflow].name}
                                        </h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${workflows[activeWorkflow].status === 'active'
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-slate-50 text-slate-600 border-slate-200'
                                            }`}>
                                            {workflows[activeWorkflow].status}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm">{workflows[activeWorkflow].description}</p>
                                </div>
                                <div className="flex gap-2">
                                    {activeWorkflow === 0 && (
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                                        >
                                            Configure Pipeline
                                        </button>
                                    )}
                                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Main Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-slate-700">Overall Progress</span>
                                    <span className="text-slate-500">{workflows[activeWorkflow].progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-slate-900 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                                        style={{ width: `${workflows[activeWorkflow].progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] -skew-x-12" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-3">
                                {workflows[activeWorkflow].steps.map((step, idx) => (
                                    <div
                                        key={idx}
                                        className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${step.status === 'running' ? 'bg-blue-50/50 border-blue-100 shadow-sm ring-1 ring-blue-100' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}
                                    >
                                        {/* Connecting Line */}
                                        {idx < workflows[activeWorkflow].steps.length - 1 && (
                                            <div className="absolute left-[29px] top-12 bottom-[-14px] w-0.5 bg-slate-100 -z-10 group-hover:bg-slate-200 transition-colors" />
                                        )}

                                        {/* Status Icon */}
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border-2 z-10 ${step.status === 'completed' ? 'border-green-500 text-green-500' :
                                            step.status === 'running' ? 'border-blue-500 text-blue-500' :
                                                'border-slate-200 text-slate-300'
                                            }`}>
                                            {step.status === 'completed' && <CheckCircle2 size={16} />}
                                            {step.status === 'running' && <Loader2 size={16} className="animate-spin" />}
                                            {step.status === 'pending' && <span className="text-xs font-medium">{idx + 1}</span>}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex items-center justify-between">
                                            <div>
                                                <h4 className={`font-semibold text-sm mb-0.5 ${step.status === 'pending' ? 'text-slate-500' : 'text-slate-800'}`}>
                                                    {step.name}
                                                </h4>
                                                <div className="flex items-center gap-3">
                                                    {step.assignee && (
                                                        <span className="flex items-center gap-1 text-xs text-slate-500">
                                                            <User size={10} />
                                                            {step.assignee}
                                                        </span>
                                                    )}
                                                    {step.time && (
                                                        <span className="flex items-center gap-1 text-xs text-slate-400">
                                                            <Clock size={10} />
                                                            {step.time}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                                                    View Logs
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                                <div className="flex-1 flex gap-2">
                                    <button
                                        onClick={() => onNavigate?.('execution')}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-lg shadow-slate-200 hover:shadow-slate-300 flex items-center justify-center gap-2 font-medium"
                                    >
                                        <Play size={16} className="fill-current" />
                                        Run Workflow
                                    </button>
                                    <button className="px-2 bg-slate-900 border-l border-white/20 text-white rounded-r-xl hover:bg-slate-800 hidden">
                                        <ChevronDown size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => activeWorkflow === 0 ? setIsModalOpen(true) : onNavigate?.('execution')}
                                    className="px-5 py-2.5 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer font-medium"
                                >
                                    Configure
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleIn">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Pipeline Configuration</h3>
                                <p className="text-sm text-slate-500">Customize the active document processing structure</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                            >
                                <ChevronDown size={24} className="rotate-180" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
                            {/* Interactive Diagram */}
                            <div className="h-80 w-full">
                                <PipelineDiagram config={pipelineConfig} />
                            </div>

                            {/* Config Controls */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Processing Depth</label>
                                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                                        {(['basic', 'deep'] as const).map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setPipelineConfig(prev => ({ ...prev, depth: d }))}
                                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${pipelineConfig.depth === d ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-400 px-1">Determines the number of analysis layers.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Operational Mode</label>
                                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                                        {(['auto', 'manual'] as const).map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setPipelineConfig(prev => ({ ...prev, mode: m }))}
                                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${pipelineConfig.mode === m ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-400 px-1">Toggle between AI-only and human-in-the-loop.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Throughput</label>
                                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                                        {(['standard', 'high'] as const).map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setPipelineConfig(prev => ({ ...prev, throughput: t }))}
                                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${pipelineConfig.throughput === t ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-400 px-1">Scale resources for high volume processing.</p>
                                </div>
                            </div>

                            <div className="p-5 bg-slate-900 rounded-3xl text-white/90">
                                <div className="flex items-center gap-3 mb-2 text-emerald-400">
                                    <CheckCircle2 size={18} />
                                    <h4 className="font-bold text-sm">Dynamic Routing Active</h4>
                                </div>
                                <p className="text-xs leading-relaxed opacity-80">
                                    Your {pipelineConfig.depth} analysis configuration will utilize {pipelineConfig.throughput === 'high' ? 'parallel' : 'standard'} compute resources.
                                    {pipelineConfig.mode === 'manual' ? ' Intervention protocols are enabled for edge cases.' : ' Autonomous execution is optimized for speed.'}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/30">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-10 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                            >
                                Apply Configuration
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
