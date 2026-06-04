import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointerLockControls, Environment, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

import RoomGenerator from './RoomGenerator';
import EvidenceMarkers from './EvidenceMarkers';
import { Mannequin } from './BodyModel';
import WeaponModel from './WeaponModel';

const SuspectGhost = ({ path, phase }) => {
  const ghostRef = useRef();
  
  useFrame(() => {
    if (!path || path.length < 2 || !ghostRef.current) return;
    const totalSegments = path.length - 1;
    const progress = (phase / 100) * totalSegments;
    const currentIndex = Math.floor(progress);
    const nextIndex = Math.min(currentIndex + 1, totalSegments);
    const lerpFactor = progress - currentIndex;
    
    const p1 = new THREE.Vector3(...path[currentIndex]);
    const p2 = new THREE.Vector3(...path[nextIndex]);
    
    ghostRef.current.position.lerpVectors(p1, p2, lerpFactor);
  });

  return (
    <group ref={ghostRef}>
      {/* Detailed Suspect Ghost using Mannequin component */}
      <Mannequin pose="walking" color="#00ff88" isGhost={true} position={[0, -1, 0]} />
    </group>
  );
};

const SceneContent = ({ data, cameraMode, timelinePhase, onSelectEvidence }) => {
  const isNight = data.time === 'night';

  return (
    <group>
      {/* CINEMATIC HDRI LIGHTING */}
      <Environment preset={isNight ? 'night' : 'city'} environmentIntensity={isNight ? 0.2 : 0.8} />
      
      {/* Dramatic SpotLight for Flashlight Effect */}
      {isNight && (
        <spotLight position={[0, 5, 2]} angle={0.6} penumbra={0.5} intensity={50} color="#88ccff" castShadow />
      )}
      {!isNight && (
        <directionalLight position={[5, 10, 5]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
      )}

      {/* Bright Analytical Fog */}
      <fog attach="fog" args={['#e2e8f0', 10, 30]} />

      {/* Realistic Ambient Occlusion Shadows on the floor */}
      <ContactShadows resolution={1024} scale={20} blur={2.5} opacity={0.6} far={10} color="#000000" position={[0, 0.001, 0]} />

      {/* Dust particles in the air for realism */}
      <Sparkles count={200} scale={10} size={1.5} speed={0.2} opacity={0.2} color="#ffffff" />

      {/* Environment Generator */}
      <RoomGenerator type={data.scene_type} />

      {/* Static Scene Elements */}
      <WeaponModel type={data.weapon_type} position={data.evidence?.find(e => e.type === 'Weapon')?.pos || [0,0,0]} />
      
      {/* Detailed Victim Mannequin - visibility depends on timeline phase */}
      {timelinePhase > 50 && (
        <Mannequin 
          pose="lying_dead" 
          color="#4a5568" 
          position={[-1, 0, -2]} 
        />
      )}

      {/* Blood Splatter */}
      {data.blood_evidence === 'yes' && timelinePhase > 50 && (
        <mesh position={[-0.5, 0.01, -1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.5, 2]} />
          <meshBasicMaterial color="#8b0000" transparent opacity={0.7} depthWrite={false} />
        </mesh>
      )}

      {/* Interactive Evidence Markers */}
      <EvidenceMarkers evidenceList={data.evidence} onSelect={onSelectEvidence} />

      {/* Animated Suspect Silhouette */}
      {data.suspect_path && (
        <SuspectGhost path={data.suspect_path} phase={timelinePhase} />
      )}
    </group>
  );
};

const SceneCanvas = ({ data, cameraMode, timelinePhase, onSelectEvidence, isAR }) => {
  const videoRef = useRef(null);

  // Initialize AR Webcam Feed
  React.useEffect(() => {
    if (isAR && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Webcam access denied:", err));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, [isAR]);

  return (
    <div className={`absolute inset-0 ${isAR ? 'bg-transparent' : 'bg-[#e2e8f0]'}`}>
      {/* AR Live Webcam Feed */}
      {isAR && (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* R3F Canvas - Transparent in AR mode */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          shadows 
          camera={{ position: [0, 5, 8], fov: 60 }}
          gl={{ alpha: true, preserveDrawingBuffer: true }}
          id="reconstruction-canvas"
        >
          {/* Hide fog and environment background if in AR mode to let webcam show through */}
          {!isAR && <color attach="background" args={['#e2e8f0']} />}
          
          <SceneContent 
            data={data} 
            cameraMode={cameraMode} 
            timelinePhase={timelinePhase} 
            onSelectEvidence={onSelectEvidence}
            isAR={isAR}
          />

          {/* Camera Controls */}
          {cameraMode === 'first_person' && !isAR ? (
            <PointerLockControls />
          ) : cameraMode === 'top_down' ? (
            <OrbitControls 
              enableRotate={false} 
              enablePan={true}
              minPolarAngle={0} 
              maxPolarAngle={0} 
              target={[0, 0, 0]} 
            />
          ) : (
            <OrbitControls 
              makeDefault
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2 - 0.1}
              target={[0, 1, 0]}
            />
          )}
        </Canvas>
      </div>
      
      {/* Crosshair for first person */}
      {cameraMode === 'first_person' && !isAR && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan rounded-full shadow-[0_0_10px_#00d4ff] pointer-events-none z-20"></div>
      )}
    </div>
  );
};

export default SceneCanvas;
