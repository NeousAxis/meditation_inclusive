import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since there is no backend, we simulate sending by using a mailto fallback for now
        // Ideally integrating with a service like Formspree or EmailJS
        const subject = encodeURIComponent(`Nouveau message de ${formData.name}`);
        const body = encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:cyril@meditationinclusive.com?subject=${subject}&body=${body}`;
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <h2 className="section-title">Prendre Contact</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-textarea"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-cta submit-btn">Envoyer</button>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
                        * Cliquer sur envoyer ouvrira votre client mail par défaut.
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Contact;
