import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NarrationOverlay({ actLabel, narrationText, isFirstPerson = false }) {
  const [visible, setVisible] = useState(true);

  // Re-trigger visibility whenever the narration changes
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4500); // auto-dismiss after 4.5 seconds to give plenty of reading time

    return () => clearTimeout(timer);
  }, [actLabel, narrationText]);

  return (
    <AnimatePresence>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between">
          
          {/* TOP LETTERBOX BAR - Hide in first-person mode for immersive visual walkthrough */}
          {!isFirstPerson ? (
            <motion.div 
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full bg-black/90 border-b border-cyan/15 h-[70px] flex items-center px-8"
            >
              <div className="font-mono text-cyan text-xs tracking-[0.25em] font-bold">
                RECONSTRUCTION ACT SEQUENCE // <span className="text-white">{actLabel}</span>
              </div>
            </motion.div>
          ) : (
            <div className="h-[70px]" />
          )}

          {/* BOTTOM NARRATION CONTAINER */}
          <div className="w-full flex justify-center pb-24">
            {isFirstPerson ? (
              // Minimal subtitle display for first-person mode
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-black/80 backdrop-blur-md px-6 py-3 rounded border border-white/10 max-w-xl text-center shadow-lg"
              >
                <p className="text-sm font-mono text-cyan/90 font-bold uppercase tracking-wider mb-1 text-center">
                  {actLabel}
                </p>
                <p className="text-sm text-white font-medium text-center leading-relaxed">
                  {narrationText}
                </p>
              </motion.div>
            ) : (
              // Large cinematic bottom letterbox block
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="fixed bottom-[120px] left-0 w-full bg-black/90 border-t border-cyan/15 h-[80px] flex items-center justify-center px-6"
              >
                <p className="text-base text-white text-center font-display font-medium max-w-3xl leading-relaxed">
                  {narrationText}
                </p>
              </motion.div>
            )}
          </div>
          
        </div>
      )}
    </AnimatePresence>
  );
}
