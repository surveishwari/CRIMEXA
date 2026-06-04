import React from 'react';
import { Html } from '@react-three/drei';

const EvidenceMarkers = ({ evidenceList, onSelect }) => {
  if (!evidenceList) return null;

  return (
    <group>
      {evidenceList.map((ev, idx) => (
        <group key={idx} position={ev.pos} onClick={(e) => { e.stopPropagation(); onSelect(ev); }}>
          {/* Base Cone */}
          <mesh position={[0, 0.4, 0]}>
            <coneGeometry args={[0.2, 0.6, 4]} />
            <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.5} opacity={0.8} transparent />
          </mesh>
          
          {/* Number Plate */}
          <Html position={[0, 0.9, 0]} center>
            <div className="bg-[#050A0F] border border-cyan px-2 py-0.5 rounded flex flex-col items-center shadow-lg shadow-cyan/20 cursor-pointer hover:bg-cyan hover:text-black transition-colors">
              <span className="text-xs font-mono font-bold">{ev.id}</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

export default EvidenceMarkers;
