
import React from 'react';
import { WorkerProfile } from '../types';
import BarChart from './BarChart';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface DashboardProps {
    profiles: WorkerProfile[];
}

const Dashboard: React.FC<DashboardProps> = ({ profiles }) => {
    if (profiles.length === 0) {
        return (
            <div className="text-center py-20 text-slate-400">
                <ChartBarIcon className="mx-auto h-12 w-12 text-slate-500" />
                <p className="mt-4 text-lg">No data to display.</p>
                <p>Analyze logs to generate worker profiles and view analytics.</p>
            </div>
        );
    }

    const tasksPerWorker = profiles.map(profile => ({
        label: profile.employeeName,
        value: profile.tasks.length,
    })).sort((a, b) => b.value - a.value);

    const categoryDistribution = profiles
        .flatMap(profile => profile.tasks)
        .reduce((acc, category) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

    const categoryData = Object.entries(categoryDistribution).map(([label, value]) => ({
        label,
        value,
    })).sort((a, b) => b.value - a.value);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            <BarChart title="Tasks per Worker" data={tasksPerWorker} />
            <BarChart title="Task Category Distribution" data={categoryData} />
        </div>
    );
};

export default Dashboard;