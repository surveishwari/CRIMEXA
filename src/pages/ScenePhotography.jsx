import React, { useState } from 'react';
import { Sidebar, Header } from './Dashboard';
import { useNavigate } from 'react-router-dom';

const ScenePhotography = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="Scene Photography" />
        
        <div className="p-6 h-full flex flex-col gap-6 w-full fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Step 2: Upload Scene Images</h2>
              <p className="text-muted text-sm">Upload numerous images of the actual scene. These will be processed for Object Detection and 3D Reconstruction.</p>
            </div>
            {images.length > 0 && (
              <button onClick={() => navigate('/prediction')} className="btn-primary">Analyze Images for Prediction ➔</button>
            )}
          </div>

          <div className="relative w-full h-48 border-2 border-dashed border-panel-border rounded bg-black flex flex-col items-center justify-center cursor-pointer hover:border-primary-color transition-colors">
            <span className="text-3xl mb-2 text-primary">📸</span>
            <p className="text-sm font-bold text-white">Drag & Drop Numerous Images</p>
            <p className="text-xs text-muted">Supports JPG, PNG (Max 50MB per batch)</p>
            <input type="file" multiple accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
          </div>

          {images.length > 0 && (
            <div className="card p-6 border-panel-border flex-1 overflow-y-auto">
              <h3 className="text-sm font-bold text-white mb-4 tracking-widest uppercase">Uploaded Batch ({images.length} Images)</h3>
              <div className="grid grid-cols-4 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
                {images.map((src, idx) => (
                  <div key={idx} className="relative aspect-video bg-black rounded border border-panel-border overflow-hidden">
                    <img src={src} alt="Scene" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-primary border border-primary-color">
                      IMG_{202400 + idx}.JPG
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ScenePhotography;
