import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Header } from './Dashboard';
import { useCaseStore } from '../store/caseStore';
import { useToast } from '../components/Toast';

const CaseInfo = () => {
  const navigate = useNavigate();
  const activeCase = useCaseStore(state => state);
  const createNewCase = useCaseStore(state => state.createNewCase);
  const saveDraft = useCaseStore(state => state.saveDraft);
  const showToast = useToast();
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    if (!activeCase || !activeCase.caseId) {
      createNewCase();
    }
  }, [activeCase, createNewCase]);

  const formData = activeCase || {};

  const handleChange = (field, value) => {
    useCaseStore.getState().updateActiveCase({ [field]: value });
  };

  const handleSaveDraft = () => {
    const success = useCaseStore.getState().saveDraft();
    if (success) {
      setSaveStatus('success');
      showToast(`Draft saved — ${formData.caseId}`, 'success');
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus('error');
      showToast('Draft save failed', 'error');
    }
  };

  if (!formData.caseId) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="main-content bg-bg-primary flex items-center justify-center h-screen">
          <div className="text-center text-white">Initializing case...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content bg-bg-primary">
        <Header />

        <div className="p-6 md:p-8 flex flex-col max-w-[1600px] mx-auto w-full fade-in">
          <div className="flex flex-col gap-3 mb-6">
            <h1 className="text-2xl font-display font-bold text-text-primary">CASE INFORMATION</h1>
            <p className="text-sm text-muted">Complete the investigation intake details below and save your progress at any time.</p>
          </div>

          <div style={{
            background: 'rgba(0,229,255,0.08)',
            border: '1px solid rgba(0,229,255,0.3)',
            borderRadius: 8,
            padding: '12px 20px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ color: '#94A3B8', fontSize: 11, letterSpacing: 2 }}>CASE NUMBER</span>
            <span style={{ color: '#00E5FF', fontSize: 20, fontWeight: 800, fontFamily: 'Courier New' }}>{formData.caseId}</span>
            <span style={{ color: '#64748B', fontSize: 10 }}>
              {formData.status || 'DRAFT'} · {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : 'Today'}
            </span>
          </div>

          <form className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="card p-6 bg-[#07101c] border border-border rounded-lg">
                <h2 className="text-sm font-bold text-cyan mb-4 uppercase tracking-widest">Primary Case Data</h2>
                <div className="space-y-4">
                  <label className="block text-xs text-muted uppercase tracking-widest">Case Title</label>
                  <input
                    className="input-field"
                    value={formData.caseTitle || ''}
                    onChange={(e) => handleChange('caseTitle', e.target.value)}
                    placeholder="Enter case title"
                  />

                  <label className="block text-xs text-muted uppercase tracking-widest">Reported Crime Type</label>
                  <select
                    className="input-field"
                    value={formData.caseType || ''}
                    onChange={(e) => handleChange('caseType', e.target.value)}
                  >
                    <option value="">Select crime type</option>
                    <option value="MURDER">MURDER</option>
                    <option value="ROBBERY">ROBBERY</option>
                    <option value="THEFT">THEFT</option>
                    <option value="ASSAULT">ASSAULT</option>
                    <option value="BURGLARY">BURGLARY</option>
                    <option value="KIDNAPPING">KIDNAPPING</option>
                    <option value="VANDALISM">VANDALISM</option>
                  </select>

                  <label className="block text-xs text-muted uppercase tracking-widest">Priority Level</label>
                  <select
                    className="input-field"
                    value={formData.priorityLevel || ''}
                    onChange={(e) => handleChange('priorityLevel', e.target.value)}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div className="card p-6 bg-[#07101c] border border-border rounded-lg">
                <h2 className="text-sm font-bold text-cyan mb-4 uppercase tracking-widest">Location & Time</h2>
                <div className="space-y-4">
                  <label className="block text-xs text-muted uppercase tracking-widest">Address</label>
                  <input
                    className="input-field"
                    value={formData.address || ''}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Street address, city"
                  />

                  <label className="block text-xs text-muted uppercase tracking-widest">District</label>
                  <input
                    className="input-field"
                    value={formData.district || ''}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="District / precinct"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-widest">Time of Crime</label>
                      <input
                        className="input-field"
                        value={formData.timeOfCrime || ''}
                        onChange={(e) => handleChange('timeOfCrime', e.target.value)}
                        placeholder="HH:MM"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-widest">Day of Week</label>
                      <select
                        className="input-field"
                        value={formData.dayOfWeek || ''}
                        onChange={(e) => handleChange('dayOfWeek', e.target.value)}
                      >
                        <option value="">Select day</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-[#07101c] border border-border rounded-lg">
                <h2 className="text-sm font-bold text-cyan mb-4 uppercase tracking-widest">Suspects & Victims</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest">Number of Suspects</label>
                    <input
                      type="number"
                      className="input-field"
                      min="0"
                      value={formData.numberOfSuspects || ''}
                      onChange={(e) => handleChange('numberOfSuspects', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest">Number of Victims</label>
                    <input
                      type="number"
                      className="input-field"
                      min="0"
                      value={formData.numberOfVictims || ''}
                      onChange={(e) => handleChange('numberOfVictims', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 bg-[#07101c] border border-border rounded-lg">
                <h2 className="text-sm font-bold text-cyan mb-4 uppercase tracking-widest">Evidence & Narrative</h2>
                <div className="space-y-4">
                  <label className="block text-xs text-muted uppercase tracking-widest">Entry Method</label>
                  <select
                    className="input-field"
                    value={formData.entryMethod || ''}
                    onChange={(e) => handleChange('entryMethod', e.target.value)}
                  >
                    <option value="">Select entry method</option>
                    <option>FORCED ENTRY</option>
                    <option>UNLOCKED DOOR</option>
                    <option>WINDOW BREAK</option>
                    <option>KNOWN ACCESS</option>
                  </select>

                  <label className="block text-xs text-muted uppercase tracking-widest">Weapon Present</label>
                  <select
                    className="input-field"
                    value={formData.weaponPresent || ''}
                    onChange={(e) => handleChange('weaponPresent', e.target.value)}
                  >
                    <option value="">Select weapon presence</option>
                    <option>YES</option>
                    <option>NO</option>
                  </select>

                  <label className="block text-xs text-muted uppercase tracking-widest">Weapon Type</label>
                  <select
                    className="input-field"
                    value={formData.weaponType || ''}
                    onChange={(e) => handleChange('weaponType', e.target.value)}
                  >
                    <option value="">Select weapon type</option>
                    <option>FIREARM</option>
                    <option>KNIFE</option>
                    <option>BLUNT OBJECT</option>
                    <option>NONE</option>
                  </select>
                </div>
              </div>

              <div className="card p-6 bg-[#07101c] border border-border rounded-lg">
                <h2 className="text-sm font-bold text-cyan mb-4 uppercase tracking-widest">Investigator</h2>
                <div className="space-y-4">
                  <label className="block text-xs text-muted uppercase tracking-widest">Investigator Name</label>
                  <input
                    className="input-field"
                    value={formData.investigatorName || ''}
                    onChange={(e) => handleChange('investigatorName', e.target.value)}
                    placeholder="Investigator name"
                  />

                  <label className="block text-xs text-muted uppercase tracking-widest">Officer Narrative</label>
                  <textarea
                    className="input-field"
                    rows="5"
                    value={formData.officerNarrative || ''}
                    onChange={(e) => handleChange('officerNarrative', e.target.value)}
                    placeholder="Summarize officer narrative"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="flex justify-end items-center gap-4 mt-8">
            <button
              type="button"
              className="btn-outline px-5 py-3 text-sm"
              onClick={handleSaveDraft}
            >
              SAVE DRAFT
            </button>
            <button
              type="button"
              className="btn-primary px-6 py-3 text-sm"
              onClick={() => navigate('/upload-evidence')}
            >
              CONTINUE TO UPLOAD EVIDENCE →
            </button>
          </div>

          {saveStatus && (
            <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, minWidth: 260 }}>
              <div style={{
                background: saveStatus === 'success' ? 'rgba(0,180,80,0.95)' : 'rgba(220,50,50,0.95)',
                color: 'white', padding: '14px 18px', borderRadius: 10,
                borderLeft: `4px solid ${saveStatus === 'success' ? '#00FF88' : '#FF4444'}`,
                fontFamily: 'Courier New, monospace', fontWeight: 600,
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
              }}>
                {saveStatus === 'success' ? `✓ Draft saved — ${formData.caseId}` : '✕ Draft save failed'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseInfo;
