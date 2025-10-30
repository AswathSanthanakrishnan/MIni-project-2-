
import React from 'react';
import Spinner from './Spinner';
import { DocumentReportIcon } from './icons/DocumentReportIcon';

interface PerformanceReportProps {
    report: string;
    onGenerate: () => void;
    isLoading: boolean;
    hasProfiles: boolean;
}

// Basic markdown to HTML converter
const Markdown: React.FC<{ content: string }> = ({ content }) => {
    const htmlContent = content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-sky-300 mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-sky-400 mt-8 mb-4 border-b border-slate-600 pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-white mt-4 mb-6">$1</h1>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-1">$1</li>')
      .replace(/^\* (.*$)/gim, '<li class="ml-6 mb-1">$1</li>')
      .replace(/((\r\n|\n|\r)+)(<li)/g, '<ul>$2$3') // Start of list
      .replace(/(<\/li>)((\r\n|\n|\r)+)(?!<li)/g, '$1</ul>$2') // End of list
      .replace(/\n/g, '<br />');

    return <div className="prose prose-invert text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};


const PerformanceReport: React.FC<PerformanceReportProps> = ({ report, onGenerate, isLoading, hasProfiles }) => {
    if (!report && !isLoading) {
        return (
            <div className="text-center py-20 text-slate-400">
                <DocumentReportIcon className="mx-auto h-12 w-12 text-slate-500" />
                <p className="mt-4 text-lg">No report generated.</p>
                {hasProfiles ? (
                    <>
                        <p>Click the button to generate a performance report for the manager.</p>
                        <button
                            onClick={onGenerate}
                            disabled={isLoading}
                            className="mt-6 inline-flex items-center justify-center bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-md transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
                        >
                            {isLoading ? <><Spinner small /> Generating...</> : 'Generate Report'}
                        </button>
                    </>
                ) : (
                     <p className="text-amber-400 mt-2">Please analyze logs to create worker profiles first.</p>
                )}
            </div>
        );
    }
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-96"><Spinner /></div>;
    }
    
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 animate-fade-in">
             <Markdown content={report} />
        </div>
    );
};

export default PerformanceReport;
