const badgeBase = {
  position: 'fixed',
  fontFamily: 'Courier New, monospace',
  background: 'rgba(0,0,0,0.8)',
  borderRadius: '4px',
  padding: '8px 14px',
  zIndex: 150,
}

export function SceneInfoBadges({
  timeOfCrime,
  dayOfWeek,
  incidentDate,
  address,
  locationType,
  envType,
  weaponType,
  weaponVisible,
  witnessData,
  currentAct,
}) {
  const showWeapon = weaponVisible && currentAct >= 1

  return (
    <>
      <div
        style={{
          ...badgeBase,
          top: '132px',
          right: '260px',
          border: '1px solid rgba(255,215,0,0.5)',
        }}
      >
        <div style={{ color: '#FFD700', fontSize: '9px', letterSpacing: '2px' }}>TIME OF CRIME</div>
        <div style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 'bold' }}>{timeOfCrime || '??:??'}</div>
        <div style={{ color: '#94A3B8', fontSize: '10px' }}>
          {dayOfWeek || '—'} · {incidentDate || '—'}
        </div>
      </div>

      <div
        style={{
          ...badgeBase,
          top: '210px',
          right: '260px',
          border: '1px solid rgba(0,229,255,0.4)',
        }}
      >
        <div style={{ color: '#00E5FF', fontSize: '9px', letterSpacing: '2px' }}>INCIDENT LOCATION</div>
        <div style={{ color: '#FFFFFF', fontSize: '11px', lineHeight: 1.4, maxWidth: 200 }}>{address || '—'}</div>
        <div style={{ color: '#64748B', fontSize: '10px' }}>ENV: {envType || locationType}</div>
      </div>

      {showWeapon && (
        <div
          style={{
            ...badgeBase,
            top: '292px',
            right: '260px',
            border: '1px solid rgba(255,68,68,0.5)',
          }}
        >
          <div style={{ color: '#FF4444', fontSize: '9px', letterSpacing: '2px' }}>WEAPON IDENTIFIED</div>
          <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 'bold' }}>{weaponType}</div>
        </div>
      )}

      <div
        style={{
          ...badgeBase,
          top: '132px',
          left: '260px',
          border: '1px solid rgba(255,68,68,0.4)',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {(witnessData?.suspects || []).map((s, i) => (
            <div key={`s-${i}`} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px' }}>👤</div>
              <div style={{ color: '#FF6B6B', fontSize: '9px', letterSpacing: '1px' }}>SUSPECT {i + 1}</div>
              <div style={{ color: '#94A3B8', fontSize: '8px' }}>{s.role}</div>
            </div>
          ))}
          {(witnessData?.victims || []).map((v, i) => (
            <div key={`v-${i}`} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px' }}>🫥</div>
              <div style={{ color: '#94A3B8', fontSize: '9px', letterSpacing: '1px' }}>VICTIM {i + 1}</div>
              <div style={{ color: '#64748B', fontSize: '8px' }}>
                {v.wasSleeping ? 'ASLEEP' : v.wasSeated ? 'SEATED' : 'STANDING'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
