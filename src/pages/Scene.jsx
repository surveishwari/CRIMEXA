import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForensicARScene from '../components/ForensicARScene';

const Scene = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary">
      <div className="bg-secondary border-b border-border px-6 py-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-accent text-2xl font-bold">CRIMEXA AR</h1>
          <button onClick={() => navigate('/results')} style={{ padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            BACK TO RESULTS
          </button>
        </div>
      </div>
      
      <div className="container" style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Interactive AR Evidence Scene</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          Explore the simulated crime scene below. Click "Enter AR Mode" if you are on a compatible device (e.g., mobile phone, VR headset).
        </p>
        <ForensicARScene />
      </div>
    </div>
  );
};

export default Scene;
