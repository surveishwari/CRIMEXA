import React from 'react';
import { Sidebar, Header } from './Dashboard';
import { useNavigate } from 'react-router-dom';

const ReportsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="PDF Documentation" />
        
        <div className="p-6 h-full flex flex-col fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Step 5: Official PDF Documentation</h2>
              <p className="text-sm text-muted">Generate case reports compiling intake, prediction, and reconstruction data.</p>
            </div>
            <button onClick={() => navigate('/museum')} className="btn-primary">Continue to Training Museum ➔</button>
          </div>

          <div className="flex gap-6 flex-1">
            
            <div className="flex-[2] flex flex-col gap-6">
              <div className="card p-6 bg-black border-panel-border">
                <h3 className="text-xs font-bold tracking-widest text-white mb-8 border-b border-panel-border pb-4">Incident Timeline Summary</h3>
                
                <div className="relative flex justify-between items-start mt-8 mb-4">
                  <div className="absolute top-2 left-0 right-0 h-1 bg-panel-border z-0"></div>
                  <div className="absolute top-2 left-0 w-full h-1 bg-primary-color z-0"></div>

                  {/* Nodes */}
                  <div className="relative z-10 flex flex-col items-center w-24">
                    <div className="w-5 h-5 rounded-full bg-primary-color border-4 border-black mb-3 shadow-[0_0_10px_#00E676]"></div>
                    <p className="text-xs font-bold text-white text-center">Entry</p>
                    <p className="text-[10px] text-muted text-center leading-tight">Victim entered</p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center w-24">
                    <div className="w-5 h-5 rounded-full bg-primary-color border-4 border-black mb-3 shadow-[0_0_10px_#00E676]"></div>
                    <p className="text-xs font-bold text-white text-center">Confrontation</p>
                    <p className="text-[10px] text-muted text-center leading-tight">Argument detected</p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center w-24">
                    <div className="w-5 h-5 rounded-full bg-primary-color border-4 border-black mb-3 shadow-[0_0_10px_#00E676]"></div>
                    <p className="text-xs font-bold text-white text-center">Attack</p>
                    <p className="text-[10px] text-muted text-center leading-tight">Gun drawn</p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center w-24">
                    <div className="w-5 h-5 rounded-full bg-primary-color border-4 border-black mb-3 shadow-[0_0_10px_#00E676]"></div>
                    <p className="text-xs font-bold text-white text-center">Shooting</p>
                    <p className="text-[10px] text-muted text-center leading-tight">Victim shot</p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center w-24">
                    <div className="w-5 h-5 rounded-full bg-primary-color border-4 border-black mb-3 shadow-[0_0_10px_#00E676]"></div>
                    <p className="text-xs font-bold text-white text-center">Aftermath</p>
                    <p className="text-[10px] text-muted text-center leading-tight">Suspect flees</p>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-black border-panel-border flex-1 flex flex-col">
                <h3 className="text-xs font-bold tracking-widest text-white mb-6 border-b border-panel-border pb-4">Report Details</h3>
                
                <div className="grid-cols-4 mb-auto">
                  <div>
                    <p className="text-[10px] text-muted mb-1 uppercase font-bold tracking-widest">Case ID</p>
                    <p className="text-sm font-mono text-primary">FX-9942</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted mb-1 uppercase font-bold tracking-widest">Case Name</p>
                    <p className="text-sm font-bold text-white">Downtown Homicide</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted mb-1 uppercase font-bold tracking-widest">Prediction</p>
                    <p className="text-sm font-bold text-white">Homicide</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted mb-1 uppercase font-bold tracking-widest">Confidence</p>
                    <p className="text-sm font-mono text-primary">92%</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-panel-border mt-6">
                  <button className="btn-primary"><span>📥</span> Download Official PDF</button>
                  <button className="btn-outline border-panel-border text-white hover:bg-panel-border"><span>🔗</span> Submit to Database</button>
                </div>
              </div>
            </div>

            {/* Right Panel: Report Preview */}
            <div className="flex-[1] flex flex-col">
              <h3 className="text-xs font-bold tracking-widest text-white mb-4">Live PDF Preview</h3>
              <div className="flex-1 bg-[#D1D5DB] rounded p-4 flex justify-center overflow-y-auto border border-panel-border">
                {/* Mock PDF Document */}
                <div className="bg-white w-full max-w-[400px] h-fit min-h-[500px] p-6 shadow-2xl flex flex-col">
                  
                  {/* PDF Header */}
                  <div className="flex items-center gap-2 mb-4 border-b pb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      <path d="M7 12a5 5 0 0110 0M9 12a3 3 0 016 0" />
                    </svg>
                    <div>
                      <h4 className="text-black font-bold text-sm tracking-widest leading-none">FORENSIQ</h4>
                      <p className="text-[6px] text-gray-500 font-bold uppercase tracking-widest">Official Case Documentation</p>
                    </div>
                  </div>

                  {/* PDF Image */}
                  <div className="w-full h-32 bg-gray-200 mb-4 rounded overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-800"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-[10px] font-bold">SCENE RECONSTRUCTION CAPTURE</div>
                  </div>

                  {/* PDF Text */}
                  <h5 className="text-black text-[10px] font-bold mb-1 uppercase tracking-widest">Intake Summary</h5>
                  <div className="w-full h-1 bg-gray-200 mb-1"></div>
                  <div className="w-5/6 h-1 bg-gray-200 mb-1"></div>
                  <div className="w-full h-1 bg-gray-200 mb-4"></div>

                  <h5 className="text-black text-[10px] font-bold mb-1 uppercase tracking-widest">Prediction Results</h5>
                  <div className="w-full h-1 bg-gray-200 mb-1"></div>
                  <div className="w-full h-1 bg-gray-200 mb-1"></div>
                  <div className="w-4/5 h-1 bg-gray-200 mb-1"></div>
                  <div className="w-full h-1 bg-gray-200 mb-4"></div>

                  <div className="mt-auto border-t pt-2 flex justify-between text-[6px] text-gray-400 font-bold uppercase">
                    <span>Generated by AI Models</span>
                    <span>Page 1 of 4</span>
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

export default ReportsPage;
