import React from 'react';
import Resume from '../img/Resume(new).png'; 
import './ResumeView.css'; 

export default function ResumeViewer({ isOpen, onClose}) {
    
    if (!isOpen) return null;
    
    return (
      <div className="resume-overlay">
        <div className="resume-content">
          <div className="resume-header">
            <h2 className="resume-title">Full Resume</h2>
            <button 
              onClick={onClose}
              className="close-button"
            >
              Close
            </button>
          </div>
          <iframe
            src={Resume}
            className="resume-iframe"
            title="Resume PDF - Full View"
          />
        </div>
      </div>
    );
  }