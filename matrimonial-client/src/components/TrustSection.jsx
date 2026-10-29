import React from 'react';
import { FaUserCheck, FaShieldAlt, FaLock } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const TrustSection = () => {
    const { content } = useContent();
    const trustContent = content.home?.trust || {};

    return (
        <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-12 md:-mt-24 mb-16 md:mb-20 w-full">
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 md:p-12 border-t-4 border-primary">
                <div className="text-center mb-10">
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-2">{trustContent.subtitle}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        {trustContent.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                        <div className="mb-4 text-primary bg-primary-light p-3 rounded-full inline-block">
                            <FaUserCheck size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{trustContent.card1Title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {trustContent.card1Desc}
                        </p>
                    </div>

                    <div className="flex flex-col items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                        <div className="mb-4 text-primary bg-primary-light p-3 rounded-full inline-block">
                            <FaShieldAlt size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{trustContent.card2Title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {trustContent.card2Desc}
                        </p>
                    </div>

                    <div className="flex flex-col items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                        <div className="mb-4 text-primary bg-primary-light p-3 rounded-full inline-block">
                            <FaLock size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{trustContent.card3Title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {trustContent.card3Desc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustSection;
