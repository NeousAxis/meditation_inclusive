import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            {/* Background Orbs - Kept absolute */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: 360, opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="orb orb-1"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="orb orb-2"
            />

            <div className="hero-container">
                {/* Left Side: Visual/Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="hero-visual"
                >
                    <img
                        src="/logo/logo-arriere.jpg"
                        alt="Méditation Inclusive Branding"
                        className="hero-logo-img"
                    />
                </motion.div>

                {/* Right Side: Content */}
                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="hero-title"
                    >
                        J’aide les méditants à éclairer l’expérience intérieure.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="hero-text"
                    >
                        Il est difficile de distinguer les différences entre l'âme, l'esprit, le mental, la conscience.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="hero-actions"
                    >
                        <a
                            href="#manifesto"
                            className="btn-secondary"
                        >
                            Découvrir le manifeste
                        </a>
                        <a
                            href="#offerings"
                            className="btn-cta"
                        >
                            Voir les accompagnements
                        </a>
                    </motion.div>
                </div>
            </div>


        </section>
    );
};

export default Hero;
