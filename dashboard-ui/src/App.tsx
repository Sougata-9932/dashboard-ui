import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { MessageCircle, X } from 'lucide-react';
import { Header } from './components/layout/Header';
import { UploadZone } from './components/dashboard/UploadZone';
import { ProcessFlow } from './components/dashboard/ProcessFlow';
import { StatusCard } from './components/dashboard/StatusCard';
import { TaskNavigation } from './components/dashboard/TaskNavigation';
import { GraphView } from './components/chat/GraphView';
import { ChatInterface } from './components/chat/ChatInterface';
import { SearchView } from './components/views/SearchView';
import { ProfileView } from './components/views/ProfileView';
import { LayersView } from './components/views/LayersView';
import { ExecutionView } from './components/views/ExecutionView';
import { ResultsView } from './components/dashboard/ResultsView';
import { SmartRouter } from './components/dashboard/SmartRouter';
import { ConnectionZone } from './components/dashboard/ConnectionZone'; // Added
import { SandboxView } from './components/views/SandboxView';

type ViewState = 'home' | 'search' | 'layers' | 'profile' | 'workspace' | 'execution' | 'sandbox';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false); // Toggle state

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [routingSource, setRoutingSource] = useState<'file' | 'database'>('file');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setView('search');
    }
  };

  const handleUploadComplete = () => {
    setRoutingSource('file');
    setIsRouting(true);
  };

  const handleConnectionComplete = () => {
    setRoutingSource('database');
    setIsRouting(true);
  };

  const handleRouteComplete = () => {
    setIsRouting(false);
    setIsProcessing(true);
    setView('workspace'); // Auto-redirect to workspace
    setSelectedTaskId('t-1'); // Select the new task automatically
  };

  return (
    <Layout activeView={view} onNavigate={setView}>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* ... Header ... */}
        <Header onSearch={handleSearch} />

        <div className="flex-1 p-6 pt-2 overflow-hidden">
          {/* ... View Toggles ... */}
          {(view === 'home' || view === 'workspace') && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setView('home')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${view === 'home' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                Main Dashboard
              </button>
              <button
                onClick={() => setView('workspace')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${view === 'workspace' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                Processing Workspace
              </button>
            </div>
          )}

          {/* ... Home View ... */}
          {view === 'home' && (
            <div className="flex flex-col gap-6 h-full overflow-hidden pb-4">
              {/* Top Row: Entries (Flex-1) */}
              <div className="flex gap-6 min-h-0 flex-1">
                <div className="flex-1 bg-white rounded-3xl p-1 shadow-sm overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                  <UploadZone onUploadComplete={handleUploadComplete} />
                </div>

                <div className="flex-1 bg-white rounded-3xl p-1 shadow-sm overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                  <ConnectionZone onConnect={handleConnectionComplete} />
                </div>
              </div>

              {/* Bottom Row: Router & Process Flow (Flex-1) */}
              <div className="flex gap-6 min-h-0 flex-1">
                <div className="flex-[2] bg-white rounded-3xl shadow-sm relative overflow-hidden flex flex-col">
                  <div className="flex-1 relative">
                    {isRouting ? (
                      <div className="h-full animate-fadeIn transition-all duration-500">
                        <SmartRouter onRouteComplete={handleRouteComplete} source={routingSource} />
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/10">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 text-slate-300 shadow-sm border border-slate-100 animate-pulse">
                          <div className="bg-slate-50 w-6 h-6 rounded-full" />
                        </div>
                        <h3 className="text-slate-500 font-bold text-xl mb-2 tracking-tight">Waiting for Data Input</h3>
                        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                          Upload a financial report or connect a database source to trigger
                          autonomous agent routing and analysis swarms.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-3xl p-1 shadow-sm overflow-hidden flex flex-col">
                  <ProcessFlow />
                </div>
              </div>
            </div>
          )}

          {/* Workspace View */}
          {view === 'workspace' && (
            <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)] pb-6 relative">
              {/* Navigation Sidebar */}
              <div className="col-span-12 lg:col-span-3 h-full">
                <TaskNavigation
                  selectedTaskId={selectedTaskId}
                  onSelectTask={(id) => {
                    setSelectedTaskId(id);
                    setShowResults(false); // Reset to diagram when picking new task
                  }}
                />
              </div>

              {/* Main Workflow Window */}
              <div className="col-span-12 lg:col-span-9 h-full flex flex-col">
                {/* View Toggle (Process vs Results) */}
                {selectedTaskId && (
                  <div className="flex justify-center mb-4">
                    <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                      <button
                        onClick={() => setShowResults(false)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${!showResults ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Process Diagram
                      </button>
                      <button
                        onClick={() => setShowResults(true)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${showResults ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Analysis Results
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-hidden">
                  {showResults ? (
                    <ResultsView taskId={selectedTaskId} />
                  ) : (
                    <GraphView selectedTaskId={selectedTaskId} />
                  )}
                </div>
              </div>

              {/* Processing Status Popup */}
              {isProcessing && (
                <div className={`absolute inset-0 z-[60] flex items-start justify-end pt-8 pointer-events-none transition-all duration-300 ${isChatOpen ? 'pr-[400px]' : 'pr-8'}`}>
                  <div className="bg-white p-8 rounded-3xl shadow-2xl transform scale-100 animate-scaleIn pointer-events-auto border border-slate-100">
                    <StatusCard onComplete={() => setIsProcessing(false)} />
                  </div>
                </div>
              )}
            </div>
          )}



          {/* Floating Chat Interface */}
          {isChatOpen && (
            <div className="fixed bottom-24 right-6 w-96 h-[600px] z-50 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-slideUp">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <span className="font-semibold text-slate-700">AI Assistant</span>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <ChatInterface />
                </div>
              </div>
            </div>
          )}

          {/* Floating Toggle Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center gap-3 ${isChatOpen
              ? 'bg-slate-900 rotate-90'
              : 'bg-slate-900 hover:bg-slate-800 pr-6'
              }`}
          >
            {isChatOpen ? (
              <X className="text-white" size={24} />
            ) : (
              <>
                <MessageCircle className="text-white" size={24} />
                <span className="text-white font-medium text-lg">AI Assistant</span>
              </>
            )}
          </button>

          {/* Search View */}
          {view === 'search' && <SearchView searchQuery={searchQuery} />}

          {/* Layers View */}
          {view === 'layers' && <LayersView onNavigate={setView} />}

          {/* Profile View */}
          {view === 'profile' && <ProfileView />}

          {/* Execution View */}
          {view === 'execution' && <ExecutionView onBack={() => setView('layers')} />}

          {/* Sandbox View */}
          {view === 'sandbox' && <SandboxView />}
        </div>
      </div>
    </Layout>
  );
}

export default App;
