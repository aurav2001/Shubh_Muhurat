import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaArrowLeft, FaArrowRight, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const RegistrationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        name: '', dob: '', gender: '', maritalStatus: 'Never Married',
        phone: '', email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step === 1) {
            if (!formData.name || !formData.dob || !formData.gender || !formData.maritalStatus) {
                alert("Please fill in all personal details.");
                return;
            }
            if (!termsAccepted) {
                alert("Please accept the Terms & Conditions and Privacy Policy to proceed.");
                return;
            }
        }
        setStep(prev => prev + 1);
    };

    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.phone || !formData.email) {
            alert("Please fill in all contact details.");
            return;
        }
        try {
            const API_URL = import.meta.env.VITE_API_URL || '';
            await axios.post(`${API_URL}/registration`, formData);
            setStep('success');
        } catch (error) {
            console.error('Registration email error:', error);
            // Still show success to user even if email fails
            setStep('success');
        }
    };

    const resetAndClose = () => {
        setStep(1);
        onClose();
    };

    const StepIndicator = ({ current }) => (
        <div className="flex justify-between mb-8 px-8">
            <div className={`flex flex-col items-center flex-1 ${current >= 1 ? 'text-primary' : 'text-gray-300'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 ${current >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>
                    <FaUser size={14} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Personal</span>
            </div>
            <div className={`h-[2px] w-full mt-5 mx-2 ${current >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center flex-1 ${current >= 2 ? 'text-primary' : 'text-gray-300'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 ${current >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>
                    <FaPhone size={14} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Contact</span>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetAndClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[500px]"
                    >
                        <button
                            onClick={resetAndClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white rounded-full p-2 shadow-sm"
                        >
                            <FaTimes size={16} />
                        </button>

                        {/* Left Side - Image */}
                        <div className="w-full md:w-2/5 relative hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Couple"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">Begin Your Journey</h3>
                                <p className="text-sm text-gray-200">Thousands of success stories start with a single click. Join us today.</p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col">
                            {step !== 'success' && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Profile</h2>
                                    <StepIndicator current={step} />

                                    <form className="flex-1 flex flex-col justify-between h-full" onSubmit={(e) => e.preventDefault()}>
                                        <div className="space-y-4">
                                            {step === 1 && (
                                                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                                    <div className="space-y-4">
                                                        <input
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder="Full Name"
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                                        />
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <input
                                                                type="date"
                                                                name="dob"
                                                                value={formData.dob}
                                                                onChange={handleChange}
                                                                className="w-full p-3 border border-gray-300 rounded-lg text-gray-500 outline-none"
                                                            />
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setFormData({ ...formData, gender: 'Male' })}
                                                                    className={`flex-1 border rounded-lg transition-colors ${formData.gender === 'Male' ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:bg-gray-50 text-gray-600'}`}
                                                                >
                                                                    Male
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setFormData({ ...formData, gender: 'Female' })}
                                                                    className={`flex-1 border rounded-lg transition-colors ${formData.gender === 'Female' ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:bg-gray-50 text-gray-600'}`}
                                                                >
                                                                    Female
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <select
                                                            name="maritalStatus"
                                                            value={formData.maritalStatus}
                                                            onChange={handleChange}
                                                            className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 outline-none"
                                                        >
                                                            <option value="" disabled>Select Marital Status</option>
                                                            <option value="Never Married">Never Married</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Widowed">Widowed</option>
                                                        </select>

                                                        {/* Terms & Conditions Checkbox */}
                                                        <div className="flex items-start gap-3 mt-4">
                                                            <input
                                                                type="checkbox"
                                                                id="terms"
                                                                checked={termsAccepted}
                                                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                                                className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                                                            />
                                                            <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                                                                I agree to the <span className="text-primary hover:underline font-medium">Terms & Conditions</span> and <span className="text-primary hover:underline font-medium">Privacy Policy</span>. I consent to receiving potential matches via email/WhatsApp.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                                    <div className="space-y-4">
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                                <FaPhone />
                                                            </div>
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                placeholder="Phone Number"
                                                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                                <FaEnvelope />
                                                            </div>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                placeholder="Email Address"
                                                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                                            {step > 1 ? (
                                                <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 font-medium hover:text-gray-800 transition-colors">
                                                    <FaArrowLeft size={14} /> Back
                                                </button>
                                            ) : <div></div>}

                                            {step < 2 ? (
                                                <button onClick={handleNext} className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium transform hover:-translate-y-0.5">
                                                    Next <FaArrowRight size={14} />
                                                </button>
                                            ) : (
                                                <button onClick={handleSubmit} className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all font-medium transform hover:-translate-y-0.5">
                                                    Submit Profile
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </>
                            )}

                            {step === 'success' && (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6"
                                    >
                                        <FaCheckCircle size={48} />
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Aboard!</h2>
                                    <p className="text-gray-500 mb-8 max-w-xs">
                                        Your profile has been created successfully. Our team will verify your details shortly.
                                    </p>
                                    <button
                                        onClick={resetAndClose}
                                        className="px-10 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-colors shadow-lg"
                                    >
                                        Go to Dashboard
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
