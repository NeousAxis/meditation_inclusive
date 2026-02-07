import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="header"
        >
            <div className="container header-content">
                {/* Logo */}
                <div className="logo-container">
                    <h1 className="logo-text">
                        Méditation Inclusive
                    </h1>
                </div>

                {/* Navigation - simplified for now */}
                <nav className="nav">
                    <a href="#manifesto" className="nav-link">Manifeste</a>
                    <a href="#offerings" className="nav-link">Offres</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
