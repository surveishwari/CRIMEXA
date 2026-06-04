import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── HIGH-FIDELITY HUMAN / GHOST FIGURE ───
const Human = ({ color = '#888', opacity = 1, isLaying = false }) => (
  <group rotation={isLaying ? [-Math.PI / 2, 0, Math.random()] : [0, 0, 0]} position={isLaying ? [0, 0.05, 0] : [0, 0, 0]}>
    <mesh position={[0, 1.65, 0]} castShadow><sphereGeometry args={[0.12, 20, 20]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[0, 1.5, 0]} castShadow><cylinderGeometry args={[0.04, 0.04, 0.06, 8]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[0, 1.25, 0]} castShadow><cylinderGeometry args={[0.18, 0.14, 0.5, 12]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[-0.25, 1.3, 0]} rotation={[0, 0, 0.15]} castShadow><cylinderGeometry args={[0.04, 0.035, 0.5, 8]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[0.25, 1.3, 0]} rotation={[0, 0, -0.15]} castShadow><cylinderGeometry args={[0.04, 0.035, 0.5, 8]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[-0.08, 0.55, 0]} castShadow><cylinderGeometry args={[0.065, 0.045, 0.8, 8]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[0.08, 0.55, 0]} castShadow><cylinderGeometry args={[0.065, 0.045, 0.8, 8]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[-0.08, 0.12, 0.04]} castShadow><boxGeometry args={[0.08, 0.06, 0.15]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
    <mesh position={[0.08, 0.12, 0.04]} castShadow><boxGeometry args={[0.08, 0.06, 0.15]} /><meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={opacity<1?0.8:0.1}/></mesh>
  </group>
);

// ─── ANIMATED GHOST FOR REWIND LAYER ───
const AnimatedGhost = ({ role, time }) => {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    const t = time;
    if (role === 'suspect') {
      if (t < 2) { ref.current.position.set(3, 0, -3.5); ref.current.rotation.y = -Math.PI / 2; }
      else if (t < 4) { const p = (t - 2) / 2; ref.current.position.set(3 - p * 2.5, 0, -3.5 + p * 3); ref.current.rotation.y = -Math.PI / 2 + p * 0.5; }
      else if (t < 5) { ref.current.position.set(0.5, 0, -0.5); }
      else if (t < 8) { ref.current.position.set(0.5, 0, -0.5); }
      else { const p = (t - 8) / 2; ref.current.position.set(0.5 + p * 2.5, 0, -0.5 - p * 3); ref.current.rotation.y = Math.PI / 4; }
    } else if (role === 'victim') {
      if (t < 5) { ref.current.position.set(-0.5, 0, -1); ref.current.rotation.z = 0; ref.current.position.y = 0; }
      else if (t < 6.5) { const p = (t - 5) / 1.5; ref.current.rotation.z = -(p * Math.PI / 2); ref.current.position.y = -p * 0.7; }
      else { ref.current.rotation.z = -Math.PI / 2; ref.current.position.set(-0.8, -0.7, -1); }
    }
  });

  return (
    <group ref={ref}>
      <Human color={role === 'suspect' ? "#0088ff" : "#ff3333"} opacity={0.4} />
      <Text position={[0, 2, 0]} fontSize={0.1} color={role === 'suspect' ? "#0088ff" : "#ff3333"}>
        {role.toUpperCase()}
      </Text>
    </group>
  );
};

// ─── WEAPON TRAJECTORY LINE ───
const WeaponTrajectory = ({ time }) => {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.visible = (time > 5 && time < 8);
  });
  
  return (
    <mesh ref={ref} position={[0, 1.4, -0.75]} rotation={[0, 0.15, 0]}>
      <cylinderGeometry args={[0.003, 0.003, 1.5]} />
      <meshBasicMaterial color="#ff3333" transparent opacity={0.6} />
    </mesh>
  );
};

// ─── INTERACTIVE FLOATING EVIDENCE MARKER ───
const InteractiveEvidenceMarker = ({ position, number, label, info, isInteractive, onClick, activeMarker }) => {
  const ref = useRef();
  useFrame((state) => {
    if (isInteractive && ref.current) {
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  const isActive = activeMarker === number;

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0} floatIntensity={isInteractive ? 1 : 0}>
        <group ref={ref} onClick={isInteractive ? () => onClick(number) : null} onPointerOver={() => {if(isInteractive) document.body.style.cursor='pointer'}} onPointerOut={() => {document.body.style.cursor='auto'}}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <coneGeometry args={[0.1, 0.2, 4]} />
            <meshStandardMaterial color="#ffcc00" emissive={isInteractive ? "#ffaa00" : "#000"} emissiveIntensity={isInteractive ? 0.8 : 0} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.12} color="#fff" outlineWidth={0.02} outlineColor="#000">{label}</Text>
          <Text position={[0, 0.1, 0]} fontSize={0.1} color="#ffaa00" outlineWidth={0.01} outlineColor="#000">#{number}</Text>
        </group>
      </Float>
      
      {/* Holographic Info Panel (Layer 3) */}
      {isActive && isInteractive && (
        <Html position={[0.3, 0.6, 0]} center>
          <div style={{ background: 'rgba(0, 30, 60, 0.85)', padding: '12px', borderRadius: '8px', border: '1px solid #00aaff', color: '#00ffcc', fontFamily: 'monospace', width: '220px', backdropFilter: 'blur(4px)', pointerEvents: 'none', boxShadow: '0 0 15px rgba(0, 170, 255, 0.4)' }}>
            <div style={{ color: '#fff', borderBottom: '1px solid #00aaff', marginBottom: '8px', paddingBottom: '4px', fontWeight: 'bold' }}>{label} ANALYSIS</div>
            <div dangerouslySetInnerHTML={{ __html: info }} />
          </div>
        </Html>
      )}
    </group>
  );
};

// ─── HIGH-FIDELITY LIVING ROOM ───
const CrimeRoom = () => {
  const woodColor = "#3d2b1f";
  const wallColor = "#2c3e50"; 
  const rugColor = "#5c4033";

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow><planeGeometry args={[12, 12]} /><meshStandardMaterial color="#1a1a1a" roughness={0.7} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow><planeGeometry args={[5, 4]} /><meshStandardMaterial color={rugColor} roughness={0.9} /></mesh>
      <mesh position={[0, 2, -4]} receiveShadow><boxGeometry args={[10, 4, 0.2]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow><boxGeometry args={[8, 4, 0.2]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
      
      {/* Staircase */}
      <group position={[-0.5, 0, -1.5]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-3.5, i * 0.2, -2 + i * 0.3]} castShadow receiveShadow><boxGeometry args={[1.5, 0.2, 0.3]} /><meshStandardMaterial color={woodColor} roughness={0.8} /></mesh>
        ))}
        <mesh position={[-2.8, 1.2, -1]} rotation={[-0.8, 0, 0]} castShadow><cylinderGeometry args={[0.05, 0.05, 3.5]} /><meshStandardMaterial color={woodColor} /></mesh>
      </group>

      {/* Door */}
      <group position={[3, 0, -3.9]}>
        <mesh position={[0, 1.25, 0]} receiveShadow><boxGeometry args={[1.5, 2.5, 0.1]} /><meshStandardMaterial color="#000" /></mesh>
        <mesh position={[-0.75, 1.25, 0.6]} rotation={[0, -1.2, 0]} castShadow><boxGeometry args={[1.5, 2.5, 0.05]} /><meshStandardMaterial color={woodColor} /></mesh>
      </group>

      {/* Dresser & Laptop */}
      <mesh position={[4, 0.6, 0]} castShadow><boxGeometry args={[1, 1.2, 2]} /><meshStandardMaterial color={woodColor} roughness={0.7} /></mesh>
      <group position={[2, 0.05, 1]} rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow><boxGeometry args={[0.4, 0.02, 0.3]} /><meshStandardMaterial color="#222" metalness={0.8} /></mesh>
        <mesh position={[0, 0.15, -0.15]} rotation={[0.5, 0, 0]} castShadow><boxGeometry args={[0.4, 0.3, 0.02]} /><meshStandardMaterial color="#111" emissive="#002244" emissiveIntensity={0.5} /></mesh>
      </group>

      {/* Chandelier */}
      <group position={[0, 3.5, 0]}>
        <mesh><cylinderGeometry args={[0.5, 0.1, 0.2]} /><meshStandardMaterial color="#fff" emissive="#ffaa00" emissiveIntensity={2} /></mesh>
        <pointLight intensity={10} color="#ffaa00" castShadow distance={10} shadow-mapSize={[2048, 2048]} />
      </group>
    </group>
  );
};

// ─── DYNAMIC CAMERA SYSTEM ───
const AnimatedWalkthroughCamera = () => {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.3;
    // Procedural "walking" path through the crime scene
    const x = Math.sin(t) * 2 + 0.5;
    const z = Math.cos(t * 0.8) * 2.5;
    const y = 1.6 + Math.sin(t * 4) * 0.05; // Head bob
    
    // Smoothly interpolate camera position
    state.camera.position.lerp({ x, y, z }, 0.05);
    
    // Slowly pan the look target to scan the room
    const lookX = Math.sin(t * 0.5);
    const lookZ = Math.cos(t * 0.6);
    state.camera.lookAt(lookX, 0.5, lookZ);
  });
  return null;
};

const DynamicCamera = ({ mode }) => {
  if (mode === 'Overview') {
    return <OrbitControls target={[0, 0, 0]} enablePan={true} enableZoom={true} minPolarAngle={0} maxPolarAngle={0.1} />;
  } else if (mode === 'Cinematic') {
    return <OrbitControls target={[0, 1, 0]} enablePan={false} enableZoom={true} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI / 2 - 0.1} />;
  } else {
    // Walkthrough (Actively moving video-like investigation)
    return <AnimatedWalkthroughCamera />;
  }
};

// ─── MAIN VR SCENE COMPONENT ───
const ForensicARScene = () => {
  let predictedCrime = 'Unknown';
  let caseInputs = {};
  try {
    const data = localStorage.getItem('forensiqResult');
    if (data) { const p = JSON.parse(data); predictedCrime = p.results.predicted_crime; caseInputs = p.inputs || {}; }
  } catch (e) {}

  const [layer, setLayer] = useState('Present'); // Present, Rewind, Evidence
  const [navMode, setNavMode] = useState('Walkthrough'); // Walkthrough, Overview, Cinematic
  const [activeMarker, setActiveMarker] = useState(null);
  
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Playback loop for Rewind Layer Timeline
  React.useEffect(() => {
    let interval;
    if (layer === 'Rewind' && isPlaying) {
      interval = setInterval(() => {
        setTime((prev) => (prev >= 10 ? 0 : prev + 0.05));
      }, 50); // Updates at 20fps
    }
    return () => clearInterval(interval);
  }, [layer, isPlaying]);

  return (
    <div style={{ display: 'flex', width: '100%', height: '800px', background: '#050505', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden', position: 'relative', fontFamily: 'monospace' }}>
      
      {/* LEFT: Real Crime Scene Photo (Split Screen Simulation) */}
      <div className="glass-panel" style={{ width: '30%', borderRight: '2px solid #00aaff', padding: '20px', display: 'flex', flexDirection: 'column', color: '#fff', position: 'relative', zIndex: 10 }}>
        <h3 className="glitch-text" style={{ color: '#00ffcc', borderBottom: '1px solid #00ffcc', paddingBottom: '10px' }}>CASE #{caseInputs.caseId || 'FX-90210'}</h3>
        <p style={{ color: '#00aaff', fontSize: '12px', marginTop: '10px' }}>OFFICER: DET. ANDERSON<br/>EVIDENCE COLLECTED: 3/5</p>
        
        <div style={{ flex: 1, border: '1px solid #0055ff', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,20,40,0.5)', borderRadius: '4px', boxShadow: 'inset 0 0 20px rgba(0, 170, 255, 0.2)' }}>
           <p style={{ color: '#00ffcc', textAlign: 'center', opacity: 0.7 }}>[OPTICAL SENSOR FEED]<br/>NO DIRECT FEED AVALIABLE</p>
        </div>

        {/* Navigation Mode Selector */}
        <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '6px', border: '1px solid #00aaff' }}>
          <div style={{ color: '#00ffcc', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>CAMERA TELEMETRY MODE</div>
          <select value={navMode} onChange={(e) => setNavMode(e.target.value)} className="sci-fi-input" style={{ width: '100%', padding: '10px', outline: 'none' }}>
            <option value="Walkthrough">Autopilot Walkthrough</option>
            <option value="Overview">Tactical Drone (Top-Down)</option>
            <option value="Cinematic">Courtroom Export (Orbit)</option>
          </select>
        </div>

        <button style={{ marginTop: '20px', padding: '15px', background: 'linear-gradient(90deg, #e63946, #ff4757)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 0 15px rgba(230, 57, 70, 0.5)' }} onClick={() => alert('VR headset mode requires @react-three/xr (not installed in this build).')}>
          [X] MOUNT VR HEADSET
        </button>
      </div>

      {/* RIGHT: VR Canvas & HUD */}
      <div style={{ width: '70%', position: 'relative' }}>
        <div className="ar-grid-bg"></div>
        
        {/* HUD OVERLAY */}
        <div style={{ position: 'absolute', top: 15, left: 15, zIndex: 10, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
           <h2 className="glitch-text" style={{ margin: 0, color: '#00ffcc' }}>UNREAL ENGINE 5 [HOLO-NET]</h2>
           <div style={{ color: '#00aaff', marginTop: '5px', fontSize: '14px', background: 'rgba(0,0,0,0.6)', padding: '5px 10px', borderRadius: '4px', display: 'inline-block', border: '1px solid #00aaff' }}>
              ACTIVE LAYER: <span style={{ color: layer === 'Rewind' ? '#00ffcc' : layer === 'Evidence' ? '#ffaa00' : '#fff', fontWeight: 'bold' }}>{layer.toUpperCase()}</span>
           </div>
        </div>

        {/* HUD: Layer Controls & Timeline */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          
          {layer === 'Rewind' && (
            <div className="glass-panel" style={{ width: '100%', padding: '15px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00ffcc', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>
                <span>NEURAL RECONSTRUCTION TIMELINE (T-{time.toFixed(1)}s)</span>
                <span style={{ color: '#ffaa00' }}>{time < 2 ? 'SCENE UNALTERED' : time < 5 ? 'ENTRY / ALTERCATION DETECTED' : time < 8 ? 'CRITICAL INCIDENT' : 'PERPETRATOR FLEEING'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button onClick={() => setIsPlaying(!isPlaying)} style={{ padding: '8px 25px', background: isPlaying ? '#e63946' : '#00ffcc', color: isPlaying ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', boxShadow: `0 0 10px ${isPlaying ? '#e63946' : '#00ffcc'}` }}>
                  {isPlaying ? '■ PAUSE' : '▶ PLAY SIMULATION'}
                </button>
                <input 
                  type="range" min="0" max="10" step="0.1" value={time} 
                  onChange={(e) => { setTime(parseFloat(e.target.value)); setIsPlaying(false); }}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#00ffcc', height: '6px' }}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '20px', background: 'rgba(0,10,20,0.8)', padding: '10px 20px', borderRadius: '50px', border: '1px solid #00aaff', backdropFilter: 'blur(10px)' }}>
            <button style={{ padding: '10px 25px', background: layer === 'Present' ? '#00aaff' : 'transparent', color: layer === 'Present' ? '#fff' : '#00aaff', border: layer === 'Present' ? 'none' : '1px solid #00aaff', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s' }} onClick={() => {setLayer('Present'); setActiveMarker(null);}}>1: PRESENT SCENE</button>
            <button style={{ padding: '10px 25px', background: layer === 'Rewind' ? '#00ffcc' : 'transparent', color: layer === 'Rewind' ? '#000' : '#00ffcc', border: layer === 'Rewind' ? 'none' : '1px solid #00ffcc', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s' }} onClick={() => {setLayer('Rewind'); setActiveMarker(null);}}>2: AI REWIND REPLAY</button>
            <button style={{ padding: '10px 25px', background: layer === 'Evidence' ? '#ffaa00' : 'transparent', color: layer === 'Evidence' ? '#000' : '#ffaa00', border: layer === 'Evidence' ? 'none' : '1px solid #ffaa00', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s' }} onClick={() => setLayer('Evidence')}>3: INTERACTIVE HUD</button>
          </div>
        </div>

        <Canvas shadows camera={{ position: navMode === 'Overview' ? [0, 8, 0] : [2, 1.5, 4], fov: 60 }}>
          <DynamicCamera mode={navMode} />
          <>
            {/* Cinematic Lighting & Dust */}
            <ambientLight intensity={0.1} />
            <Sparkles count={200} scale={10} size={2} speed={0.2} opacity={0.2} color="#ffeedd" />
            
            <CrimeRoom />

            {/* LAYER 1: PRESENT (Static evidence) */}
            {layer === 'Present' && predictedCrime === 'Homicide' && (
              <group>
                <mesh position={[-0.7, 0.01, -1]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.4, 32]} /><meshStandardMaterial color="#3a0000" roughness={0.1} metalness={0.2} transparent opacity={0.9} /></mesh>
                <InteractiveEvidenceMarker position={[-0.7, 0, -1]} number={1} label="VICTIM BLOOD" isInteractive={false} />
                <InteractiveEvidenceMarker position={[1, 0, 1.5]} number={2} label="LAPTOP" isInteractive={false} />
                {caseInputs.entryMethod && <InteractiveEvidenceMarker position={[3, 0, -3.9]} number={3} label="ENTRY POINT" isInteractive={false} />}
              </group>
            )}

            {/* LAYER 2: REWIND (Animated Ghosts) */}
            {layer === 'Rewind' && predictedCrime === 'Homicide' && (
              <group>
                <AnimatedGhost role="suspect" time={time} />
                <AnimatedGhost role="victim" time={time} />
                <WeaponTrajectory time={time} />
              </group>
            )}

            {/* LAYER 3: EVIDENCE (Interactive mode) */}
            {layer === 'Evidence' && predictedCrime === 'Homicide' && (
              <group>
                <InteractiveEvidenceMarker position={[-0.7, 0, -1]} number={1} label="DNA MATCH" info="Confidence: 99.2%<br/>Match: John Doe<br/>Status: Deceased" isInteractive={true} onClick={setActiveMarker} activeMarker={activeMarker} />
                <InteractiveEvidenceMarker position={[1, 0, 1.5]} number={2} label="DIGITAL FOOTPRINT" info="Last Login: 23:15<br/>IP Trace: Active<br/>Encrypted Drive: YES" isInteractive={true} onClick={setActiveMarker} activeMarker={activeMarker} />
                {caseInputs.entryMethod && <InteractiveEvidenceMarker position={[3, 0, -3.9]} number={3} label="FINGERPRINT ZONE" info="Confidence: 87.3%<br/>Matched to: Database Record<br/>Notes: Unlocked window" isInteractive={true} onClick={setActiveMarker} activeMarker={activeMarker} />}
              </group>
            )}

            {predictedCrime !== 'Homicide' && <Text position={[0, 2, 0]} color="#fff">NO HOMICIDE DETECTED FOR RECONSTRUCTION</Text>}
          </>
        </Canvas>
      </div>
    </div>
  );
};

export default ForensicARScene;
