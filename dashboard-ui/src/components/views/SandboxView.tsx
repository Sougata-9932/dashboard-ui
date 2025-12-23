import { useState } from 'react';
import { Terminal, Package, Settings, Play, Plus, Search, Check, AlertCircle, Cpu, Database, Save } from 'lucide-react';

interface Dependency {
    name: string;
    version: string;
    status: 'installed' | 'installing' | 'error';
}

export function SandboxView() {
    const [dependencies, setDependencies] = useState<Dependency[]>([
        { name: 'pandas', version: '2.2.1', status: 'installed' },
        { name: 'numpy', version: '1.26.4', status: 'installed' },
        { name: 'scikit-learn', version: '1.4.1', status: 'installed' },
        { name: 'matplotlib', version: '3.8.3', status: 'installed' },
    ]);

    const [terminalLines, setTerminalLines] = useState<string[]>([
        'Python 3.11.8 (main, Feb 12 2024, 14:50:05) [GCC 11.4.0] on linux',
        'Type "help", "copyright", "credits" or "license" for more information.',
        '>>> sandbox environment initialized'
    ]);

    const [input, setInput] = useState('');

    const handleTerminalInput = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && input.trim()) {
            setTerminalLines(prev => [...prev, `>>> ${input}`, `Running process for "${input}"...`, 'Done.']);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-full gap-6 overflow-hidden pb-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Environment Sandbox</h1>
                    <p className="text-slate-500 text-sm">Configure your virtual workspace and manage dependencies</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                        <Save size={16} />
                        Save Snapshot
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-lg">
                        <Play size={16} />
                        Launch Runtime
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                {/* Left Column: Config & Packages */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 min-h-0">
                    {/* Runtime Config */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Settings className="text-slate-400" size={20} />
                            <h2 className="font-semibold text-slate-700">Runtime Configuration</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <Cpu size={14} />
                                    <span className="text-xs font-medium uppercase tracking-wider">Compute</span>
                                </div>
                                <div className="text-sm font-bold text-slate-700 uppercase">4 vCPU / 8GB RAM</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <Database size={14} />
                                    <span className="text-xs font-medium uppercase tracking-wider">Runtime</span>
                                </div>
                                <div className="text-sm font-bold text-slate-700">Python 3.11.8</div>
                            </div>
                        </div>
                    </div>

                    {/* Package Manager */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Package className="text-slate-400" size={20} />
                                <h2 className="font-semibold text-slate-700">Dependencies</h2>
                            </div>
                            <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                                <Plus size={18} />
                            </button>
                        </div>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search or add libraries..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="space-y-2">
                                {dependencies.map((dep, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-50 rounded-xl hover:border-slate-200 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${dep.status === 'installed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                                                }`}>
                                                {dep.status === 'installed' ? <Check size={16} /> : <AlertCircle size={16} />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-700">{dep.name}</div>
                                                <div className="text-xs text-slate-400">v{dep.version}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setDependencies(prev => prev.filter((_, idx) => idx !== i))}
                                            className="text-xs font-medium text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Terminal */}
                <div className="col-span-12 lg:col-span-7 bg-slate-900 rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-800">
                    <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-800 flex items-center gap-2">
                        <Terminal size={14} className="text-emerald-500" />
                        <span className="text-xs font-mono text-slate-400 tracking-wider font-semibold uppercase">Interactive Console</span>
                        <div className="ml-auto flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        </div>
                    </div>

                    <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar">
                        {terminalLines.map((line, i) => (
                            <div key={i} className={`mb-1 ${line.startsWith('>>>') ? 'text-emerald-400' : 'text-slate-300'}`}>
                                {line}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-emerald-400 mt-1">
                            <span>{">>>"}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleTerminalInput}
                                className="flex-1 bg-transparent border-none outline-none text-slate-300"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-800 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Kernal: Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold">Latency: 12ms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
