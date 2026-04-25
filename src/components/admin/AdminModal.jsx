import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', type = 'info' }) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h3 className="admin-modal__title">{title}</h3>
          <button className="admin-modal__close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="admin-modal__body">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            {type === 'danger' && <AlertTriangle size={24} style={{ color: '#ff4d4f', flexShrink: 0 }} />}
            <p style={{ margin: 0 }}>{message}</p>
          </div>
        </div>
        <div className="admin-modal__footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button 
            className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`} 
            onClick={() => { onConfirm(); onClose(); }}
            style={type === 'danger' ? { background: '#ff4d4f', color: '#fff', border: 'none' } : {}}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
