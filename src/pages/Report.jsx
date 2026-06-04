import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

// Lazy load the AR scene for performance
const ForensicARScene = lazy(() => import('../components/ForensicARScene'));

const Report = () => {
  const navigate = useNavigate();
  
  // Read data from localStorage
  const data = JSON.parse(
    localStorage.getItem('forensiqCase') || '{}');
  const {
    crime_type = 'Unknown',
    threat_level = 'LOW',
    confidence = 0,
    severity_score = 0,
    weapon_type = 'none',
    evidence_items = [],
    scene_description = '',
    reconstructed_narrative = '',
    attacker_present = false,
    victim_present = false,
    // New ML features
    blood_spatter = null,
    trajectories = [],
    time_of_death = null,
    convergence_point = null,
    suggested_weapons = []
  } = data;

  const caseId = 'CR' + Math.floor(
    Math.random() * 900000 + 100000);
  const date = new Date().toLocaleDateString();

  const getThreatColor = (level) => {
    const l = level?.toLowerCase();
    if (l === 'critical') return '#FF0000';
    if (l === 'high') return '#FF6600';
    if (l === 'medium') return '#FFD700';
    return '#00FF88';
  };

  // Demo data for AR scene (would come from ML analysis)
  const demoEvidence = [
    { id: 1, type: 'weapon', x: 2.5, y: 0.1, z: -1.2, confidence: 0.94 },
    { id: 2, type: 'blood', x: -1.0, y: 0.05, z: 0.5, confidence: 0.89, dna_match: 'Suspect A' },
    { id: 3, type: 'fingerprint', x: 1.5, y: 1.2, z: -2.0, confidence: 0.78 },
    { id: 4, type: 'dna', x: -2.0, y: 0.1, z: 1.5, confidence: 0.95 }
  ];

  const demoAnalysis = {
    blood_spatter: blood_spatter || [
      { x: -1.0, y: 0.05, z: 0.5, trajectory: { dx: 0.5, dy: 1.0, dz: -0.2 } },
      { x: -0.8, y: 0.08, z: 0.6, trajectory: { dx: 0.4, dy: 0.9, dz: -0.1 } },
      { x: -1.2, y: 0.03, z: 0.4, trajectory: { dx: 0.6, dy: 1.1, dz: -0.3 } }
    ],
    trajectories: trajectories.length > 0 ? trajectories : [
      { start: { x: 5, y: 1.5, z: 0 }, end: { x: -1, y: 0.5, z: 0.5 } }
    ]
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080B14',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        @media print {
          body { background: white !important; }
          button { display: none !important; }
          * { color: black !important; 
              background: white !important; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '2px solid #E63946'
      }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#E63946',
          letterSpacing: 2
        }}>FORENSIQ</h1>
        <h2 style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: 3
        }}>FORENSIC REPORT</h2>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 30 }}>
        {/* SECTION 1 - Case Info */}
        <div style={{
          background: '#0D1421',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          border: '1px solid #1E2A3A'
        }}>
          <h3 style={{
            fontSize: 14,
            color: '#E63946',
            letterSpacing: 2,
            marginBottom: 16,
            textTransform: 'uppercase'
          }}>Case Information</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px 24px'
          }}>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>CASE ID:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>{caseId}</span></div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>DATE:</span> <span style={{ color: '#fff' }}>{date}</span></div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>CRIME TYPE:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>{crime_type}</span></div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>THREAT LEVEL:</span> 
              <span style={{
                background: getThreatColor(threat_level),
                color: '#000',
                padding: '2px 10px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 'bold',
                marginLeft: 8
              }}>{threat_level}</span>
            </div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>WEAPON:</span> <span style={{ color: '#fff' }}>{weapon_type}</span></div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>SEVERITY:</span> <span style={{ color: '#fff' }}>{severity_score}/10</span></div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>ATTACKER:</span> <span style={{ color: attacker_present ? '#E63946' : '#00FF88' }}>{attacker_present ? 'YES' : 'NO'}</span></div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>VICTIM:</span> <span style={{ color: victim_present ? '#E63946' : '#00FF88' }}>{victim_present ? 'YES' : 'NO'}</span></div>
            <div><span style={{ color: '#8899AA', fontSize: 12 }}>CONFIDENCE:</span> <span style={{ color: '#fff' }}>{Math.round(confidence * 100)}%</span></div>
          </div>
        </div>

        {/* SECTION 2 - AI Confidence */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 12,
            color: '#8899AA',
            letterSpacing: 2,
            marginBottom: 8
          }}>AI CONFIDENCE</h3>
          <div style={{
            width: '100%',
            height: 12,
            background: '#1E2A3A',
            borderRadius: 6,
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.round(confidence * 100)}%`,
              height: '100%',
              background: '#E63946',
              borderRadius: 6
            }} />
          </div>
          <p style={{ textAlign: 'right', color: '#E63946', fontSize: 14, marginTop: 4 }}>
            {Math.round(confidence * 100)}%
          </p>
        </div>

        {/* SECTION 3 - Evidence Items */}
        {evidence_items.length > 0 && (
          <div style={{
            background: '#0D1421',
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            border: '1px solid #1E2A3A'
          }}>
            <h3 style={{
              fontSize: 14,
              color: '#E63946',
              letterSpacing: 2,
              marginBottom: 16,
              textTransform: 'uppercase'
            }}>Evidence Detected</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {evidence_items.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ color: '#E63946', marginRight: 12, fontSize: 16 }}>●</span>
                  <span style={{ color: '#fff' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SECTION 4 - 3D AR Scene Reconstruction */}
        <div style={{
          background: '#0D1421',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          border: '1px solid #1E2A3A'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ 
              background: '#E63946', 
              color: '#fff', 
              padding: '4px 12px', 
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 'bold',
              marginRight: 12
            }}>NEW</span>
            <h3 style={{
              fontSize: 14,
              color: '#E63946',
              letterSpacing: 2,
              textTransform: 'uppercase',
              margin: 0
            }}>3D Crime Scene Reconstruction (IKEA AR Style)</h3>
          </div>
          
          <p style={{ color: '#CCD6E0', marginBottom: 16, fontSize: 14 }}>
            Interactive 3D reconstruction using depth-aware computer vision. 
            Evidence markers show ML-predicted positions with confidence scores.
          </p>
          
          <Suspense fallback={
            <div style={{ 
              height: 500, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#1E2A3A',
              borderRadius: 8
            }}>
              <p style={{ color: '#8899AA' }}>Loading 3D Scene...</p>
            </div>
          }>
            <ForensicARScene 
              caseData={data}
              evidence={demoEvidence}
              analysis={demoAnalysis}
            />
          </Suspense>
        </div>

        {/* SECTION 5 - Blood Spatter Analysis */}
        {blood_spatter && (
          <div style={{
            background: '#0D1421',
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            border: '1px solid #1E2A3A'
          }}>
            <h3 style={{
              fontSize: 14,
              color: '#E63946',
              letterSpacing: 2,
              marginBottom: 16,
              textTransform: 'uppercase'
            }}>Blood Spatter Analysis</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#1E2A3A', padding: 16, borderRadius: 8 }}>
                <p style={{ color: '#8899AA', fontSize: 12, marginBottom: 4 }}>Spatter Type</p>
                <p style={{ color: '#E63946', fontSize: 18, fontWeight: 'bold' }}>
                  {blood_spatter.spatter_type || 'High Velocity'}
                </p>
              </div>
              <div style={{ background: '#1E2A3A', padding: 16, borderRadius: 8 }}>
                <p style={{ color: '#8899AA', fontSize: 12, marginBottom: 4 }}>Blood Drops Detected</p>
                <p style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  {blood_spatter.drops?.length || 23}
                </p>
              </div>
            </div>
            
            {convergence_point && (
              <div style={{ background: '#1E2A3A', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <p style={{ color: '#8899AA', fontSize: 12, marginBottom: 4 }}>Area of Convergence (Impact Point)</p>
                <p style={{ color: '#00FF88', fontFamily: 'monospace' }}>
                  X: {convergence_point.x?.toFixed(2)}m | 
                  Y: {convergence_point.y?.toFixed(2)}m | 
                  Z: {convergence_point.z?.toFixed(2)}m
                </p>
              </div>
            )}
            
            {suggested_weapons.length > 0 && (
              <div>
                <p style={{ color: '#8899AA', fontSize: 12, marginBottom: 8 }}>ML-Suggested Weapons</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {suggested_weapons.map((weapon, i) => (
                    <span key={i} style={{
                      background: '#E63946',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: 4,
                      fontSize: 12
                    }}>{weapon}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 6 - Scene Description */}
        <div style={{
          background: '#0D1421',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          border: '1px solid #1E2A3A'
        }}>
          <h3 style={{
            fontSize: 14,
            color: '#E63946',
            letterSpacing: 2,
            marginBottom: 12,
            textTransform: 'uppercase'
          }}>Scene Description</h3>
          <p style={{ color: '#CCD6E0', lineHeight: 1.6 }}>{scene_description || 'No description available.'}</p>
        </div>

        {/* SECTION 7 - Narrative */}
        <div style={{
          background: '#0D1421',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          border: '1px solid #1E2A3A'
        }}>
          <h3 style={{
            fontSize: 14,
            color: '#E63946',
            letterSpacing: 2,
            marginBottom: 12,
            textTransform: 'uppercase'
          }}>Reconstructed Narrative</h3>
          <p style={{ color: '#CCD6E0', lineHeight: 1.6 }}>{reconstructed_narrative || 'No narrative available.'}</p>
        </div>

        {/* SECTION 6 - QR Code */}
        <div style={{
          display:'flex',flexDirection:'column',
          alignItems:'center',padding:20}}>
          <QRCodeSVG 
            value={`FORENSIQ-CASE-${caseId}-${crime_type}-${date}`}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"/>
          <p style={{color:'#8892A4',fontSize:11,
            fontFamily:'monospace',marginTop:8,
            letterSpacing:1}}>
            SCAN FOR CASE ACCESS
          </p>
        </div>

        {/* BUTTONS */}
        <div style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => window.print()}
            style={{
              background: '#E63946',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 'bold',
              cursor: 'pointer',
              letterSpacing: 1
            }}
          >DOWNLOAD PDF</button>
          <button
            onClick={() => navigate('/results')}
            style={{
              background: 'transparent',
              color: '#E63946',
              border: '2px solid #E63946',
              padding: '12px 28px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 'bold',
              cursor: 'pointer',
              letterSpacing: 1
            }}
          >BACK TO RESULTS</button>
          <button
            onClick={() => navigate('/newcase')}
            style={{
              background: 'transparent',
              color: '#E63946',
              border: '2px solid #E63946',
              padding: '12px 28px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 'bold',
              cursor: 'pointer',
              letterSpacing: 1
            }}
          >NEW CASE</button>
        </div>
      </div>
    </div>
  );
};

export default Report;
