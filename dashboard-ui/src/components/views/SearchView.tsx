import { Search, FileText, Users, BarChart } from 'lucide-react';

interface SearchViewProps {
    searchQuery: string;
}

export function SearchView({ searchQuery }: SearchViewProps) {
    const searchResults = [
        { id: 1, type: 'document', title: 'Q4 Financial Report.pdf', size: '2.3 MB', date: '2 days ago', icon: FileText },
        { id: 2, type: 'agent', title: 'Data Analysis Agent', description: 'Specialized in data insights', icon: Users },
        { id: 3, type: 'document', title: 'Project Roadmap 2024.docx', size: '456 KB', date: '1 week ago', icon: FileText },
        { id: 4, type: 'insights', title: 'Revenue Growth Analysis', description: 'Key metrics and trends', icon: BarChart },
        { id: 5, type: 'document', title: 'Meeting Notes - Jan 15.txt', size: '12 KB', date: '3 weeks ago', icon: FileText },
    ];

    const filteredResults = searchQuery
        ? searchResults.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : searchResults;

    return (
        <div className="max-w-4xl mx-auto py-8 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
                <Search className="text-slate-400" size={24} />
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Search Results</h2>
                    {searchQuery && (
                        <p className="text-sm text-slate-500">
                            Found {filteredResults.length} results for "{searchQuery}"
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                        <div
                            key={result.id}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                                    <result.icon className="text-slate-600" size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-800 group-hover:text-slate-900 mb-1">
                                        {result.title}
                                    </h3>
                                    {result.description && (
                                        <p className="text-sm text-slate-500 mb-2">{result.description}</p>
                                    )}
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        {result.size && <span>{result.size}</span>}
                                        {result.date && <span>{result.date}</span>}
                                        <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">
                                            {result.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16">
                        <Search className="mx-auto text-slate-300 mb-4" size={48} />
                        <p className="text-slate-500">No results found for "{searchQuery}"</p>
                        <p className="text-sm text-slate-400 mt-2">Try different keywords</p>
                    </div>
                )}
            </div>
        </div>
    );
}
