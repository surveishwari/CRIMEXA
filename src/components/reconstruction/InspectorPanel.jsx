import React from 'react';

const InspectorPanel = ({ data, evidence, onClose }) => {
  return (
    <div className="w-[300px] h-full bg-[#050A0F] border-l border-cyan/20 flex flex-col z-20">
      <div className="p-4 border-b border-cyan/20 bg-[#0A1628]">
        <h2 className="font-display font-bold text-sm tracking-widest text-cyan">SCENE INSPECTOR</h2>
        <p className="text-[10px] font-mono text-muted">Analysis generated from YOLO detections</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        
        {/* General Info */}
        <div>
          <h3 className="text-[10px] font-bold text-white mb-2 pb-1 border-b border-white/10">ENVIRONMENT</h3>
          <div className="grid grid-cols-2 gap-y-2 text-[10px] font-mono">
            <span className="text-white/50">Location:</span><span className="text-white uppercase">{data?.scene_type || 'Unknown'}</span>
            <span className="text-white/50">Lighting:</span><span className="text-white uppercase">{data?.time || 'Unknown'}</span>
            <span className="text-white/50">Weapon:</span><span className="text-white uppercase">{data?.weapon_type || 'Unknown'}</span>
          </div>
        </div>

        {/* Evidence List */}
        <div>
          <h3 className="text-[10px] font-bold text-white mb-2 pb-1 border-b border-white/10">DETECTED EVIDENCE</h3>
          <div className="flex flex-col gap-2">
            {data?.evidence?.map((ev, i) => (
              <div 
                key={i} 
                className={`p-2 border rounded text-xs font-mono cursor-pointer transition-colors ${
                  evidence?.id === ev.id ? 'border-cyan bg-cyan/10 text-cyan' : 'border-white/10 text-white/70 hover:border-cyan/30'
                }`}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-bold">{ev.id} - {ev.type}</span>
                  <span>{ev.conf}%</span>
                </div>
                <p className="text-[9px] text-white/50 truncate">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Evidence Popup Panel */}
      {evidence && (
        <div className="absolute bottom-0 right-[300px] w-80 bg-[#0A1628] border border-cyan shadow-lg m-4 rounded overflow-hidden">
          <div className="bg-cyan text-black px-3 py-1 flex justify-between items-center text-xs font-bold font-mono">
            <span>{evidence.id} DETAILED VIEW</span>
            <button onClick={onClose} className="hover:text-white">✕</button>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <h4 className="text-sm font-bold text-white">{evidence.type}</h4>
            <p className="text-xs text-white/70">{evidence.desc}</p>
            <div className="mt-2 bg-black/50 p-2 border border-white/10 rounded">
              <span className="text-[10px] font-mono text-cyan">AI CONFIDENCE: {evidence.conf}%</span>
              <div className="w-full h-1 bg-white/10 mt-1"><div className="h-full bg-cyan" style={{ width: `${evidence.conf}%` }}></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectorPanel;
