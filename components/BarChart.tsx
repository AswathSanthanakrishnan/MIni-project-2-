
import React from 'react';

interface BarChartProps {
    title: string;
    data: { label: string; value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ title, data }) => {
    const maxValue = Math.max(...data.map(d => d.value), 0);
    const color = 'bg-sky-500';

    return (
        <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-5 shadow-lg h-full">
            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center text-sm space-x-3">
                        <div className="w-1/3 text-slate-300 truncate text-right">{item.label}</div>
                        <div className="w-2/3 flex items-center">
                            <div className="w-full bg-slate-700 rounded-md h-6 relative">
                                <div
                                    className={`${color} h-6 rounded-md transition-all duration-500 ease-out`}
                                    style={{ width: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%' }}
                                />
                                <span className="absolute inset-0 flex items-center justify-end pr-2 text-white font-semibold text-xs">
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarChart;