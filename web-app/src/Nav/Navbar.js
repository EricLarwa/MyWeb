import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { openResume, closeResume } from '../resume/ResumeView';
import './Navbar.css'; 
import ResumeViewer from '../resume/ResumeView';

const NavBar = () => {
    const [navbarDark, setNavbarDark] = useState(true);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    
    const openResume = () => {
        setIsResumeOpen(true);
    };

    const closeResume = () => {
        setIsResumeOpen(false);
    }

    useEffect(() => {
        const handleScroll = () => {
            const experienceSection = document.getElementById('experience');
            
            if (experienceSection) {
                const experiencePosition = experienceSection.getBoundingClientRect().top;

                if (experiencePosition <= 80) { 
                    setNavbarDark(false);
                } else {
                    setNavbarDark(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Nav className={`navbar ${navbarDark ? 'navbar-dark' : 'navbar-light'}`}>
            <h1 className="Brand">Eric Larwa</h1>
            <ul className="upper">
                <li className="nav-li" onClick={() => scrollToSection('about')}>About</li>
                <li className="nav-li" onClick={() => scrollToSection('experience')}>Experience</li>
                <li className="nav-li" onClick={() => scrollToSection('contact')}>Contact</li>
                <li className="nav-li" onClick={openResume}>Resume</li>
            </ul>
            <ResumeViewer
            isOpen={isResumeOpen}
            onClose={closeResume}
            />
        </Nav>
    );
}

export default NavBar;