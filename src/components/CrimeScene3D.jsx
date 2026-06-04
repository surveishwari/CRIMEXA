import React,{useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Html,OrbitControls} from '@react-three/drei';
import * as THREE from 'three';

const data = JSON.parse(localStorage.getItem('forensiqCase')||'{}');
const img = localStorage.getItem('forensiqImage');
const {crime_type='homicide',weapon_type='knife',
  attacker_present=true,victim_present=true,
  evidence_items=[],severity_score=7,
  threat_level='HIGH',
  reconstructed_narrative='',
  scene_description=''} = data;
const isNight = scene_description.toLowerCase()
  .includes('night')||scene_description
  .toLowerCase().includes('dark');
const isGun = weapon_type.toLowerCase()
  .includes('gun')||weapon_type.toLowerCase()
  .includes('fire')||weapon_type.toLowerCase()
  .includes('shoot')||weapon_type.toLowerCase()
  .includes('pistol');

function Human({color,shirtColor,position,
  scale=1.6,leftLegR,rightLegR,
  leftArmR,rightArmR,headR,torsoR}){
  const skin='#C68642';
  return(
    <group position={position} scale={scale}>
      <mesh ref={headR} position={[0,1.78,0]}
        castShadow>
        <sphereGeometry args={[0.21,32,32]}/>
        <meshStandardMaterial color={skin}
          roughness={0.7}/>
      </mesh>
      <mesh position={[0,1.9,0.05]}>
        <sphereGeometry args={[0.23,16,16]}/>
        <meshStandardMaterial color="#1a0800"
          roughness={0.9}/>
      </mesh>
      <mesh position={[0,1.57,0]} castShadow>
        <cylinderGeometry args={[0.075,0.07,0.18,12]}/>
        <meshStandardMaterial color={skin}/>
      </mesh>
      <mesh ref={torsoR} position={[0,1.08,0]}
        castShadow>
        <cylinderGeometry args={[0.27,0.21,0.78,16]}/>
        <meshStandardMaterial color={shirtColor}
          roughness={0.85}/>
      </mesh>
      <mesh position={[-0.31,1.42,0]}>
        <sphereGeometry args={[0.115,12,12]}/>
        <meshStandardMaterial color={shirtColor}/>
      </mesh>
      <mesh position={[0.31,1.42,0]}>
        <sphereGeometry args={[0.115,12,12]}/>
        <meshStandardMaterial color={shirtColor}/>
      </mesh>
      <mesh ref={leftArmR}
        position={[-0.40,1.08,0]}
        rotation={[0,0,0.35]} castShadow>
        <cylinderGeometry args={[0.08,0.07,0.58,10]}/>
        <meshStandardMaterial color={shirtColor}/>
      </mesh>
      <mesh position={[-0.56,0.82,0]}>
        <sphereGeometry args={[0.075,8,8]}/>
        <meshStandardMaterial color={shirtColor}/>
      </mesh>
      <mesh position={[-0.60,0.62,0]}
        rotation={[0,0,0.2]}>
        <cylinderGeometry args={[0.065,0.06,0.35,8]}/>
        <meshStandardMaterial color={skin}/>
      </mesh>
      <mesh position={[-0.63,0.45,0]}>
        <sphereGeometry args={[0.07,8,8]}/>
        <meshStandardMaterial color={skin}/>
      </mesh>
      <mesh ref={rightArmR}
        position={[0.40,1.08,0]}
        rotation={[0,0,-0.35]} castShadow>
        <cylinderGeometry args={[0.08,0.07,0.58,10]}/>
        <meshStandardMaterial color={shirtColor}/>
      </mesh>
      <mesh position={[0.56,0.82,0]}>
        <sphereGeometry args={[0.075,8,8]}/>
        <meshStandardMaterial color={shirtColor}/>
      </mesh>
      <mesh position={[0.60,0.62,0]}
        rotation={[0,0,-0.2]}>
        <cylinderGeometry args={[0.065,0.06,0.35,8]}/>
        <meshStandardMaterial color={skin}/>
      </mesh>
      <mesh position={[0.63,0.45,0]}>
        <sphereGeometry args={[0.07,8,8]}/>
        <meshStandardMaterial color={skin}/>
      </mesh>
      <mesh position={[0,0.68,0]} castShadow>
        <cylinderGeometry args={[0.22,0.19,0.22,12]}/>
        <meshStandardMaterial color="#1a1a2e"/>
      </mesh>
      <mesh position={[-0.13,0.38,0]}
        ref={leftLegR} castShadow>
        <cylinderGeometry args={[0.115,0.10,0.7,10]}/>
        <meshStandardMaterial color="#1a1a2e"/>
      </mesh>
      <mesh position={[-0.13,0.05,0]}>
        <sphereGeometry args={[0.10,8,8]}/>
        <meshStandardMaterial color="#1a1a2e"/>
      </mesh>
      <mesh position={[-0.13,-0.18,0.05]}
        rotation={[0.2,0,0]}>
        <cylinderGeometry args={[0.09,0.085,0.35,8]}/>
        <meshStandardMaterial color="#1a1a2e"/>
      </mesh>
      <mesh position={[-0.13,-0.37,0.1]}>
        <boxGeometry args={[0.15,0.09,0.28]}/>
        <meshStandardMaterial color="#111"
          roughness={0.3} metalness={0.1}/>
      </mesh>
      <mesh position={[0.13,0.38,0]}
        ref={rightLegR} castShadow>
        <cylinderGeometry args={[0.115,0.10,0.7,10]}/>
        <meshStandardMaterial color="#1a1a2e"/>
      </mesh>
      <mesh position={[0.13,0.05,0]}>
        <sphereGeometry args={[0.10,8,8]}/>
        <meshStandardMaterial color="#1a1a2e"/>
      </mesh>
      <mesh position={[0.13,-0.18,0.05]}
        rotation={[0.2,0,0]}>
        <cylinderGeometry args={[0.09,0.085,0.35,8]}/>
        <meshStandardMaterial color="#1a1a2e"/>
      </mesh>
      <mesh position={[0.13,-0.37,0.1]}>
        <boxGeometry args={[0.15,0.09,0.28]}/>
        <meshStandardMaterial color="#111"
          roughness={0.3} metalness={0.1}/>
      </mesh>
    </group>
  );
}

function RealisticKnife({position,rotation=[0,0,0]}){
  return(
    <group position={position} rotation={rotation}
      scale={1.8}>
      <mesh position={[0,0.22,0]}>
        <boxGeometry args={[0.022,0.32,0.006]}/>
        <meshStandardMaterial color="#e8e8e8"
          metalness={0.95} roughness={0.05}
          envMapIntensity={1}/>
      </mesh>
      <mesh position={[0.008,0.22,0]}>
        <boxGeometry args={[0.003,0.32,0.003]}/>
        <meshStandardMaterial color="#ffffff"
          metalness={1} roughness={0}/>
      </mesh>
      <mesh position={[0,0.04,0]}>
        <boxGeometry args={[0.06,0.018,0.018]}/>
        <meshStandardMaterial color="#8B6914"
          metalness={0.5} roughness={0.3}/>
      </mesh>
      <mesh position={[0,-0.1,0]}>
        <boxGeometry args={[0.028,0.16,0.022]}/>
        <meshStandardMaterial color="#3d1f00"
          roughness={0.9}/>
      </mesh>
      <mesh position={[0.008,-0.1,0]}>
        <boxGeometry args={[0.005,0.16,0.005]}/>
        <meshStandardMaterial color="#5a3010"
          roughness={0.7}/>
      </mesh>
    </group>
  );
}

function RealisticGun({position}){
  return(
    <group position={position} scale={1.8}
      rotation={[0,0,-Math.PI/2]}>
      <mesh>
        <cylinderGeometry args={[0.016,0.014,0.42,12]}/>
        <meshStandardMaterial color="#1a1a1a"
          metalness={0.9} roughness={0.1}/>
      </mesh>
      <mesh position={[0.06,0,0]}>
        <boxGeometry args={[0.052,0.088,0.165]}/>
        <meshStandardMaterial color="#111"
          metalness={0.8} roughness={0.15}/>
      </mesh>
      <mesh position={[0.05,-0.09,0]}>
        <boxGeometry args={[0.044,0.145,0.125]}/>
        <meshStandardMaterial color="#222"
          roughness={0.5}/>
      </mesh>
      <mesh position={[0.05,-0.09,0.045]}>
        <boxGeometry args={[0.04,0.13,0.015]}/>
        <meshStandardMaterial color="#333"
          roughness={0.8}/>
      </mesh>
      <mesh position={[0.06,-0.055,0]}
        rotation={[0,0,0.3]}>
        <torusGeometry args={[0.018,0.004,6,12]}/>
        <meshStandardMaterial color="#444"
          metalness={0.6}/>
      </mesh>
    </group>
  );
}

function BloodSystem({position,severity,visible}){
  if(!visible) return null;
  const size = severity*0.08;
  return(
    <group position={position}>
      <mesh rotation={[-Math.PI/2,0,0]}
        position={[0,0.005,0]}>
        <circleGeometry args={[size,32]}/>
        <meshStandardMaterial color="#8B0000"
          metalness={0.3} roughness={0.15}
          transparent opacity={0.9}/>
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]}
        position={[0.3,0.005,0.2]}>
        <circleGeometry args={[size*0.5,24]}/>
        <meshStandardMaterial color="#6B0000"
          metalness={0.2} roughness={0.3}
          transparent opacity={0.85}/>
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]}
        position={[-0.2,0.005,0.3]}>
        <circleGeometry args={[size*0.35,20]}/>
        <meshStandardMaterial color="#700000"
          transparent opacity={0.75}/>
      </mesh>
      {[[-0.4,0.1],[-0.5,-0.2],[0.5,0.3],
        [0.3,-0.4],[0.6,-0.1],[-0.3,0.5],
        [0.4,0.5],[-0.6,0.2]].map(([x,z],i)=>{
        const rot = [-Math.PI/2,Math.random()*Math.PI,0];
        return (
        <mesh key={i}
          rotation={rot}
          position={[x*size,0.003,z*size]}>
          <circleGeometry args={[size*0.06+i*0.01,8]}/>
          <meshStandardMaterial color="#7B0000"
            transparent opacity={0.7}/>
        </mesh>
        );
      })}
      <pointLight position={[0,0.5,0]}
        color="#FF0000" intensity={0.3}/>
    </group>
  );
}

function Room({crimeType,isNight,isStreet}){
  const c=crimeType.toLowerCase();
  const wallC=isNight?'#2a3a2a':'#8fbc8f';
  const floorC=isNight?'#1a1000':'#9B7A3A';
  
  if(isStreet){
    return(
      <>
        {/* Sky */}
        <mesh>
          <sphereGeometry args={[50,32,32]}/>
          <meshBasicMaterial color="#87CEEB" side={THREE.BackSide}/>
        </mesh>
        {/* Sidewalk */}
        <mesh position={[0,0,0]} receiveShadow>
          <boxGeometry args={[20,0.05,4]}/>
          <meshStandardMaterial color="#888888" roughness={0.9}/>
        </mesh>
        {/* Road */}
        <mesh position={[0,0,-5]} receiveShadow>
          <boxGeometry args={[20,0.05,6]}/>
          <meshStandardMaterial color="#333333" roughness={0.95}/>
        </mesh>
        {/* Streetlight pole */}
        <mesh position={[3,2,-1]}>
          <cylinderGeometry args={[0.06,0.06,4,8]}/>
          <meshStandardMaterial color="#555555"/>
        </mesh>
        {/* Streetlight head */}
        <mesh position={[3,4.1,-1]}>
          <boxGeometry args={[0.6,0.15,0.15]}/>
          <meshStandardMaterial color="#444444"/>
        </mesh>
        {/* Light glow */}
        <mesh position={[3,4.1,-1]}>
          <sphereGeometry args={[0.12,8,8]}/>
          <meshStandardMaterial color="#FFFACD" emissive="#FFFACD" emissiveIntensity={2}/>
        </mesh>
        <pointLight position={[3,4.1,-1]} color="#FFE8A0" intensity={3} distance={8}/>
        {/* Building wall */}
        <mesh position={[0,2.5,-7]}>
          <boxGeometry args={[12,5,0.3]}/>
          <meshStandardMaterial color="#8B7355"/>
        </mesh>
        {/* Building windows */}
        {[-3,-1,1,3].map((x,i)=>{
          return(
            <mesh key={i} position={[x,2.5,-6.8]}>
              <boxGeometry args={[1,1.2,0.05]}/>
              <meshStandardMaterial color="#4466aa" transparent opacity={0.6}/>
            </mesh>
          );
        })}
        {/* Parked car */}
        <group position={[5,0,-3]}>
          <mesh position={[0,0.4,0]} castShadow>
            <boxGeometry args={[3,0.8,1.4]}/>
            <meshStandardMaterial color="#2244aa"/>
          </mesh>
          <mesh position={[0,1.15,0]} castShadow>
            <boxGeometry args={[2,0.5,1.2]}/>
            <meshStandardMaterial color="#1a3388"/>
          </mesh>
          {/* Wheels */}
          {[[-1.2,0.3,0.5],[1.2,0.3,0.5],[-1.2,0.3,-0.5],[1.2,0.3,-0.5]].map((pos,i)=>{
            return(
              <mesh key={i} position={pos} rotation={[0,0,Math.PI/2]}>
                <cylinderGeometry args={[0.3,0.3,0.2,16]}/>
                <meshStandardMaterial color="#111111"/>
              </mesh>
            );
          })}
        </group>
      </>
    );
  }
  
  return(
    <>
      <mesh rotation={[-Math.PI/2,0,0]}
        position={[0,0,0]} receiveShadow>
        <planeGeometry args={[18,18]}/>
        <meshStandardMaterial color={floorC}
          roughness={0.9}/>
      </mesh>
      <mesh position={[0,3.5,-7]} receiveShadow>
        <planeGeometry args={[18,7]}/>
        <meshStandardMaterial color={wallC}/>
      </mesh>
      <mesh position={[-9,3.5,0]}
        rotation={[0,Math.PI/2,0]} receiveShadow>
        <planeGeometry args={[18,7]}/>
        <meshStandardMaterial color={wallC}/>
      </mesh>
      <mesh position={[9,3.5,0]}
        rotation={[0,-Math.PI/2,0]} receiveShadow>
        <planeGeometry args={[18,7]}/>
        <meshStandardMaterial color={wallC}/>
      </mesh>
      <mesh position={[0,7,0]}
        rotation={[Math.PI/2,0,0]}>
        <planeGeometry args={[18,18]}/>
        <meshStandardMaterial color="#1a1a1a"/>
      </mesh>

      {(c.includes('homicide')||
        c.includes('murder'))&&<>
        <mesh position={[-5,0.35,-4.5]}
          castShadow receiveShadow>
          <boxGeometry args={[3.2,0.4,4.5]}/>
          <meshStandardMaterial color="#8B4513"
            roughness={0.8}/>
        </mesh>
        <mesh position={[-5,0.62,-6.4]}
          castShadow>
          <boxGeometry args={[3.2,0.28,0.5]}/>
          <meshStandardMaterial color="#fff"
            roughness={0.95}/>
        </mesh>
        <mesh position={[-5,0.62,-2.6]}
          castShadow>
          <boxGeometry args={[3.2,0.28,0.5]}/>
          <meshStandardMaterial color="#ddd"
            roughness={0.95}/>
        </mesh>
        <mesh position={[6,1.5,-6.5]}
          castShadow>
          <boxGeometry args={[1.4,3,0.55]}/>
          <meshStandardMaterial color="#5C3317"
            roughness={0.85}/>
        </mesh>
        <mesh position={[6,3.1,-6.5]}>
          <boxGeometry args={[1.4,0.08,0.55]}/>
          <meshStandardMaterial color="#4a2800"/>
        </mesh>
        <mesh position={[-3.2,0.32,-6.5]}
          castShadow>
          <boxGeometry args={[0.75,0.58,0.75]}/>
          <meshStandardMaterial color="#6B4423"
            roughness={0.7}/>
        </mesh>
        <mesh position={[-3.2,0.68,-6.5]}>
          <cylinderGeometry args={[0.04,0.04,0.8,8]}/>
          <meshStandardMaterial color="#888"
            metalness={0.6}/>
        </mesh>
        <mesh position={[-3.2,1.12,-6.5]}>
          <coneGeometry args={[0.22,0.3,12]}/>
          <meshStandardMaterial color="#FFFACD"
            emissive="#FFFACD"
            emissiveIntensity={isNight?1.5:0.2}/>
        </mesh>
        {isNight&&<pointLight
          position={[-3.2,1.2,-6.5]}
          color="#FFE8A0" intensity={2}
          distance={5}/>}
        <mesh position={[0,1.8,-6.8]}>
          <boxGeometry args={[2.5,1.5,0.08]}/>
          <meshStandardMaterial color="#050505"
            metalness={0.3}/>
        </mesh>
        <mesh position={[0,0.5,-6.6]}
          castShadow>
          <boxGeometry args={[1.5,1,0.4]}/>
          <meshStandardMaterial color="#1a1a1a"/>
        </mesh>
        <mesh position={[4,0.4,2]}
          castShadow>
          <boxGeometry args={[2.8,0.5,1]}/>
          <meshStandardMaterial color="#556B8B"
            roughness={0.8}/>
        </mesh>
        <mesh position={[4,0.9,2.45]}
          castShadow>
          <boxGeometry args={[2.8,0.8,0.18]}/>
          <meshStandardMaterial color="#445B7B"/>
        </mesh>
        <mesh rotation={[-Math.PI/2,0,0]}
          position={[1,0.01,0]}>
          <circleGeometry args={[2.8,32]}/>
          <meshStandardMaterial color="#8B1A1A"
            roughness={0.6}/>
        </mesh>
        <mesh position={[1,0.02,0]}
          rotation={[-Math.PI/2,0,0]}>
          <planeGeometry args={[4,3.5]}/>
          <meshStandardMaterial color="#992020"
            roughness={0.7} transparent
            opacity={0.6}/>
        </mesh>
      </>}

      {(c.includes('robbery')||
        c.includes('theft'))&&<>
        {[-5,-2.5,0,2.5].map((z,i)=>{
          const shelfY = [0.8,1.4,2.0];
          return (
          <group key={i}>
            <mesh position={[-8,1.2,z]}
              castShadow>
              <boxGeometry args={[0.25,2.4,2]}/>
              <meshStandardMaterial
                color="#8B6914"/>
            </mesh>
            {shelfY.map((y,j)=>{
              return (
              <mesh key={j}
                position={[-7.85,y,z]}>
                <boxGeometry args={[0.1,0.08,1.8]}/>
                <meshStandardMaterial
                  color="#9B7A3A"/>
              </mesh>
              );
            })}
          </group>
          );
        })}
        <mesh position={[0,0.55,-6.5]}
          castShadow>
          <boxGeometry args={[5,1.1,0.6]}/>
          <meshStandardMaterial color="#6B4423"/>
        </mesh>
      </>}

      <mesh position={[0,0.55,6.8]}>
        <boxGeometry args={[14,0.04,0.04]}/>
        <meshStandardMaterial color="#FFD700"
          emissive="#FF8800"
          emissiveIntensity={0.3}/>
      </mesh>
      <mesh position={[0,0.65,6.8]}>
        <boxGeometry args={[14,0.04,0.04]}/>
        <meshStandardMaterial color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={0.3}/>
      </mesh>
    </>
  );
}

function EvidenceMarkers({items,t}){
  const hasWeapon = items.some(it=>
    it.toLowerCase().includes('knife')||
    it.toLowerCase().includes('weapon')||
    it.toLowerCase().includes('blade')
  );
  return(
    <>
      {hasWeapon&&(
        <group position={[-0.1,0,0.5]}>
          <mesh position={[0,0.22,0]}
            scale={[1,1+Math.sin((t||0)*3)*0.12,1]}>
            <coneGeometry args={[0.13,0.38,8]}/>
            <meshStandardMaterial
              color="#FF0000"
              emissive="#FF0000"
              emissiveIntensity={0.8}/>
          </mesh>
          <pointLight position={[0,0.5,0]}
            color="#FF0000" intensity={2}
            distance={3}/>
          <Html position={[0,0.9,0]} center>
            <div style={{
              background:'rgba(26,0,0,0.95)',
              color:'#FF0000',
              padding:'4px 10px',
              borderRadius:5,
              fontSize:12,
              fontFamily:'monospace',
              border:'1px solid #FF0000',
              whiteSpace:'nowrap',
              fontWeight:'bold',
              textShadow:'0 0 8px #FF0000',
              boxShadow:'0 0 12px #FF000044'
            }}>MURDER WEAPON</div>
          </Html>
        </group>
      )}
      {items.map((item,i)=>{
        const x=(i-items.length/2)*2.2;
        const pulse=1+Math.sin((t||0)*3+i)*0.12;
        return(
          <group key={i}
            position={[x,0,5]}>
            <mesh position={[0,0.22,0]}
              scale={[1,pulse,1]}>
              <coneGeometry args={[0.13,0.38,8]}/>
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FF8800"
                emissiveIntensity={0.5}/>
            </mesh>
            <mesh position={[0,0,0]}
              rotation={[-Math.PI/2,0,0]}>
              <circleGeometry args={[0.18,16]}/>
              <meshStandardMaterial
                color="#FFD700" transparent
                opacity={0.3}/>
            </mesh>
            <pointLight position={[0,0.5,0]}
              color="#FF8800" intensity={0.8}
              distance={2}/>
            <Html position={[0,0.9,0]} center>
              <div style={{
                background:'rgba(0,0,0,0.92)',
                color:'#FFD700',
                padding:'4px 10px',
                borderRadius:5,
                fontSize:12,
                fontFamily:'monospace',
                border:'1px solid #FFD700',
                whiteSpace:'nowrap',
                fontWeight:'bold',
                textShadow:'0 0 6px #FF8800',
                boxShadow:'0 0 8px #FF880044'
              }}>{i+1}. {item}</div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

function Scene3D({data,isNight,isGun,isStreet}){
  const {crime_type='',
    attacker_present=true,
    victim_present=true,
    evidence_items=[],
    severity_score=7,
    weapon_type='knife'} = data;

  const [stage,setStage]=useState(0);
  const [weaponDropped,setWeaponDropped]=useState(false);
  const [knifePos,setKnifePos]=useState({x:0.45,z:0,rot:-0.5});
  const t=useRef(0);
  const suspectG=useRef();
  const victimG=useRef();
  const redL=useRef();
  const sLL=useRef(),sRL=useRef();
  const sLA=useRef(),sRA=useRef();
  const sTorso=useRef();
  const muzzle=useRef();
  const camTarget=useRef(new THREE.Vector3(1,2.5,7));

  useFrame((state,delta)=>{
    t.current+=delta;
    const time=t.current;

    if(time>0&&stage<1) setStage(1);
    if(time>5&&stage<2) setStage(2);
    if(time>10&&stage<3) setStage(3);
    if(time>14&&stage<4){
      setStage(4);
      setWeaponDropped(true);
    }
    if(time>18&&stage<5) setStage(5);

    const targetCamPos = isStreet?(
      stage<=1?new THREE.Vector3(2,2,6):
      stage===2?new THREE.Vector3(1.5,1.8,5):
      stage===3?new THREE.Vector3(1,1.5,4):
      stage===4?new THREE.Vector3(0.5,2,4):
      new THREE.Vector3(
        Math.sin(time*0.22)*4.5,
        3.5,
        Math.cos(time*0.22)*4.5+2
      )
    ):(
      stage<=1?new THREE.Vector3(1,2.5,7):
      stage===2?new THREE.Vector3(0,2,5):
      stage===3?new THREE.Vector3(0.5,1.5,3.5):
      stage===4?new THREE.Vector3(0,3,4):
      new THREE.Vector3(
        Math.sin(time*0.22)*4.5,
        3.5,
        Math.cos(time*0.22)*4.5+2
      )
    );
    state.camera.position.lerp(targetCamPos,0.02);

    if(stage>=1&&stage<=2&&suspectG.current){
      suspectG.current.position.z=Math.max(
        suspectG.current.position.z-0.02,1.2);
      const targ=new THREE.Vector3(0,0,0);
      const dir=targ.clone().sub(
        suspectG.current.position);
      suspectG.current.rotation.y=
        Math.atan2(dir.x,dir.z);
      if(sLL.current)
        sLL.current.rotation.x=
          Math.sin(time*6)*0.55;
      if(sRL.current)
        sRL.current.rotation.x=
          -Math.sin(time*6)*0.55;
      if(sLA.current)
        sLA.current.rotation.x=
          -Math.sin(time*6)*0.35;
      if(sRA.current)
        sRA.current.rotation.x=
          Math.sin(time*6)*0.35;
      if(sTorso.current)
        sTorso.current.rotation.z=
          Math.sin(time*6)*0.04;
    }

    if(stage===3){
      if(redL.current)
        redL.current.intensity=Math.min(
          (redL.current.intensity||0)+0.15,8);
      state.camera.position.x+=
        (Math.random()-0.5)*0.06;
      state.camera.position.y+=
        (Math.random()-0.5)*0.03;
      if(sRA.current)
        sRA.current.rotation.x=
          -2.5+Math.sin(time*15)*1.0;
      if(suspectG.current&&suspectG.current.position.z>1.2)
        suspectG.current.position.z-=0.008;
      if(isGun&&muzzle.current)
        muzzle.current.intensity=
          Math.sin(time*20)>0?10:0;
      if(!isGun){
        const slashPhase = (time*10)%1;
        const slashX = slashPhase<0.5?
          0.45-slashPhase*1.3:
          -0.2+(slashPhase-0.5)*1.3;
        setKnifePos({x:slashX,z:0,rot:-0.5+slashPhase*0.5});
      }
      if(victimG.current){
        victimG.current.position.z+=0.008;
        victimG.current.rotation.z=Math.sin(time*4)*0.08;
      }
    }

    if(stage===4||stage===5){
      if(victimG.current){
        victimG.current.rotation.z=Math.min(
          victimG.current.rotation.z+0.025,
          Math.PI/2);
        victimG.current.position.y=Math.max(
          victimG.current.position.y-0.012,-0.1);
      }
      if(redL.current)
        redL.current.intensity=Math.max(
          redL.current.intensity-0.05,1);
      if(suspectG.current){
        suspectG.current.position.z=Math.max(
          suspectG.current.position.z,1.0);
        suspectG.current.rotation.x=0.2;
      }
    }

    if(stage>=5&&suspectG.current&&time>25){
      suspectG.current.position.z-=0.015;
      suspectG.current.rotation.y=Math.PI;
    }

    if(redL.current&&stage===5)
      redL.current.intensity*=0.98;

    if(stage<5)
      state.camera.lookAt(0,0.8,0);
    else
      state.camera.lookAt(0,0,0);
  });

  return(
    <>
      <ambientLight
        color={isNight?'#0a0a20':'#ffffff'}
        intensity={isNight?0.35:1.4}/>
      <directionalLight
        position={[6,10,4]} intensity={2}
        color={isNight?'#3344aa':'#ffffff'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}/>
      <spotLight position={[0,7,3]}
        intensity={4} color="#ffffff"
        castShadow angle={0.45}
        penumbra={0.6}
        target-position={[0,0,0]}/>
      <pointLight ref={redL}
        position={[0,2,1]}
        color="#FF1100" intensity={0}/>
      <pointLight position={[-4,2,-2]}
        color="#4466FF" intensity={0.7}/>
      {isGun&&(
        <pointLight ref={muzzle}
          position={[0.8,1.6,0.8]}
          color="#FF8800" intensity={0}/>
      )}

      <fog attach="fog"
        args={[isNight?'#000010':'#000510',
          12,28]}/>

      <Room crimeType={crime_type}
        isNight={isNight} isStreet={isStreet}/>

      {attacker_present&&(
        <group ref={suspectG}
          position={[0.3,0,4]}>
          <Human
            color="#CC0000"
            shirtColor="#8B0000"
            position={[0,0,0]}
            leftLegR={sLL}
            rightLegR={sRL}
            leftArmR={sLA}
            rightArmR={sRA}
            torsoR={sTorso}/>
          {stage<4&&!weaponDropped&&(
            isGun?
              <RealisticGun
                position={[0.45,0.95,0]}/> :
              <RealisticKnife
                position={[knifePos.x,0.92,knifePos.z]}
                rotation={[0,0,knifePos.rot]}/>
          )}
        </group>
      )}

      {victim_present&&(
        <group ref={victimG}
          position={[-0.2,0,0]}>
          <Human
            color="#1a3a8f"
            shirtColor="#1a3a8f"
            position={[0,0,0]}/>
        </group>
      )}

      {weaponDropped&&(
        <group>
          {!isGun?(
            <>
              <RealisticKnife
                position={[-0.1,0.02,0.5]}
                rotation={[-Math.PI/2,0,0.8]}/>
              <mesh rotation={[-Math.PI/2,0,0]}
                position={[-0.1,0.01,0.5]}>
                <ringGeometry args={[0.25,0.3,32]}/>
                <meshStandardMaterial color="#FFD700"
                  emissive="#FF8800" emissiveIntensity={0.8}/>
              </mesh>
            </>
          ):(
            <>
              <RealisticGun
                position={[-0.1,0.05,0.5]}/>
              <mesh rotation={[-Math.PI/2,0,0]}
                position={[-0.1,0.01,0.5]}>
                <ringGeometry args={[0.25,0.3,32]}/>
                <meshStandardMaterial color="#FFD700"
                  emissive="#FF8800" emissiveIntensity={0.8}/>
              </mesh>
            </>
          )}
          <pointLight
            position={[-0.1,0.5,0.5]}
            color="#FF0000" intensity={2}/>
        </group>
      )}

      <BloodSystem
        position={[-0.2,0,0.2]}
        severity={severity_score}
        visible={stage>=4&&severity_score>4}/>

      <EvidenceMarkers
        items={evidence_items}
        t={t.current}/>

      <Html position={[0,5.5,0]} center>
        <div style={{
          fontFamily:'monospace',
          fontSize:15,fontWeight:'bold',
          letterSpacing:3,
          padding:'10px 28px',
          borderRadius:6,
          textAlign:'center',
          minWidth:380,
          background:stage===0?'rgba(0,26,0,0.95)':
            stage===1?'rgba(26,13,0,0.95)':
            stage===2?'rgba(26,8,0,0.95)':
            stage===3?'rgba(26,0,0,0.95)':
            stage===4?'rgba(26,0,0,0.95)':
            'rgba(0,26,8,0.95)',
          color:stage===0?'#00FF88':
            stage===1?'#FFA500':
            stage===2?'#FF6600':
            stage===3?'#FF0000':
            stage===4?'#FF4444':'#00FF88',
          border:`2px solid ${
            stage===0?'#00FF88':
            stage===1?'#FFA500':
            stage===2?'#FF6600':
            stage===3?'#FF0000':
            stage===4?'#FF4444':'#00FF88'}`,
          textShadow:`0 0 12px ${
            stage===0?'#00FF88':
            stage===1?'#FFA500':
            stage===2?'#FF6600':
            stage===3?'#FF0000':
            stage===4?'#FF4444':'#00FF88'}`,
          animation:stage===3?
            'pulse 0.4s infinite':undefined
        }}>
          {isStreet?[
            'FORENSIQ SCANNING STREET SCENE',
            'SUSPECT IDENTIFIED',
            'APPROACHING TARGET',
            'THEFT IN PROGRESS',
            'VICTIM STUMBLES',
            'SUSPECT FLEES WITH STOLEN ITEM'
          ]:[
            'FORENSIQ — SCANNING SCENE',
            'SUSPECT ENTERS — MOVEMENT DETECTED',
            'TARGET ACQUIRED — APPROACHING VICTIM',
            '⚠ ASSAULT IN PROGRESS — '+weapon_type.toUpperCase(),
            'VICTIM DOWN — EVIDENCE FORMING',
            '✓ RECONSTRUCTION COMPLETE — '+evidence_items.length+' EVIDENCE POINTS'
          ][stage]}
        </div>
      </Html>
    </>
  );
}

function ARHUD({data,stage,isGun,t}){
  const {crime_type='',threat_level='HIGH',
    evidence_items=[],severity_score=5,
    weapon_type='none'} = data;
  const tc={CRITICAL:'#FF0000',
    HIGH:'#FF6600',MEDIUM:'#FFD700',
    LOW:'#00FF88'};
  const c=tc[threat_level]||'#FF6600';
  const showMuzzle = isGun&&stage===3&&
    Math.sin((t||0)*0.02)>0.8;
  return(
    <>
      <style>{`
        @keyframes scanline{
          0%{top:0%}100%{top:95%}}
        @keyframes pulse{
          0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes blink{
          0%,100%{opacity:1}50%{opacity:0.5}}
      `}</style>
      {showMuzzle&&(
        <div style={{
          position:'absolute',
          top:0,left:0,right:0,bottom:0,
          background:'#fff',
          opacity:0.15,
          pointerEvents:'none',
          zIndex:100,
          transition:'opacity 0.05s'
        }}/>
      )}

      <div style={{position:'absolute',
        top:16,left:16,
        fontFamily:'monospace',fontSize:12,
        color:'#00FF88',lineHeight:1.9,
        background:'rgba(0,10,0,0.75)',
        padding:'10px 14px',borderRadius:6,
        border:'1px solid #00FF8855',
        backdropFilter:'blur(4px)',
        textShadow:'0 0 6px #00FF88'}}>
        <div style={{color:'#00FF88',
          fontSize:13,fontWeight:'bold',
          marginBottom:4,letterSpacing:2}}>
          FORENSIQ AR v2.0
        </div>
        CASE:{' '}
        <span style={{color:'#fff'}}>
          {crime_type.toUpperCase()}</span><br/>
        THREAT:{' '}
        <span style={{color:c,
          fontWeight:'bold'}}>
          {threat_level}</span><br/>
        WEAPON:{' '}
        <span style={{color:'#FFD700'}}>
          {weapon_type.toUpperCase()}</span><br/>
        EVIDENCE:{' '}
        <span style={{color:'#fff'}}>
          {evidence_items.length} ITEMS</span><br/>
        SEVERITY:{' '}
        <span style={{color:c}}>
          {severity_score}/10</span>
      </div>

      <div style={{position:'absolute',
        top:16,right:16,
        fontFamily:'monospace',fontSize:12,
        color:'#00FF88',lineHeight:1.9,
        textAlign:'right',
        background:'rgba(0,10,0,0.75)',
        padding:'10px 14px',borderRadius:6,
        border:'1px solid #00FF8855',
        backdropFilter:'blur(4px)',
        textShadow:'0 0 6px #00FF88'}}>
        <div style={{color:'#00FF88',
          fontSize:13,fontWeight:'bold',
          marginBottom:4,letterSpacing:2}}>
          AI SCAN
        </div>
        STATUS:{' '}
        <span style={{
          color:stage<5?'#FFA500':'#00FF88',
          animation:stage<5?
            'blink 1s infinite':undefined}}>
          {stage<5?'RECONSTRUCTING':'COMPLETE'}
        </span><br/>
        STAGE:{' '}
        <span style={{color:'#fff'}}>
          {stage}/5</span><br/>
        {new Date().toLocaleTimeString()}<br/>
        <span style={{color:'#666',
          fontSize:10}}>
          FORENSIQ INTELLIGENCE v2.0
        </span>
      </div>

      {[['top:10px','left:10px',
          'borderTop','borderLeft'],
        ['top:10px','right:10px',
          'borderTop','borderRight'],
        ['bottom:80px','left:10px',
          'borderBottom','borderLeft'],
        ['bottom:80px','right:10px',
          'borderBottom','borderRight']
      ].map(([t,s,b1,b2],i)=>{
        const topBottom = t.split(':')[0];
        const leftRight = s.split(':')[0];
        const topBottomVal = t.split(':')[1];
        const leftRightVal = s.split(':')[1];
        const style = {
          position:'absolute',
          [topBottom]:topBottomVal,
          [leftRight]:leftRightVal,
          width:44,height:44,
          [b1]:'2px solid #00FF88',
          [b2]:'2px solid #00FF88',
          opacity:0.7
        };
        return <div key={i} style={style}/>;
      })}

      <div style={{
        position:'absolute',left:0,right:0,
        height:1,
        background:
          'linear-gradient(90deg,transparent,'+
          '#00FF8866,transparent)',
        animation:'scanline 4s linear infinite',
        pointerEvents:'none'}}/>

      <div style={{
        position:'absolute',
        bottom:0,left:0,right:0,
        background:'rgba(0,0,0,0.92)',
        padding:'12px 20px 14px',
        borderTop:'2px solid #FF6600'}}>
        <div style={{display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          marginBottom:8}}>
          <span style={{
            background:
              threat_level==='CRITICAL'?
                '#FF0000':
              threat_level==='HIGH'?
                '#FF6600':
              threat_level==='MEDIUM'?
                '#FFD700':'#00FF88',
            color:'#000',
            padding:'4px 12px',
            borderRadius:4,fontSize:12,
            fontFamily:'monospace',
            fontWeight:'bold',letterSpacing:1}}>
            {crime_type.toUpperCase()} | {threat_level}
          </span>
          <div style={{display:'flex',
            gap:6,alignItems:'center'}}>
            <span style={{color:'#666',
              fontSize:11,fontFamily:'monospace',
              marginRight:4}}>
              TIMELINE
            </span>
            {['INIT','ENTER','APPROACH',
              'ATTACK','DOWN','SECURED'
            ].map((l,i)=>{
              const isActive = stage>=i;
              let bg = '#222';
              if (isActive) {
                bg = i===3?'#FF0000':
                     i>=4?'#FF6600':'#FF8800';
              }
              const boxShadow = isActive?
                `0 0 6px ${i===3?'#FF0000':'#FF8800'}`:'none';
              const labelColor = isActive?'#FF8800':'#333';
              return (
              <div key={i} style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',gap:2}}>
                <div style={{
                  width:52,height:5,
                  borderRadius:3,
                  background:bg,
                  transition:'background 0.5s',
                  boxShadow:boxShadow
                }}/>
                <span style={{
                  color:labelColor,
                  fontSize:8,
                  fontFamily:'monospace'}}>
                  {l}
                </span>
              </div>
              );
            })}
          </div>
        </div>
        <div style={{color:'#00FF88',
          fontSize:10,fontFamily:'monospace',
          letterSpacing:1,marginBottom:5}}>
          AI SCENE NARRATIVE
        </div>
        <div style={{color:'#ccc',fontSize:12,
          fontFamily:'monospace',
          lineHeight:1.65,
          maxHeight:52,overflow:'hidden'}}>
          {data.reconstructed_narrative||
            'Analyzing crime scene data...'}
        </div>
      </div>
    </>
  );
}

export default function CrimeScene3D(){
  const data=JSON.parse(
    localStorage.getItem('forensiqCase')||'{}');
  const {scene_description='',
    weapon_type='knife',crime_type=''} = data;
  const isNight=scene_description
    .toLowerCase().includes('night')||
    scene_description.toLowerCase()
    .includes('dark')||scene_description
    .toLowerCase().includes('evening');
  const isGun=weapon_type.toLowerCase()
    .includes('gun')||weapon_type.toLowerCase()
    .includes('fire')||weapon_type.toLowerCase()
    .includes('shoot');
  const isStreet=crime_type.toLowerCase()
    .includes('robbery')||crime_type.toLowerCase()
    .includes('theft')||crime_type.toLowerCase()
    .includes('bag');
  const [stage,setStage]=useState(0);

  return(
    <div style={{width:'100%',height:'100vh',
      background:'#000010',position:'relative',
      overflow:'hidden'}}>
      <Canvas shadows
        camera={{position:isStreet?[2,2,6]:[0,3,6],fov:55}}
        gl={{antialias:true}}
        style={{width:'100%',height:'100%'}}>
        <Scene3D data={data}
          isNight={isNight} isGun={isGun} isStreet={isStreet}/>
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={14}
          maxPolarAngle={Math.PI/2.1}/>
      </Canvas>
      <ARHUD data={data} stage={stage} isGun={isGun} t={stage>=3?Date.now():0}/>
    </div>
  );
}
