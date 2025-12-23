import { useState, useEffect } from 'react';
import { BrainCircuit, Search, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

interface SmartRouterProps {
    onRouteComplete: () => void;
    source?: 'file' | 'database';
}

export function SmartRouter({ onRouteComplete, source = 'file' }: SmartRouterProps) {
    const [step, setStep] = useState(0);

    const isFile = source === 'file';

    useEffect(() => {
        // Step 0: Analyzing (Start)
        const t1 = setTimeout(() => setStep(1), 800);
        // Step 1: Detected
        const t2 = setTimeout(() => setStep(2), 2000);
        // Step 2: Routing (Finish)
        const t3 = setTimeout(() => {
            setStep(3);
            setTimeout(onRouteComplete, 500); // Redirect after short pause
        }, 3500);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onRouteComplete]);

    return (
        <div className="h-full flex flex-col p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className={`absolute top-0 right-0 w-64 h-64 ${isFile ? 'bg-blue-500/5' : 'bg-purple-500/5'} rounded-full blur-3xl`} />

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className={`p-2 rounded-xl transition-colors duration-500 ${step >= 2 ? (isFile ? 'bg-blue-100' : 'bg-purple-100') : 'bg-slate-100'}`}>
                    <BrainCircuit size={24} className={`transition-colors duration-500 ${step >= 2 ? (isFile ? 'text-blue-600' : 'text-purple-600') : 'text-slate-600'}`} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">Smart Router</h3>
                    <p className="text-xs text-slate-500 font-medium">Auto-detecting workflow</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10">

                {/* Step 1: Analysis */}
                <div className={`flex items-center gap-4 transition-all duration-500 ${step >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step > 0 ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-200 text-slate-300'}`}>
                        {step > 0 ? <CheckCircle2 size={16} /> : <Search size={16} className="animate-pulse" />}
                    </div>
                    <div className="flex-1">
                        <p className={`text-sm font-medium transition-colors ${step > 0 ? 'text-slate-800' : 'text-slate-500'}`}>
                            {isFile ? 'Analyzing Document Content...' : 'Establishing Secure Connection...'}
                        </p>
                        {step === 0 && <div className="h-1 w-24 bg-slate-100 mt-2 rounded-full overflow-hidden">
                            <div className={`h-full w-1/2 ${isFile ? 'bg-blue-300' : 'bg-purple-300'} rounded-full animate-progress`} />
                        </div>}
                    </div>
                </div>

                {/* Step 2: Detection */}
                <div className={`flex items-center gap-4 transition-all duration-500 delay-100 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step > 1 ? 'bg-green-50 border-green-200 text-green-600' : (step === 1 ? 'bg-white border-blue-200 text-blue-500' : 'bg-white border-slate-200 text-slate-300')}`}>
                        {step > 1 ? <CheckCircle2 size={16} /> : <Activity size={16} className={step === 1 ? "animate-bounce" : ""} />}
                    </div>
                    <div>
                        <p className={`text-sm font-medium transition-colors ${step > 1 ? 'text-slate-800' : 'text-slate-500'}`}>
                            {isFile ? 'Detected: ' : 'Scanned: '} <span className="text-slate-900 font-bold">Financial Data Structures</span>
                        </p>
                    </div>
                </div>

                {/* Step 3: Routing */}
                <div className={`flex items-center gap-4 transition-all duration-500 delay-200 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 2 ? (isFile ? 'bg-blue-100 border-blue-200 text-blue-600' : 'bg-purple-100 border-purple-200 text-purple-600') : 'bg-white border-slate-200 text-slate-300'}`}>
                        <ArrowRight size={16} />
                    </div>
                    <div>
                        <p className={`text-sm font-medium transition-colors ${step >= 2 ? (isFile ? 'text-blue-700' : 'text-purple-700') : 'text-slate-500'}`}>
                            Routing to <strong>AI Financial Workforce</strong>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
