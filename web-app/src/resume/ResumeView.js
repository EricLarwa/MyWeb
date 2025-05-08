import React, { useState, useEffect } from 'react';
import Resume from '../img/Resume(new).png'; 
import './ResumeView.css'; 

export default function ResumeViewer({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleEscKey = (event) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="resume-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="resume-content">
        <div className="resume-header">
          <h2 className="resume-title">Full Resume</h2>
          <button 
            onClick={onClose}
            className="close-button"
            aria-label="Close resume viewer"
          >
            Close
          </button>
        </div>
        
        <div className="resume-container">
          {isLoading && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '100%',
              width: '100%'
            }}>
              Loading resume...
            </div>
          )}
          
          <img
            src={Resume}
            className="resume-image"
            alt="Resume"
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        </div>
      </div>
    </div>
  );
}