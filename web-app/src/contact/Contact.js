// Contact.jsx
import { useState } from 'react';
import './Contact.css';

export default function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Contact.jsx - updated handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.message) {
    setFormStatus({
      submitted: false,
      error: true,
      message: 'Please fill in all required fields.'
    });
    return;
  }
  
  try {
    const response = await fetch('http://localhost:4000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    setFormStatus({
      submitted: false,
      error: true,
      message: 'Failed to submit the form. Please try again later.'
    });
  }
};

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-card">
            <div className="contact-header">
            <h2>Get In Touch</h2>
            <p>Have a question or want to work together? Send me a message!</p>
            </div>
            
            <div className="contact-content">
            <div className="contact-info">
                <div className="info-item">
                <h3>Email</h3>
                <p>eric.larwa@gmail.com</p>
                </div>
                <div className="info-item">
                <h3>Location</h3>
                <p>Greenville, NC, USA</p>
                </div>
                <div className="info-item">
                <h3>Connect</h3>
                <div className="social-links">
                    <a href="https://linkedin.com/in/eric-larwa-b3b2382a1/" className="social-link" aria-label="LinkedIn">
                    LinkedIn
                    </a>
                    <a href="https://github.com/EricLarwa" className="social-link" aria-label="GitHub">
                    GitHub
                    </a>
                </div>
                </div>
            </div>
            
            <div className="contact-form-container">
                {formStatus.submitted ? (
                <div className="form-success-message">
                    <p>{formStatus.message}</p>
                    <button 
                    onClick={() => setFormStatus({ submitted: false, error: false, message: '' })}
                    className="send-another-btn"
                    >
                    Send Another Message
                    </button>
                </div>
                ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                    {formStatus.error && (
                    <div className="form-error-message">
                        <p>{formStatus.message}</p>
                    </div>
                    )}
                    
                    <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows="5" 
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    </div>
                    
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
                )}
            </div>
            </div>
        </div>
        <img className="avtr" alt="avtr" src="https://avatar.iran.liara.run/public/17" />
      </div>
    </section>
  );
}