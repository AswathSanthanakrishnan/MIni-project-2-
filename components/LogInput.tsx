
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import Spinner from './Spinner';

interface LogInputProps {
  logs: string;
  setLogs: (logs: string) => void;
  onAnalyze: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const LogInput: React.FC<LogInputProps> = ({ logs, setLogs, onAnalyze, onGenerate, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-4">
      <label htmlFor="log-input" className="font-semibold text-slate-200">
        Task Logs Input
      </label>
      <textarea
        id="log-input"
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
        placeholder="Paste task logs here, or generate synthetic data to start..."
        className="w-full flex-grow bg-slate-900 border border-slate-600 rounded-md p-3 text-sm text-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200 min-h-[300px] md:min-h-[400px]"
        disabled={isLoading}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
        >
          {isLoading ? <Spinner small /> : <SparklesIcon className="h-5 w-5 mr-2" />}
          Generate Data
        </button>
        <button
          onClick={onAnalyze}
          disabled={isLoading || !logs.trim()}
          className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
        >
          Analyze Logs
        </button>
      </div>
    </div>
  );
};

export default LogInput;
