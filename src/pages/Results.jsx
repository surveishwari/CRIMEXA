import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('forensiqResult');
    if (data) {
      setResult(JSON.parse(data));
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!result) return <div className="min-h-screen bg-primary flex items-center justify-center text-accent glitch-text">INITIALIZING SCAN...</div>;

  const getLevelColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH': return '#e63946';
      case 'MEDIUM': return '#ffaa00';
      case 'LOW': return '#00ffcc';
      default: return '#00aaff';
    }
  };

  const threatColor = getLevelColor(result.results.overall_threat_level);

  return (
    <div className="min-h-screen bg-primary" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="ar-grid-bg"></div>
      
      <div className="glass-panel px-6 py-4 z-10 relative flex justify-between items-center" style={{ borderBottom: '2px solid #00aaff' }}>
        <h1 className="text-accent text-2xl font-bold glitch-text" style={{ color: '#00ffcc', textShadow: '0 0 10px #00ffcc' }}>
          CRIMEXA ANALYSIS
        </h1>
        <button onClick={() => navigate('/dashboard')} className="btn" style={{ background: '#333', color: '#00aaff', border: '1px solid #00aaff' }}>
          [&lt;] RETURN TO HUB
        </button>
      </div>

      <div className="container relative z-10" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#fff', letterSpacing: '2px' }}>
          FORENSIC INTELLIGENCE DOSSIER: <span style={{ color: '#00aaff' }}>{result.case_id}</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Main Threat Widget */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px', border: `2px solid ${threatColor}`, textAlign: 'center', boxShadow: `0 0 20px ${threatColor}40` }}>
            <h3 style={{ color: '#00aaff', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px', fontSize: '14px' }}>Calculated Threat Vector</h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: threatColor, textShadow: `0 0 15px ${threatColor}` }}>
              {result.results.overall_threat_level}
            </div>
            <div style={{ fontSize: '1.2rem', color: '#ccc', margin: '1rem 0' }}>
              RISK INDEX: <span style={{ color: threatColor, fontWeight: 'bold' }}>{result.results.risk_score} / 100</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '4px', borderLeft: `4px solid ${threatColor}`, marginTop: '20px' }}>
              <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>PREDICTED EVENT</div>
              <div style={{ color: result.results.predicted_crime !== 'None' ? '#e63946' : '#00ffcc', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {result.results.predicted_crime}
              </div>
            </div>
          </div>

          {/* Breakdown Widget */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px', border: '1px solid #0055ff' }}>
            <h3 style={{ color: '#00aaff', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px', fontSize: '14px' }}>AI Neural Breakdown</h3>
            
            <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0, 170, 255, 0.3)' }}>
              <div style={{ color: '#888', fontSize: '10px', letterSpacing: '1px' }}>SCENE TOPOLOGY RISK (RANDOM FOREST)</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: getLevelColor(result.results.scene_risk_level) }}>
                {result.results.scene_risk_level} Risk Level
              </div>
            </div>

            <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0, 170, 255, 0.3)' }}>
              <div style={{ color: '#888', fontSize: '10px', letterSpacing: '1px' }}>NLP SEMANTIC ANALYSIS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: result.results.text_analysis_result === 'Normal' ? '#00ffcc' : '#ffaa00' }}>
                {result.results.text_analysis_result}
              </div>
            </div>

            <div>
              <div style={{ color: '#888', fontSize: '10px', letterSpacing: '1px' }}>COMPUTER VISION MATCHER</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#00aaff' }}>
                {result.results.cv_analysis || "No optical proof provided."}
              </div>
            </div>
          </div>

          {/* QR Museum Database Link */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px', border: '1px solid #00ffcc', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#00ffcc', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px', fontSize: '14px', textAlign: 'center' }}>MUSEUM DB EXPORT</h3>
            <div style={{ background: 'white', padding: '10px', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0, 255, 204, 0.4)' }}>
              <img src={result.qr_url} alt="Case QR Code" style={{ width: '150px', height: '150px' }} />
            </div>
            <p style={{ color: '#aaa', fontSize: '12px', textAlign: 'center', marginBottom: '1rem' }}>
              Scan to securely link this evidence profile to the Central Museum Database for comparative analysis.
            </p>
            <button 
              onClick={() => window.open(result.pdf_url, '_blank')}
              className="btn"
              style={{ width: '100%', background: '#333', color: '#00ffcc', border: '1px solid #00ffcc' }}>
              [⬇] DOWNLOAD PDF REPORT
            </button>
          </div>
        </div>

        {/* Primary AR Action Button */}
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => navigate('/scene')}
            className="btn"
            style={{ 
              padding: '16px 40px', 
              background: 'linear-gradient(90deg, #e63946, #ff4757)', 
              color: 'white', 
              border: '2px solid #ffaa00', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: 'bold', 
              fontSize: '1.4rem',
              boxShadow: '0 0 20px rgba(230, 57, 70, 0.6)',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
            <span style={{ fontSize: '1.8rem' }}>👁️</span> ENTER 3D VR RECONSTRUCTION
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
