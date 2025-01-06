import React from 'react';
import { useState } from 'react'
import FontAwesome from 'react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Home.css'
export const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-sp">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">r.raj</Link>
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
                <img src="src/assets/rr.png" alt="placeholder" />
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
    return (
        <div className="page">
            <h2>Works</h2>
            <p>Here you can showcase your projects or portfolio.</p>
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
