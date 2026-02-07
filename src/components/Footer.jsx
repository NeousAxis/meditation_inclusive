import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = ({ onShowMentions }) => {
    return (
        <footer id="contact" className="footer-section">
            <div className="footer-container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="footer-brand"
                >
                    <h3 className="footer-title">Méditation Inclusive</h3>
                    <p className="footer-motto">"Il est difficile de distinguer les différences entre l'âme, l'esprit, le mental, la conscience."</p>
                </motion.div>

                <div className="footer-grid">
                    <div>
                        <h4 className="footer-col-title">Navigation</h4>
                        <ul className="footer-list">
                            <li><a href="#manifesto" className="footer-link">Manifeste</a></li>
                            <li><a href="#offerings" className="footer-link">Offres</a></li>
                            <li><a href="#" onClick={onShowMentions} className="footer-link">Mentions Légales</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Contact</h4>
                        <ul className="footer-list">
                            <li><a href="#contact" className="footer-link">Formulaire de contact</a></li>
                            <li className="footer-city">Genève, Suisse</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Réseaux</h4>
                        <p className="footer-city">Pas de présence sociale active.</p>
                        <p className="footer-city">Loin du bruit, proche du réel.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Méditation Inclusive. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
