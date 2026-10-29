import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUsers } from 'react-icons/fa';

import { useContent } from '../context/ContentContext';

const formatCount = (num) => {
    if (!num) return '1k+';
    if (num >= 1000) return (num / 1000).toFixed(1).replace('.0', '') + 'k+';
    return num + '+';
};

const CommunitySection = () => {
    const { content, fetchCommunities } = useContent();
    const communities = content.communities || []; // Use dynamic communities

    useEffect(() => {
        if (communities.length === 0) fetchCommunities();
    }, []);

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const scrollRef = React.useRef(null);

    // Duplicate logic for infinite scroll illusion if needed, or just simple scroll
    // For "Select Topic" style, a clean horiz scroll is best.

    return (
        <section className="py-12 bg-white relative overflow-hidden w-full max-w-full">
            {/* Background Decor safely clipped */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
                <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <span className="text-sm font-bold tracking-widest text-primary uppercase mb-2 block">Browse Categories</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                            Select <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Topic</span>
                        </h2>
                    </div>

                    {/* Scroll Indicators / Controls could go here */}
                    <div className="hidden md:flex gap-2">
                        <button onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })} className="p-3 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors">
                            <FaArrowRight className="transform rotate-180" />
                        </button>
                        <button onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })} className="p-3 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                {/* Horizontal Slider */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-8 pt-2 px-1 snap-x hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {communities.map((community, index) => (
                        <Link to={`/community/${community.name.toLowerCase()}`} key={index} className="flex-shrink-0 snap-start">
                            <motion.div
                                className={`relative px-6 py-4 rounded-2xl min-w-[160px] flex flex-col justify-between h-32 transition-all duration-300 group cursor-pointer border ${hoveredIndex === index
                                    ? 'border-primary shadow-xl shadow-primary/20 scale-105 z-10'
                                    : 'border-gray-100 bg-white shadow-sm hover:border-primary/50'
                                    }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-primary to-orange-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                <div className="flex justify-between items-start">
                                    <div className={`p-2 rounded-full ${hoveredIndex === index ? 'bg-primary text-white' : 'bg-orange-50 text-orange-500'} transition-colors duration-300`}>
                                        <FaUsers size={14} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${hoveredIndex === index ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'} transition-colors`}>
                                        {formatCount(community.members)}
                                    </span>
                                </div>

                                <div>
                                    <h3 className={`text-lg font-bold ${hoveredIndex === index ? 'text-primary' : 'text-gray-800'} transition-colors`}>
                                        {community.name}
                                    </h3>
                                    <span className="text-xs text-gray-400 group-hover:text-primary/70 transition-colors flex items-center gap-1 mt-1">
                                        View Profiles <FaArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default CommunitySection;
