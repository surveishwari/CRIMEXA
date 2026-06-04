import React from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { MeshStandardMaterial, Vector3 } from 'three';

// Placeholder GLTF loader – in a real project replace with actual GLTF models
const WeaponModel = (props) => {
  return (
    <group {...props}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.05, 0.5]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.1, 0.1]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.1]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.5} />
      </mesh>
    </group>
  );
};

// Advanced Human Figure Component
const HumanModel = ({ position, rotation, color = "#884444", pose = "dead" }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Torso */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.2, 0.5, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Left Arm */}
      <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, pose === 'dead' ? 0.3 : 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.08, 0.6, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.3, 0.1, 0]} rotation={[0, 0, pose === 'dead' ? -0.4 : 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.08, 0.6, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, -0.5, pose === 'dead' ? 0.1 : 0]} rotation={[pose === 'dead' ? 0.2 : 0, 0, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.09, 0.7, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0.12, -0.5, pose === 'dead' ? -0.1 : 0]} rotation={[pose === 'dead' ? -0.2 : 0, 0, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.09, 0.7, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
};

// Hazmat Investigator Component with flashlight
const InvestigatorModel = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      <HumanModel position={[0,0,0]} color="#dddddd" pose="standing" />
      {/* Flashlight in right hand */}
      <group position={[0.3, 0, 0.3]} rotation={[-Math.PI / 4, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.05, 0.2]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
        <spotLight 
          position={[0, 0.1, 0]} 
          angle={0.4} 
          penumbra={0.5} 
          intensity={2.5} 
          color="#ffffff" 
          distance={10} 
          castShadow 
        />
        {/* Visible beam cone */}
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[0.8, 2, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
};

// Evidence marker component used across scenes
export const EvidenceMarker = ({ position, label, color = '#ff2d55', onClick }) => (
  <group position={position} onClick={onClick}>
    <mesh position={[0, 0.5, 0]}>
      <coneGeometry args={[0.15, 0.4, 4]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
    <mesh position={[0, 0.2, 0]}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshStandardMaterial color={color} />
    </mesh>
    {/* HTML label */}
    <Html position={[0, 1, 0]} center>
      <div className="bg-bg-primary/90 border border-border px-2 py-1 text-xs font-mono text-white rounded shadow-md" style={{ borderColor: color }}>{label}</div>
    </Html>
  </group>
);

// --- SCENE TEMPLATES -------------------------------------------------------
// Each template receives props for time of day (affects lighting) and a callback
// for when an evidence marker is clicked.

export const AssaultIndoorScene = ({ timeOfDay = 'night', onEvidenceClick }) => {
  const isNight = timeOfDay === 'night';
  const ambient = isNight ? 0.2 : 0.6;
  const dirIntensity = isNight ? 0.4 : 1.0;
  const dirColor = isNight ? '#0a0a2a' : '#ffffff';

  const wallMat = new MeshStandardMaterial({ color: "#d1cbbd", roughness: 0.9, metalness: 0 }); // Khaki paint
  const trimMat = new MeshStandardMaterial({ color: "#ffffff", roughness: 0.8, metalness: 0 }); // White baseboards

  return (
    <group>
      {/* Ambient/Directional Light */}
      <ambientLight intensity={ambient} />
      <directionalLight position={[5, 8, 5]} intensity={dirIntensity} color={dirColor} castShadow />

      {/* Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#453225" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Main Walls */}
      {/* Back Wall */}
      <mesh position={[0, 2.5, -6]} receiveShadow castShadow>
        <boxGeometry args={[14, 5, 0.4]} />
        <primitive object={wallMat} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-7, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 5, 0.4]} />
        <primitive object={wallMat} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[7, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 5, 0.4]} />
        <primitive object={wallMat} />
      </mesh>

      {/* Baseboards */}
      <mesh position={[0, 0.1, -5.78]} receiveShadow castShadow>
        <boxGeometry args={[14, 0.2, 0.05]} />
        <primitive object={trimMat} />
      </mesh>
      <mesh position={[-6.78, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 0.2, 0.05]} />
        <primitive object={trimMat} />
      </mesh>

      {/* Doorway in back wall */}
      <group position={[-2, 1.5, -5.8]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1.5, 3, 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Open Door */}
        <mesh position={[-0.75, 0, 0.5]} rotation={[0, Math.PI/4, 0]} receiveShadow castShadow>
          <boxGeometry args={[1.5, 3, 0.05]} />
          <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
        </mesh>
      </group>

      {/* Advanced Stairs */}
      <group position={[-5, 0, -2]}>
        {[...Array(15)].map((_, i) => (
          <group key={i} position={[0, i * 0.2, i * 0.3]}>
            {/* Tread */}
            <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.5, 0.05, 0.35]} />
              <meshStandardMaterial color="#553a25" roughness={0.5} />
            </mesh>
            {/* Riser */}
            <mesh position={[0, 0, 0.15]} castShadow receiveShadow>
              <boxGeometry args={[2.5, 0.2, 0.05]} />
              <meshStandardMaterial color="#eee" roughness={0.9} />
            </mesh>
            {/* Baluster */}
            <mesh position={[1.1, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.9]} />
              <meshStandardMaterial color="#fff" roughness={0.5} />
            </mesh>
          </group>
        ))}
        {/* Handrail */}
        <mesh position={[1.1, 1.1 + (15*0.2)/2, (15*0.3)/2]} rotation={[-Math.atan(0.2/0.3), 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 6]} />
          <meshStandardMaterial color="#3a2515" roughness={0.4} />
        </mesh>
      </group>

      {/* Modern Furniture */}
      {/* Cabinet against back wall */}
      <mesh position={[1, 1.5, -5.5]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 3, 0.8]} />
        <meshStandardMaterial color="#d1cbbd" roughness={0.8} />
      </mesh>
      
      {/* TV Stand */}
      <mesh position={[3, 0.3, -5]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.6, 0.8]} />
        <meshStandardMaterial color="#d1cbbd" roughness={0.8} />
      </mesh>
      
      {/* Fallen TV on the floor */}
      <mesh position={[2.5, 0.2, -3.5]} rotation={[-Math.PI/2 - 0.2, 0.1, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* TV Screen glare */}
      <mesh position={[2.5, 0.2, -3.5]} rotation={[-Math.PI/2 - 0.2, 0.1, -0.2]}>
        <planeGeometry args={[1.9, 1.1]} />
        <meshBasicMaterial color="#0055ff" opacity={0.1} transparent />
      </mesh>

      {/* Sofa */}
      <mesh position={[5, 0.5, -1]} rotation={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 3]} />
        <meshStandardMaterial color="#8b7b6b" roughness={0.9} />
      </mesh>

      {/* Lighting Fixture (Chandelier) */}
      <group position={[2, 4.5, -2]}>
        <mesh castShadow><cylinderGeometry args={[0.4, 0.4, 0.1]} /><meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} /></mesh>
        <pointLight intensity={2} color="#ffe5cc" distance={15} decay={2} castShadow shadow-bias={-0.0005} />
      </group>

      {/* Victim - Lying on back near the fallen TV */}
      <HumanModel position={[1.5, 0.1, -2.5]} rotation={[-Math.PI / 2, 0, -0.5]} color="#4a4a4a" pose="dead" />

      {/* Investigators */}
      {/* Investigator 1: Bending over victim */}
      <InvestigatorModel position={[2.5, 0, -1.5]} rotation={[0, Math.PI / 4, 0]} />
      {/* Investigator 2: Foreground looking back */}
      <InvestigatorModel position={[-1, 0, -0.5]} rotation={[0, -Math.PI / 6, 0]} />
      {/* Investigator 3: By the doorway */}
      <InvestigatorModel position={[-1, 0, -4.5]} rotation={[0, Math.PI / 8, 0]} />

      {/* Weapon on floor */}
      <WeaponModel position={[-0.5, 0.05, -1.5]} />

      {/* Blood spatter – red planes on floor */}
      <mesh position={[-1, 0.01, -2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#8b0000" transparent opacity={0.6} />
      </mesh>

      {/* Evidence markers */}
      <EvidenceMarker
        position={[-0.5, 0.2, -1.5]}
        label="Weapon"
        color="#ff2d55"
        onClick={() => onEvidenceClick && onEvidenceClick({ type: 'Weapon', description: '9mm handgun, recent discharge.' })}
      />
      <EvidenceMarker
        position={[-1, 0.2, -2]}
        label="Blood"
        color="#ff2d55"
        onClick={() => onEvidenceClick && onEvidenceClick({ type: 'Blood', description: 'High‑velocity spatter, consistent with a firearm.' })}
      />
    </group>
  );
};

export const RobberyStoreScene = ({ timeOfDay = 'day', onEvidenceClick }) => {
  const isNight = timeOfDay === 'night';
  const ambient = isNight ? 0.15 : 0.7;
  const dirIntensity = isNight ? 0.3 : 1.0;
  const dirColor = isNight ? '#0b0b30' : '#ffffff';

  return (
    <group>
      <ambientLight intensity={ambient} />
      <directionalLight position={[3, 8, 3]} intensity={dirIntensity} color={dirColor} castShadow />

      {/* Store floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#382c21" roughness={0.9} />
      </mesh>

      {/* Shelves – simple boxes */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-4 + i * 2.5, 1, 2]} castShadow>
          <boxGeometry args={[2, 2, 0.2]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      ))}

      {/* Cash register – box with drawer */}
      <mesh position={[0, 0.5, -3]} castShadow>
        <boxGeometry args={[1.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Weapon on floor (stolen) */}
      <WeaponModel position={[0.5, 0.05, -2.5]} />

      {/* Evidence markers */}
      <EvidenceMarker
        position={[0.5, 0.2, -2.5]}
        label="Weapon"
        color="#ff2d55"
        onClick={() => onEvidenceClick && onEvidenceClick({ type: 'Weapon', description: 'Shotgun found near register, likely the tool used in the robbery.' })}
      />
      <EvidenceMarker
        position={[0, 0.2, -3]}
        label="Fingerprint"
        color="#00d4ff"
        onClick={() => onEvidenceClick && onEvidenceClick({ type: 'Fingerprint', description: 'Partial latent fingerprint on cash register glass.' })}
      />
    </group>
  );
};

export const HomicideOutdoorScene = ({ timeOfDay = 'night', onEvidenceClick }) => {
  const isNight = timeOfDay === 'night';
  const ambient = isNight ? 0.1 : 0.5;
  const dirIntensity = isNight ? 0.5 : 1.2;
  const dirColor = isNight ? '#0a0a2a' : '#ffffff';

  return (
    <group>
      <ambientLight intensity={ambient} />
      <directionalLight position={[5, 10, -5]} intensity={dirIntensity} color={dirColor} castShadow />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#263238" roughness={0.95} />
      </mesh>

      {/* Tree – simple cylinder */}
      <mesh position={[-3, 2, -5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>

      {/* Victim lying on ground */}
      <HumanModel position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} color="#4a4a4a" pose="dead" />

      {/* Investigators scanning the scene */}
      <InvestigatorModel position={[-2, 1.1, 2]} rotation={[0, -Math.PI / 4, 0]} />
      <InvestigatorModel position={[3, 1.1, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Blood puddle */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#8b0000" transparent opacity={0.5} />
      </mesh>

      {/* Evidence markers */}
      <EvidenceMarker
        position={[0, 0.2, 0]}
        label="Blood"
        color="#ff2d55"
        onClick={() => onEvidenceClick && onEvidenceClick({ type: 'Blood', description: 'Large high‑velocity spatters indicate a close‑range firearm discharge.' })}
      />
      <EvidenceMarker
        position={[-3, 0.2, -5]}
        label="Tree Stump"
        color="#8b0000"
        onClick={() => onEvidenceClick && onEvidenceClick({ type: 'Stump', description: 'Possible location of suspect after the shot.' })}
      />
    </group>
  );
};

// Export a map for easy selection in the Museum page
export const sceneMap = {
  ASSAULT: AssaultIndoorScene,
  ROBBERY: RobberyStoreScene,
  HOMICIDE: HomicideOutdoorScene,
  // fallback – generic empty room
  DEFAULT: AssaultIndoorScene,
};
