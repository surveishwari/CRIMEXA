import React from 'react';
import { Sidebar, Header } from './Dashboard';
import { useNavigate } from 'react-router-dom';

const AnalysisPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="Crime Prediction" />
        
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Step 3: AI Prediction Engine</h2>
              <p className="text-sm text-muted">Predicting the crime type based on Intake context and Photography Object Detection.</p>
            </div>
            <button onClick={() => navigate('/reconstruction')} className="btn-primary">Generate 3D Reconstruction ➔</button>
          </div>

          <div className="flex gap-6 flex-1">
            
            <div className="flex-[3] flex flex-col gap-6">
              {/* Top Row: Model Predictions */}
              <div>
                <h3 className="text-xs font-bold tracking-widest text-white mb-4">Model Predictions</h3>
                <div className="grid-cols-3">
                  <div className="card p-4 bg-black border border-panel-border">
                    <p className="text-xs text-muted font-bold mb-4">Random Forest</p>
                    <p className="text-[10px] text-muted mb-1">Prediction</p>
                    <h3 className="text-xl font-bold text-white mb-4">Homicide</h3>
                    <div className="flex justify-between text-xs text-muted mb-1">
                      <span>Confidence</span>
                      <span className="text-primary font-bold">88%</span>
                    </div>
                    <div className="progress-bar-bg h-1">
                      <div className="progress-bar-fill w-[88%]"></div>
                    </div>
                  </div>
                  
                  <div className="card p-4 bg-black border border-panel-border">
                    <p className="text-xs text-muted font-bold mb-4">XGBoost</p>
                    <p className="text-[10px] text-muted mb-1">Prediction</p>
                    <h3 className="text-xl font-bold text-white mb-4">Homicide</h3>
                    <div className="flex justify-between text-xs text-muted mb-1">
                      <span>Confidence</span>
                      <span className="text-primary font-bold">91%</span>
                    </div>
                    <div className="progress-bar-bg h-1">
                      <div className="progress-bar-fill w-[91%]"></div>
                    </div>
                  </div>

                  <div className="card p-4 bg-black border border-panel-border">
                    <p className="text-xs text-muted font-bold mb-4">Neural Network</p>
                    <p className="text-[10px] text-muted mb-1">Prediction</p>
                    <h3 className="text-xl font-bold text-white mb-4">Homicide</h3>
                    <div className="flex justify-between text-xs text-muted mb-1">
                      <span>Confidence</span>
                      <span className="text-primary font-bold">93%</span>
                    </div>
                    <div className="progress-bar-bg h-1">
                      <div className="progress-bar-fill w-[93%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Probability Distribution */}
              <div className="card p-6 flex-1 bg-black border border-panel-border">
                <h3 className="text-xs font-bold tracking-widest text-white mb-6">Crime Probability Distribution</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-xs text-muted text-right">Homicide</span>
                    <div className="flex-1 progress-bar-bg h-4 rounded-sm bg-panel" style={{ overflow: 'visible' }}>
                      <div className="progress-bar-fill h-full rounded-sm relative w-[92%]">
                        <span className="absolute -right-8 top-0 text-xs font-bold text-primary">92%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-xs text-muted text-right">Assault</span>
                    <div className="flex-1 progress-bar-bg h-4 rounded-sm bg-panel" style={{ overflow: 'visible' }}>
                      <div className="progress-bar-fill h-full rounded-sm relative w-[6%]" style={{ backgroundColor: 'var(--info)' }}>
                        <span className="absolute -right-6 top-0 text-xs font-bold text-info">6%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="w-20 text-xs text-muted text-right">Robbery</span>
                    <div className="flex-1 progress-bar-bg h-4 rounded-sm bg-panel" style={{ overflow: 'visible' }}>
                      <div className="progress-bar-fill h-full rounded-sm relative w-[2%]" style={{ backgroundColor: 'var(--warning)' }}>
                        <span className="absolute -right-6 top-0 text-xs font-bold text-warning">2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="w-20 text-xs text-muted text-right">Accident</span>
                    <div className="flex-1 progress-bar-bg h-4 rounded-sm bg-panel" style={{ overflow: 'visible' }}>
                      <div className="progress-bar-fill h-full rounded-sm relative w-[0%]" style={{ backgroundColor: 'var(--danger)' }}>
                        <span className="absolute -right-6 top-0 text-xs font-bold text-muted">0%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-between pl-24 mt-4 text-[10px] text-muted border-t border-panel-border pt-2">
                  <span>0%</span><span>20%</span><span>40%</span><span>60%</span><span>80%</span><span>100%</span>
                </div>
              </div>

            </div>

            {/* Right Panel: Ensemble Result & Factors */}
            <div className="flex-[1] flex flex-col gap-6">
              
              <div className="card p-6 bg-black border border-panel-border text-center flex flex-col items-center justify-center">
                <h3 className="text-xs font-bold tracking-widest text-white mb-6 w-full text-left">Ensemble Result</h3>
                <h2 className="text-2xl font-bold text-white mb-1">Homicide</h2>
                <p className="text-[10px] text-primary mb-6">Final Prediction</p>
                
                <div className="relative w-32 h-32 rounded-full border-[6px] border-panel flex items-center justify-center" style={{ borderColor: 'var(--panel-border)', borderTopColor: 'var(--primary-color)', borderRightColor: 'var(--primary-color)', borderBottomColor: 'var(--primary-color)' }}>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-white">92%</span>
                    <span className="text-[8px] text-muted text-center leading-tight mt-1">Overall<br/>Confidence</span>
                  </div>
                </div>
              </div>

              <div className="card p-6 flex-1 bg-black border border-panel-border">
                <h3 className="text-xs font-bold tracking-widest text-white mb-4">Key Factors Based on Uploads</h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs border-b border-panel-border pb-2">
                    <span className="text-muted"><span className="text-primary mr-2">●</span>Blood Evidence</span>
                    <span className="text-primary font-mono">0.92</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-panel-border pb-2">
                    <span className="text-muted"><span className="text-primary mr-2">●</span>Weapon Presence</span>
                    <span className="text-primary font-mono">0.89</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-panel-border pb-2">
                    <span className="text-muted"><span className="text-primary mr-2">●</span>Injury Pattern</span>
                    <span className="text-primary font-mono">0.91</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-panel-border pb-2">
                    <span className="text-muted"><span className="text-primary mr-2">●</span>Scene Context</span>
                    <span className="text-primary font-mono">0.87</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted"><span className="text-primary mr-2">●</span>Struggle Signs</span>
                    <span className="text-primary font-mono">0.90</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
