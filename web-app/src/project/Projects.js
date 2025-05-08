import React, { useEffect, useRef } from "react";
import SkillSprint from '../img/SkillSprint.png';
import eCommerce from '../img/eCommerce.png';
import SmartGym from '../img/SmartGym.png';
import GitHub from '../img/github.png';
import './Projects.css';

const Projects = () => {
    const imageRefs = useRef([]);
    const cardRefs = useRef([]);
    const project2Ref = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 
        };

        const handleImageIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-from-left');
                }
            });
        };

        const handleCardIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-from-right');
                }
            });
        };

        const currentImages = imageRefs.current;
        const currentCards = cardRefs.current;
        const imageObserver = new IntersectionObserver(handleImageIntersect, observerOptions);
        const cardObserver = new IntersectionObserver(handleCardIntersect, observerOptions);

        currentImages.forEach(ref => {
            if (ref) imageObserver.observe(ref);
        });

        currentCards.forEach(ref => {
            if (ref) cardObserver.observe(ref);
        });

        return () => {
            currentImages.forEach(ref => {
                if (ref) imageObserver.unobserve(ref);
            });
            currentCards.forEach(ref => {
                if (ref) cardObserver.unobserve(ref);
            });
        };
    }, []);

    const addToImageRefs = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    const addToCardRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    return (
        <div className="container">
            <h1 className="projects-title">Projects</h1>
            
            <div className="projects-container">
                <div 
                    className="card-container slide-from-left" 
                    ref={addToImageRefs}
                >
                    <img src={SkillSprint} className="project-image" alt="SkillSprint" />
                </div>
                <div 
                    className="card-wrapper slide-from-right" 
                    ref={addToCardRefs}
                >
                    <p className="label">Flask, React, SQLite</p>
                    <div className="card-box">
                        <h4 className="proj-head">SkillSprint</h4>
                        <p className="proj-text">
                        an application that allows you to become more efficient in
                        finances, languages, and even coding!
                        </p>
                    </div>
                    <img src={GitHub} href="http://GitHub.com/EricLarwa/SkillSprint" className="Github" alt=""git/>
                </div>
            </div>
            
            <div className="projects-container-two" ref={project2Ref}>
                <div 
                    className="card-container-two slide-from-right" 
                    ref={addToImageRefs}
                >
                    <img src={eCommerce} className="project-image-two" alt="eCommerce Analysis" />
                    
                </div>
                <div 
                    className="card-wrapper-two slide-from-left" 
                    ref={addToCardRefs}
                >
                    <p className="label-two">Python, PostgreSQL, MongoDB</p>
                    <div className="card-box">
                        <h4 className="proj-head">eCommerce Analysis</h4>
                        <p className="proj-text">
                        Data analysis of a Kagglehub dataset, containing over 10 million records, to uncover trends and insights in eCommerce performance.
                        </p>
                    </div>
                    <img src={GitHub} href="http://GitHub.com/EricLarwa/eCommerce-Analysis" className="Github2" alt=""git/>
                </div>
            </div>
            
            <div className="projects-container-three">
                <div 
                    className="card-container slide-from-left" 
                    ref={addToImageRefs}
                >
                    <img src={SmartGym} className="project-image" alt="Smart Gym Companions" />
                </div>
                <div 
                    className="card-wrapper-three slide-from-right" 
                    ref={addToCardRefs}
                >
                    <p className="label">React, Express, SQLite</p>
                    <div className="card-box">
                        <h4 className="proj-head">Smart Gym Companions</h4>
                        <p className="proj-text">
                        Comprehensive fitness tracking application designed to revolutionize your gym experience. Helping you plan workouts, monitor progress, and stay motivated.
                        </p>
                    </div>
                    <img src={GitHub} href="https://github.com/ECU-SENG4235/group-project-smart-gym-companion-application" className="Github" alt=""git/>
                </div>
            </div>
        </div>
    );
}

export default Projects;