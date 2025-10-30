
import React, { useState, useCallback } from 'react';
import { WorkerProfile } from './types';
import { generateSyntheticLogs, analyzeLogsAndCreateProfiles, generateManagerReport } from './services/geminiService';
import Header from './components/Header';
import LogInput from './components/LogInput';
import WorkerProfileCard from './components/WorkerProfileCard';
import PerformanceReport from './components/PerformanceReport';
import TabButton from './components/TabButton';
import Spinner from './components/Spinner';
import { UserGroupIcon } from './components/icons/UserGroupIcon';
import { DocumentReportIcon } from './components/icons/DocumentReportIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';

type Tab = 'profiles' | 'report' | 'generator';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string>('');
  const [workerProfiles, setWorkerProfiles] = useState<WorkerProfile[]>([]);
  const [managerReport, setManagerReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('profiles');

  const handleGenerateLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const syntheticLogs = await generateSyntheticLogs();
      setLogs(syntheticLogs);
    } catch (e) {
      setError('Failed to generate synthetic logs. Please check your API key and try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!logs.trim()) {
      setError('Log input cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setWorkerProfiles([]);
    setManagerReport('');
    try {
      const profiles = await analyzeLogsAndCreateProfiles(logs);
      setWorkerProfiles(profiles);
      setActiveTab('profiles');
    } catch (e) {
      setError('Failed to analyze logs. The AI model might have returned an unexpected format.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [logs]);
  
  const handleGenerateReport = useCallback(async () => {
    if (workerProfiles.length === 0) {
      setError('Please analyze logs to generate profiles first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const report = await generateManagerReport(workerProfiles);
      setManagerReport(report);
      setActiveTab('report');
    } catch (e) {
      setError('Failed to generate the manager report.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [workerProfiles]);

  const renderContent = () => {
    if (isLoading && activeTab !== 'generator') {
       return <div className="flex justify-center items-center h-96"><Spinner /></div>;
    }

    switch (activeTab) {
      case 'profiles':
        return workerProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workerProfiles.map((profile, index) => (
              <WorkerProfileCard key={index} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <UserGroupIcon className="mx-auto h-12 w-12 text-slate-500" />
            <p className="mt-4 text-lg">No worker profiles generated yet.</p>
            <p>Paste or generate logs and click "Analyze Logs" to start.</p>
          </div>
        );
      case 'report':
        return <PerformanceReport report={managerReport} onGenerate={handleGenerateReport} isLoading={isLoading} hasProfiles={workerProfiles.length > 0} />;
      case 'generator':
         return <LogInput logs={logs} setLogs={setLogs} onAnalyze={handleAnalyze} onGenerate={handleGenerateLogs} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/50 rounded-xl shadow-2xl p-6 border border-slate-700">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-1/3 lg:w-1/4">
               <LogInput logs={logs} setLogs={setLogs} onAnalyze={handleAnalyze} onGenerate={handleGenerateLogs} isLoading={isLoading} />
            </aside>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="border-b border-slate-700 mb-6">
                <nav className="flex space-x-2" aria-label="Tabs">
                  <TabButton onClick={() => setActiveTab('profiles')} isActive={activeTab === 'profiles'}><UserGroupIcon className="h-5 w-5 mr-2" /> Worker Profiles</TabButton>
                  <TabButton onClick={() => setActiveTab('report')} isActive={activeTab === 'report'}><DocumentReportIcon className="h-5 w-5 mr-2" /> Performance Report</TabButton>
                </nav>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6" role="alert">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="transition-opacity duration-300">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
        <footer className="text-center mt-8 text-slate-500 text-sm">
            <p>AI-Generated Content is Machine-Assisted. Please verify important information.</p>
            <p>&copy; 2024 Intelligent NLP Systems Project</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
