import { isOutdoorEnv } from '../../utils/resolveEnvironment'

/** Minimum fill + environment-specific lights — no photo backgrounds */
export default function SceneLighting({ envType = 'HOUSE', isNight = false }) {
  const outdoor = isOutdoorEnv(envType)

  return (
    <>
      <ambientLight intensity={0.5} color="#8899BB" />

      {envType === 'HOUSE' || envType === 'APARTMENT' ? (
        isNight ? (
          <>
            <pointLight position={[0, 2.8, 0]} intensity={2.2} color="#FFF5E0" castShadow distance={8} />
            <pointLight position={[-2, 2, -4]} intensity={0.8} color="#FF9940" distance={6} />
          </>
        ) : (
          <>
            <ambientLight intensity={0.4} color="#E8F4FD" />
            <directionalLight position={[3, 6, 4]} intensity={1.8} castShadow />
          </>
        )
      ) : null}

      {envType === 'STREET' ? (
        isNight ? (
          <ambientLight intensity={0.15} color="#1a2040" />
        ) : (
          <>
            <directionalLight position={[5, 10, 3]} intensity={2.2} color="#FFF8E7" castShadow />
            <ambientLight intensity={0.3} color="#E8F4FD" />
          </>
        )
      ) : null}

      {envType === 'ALLEY' ? <ambientLight intensity={0.12} color="#1a1a2a" /> : null}

      {envType === 'OFFICE' || envType === 'STORE' ? (
        <ambientLight intensity={0.6} color="#F0F0E8" />
      ) : null}

      {envType === 'WAREHOUSE' || envType === 'PARKING_LOT' ? (
        isNight ? (
          <ambientLight intensity={0.2} color="#1a2040" />
        ) : (
          <directionalLight position={[5, 8, 3]} intensity={1.5} castShadow />
        )
      ) : null}

      {!outdoor && envType !== 'HOUSE' && envType !== 'APARTMENT' && (
        <pointLight position={[0, 3, 0]} intensity={1.2} color="#FFD580" distance={8} decay={2} />
      )}

      <hemisphereLight
        skyColor={isNight ? '#0a1020' : '#87CEEB'}
        groundColor={isNight ? '#1a0a00' : '#8B7355'}
        intensity={outdoor ? 0.35 : 0.45}
      />
    </>
  )
}
