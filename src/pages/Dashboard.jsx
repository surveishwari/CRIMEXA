import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { logout, user } = useAuth();
  const officer = user || JSON.parse(localStorage.getItem('officer') || '{"name": "SGT. KUMAR", "badge": "CPD-10247", "role": "INVESTIGATOR"}');

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="sidebar h-full flex flex-col relative z-20">
      
      {/* Officer Profile Section */}
      <div className="p-4 border-b border-border flex flex-col items-center pt-8">
        <div className="w-16 h-16 rounded-full bg-cyan/20 border-2 border-cyan flex items-center justify-center text-cyan font-display font-bold text-2xl mb-3 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
          {officer.name.charAt(0)}
        </div>
        <h2 className="font-display font-bold text-sm tracking-widest text-text-primary text-center">{officer.name.toUpperCase()}</h2>
        <p className="text-[10px] font-mono text-muted mb-2 tracking-widest">{officer.badge}</p>
        <div className="bg-cyan-dim border border-cyan px-2 py-0.5 rounded text-[8px] font-bold text-cyan tracking-widest mb-2">{officer.role.toUpperCase()}</div>
        <div className="text-[10px] font-mono text-green tracking-widest">● ONLINE</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
        {[
          { label: 'Dashboard Overview', icon: '🏠', route: '/dashboard' },
          { label: 'My Cases', icon: '📁', route: '/cases' },
          { label: 'Case Information', icon: '📋', route: '/case-info' },
          { label: 'Upload Evidence', icon: '📤', route: '/upload-evidence' },
          { label: 'Scene Photos', icon: '📸', route: '/scene-photos' },
          { label: 'Crime Prediction', icon: '🤖', route: '/prediction' },
          { label: 'Scene Reconstruction', icon: '🥽', route: '/reconstruction' },
          { label: 'PDF Report', icon: '📄', route: '/reports' },
          { label: 'Crime Museum', icon: '🏛️', route: '/museum' },
          { label: 'Settings', icon: '⚙️', route: '/settings' }
        ].map((item) => (
          <button 
            key={item.route}
            className={`sidebar-btn rounded ${path === item.route || (item.route === '/case-info' && path === '/intake') ? 'active' : ''}`} 
            onClick={() => navigate(item.route)}
          >
            <span className="w-6 text-center">{item.icon}</span> 
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border text-center text-[10px] font-mono text-muted">
        <p>CRIMEVR RECON v2.4.1</p>
        <button onClick={handleLogout} className="mt-2 text-red hover:underline">LOGOUT</button>
      </div>
    </div>
  );
};

const Header = () => {
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const update = () => {
      setLiveTime(new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-header relative z-10 bg-[rgba(10,22,40,0.8)] backdrop-blur">
      <div className="flex items-center gap-4 w-full">
        <div className="relative flex-1 max-w-xl">
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Search cases, evidence, or officers..." className="input-field pl-10 h-9 text-xs" />
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-6">
          <span className="text-xs font-mono text-cyan hidden md:inline">{liveTime}</span>
          <div className="relative cursor-pointer" onClick={() => alert('SYSTEM NOTIFICATION: 3 High Priority Cases Pending Review. Proceed to Case Information.')}>
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red text-white text-[8px] font-bold px-1 rounded-full animate-bounce">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LiveDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(dateTime);

  return <span>{formattedDate}</span>;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const officer = user || JSON.parse(localStorage.getItem('officer') || '{"name": "SGT. KUMAR"}');

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content bg-bg-primary relative">
        <Header />
        
        <div className="p-6 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full fade-in">
          
          {/* Welcome Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-display font-bold text-text-primary mb-1">WELCOME BACK, {officer.name.toUpperCase()}</h1>
              <p className="text-xs font-mono text-cyan mb-2">
                <LiveDateTime />
              </p>
              <p className="text-sm font-mono text-muted">You have <span className="text-amber font-bold">3 active cases</span> requiring attention</p>
            </div>
            <div className="flex gap-4">
              <button className="btn-outline text-xs h-9" onClick={() => navigate('/case-info')}>+ NEW CASE</button>
              <button className="btn-primary text-xs h-9" onClick={() => navigate('/reconstruction')}>ENTER VR</button>
            </div>
          </div>

          {/* Row 1 - Stats Grid */}
          <div className="grid grid-cols-4 gap-6">
            <div className="card p-5 border-cyan border-opacity-30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan opacity-10 rounded-bl-full"></div>
              <p className="text-[10px] font-mono tracking-widest text-muted mb-2">TOTAL CASES</p>
              <h2 className="text-3xl font-display font-bold text-cyan">247</h2>
            </div>
            <div className="card p-5 border-amber border-opacity-30 relative overflow-hidden shadow-[0_0_15px_rgba(255,184,0,0.1)]">
              <div className="absolute top-4 right-4 w-2 h-2 bg-amber rounded-full animate-pulse"></div>
              <p className="text-[10px] font-mono tracking-widest text-muted mb-2">ACTIVE</p>
              <h2 className="text-3xl font-display font-bold text-amber">3</h2>
            </div>
            <div className="card p-5 border-green border-opacity-30 relative overflow-hidden">
              <p className="text-[10px] font-mono tracking-widest text-muted mb-2">SOLVED</p>
              <h2 className="text-3xl font-display font-bold text-green">8</h2>
            </div>
            <div className="card p-5 border-red border-opacity-30 relative overflow-hidden shadow-[0_0_15px_rgba(255,45,85,0.1)]">
              <div className="absolute inset-0 bg-red opacity-5 animate-pulse"></div>
              <p className="text-[10px] font-mono tracking-widest text-muted mb-2">HIGH RISK</p>
              <h2 className="text-3xl font-display font-bold text-red">1</h2>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-6 h-80">
            {/* Widget A: My Active Cases */}
            <div className="card col-span-6 p-5 flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
                <h3 className="text-xs font-display font-bold tracking-widest text-cyan">MY ACTIVE CASES</h3>
                <span className="text-[10px] font-mono text-muted cursor-pointer hover:text-cyan">VIEW ALL</span>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-mono text-muted border-b border-border/50">
                      <th className="py-2">CASE #</th>
                      <th>TYPE</th>
                      <th>PRIORITY</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/30 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-xs font-mono">CPD-047</td>
                      <td className="text-xs">Assault</td>
                      <td><span className="text-[8px] bg-red/20 text-red px-2 py-1 rounded font-bold">HIGH</span></td>
                      <td><button className="text-[10px] border border-cyan text-cyan px-2 py-1 rounded hover:bg-cyan/20" onClick={() => navigate('/case-info', { state: { caseId: 'CPD-047' } })}>VIEW</button></td>
                    </tr>
                    <tr className="border-b border-border/30 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-xs font-mono">CPD-046</td>
                      <td className="text-xs">Burglary</td>
                      <td><span className="text-[8px] bg-amber/20 text-amber px-2 py-1 rounded font-bold">MED</span></td>
                      <td><button className="text-[10px] border border-cyan text-cyan px-2 py-1 rounded hover:bg-cyan/20" onClick={() => navigate('/case-info', { state: { caseId: 'CPD-046' } })}>VIEW</button></td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 text-xs font-mono">CPD-042</td>
                      <td className="text-xs">Theft</td>
                      <td><span className="text-[8px] bg-green/20 text-green px-2 py-1 rounded font-bold">LOW</span></td>
                      <td><button className="text-[10px] border border-cyan text-cyan px-2 py-1 rounded hover:bg-cyan/20" onClick={() => navigate('/case-info', { state: { caseId: 'CPD-042' } })}>VIEW</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Widget B: Crime Heatmap */}
            <div className="card col-span-6 p-0 relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10 bg-bg-primary/90 backdrop-blur px-2 py-1 rounded border border-border">
                <h3 className="text-[10px] font-bold tracking-widest text-primary">CRIME HEATMAP</h3>
              </div>
              <div className="w-full h-full bg-bg-primary flex items-center justify-center relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border:0 }} 
                  src="https://maps.google.com/maps?q=Chicago&t=&z=11&ie=UTF8&iwloc=&output=embed" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export { Sidebar, Header };
export default Dashboard;
