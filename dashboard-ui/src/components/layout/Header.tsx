import { Search, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
    const [searchValue, setSearchValue] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && searchValue.trim()) {
            onSearch(searchValue);
        }
    };

    return (
        <header className="flex items-center justify-end px-8 py-5 bg-transparent relative">

            <div className="flex items-center gap-4">
                <form onSubmit={handleSearchSubmit} className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search documents, agents..."
                        className="pl-10 pr-4 py-2 rounded-full bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 w-64 transition-all"
                    />
                </form>

                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="p-2 rounded-full bg-slate-900 text-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <User size={18} />
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-fadeIn z-50">
                            <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                View Profile
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                Settings
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                Help & Support
                            </button>
                            <hr className="my-2 border-slate-100" />
                            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
