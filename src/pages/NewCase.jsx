import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewCase = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Downtown');
  const [time, setTime] = useState('12');
  const [entryMethod, setEntryMethod] = useState('Door');
  const [weapon, setWeapon] = useState('No');
  const [textEvidence, setTextEvidence] = useState('');
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const analyzeCase = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('location', location);
      formData.append('time', time);
      formData.append('entryMethod', entryMethod);
      formData.append('weapon', weapon);
      formData.append('textEvidence', textEvidence);
      
      imageFiles.forEach((file, index) => {
        formData.append(`image_${index}`, file);
      });

      const response = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const result = response.data;
      localStorage.setItem('forensiqResult', JSON.stringify(result));
      navigate('/results');
    } catch(err) {
      console.error(err);
      alert('Error analyzing case. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-text">FORENSIQ AI PROCESSING MULTIPLE PROOFS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Top Bar */}
      <div className="bg-secondary border-b border-border px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-accent text-2xl font-bold">CRIMEXA</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-secondary"
          >
            BACK TO DASHBOARD
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem' }}>
        <div className="card max-w-2xl mx-auto" style={{ maxWidth: '800px', margin: '0 auto', background: '#1c1c1e', padding: '2rem', borderRadius: '12px', color: 'white', border: '1px solid #333' }}>
          <h2 className="text-2xl font-bold text-primary mb-6" style={{ marginBottom: '1.5rem', color: '#e63946' }}>New Case Analysis</h2>
          
          <div className="space-y-4 mb-6" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Image Upload Area */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Upload Crime Scene Photos & Proofs
              </label>
              <div 
                onClick={() => fileInputRef.current.click()}
                style={{ 
                  border: '2px dashed #444', borderRadius: '8px', padding: '2rem', textAlign: 'center', 
                  cursor: 'pointer', background: '#2c2c2e', minHeight: '150px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'center' 
                }}
              >
                {images.length > 0 ? (
                  images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Evidence ${idx}`} style={{ maxHeight: '100px', borderRadius: '4px' }} />
                  ))
                ) : (
                  <span style={{ color: '#888' }}>📸 Click to upload multiple photos/proofs</span>
                )}
              </div>
              <input 
                type="file" 
                multiple
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Location Zone
              </label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#2c2c2e', border: '1px solid #444', color: 'white' }}>
                <option value="Home">Home / Apartment</option>
                <option value="Street">Street / Outdoor</option>
                <option value="Railway">Railway Station</option>
                <option value="Office">Office Building</option>
                <option value="Public">Public Place / Mall</option>
                <option value="Downtown">Downtown</option>
                <option value="Suburbs">Suburbs</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Time of Incident (Hour 0-23)
              </label>
              <input
                type="number"
                min="0"
                max="23"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#2c2c2e', border: '1px solid #444', color: 'white' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Entry Method
              </label>
              <select value={entryMethod} onChange={e => setEntryMethod(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#2c2c2e', border: '1px solid #444', color: 'white' }}>
                <option value="Door">Door</option>
                <option value="Window">Window</option>
                <option value="Forced">Forced Entry</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Weapon Present
              </label>
              <select value={weapon} onChange={e => setWeapon(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#2c2c2e', border: '1px solid #444', color: 'white' }}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Text Evidence (Notes, Emails, Messages)
              </label>
              <textarea
                placeholder="e.g. We will attack at dawn..."
                value={textEvidence}
                onChange={(e) => setTextEvidence(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#2c2c2e', border: '1px solid #444', color: 'white', minHeight: '100px', resize: 'vertical' }}
              />
            </div>
          </div>

          <button
            onClick={analyzeCase}
            style={{ width: '100%', padding: '1rem', background: '#e63946', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '1.5rem' }}
          >
            ANALYZE THREAT
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCase;
