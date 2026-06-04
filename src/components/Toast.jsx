import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const value = useMemo(() => ({ showToast }), [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={() => dismissToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context.showToast
}

function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const timeout = setTimeout(onDismiss, 3500)
    return () => clearTimeout(timeout)
  }, [onDismiss])

  const background = type === 'success'
    ? 'rgba(0,180,80,0.95)'
    : type === 'error'
      ? 'rgba(220,50,50,0.95)'
      : 'rgba(0,150,255,0.95)'

  const borderColor = type === 'success' ? '#00FF88' : type === 'error' ? '#FF4444' : '#00E5FF'
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'

  return (
    <div style={{
      background,
      color: 'white',
      padding: '12px 24px',
      borderRadius: 8,
      fontFamily: 'Courier New, monospace',
      fontSize: 13,
      fontWeight: 600,
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      borderLeft: `4px solid ${borderColor}`,
      minWidth: 280,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }}>
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  )
}
