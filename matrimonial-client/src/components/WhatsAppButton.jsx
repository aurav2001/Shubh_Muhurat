import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const phoneNumber = "918826266711";
    const message = "Hello! I would like to know more about Shubh Mhurat.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 flex items-center justify-center animate-bounce-slow"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp size={30} />
        </a>
    );
};

export default WhatsAppButton;
