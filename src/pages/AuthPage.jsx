import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Login form state
  const [loginData, setLoginData] = useState({ badge: '', password: '' });

  // Register form state
  const [regData, setRegData] = useState({
    name: '', badge: '', department: 'Homicide', rank: 'Investigator', role: 'Investigator', email: '', password: '', confirmPassword: '', deptCode: ''
  });

  // Validation functions
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 8;

  const validateLoginForm = () => {
    const errors = {};
    if (!loginData.badge.trim()) {
      errors.badge = 'Badge Number or Email is required';
    } else if (!isValidEmail(loginData.badge)) {
      if (!loginData.badge.match(/^[A-Z]{3}-\d+$/)) {
        errors.badge = 'Invalid Badge Number or Email format';
      }
    }
    if (!loginData.password) {
      errors.password = 'Password is required';
    } else if (!isValidPassword(loginData.password)) {
      errors.password = 'Password must be at least 8 characters';
    }
    return errors;
  };

  const validateRegisterForm = () => {
    const errors = {};
    if (!regData.name.trim()) errors.name = 'Full Name is required';
    if (!regData.badge.trim()) errors.badge = 'Badge Number is required';
    if (!regData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(regData.email)) {
      errors.email = 'Invalid email format (e.g., officer@pd.gov)';
    }
    if (!regData.password) {
      errors.password = 'Password is required';
    } else if (!isValidPassword(regData.password)) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!regData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (regData.password !== regData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!regData.deptCode.trim()) errors.deptCode = 'Department Code is required';
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError('Please fix the validation errors below');
      return;
    }

    setLoading(true);
    setError(null);
    
    const result = await login(loginData.badge, loginData.password);
    
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegisterForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError('Please fix the validation errors below');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await register({
      name: regData.name,
      badge: regData.badge,
      department: regData.department,
      rank: regData.rank,
      role: regData.role,
      email: regData.email,
      password: regData.password,
      deptCode: regData.deptCode
    });

    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleFieldChange = (field, value, form = 'login') => {
    if (form === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setRegData(prev => ({ ...prev, [field]: value }));
    }
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="flex w-full h-screen bg-bg-primary overflow-hidden relative">
      {/* LEFT PANEL: Sleek Professional Background (45%) */}
      <div className="hidden lg:flex w-[45%] relative border-r border-border bg-slate-900 overflow-hidden flex-col justify-center items-center">
        {/* CSS Blueprint Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 border-4 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-2 border border-primary/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <span className="text-4xl">🦅</span>
          </div>
          <h2 className="text-3xl font-bold tracking-widest text-white mb-2">CRIMEXA</h2>
          <p className="text-primary font-mono text-sm tracking-widest uppercase">Forensic Intelligence Platform</p>
        </div>

        <div className="absolute bottom-8 left-8 z-10">
          <h3 className="text-primary tracking-widest text-xs mb-1 font-bold">SECURE CONNECTION ESTABLISHED</h3>
          <p className="text-[10px] text-muted font-mono">ENCRYPTION: AES-256-GCM<br/>SERVER: US-EAST-GOV-1</p>
        </div>
      </div>

      {/* RIGHT PANEL: Auth Form (55%) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        
        <div className="w-full max-w-md card p-8 fade-in" style={{ animation: error ? 'shake 0.5s' : 'none', borderColor: error ? 'var(--red)' : 'var(--border)' }}>
          
          <div className="text-center mb-8">
            <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <circle cx="12" cy="16" r="1" fill="var(--cyan)" />
            </svg>
            <h1 className="text-2xl font-display font-bold text-text-primary tracking-widest glitch" data-text="CRIMEVR RECON">CRIMEVR RECON</h1>
            <p className="text-xs text-muted font-mono mt-2 uppercase tracking-widest">Authorized Personnel Only</p>
          </div>

          <div className="flex mb-6 border-b border-border">
            <button type="button" className={`flex-1 pb-2 font-display text-sm font-bold tracking-widest transition-colors ${isLogin ? 'text-cyan border-b-2 border-cyan' : 'text-muted'}`} onClick={() => { setIsLogin(true); setError(null); setFieldErrors({}); }}>
              LOGIN
            </button>
            <button type="button" className={`flex-1 pb-2 font-display text-sm font-bold tracking-widest transition-colors ${!isLogin ? 'text-cyan border-b-2 border-cyan' : 'text-muted'}`} onClick={() => { setIsLogin(false); setError(null); setFieldErrors({}); }}>
              REGISTER
            </button>
          </div>

          {error && <div className="bg-red/10 border border-red text-red text-xs p-3 rounded mb-4 font-mono">{error}</div>}

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-mono text-muted mb-1 block">Badge Number or Email</label>
                <input 
                  required 
                  type="text" 
                  className={`input-field ${fieldErrors.badge ? 'border-red' : ''}`}
                  placeholder="CPD-10247 or officer@pd.gov" 
                  value={loginData.badge} 
                  onChange={e => handleFieldChange('badge', e.target.value, 'login')}
                />
                {fieldErrors.badge && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.badge}</p>}
              </div>
              <div>
                <label className="text-xs font-mono text-muted mb-1 block">Secure Password (Min 8 chars)</label>
                <input 
                  required 
                  type="password" 
                  className={`input-field ${fieldErrors.password ? 'border-red' : ''}`}
                  placeholder="••••••••" 
                  value={loginData.password} 
                  onChange={e => handleFieldChange('password', e.target.value, 'login')}
                />
                {fieldErrors.password && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.password}</p>}
              </div>
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 text-xs text-muted cursor-pointer"><input type="checkbox" /> Remember Me</label>
                <a href="#" className="text-xs text-cyan hover:underline">Forgot Password?</a>
              </div>
              <button type="submit" disabled={loading} className="btn-primary mt-4">
                {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 overflow-y-auto pr-2" style={{ maxHeight: '60vh' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted mb-1 block">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className={`input-field ${fieldErrors.name ? 'border-red' : ''}`}
                    value={regData.name} 
                    onChange={e => handleFieldChange('name', e.target.value, 'register')}
                  />
                  {fieldErrors.name && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-mono text-muted mb-1 block">Badge Number</label>
                  <input 
                    required 
                    type="text" 
                    className={`input-field ${fieldErrors.badge ? 'border-red' : ''}`}
                    value={regData.badge} 
                    onChange={e => handleFieldChange('badge', e.target.value, 'register')}
                  />
                  {fieldErrors.badge && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.badge}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted mb-1 block">Department</label>
                  <select 
                    className="input-field appearance-none" 
                    value={regData.department} 
                    onChange={e => handleFieldChange('department', e.target.value, 'register')}
                  >
                    <option>Homicide</option><option>Narcotics</option><option>Cybercrime</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-muted mb-1 block">Rank</label>
                  <select 
                    className="input-field appearance-none" 
                    value={regData.rank} 
                    onChange={e => handleFieldChange('rank', e.target.value, 'register')}
                  >
                    <option>Investigator</option><option>Inspector</option><option>Analyst</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted mb-1 block">Secure Email</label>
                <input 
                  required 
                  type="email" 
                  className={`input-field ${fieldErrors.email ? 'border-red' : ''}`}
                  placeholder="officer@pd.gov"
                  value={regData.email} 
                  onChange={e => handleFieldChange('email', e.target.value, 'register')}
                />
                {fieldErrors.email && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.email}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted mb-1 block">Password (Min 8 chars)</label>
                  <input 
                    required 
                    type="password" 
                    className={`input-field ${fieldErrors.password ? 'border-red' : ''}`}
                    value={regData.password} 
                    onChange={e => handleFieldChange('password', e.target.value, 'register')}
                  />
                  {fieldErrors.password && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.password}</p>}
                </div>
                <div>
                  <label className="text-xs font-mono text-muted mb-1 block">Confirm Password</label>
                  <input 
                    required 
                    type="password" 
                    className={`input-field ${fieldErrors.confirmPassword ? 'border-red' : ''}`}
                    value={regData.confirmPassword} 
                    onChange={e => handleFieldChange('confirmPassword', e.target.value, 'register')}
                  />
                  {fieldErrors.confirmPassword && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.confirmPassword}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted mb-1 block">Department Access Code</label>
                <input 
                  required 
                  type="password" 
                  className={`input-field ${fieldErrors.deptCode ? 'border-red' : ''}`}
                  placeholder="Secret verification code" 
                  value={regData.deptCode} 
                  onChange={e => handleFieldChange('deptCode', e.target.value, 'register')}
                />
                {fieldErrors.deptCode && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.deptCode}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary mt-4">
                {loading ? 'PROCESSING...' : 'CREATE OFFICER ACCOUNT'}
              </button>
            </form>
          )}

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

export default AuthPage;
