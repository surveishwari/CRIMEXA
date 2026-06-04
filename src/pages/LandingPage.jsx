import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const SimpleScene = () => {
  return (
    <group position={[0, -1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[10, 10]} /><meshStandardMaterial color="#0A1628" roughness={0.8} /></mesh>
      <mesh position={[0, 1.5, -3]} receiveShadow><boxGeometry args={[6, 3, 0.2]} /><meshStandardMaterial color="#0D1F38" /></mesh>
      <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#FF2D55" wireframe /></mesh>
    </group>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ cases: 0, accuracy: 0, models: 0 });

  useEffect(() => {
    // Count up animation
    let c = 0;
    const interval = setInterval(() => {
      c += 50;
      if (c <= 12847) setStats({ cases: c, accuracy: Math.min(94.2, (c/12847)*94.2), models: Math.min(7, Math.floor((c/12847)*7)) });
      else clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[rgba(5,10,15,0.8)] backdrop-blur border-b border-border z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span className="font-display font-bold tracking-widest text-lg text-text-primary glitch" data-text="CRIMEVR RECON">CRIMEVR RECON</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono font-bold tracking-widest text-muted">
          <a href="#" className="hover:text-cyan transition-colors">FEATURES</a>
          <a href="#" className="hover:text-cyan transition-colors">HOW IT WORKS</a>
          <a href="#" className="hover:text-cyan transition-colors">MUSEUM</a>
        </div>
        <div className="flex gap-4">
          <button className="btn-outline font-xs" onClick={() => navigate('/login')}>LOGIN</button>
          <button className="btn-primary font-xs py-2 px-4 text-xs" onClick={() => navigate('/register')}>REGISTER</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-16">
        
        {/* Background R3F Canvas */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
            <ambientLight intensity={0.2} color="#00D4FF" />
            <pointLight position={[0, 4, 0]} intensity={1.5} color="#FFB800" />
            <SimpleScene />
            <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
          </Canvas>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="border border-red bg-red/10 text-red text-[10px] font-mono font-bold px-3 py-1 mb-6 tracking-widest">
            CLASSIFIED // LAW ENFORCEMENT ONLY
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-2 glitch" data-text="RECONSTRUCT THE CRIME">RECONSTRUCT THE CRIME</h1>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 text-cyan glitch" data-text="BEFORE YOUR EYES">BEFORE YOUR EYES</h1>
          
          <p className="text-lg md:text-xl font-mono text-muted mb-10 typewriter">
            AI-Powered · VR-Immersive · Forensically Accurate
          </p>
          
          <div className="flex gap-6 mb-16">
            <button className="btn-primary py-4 px-8 text-base" onClick={() => navigate('/login')}>⬡ ENTER SYSTEM</button>
            <button className="btn-outline py-4 px-8 text-base bg-[rgba(13,31,56,0.5)] backdrop-blur">▶ WATCH DEMO</button>
          </div>

          <div className="flex gap-8 md:gap-16 justify-center text-center font-mono pt-8 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-cyan mb-1">{stats.cases.toLocaleString()}</div>
              <div className="text-[10px] text-muted tracking-widest">CASES ANALYZED</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green mb-1">{stats.accuracy.toFixed(1)}%</div>
              <div className="text-[10px] text-muted tracking-widest">PREDICTION ACCURACY</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber mb-1">{stats.models}</div>
              <div className="text-[10px] text-muted tracking-widest">ML MODELS ACTIVE</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red mb-1">3D</div>
              <div className="text-[10px] text-muted tracking-widest">VR RECONSTRUCTION</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <div className="text-3xl mb-4">🥽</div>
            <h3 className="font-display font-bold text-lg mb-2 text-cyan">VR Walkthrough</h3>
            <p className="text-sm font-mono text-muted">Step directly into the crime scene. Explore generated 3D environments based on actual evidence parameters.</p>
          </div>
          <div className="card p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="font-display font-bold text-lg mb-2 text-cyan">ML Prediction</h3>
            <p className="text-sm font-mono text-muted">7 parallel Machine Learning models predict crime type, risk, arrest probability, and anomaly scoring.</p>
          </div>
          <div className="card p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <div className="text-3xl mb-4">👻</div>
            <h3 className="font-display font-bold text-lg mb-2 text-cyan">Ghost Replay</h3>
            <p className="text-sm font-mono text-muted">Watch translucent actors physically reconstruct the exact sequence of events derived from blood splatter and ballistics.</p>
          </div>
          <div className="card p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <div className="text-3xl mb-4">📤</div>
            <h3 className="font-display font-bold text-lg mb-2 text-cyan">Evidence Vault</h3>
            <p className="text-sm font-mono text-muted">Secure, immutable ledger of all case files, digitally hashed via SHA-256 with robust Chain of Custody tracking.</p>
          </div>
          <div className="card p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="font-display font-bold text-lg mb-2 text-cyan">PDF Reports</h3>
            <p className="text-sm font-mono text-muted">One-click generation of court-ready PDF dossiers, automatically embedding 3D scene captures and ML graphs.</p>
          </div>
          <div className="card p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <div className="text-3xl mb-4">🏛️</div>
            <h3 className="font-display font-bold text-lg mb-2 text-cyan">Virtual Museum</h3>
            <p className="text-sm font-mono text-muted">A dedicated training simulator for new officers to study historical crime patterns in interactive WebAR.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative z-10 border-t border-border">
        <h2 className="text-2xl font-display font-bold text-center mb-16 tracking-widest text-cyan">STANDARD OPERATING PROCEDURE</h2>
        
        <div className="flex justify-between items-center relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -z-10 border-dashed border-t-2"></div>
          
          {['1. CASE INFO', '2. UPLOAD', '3. SCENE PHOTOS', '4. PREDICTION', '5. RECONSTRUCTION', '6. REPORT'].map((step, i) => (
            <div key={i} className="flex flex-col items-center bg-bg-primary px-4">
              <div className="w-12 h-12 rounded-full border-2 border-cyan bg-bg-card flex items-center justify-center font-display font-bold text-lg shadow-[0_0_15px_rgba(0,212,255,0.5)] mb-4">
                {i + 1}
              </div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-muted whitespace-nowrap">{step.split(' ')[1] || step}</p>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .typewriter {
          overflow: hidden;
          border-right: .15em solid var(--cyan);
          white-space: nowrap;
          margin: 0 auto;
          letter-spacing: .15em;
          animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
        }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: var(--cyan); } }
      `}} />
    </div>
  );
};

export default LandingPage;
