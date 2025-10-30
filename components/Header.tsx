
import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/60 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <CodeIcon className="h-8 w-8 text-sky-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
                Intelligent Worker Profiling Tool
            </h1>
        </div>
        <span className="text-sm text-slate-400">Applied NLP Systems</span>
      </div>
    </header>
  );
};

export default Header;
