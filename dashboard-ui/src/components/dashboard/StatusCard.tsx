import { useEffect, useState } from 'react';

export function StatusCard() {
    const [progress, setProgress] = useState(0);
    const targetProgress = 0;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        // Animate progress on mount
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= targetProgress) {
                    clearInterval(interval);
                    return targetProgress;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-8 h-full">
            <div className="flex flex-col">
                <span className="text-slate-500 font-medium mb-1">Processing:</span>
                <span className="text-4xl font-bold text-slate-900 tabular-nums">{progress}%</span>
                <span className="text-slate-400 text-sm">Complete</span>
                <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-500">Ready to process</span>
                </div>
            </div>

            <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-100"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="text-slate-900 transition-all duration-300 ease-out"
                    />
                </svg>
                <span className="absolute text-sm font-bold text-slate-700 tabular-nums">{progress}%</span>
            </div>
            <div className="text-center absolute right-[20px] top-[10px]">
                <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                </div>
            </div>
        </div>
    );
}
