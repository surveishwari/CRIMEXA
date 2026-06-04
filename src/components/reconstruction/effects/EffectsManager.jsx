import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ═══════════════════════════════════════════
// BLOOD SPREAD EFFECT
// ═══════════════════════════════════════════
export function BloodSpreadEffect({ active = false, position = [0, 0.01, 0] }) {
  const poolRef = useRef();
  const splattersRef = useRef([]);

  useEffect(() => {
    if (!poolRef.current) return;
    if (active) {
      // Animate blood pool scale
      gsap.fromTo(poolRef.current.scale, 
        { x: 0.01, y: 0.01, z: 0.01 },
        { x: 1.2, y: 1.0, z: 1.2, duration: 2.0, ease: "power2.out" }
      );

      // Animate radiating splatters
      splattersRef.current.forEach((splatter, idx) => {
        if (!splatter) return;
        const angle = (idx / 6) * Math.PI * 2;
        const targetDist = 0.5 + Math.random() * 0.4;
        const tx = Math.cos(angle) * targetDist;
        const tz = Math.sin(angle) * targetDist;
        
        splatter.position.set(0, 0, 0);
        splatter.scale.set(0.01, 0.01, 0.01);
        
        gsap.to(splatter.position, {
          x: tx,
          z: tz,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.2
        });

        gsap.to(splatter.scale, {
          x: 0.3 + Math.random() * 0.3,
          y: 0.01,
          z: 0.3 + Math.random() * 0.3,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2
        });
      });
    } else {
      gsap.set(poolRef.current.scale, { x: 0.01, y: 0.01, z: 0.01 });
      splattersRef.current.forEach((splatter) => {
        if (splatter) {
          splatter.position.set(0, 0, 0);
          splatter.scale.set(0.01, 0.01, 0.01);
        }
      });
    }
  }, [active]);

  return (
    <group position={position}>
      {/* Central Blood Pool */}
      <mesh ref={poolRef} rotation-x={-Math.PI / 2} castShadow={false} receiveShadow>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial 
          color="#8B0000" 
          roughness={0.1} // glossy wet look
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Radiating Splatter Dots */}
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <mesh 
          key={idx}
          ref={el => splattersRef.current[idx] = el}
          rotation-x={-Math.PI / 2}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial 
            color="#8B0000" 
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════
// WEAPON HIGHLIGHT EFFECT
// ═══════════════════════════════════════════
export function WeaponHighlightEffect({ active = false, position = [2, 0.05, -2] }) {
  const lightRef = useRef();
  const ringRef = useRef();

  useEffect(() => {
    if (!lightRef.current || !ringRef.current) return;
    if (active) {
      // Pulse light intensity
      gsap.fromTo(lightRef.current,
        { intensity: 0 },
        { intensity: 3, duration: 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );
      
      // Pulse ring scale
      gsap.fromTo(ringRef.current.scale,
        { x: 0.8, y: 0.8, z: 0.8 },
        { x: 1.4, y: 1.4, z: 1.4, duration: 1.0, repeat: -1, ease: "sine.out" }
      );
      
      // Fade ring opacity
      gsap.fromTo(ringRef.current.material,
        { opacity: 0.8 },
        { opacity: 0, duration: 1.0, repeat: -1, ease: "sine.out" }
      );
    } else {
      lightRef.current.intensity = 0;
      ringRef.current.scale.set(0.01, 0.01, 0.01);
      ringRef.current.material.opacity = 0;
    }
  }, [active]);

  return (
    <group position={position}>
      {/* Pulsing Orange Light */}
      <pointLight 
        ref={lightRef} 
        color="#FF3D00" 
        distance={3} 
        decay={2} 
        intensity={0}
      />
      
      {/* Highlight ring on floor */}
      <mesh ref={ringRef} rotation-x={-Math.PI / 2} position={[0, -0.04, 0]}>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshBasicMaterial color="#FF3D00" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ═══════════════════════════════════════════
// ESCAPE PATH EFFECT
// ═══════════════════════════════════════════
export function EscapePathEffect({ active = false, pathPoints = [] }) {
  const dotRef = useRef();
  const [percent, setPercent] = useState(0);

  // Animate tracer dot along path points
  useFrame((state, delta) => {
    if (!active || pathPoints.length < 2 || !dotRef.current) return;
    
    // Cycle progress along path
    const speed = 0.45; // loop duration factor
    const newPercent = (percent + delta * speed) % 1.0;
    setPercent(newPercent);

    // Calculate position along path vertices
    const totalPoints = pathPoints.length - 1;
    const rawIndex = newPercent * totalPoints;
    const segmentIndex = Math.floor(rawIndex);
    const segmentPercent = rawIndex - segmentIndex;

    const startPt = pathPoints[segmentIndex];
    const endPt = pathPoints[segmentIndex + 1];

    if (startPt && endPt) {
      dotRef.current.position.lerpVectors(
        new THREE.Vector3(...startPt),
        new THREE.Vector3(...endPt),
        segmentPercent
      );
    }
  });

  if (!active || pathPoints.length < 2) return null;

  // Convert nested array coordinates to THREE.Vector3 array
  const formattedPoints = pathPoints.map(p => new THREE.Vector3(...p));

  // Generate middle marker position
  const midIndex = Math.floor(pathPoints.length / 2);
  const midPoint = pathPoints[midIndex];

  return (
    <group>
      {/* Dashed Line */}
      <Line
        points={formattedPoints}
        color="#00E5FF"
        lineWidth={2.5}
        dashed
        dashSize={0.2}
        gapSize={0.15}
      />

      {/* Moving Tracer Dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
      
      {/* Pulsing tracer glow */}
      <pointLight position={dotRef.current ? [dotRef.current.position.x, dotRef.current.position.y + 0.1, dotRef.current.position.z] : [0,0,0]} color="#00E5FF" intensity={0.8} distance={2} />

      {/* Distance Billboard labels */}
      <Html position={pathPoints[0]} distanceFactor={8} center>
        <div className="bg-[#030812]/95 border border-cyan/40 px-2 py-0.5 rounded font-mono text-[8px] text-cyan whitespace-nowrap">
          ESCAPE ORIGIN
        </div>
      </Html>

      <Html position={midPoint} distanceFactor={8} center>
        <div className="bg-[#030812]/95 border border-cyan/40 px-2 py-0.5 rounded font-mono text-[8px] text-cyan whitespace-nowrap">
          ROUTE: 4.8m
        </div>
      </Html>

      <Html position={pathPoints[pathPoints.length - 1]} distanceFactor={8} center>
        <div className="bg-[#030812]/95 border border-cyan/40 px-2 py-0.5 rounded font-mono text-[8px] text-cyan whitespace-nowrap">
          ESCAPE WINDOW
        </div>
      </Html>
    </group>
  );
}

// ═══════════════════════════════════════════
// EVIDENCE HIGHLIGHT MAP EFFECT
// ═══════════════════════════════════════════
export function EvidenceHighlightAllEffect({ active = false, evidencePositions = [], hubPosition = [0, 1.5, -2] }) {
  const [pulse, setPulse] = useState(1);
  
  useFrame((state) => {
    if (!active) return;
    // pulsing scale logic for visual flair
    const time = state.clock.getElapsedTime();
    setPulse(1 + Math.sin(time * 6) * 0.15);
  });

  if (!active || evidencePositions.length === 0) return null;

  const threeHub = new THREE.Vector3(...hubPosition);

  return (
    <group>
      {/* Center Evidence Map Hub Node */}
      <mesh position={hubPosition}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#FFD600" />
      </mesh>
      
      <Html position={hubPosition} distanceFactor={8} center>
        <div className="bg-yellow/10 border border-yellow text-yellow px-2.5 py-1 rounded font-mono text-[9px] font-bold shadow-[0_0_10px_rgba(255,214,0,0.3)] uppercase tracking-wider whitespace-nowrap">
          Central Evidence Map
        </div>
      </Html>

      {/* Connector lines and pulsing beacons */}
      {evidencePositions.map((pos, idx) => {
        const threePos = new THREE.Vector3(...pos);
        return (
          <group key={idx}>
            {/* Connection Line */}
            <Line
              points={[threePos, threeHub]}
              color="#FFD600"
              lineWidth={1}
              opacity={0.6}
              transparent
            />

            {/* Glowing yellow beacon at evidence */}
            <mesh position={[pos[0], pos[1] + 0.1, pos[2]]} scale={[pulse, pulse, pulse]}>
              <ringGeometry args={[0.15, 0.22, 16]} />
              <meshBasicMaterial color="#FFD600" side={THREE.DoubleSide} transparent opacity={0.7} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
