import React from 'react';
import { useState } from 'react'
import FontAwesome from 'react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Home.css'

import meniasThumb from '@/assets/images/menias/thumb.png'
import menilyThumb from '@/assets/images/menily/thumb.png'
import angularSeedThumb from '@/assets/images/angularjsseed/thumb.png'
import openFlushThumb from '@/assets/images/openflush/thumb.png'
import codeTutorThumb from '@/assets/images/codetutor/thumb.png'
import rr from '@/assets/rr.png'


export const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-sp">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span className="brand-text metallic-text">
                        <span className="letter-r">r</span>
                        <span className="expanded-text">oshan&nbsp;</span>
                        <span className="letter-dot hidden-dot">.</span>
                        <span className="letter-raj">raj</span>
                    </span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/works">Works</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Me</Link>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/about">About</Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/services">Services</Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export const Home = () => {

    return (
        <div className="home page row">
            <div className="col-lg-6 pp">
                <img src={rr} alt="placeholder" />
            </div>
            <div className="col-lg-6 intro">
                <div className="intro" >
                    <div className="col-lg-12">
                        <h1 className="text-center" style={{fontSize:"2rem", fontWeight:"400"}}>
                            Hi, I'm <span style={{fontSize:"2.1rem", fontWeight:"700"}}>Roshan Raj</span>, based in Vancouver.
                        </h1>
                        <p className="text-center" style={{fontSize:"1.1rem"}}>
                            Driven by <span style={{fontSize:"1.2rem", fontWeight:"500"}}>Horsepower, Innovation, and Endless Curiosity</span>.
                        </p>
                        <div className="col-lg-12 link_panel text-center">
                            <a href="https://github.com/roshanraj" target="_blank">
                                <FontAwesome
                                    className=''
                                    name='github'
                                    size='2x'
                                /></a>
                            <a href="https://www.linkedin.com/in/roshan-raj-02382589?trk=hp-identity-name"  target="_blank">
                                <FontAwesome
                                    className=''
                                    name='linkedin'
                                    size='2x'
                                /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div> );
}

export const Works = () => {
    const projects = [
        {
            title: "Menias",
            description: "A software development project", // You should add actual description
            technologies: ["JavaScript", "React"], // Add actual technologies used
            imageUrl: meniasThumb,
            githubUrl: "https://github.com/yourusername/menias", // Add if available
            liveUrl: "/work/menias/demo",
            type: "Software"
        },
        {
            title: "Menily",
            description: "A web development project", // You should add actual description
            technologies: ["JavaScript", "Node.js"], // Add actual technologies used
            imageUrl: menilyThumb,
            githubUrl: "https://github.com/yourusername/menily", // Add if available
            liveUrl: "/work/menily/demo",
            type: "Website"
        },
        {
            title: "Angularjs Seed",
            description: "A starter template for AngularJS applications", // You should add actual description
            technologies: ["AngularJS", "JavaScript"], // Add actual technologies used
            imageUrl: angularSeedThumb,
            githubUrl: "https://github.com/roshanraj/angular-webpack-seed", // Add if available
            liveUrl: "https://github.com/roshanraj/angular-webpack-seed",
            type: "Software"
        },
        {
            title: "Open Flush",
            description: "An open-source project", // You should add actual description
            technologies: ["Java","swing","javafx","networking","socket"], // Add actual technologies used
            imageUrl: openFlushThumb,
            githubUrl: "", // Add if available
            liveUrl: "https://www.youtube.com/watch?v=axxcczqIjsk",
            type: "Software"
        },
        {
            title: "Interactive Code Tutor",
            description: "An interactive platform for learning to code", // You should add actual description
            technologies: ["JavaScript", "Educational Technology"], // Add actual technologies used
            imageUrl: codeTutorThumb,
            githubUrl: "https://github.com/yourusername/ict", // Add if available
            liveUrl: "/work/ict/demo",
            type: "Software"
        }
    ];

    

    return (
        <div className="page works-page">
            <h2 className="text-center mb-5">My Works</h2>
            
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-image">
                            <img src={project.imageUrl} alt={project.title} />
                        </div>
                        <div className="project-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <FontAwesome name="github" /> Code
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                        <FontAwesome name="external-link" /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const Contact = () => {
    return (
        <div className="page">
            <h2>Contact Me</h2>
            <p>Provide your contact details or a form here.</p>
        </div>
    );
}

export const About = () => {
    return (
        <div className="page">
            <h2>About</h2>
            <p>Include information about yourself or your organization here.</p>
        </div>
    );
}

export const Services = () => {
    return (
        <div className="page">
            <h2>Services</h2>
            <p>Detail the services you provide or offer.</p>
        </div>
    );
}
