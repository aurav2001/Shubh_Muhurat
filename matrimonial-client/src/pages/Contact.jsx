import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaChevronDown, FaCheck, FaSpinner } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import axios from 'axios';

// ... (ContactInfoCard component remains unchanged) ...
const ContactInfoCard = ({ icon: Icon, title, content, delay, color, actionText, onAction }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 100 }}
        className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden border border-gray-100"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110`}></div>

        <div className={`w-16 h-16 bg-${color}-50 rounded-2xl flex items-center justify-center text-${color}-500 mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-sm`}>
            <Icon size={28} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <div className="text-gray-600 font-medium leading-relaxed mb-8 min-h-[48px]">
            {content}
        </div>

        <button
            onClick={onAction}
            className={`w-full py-3 rounded-xl border-2 border-${color}-100 text-${color}-600 font-bold hover:bg-${color}-50 hover:border-${color}-200 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-${color}-100/50`}
        >
            {actionText} <FaPaperPlane size={12} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
    </motion.div>
);

const Contact = () => {
    const { content } = useContent();
    const contactPage = content.contactPage || {};
    const topSection = contactPage.topSection || {};
    const hero = contactPage.hero || {};
    const formSection = contactPage.formSection || {};
    const info = contactPage.info || {};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (key) => {
        setActiveAccordion(activeAccordion === key ? null : key);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const API_URL = import.meta.env.VITE_API_URL || '';
            await axios.post(`${API_URL}/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error("Contact Error", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };



    return (
        <div className="min-h-screen bg-[#FFFEFB] pt-28 pb-20 relative overflow-hidden">
            {/* Background Abstract Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-pink-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Brand Text Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black text-gray-900 mb-4 tracking-tighter"
                    >
                        {topSection.titlePart1 || "Shubh"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">{topSection.titlePart2 || "Mhurat"}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-500 font-medium italic"
                    >
                        {topSection.tagline || "\"Where auspicious beginnings lead to endless love.\""}
                    </motion.p>
                </div>

                {/* Aesthetic Split Section - Moved to Top */}
                <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row mb-20 relative z-20">


                    {/* Visual Side (Left) - Enhanced */}
                    <div className="md:w-5/12 relative p-12 flex flex-col justify-between text-white overflow-hidden bg-gray-900">
                        {/* Dynamic Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-orange-500 opacity-90"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

                        {/* Decorative Circles */}
                        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-20%] left-[-20%] w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 pt-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight"
                            >
                                {hero.title || "Let's start a"} <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-white to-purple-200">
                                        {hero.highlight || "Conversation"}
                                    </span>
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-white opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                            </motion.h1>
                            <p className="text-white/90 text-lg font-light leading-relaxed max-w-sm">
                                {hero.subtitle || "Whether you're looking for a match or need assistance, our team is ready to help you write your success story."}
                            </p>
                        </div>

                        <div className="relative z-10 mt-12">
                            <h4 className="font-semibold text-sm uppercase tracking-widest mb-6 opacity-80">Connect across socials</h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: FaFacebookF, url: content.socialLinks?.facebook },
                                    { icon: FaTwitter, url: content.socialLinks?.twitter },
                                    { icon: FaInstagram, url: content.socialLinks?.instagram },
                                    { icon: FaLinkedinIn, url: content.socialLinks?.linkedin }
                                ].map((item, idx) => (
                                    <a key={idx} href={item.url || "#"} target={item.url ? "_blank" : "_self"} rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white hover:text-purple-600 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 group">
                                        <item.icon size={20} className="transform group-hover:scale-110 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Side (Right) - Enhanced */}
                    <div className="md:w-7/12 p-10 md:p-14 bg-white relative overflow-hidden">
                        {/* Decorative background element for form */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[4rem] -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="mb-10 relative z-10">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">
                                {formSection.titlePart1 || "Send a"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{formSection.titlePart2 || "Message"}</span>
                            </h2>
                            <p className="text-gray-500 font-medium">{formSection.subtitle || "Have a question? We're here to help."}</p>
                            <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-4"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block p-3 md:p-4 w-full text-gray-900 bg-transparent border-2 border-gray-100 rounded-xl md:rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer transition-colors font-medium bg-gray-50/50 text-sm md:text-base"
                                        placeholder=" "
                                    />
                                    <label htmlFor="name" className="absolute text-xs md:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 font-semibold pointer-events-none">
                                        Your Name
                                    </label>
                                </div>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block p-3 md:p-4 w-full text-gray-900 bg-transparent border-2 border-gray-100 rounded-xl md:rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer transition-colors font-medium bg-gray-50/50 text-sm md:text-base"
                                        placeholder=" "
                                    />
                                    <label htmlFor="email" className="absolute text-xs md:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 font-semibold pointer-events-none">
                                        Email Address
                                    </label>
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="absolute text-xs md:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-3 font-semibold pointer-events-none text-purple-600">
                                    Select Topic
                                </label>
                                <div
                                    className="relative"
                                    onClick={() => toggleAccordion('subjectDropdown')}
                                >
                                    <div className="block p-3 md:p-4 w-full text-gray-900 bg-transparent border-2 border-gray-100 rounded-xl md:rounded-2xl cursor-pointer hover:border-purple-300 transition-colors font-medium bg-gray-50/50 flex justify-between items-center group-hover:border-purple-200 text-sm md:text-base">
                                        <span className={formData.subject ? "text-gray-900" : "text-gray-400"}>
                                            {formData.subject || "Choose a relevant topic"}
                                        </span>
                                        <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${activeAccordion === 'subjectDropdown' ? 'rotate-180 text-purple-600' : ''}`} />
                                    </div>

                                    <AnimatePresence>
                                        {activeAccordion === 'subjectDropdown' && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-xl shadow-xl mt-2 overflow-hidden z-50 p-2"
                                            >
                                                {["General Inquiry", "Membership Support", "Technical Issue", "Feedback"].map((option, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleChange({ target: { name: 'subject', value: option } });
                                                            setActiveAccordion(null);
                                                        }}
                                                        className={`px-4 py-3 rounded-lg hover:bg-purple-50 cursor-pointer flex justify-between items-center text-xs md:text-sm font-medium transition-colors ${formData.subject === option ? 'bg-purple-50 text-purple-700' : 'text-gray-600'}`}
                                                    >
                                                        {option}
                                                        {formData.subject === option && <FaCheck size={12} />}
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="relative group">
                                <textarea
                                    name="message"
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="block p-3 md:p-4 w-full text-gray-900 bg-transparent border-2 border-gray-100 rounded-xl md:rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer transition-colors font-medium bg-gray-50/50 resize-none text-sm md:text-base"
                                    placeholder=" "
                                ></textarea>
                                <label htmlFor="message" className="absolute text-xs md:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 font-semibold pointer-events-none">
                                    Your Message
                                </label>
                            </div>

                            <button
                                disabled={status === 'sending'}
                                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 ${status === 'success' ? 'bg-green-600 text-white' : status === 'error' ? 'bg-red-600 text-white' : 'bg-gradient-to-r from-gray-900 to-black hover:to-gray-800 text-white'}`}
                            >
                                {status === 'sending' ? (
                                    <>Sending... <FaSpinner className="animate-spin" /></>
                                ) : status === 'success' ? (
                                    <>Message Sent! <FaCheck /></>
                                ) : status === 'error' ? (
                                    <>Failed. Retry?</>
                                ) : (
                                    <>Send Message <FaPaperPlane size={16} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Floating Info Cards - Moved to Bottom */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    <ContactInfoCard
                        icon={FaPhoneAlt}
                        title="Talk to Us"
                        color="blue"
                        delay={0.3}
                        actionText="Call Support"
                        onAction={() => window.open(`tel:${info.phone1 || '+919876543210'}`)}
                        content={
                            <>
                                <p>{info.phone1 || "+91 987 654 3210"}</p>
                                <p>{info.phone2 || "+91 123 456 7890"}</p>
                            </>
                        }
                    />
                    <ContactInfoCard
                        icon={FaEnvelope}
                        title="Email Support"
                        color="purple"
                        delay={0.4}
                        actionText="Compose Email"
                        onAction={() => window.open(`mailto:${info.email1 || 'support@shubhmhurat.com'}`)}
                        content={
                            <>
                                <p>{info.email1 || "support@shubhmhurat.com"}</p>
                                <p>{info.email2 || "info@shubhmhurat.com"}</p>
                            </>
                        }
                    />
                    <ContactInfoCard
                        icon={FaMapMarkerAlt}
                        title="Visit Details"
                        color="red"
                        delay={0.5}
                        actionText="Get Directions"
                        onAction={() => window.open(info.mapLink || 'https://maps.google.com')}
                        content={
                            <p>{info.address || "123, Marriage Plaza, Sector 18, Noida, Uttar Pradesh, India"}</p>
                        }
                    />
                </div>


            </div>
        </div>
    );
};

export default Contact;
