import React, { useEffect, useRef, useState } from 'react';
import { useReconstructionStore, useCrimeStore } from '../../store/reconstructionStore';
import { CRIME_TIMELINES } from '../../data/crimeTimelines';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, FastForward } from 'lucide-react';

export default function TimelineController() {
  const { 
    currentAct, 
    isPlaying, 
    progress, 
    playbackSpeed, 
    setAct, 
    setIsPlaying, 
    setProgress, 
    setSpeed 
  } = useReconstructionStore();

  const { predictedCrime } = useCrimeStore();
  
  // Map crime type (HOMICIDE -> MURDER, ROBBERY -> THEFT, ASSAULT -> ASSAULT)
  const mappedCrime = predictedCrime === 'HOMICIDE' ? 'MURDER' : 
                      predictedCrime === 'ROBBERY' ? 'THEFT' : 
                      predictedCrime;
                      
  const timeline = CRIME_TIMELINES[mappedCrime] || CRIME_TIMELINES.MURDER;
  const duration = timeline.duration;
  const acts = timeline.acts;

  const timerRef = useRef();
  const lastTimeRef = useRef();

  // Handle Playback Progress
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      
      const tick = (now) => {
        const delta = (now - lastTimeRef.current) / 1000; // seconds
        lastTimeRef.current = now;

        const currentSec = (progress / 100) * duration;
        const nextSec = currentSec + delta * playbackSpeed;
        const nextProgress = Math.min((nextSec / duration) * 100, 100);

        setProgress(nextProgress);

        // Calculate current act index based on nextSec
        let activeActIndex = 0;
        for (let i = acts.length - 1; i >= 0; i--) {
          if (nextSec >= acts[i].time) {
            activeActIndex = i;
            break;
          }
        }
        
        if (activeActIndex !== currentAct) {
          setAct(activeActIndex);
        }

        if (nextProgress >= 100) {
          setIsPlaying(false);
        } else {
          timerRef.current = requestAnimationFrame(tick);
        }
      };

      timerRef.current = requestAnimationFrame(tick);
    } else {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isPlaying, progress, playbackSpeed, duration, currentAct, acts, setAct, setProgress, setIsPlaying]);

  // Jump to specific act
  const handleActClick = (index) => {
    const actTime = acts[index].time;
    const newProgress = (actTime / duration) * 100;
    setProgress(newProgress);
    setAct(index);
  };

  // Play / Pause toggle
  const handlePlayPause = () => {
    // If progress is at 100%, reset to 0 first
    if (progress >= 100) {
      setProgress(0);
      setAct(0);
    }
    setIsPlaying(!isPlaying);
  };

  // Reset/Rewind to beginning
  const handleReset = () => {
    setProgress(0);
    setAct(0);
    setIsPlaying(false);
  };

  // Previous Act
  const handlePrevAct = () => {
    const nextIdx = Math.max(0, currentAct - 1);
    handleActClick(nextIdx);
  };

  // Next Act
  const handleNextAct = () => {
    const nextIdx = Math.min(acts.length - 1, currentAct + 1);
    handleActClick(nextIdx);
  };

  // Handle progress bar slider drag
  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    const newSec = (newProgress / 100) * duration;
    
    // Find act matching this time
    let activeActIndex = 0;
    for (let i = acts.length - 1; i >= 0; i--) {
      if (newSec >= acts[i].time) {
        activeActIndex = i;
        break;
      }
    }
    
    setProgress(newProgress);
    setAct(activeActIndex);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 w-full z-50 flex flex-col justify-end px-6 pb-4"
      style={{
        background: 'linear-gradient(to top, rgba(3, 8, 18, 0.98) 80%, rgba(3, 8, 18, 0.7) 100%)',
        borderTop: '1px solid rgba(0, 240, 255, 0.25)',
        backdropFilter: 'blur(16px)',
        height: '135px'
      }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-3">
        {/* ACT TABS */}
        <div className="flex justify-between items-center w-full overflow-x-auto gap-2 py-1 scrollbar-none">
          {acts.map((act, idx) => {
            const isActive = idx === currentAct;
            return (
              <button
                key={idx}
                onClick={() => handleActClick(idx)}
                className={`flex-1 min-w-[120px] text-center py-1.5 px-3 rounded font-mono text-[10px] border tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'bg-cyan/15 text-cyan border-cyan shadow-[0_0_10px_rgba(0,229,255,0.25)]' 
                    : 'bg-transparent text-muted border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="font-bold">{act.label.split(' — ')[0]}</div>
                <div className="opacity-80 truncate text-[9px]">{act.label.split(' — ')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-mono text-muted w-8 text-right">
            {((progress / 100) * duration).toFixed(1)}s
          </span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="flex-grow h-1.5 rounded-full bg-white/10 outline-none appearance-none cursor-pointer accent-cyan select-none"
            style={{
              background: `linear-gradient(to right, #00e5ff 0%, #00e5ff ${progress}%, rgba(255,255,255,0.1) ${progress}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          <span className="text-[10px] font-mono text-muted w-8">
            {duration.toFixed(0)}s
          </span>
        </div>

        {/* PLAYBACK CONTROLS */}
        <div className="flex items-center justify-between w-full">
          {/* SPEED CONTROLS */}
          <div className="flex items-center gap-1.5">
            {[0.5, 1, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => setSpeed(speed)}
                className={`w-10 py-1 rounded text-[9px] font-mono font-bold tracking-wide border transition-all ${
                  playbackSpeed === speed
                    ? 'bg-cyan text-black border-cyan'
                    : 'bg-white/5 text-muted border-white/5 hover:border-white/20'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* MAIN TRANSPORT CONTROLS */}
          <div className="flex items-center gap-4">
            {/* Reset / Rewind */}
            <button 
              onClick={handleReset}
              className="p-2 rounded-full text-muted hover:text-white hover:bg-white/5 transition-all"
              title="Reset Timeline"
            >
              <RotateCcw size={16} />
            </button>

            {/* Previous Act */}
            <button 
              onClick={handlePrevAct}
              disabled={currentAct === 0}
              className="p-2 rounded-full text-muted hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Previous Act"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Play / Pause */}
            <button 
              onClick={handlePlayPause}
              className="p-3 bg-cyan text-black rounded-full hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>

            {/* Next Act */}
            <button 
              onClick={handleNextAct}
              disabled={currentAct === acts.length - 1}
              className="p-2 rounded-full text-muted hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Next Act"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* CRIME TYPE IDENTIFICATION */}
          <div className="text-right hidden sm:block">
            <span className="text-[9px] font-mono text-cyan/70 tracking-widest block uppercase font-bold">
              {timeline.title}
            </span>
            <span className="text-[8px] font-mono text-muted block uppercase">
              Environment: {timeline.environment.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
