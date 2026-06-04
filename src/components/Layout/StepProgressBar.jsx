import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StepProgressBar = ({ currentStep }) => {
  const navigate = useNavigate();
  const steps = [
    { num: 1, label: 'CASE INFO', route: '/case-info' },
    { num: 2, label: 'UPLOAD EVIDENCE', route: '/upload-evidence' },
    { num: 3, label: 'SCENE PHOTOS', route: '/scene-photos' },
    { num: 4, label: 'PREDICTION', route: '/prediction' },
    { num: 5, label: 'RECONSTRUCTION', route: '/reconstruction' },
    { num: 6, label: 'REPORT', route: '/reports' }
  ];

  return (
    <div className="flex justify-between items-center relative w-full mb-8 mt-4 px-4">
      {/* Connecting Line */}
      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border -z-10"></div>
      
      {steps.map((step, i) => {
        const isCompleted = step.num < currentStep;
        const isActive = step.num === currentStep;
        
        return (
          <div key={i} className="flex flex-col items-center bg-bg-primary px-2 cursor-pointer" onClick={() => navigate(step.route)}>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-display font-bold text-xs mb-2 transition-colors ${isActive ? 'border-cyan bg-cyan-dim text-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]' : isCompleted ? 'border-green bg-green/20 text-green' : 'border-border bg-bg-card text-muted'}`}>
              {isCompleted ? '✓' : step.num}
            </div>
            <p className={`text-[9px] font-mono font-bold tracking-widest whitespace-nowrap ${isActive ? 'text-cyan' : isCompleted ? 'text-green' : 'text-muted'}`}>
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;
