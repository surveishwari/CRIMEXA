import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address (e.g. officer@pd.gov)';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError('Please resolve the validation errors.');
      return;
    }

    setLoading(true);
    setError(null);

    // Call context login. Note that the backend verifies badge_or_email on the badge parameter.
    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error || 'Authentication failed. Please verify your credentials.');
    }
    setLoading(false);
  };

  const handleFieldChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);

    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="flex w-full h-screen bg-bg-primary overflow-hidden relative font-mono">
      {/* LEFT PANEL: Professional Cyber Graphic (45%) */}
      <div className="hidden lg:flex w-[45%] relative border-r border-border bg-slate-900 overflow-hidden flex-col justify-center items-center">
        {/* CSS Blueprint Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 border-4 border-cyan/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-2 border border-cyan/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <span className="text-4xl">🦅</span>
          </div>
          <h2 className="text-3xl font-bold tracking-widest text-white mb-2">CRIMEXA</h2>
          <p className="text-cyan font-mono text-sm tracking-widest uppercase">Forensic Intelligence Platform</p>
        </div>

        <div className="absolute bottom-8 left-8 z-10">
          <h3 className="text-cyan tracking-widest text-xs mb-1 font-bold">SECURE CONNECTION ESTABLISHED</h3>
          <p className="text-[10px] text-muted font-mono">ENCRYPTION: AES-256-GCM<br/>SERVER: US-EAST-GOV-1</p>
        </div>
      </div>

      {/* RIGHT PANEL: Login Form (55%) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 bg-[#060B13]">
        <div className="w-full max-w-md card p-8 border border-border" style={{ animation: error ? 'shake 0.5s' : 'none' }}>
          
          <div className="text-center mb-8">
            <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <circle cx="12" cy="16" r="1" fill="var(--cyan)" />
            </svg>
            <h1 className="text-2xl font-bold tracking-widest text-text-primary uppercase">CRIMEVR LOGIN</h1>
            <p className="text-xs text-muted mt-2 uppercase tracking-widest">Authorized Investigator Portal</p>
          </div>

          {error && (
            <div className="bg-red/10 border border-red text-red text-xs p-3 rounded mb-4 font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-muted mb-1 block uppercase tracking-wider">Secure Email Address</label>
              <input 
                type="text" 
                className={`input-field w-full ${fieldErrors.email ? 'border-red' : 'border-border'}`}
                placeholder="officer@pd.gov" 
                value={email} 
                onChange={e => handleFieldChange('email', e.target.value)}
              />
              {fieldErrors.email && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="text-xs text-muted mb-1 block uppercase tracking-wider">Secure Password (Min 8 chars)</label>
              <input 
                type="password" 
                className={`input-field w-full ${fieldErrors.password ? 'border-red' : 'border-border'}`}
                placeholder="••••••••" 
                value={password} 
                onChange={e => handleFieldChange('password', e.target.value)}
              />
              {fieldErrors.password && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-4 py-3 text-sm font-bold tracking-widest uppercase">
              {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted">
              Need an account?{' '}
              <Link to="/register" className="text-cyan hover:underline font-bold">
                REGISTER OFFICER
              </Link>
            </p>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}} />
    </div>
  );
};

export default Login;
