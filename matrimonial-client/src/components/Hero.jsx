import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationModal from './RegistrationModal';
import { FaChevronDown, FaCheck, FaHeart, FaStar, FaSpinner } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import axios from 'axios';

const defaultImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
];

// Floating hearts animation component
const FloatingHearts = () => {
    const hearts = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 87}%`,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 8 + Math.random() * 14,
        opacity: 0.08 + Math.random() * 0.12,
    }));

    return (
        <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0, rotate: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, heart.opacity, heart.opacity, 0],
                        rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute text-white"
                    style={{ left: heart.left, fontSize: heart.size }}
                >
                    <FaHeart />
                </motion.div>
            ))}
        </div>
    );
};

// Sparkle/Star decoration
const SparkleDecor = () => {
    const sparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        delay: Math.random() * 4,
        size: 6 + Math.random() * 8,
    }));

    return (
        <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
            {sparkles.map((s) => (
                <motion.div
                    key={s.id}
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        delay: s.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute text-amber-200"
                    style={{ left: s.left, top: s.top, fontSize: s.size }}
                >
                    <FaStar />
                </motion.div>
            ))}
        </div>
    );
};

const CustomDropdown = ({ label, options, placeholder = "Select", icon, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col items-start w-full group relative" ref={dropdownRef}>
            <label className="text-[10px] font-bold text-amber-800/70 block mb-1 uppercase tracking-[0.15em] text-left w-full">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-transparent flex justify-between items-center cursor-pointer select-none group-hover:opacity-80 transition-opacity"
            >
                <span className={`font-medium text-sm md:text-base text-left ${selected ? 'text-gray-800' : 'text-gray-400'}`}>
                    {selected || placeholder}
                </span>
                <FaChevronDown size={10} className={`text-amber-600/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-700' : ''}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute bottom-full left-0 w-full bg-white backdrop-blur-xl border border-amber-100 rounded-xl shadow-2xl shadow-amber-900/10 mb-2 max-h-60 overflow-y-auto z-[100] py-1.5 custom-scrollbar"
                    >
                        {options.map((opt, idx) => (
                            <li
                                key={idx}
                                onClick={() => {
                                    setSelected(opt);
                                    setIsOpen(false);
                                    if (onChange) onChange(opt);
                                }}
                                className={`px-4 py-2.5 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 cursor-pointer flex justify-between items-center text-sm transition-all duration-200 ${selected === opt ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 font-semibold' : 'text-gray-600'}`}
                            >
                                {opt}
                                {selected === opt && <FaCheck size={10} className="text-amber-700" />}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

const Hero = () => {
    const { content } = useContent();
    const heroContent = content.home?.hero || {};
    const API_URL = import.meta.env.VITE_API_URL || '';

    const backgroundImages = heroContent.bgImage ? [heroContent.bgImage, ...defaultImages] : defaultImages;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [heroForm, setHeroForm] = useState({ name: '', allianceFor: '', motherTongue: '', mobile: '' });
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success, error

    const handleHeroSubmit = async () => {
        if (!heroForm.name || !heroForm.mobile) {
            alert('Please enter your name and mobile number.');
            return;
        }
        if (heroForm.mobile.length < 10) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }
        setSubmitStatus('sending');
        try {
            await axios.post(`${API_URL}/hero-inquiry`, heroForm);
            setSubmitStatus('success');
            setHeroForm({ name: '', allianceFor: '', motherTongue: '', mobile: '' });
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (error) {
            console.error('Hero form error details:', error.response ? error.response.data : error.message);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [backgroundImages.length]);

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Premium Background Slider with Ken Burns */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <motion.div
                        animate={{ scale: [1.05, 1.12] }}
                        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${backgroundImages[currentImageIndex]}')` }}
                    />
                    {/* Rich multi-layer gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-rose-900/20 z-10"></div>
                </motion.div>
            </AnimatePresence>

            {/* Floating decorations */}
            <FloatingHearts />
            <SparkleDecor />

            {/* Slide Indicators removed by user request */}

            <div className="relative z-10 w-full max-w-6xl px-4 text-center mt-48 md:mt-36 pb-20 md:pb-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Decorative top element */}
                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60"></div>
                        <FaHeart className="text-amber-400/80 text-sm" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60"></div>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-5 leading-tight">
                        <span className="drop-shadow-2xl">{heroContent.title} </span>
                        <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-none">
                            {heroContent.highlight}
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-white/70 mb-6 max-w-2xl mx-auto font-light leading-relaxed tracking-wide px-2">
                        {heroContent.subtitle}
                    </motion.p>

                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8 md:mb-10 px-4 md:px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 text-xs md:text-sm font-medium tracking-wide shadow-xl">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></span>
                        {heroContent.badge || "#1 Trusted Matrimonial Site"}
                    </motion.div>
                </motion.div>

                {/* Premium Search Form Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative mx-auto max-w-[1100px]"
                >
                    {/* Glow effect behind the form */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-300/10 to-amber-500/20 rounded-3xl blur-xl opacity-60"></div>

                    <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-white/60">
                        {/* Subtle top gold accent line */}
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent rounded-t-2xl"></div>

                        <div className="flex flex-col md:flex-row items-stretch w-full">
                            {/* Name Field */}
                            <div className="flex-1 text-left px-4 py-3 md:px-5 md:py-4 border-b md:border-b-0 md:border-r border-gray-200/40 hover:bg-amber-50/30 transition-colors duration-300">
                                <label className="text-[10px] font-bold text-amber-800/70 uppercase tracking-[0.15em] block mb-1 text-left">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={heroForm.name}
                                    onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                                    className="w-full bg-transparent text-gray-800 font-medium text-sm md:text-base outline-none placeholder-gray-400 caret-amber-600"
                                />
                            </div>

                            {/* Elite Alliance for Dropdown */}
                            <div className="flex-1 text-left px-4 py-3 md:px-5 md:py-4 border-b md:border-b-0 md:border-r border-gray-200/40 hover:bg-amber-50/30 transition-colors duration-300 flex flex-col justify-center">
                                <CustomDropdown label="Elite Alliance for" options={["Myself", "Son", "Daughter", "Brother", "Sister", "Friend"]} onChange={(val) => setHeroForm({ ...heroForm, allianceFor: val })} />
                            </div>

                            {/* Mother Tongue Dropdown */}
                            <div className="flex-1 text-left px-4 py-3 md:px-5 md:py-4 border-b md:border-b-0 md:border-r border-gray-200/40 hover:bg-amber-50/30 transition-colors duration-300 flex flex-col justify-center">
                                <CustomDropdown label="Mother Tongue" options={["Hindi", "English", "Marathi", "Punjabi", "Bengali", "Tamil", "Telugu"]} onChange={(val) => setHeroForm({ ...heroForm, motherTongue: val })} />
                            </div>

                            {/* Mobile Number Field */}
                            <div className="flex-1 text-left px-4 py-3 md:px-5 md:py-4 border-b md:border-b-0 md:border-r border-gray-200/40 hover:bg-amber-50/30 transition-colors duration-300">
                                <label className="text-[10px] font-bold text-amber-800/70 uppercase tracking-[0.15em] block mb-1 text-left">Mobile Number</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-amber-700/70 font-semibold text-sm md:text-base flex-shrink-0">+91</span>
                                    <div className="w-px h-4 bg-amber-300/40 flex-shrink-0"></div>
                                    <input
                                        type="tel"
                                        placeholder="Enter mobile no."
                                        maxLength={10}
                                        value={heroForm.mobile}
                                        onChange={(e) => setHeroForm({ ...heroForm, mobile: e.target.value.replace(/\D/g, '') })}
                                        className="w-full bg-transparent text-gray-800 font-medium text-sm md:text-base outline-none placeholder-gray-400 caret-amber-600 min-w-0"
                                    />
                                </div>
                            </div>

                            {/* Premium Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleHeroSubmit}
                                disabled={submitStatus === 'sending'}
                                className="relative flex items-center justify-center gap-2.5 px-6 md:px-10 py-4 md:py-0 text-white font-bold text-base tracking-wide whitespace-nowrap overflow-hidden group rounded-b-2xl md:rounded-b-none md:rounded-r-2xl w-full md:w-auto min-w-0 md:min-w-[160px]"
                                style={{ background: submitStatus === 'success' ? 'linear-gradient(145deg, #15803d, #16a34a)' : submitStatus === 'error' ? 'linear-gradient(145deg, #b91c1c, #dc2626)' : 'linear-gradient(145deg, #7B5B1E, #A67C00, #C5963A)' }}
                            >
                                {/* Button shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                                {submitStatus === 'sending' ? (
                                    <><FaSpinner className="animate-spin" /> Sending...</>
                                ) : submitStatus === 'success' ? (
                                    <>✓ Sent!</>
                                ) : submitStatus === 'error' ? (
                                    <>Failed. Retry?</>
                                ) : (
                                    <>Submit <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="text-xl">→</motion.span></>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Trust indicators below form */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex items-center justify-center gap-6 mt-6 text-white/50 text-xs font-medium tracking-wide"
                >
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/70"></span>
                        100% Verified Profiles
                    </span>
                    <span className="hidden md:inline text-white/20">|</span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70"></span>
                        10M+ Happy Members
                    </span>
                    <span className="hidden md:inline text-white/20">|</span>
                    <span className="hidden md:flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400/70"></span>
                        Premium Matchmaking
                    </span>
                </motion.div>
            </div>

            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Hero;
