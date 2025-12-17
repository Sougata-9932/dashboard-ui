import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { UploadZone } from './components/dashboard/UploadZone';
import { ProcessFlow } from './components/dashboard/ProcessFlow';
import { AgentSelector } from './components/dashboard/AgentSelector';
import { StatusCard } from './components/dashboard/StatusCard';
import { GraphView } from './components/chat/GraphView';
import { ChatInterface } from './components/chat/ChatInterface';
import { SearchView } from './components/views/SearchView';
import { ProfileView } from './components/views/ProfileView';
import { LayersView } from './components/views/LayersView';
import { ExecutionView } from './components/views/ExecutionView';

type ViewState = 'home' | 'search' | 'layers' | 'profile' | 'workspace' | 'execution';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setView('search');
    }
  };

  return (
    <Layout activeView={view} onNavigate={setView}>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header onSearch={handleSearch} />

        <div className="flex-1 overflow-auto p-6 pt-2">
          {/* View Toggle - Only show on home/workspace */}
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

          {/* Main Dashboard */}
          {view === 'home' && (
            <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)] pb-6">
              <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-1 shadow-sm h-[45%]">
                <UploadZone />
              </div>

              <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-1 shadow-sm h-[45%]">
                <ProcessFlow />
              </div>

              <div className="col-span-12 lg:col-span-7 bg-transparent h-[50%]">
                <div className="bg-white rounded-3xl p-6 shadow-sm h-full">
                  <AgentSelector />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm h-[50%] flex items-center justify-center">
                <StatusCard />
              </div>
            </div>
          )}

          {/* Workspace View */}
          {view === 'workspace' && (
            <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)] pb-6">
              <div className="col-span-12 lg:col-span-8 h-full">
                <GraphView />
              </div>

              <div className="col-span-12 lg:col-span-4 h-full">
                <ChatInterface />
              </div>
            </div>
          )}

          {/* Search View */}
          {view === 'search' && <SearchView searchQuery={searchQuery} />}

          {/* Layers View */}
          {view === 'layers' && <LayersView onNavigate={setView} />}

          {/* Profile View */}
          {view === 'profile' && <ProfileView />}

          {/* Execution View */}
          {view === 'execution' && <ExecutionView onBack={() => setView('layers')} />}
        </div>
      </div>
    </Layout>
  );
}

export default App;
