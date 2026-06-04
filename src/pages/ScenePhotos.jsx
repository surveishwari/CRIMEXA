import React, { useState, useEffect } from 'react';
import { Sidebar, Header } from './Dashboard';
import StepProgressBar from '../components/Layout/StepProgressBar';
import { useNavigate } from 'react-router-dom';
import { useCaseStore } from '../store/caseStore';
import { mapYoloToDetected } from '../utils/caseDataUtils';
import { addScenePhotoToStore, fileToDataUrl } from '../utils/photoUtils';

const ScenePhotos = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  
  const [uploadedPhotos, setUploadedPhotos] = useState([
    { id: 'IMG_01', detections: 3, objects: ['PERSON', 'WEAPON', 'BLOOD'], objectUrl: null },
    { id: 'IMG_02', detections: 0, objects: [], objectUrl: null },
  ]);

  useEffect(() => {
    uploadedPhotos.forEach((p) => {
      if (p.objectUrl && p.isImage !== false) {
        const existing = useCaseStore.getState().scenePhotos || [];
        if (!existing.includes(p.objectUrl)) {
          addScenePhotoToStore(p.objectUrl);
        }
      }
    });
  }, [uploadedPhotos]);

  useEffect(() => {
    const all = uploadedPhotos.flatMap((p) => p.objects || []);
    const fromApi = uploadedPhotos.flatMap((p) =>
      (p.detectionsList || []).map((d) => d.class || d.label || d.name)
    );
    const detected = mapYoloToDetected([...all, ...fromApi]);
    if (detected.length) {
      useCaseStore.getState().updateField('detectedObjects', detected);
    }
  }, [uploadedPhotos]);

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPhotos = files.map((file, index) => ({
      id: `UPLOAD_${Date.now()}_${index}`,
      name: file.name,
      detections: 0,
      objects: [],
      objectUrl: URL.createObjectURL(file),
      file: file
    }));

    setUploadedPhotos(prev => [...newPhotos, ...prev]);

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const dataUrl = await fileToDataUrl(file);
        addScenePhotoToStore(dataUrl);
      }
    }
  };

  const handleAnalyzePhoto = async (photo) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
    
    // If we already analyzed it or it's a mock, skip
    if (!photo.file || photo.detectionsList) return;
    
    setAnalyzingImage(true);
    const formData = new FormData();
    formData.append('image', photo.file);
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze/image', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (data.detections) {
        setSelectedPhoto(prev => ({...prev, detectionsList: data.detections}));
        
        // Update main gallery state
        setUploadedPhotos(prev => prev.map(p => 
          p.id === photo.id ? {...p, detectionsList: data.detections, detections: data.detections.length} : p
        ));
      }
    } catch (e) {
      console.error("YOLO inference failed:", e);
    } finally {
      setAnalyzingImage(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content bg-bg-primary">
        <Header />
        
        <div className="p-6 md:p-8 flex flex-col max-w-[1600px] mx-auto w-full fade-in relative">
          
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-[10px] font-mono text-muted mb-1">CASE #047</p>
              <h1 className="text-2xl font-display font-bold text-text-primary">CRIME SCENE PHOTO ANALYSIS</h1>
              <p className="text-xs text-muted font-mono mt-1">Upload high-quality scene photographs for AI-powered YOLOv8 object detection and 3D mapping.</p>
            </div>
            <div className="bg-cyan-dim border border-cyan px-3 py-1 rounded text-xs font-mono text-cyan">YOLOv8 MODEL: ACTIVE</div>
          </div>
          
          <StepProgressBar currentStep={3} />

          {/* Upload Area */}
          <div className="relative w-full h-32 border-2 border-dashed border-cyan rounded-lg bg-[rgba(0,212,255,0.02)] flex flex-col items-center justify-center cursor-pointer hover:bg-[rgba(0,212,255,0.05)] transition-colors mb-8">
            <span className="text-3xl mb-2 text-cyan">📸</span>
            <p className="text-sm font-display font-bold text-text-primary tracking-widest">UPLOAD SCENE PHOTOGRAPHS</p>
            <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
          </div>

          <div className="flex gap-8 flex-1 mb-8">
            
            {/* Gallery */}
            <div className="flex-[2] flex flex-col">
              <h3 className="text-xs font-display font-bold tracking-widest text-cyan mb-4 border-b border-border pb-2">PROCESSED IMAGES ({uploadedPhotos.length})</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {uploadedPhotos.map((p, idx) => (
                  <div key={idx} className="card overflow-hidden group cursor-pointer" onClick={() => handleAnalyzePhoto(p)}>
                    <div className="h-40 bg-[#0A1628] flex items-center justify-center border-b border-border relative overflow-hidden">
                      {p.objectUrl ? (
                        <img src={p.objectUrl} className="w-full h-full object-cover" alt="Scene" />
                      ) : (
                        <span className="text-muted text-xs font-mono">[ IMAGE MOCK ]</span>
                      )}
                      {/* Fake bounding boxes overlay on top of image */}
                      <div className="absolute top-4 left-4 w-12 h-20 border border-red bg-red/10 z-10"></div>
                      <div className="absolute bottom-4 right-8 w-10 h-10 border border-amber bg-amber/10 z-10"></div>
                    </div>
                    <div className="p-3 flex justify-between items-center bg-[rgba(10,22,40,0.8)]">
                      <div>
                        <p className="text-xs font-mono font-bold text-text-primary">{p.name || `${p.id}.JPG`}</p>
                        <p className="text-[10px] font-mono text-amber">● {p.detections} OBJECTS DETECTED</p>
                      </div>
                      <button className="text-[10px] border border-cyan text-cyan px-2 py-1 rounded hover:bg-cyan/20 transition-colors">VIEW ANALYSIS</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scene Overview Panel */}
            <div className="flex-[1] flex flex-col">
              <div className="card p-6 h-full border-cyan/30 shadow-[0_0_20px_rgba(0,212,255,0.05)]">
                <h3 className="text-xs font-display font-bold tracking-widest text-cyan mb-4 border-b border-border pb-2">SCENE COMPOSITION ANALYSIS</h3>
                <p className="text-[10px] font-mono text-muted mb-6">Aggregated object detection across ALL photos.</p>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-red">PERSON / BODY</span>
                      <span className="text-text-primary">Detected in 2 photos</span>
                    </div>
                    <div className="w-full h-1 bg-border rounded"><div className="w-full h-full bg-red rounded"></div></div>
                    <p className="text-[9px] font-mono text-muted mt-1 text-right">Avg Confidence: 91.2%</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-amber">WEAPON</span>
                      <span className="text-text-primary">Detected in 1 photo</span>
                    </div>
                    <div className="w-full h-1 bg-border rounded"><div className="w-1/3 h-full bg-amber rounded"></div></div>
                    <p className="text-[9px] font-mono text-muted mt-1 text-right">Avg Confidence: 67.4%</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-green">LAPTOP / DEVICE</span>
                      <span className="text-text-primary">Detected in 1 photo</span>
                    </div>
                    <div className="w-full h-1 bg-border rounded"><div className="w-1/3 h-full bg-green rounded"></div></div>
                    <p className="text-[9px] font-mono text-muted mt-1 text-right">Avg Confidence: 87.4%</p>
                  </div>
                </div>

                <div className="mt-auto bg-[#0A1628] p-4 border border-border rounded">
                  <p className="text-[10px] font-mono text-muted uppercase mb-2">Reconstruction Readiness</p>
                  <p className="text-sm font-bold text-green mb-1">READY FOR 3D MAPPING</p>
                  <p className="text-xs text-muted">Key persons: 2 (1 prone, 1 standing). Weapons: 1.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-6 border-t border-border mt-auto">
            <button className="btn-primary" onClick={() => navigate('/prediction')}>PROCEED TO CRIME PREDICTION ➔</button>
          </div>
          
          {/* PHOTO ANALYSIS MODAL */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm">
              <div className="card w-full max-w-6xl h-[80vh] flex overflow-hidden border-cyan shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                
                <div className="flex-[3] bg-[#050A0F] relative border-r border-border p-4 flex items-center justify-center">
                  <button className="absolute top-4 left-4 text-xs font-mono text-muted border border-border px-2 py-1 rounded hover:text-white" onClick={() => setModalOpen(false)}>← BACK</button>
                  
                  <div className="relative w-full max-w-2xl aspect-video bg-[#0A1628] border border-border overflow-hidden">
                    {selectedPhoto?.objectUrl && (
                      <img src={selectedPhoto.objectUrl} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Scene" />
                    )}
                    <span className="absolute top-2 left-2 text-[10px] font-mono text-white bg-black/50 px-2 py-1 rounded z-20">{selectedPhoto?.name || 'IMG_01.JPG'}</span>
                    
                    {/* Dynamic AI Bounding Boxes */}
                    {analyzingImage ? (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-30">
                        <div className="w-10 h-10 border-4 border-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-cyan font-mono text-sm tracking-widest animate-pulse">RUNNING LIVE YOLOv8 INFERENCE...</p>
                      </div>
                    ) : selectedPhoto?.detectionsList ? (
                      selectedPhoto.detectionsList.map((det, idx) => {
                        let colorClass = "border-cyan bg-cyan/10";
                        let textClass = "bg-cyan text-black";
                        if (det.label.includes('Weapon')) { colorClass = "border-amber bg-amber/10"; textClass = "bg-amber text-black"; }
                        if (det.label.includes('Victim') || det.label.includes('Blood')) { colorClass = "border-[#FF3333] bg-[#FF3333]/20"; textClass = "bg-[#FF3333] text-white"; }
                        
                        return (
                          <div key={idx} className={`absolute border-2 ${colorClass} group hover:bg-transparent transition-all duration-300 z-10`}
                               style={{ top: `${det.box.top}%`, left: `${det.box.left}%`, width: `${det.box.width}%`, height: `${det.box.height}%` }}>
                            <span className={`absolute -top-5 left-[-2px] ${textClass} text-[9px] font-bold px-1 py-0.5 whitespace-nowrap shadow-sm`}>
                              {det.label.toUpperCase()} {det.confidence}%
                            </span>
                          </div>
                        )
                      })
                    ) : (
                      <>
                        {/* Fallback Mock Boxes for default images */}
                        <div className="absolute top-[20%] left-[30%] w-[15%] h-[40%] border-2 border-red bg-red/10 group">
                          <span className="absolute -top-5 left-[-2px] bg-red text-white text-[9px] font-bold px-1 py-0.5 whitespace-nowrap">PERSON 91%</span>
                        </div>
                        <div className="absolute top-[50%] left-[60%] w-[10%] h-[15%] border-2 border-amber bg-amber/10 group">
                          <span className="absolute -top-5 left-[-2px] bg-amber text-black text-[9px] font-bold px-1 py-0.5 whitespace-nowrap">WEAPON 67%</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex-[2] bg-bg-secondary p-6 flex flex-col overflow-y-auto">
                  <h3 className="text-sm font-display font-bold tracking-widest text-cyan mb-6">LIVE YOLO DETECTIONS</h3>
                  
                  <div className="flex flex-col gap-4 flex-1">
                    {analyzingImage ? (
                      <div className="text-center text-muted font-mono text-xs mt-10">Waiting for GPU response...</div>
                    ) : selectedPhoto?.detectionsList ? (
                      selectedPhoto.detectionsList.map((det, idx) => {
                        let borderColor = "border-cyan/30";
                        let bgColor = "bg-cyan/5";
                        let textColor = "text-cyan";
                        if (det.label.includes('Weapon')) { borderColor = "border-amber/30"; bgColor = "bg-amber/5"; textColor = "text-amber"; }
                        if (det.label.includes('Victim') || det.label.includes('Blood')) { borderColor = "border-red/30"; bgColor = "bg-red/5"; textColor = "text-red"; }
                        
                        return (
                          <div key={idx} className={`p-3 border ${borderColor} ${bgColor} rounded flex justify-between items-center`}>
                            <div>
                              <p className={`text-xs font-bold ${textColor}`}>{det.label.toUpperCase()}</p>
                              <p className="text-[10px] font-mono text-muted">Detected Entity</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-mono font-bold text-white mb-1">{det.confidence}%</p>
                              <button className="text-[9px] font-mono bg-border px-2 py-1 rounded hover:bg-cyan hover:text-black transition-colors">MARK</button>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center text-muted font-mono text-xs mt-10">Upload a real photo to see live inferences.</div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-border">
                    <button className="btn-primary w-full text-xs" onClick={() => setModalOpen(false)}>USE IN 3D RECONSTRUCTION</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ScenePhotos;
