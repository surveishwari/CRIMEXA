import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [regData, setRegData] = useState({
    name: '',
    badge: '',
    department: 'Homicide',
    rank: 'Investigator',
    role: 'Investigator',
    email: '',
    password: '',
    confirmPassword: '',
    deptCode: ''
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = {};
    if (!regData.name.trim()) errors.name = 'Full Name is required';
    
    if (!regData.badge.trim()) {
      errors.badge = 'Badge Number is required';
    } else if (!regData.badge.match(/^[A-Z]{3}-\d+$/)) {
      errors.badge = 'Invalid Badge Number format (e.g. CPD-10247)';
    }

    if (!regData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(regData.email)) {
      errors.email = 'Please enter a valid email address (e.g. officer@pd.gov)';
    }

    if (!regData.password) {
      errors.password = 'Password is required';
    } else if (regData.password.length < 8) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError('Please fix the validation errors below.');
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
      setError(result.error || 'Registration failed. Check if Badge or Email is already registered.');
    }

    setLoading(false);
  };

  const handleFieldChange = (field, value) => {
    setRegData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="flex w-full h-screen bg-bg-primary overflow-hidden relative font-mono">
      {/* LEFT PANEL: Professional Cyber Graphic (45%) */}
      <div className="hidden lg:flex w-[45%] relative border-r border-border bg-slate-900 overflow-hidden flex-col justify-center items-center">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
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

      {/* RIGHT PANEL: Register Form (55%) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 bg-[#060B13]">
        <div className="w-full max-w-lg card p-8 border border-border overflow-y-auto max-h-[90vh]" style={{ animation: error ? 'shake 0.5s' : 'none' }}>
          
          <div className="text-center mb-6">
            <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            <h1 className="text-2xl font-bold tracking-widest text-text-primary uppercase">OFFICER REGISTRATION</h1>
            <p className="text-xs text-muted mt-1 uppercase tracking-widest">Register Secure Access Credentials</p>
          </div>

          {error && (
            <div className="bg-red/10 border border-red text-red text-xs p-3 rounded mb-4 font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted mb-1 block uppercase">Full Name</label>
                <input 
                  type="text" 
                  className={`input-field w-full ${fieldErrors.name ? 'border-red' : 'border-border'}`}
                  value={regData.name} 
                  placeholder="John Doe"
                  onChange={e => handleFieldChange('name', e.target.value)}
                />
                {fieldErrors.name && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.name}</p>}
              </div>
              
              <div>
                <label className="text-xs text-muted mb-1 block uppercase">Badge Number</label>
                <input 
                  type="text" 
                  className={`input-field w-full ${fieldErrors.badge ? 'border-red' : 'border-border'}`}
                  placeholder="CPD-10247" 
                  value={regData.badge} 
                  onChange={e => handleFieldChange('badge', e.target.value)}
                />
                {fieldErrors.badge && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.badge}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted mb-1 block uppercase">Department</label>
                <select 
                  className="input-field w-full appearance-none" 
                  value={regData.department} 
                  onChange={e => handleFieldChange('department', e.target.value)}
                >
                  <option value="Homicide">Homicide</option>
                  <option value="Narcotics">Narcotics</option>
                  <option value="Cybercrime">Cybercrime</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-muted mb-1 block uppercase">Rank</label>
                <select 
                  className="input-field w-full appearance-none" 
                  value={regData.rank} 
                  onChange={e => handleFieldChange('rank', e.target.value)}
                >
                  <option value="Investigator">Investigator</option>
                  <option value="Inspector">Inspector</option>
                  <option value="Analyst">Analyst</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted mb-1 block uppercase">Secure Email</label>
              <input 
                type="email" 
                className={`input-field w-full ${fieldErrors.email ? 'border-red' : 'border-border'}`}
                placeholder="officer@pd.gov" 
                value={regData.email} 
                onChange={e => handleFieldChange('email', e.target.value)}
              />
              {fieldErrors.email && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted mb-1 block uppercase">Password (Min 8 chars)</label>
                <input 
                  type="password" 
                  className={`input-field w-full ${fieldErrors.password ? 'border-red' : 'border-border'}`}
                  placeholder="••••••••" 
                  value={regData.password} 
                  onChange={e => handleFieldChange('password', e.target.value)}
                />
                {fieldErrors.password && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.password}</p>}
              </div>

              <div>
                <label className="text-xs text-muted mb-1 block uppercase">Confirm Password</label>
                <input 
                  type="password" 
                  className={`input-field w-full ${fieldErrors.confirmPassword ? 'border-red' : 'border-border'}`}
                  placeholder="••••••••" 
                  value={regData.confirmPassword} 
                  onChange={e => handleFieldChange('confirmPassword', e.target.value)}
                />
                {fieldErrors.confirmPassword && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted mb-1 block uppercase">Department Access Code</label>
              <input 
                type="password" 
                className={`input-field w-full ${fieldErrors.deptCode ? 'border-red' : 'border-border'}`}
                placeholder="Secret access verification code" 
                value={regData.deptCode} 
                onChange={e => handleFieldChange('deptCode', e.target.value)}
              />
              {fieldErrors.deptCode && <p className="text-red text-xs mt-1 font-mono">{fieldErrors.deptCode}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-2 py-3 text-sm font-bold tracking-widest uppercase">
              {loading ? 'PROCESSING...' : 'CREATE OFFICER ACCOUNT'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan hover:underline font-bold">
                LOGIN HERE
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

export default Register;
