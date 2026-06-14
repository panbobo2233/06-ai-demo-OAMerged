import React, { useState } from 'react';
import Header, { PortalTab } from './components/Header';
import PortalPage from './pages/PortalPage';
import WorkbenchPage from './pages/WorkbenchPage';
import InfoPortalPage from './pages/InfoPortalPage';

const DEFAULT_TAB_KEY = 'oa_default_tab';

export default function App() {
  const [activeTab, setActiveTab] = useState<PortalTab>(() => {
    return (localStorage.getItem(DEFAULT_TAB_KEY) as PortalTab) || '快捷入口';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'leader' | 'full'>('leader');
  const [defaultTab, setDefaultTab] = useState<PortalTab>(() => {
    return (localStorage.getItem(DEFAULT_TAB_KEY) as PortalTab) || '快捷入口';
  });

  const handleSetDefaultTab = () => {
    localStorage.setItem(DEFAULT_TAB_KEY, activeTab);
    setDefaultTab(activeTab);
  };

  const isDefaultTab = defaultTab === activeTab;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        todoCount={0}
        readCount={0}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === 'leader' ? 'full' : 'leader')}
        isDefaultTab={isDefaultTab}
        onSetDefaultTab={handleSetDefaultTab}
      />

      {activeTab === '快捷入口' && <PortalPage searchTerm={searchTerm} onSearch={setSearchTerm} />}
      {activeTab === '工作台' && <WorkbenchPage searchTerm={searchTerm} onSearch={setSearchTerm} viewMode={viewMode} />}
      {activeTab === '信息门户' && <InfoPortalPage searchTerm={searchTerm} onSearch={setSearchTerm} />}
    </div>
  );
}
