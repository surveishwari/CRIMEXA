import { useRef } from 'react'
import * as THREE from 'three'

function Floor({ w, d, color, roughness = 0.85, metalness = 0 }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  )
}

function Wall({ pos, rot, w, h, color = '#D4C5A9' }) {
  return (
    <mesh position={pos} rotation={rot} castShadow receiveShadow>
      <boxGeometry args={w} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export function HouseEnvironment({ doorRef, outdoor = false }) {
  return (
    <group>
      {!outdoor && (
        <mesh position={[0, 3.2, 0]} receiveShadow>
          <boxGeometry args={[12, 0.15, 10]} />
          <meshStandardMaterial color="#2a2520" />
        </mesh>
      )}
      <Wall pos={[0, 1.5, -5]} rot={[0, 0, 0]} w={[12, 3, 0.2]} />
      <Wall pos={[0, 1.5, 5]} rot={[0, 0, 0]} w={[12, 3, 0.2]} />
      <Wall pos={[-6, 1.5, 0]} rot={[0, Math.PI / 2, 0]} w={[10, 3, 0.2]} />
      <Wall pos={[6, 1.5, 0]} rot={[0, Math.PI / 2, 0]} w={[10, 3, 0.2]} />
      <Floor w={12} d={10} color="#6B4F35" />
      <mesh position={[-1.8, 0.35, -2.2]} castShadow>
        <boxGeometry args={[2, 0.5, 2.8]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[-1.8, 0.65, -3.5]} castShadow>
        <boxGeometry args={[2.2, 0.9, 0.15]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      <mesh position={[3.5, 1.2, -4]} castShadow>
        <boxGeometry args={[1.2, 2.4, 0.6]} />
        <meshStandardMaterial color="#5c4a3a" />
      </mesh>
      <mesh position={[4.2, 0.5, -3.8]} castShadow>
        <boxGeometry args={[0.8, 0.4, 0.3]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[4.5, 1.8, -3.5]}>
        <planeGeometry args={[1.5, 1.2]} />
        <meshStandardMaterial color="#88aacc" transparent opacity={0.35} />
      </mesh>
      <mesh position={[4.5, 1.5, -3.48]}>
        <planeGeometry args={[1.4, 1.1]} />
        <meshStandardMaterial color="#E8DCC8" side={THREE.DoubleSide} />
      </mesh>
      <group ref={doorRef} position={[-5.85, 1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 2, 1.1]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
        <mesh position={[0.08, 0, 0.35]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

export function ApartmentEnvironment() {
  return (
    <group>
      <mesh position={[0, 2.8, 0]} receiveShadow>
        <boxGeometry args={[8, 0.12, 8]} />
        <meshStandardMaterial color="#3a3530" />
      </mesh>
      <Wall pos={[0, 1.4, -4]} rot={[0, 0, 0]} w={[8, 2.8, 0.12]} color="#C8C0B0" />
      <Wall pos={[0, 1.4, 4]} rot={[0, 0, 0]} w={[8, 2.8, 0.12]} color="#C8C0B0" />
      <Wall pos={[-4, 1.4, 0]} rot={[0, Math.PI / 2, 0]} w={[8, 2.8, 0.12]} color="#C8C0B0" />
      <Wall pos={[4, 1.4, 0]} rot={[0, Math.PI / 2, 0]} w={[8, 2.8, 0.12]} color="#C8C0B0" />
      <Floor w={8} d={8} color="#7a6a55" />
      <mesh position={[0, 0.35, 1]} castShadow>
        <boxGeometry args={[2.2, 0.7, 0.9]} />
        <meshStandardMaterial color="#6a5a4a" />
      </mesh>
      <mesh position={[0, 0.2, 2.2]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
        <meshStandardMaterial color="#4a3a2a" />
      </mesh>
      <mesh position={[3.2, 0.9, -3.5]}>
        <planeGeometry args={[1, 1.2]} />
        <meshStandardMaterial color="#99bbdd" transparent opacity={0.3} />
      </mesh>
      {[-0.4, 0, 0.4].map((x, i) => (
        <mesh key={i} position={[3.2 + x, 1.2, -3.48]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.1]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
      <mesh position={[2.5, 0.5, -3.8]} castShadow>
        <boxGeometry args={[1.5, 0.9, 0.5]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </group>
  )
}

export function OfficeEnvironment() {
  return (
    <group>
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[14, 0.08, 12]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>
      {[-4, 0, 4].map((x, i) => (
        <group key={i} position={[x, 0, -2 + i * 2]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.4, 0.05, 0.8]} />
            <meshStandardMaterial color="#666" />
          </mesh>
          <mesh position={[0, 0.55, -0.15]} castShadow>
            <boxGeometry args={[0.5, 0.35, 0.04]} />
            <meshStandardMaterial color="#111" emissive="#2244aa" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
      <Wall pos={[0, 1.5, -6]} rot={[0, 0, 0]} w={[14, 3, 0.15]} color="#bbb" />
      <Wall pos={[-7, 1.5, 0]} rot={[0, Math.PI / 2, 0]} w={[12, 3, 0.15]} color="#ccc" />
      <mesh position={[3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[12, 3]} />
        <meshStandardMaterial color="#aaccff" transparent opacity={0.25} />
      </mesh>
      <Floor w={14} d={12} color="#8A8A8A" roughness={0.95} />
      <mesh position={[-6, 1, 4]} castShadow>
        <boxGeometry args={[0.6, 2, 0.5]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0, 2.95, 0]}>
        <boxGeometry args={[12, 0.05, 0.4]} />
        <meshStandardMaterial emissive="#ffffee" emissiveIntensity={1.2} color="#ffffee" />
      </mesh>
    </group>
  )
}

export function StoreEnvironment() {
  return (
    <group>
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[16, 0.1, 14]} />
        <meshStandardMaterial color="#f0f0f0" emissive="#F5F5F0" emissiveIntensity={0.4} />
      </mesh>
      <Floor w={16} d={14} color="#E0E0E0" roughness={0.4} />
      {[-4, 0, 4].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -4]} castShadow>
          <boxGeometry args={[2, 3, 0.4]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      ))}
      <mesh position={[0, 0.9, 5.5]} castShadow>
        <boxGeometry args={[4, 1.8, 1]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[5, 3.2, -5]}>
        <cylinderGeometry args={[0.08, 0.12, 0.2]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[5, 3.35, -5]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  )
}

export function AlleyEnvironment() {
  return (
    <group>
      <Floor w={6} d={18} color="#2a2a2a" roughness={0.3} metalness={0.1} />
      {[-2.8, 2.8].map((x, side) => (
        <group key={side} position={[x, 1.5, 0]}>
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <mesh
                key={`${row}-${col}`}
                position={[0, row * 0.25 - 0.5, col * 0.35 - 2]}
                castShadow
              >
                <boxGeometry args={[0.35, 0.22, 0.18]} />
                <meshStandardMaterial color={(row + col) % 2 ? '#7a4a2a' : '#8B4513'} />
              </mesh>
            ))
          )}
        </group>
      ))}
      <mesh position={[1.5, 0.6, -3]} castShadow>
        <boxGeometry args={[1.8, 1.2, 1]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
      <mesh position={[-2.5, 1.2, -4]} rotation={[0, 0.1, 0]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial color="#ff44aa" emissive="#ff2288" emissiveIntensity={0.2} />
      </mesh>
      <spotLight position={[0, 5, 2]} angle={0.5} penumbra={0.5} intensity={2} color="#ffdd99" castShadow />
    </group>
  )
}

export function ParkingLotEnvironment() {
  return (
    <group>
      <Floor w={24} d={20} color="#333333" />
      {[-6, 0, 6].map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 0.08]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      {[-5, 3].map((x, i) => (
        <group key={i} position={[x, 0.35, -2 + i * 4]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.6, 3.8]} />
            <meshStandardMaterial color={i ? '#334455' : '#223344'} />
          </mesh>
          {[[-0.7, -1.2], [0.7, -1.2], [-0.7, 1.2], [0.7, 1.2]].map(([wx, wz], wi) => (
            <mesh key={wi} position={[wx, 0.15, wz]}>
              <cylinderGeometry args={[0.25, 0.25, 0.15]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[8, 4, -8]}>
        <cylinderGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <pointLight position={[8, 7.5, -8]} intensity={3} color="#ffffcc" distance={15} />
      <mesh position={[0, 15, -15]} scale={[-1, 1, 1]}>
        <sphereGeometry args={[30, 16, 16]} />
        <meshBasicMaterial color="#0a1028" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 2, -10]} rotation={[0, 0, 0]}>
        <planeGeometry args={[40, 4]} />
        <meshBasicMaterial color="#556677" wireframe />
      </mesh>
    </group>
  )
}

export function StreetEnvironment() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 3]} receiveShadow>
        <planeGeometry args={[30, 6]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[30, 0.12, 0.2]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      {[-8, 8].map((x, i) => (
        <group key={i} position={[x, 2, -4]}>
          <mesh castShadow>
            <boxGeometry args={[4, 5, 0.5]} />
            <meshStandardMaterial color="#4a4a55" />
          </mesh>
          {[-1, 0, 1].map((wy, wi) => (
            <mesh key={wi} position={[0, wy * 1.2 + 0.5, 0.26]}>
              <boxGeometry args={[0.6, 0.5, 0.05]} />
              <meshStandardMaterial emissive="#ffcc88" emissiveIntensity={0.5} color="#ffeebb" />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[2, 0.35, 2]} castShadow>
        <boxGeometry args={[1.6, 0.5, 3.2]} />
        <meshStandardMaterial color="#334455" />
      </mesh>
      <pointLight position={[-8, 4, -4]} intensity={1.5} color="#ffaa66" distance={12} />
      <pointLight position={[8, 4, -4]} intensity={1.5} color="#ffaa66" distance={12} />
    </group>
  )
}

export function WarehouseEnvironment() {
  return (
    <group>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[20, 0.2, 15]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      {[-8, 0, 8].map((x, i) => (
        <mesh key={i} position={[x, 3.9, 0]} castShadow>
          <boxGeometry args={[0.3, 0.4, 15]} />
          <meshStandardMaterial color="#555" metalness={0.6} />
        </mesh>
      ))}
      <Floor w={20} d={15} color="#4a4a4a" />
      <mesh position={[0, 2, -7.4]} castShadow>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#666" metalness={0.4} />
      </mesh>
      {[
        [-4, -2],
        [-4, 1],
        [2, -3],
        [3, 2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z]} castShadow>
          <boxGeometry args={[0.9, 0.8, 0.9]} />
          <meshStandardMaterial color="#8B6914" />
        </mesh>
      ))}
      <pointLight position={[-5, 6, 0]} intensity={1.2} color="#ffffee" distance={12} />
      <pointLight position={[5, 6, 3]} intensity={0.8} color="#ffffee" distance={10} />
    </group>
  )
}
