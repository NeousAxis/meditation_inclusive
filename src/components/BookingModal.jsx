import React, { useState, useEffect } from 'react';
import './BookingModal.css';

// ===== CONFIGURATION DES CRÉNEAUX =====
const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const AVAILABLE_DAYS = [1, 2, 3, 4, 5]; // Lundi à Vendredi

// ===== DATES CERCLES (vide pour l'instant) =====
const CERCLE_DATES = [];
// ================================================

const MONTHS_FR = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

const formatDateFull = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
};

const CalendarPicker = ({ selectedDate, onSelectDate }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const isDateSelectable = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.getDay();
        // Must be a weekday and not in the past
        if (!AVAILABLE_DAYS.includes(dayOfWeek)) return false;
        if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return false;
        return true;
    };

    const handleDayClick = (day) => {
        if (!isDateSelectable(day)) return;
        const date = new Date(currentYear, currentMonth, day);
        onSelectDate(date);
    };

    const renderDays = () => {
        const days = [];
        // Empty cells for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }
        // Actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
            const isSelectable = isDateSelectable(day);
            const isToday = date.toDateString() === today.toDateString();

            days.push(
                <div
                    key={day}
                    className={`calendar-day 
                        ${isSelected ? 'selected' : ''} 
                        ${!isSelectable ? 'disabled' : ''} 
                        ${isToday ? 'today' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button type="button" className="calendar-nav" onClick={prevMonth}>&lt;</button>
                <span className="calendar-title">{MONTHS_FR[currentMonth]} {currentYear}</span>
                <button type="button" className="calendar-nav" onClick={nextMonth}>&gt;</button>
            </div>
            <div className="calendar-weekdays">
                {DAYS_FR.map((d, i) => (
                    <div key={i} className="calendar-weekday">{d}</div>
                ))}
            </div>
            <div className="calendar-grid">
                {renderDays()}
            </div>
        </div>
    );
};

const BookingModal = ({ isOpen, onClose, initialType }) => {
    const [bookingType, setBookingType] = useState(initialType || 'Individuel');
    const [name, setName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedCercleDate, setSelectedCercleDate] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState('form');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (initialType) setBookingType(initialType);
            setStep('form');
            setSelectedDate(null);
            setSelectedSlot('');
            setSelectedCercleDate('');
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen, initialType]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Demande de RDV: ${bookingType}`);

        let dateString = '';
        if (bookingType === 'Individuel' && selectedDate && selectedSlot) {
            dateString = `${formatDateFull(selectedDate)} à ${selectedSlot}`;
        } else if (bookingType === 'Cercle') {
            if (selectedCercleDate) {
                const found = CERCLE_DATES.find(d => d.value === selectedCercleDate);
                dateString = found ? found.label : selectedCercleDate;
            } else {
                dateString = 'Inscription liste d\'attente';
            }
        }

        const bodyContent = bookingType === 'Cercle'
            ? `Type: ${bookingType}\nNom: ${name}\nDate: ${dateString}\n\nMessage: ${message}`
            : `Type: ${bookingType}\nNom: ${name}\nCréneau: ${dateString}\nMessage: ${message}`;

        const body = encodeURIComponent(bodyContent);
        window.location.href = `mailto:cyril@meditationinclusive.com?subject=${subject}&body=${body}`;
        setStep('payment');
    };

    const isFormValid = () => {
        if (!name) return false;
        if (bookingType === 'Individuel' && (!selectedDate || !selectedSlot)) return false;
        return true;
    };

    return (
        <div className="booking-overlay" onClick={onClose}>
            <div className="booking-modal booking-modal-large" onClick={(e) => e.stopPropagation()}>
                <div className="booking-header">
                    <button className="close-btn" onClick={onClose}>×</button>
                    <h2 className="booking-title">
                        {step === 'form' ? 'Prise de Rendez-vous' : 'Validation'}
                    </h2>
                    <span className="booking-subtitle">
                        {step === 'form' ? bookingType : 'Confirmation'}
                    </span>
                </div>

                {step === 'form' ? (
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="booking-group">
                            <label className="booking-label">Type de séance</label>
                            <select
                                className="booking-select"
                                value={bookingType}
                                onChange={(e) => setBookingType(e.target.value)}
                            >
                                <option value="Individuel">Accompagnement Individuel</option>
                                <option value="Cercle">Cercle de Clarification</option>
                            </select>
                        </div>

                        <div className="booking-group">
                            <label className="booking-label">Votre Nom</label>
                            <input
                                type="text"
                                className="booking-input"
                                placeholder="ex: Jean Dupont"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {bookingType === 'Individuel' ? (
                            <>
                                <div className="booking-group">
                                    <label className="booking-label">Choisissez une date</label>
                                    <CalendarPicker
                                        selectedDate={selectedDate}
                                        onSelectDate={(d) => { setSelectedDate(d); setSelectedSlot(''); }}
                                    />
                                    {selectedDate && (
                                        <p className="selected-date-display">
                                            Date sélectionnée: <strong>{formatDateFull(selectedDate)}</strong>
                                        </p>
                                    )}
                                </div>

                                {selectedDate && (
                                    <div className="booking-group">
                                        <label className="booking-label">Choisissez un créneau horaire</label>
                                        <div className="slot-picker-grid">
                                            {TIME_SLOTS.map((slot, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                                                    onClick={() => setSelectedSlot(slot)}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="booking-group">
                                <label className="booking-label">Dates des Cercles</label>
                                <select
                                    className="booking-select"
                                    value={selectedCercleDate}
                                    onChange={(e) => setSelectedCercleDate(e.target.value)}
                                >
                                    {CERCLE_DATES.length > 0 ? (
                                        <>
                                            <option value="">-- Sélectionnez une date --</option>
                                            {CERCLE_DATES.map((d, i) => (
                                                <option key={i} value={d.value}>{d.label}</option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value="">Aucune date disponible (liste d'attente)</option>
                                    )}
                                </select>
                                {CERCLE_DATES.length === 0 && (
                                    <p className="booking-hint">
                                        Votre inscription vous placera sur liste d'attente.
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="booking-group">
                            <label className="booking-label">Message (Optionnel)</label>
                            <textarea
                                className="booking-textarea"
                                placeholder="Précisions supplémentaires..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ minHeight: '50px' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-cta booking-submit"
                            disabled={!isFormValid()}
                            style={{ opacity: isFormValid() ? 1 : 0.5 }}
                        >
                            {bookingType === 'Cercle'
                                ? (CERCLE_DATES.length > 0 ? "Réserver" : "S'inscrire sur liste d'attente")
                                : "Valider & Payer"
                            }
                        </button>
                    </form>
                ) : (
                    <div className="payment-content">
                        <div className="confirmation-icon">✓</div>
                        <p className="payment-text">
                            <strong>Merci {name} !</strong><br />
                            Votre demande a bien été envoyée.
                        </p>

                        {bookingType === 'Individuel' && (
                            <>
                                <p className="payment-text" style={{ fontSize: '0.9rem' }}>
                                    Créneau demandé :<br />
                                    <strong>{selectedDate && formatDateFull(selectedDate)} à {selectedSlot}</strong>
                                </p>
                                <div className="confirmation-box">
                                    <p className="confirmation-text">
                                        Nous allons vérifier la disponibilité de ce créneau et vous recontacterons par email pour confirmer et vous transmettre les modalités de paiement.
                                    </p>
                                </div>
                            </>
                        )}

                        {bookingType === 'Cercle' && (
                            <div className="confirmation-box">
                                <p className="confirmation-text">
                                    {selectedCercleDate
                                        ? "Nous confirmerons votre inscription et vous enverrons les modalités de paiement par email."
                                        : "Vous êtes inscrit sur liste d'attente. Nous vous contacterons dès que les prochaines dates seront fixées."
                                    }
                                </p>
                            </div>
                        )}

                        <button className="btn-secondary close-payment-btn" onClick={onClose}>
                            Fermer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
