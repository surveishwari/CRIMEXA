import React, { useState } from 'react';
import { Sidebar, Header } from './Dashboard';
import { useNavigate } from 'react-router-dom';

const CaseIntake = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ location: '', time: '', description: '', evidenceFile: null });

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/photography'); // Flow to next tab
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="Case Intake & Initial Evidence" />
        
        <div className="p-6 h-full flex flex-col gap-6 max-w-4xl mx-auto w-full fade-in">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">Step 1: Input Case Parameters</h2>
            <p className="text-muted text-sm">Add location, time, and initial description factors before proceeding to visual upload.</p>
          </div>

          <form onSubmit={handleNext} className="card bg-panel p-8 border-panel-border border flex flex-col gap-6">
            
            <div className="grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-muted mb-2 block">Incident Location</label>
                <input required type="text" className="input-field bg-black border-panel-border" placeholder="e.g. 124 Downtown Alleyway" />
              </div>
              <div>
                <label className="text-sm font-semibold text-muted mb-2 block">Time of Incident</label>
                <input required type="datetime-local" className="input-field bg-black border-panel-border" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-muted mb-2 block">Case Description & Factors</label>
              <textarea required rows="4" className="input-field bg-black border-panel-border" placeholder="Describe what happened, suspects, victims, and context..."></textarea>
            </div>

            <div>
              <label className="text-sm font-semibold text-muted mb-2 block">Upload Primary Evidence Log (Documents / Initial Evidence)</label>
              <div className="w-full h-32 border-2 border-dashed border-panel-border rounded bg-black flex flex-col items-center justify-center cursor-pointer hover:border-primary-color transition-colors">
                <span className="text-2xl mb-2">📤</span>
                <p className="text-sm font-bold text-white">Click to Upload Case Evidence</p>
                <p className="text-xs text-muted">Supports PDF, DOCX, CSV</p>
                <input type="file" className="absolute opacity-0 w-full h-full cursor-pointer" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-panel-border">
              <button type="submit" className="btn-primary">Save & Continue to Photography ➔</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CaseIntake;
