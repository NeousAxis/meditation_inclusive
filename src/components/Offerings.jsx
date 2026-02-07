import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, CheckCircle, Clock, Video, MapPin, Calendar, CreditCard } from 'lucide-react';
import './Offerings.css';

const PricingCard = ({ title, subtitle, icon, features, details, prices, cta, accentColor, note, onCtaClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`pricing-card ${accentColor}`}
        >
            <div className={`card-icon-wrapper ${accentColor}`}>
                {icon}
            </div>

            <h3 className="offerings-title price-title">{title}</h3>
            <p className={`price-subtitle ${accentColor}`}>{subtitle}</p>

            <div className="details-grid">
                {details.map((d, i) => (
                    <div key={i} className="detail-item">
                        <span className={accentColor === 'blue' ? 'text-blue-400' : 'text-purple-400'}>{d.icon}</span>
                        <span className="detail-text">{d.text}</span>
                    </div>
                ))}
            </div>

            <ul className="features-list">
                {features.map((f, i) => (
                    <li key={i} className="feature-item">
                        <CheckCircle size={18} className="feature-check" />
                        <span className="feature-text">{f}</span>
                    </li>
                ))}
            </ul>

            <div className="prices-list">
                {prices.map((p, i) => (
                    <div key={i} className="price-row">
                        <span className="price-label">{p.label}</span>
                        <span className="price-value">{p.price}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <p className="note-text">{note}</p>
                <button
                    className={`cta-button ${accentColor}`}
                    onClick={onCtaClick}
                >
                    {cta}
                </button>
            </div>
        </motion.div>
    );
};

const Offerings = ({ onReserve, onJoin }) => {
    return (
        <section id="offerings" className="offerings-section">
            {/* Background elements */}
            <div className="offerings-bg">
                <div className="bg-blur-purple" />
                <div className="bg-blur-blue" />
            </div>

            <div className="offerings-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="offerings-header"
                >
                    <h2 className="offerings-title">
                        Cadre d’Accompagnement
                    </h2>
                </motion.div>

                <div className="pricing-grid">

                    {/* Individual Offer */}
                    <PricingCard
                        title="Accompagnement Individuel"
                        subtitle="Visio Uniquement"
                        icon={<User size={40} />}
                        features={[
                            "Écoute fine de l’expérience vécue",
                            "Clarification verbale précise",
                            "Différenciation des instances intérieures",
                            "Intégration dans la vie réelle"
                        ]}
                        details={[
                            { icon: <Clock size={18} />, text: "60 minutes" },
                            { icon: <User size={18} />, text: "1:1" },
                            { icon: <Video size={18} />, text: "Visio (Google Meet)" }
                        ]}
                        prices={[
                            { label: "Séance unique", price: "140 CHF" },
                            { label: "Pack 3 séances", price: "390 CHF" },
                            { label: "Pack 5 séances", price: "620 CHF" }
                        ]}
                        cta="Réserver une séance"
                        accentColor="blue"
                        note=""
                        onCtaClick={onReserve}
                    />

                    {/* Circles Offer */}
                    <PricingCard
                        title="Cercles de Clarification"
                        subtitle="Visio & Présentiel"
                        icon={<Users size={40} />}
                        features={[
                            "Clarification conceptuelle",
                            "Mise en commun des expériences",
                            "Intelligence collective",
                            "Intégration concrète"
                        ]}
                        details={[
                            { icon: <Clock size={18} />, text: "90 minutes" },
                            { icon: <Users size={18} />, text: "6 à 12 personnes" },
                            { icon: <MapPin size={18} />, text: "Lieux neutres" }
                        ]}
                        prices={[
                            { label: "Tarif par personne", price: "45 CHF" },
                            { label: "Carte 5 cercles", price: "180 CHF" }
                        ]}
                        cta="Rejoindre un cercle"
                        accentColor="purple"
                        note="Le groupe permet la résonance et la normalisation des vécus."
                        onCtaClick={onJoin}
                    />

                </div>
            </div>
        </section>
    );
};

export default Offerings;
