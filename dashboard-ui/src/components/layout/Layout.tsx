import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    activeView?: string;
    onNavigate?: (view: 'home' | 'search' | 'layers' | 'profile' | 'workspace') => void;
}

export function Layout({ children, activeView = 'home', onNavigate }: LayoutProps) {
    return (
        <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
            <Sidebar active={activeView} onNavigate={onNavigate} />
            <main className="flex-1 overflow-auto flex flex-col relative">
                {children}
            </main>
        </div>
    );
}
