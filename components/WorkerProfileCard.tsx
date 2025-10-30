
import React from 'react';
import { WorkerProfile } from '../types';

interface WorkerProfileCardProps {
  profile: WorkerProfile;
}

const WorkerProfileCard: React.FC<WorkerProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-5 shadow-lg transition-all duration-300 hover:border-sky-500 hover:shadow-sky-500/10">
      <div className="flex items-center mb-4">
        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-500/20 text-sky-300 font-bold text-lg mr-4">
          {profile.employeeName.charAt(0)}
        </span>
        <h3 className="text-xl font-bold text-white">{profile.employeeName}</h3>
      </div>
      <p className="text-slate-300 mb-4 text-sm leading-relaxed">{profile.profileSummary}</p>
      <div>
        <h4 className="font-semibold text-slate-200 mb-2 text-sm">Task Categories:</h4>
        <div className="flex flex-wrap gap-2">
          {profile.tasks.map((task, index) => (
            <span key={index} className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
              {task}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileCard;
