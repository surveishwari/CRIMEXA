import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 z-50 bg-[#050A0F] flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-cyan/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-cyan rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cyan font-mono text-xs font-bold">R3F</span>
        </div>
      </div>
      <div className="text-center animate-pulse">
        <h2 className="text-sm font-display font-bold tracking-[0.2em] text-white mb-2">GENERATING 3D ENVIRONMENT</h2>
        <p className="text-[10px] font-mono text-cyan/70">Parsing YOLOv8 coordinates & initializing WebGL textures...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
