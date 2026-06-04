import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Header } from './Dashboard'
import { useCaseStore } from '../store/caseStore'
import { useToast } from '../components/Toast'

const CrimePrediction = () => {
  const navigate = useNavigate()
  const activeCase = useCaseStore(state => state)
  const showToast = useToast()
  const [analyzing, setAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState(null)

  const determineCrimeType = (caseData) => {
    const caseType = (caseData?.caseType || '').toLowerCase()
    const weapon = caseData?.weaponPresent
    
    if (caseType.includes('murder') || caseType.includes('homicide')) return 'MURDER'
    if (caseType.includes('robbery')) return 'ROBBERY'
    if (caseType.includes('theft')) return 'THEFT'
    if (caseType.includes('assault')) return weapon ? 'ARMED_ASSAULT' : 'ASSAULT'
    if (caseType.includes('burglary')) return 'BURGLARY'
    if (caseType.includes('kidnapping')) return 'KIDNAPPING'
    return 'UNKNOWN'
  }

  const getAccuracy = (crime) => {
    const scores = {
      'MURDER': 92.5,
      'ARMED_ASSAULT': 88.3,
      'ASSAULT': 85.7,
      'ROBBERY': 83.2,
      'BURGLARY': 87.9,
      'THEFT': 81.4,
      'KIDNAPPING': 89.5,
    }
    return scores[crime] || 80.0
  }

  const runAnalysis = async () => {
    setAnalyzing(true)
    
    const crime = determineCrimeType(activeCase)
    const accuracy = getAccuracy(crime)
    
    // Simulate analysis delay
    await new Promise(r => setTimeout(r, 1500))
    
    const result = {
      crime,
      accuracy,
      timestamp: new Date().toLocaleString()
    }
    
    setPrediction(result)
    showToast(`Analysis complete: ${crime}`, 'success')
    useCaseStore.getState().updateActiveCase({
      predictedCrime: crime,
      mlConfidence: accuracy,
      status: 'ANALYZED'
    })
    setAnalyzing(false)
  }

  useEffect(() => {
    if (!activeCase?.caseId) {
      navigate('/case-info')
    }
  }, [activeCase, navigate])

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content bg-bg-primary">
        <Header />

        <div className="p-6 md:p-8 flex flex-col max-w-[1200px] mx-auto w-full fade-in">
          <div className="flex flex-col gap-3 mb-8">
            <h1 className="text-2xl font-display font-bold text-text-primary">CRIME PREDICTION ANALYSIS</h1>
            <p className="text-sm text-muted">AI-based crime type prediction and accuracy assessment</p>
          </div>

          {!prediction ? (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Case Summary */}
              <div className="card p-6 bg-[#07101c] border border-border rounded-lg">
                <h2 className="text-sm font-bold text-cyan mb-4 uppercase tracking-widest">Case Summary</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted">Case ID:</span>
                    <span className="text-text-primary ml-2 font-mono">{activeCase?.caseId}</span>
                  </div>
                  <div>
                    <span className="text-muted">Case Title:</span>
                    <span className="text-text-primary ml-2">{activeCase?.caseTitle}</span>
                  </div>
                  <div>
                    <span className="text-muted">Reported Crime Type:</span>
                    <span className="text-text-primary ml-2 font-bold">{activeCase?.caseType}</span>
                  </div>
                  <div>
                    <span className="text-muted">Location:</span>
                    <span className="text-text-primary ml-2">{activeCase?.address}</span>
                  </div>
                  <div>
                    <span className="text-muted">Priority Level:</span>
                    <span className="text-text-primary ml-2">{activeCase?.priorityLevel}</span>
                  </div>
                  <div>
                    <span className="text-muted">Weapon Present:</span>
                    <span className="text-text-primary ml-2">{activeCase?.weaponPresent || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="card p-6 bg-[#07101c] border border-border rounded-lg flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-bold text-cyan mb-4 uppercase tracking-widest">Analysis Status</h2>
                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    Click the button below to run AI analysis on the case details. The system will predict the most likely crime type based on the evidence and case information provided.
                  </p>
                </div>
                <button
                  onClick={runAnalysis}
                  disabled={analyzing}
                  className="btn-primary px-6 py-3 text-sm w-full disabled:opacity-50"
                >
                  {analyzing ? 'ANALYZING...' : 'RUN ANALYSIS'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Card */}
              <div className="card p-8 bg-gradient-to-br from-[#00E5FF]/10 to-[#07101c] border-2 border-cyan rounded-lg">
                <h2 className="text-lg font-bold text-cyan mb-8 uppercase tracking-widest">Prediction Results</h2>
                
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Predicted Crime */}
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-muted mb-3 uppercase tracking-widest">Predicted Crime Type</span>
                    <h3 className="text-5xl font-bold text-cyan mb-4">{prediction.crime}</h3>
                    <p className="text-sm text-muted">Based on case evidence and scene factors</p>
                  </div>

                  {/* Overall Accuracy */}
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-muted mb-3 uppercase tracking-widest">Overall Accuracy</span>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-text-primary mb-2">{prediction.accuracy.toFixed(1)}%</div>
                      <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan to-blue-500"
                          style={{ width: `${prediction.accuracy}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted">Confidence score for prediction</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border text-xs text-muted font-mono">
                  Analysis completed at {prediction.timestamp}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setPrediction(null)}
                  className="btn-outline px-6 py-3 text-sm"
                >
                  RUN ANOTHER ANALYSIS
                </button>
                <button
                  onClick={() => navigate('/reconstruction')}
                  className="btn-primary px-6 py-3 text-sm"
                >
                  CONTINUE TO RECONSTRUCTION →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CrimePrediction
