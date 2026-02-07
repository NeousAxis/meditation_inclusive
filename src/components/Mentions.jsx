import React from 'react';
import './Mentions.css';
import { ShieldCheck, Server, FileText } from 'lucide-react';

const Mentions = ({ onBack }) => {
    return (
        <section className="mentions-section">
            <div className="mentions-container">
                <a onClick={onBack} className="back-link">← Retour au site</a>
                <h1 className="mentions-title">Mentions Légales</h1>

                <div className="mentions-block">
                    <h2 className="mentions-subtitle">
                        <ShieldCheck size={28} />
                        Éditeur du Site
                    </h2>
                    <p className="mentions-text">
                        <strong>Raison Sociale :</strong> Cyril Léger Méditation Inclusive<br />
                        <strong>Forme Juridique :</strong> Entreprise Individuelle (Suisse)<br />
                        <strong>Siège Social :</strong> Rue des Savoises, 9 1205 Genève Suisse<br />
                        <strong>Contact :</strong> cyril@meditationinclusive.com
                    </p>
                </div>

                <div className="mentions-block">
                    <h2 className="mentions-subtitle">
                        <Server size={28} />
                        Hébergement
                    </h2>
                    <p className="mentions-text">
                        <strong>Hébergeur :</strong> Infomaniak Network SA<br />
                        <strong>Adresse :</strong> Rue Eugène-Marziano 25, 1227 Les Acacias, Genève, Suisse<br />
                        <strong>Site Web :</strong> www.infomaniak.com
                    </p>
                </div>

                <div className="mentions-block">
                    <h2 className="mentions-subtitle">
                        <FileText size={28} />
                        Propriété Intellectuelle
                    </h2>
                    <p className="mentions-text">
                        L’ensemble de ce site relève de la législation suisse et internationale sur le droit d’auteur et la propriété intellectuelle.
                        Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                        <br /><br />
                        La reproduction de tout ou partie de ce site sur un support électronique quel qu’il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Mentions;
