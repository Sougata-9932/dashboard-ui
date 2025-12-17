import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export function ProcessFlow() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { id: 1, label: "AI analyzes document patterns", icon: "📊" },
        { id: 2, label: "Extracting key insights", icon: "🔍" },
        { id: 3, label: "Generating summary", icon: "📝" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full p-6 relative flex items-center justify-center">
            <div className="flex flex-col gap-6 w-full max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="text-slate-600" size={20} />
                    <span className="text-sm font-semibold text-slate-700">Processing Pipeline</span>
                </div>

                {steps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-4 animate-slideIn">
                        <div className={`text-2xl transition-all duration-300 ${activeStep === idx ? 'scale-125' : 'scale-100 opacity-50'
                            }`}>
                            {step.icon}
                        </div>
                        <div className="flex-1">
                            <div className={`p-3 rounded-xl text-sm font-medium border shadow-sm transition-all duration-300 ${activeStep === idx
                                    ? 'bg-slate-900 text-white border-slate-900 scale-105'
                                    : 'bg-white text-slate-600 border-slate-200'
                                }`}>
                                {step.label}
                            </div>
                        </div>
                        {activeStep === idx && (
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
