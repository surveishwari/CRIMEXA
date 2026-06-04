function DataRow({ label, value, highlight, sub }) {
  return (
    <div
      style={{
        marginBottom: '10px',
        borderLeft: highlight ? '2px solid var(--accent-cyan, #00E5FF)' : '2px solid #334155',
        paddingLeft: '8px',
      }}
    >
      <div
        style={{
          color: 'var(--text-muted, #64748B)',
          fontSize: '9px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: highlight ? 'var(--accent-cyan, #00E5FF)' : 'var(--text-primary, #FFFFFF)',
          fontSize: highlight ? '14px' : '13px',
          fontWeight: 600,
          marginTop: '2px',
          ...(highlight
            ? {
                background: 'rgba(0,229,255,0.08)',
                padding: '2px 6px',
                borderRadius: '3px',
                display: 'inline-block',
              }
            : {}),
        }}
      >
        {value ?? '—'}
      </div>
      {sub && (
        <div style={{ color: '#64748B', fontSize: '9px', marginTop: '4px', lineHeight: 1.3 }}>{sub}</div>
      )}
    </div>
  )
}

export default function CaseDataPanel({
  caseData,
  weaponConfig,
  multiSuspectNote,
  detectedObjects = [],
}) {
  const {
    caseId,
    caseType,
    address,
    locationType,
    envBasis,
    timeOfCrime,
    dayOfWeek,
    entryMethod,
    weaponType,
    numberOfSuspects,
    numberOfVictims,
    predictedCrime,
    mlConfidence,
    lightingLabel,
  } = caseData

  return (
    <div className="recon-right-panel">
      <div className="recon-panel-title">RECONSTRUCTION PARAMETERS</div>

      <DataRow label="CASE ID" value={caseId} />
      <DataRow label="CRIME TYPE" value={caseType} highlight />
      <DataRow label="LOCATION" value={address} />
      <DataRow label="ENV TYPE" value={locationType} highlight sub={envBasis ? `BASIS: ${envBasis}` : null} />
      <DataRow label="TIME" value={timeOfCrime} />
      <DataRow label="LIGHTING" value={lightingLabel} />
      <DataRow label="DAY" value={dayOfWeek} />
      <DataRow label="ENTRY" value={entryMethod} highlight />
      <DataRow label="WEAPON" value={weaponType || 'None'} highlight />
      <DataRow label="SUSPECTS" value={String(numberOfSuspects)} />
      <DataRow label="VICTIMS" value={String(numberOfVictims)} />
      <DataRow label="ML CRIME" value={predictedCrime} highlight />
      <DataRow label="CONFIDENCE" value={`${Math.round(mlConfidence || 0)}%`} />

      <div style={{ marginTop: '12px', borderTop: '1px solid #223', paddingTop: '10px' }}>
        <div
          style={{
            color: '#00E5FF',
            fontSize: '9px',
            letterSpacing: '2px',
            marginBottom: '6px',
          }}
        >
          AI DETECTED IN PHOTOS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {detectedObjects.length > 0 ? (
            detectedObjects.map((obj) => (
              <span
                key={obj}
                style={{
                  display: 'inline-block',
                  background: 'rgba(0,229,255,0.1)',
                  border: '1px solid rgba(0,229,255,0.3)',
                  color: '#00E5FF',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '2px',
                }}
              >
                {obj.toUpperCase()}
              </span>
            ))
          ) : (
            <span style={{ color: '#64748B', fontSize: '10px' }}>No photos analyzed yet</span>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: '9px', marginTop: '6px' }}>
          Photos used for YOLO only — not scene background
        </div>
      </div>

      {multiSuspectNote && <div className="recon-note-warn">{multiSuspectNote}</div>}

      <div className="recon-forensic-notes">
        FORENSIC NOTES
        <br />
        {weaponConfig?.forensicNote}
      </div>

      <div className="recon-confidence-warn">
        ⚠ RECONSTRUCTION CONFIDENCE
        <br />
        Based on {Math.round(mlConfidence || 0)}% ML prediction.
        <br />
        Actual sequence may vary.
      </div>
    </div>
  )
}
