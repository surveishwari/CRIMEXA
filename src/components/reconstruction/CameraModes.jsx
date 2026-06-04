import React from 'react';

const CameraModes = ({ active, onChange }) => {
  const modes = [
    { id: 'orbit', label: 'ORBIT CAM', icon: '🔄' },
    { id: 'first_person', label: 'FIRST PERSON', icon: '🚶' },
    { id: 'top_down', label: 'TOP DOWN MAP', icon: '🗺️' }
  ];

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
      <div className="bg-[#0A1628]/90 backdrop-blur border border-cyan/30 p-2 rounded flex flex-col gap-1">
        <h4 className="text-[9px] font-mono text-muted mb-1 px-1">VIEW MODES</h4>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded transition-colors ${
              active === m.id ? 'bg-cyan text-black font-bold' : 'text-white hover:bg-cyan/10'
            }`}
          >
            <span>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>
      {active === 'first_person' && (
        <div className="bg-black/50 border border-white/10 px-3 py-2 rounded text-[10px] font-mono text-white/70">
          Click screen to lock pointer. Use W,A,S,D to move.
        </div>
      )}
    </div>
  );
};

export default CameraModes;
