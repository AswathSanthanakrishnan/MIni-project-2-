
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import Spinner from './Spinner';
import { DocumentReportIcon } from './icons/DocumentReportIcon';

interface PerformanceReportProps {
    report: string;
    onGenerate: () => void;
    isLoading: boolean;
    hasProfiles: boolean;
}

const Markdown: React.FC<{ content: string }> = ({ content }) => {
    const [html, setHtml] = useState('');

    useEffect(() => {
        // This is safe because the content is from our trusted AI.
        // For a production app with user input, this would need sanitization.
        const parsedHtml = marked.parse(content) as string;
        
        // Add Tailwind-like classes for consistent styling
        const styledHtml = parsedHtml
            .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-sky-400 mt-8 mb-4 border-b border-slate-600 pb-2">')
            .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-sky-300 mt-6 mb-2">')
            .replace(/<h1>/g, '<h1 class="text-3xl font-extrabold text-white mt-4 mb-6">')
            .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 pl-4">')
            .replace(/<p>/g, '<p class="mb-4">')
            .replace(/<strong>/g, '<strong class="font-semibold text-white">');
            
        setHtml(styledHtml);
    }, [content]);

    return <div className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
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