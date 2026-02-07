import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Offerings from './components/Offerings';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Mentions from './components/Mentions';
import BookingModal from './components/BookingModal'; // Import BookingModal
import './index.css';

function App() {
  const [showMentions, setShowMentions] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState('Individuel');

  const handleShowMentions = (e) => {
    e.preventDefault();
    setShowMentions(true);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setShowMentions(false);
    window.scrollTo(0, 0);
  };

  const openBooking = (type) => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  if (showMentions) {
    return (
      <div>
        <Header />
        <main>
          <Mentions onBack={handleBackToHome} />
        </main>
        <Footer onShowMentions={handleShowMentions} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Offerings onReserve={() => openBooking('Individuel')} onJoin={() => openBooking('Cercle')} />
        <Contact />
      </main>
      <Footer onShowMentions={handleShowMentions} />
      {/* Booking Modal Overlay */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        initialType={bookingType}
      />
    </div>
  );
}

export default App;
