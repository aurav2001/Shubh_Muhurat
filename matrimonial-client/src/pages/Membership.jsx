import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaCrown, FaGem, FaStar, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const Membership = () => {
    const { content, fetchPlans } = useContent();
    const rawPlans = content.plans || [];

    useEffect(() => {
        if (rawPlans.length === 0) fetchPlans();
    }, []);

    // Filter out duplicate plans based on title
    const plans = Array.from(new Map(rawPlans.map(plan => [plan.title, plan])).values());

    // Ensure we have at least one active ID if plans exist
    const [activeId, setActiveId] = useState(0); // Default to first plan
    const [openFaq, setOpenFaq] = useState(null);

    // Fallback if plans are empty or don't match expected structure
    // We try to find the plan matching activeId, or default to first
    const activePlan = plans.find(p => p.id === activeId) || plans[0] || {};

    // Icon Map
    const iconMap = {
        'FaStar': FaStar,
        'FaGem': FaGem,
        'FaCrown': FaCrown
    };

    const ActiveIcon = iconMap[activePlan.iconName] || FaStar;

    // Use dynamic FAQs if available
    const faqs = content.membership?.faqs || [
        { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your auto-renewal at any time. Your benefits will continue until the end of your current billing cycle." },
        { q: "Is my payment information secure?", a: "Absolutely. We use bank-grade encryption and do not store your card details on our servers." },
        { q: "What is the Relationship Manager service?", a: "Our dedicated Relationship Managers handpick matches for you, coordinate meetings, and offer personalized advice to speed up your search." },
    ];

    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

    // Handle case where no plans are loaded yet
    if (plans.length === 0) {
        return <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">Loading Plans...</div>;
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-rose-100 flex flex-col pt-16">

            {/* MAIN INTERFACE: Split Layout */}
            <main className="flex-col md:flex-row flex min-h-[90vh] relative">

                {/* LEFT: Navigation / Menu */}
                <div className="w-full md:w-5/12 flex flex-col justify-center px-6 md:px-16 border-r border-gray-100 relative z-20 bg-white shadow-xl md:shadow-none">
                    <div className="mb-12 md:hidden pt-8">
                        <h1 className="text-3xl font-black text-gray-900">Choose Your Plan</h1>
                        <p className="text-sm text-gray-500 mt-2">Unlock exclusive features</p>
                    </div>

                    <div className="space-y-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                onMouseEnter={() => setActiveId(plan.id)}
                                onClick={() => setActiveId(plan.id)}
                                className="group cursor-pointer relative py-2"
                            >
                                <span className={`text-[10px] font-bold tracking-widest uppercase pl-1 block mb-2 transition-colors duration-300 ${activeId === plan.id ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {plan.category || plan.title}
                                </span>

                                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter transition-all duration-500 ease-out ${activeId === plan.id ? "text-gray-900 translate-x-4 scale-105" : "text-gray-200 hover:text-gray-300"
                                    }`}>
                                    {plan.title}
                                </h2>

                                {/* Animated Indicator */}
                                {activeId === plan.id && (
                                    <motion.div
                                        layoutId="arrow-indicator"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="absolute -right-3.5 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-7 h-7 bg-white border border-gray-100 rounded-full shadow-sm z-30"
                                    >
                                        <FaArrowRight className="w-3 h-3 text-gray-900" />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Details View */}
                <div className="w-full md:w-7/12 bg-slate-50 flex flex-col justify-center px-6 md:px-24 py-12 md:py-0 relative overflow-hidden">

                    {/* Background Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br ${activePlan.color || 'from-gray-200 to-gray-300'} rounded-full blur-[100px] opacity-20 transition-all duration-700`}></div>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* MODE 1: DETAILS VIEW */}
                        <motion.div
                            key={`details-${activeId}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="space-y-8 relative z-10"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-1 bg-primary rounded-full"></div>
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                                    {activePlan.tagline || activePlan.category}
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                                    {/* Ensure Price has currency symbol if missing */}
                                    {activePlan.price && !activePlan.price.includes('₹') ? `₹${activePlan.price}` : activePlan.price}
                                    <span className="text-lg text-gray-500 font-medium ml-2">INR</span>
                                </h3>
                                <span className="text-gray-400 text-lg md:text-xl font-light">{activePlan.period}</span>
                            </div>

                            <p className="text-lg text-gray-600 leading-relaxed max-w-lg font-medium">
                                {activePlan.description || "Unlock premium features to find your perfect match faster."}
                            </p>

                            <div className="h-px w-full bg-gray-200 my-4" />

                            <ul className="grid grid-cols-1 gap-4">
                                {activePlan.features?.map((feature, i) => (
                                    <motion.li
                                        key={feature}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
                                        className="flex items-center gap-4 text-sm font-semibold text-gray-700"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                            <FaCheck size={10} />
                                        </div>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-4 pt-6">
                                <button className="px-8 py-4 bg-gray-900 text-white text-xs font-bold tracking-widest rounded-2xl hover:bg-primary transition-colors duration-300 shadow-xl shadow-gray-200 hover:shadow-primary/30 transform hover:-translate-y-1">
                                    SELECT PLAN
                                </button>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* FAQ SECTION */}
            <section className="py-20 px-6 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-3xl font-black text-center mb-12 tracking-tight text-gray-900">
                        FREQUENTLY ASKED
                        <span className="block text-sm font-medium text-gray-400 mt-2 tracking-normal uppercase">Everything you need to know</span>
                    </h3>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                layout
                                key={index}
                                className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-300 bg-gray-50/30"
                            >
                                <motion.button
                                    layout="position"
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-300"
                                >
                                    <span className="font-bold text-base text-gray-800 tracking-tight">{faq.q}</span>
                                    {openFaq === index ? <FaMinus className="w-3 h-3 text-primary" /> : <FaPlus className="w-3 h-3 text-gray-400" />}
                                </motion.button>
                                <AnimatePresence initial={false}>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-primary/20 pl-4">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Membership;
