import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

// ═══════════════════════════════════════════
// ACTION LIBRARY (GSAP Tweens)
// ═══════════════════════════════════════════

const ACTIONS = {
  STANDING: (refs) => {
    gsap.set(refs.torso.rotation, { x: 0, y: 0, z: 0 });
    gsap.set(refs.head.rotation, { x: 0, y: 0, z: 0 });
    
    // natural idle: subtle breathing
    return gsap.to(refs.torso.scale, { 
      y: 1.03, 
      x: 0.99,
      duration: 1.5, 
      repeat: -1, 
      yoyo: true, 
      ease: "sine.inOut" 
    });
  },

  WALK_IN: (refs, targetX = 0) => {
    const tl = gsap.timeline();
    // Swing legs alternately
    tl.to(refs.leftThigh.rotation, { x: 0.35, duration: 0.4, repeat: 6, yoyo: true, ease: "sine.inOut" }, 0)
      .to(refs.rightThigh.rotation, { x: -0.35, duration: 0.4, repeat: 6, yoyo: true, ease: "sine.inOut" }, 0.2)
      // Swing arms opposite to legs
      .to(refs.rightUpperArm.rotation, { x: 0.35, duration: 0.4, repeat: 6, yoyo: true, ease: "sine.inOut" }, 0)
      .to(refs.leftUpperArm.rotation, { x: -0.35, duration: 0.4, repeat: 6, yoyo: true, ease: "sine.inOut" }, 0.2)
      // Move root forward
      .to(refs.root.position, { x: targetX, duration: 2.5, ease: "power1.inOut" }, 0);
    return tl;
  },

  RAISE_WEAPON: (refs) => {
    const tl = gsap.timeline();
    tl.to(refs.rightUpperArm.rotation, { x: -1.3, duration: 0.6, ease: "power2.out" }, 0)
      .to(refs.rightForearm.rotation, { x: -0.4, duration: 0.3 }, "-=0.2")
      .to(refs.torso.rotation, { y: -0.2, duration: 0.3 }, 0);
    return tl;
  },

  FALL: (refs) => {
    const tl = gsap.timeline();
    // Victim falls backward
    tl.to(refs.root.rotation, { x: 1.4, duration: 0.8, ease: "power2.in" }, 0)
      .to(refs.root.position, { y: 0.1, z: refs.root.position.z - 0.4, duration: 0.8, ease: "power2.in" }, 0)
      .to(refs.leftUpperArm.rotation, { z: 0.8, duration: 0.5 }, 0)
      .to(refs.rightUpperArm.rotation, { z: -0.8, duration: 0.5 }, 0)
      .to(refs.leftThigh.rotation, { x: 0.3, duration: 0.4 }, 0.2)
      .to(refs.rightThigh.rotation, { x: -0.1, duration: 0.4 }, 0.2);
    return tl;
  },

  FLEE_BACK: (refs, startX = 0) => {
    const tl = gsap.timeline();
    tl.to(refs.root.position, { x: startX - 3.5, duration: 1.5, ease: "power2.in" }, 0)
      // fast backward step
      .to(refs.leftThigh.rotation, { x: -0.4, duration: 0.3, repeat: 4, yoyo: true }, 0)
      .to(refs.rightThigh.rotation, { x: 0.4, duration: 0.3, repeat: 4, yoyo: true }, 0.15);
    return tl;
  },

  RUN_AWAY: (refs) => {
    const tl = gsap.timeline();
    tl.to(refs.root.position, { x: 6, duration: 1.2, ease: "power2.in" })
      // running arm/leg pumping
      .to(refs.leftThigh.rotation, { x: 0.7, duration: 0.2, repeat: 5, yoyo: true }, 0)
      .to(refs.rightThigh.rotation, { x: -0.7, duration: 0.2, repeat: 5, yoyo: true, delay: 0.1 }, 0)
      .to(refs.rightUpperArm.rotation, { x: -0.7, duration: 0.2, repeat: 5, yoyo: true }, 0)
      .to(refs.leftUpperArm.rotation, { x: 0.7, duration: 0.2, repeat: 5, yoyo: true, delay: 0.1 }, 0);
    return tl;
  },

  SLUMPED: (refs) => {
    gsap.set(refs.root.rotation, { x: 0.65, y: refs.initialRotationY || 0, z: 0 });
    gsap.set(refs.root.position, { y: 0.15 });
    gsap.set(refs.torso.rotation, { x: 0.35 });
    gsap.set(refs.head.rotation, { x: 0.5 });
    gsap.set(refs.leftUpperArm.rotation, { z: 0.6, x: 0.3 });
    gsap.set(refs.rightUpperArm.rotation, { z: -0.6, x: 0.3 });
  },

  BACK_AWAY: (refs) => {
    const tl = gsap.timeline();
    tl.to(refs.root.position, { z: refs.root.position.z + 1.2, duration: 1.0, ease: "power1.out" })
      .to(refs.torso.rotation, { x: -0.15, duration: 0.5 }, 0);
    return tl;
  },

  SEARCH_DRAWERS: (refs) => {
    const tl = gsap.timeline({ repeat: 2 });
    tl.to(refs.rightUpperArm.rotation, { x: -0.8, duration: 0.5 })
      .to(refs.rightForearm.rotation, { x: -0.5, duration: 0.3 })
      .to(refs.torso.rotation, { y: 0.3, duration: 0.4 }, 0)
      .to(refs.rightUpperArm.rotation, { x: 0, duration: 0.5 }, "+=0.3")
      .to(refs.torso.rotation, { y: 0, duration: 0.4 }, "-=0.3");
    return tl;
  },

  GRAB_LAPTOP: (refs) => {
    const tl = gsap.timeline();
    tl.to(refs.rightUpperArm.rotation, { x: -1.0, duration: 0.4 })
      .to(refs.rightForearm.rotation, { x: -0.8, duration: 0.3 })
      .to(refs.root.position, { y: 0.05, duration: 0.3 }, 0)
      .to(refs.rightUpperArm.rotation, { x: -0.5, duration: 0.5 }, "+=0.2");
    return tl;
  },
  
  CLIMB_IN: (refs) => {
    const tl = gsap.timeline();
    // climb motion
    tl.to(refs.root.position, { x: 0, y: 0.9, z: 2.5, duration: 1.0, ease: "power1.out" })
      .to(refs.leftThigh.rotation, { x: 0.7, duration: 0.5 }, 0)
      .to(refs.rightThigh.rotation, { x: 0.4, duration: 0.5 }, 0.2)
      .to(refs.rightUpperArm.rotation, { x: -0.6, duration: 0.5 }, 0)
      // drop to floor
      .to(refs.root.position, { y: 0, duration: 0.6, ease: "bounce.out" }, 1.0)
      .to(refs.leftThigh.rotation, { x: 0, duration: 0.4 }, 1.0)
      .to(refs.rightThigh.rotation, { x: 0, duration: 0.4 }, 1.0);
    return tl;
  },
  
  EXIT_WINDOW: (refs) => {
    const tl = gsap.timeline();
    tl.to(refs.root.position, { x: 3.5, y: 0.8, z: -1, duration: 1.2, ease: "power1.in" })
      .to(refs.leftThigh.rotation, { x: 0.5, duration: 0.6 }, 0)
      .to(refs.rightThigh.rotation, { x: 0.5, duration: 0.6 }, 0)
      .to(refs.root.position, { y: 0.1, z: -4, duration: 0.8, delay: 1.2 });
    return tl;
  },

  WALK_FAST: (refs) => {
    const tl = gsap.timeline();
    tl.to(refs.leftThigh.rotation, { x: 0.45, duration: 0.3, repeat: 8, yoyo: true }, 0)
      .to(refs.rightThigh.rotation, { x: -0.45, duration: 0.3, repeat: 8, yoyo: true }, 0.15)
      .to(refs.root.position, { z: refs.root.position.z - 2.5, duration: 2.0, ease: "none" }, 0);
    return tl;
  },

  ATTACK: (refs) => {
    const tl = gsap.timeline();
    tl.to(refs.rightUpperArm.rotation, { x: -1.2, duration: 0.3, ease: "power2.out" })
      .to(refs.torso.rotation, { y: 0.4, x: 0.1, duration: 0.2 })
      .to(refs.rightForearm.rotation, { x: -0.9, duration: 0.2 })
      // strike forward
      .to(refs.rightUpperArm.rotation, { x: 0.4, duration: 0.2, ease: "power2.in" })
      .to(refs.root.position, { z: refs.root.position.z - 0.5, duration: 0.2 }, "-=0.2");
    return tl;
  },

  GROUNDED: (refs) => {
    gsap.set(refs.root.rotation, { z: 1.5, x: 0.3 });
    gsap.set(refs.root.position, { y: 0.1 });
    gsap.set(refs.torso.rotation, { x: 0.1 });
    gsap.set(refs.head.rotation, { y: 0.4 });
  },

  NONE: (refs) => {
    // stationary idle, do nothing
  }
};

// ═══════════════════════════════════════════
// ANIMATED FIGURE COMPONENT
// ═══════════════════════════════════════════

export default function AnimatedFigure({ 
  role = "suspect", // "suspect" | "victim"
  action = "STANDING",
  initialPosition = [0, 0, 0],
  initialRotationY = 0,
  targetX = 0
}) {
  const rootRef = useRef();
  const torsoRef = useRef();
  const headRef = useRef();
  
  const leftUpperArmRef = useRef();
  const leftForearmRef = useRef();
  const leftHandRef = useRef();
  
  const rightUpperArmRef = useRef();
  const rightForearmRef = useRef();
  const rightHandRef = useRef();
  
  const leftThighRef = useRef();
  const leftShinRef = useRef();
  const leftFootRef = useRef();
  
  const rightThighRef = useRef();
  const rightShinRef = useRef();
  const rightFootRef = useRef();

  useEffect(() => {
    const refs = {
      root: rootRef.current,
      torso: torsoRef.current,
      head: headRef.current,
      leftUpperArm: leftUpperArmRef.current,
      leftForearm: leftForearmRef.current,
      leftHand: leftHandRef.current,
      rightUpperArm: rightUpperArmRef.current,
      rightForearm: rightForearmRef.current,
      rightHand: rightHandRef.current,
      leftThigh: leftThighRef.current,
      leftShin: leftShinRef.current,
      leftFoot: leftFootRef.current,
      rightThigh: rightThighRef.current,
      rightShin: rightShinRef.current,
      rightFoot: rightFootRef.current,
      initialPosition,
      initialRotationY
    };

    if (!refs.root || !refs.torso || !refs.head) return;

    // Reset references to base states before applying next animation
    // Kill existing timelines/tweens
    gsap.killTweensOf([
      refs.root.position, refs.root.rotation,
      refs.torso.position, refs.torso.rotation, refs.torso.scale,
      refs.head.position, refs.head.rotation,
      refs.leftUpperArm.rotation, refs.leftForearm.rotation,
      refs.rightUpperArm.rotation, refs.rightForearm.rotation,
      refs.leftThigh.rotation, refs.leftShin.rotation,
      refs.rightThigh.rotation, refs.rightShin.rotation
    ]);

    // Apply defaults
    refs.root.position.set(...initialPosition);
    refs.root.rotation.set(0, initialRotationY, 0);
    refs.torso.position.set(0, 0.95, 0);
    refs.torso.rotation.set(0, 0, 0);
    refs.torso.scale.set(1, 1, 1);
    refs.head.position.set(0, 0.45, 0);
    refs.head.rotation.set(0, 0, 0);

    refs.leftUpperArm.rotation.set(0, 0, 0);
    refs.leftForearm.rotation.set(0, 0, 0);
    refs.rightUpperArm.rotation.set(0, 0, 0);
    refs.rightForearm.rotation.set(0, 0, 0);

    refs.leftThigh.rotation.set(0, 0, 0);
    refs.leftShin.rotation.set(0, 0, 0);
    refs.rightThigh.rotation.set(0, 0, 0);
    refs.rightShin.rotation.set(0, 0, 0);

    // Trigger target action
    if (ACTIONS[action]) {
      if (action === "WALK_IN") {
        ACTIONS.WALK_IN(refs, targetX);
      } else if (action === "FLEE_BACK") {
        ACTIONS.FLEE_BACK(refs, initialPosition[0]);
      } else {
        ACTIONS[action](refs);
      }
    }

  }, [action, initialPosition, initialRotationY, targetX]);

  // Styling properties
  const isSuspect = role === "suspect";
  
  // Materials and Colors
  const skinMaterial = <meshStandardMaterial color="#E8D5C4" roughness={0.7} />;
  const clothingMaterial = isSuspect ? (
    <meshStandardMaterial color="#1a1a1a" roughness={0.8} /> // dark clothing for suspect
  ) : (
    <meshStandardMaterial color="#2C3E50" roughness={0.7} /> // shirt color for victim
  );
  const pantsMaterial = isSuspect ? (
    <meshStandardMaterial color="#111111" roughness={0.9} />
  ) : (
    <meshStandardMaterial color="#1A1A2E" roughness={0.8} /> // pants color for victim
  );

  return (
    <group ref={rootRef} position={initialPosition} rotation={[0, initialRotationY, 0]}>
      
      {/* TORSO */}
      <group ref={torsoRef} position={[0, 0.95, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.5, 0.18]} />
          {clothingMaterial}
        </mesh>

        {/* HEAD */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.13, 16, 16]} />
            {skinMaterial}
          </mesh>
          {/* SUSPECT HOODIE EFFECT */}
          {isSuspect && (
            <mesh position={[0, 0.05, -0.03]} castShadow>
              <boxGeometry args={[0.24, 0.24, 0.24]} />
              <meshStandardMaterial color="#151515" roughness={0.9} />
            </mesh>
          )}
        </group>

        {/* LEFT ARM */}
        <group ref={leftUpperArmRef} position={[-0.2, 0.2, 0]}>
          <mesh castShadow position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.045, 0.04, 0.24, 8]} />
            {clothingMaterial}
          </mesh>
          
          <group ref={leftForearmRef} position={[0, -0.24, 0]}>
            <mesh castShadow position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.038, 0.035, 0.2, 8]} />
              {clothingMaterial}
            </mesh>
            
            <group ref={leftHandRef} position={[0, -0.2, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.06, 0.06, 0.03]} />
                {skinMaterial}
              </mesh>
            </group>
          </group>
        </group>

        {/* RIGHT ARM */}
        <group ref={rightUpperArmRef} position={[0.2, 0.2, 0]}>
          <mesh castShadow position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.045, 0.04, 0.24, 8]} />
            {clothingMaterial}
          </mesh>
          
          <group ref={rightForearmRef} position={[0, -0.24, 0]}>
            <mesh castShadow position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.038, 0.035, 0.2, 8]} />
              {clothingMaterial}
            </mesh>
            
            <group ref={rightHandRef} position={[0, -0.2, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.06, 0.06, 0.03]} />
                {skinMaterial}
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* PELVIS / HIP CONNECTION (relative to root) */}
      <mesh position={[0, 0.68, 0]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.16]} />
        {pantsMaterial}
      </mesh>

      {/* LEFT LEG */}
      <group ref={leftThighRef} position={[-0.1, 0.63, 0]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.32, 8]} />
          {pantsMaterial}
        </mesh>
        
        <group ref={leftShinRef} position={[0, -0.34, 0]}>
          <mesh castShadow position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.048, 0.04, 0.3, 8]} />
            {pantsMaterial}
          </mesh>
          
          <group ref={leftFootRef} position={[0, -0.3, 0.04]}>
            <mesh castShadow>
              <boxGeometry args={[0.08, 0.04, 0.14]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        </group>
      </group>

      {/* RIGHT LEG */}
      <group ref={rightThighRef} position={[0.1, 0.63, 0]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.32, 8]} />
          {pantsMaterial}
        </mesh>
        
        <group ref={rightShinRef} position={[0, -0.34, 0]}>
          <mesh castShadow position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.048, 0.04, 0.3, 8]} />
            {pantsMaterial}
          </mesh>
          
          <group ref={rightFootRef} position={[0, -0.3, 0.04]}>
            <mesh castShadow>
              <boxGeometry args={[0.08, 0.04, 0.14]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        </group>
      </group>

    </group>
  );
}
