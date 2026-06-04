import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sidebar, Header } from './Dashboard';
import { useNavigate } from 'react-router-dom';

// --- Procedural Animated Human Figure ---
const SuspectActor = ({ position, rotation }) => {
  const material = new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.8 }); // Darker for suspect
  const armRef = useRef();

  useFrame(({ clock }) => {
    // Animate raising arm to shoot
    const time = clock.getElapsedTime() % 4; // 4 second loop
    if (time > 1 && time < 2) {
      // Raise arm
      armRef.current.rotation.x = THREE.MathUtils.lerp(armRef.current.rotation.x, -Math.PI / 2, 0.1);
    } else if (time >= 2 && time < 3) {
      // Hold position
    } else {
      // Lower arm
      armRef.current.rotation.x = THREE.MathUtils.lerp(armRef.current.rotation.x, 0.2, 0.1);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh material={material} position={[0, 1, 0]}><capsuleGeometry args={[0.25, 0.8, 4, 16]} /></mesh>
      <mesh material={material} position={[0, 1.7, 0]}><sphereGeometry args={[0.2, 16, 16]} /></mesh>
      {/* Left Arm (Raising to shoot) */}
      <group ref={armRef} position={[-0.35, 1.3, 0]}>
        <mesh material={material} position={[0, -0.4, 0]}><cylinderGeometry args={[0.08, 0.08, 0.9]} /></mesh>
        {/* Gun block */}
        <mesh position={[0, -0.9, 0.1]}><boxGeometry args={[0.05, 0.1, 0.2]} /><meshStandardMaterial color="black" /></mesh>
      </group>
      {/* Right Arm */}
      <mesh material={material} position={[0.4, 1.2, 0.2]} rotation={[-Math.PI/2, 0, -0.2]}><cylinderGeometry args={[0.08, 0.08, 0.9]} /></mesh>
      <mesh material={material} position={[-0.15, 0.1, 0]}><cylinderGeometry args={[0.1, 0.1, 1]} /></mesh>
      <mesh material={material} position={[0.15, 0.1, 0]}><cylinderGeometry args={[0.1, 0.1, 1]} /></mesh>
      
      <Html position={[0, 2.2, 0]} center>
        <div style={{ color: '#FF3B30', fontSize: '10px', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: '1px solid #FF3B30' }}>SUSPECT</div>
      </Html>
    </group>
  );
};

const VictimActor = ({ position, rotation }) => {
  const material = new THREE.MeshStandardMaterial({ color: '#A0AAB5', roughness: 0.6 });
  const bodyRef = useRef();
  
  useFrame(({ clock }) => {
    // Animate falling over
    const time = clock.getElapsedTime() % 4;
    if (time > 1.5 && time < 3) {
      // Fall down
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, -Math.PI / 2, 0.1);
      bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, -0.8, 0.1);
    } else if (time >= 3) {
      // Stay down
    } else {
      // Stand up (reset)
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, 0, 0.1);
      bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, 0, 0.1);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={bodyRef}>
        <mesh material={material} position={[0, 1, 0]}><capsuleGeometry args={[0.25, 0.8, 4, 16]} /></mesh>
        <mesh material={material} position={[0, 1.7, 0]}><sphereGeometry args={[0.2, 16, 16]} /></mesh>
        <mesh material={material} position={[-0.4, 1, 0]} rotation={[0, 0, 0.2]}><cylinderGeometry args={[0.08, 0.08, 0.9]} /></mesh>
        <mesh material={material} position={[0.4, 1, 0]} rotation={[0, 0, -0.2]}><cylinderGeometry args={[0.08, 0.08, 0.9]} /></mesh>
        <mesh material={material} position={[-0.15, 0.1, 0]}><cylinderGeometry args={[0.1, 0.1, 1]} /></mesh>
        <mesh material={material} position={[0.15, 0.1, 0]}><cylinderGeometry args={[0.1, 0.1, 1]} /></mesh>
      </group>
      
      <Html position={[0, 2.2, 0]} center>
        <div style={{ color: '#00E676', fontSize: '10px', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: '1px solid #00E676' }}>VICTIM</div>
      </Html>
    </group>
  );
};

// --- Detailed Room Environment ---
const Room = () => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#3d2a1d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.5, -6]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#e8decc" />
      </mesh>
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#e8decc" />
      </mesh>
      <mesh position={[3, 0.5, -4]} castShadow>
        <boxGeometry args={[4, 1, 1.5]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Animated Reconstruction */}
      <SuspectActor position={[1.5, 0, -2]} rotation={[0, -Math.PI / 4, 0]} />
      <VictimActor position={[-0.5, 0, -1]} rotation={[0, Math.PI / 4, 0]} />
    </group>
  );
};

const Marker = ({ id, position }) => (
  <group position={position}>
    <mesh position={[0, 0.1, 0]}><coneGeometry args={[0.1, 0.2, 4]} /><meshBasicMaterial color="#FFEB3B" /></mesh>
    <Html position={[0, 0.3, 0]} center><div style={{ background: '#FFEB3B', color: 'black', padding: '2px 6px', fontWeight: 'bold', fontSize: '12px' }}>{id}</div></Html>
  </group>
);

const VRScene = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="Scene Reconstruction" />
        
        <div className="p-6 h-full flex flex-col fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Step 4: Animated 3D Reconstruction</h2>
              <p className="text-sm text-muted">Reconstructing the event based on evidence and object detection (Suspect shooting Victim).</p>
            </div>
            <button onClick={() => navigate('/reports')} className="btn-primary">Generate PDF Documentation ➔</button>
          </div>
          
          <div className="flex gap-6 flex-1">
            
            {/* Left Panel: Evidence Detected */}
            <div className="card w-64 flex flex-col p-4 bg-black border-panel-border">
              <h3 className="text-xs font-bold tracking-widest text-primary mb-4">EVIDENCE MAPPING</h3>
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                <div className="p-3 bg-panel rounded border border-panel-border">
                  <p className="font-bold text-sm text-white">Suspect Positioning</p>
                  <p className="text-[10px] text-muted">Derived from trajectory analysis of casing</p>
                </div>
                <div className="p-3 bg-panel rounded border border-panel-border">
                  <p className="font-bold text-sm text-white">Victim Fall Angle</p>
                  <p className="text-[10px] text-muted">Derived from bloodstain patterns</p>
                </div>
                <div className="p-3 bg-panel rounded border border-panel-border">
                  <p className="font-bold text-sm text-danger animate-pulse">PLAYING ANIMATION LOOP</p>
                  <p className="text-[10px] text-muted">Real-time simulation running...</p>
                </div>
              </div>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 relative card overflow-hidden border border-primary-color">
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between">
                <div className="bg-black/80 px-4 py-2 rounded text-xs text-primary font-bold border border-primary-color flex items-center gap-4 w-96">
                  ANIMATION PLAYBACK ACTIVE...
                  <div className="progress-bar-bg w-full"><div className="progress-bar-fill w-full"></div></div>
                </div>
              </div>

              <Canvas camera={{ position: [0, 3, 6], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 4, 0]} intensity={1} castShadow />
                <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
                
                <Room />
                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
                
                <Marker id="1" position={[-0.5, 0, -0.5]} />
                <Marker id="2" position={[1.5, 0, -2]} />

                <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.1} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRScene;
