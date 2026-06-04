import React, { useState } from 'react';
import { Sidebar, Header } from './Dashboard';
import StepProgressBar from '../components/Layout/StepProgressBar';
import { useNavigate } from 'react-router-dom';
import { useCaseStore } from '../store/caseStore';
import { fileToDataUrl, addScenePhotoToStore } from '../utils/photoUtils';

const UploadEvidence = () => {
  const navigate = useNavigate();
  const [evidenceList, setEvidenceList] = useState([]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const dataUrl = await fileToDataUrl(file);
        addScenePhotoToStore(dataUrl);
      }
    }

    const newEvidence = files.map((file, index) => {
      // Basic mockup of a SHA-256 hash
      const mockHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      
      // Determine icon based on file type
      let icon = '📄';
      if (file.type.startsWith('image/')) icon = '🖼️';
      else if (file.type.startsWith('video/')) icon = '🎥';
      else if (file.type === 'application/pdf') icon = '📑';

      return {
        id: `E-${(evidenceList.length + index + 1).toString().padStart(2, '0')}`,
        name: file.name,
        type: file.type.split('/')[1]?.toUpperCase() || 'DOCUMENT',
        hash: mockHash.substring(0, 16) + '...',
        status: 'PENDING ANALYSIS',
        icon: icon,
        previewUrl: URL.createObjectURL(file),
        isImage: file.type.startsWith('image/')
      };
    });

    setEvidenceList(prev => [...prev, ...newEvidence]);
  };

  const removeEvidence = (idToRemove) => {
    setEvidenceList(prev => prev.filter(item => item.id !== idToRemove));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content bg-bg-primary">
        <Header />
        
        <div className="p-6 md:p-8 flex flex-col max-w-[1600px] mx-auto w-full fade-in">
          
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-xs font-mono text-muted mb-1 uppercase tracking-widest">Case #047</p>
              <h1 className="text-2xl font-bold text-text-primary tracking-wide">EVIDENCE VAULT</h1>
            </div>
            <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded text-xs font-mono text-primary font-bold">
              {evidenceList.length} ITEMS UPLOADED
            </div>
          </div>
          
          <StepProgressBar currentStep={2} />

          {/* Upload Zone */}
          <div className="relative w-full h-40 border-2 border-dashed border-primary/40 rounded-xl bg-primary/5 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors mb-8 shadow-sm">
            <span className="text-4xl mb-2">📤</span>
            <p className="text-sm font-bold text-text-primary tracking-widest uppercase">Drag & Drop Evidence Files Here</p>
            <p className="text-xs text-muted mt-2">Supports: JPG, PNG, PDF, MP4, MP3, DOCX, CSV (Max 50MB)</p>
            <input 
              type="file" 
              multiple 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              onChange={handleFileUpload}
            />
          </div>

          {/* Summary & Filters */}
          <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
            <div className="flex gap-4">
              <button className="text-sm font-bold text-primary border-b-2 border-primary pb-1">ALL ({evidenceList.length})</button>
              <button className="text-sm text-muted hover:text-text-primary pb-1">PHOTOS</button>
              <button className="text-sm text-muted hover:text-text-primary pb-1">DOCUMENTS</button>
            </div>
            <div className="flex gap-3">
              <button className="btn-outline text-xs py-1.5 px-3">DELETE SELECTED</button>
              <button className="btn-primary text-xs py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 shadow-none">ANALYZE EVIDENCE</button>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 flex-1">
            {evidenceList.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center text-muted h-32">
                <p>No evidence catalogued yet. Upload files to begin.</p>
              </div>
            ) : (
              evidenceList.map(item => (
                <div key={item.id} className="card p-0 flex flex-col h-[300px]">
                  <div className="h-40 bg-slate-800/50 flex items-center justify-center text-5xl border-b border-border relative overflow-hidden">
                    {item.isImage ? (
                      <img src={item.previewUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      item.icon
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-primary/10 border border-primary/20 px-2 py-0.5 rounded text-xs font-mono font-bold text-primary">{item.id}</span>
                      <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono text-muted">{item.type}</span>
                    </div>
                    <p className="text-sm font-bold text-text-primary mb-1 truncate">{item.name}</p>
                    <p className="text-xs font-mono text-muted mb-3 truncate">SHA-256: {item.hash}</p>
                    
                    <div className="mt-auto">
                      <p className={`text-xs font-bold tracking-wider ${item.status === 'CATALOGUED' ? 'text-green' : 'text-amber'}`}>
                        {item.status === 'CATALOGUED' ? '✓ CATALOGUED' : '● PENDING ANALYSIS'}
                      </p>
                    </div>
                  </div>
                  <div className="flex border-t border-border">
                    <a href={item.previewUrl} download={item.name} className="flex-1 py-2.5 text-[10px] text-center font-bold tracking-widest text-muted hover:bg-slate-800 hover:text-primary border-r border-border transition-colors pt-3">DOWNLOAD</a>
                    <button className="flex-1 py-2.5 text-[10px] font-bold tracking-widest text-muted hover:bg-red/10 hover:text-red transition-colors" onClick={() => removeEvidence(item.id)}>DELETE</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end pt-6 border-t border-border mt-auto">
            <button className="btn-primary py-3 px-6 text-sm" onClick={() => navigate('/scene-photos')}>SAVE & CONTINUE TO SCENE PHOTOS ➔</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadEvidence;
