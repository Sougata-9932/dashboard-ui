import { Database, Link as LinkIcon, Server, Globe } from 'lucide-react';
import { useState } from 'react';

interface ConnectionZoneProps {
    onConnect: () => void;
}

export function ConnectionZone({ onConnect }: ConnectionZoneProps) {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        // Simulate connection delay
        setTimeout(() => {
            onConnect();
            setIsConnecting(false);
        }, 1500);
    };

    return (
        <div
            onClick={handleConnect}
            className="w-full h-full border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-slate-50/50 transition-all duration-300 group relative overflow-hidden"
        >
            <div className="z-10 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                    <Database size={32} className="text-purple-500" />
                </div>

                {isConnecting ? (
                    <div className="space-y-3">
                        <h3 className="text-xl font-bold text-slate-800">Connecting...</h3>
                        <div className="flex justify-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Connect Data Source</h3>
                        <p className="text-slate-500 text-sm max-w-[200px] mx-auto leading-relaxed">
                            Connect to SQL, Snowflake, or an API endpoint for live analysis.
                        </p>
                    </>
                )}
            </div>

            {/* Floating Icons Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <Server className="absolute top-4 left-4 rotate-12" size={48} />
                <LinkIcon className="absolute bottom-10 right-10 -rotate-12" size={32} />
                <Globe className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-8" size={24} />
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
        </div>
    );
}
