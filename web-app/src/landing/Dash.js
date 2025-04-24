import React from 'react'
import Eric from '../img/Eric.JPEG';
import './Dash.css'; 

const Dash = () => {
    return (
        <div className="dash-container">
            <div className="img-box">
                <img src={Eric} className="Eric" alt="Eric" />
                <div className="image-border"></div>
            </div>

            <div className="text-box">
                <h1 className="dash-title">Software <br></br>Developer <span className="pe">.</span></h1>
                <p className="dash-text"> 2+ years building scalable web applications. <br></br>Proficient in modern JavaScript frameworks, database design, and API integration.</p>
                <p className="dash-text">Passionate about creating user-friendly interfaces and optimizing performance.</p>
                
                <div className="text-box2">
                    <h1 className="other-title">Design</h1>
                    <p className="dash-text">Skilled in UI/UX design principles and tools.</p>
                    <p className="dash-text">Experience with wireframing, prototyping, and user testing.</p>
                </div>
                
                <div className="text-box3">
                    <h1 className="other-title">Engineering</h1>
                    <p className="dash-text">Strong foundation in software engineering principles.</p>
                    <p className="dash-text">Experience with Agile methodologies and version control.</p>
                    <p className="dash-text">Proficient in debugging, testing, and code reviews.</p>
                </div>
            </div>
        </div>
    );
}
export default Dash;