import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaHeart, FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const SuccessStories = () => {
    const { content, fetchStories } = useContent();
    const { hero, stats, cta, faqs: contextFaqs } = content.successStories || {};
    const stories = content.stories || [];

    useEffect(() => {
        if (stories.length === 0) fetchStories();
    }, []);

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = contextFaqs || [
        { q: "How can I submit my success story?", a: "We love hearing from our couples! You can submit your story through your dashboard or email us at stories@shubhmhurat.com with your photos and journey." },
        { q: "Do you verify these success stories?", a: "Yes, every story featured here is from a verified couple who met through our platform. We ensure authenticity to inspire trust." },
        { q: "Can I protect my privacy after marriage?", a: "Absolutely. Once you are happily married, you can request to delete your profile or hide your success story details if you prefer privacy." },
        { q: "What makes a good success story?", a: "Honesty! valid details about how you met, what you liked about each other, and how our platform helped you connect make for the best stories." },
    ];

    // Default fallbacks if content not loaded yet
    const heroData = hero || { title: "Success Stories", subtitle: "Real couples, real love.", bgImage: "https://placehold.co/1920x600" };
    const statsData = stats || { stat1Num: "10k+", stat1Label: "Couples", stat2Num: "500+", stat2Label: "Weddings", stat3Num: "4.9", stat3Label: "Rating" };
    const ctaData = cta || { title: "Ready?", subtitle: "Join us today.", buttonText: "Get Started" };

    return (
        <div className="min-h-screen bg-neutral-50 pt-20 font-poppins">
            {/* Hero Section */}
            <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Dynamic Background Image with Zoom Effect */}
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                >
                    <img
                        src={heroData.bgImage}
                        alt="Wedding Celebration"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Sophisticated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-800/80 to-red-900/90 z-10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/30 z-10" />

                {/* Animated Sparkles */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={`sparkle-${i}`}
                            className="absolute bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 4 + 1}px`,
                                height: `${Math.random() * 4 + 1}px`,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide drop-shadow-2xl">
                            {heroData.title}
                        </h1>
                        <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 rounded-full opacity-80" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed drop-shadow-lg"
                    >
                        {heroData.subtitle}
                    </motion.p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white shadow-sm py-12 -mt-8 relative z-30 container mx-auto rounded-xl max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                    { number: statsData.stat1Num, label: statsData.stat1Label },
                    { number: statsData.stat2Num, label: statsData.stat2Label },
                    { number: statsData.stat3Num, label: statsData.stat3Label }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-4"
                    >
                        <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                        <p className="text-gray-600 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Stories Grid */}
            <div className="container mx-auto px-6 py-20 relative z-20 min-h-[500px]">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Success Stories</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.length > 0 ? (
                        stories.map((story, index) => (
                            <motion.div
                                key={story.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <img
                                        src={story.image || "https://placehold.co/400x300"}
                                        alt={story.names}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20 text-white">
                                        <h3 className="text-xl font-bold">{story.names}</h3>
                                        <p className="text-sm opacity-90">{story.date}</p>
                                    </div>
                                </div>
                                <div className="p-6 relative">
                                    <FaQuoteLeft className="text-primary/20 text-4xl absolute top-4 right-4" />
                                    <p className="text-gray-600 leading-relaxed mb-4 italic line-clamp-4">
                                        "{story.story}"
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-medium">
                                        <FaHeart className="text-red-500" />
                                        <span>Found on Shubh Mhurat</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        // Empty State / Placeholder
                        [1, 2, 3].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden opacity-60 animate-pulse">
                                <div className="h-64 bg-gray-200"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container mx-auto px-6 pb-20 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Common Questions</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-lg text-gray-800 flex items-center gap-3">
                                    <FaQuestionCircle className="text-primary/50" /> {faq.q}
                                </span>
                                {openFaq === index ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pl-14 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative z-10 bg-gray-900 text-white py-20 px-6">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">{ctaData.title || "Start Your Journey"}</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        {ctaData.subtitle || "Your perfect match is just a click away."}
                    </p>
                    <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1">
                        {ctaData.buttonText || "Get Started"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
