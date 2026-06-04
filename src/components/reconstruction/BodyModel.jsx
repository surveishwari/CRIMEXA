import React, { useRef } from 'react';

// A detailed articulated mannequin matching the Sketchup reference images
export const Mannequin = ({ position, rotation = [0,0,0], color = "#888888", pose = "standing", isGhost = false }) => {
  const materialProps = isGhost 
    ? { color, transparent: true, opacity: 0.6, emissive: color, emissiveIntensity: 0.5, wireframe: false }
    : { color, roughness: 0.6, metalness: 0.1 };

  // Define poses
  const poses = {
    standing: {
      bodyRot: [0, 0, 0], bodyPos: [0, 1.0, 0],
      leftArmRot: [0, 0, 0.2], rightArmRot: [0, 0, -0.2],
      leftLegRot: [0, 0, 0], rightLegRot: [0, 0, 0],
      headRot: [0, 0, 0]
    },
    walking: {
      bodyRot: [0.1, 0, 0], bodyPos: [0, 1.0, 0],
      leftArmRot: [0.5, 0, 0.2], rightArmRot: [-0.5, 0, -0.2],
      leftLegRot: [-0.3, 0, 0], rightLegRot: [0.3, 0, 0],
      headRot: [-0.1, 0, 0]
    },
    lying_dead: {
      bodyRot: [-Math.PI / 2, 0, 0.2], bodyPos: [0, 0.1, 0],
      leftArmRot: [0, 0, 1.2], rightArmRot: [-0.5, 0, -0.8],
      leftLegRot: [0.1, 0, 0.2], rightLegRot: [0, 0, -0.3],
      headRot: [0, 0.5, -0.3]
    }
  };

  const p = poses[pose] || poses.standing;

  return (
    <group position={position} rotation={rotation}>
      <group position={p.bodyPos} rotation={p.bodyRot}>
        
        {/* Pelvis */}
        <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.2, 0.2]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.5, 0.25]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Neck & Head */}
        <group position={[0, 0.55, 0]} rotation={p.headRot}>
          <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.08, 0.1]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 0.2, 0.02]} castShadow receiveShadow>
            <sphereGeometry args={[0.16, 32, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>

        {/* Left Arm */}
        <group position={[-0.25, 0.4, 0]} rotation={p.leftArmRot}>
          <mesh position={[-0.05, 0, 0]} castShadow receiveShadow><sphereGeometry args={[0.08]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[-0.05, -0.2, 0]} castShadow receiveShadow><capsuleGeometry args={[0.06, 0.3]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[-0.05, -0.4, 0]} castShadow receiveShadow><sphereGeometry args={[0.06]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[-0.05, -0.6, 0]} castShadow receiveShadow><capsuleGeometry args={[0.05, 0.3]} /><meshStandardMaterial {...materialProps} /></mesh>
        </group>

        {/* Right Arm */}
        <group position={[0.25, 0.4, 0]} rotation={p.rightArmRot}>
          <mesh position={[0.05, 0, 0]} castShadow receiveShadow><sphereGeometry args={[0.08]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[0.05, -0.2, 0]} castShadow receiveShadow><capsuleGeometry args={[0.06, 0.3]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[0.05, -0.4, 0]} castShadow receiveShadow><sphereGeometry args={[0.06]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[0.05, -0.6, 0]} castShadow receiveShadow><capsuleGeometry args={[0.05, 0.3]} /><meshStandardMaterial {...materialProps} /></mesh>
        </group>

        {/* Left Leg */}
        <group position={[-0.12, -0.2, 0]} rotation={p.leftLegRot}>
          <mesh position={[0, -0.25, 0]} castShadow receiveShadow><capsuleGeometry args={[0.08, 0.4]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow><sphereGeometry args={[0.07]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[0, -0.75, 0]} castShadow receiveShadow><capsuleGeometry args={[0.07, 0.4]} /><meshStandardMaterial {...materialProps} /></mesh>
        </group>

        {/* Right Leg */}
        <group position={[0.12, -0.2, 0]} rotation={p.rightLegRot}>
          <mesh position={[0, -0.25, 0]} castShadow receiveShadow><capsuleGeometry args={[0.08, 0.4]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow><sphereGeometry args={[0.07]} /><meshStandardMaterial {...materialProps} /></mesh>
          <mesh position={[0, -0.75, 0]} castShadow receiveShadow><capsuleGeometry args={[0.07, 0.4]} /><meshStandardMaterial {...materialProps} /></mesh>
        </group>

      </group>
    </group>
  );
};

export default Mannequin;
