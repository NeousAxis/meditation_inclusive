import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Mic2, Compass, Eye, ShieldCheck, Heart } from 'lucide-react';
import './Manifesto.css';

const Manifesto = () => {
    return (
        <section id="manifesto" className="manifesto-section">
            <div className="manifesto-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="manifesto-header"
                >
                    <h2 className="section-title">
                        Mon Rôle
                    </h2>
                    <div className="title-underline" />
                </motion.div>

                {/* Center the content vertically */}
                <div className="manifesto-content-wrapper">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="manifesto-intro-text"
                    >
                        <p>
                            "J’aide les personnes à comprendre ce qu’elles vivent intérieurement,
                            à partir de leur expérience réelle, telle qu’elle se présente."
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="intention-centered"
                    >
                        <h3 className="intention-title">
                            <Lightbulb className="icon-gold" size={28} /> Intention Fondamentale
                        </h3>
                        <ul className="intention-list-centered">
                            <li className="list-item">
                                <span className="dot" />
                                <span>Mettre des mots justes sur l’expérience intérieure</span>
                            </li>
                            <li className="list-item">
                                <span className="dot" />
                                <span>Distinguer ce qui est fréquemment confondu</span>
                            </li>
                            <li className="list-item">
                                <span className="dot" />
                                <span>Éclairer les états vécus et les hiérarchiser correctement</span>
                            </li>
                            <li className="list-item">
                                <span className="dot" />
                                <span>Permettre une intégration concrète dans la vie quotidienne</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Champ d'accompagnement */}
                <div className="champ-section">
                    <h3 className="section-title" style={{ textAlign: 'center', color: 'var(--text-heading)' }}>
                        Champ d’Accompagnement
                    </h3>
                    <div className="fields-grid" style={{ marginTop: '2.5rem' }}>
                        <Card
                            icon={<Eye color="#0d9488" />}
                            title="Observation"
                            desc="Nous observons le réel ses ramifications et ses implications."
                        />
                        <Card
                            icon={<ShieldCheck color="#0d9488" />}
                            title="Sans Dogme"
                            desc="Sans croyance imposée, sans promesse spirituelle."
                        />
                        <Card
                            icon={<Heart color="#0d9488" />}
                            title="Intégration"
                            desc="Intégration dans la vie réelle, relationnelle, professionnelle."
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

const Card = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="field-card"
    >
        <div className="icon-wrapper">
            {icon}
        </div>
        <h4 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
    </motion.div>
);

export default Manifesto;
