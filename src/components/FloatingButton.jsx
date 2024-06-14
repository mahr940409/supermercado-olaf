import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import '../components/FloatingButton.css';

const FloatingButton = () => {
  const whatsappLink = "https://wa.me/593982539427";

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="floating-button">
      <BsWhatsapp size={30} color="#fff" /> {}
    </a>
  );
};

export default FloatingButton;
