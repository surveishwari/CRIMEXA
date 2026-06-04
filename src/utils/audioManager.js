// ═══════════════════════════════════════════
// PROCEDURAL SOUND GENERATOR / AUDIO MANAGER
// ═══════════════════════════════════════════

let audioCtx = null;
let ambientNodes = {}; // stores active looping sounds

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Helper to create white noise
function createNoiseBuffer(ctx, duration = 1.0) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export const AudioManager = {
  // Try playing MP3, or fall back to synthesis
  play: (file, volume = 0.5) => {
    try {
      const audio = new Audio('/sounds/' + file);
      audio.volume = volume;
      audio.play().catch(() => {
        // Fallback to synth if file doesn't exist
        const effectName = file.replace('.mp3', '');
        AudioManager.synthesize(effectName, volume);
      });
    } catch (e) {
      const effectName = file.replace('.mp3', '');
      AudioManager.synthesize(effectName, volume);
    }
  },

  // Start looping ambient sounds
  startAmbient: (type, volume = 0.2) => {
    try {
      const ctx = getAudioContext();
      if (ambientNodes[type]) return; // already playing

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.connect(ctx.destination);

      if (type === 'indoor') {
        // Deep ambient rumble (hum)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 hum
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 harmonic
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        
        osc1.start();
        osc2.start();

        // Subtle random crickets (filtered noise impulses)
        let cricketsInterval = setInterval(() => {
          if (!ambientNodes[type]) {
            clearInterval(cricketsInterval);
            return;
          }
          if (Math.random() > 0.4) {
            // Cricket chirp
            const chirpGain = ctx.createGain();
            chirpGain.gain.setValueAtTime(0, ctx.currentTime);
            chirpGain.gain.linearRampToValueAtTime(0.005 * volume, ctx.currentTime + 0.05);
            chirpGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
            
            const chirpOsc = ctx.createOscillator();
            chirpOsc.type = 'sine';
            chirpOsc.frequency.setValueAtTime(3200 + Math.random() * 400, ctx.currentTime);
            
            // LFO for chirp rattle
            const chirpLfo = ctx.createOscillator();
            chirpLfo.frequency.setValueAtTime(45, ctx.currentTime);
            const lfoGain = ctx.createGain();
            lfoGain.gain.setValueAtTime(150, ctx.currentTime);
            
            chirpLfo.connect(lfoGain);
            lfoGain.connect(chirpOsc.frequency);
            
            chirpOsc.connect(chirpGain);
            chirpGain.connect(ctx.destination);
            
            chirpLfo.start();
            chirpOsc.start();
            
            chirpLfo.stop(ctx.currentTime + 0.35);
            chirpOsc.stop(ctx.currentTime + 0.35);
          }
        }, 1000);

        ambientNodes[type] = {
          stop: () => {
            clearInterval(cricketsInterval);
            osc1.stop();
            osc2.stop();
            gainNode.disconnect();
          }
        };
      } else if (type === 'police' || type === 'radio_static') {
        // Police Radio static (filtered white noise + beep)
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = createNoiseBuffer(ctx, 3.0);
        noiseNode.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        noiseNode.connect(filter);
        filter.connect(gainNode);
        noiseNode.start();

        // Random dispatch call beeps
        let dispatchInterval = setInterval(() => {
          if (!ambientNodes[type]) {
            clearInterval(dispatchInterval);
            return;
          }
          if (Math.random() > 0.7) {
            // Radio squelch beep
            const beepOsc = ctx.createOscillator();
            const beepGain = ctx.createGain();
            beepOsc.type = 'sine';
            beepOsc.frequency.setValueAtTime(880, ctx.currentTime);
            
            beepGain.gain.setValueAtTime(0, ctx.currentTime);
            beepGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
            beepGain.gain.setValueAtTime(0.05, ctx.currentTime + 0.2);
            beepGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
            
            beepOsc.connect(beepGain);
            beepGain.connect(ctx.destination);
            
            beepOsc.start();
            beepOsc.stop(ctx.currentTime + 0.4);
          }
        }, 3000);

        ambientNodes[type] = {
          stop: () => {
            clearInterval(dispatchInterval);
            noiseNode.stop();
            gainNode.disconnect();
          }
        };
      }
    } catch (e) {
      console.warn('Failed to start ambient loop:', e);
    }
  },

  // Stop looping ambient sounds
  stopAmbient: (type) => {
    if (ambientNodes[type]) {
      try {
        ambientNodes[type].stop();
      } catch (e) {}
      delete ambientNodes[type];
    }
  },

  // Synthesize custom sound effects procedurally using Web Audio API
  synthesize: (effect, volume = 0.5) => {
    try {
      const ctx = getAudioContext();
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.connect(ctx.destination);

      if (effect === 'door_creak' || effect === 'door-creak') {
        // Pitch swept oscillator modulated by LFO to simulate squeak
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        
        // Start frequency
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(320, ctx.currentTime + 1.2);
        
        // Filter to make it sound muffled/woody
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.2);

        // Amplitude envelope for door creak
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3 * volume, ctx.currentTime + 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(filter);
        filter.connect(gainNode);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } 
      else if (effect === 'body_fall' || effect === 'body-fall' || effect === 'thud') {
        // Deep low boom for thud
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.8);

        // Noise body representing impact rustle
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer(ctx, 0.4);
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(150, ctx.currentTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2 * volume, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        // Envelope for deep rumble
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gainNode);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        osc.start();
        noise.start();
        
        osc.stop(ctx.currentTime + 0.8);
        noise.stop(ctx.currentTime + 0.8);
      } 
      else if (effect === 'glass_break' || effect === 'glass-break' || effect === 'window_break') {
        // High frequency noise bursts and sine bells
        gainNode.gain.setValueAtTime(volume * 0.8, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

        // High pass filtered white noise
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer(ctx, 0.9);
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(4000, ctx.currentTime);

        noise.connect(noiseFilter);
        noiseFilter.connect(gainNode);
        noise.start();

        // 3 Glass chime frequencies
        const frequencies = [2300, 3100, 4200];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          chimeGain.gain.setValueAtTime(0, ctx.currentTime);
          chimeGain.gain.linearRampToValueAtTime(0.15 * volume, ctx.currentTime + 0.02 * idx);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4 + idx * 0.1);
          
          osc.connect(chimeGain);
          chimeGain.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + 1.0);
        });
      }
      else if (effect === 'item_taken' || effect === 'weapon_highlight') {
        // High pitch digital sonar beep (positive ping)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(988, ctx.currentTime); // B5
        osc.frequency.exponentialRampToValueAtTime(1976, ctx.currentTime + 0.35); // B6

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2 * volume, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        osc.connect(gainNode);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn('Failed to synthesize sound effect:', e);
    }
  }
};
