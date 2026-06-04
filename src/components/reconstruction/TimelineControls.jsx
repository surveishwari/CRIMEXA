import React, { useState, useRef } from 'react';

const TimelineControls = ({ phase, setPhase }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const generateVideo = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      alert("Canvas not found!");
      return;
    }

    setIsRecording(true);
    setPhase(0); // Reset timeline to start
    chunksRef.current = [];

    // Capture Canvas Stream at 30 FPS
    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Forensiq_Reconstruction_Video.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      setIsRecording(false);
    };

    mediaRecorder.start();

    // Animate Timeline from 0 to 100 over 5 seconds
    let currentPhase = 0;
    const interval = setInterval(() => {
      currentPhase += 1;
      setPhase(currentPhase);
      
      if (currentPhase >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          mediaRecorder.stop();
        }, 500); // small delay to capture the final frame
      }
    }, 50); // 50ms * 100 = 5000ms = 5 seconds
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl z-10">
      <div className="bg-[#0A1628]/90 backdrop-blur border border-cyan/30 p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-[10px] font-mono font-bold text-cyan">SCENE REPLAY TIMELINE</h4>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/50">{phase}%</span>
            <button 
              onClick={generateVideo}
              disabled={isRecording}
              className={`text-[9px] font-mono px-2 py-1 rounded transition-colors ${
                isRecording ? 'bg-red text-white animate-pulse' : 'bg-cyan text-black hover:bg-cyan-bright font-bold'
              }`}
            >
              {isRecording ? 'RECORDING...' : 'GENERATE VIDEO'}
            </button>
          </div>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={phase} 
          onChange={(e) => !isRecording && setPhase(parseInt(e.target.value))}
          disabled={isRecording}
          className="w-full h-1 bg-cyan/20 rounded-lg appearance-none cursor-pointer accent-cyan"
        />
        
        <div className="flex justify-between mt-2 text-[9px] font-mono text-white/50">
          <span>0: ENTRY</span>
          <span>50: CONFRONTATION</span>
          <span>100: EXIT</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineControls;
