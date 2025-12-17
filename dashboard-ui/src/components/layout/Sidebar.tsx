import { Home, Search, Settings, User, HelpCircle, Layers } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    active?: string;
    onNavigate?: (view: 'home' | 'search' | 'layers' | 'profile' | 'workspace') => void;
}

export function Sidebar({ active = 'home', onNavigate }: SidebarProps) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'search', icon: Search, label: 'Search' },
        { id: 'layers', icon: Layers, label: 'Layers' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    const bottomItems = [
        { id: 'help', icon: HelpCircle, label: 'Help' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const handleNavClick = (id: string) => {
        if (onNavigate) {
            onNavigate(id as any);
        }
    };

    return (
        <div className="h-screen w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 flex-shrink-0">
            {/* Main Nav */}
            <nav className="flex-1 flex flex-col gap-4 w-full px-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={clsx(
                            "p-3 rounded-xl transition-all duration-200 flex items-center justify-center group relative cursor-pointer",
                            active === item.id
                                ? "bg-slate-100 text-slate-900 shadow-sm"
                                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                        )}
                        title={item.label}
                    >
                        <item.icon size={20} strokeWidth={2} />
                        {active === item.id && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-slate-900 rounded-r-full -ml-4" />
                        )}
                    </button>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 w-full px-4 mt-auto">
                {bottomItems.map((item) => (
                    <button
                        key={item.id}
                        className="p-3 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                        title={item.label}
                    >
                        <item.icon size={20} strokeWidth={2} />
                    </button>
                ))}
            </div>
        </div>
    );
}
