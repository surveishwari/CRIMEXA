import React, { useState } from 'react';
import { Sidebar, Header } from './Dashboard';
import StepProgressBar from '../components/Layout/StepProgressBar';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      navigate('/museum');
    }, 2000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content bg-bg-primary">
        <Header />
        
        <div className="p-6 md:p-8 flex flex-col max-w-[1600px] mx-auto w-full fade-in h-full">
          
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-[10px] font-mono text-muted mb-1">CASE #047</p>
              <h1 className="text-2xl font-display font-bold text-text-primary">OFFICIAL PDF DOCUMENTATION</h1>
              <p className="text-xs text-muted font-mono mt-1">Generate professional, court-ready PDF dossier with ALL case information.</p>
            </div>
            <div className="bg-green/20 border border-green px-3 py-1 rounded text-xs font-mono text-green font-bold">READY FOR EXPORT</div>
          </div>
          
          <StepProgressBar currentStep={6} />

          <div className="flex gap-8 flex-1 overflow-hidden pb-4">
            
            {/* LEFT: REPORT BUILDER */}
            <div className="w-[40%] flex flex-col gap-6 overflow-y-auto pr-2">
              <div className="card p-6 border-border flex flex-col gap-6">
                
                <div>
                  <h3 className="text-xs font-display font-bold tracking-widest text-cyan mb-4 border-b border-border pb-2">SECTION SELECTION</h3>
                  <div className="flex flex-col gap-3 text-sm font-mono text-text-primary">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-cyan w-4 h-4" /> Cover Page + Classification Stamp</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-cyan w-4 h-4" /> Executive Summary</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-cyan w-4 h-4" /> Case Timeline</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-cyan w-4 h-4" /> Scene Documentation (Photos)</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-cyan w-4 h-4" /> Evidence Catalog</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-cyan w-4 h-4" /> ML Analysis Results (7 Models)</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-cyan w-4 h-4" /> QR Code — VR Access & Museum</label>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-display font-bold tracking-widest text-cyan mb-4 border-b border-border pb-2">DOCUMENT SETTINGS</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-muted mb-1 block">Classification Level</label>
                      <select className="input-field text-red font-bold" defaultValue="TOP SECRET">
                        <option className="text-white">UNCLASSIFIED</option><option className="text-amber">CONFIDENTIAL</option><option className="text-red">SECRET</option><option className="text-red font-bold animate-pulse">TOP SECRET</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-muted mb-1 block">Report Language</label>
                      <select className="input-field"><option>English (US)</option><option>Spanish</option></select>
                    </div>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-4">
                  <button className="btn-outline text-[10px] py-2 col-span-2">PREVIEW REPORT</button>
                  <button className="btn-outline text-[10px] py-2 flex justify-center items-center gap-2"><span>🖨</span> PRINT</button>
                  <button className="btn-outline text-[10px] py-2 flex justify-center items-center gap-2"><span>📧</span> EMAIL TEAM</button>
                  <button className="btn-primary text-xs py-3 col-span-2 relative overflow-hidden" onClick={handleDownload} disabled={downloading}>
                    {downloading ? (
                      <>
                        <div className="absolute inset-0 bg-cyan/20 animate-pulse"></div>
                        <span>GENERATING PDF...</span>
                      </>
                    ) : (
                      '⬇ DOWNLOAD COURT PDF'
                    )}
                  </button>
                </div>

              </div>
            </div>

            {/* RIGHT: LIVE PDF PREVIEW */}
            <div className="w-[60%] bg-[#0A1628] border border-border rounded-lg p-6 flex flex-col items-center overflow-y-auto shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
              
              <div className="w-full max-w-[600px] bg-white text-black p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden mb-8 transform origin-top hover:scale-[1.02] transition-transform">
                
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                  <span className="text-8xl font-display font-bold text-red transform -rotate-45 tracking-widest whitespace-nowrap">TOP SECRET</span>
                </div>

                {/* Header */}
                <div className="flex flex-col items-center border-b-2 border-black pb-6 mb-8 text-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="mb-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <h1 className="text-2xl font-display font-bold tracking-widest mb-1">CHICAGO POLICE DEPARTMENT</h1>
                  <h2 className="text-sm font-mono font-bold tracking-widest">OFFICIAL FORENSIC DOSSIER</h2>
                  <div className="mt-4 px-4 py-1 border-2 border-red text-red font-display font-bold tracking-widest">TOP SECRET</div>
                </div>

                {/* Body */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 font-mono text-xs">
                  <div><span className="font-bold">CASE NUMBER:</span> CPD-2026-0047</div>
                  <div><span className="font-bold">DATE GENERATED:</span> 30 APR 2026</div>
                  <div><span className="font-bold">CASE TITLE:</span> Downtown Assault</div>
                  <div><span className="font-bold">INVESTIGATOR:</span> Sgt. Ravi Kumar (10247)</div>
                </div>

                <div className="mb-8">
                  <h3 className="font-display font-bold text-sm bg-black text-white px-2 py-1 mb-4">1.0 EXECUTIVE SUMMARY</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="border border-black p-2 text-center">
                      <p className="font-bold text-[10px]">CRIME TYPE</p><p className="text-sm font-bold">ASSAULT</p>
                    </div>
                    <div className="border border-red bg-red/10 p-2 text-center">
                      <p className="font-bold text-[10px] text-red">RISK LEVEL</p><p className="text-sm font-bold text-red">HIGH (87)</p>
                    </div>
                    <div className="border border-black p-2 text-center">
                      <p className="font-bold text-[10px]">ARREST PROB</p><p className="text-sm font-bold">62.3%</p>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    <li>Based on ML Analysis, crime is classified as Premeditated Assault.</li>
                    <li>Weapon detected in scene analysis (Confidence: 67.4%).</li>
                    <li>Witness NLP statement classified as HIGH THREAT.</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="font-display font-bold text-sm bg-black text-white px-2 py-1 mb-4">2.0 SCENE RECONSTRUCTION (QR ACCESS)</h3>
                  <div className="flex justify-center gap-12 border border-black p-6">
                    <div className="flex flex-col items-center text-center">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=forensiq://case/047/vr" className="w-24 h-24 mb-2" alt="QR" />
                      <p className="text-[10px] font-bold">SCAN TO ENTER<br/>VR RECONSTRUCTION</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=forensiq://case/047/museum" className="w-24 h-24 mb-2" alt="QR" />
                      <p className="text-[10px] font-bold">SCAN TO ENTER<br/>TRAINING MUSEUM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 text-center text-[10px] border-t border-black pt-4">
                  PAGE 1 OF 8 • GENERATED BY AI FORENSIC SYSTEM v2.4
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
