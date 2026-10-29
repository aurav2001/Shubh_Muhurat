import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar, FaCheckCircle } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const Testimonials = () => {
    const { content, fetchTestimonials } = useContent();
    const testimonialContent = content.home?.testimonials || { label: "Stories", title: "Happy", highlight: "Couples" };
    // Use dynamic testimonials from context, default to empty array if separate collection not yet loaded
    const testimonials = content.testimonials || [];

    useEffect(() => {
        if (testimonials.length === 0) fetchTestimonials();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Reset index if testimonials change length (e.g. deletion)
    useEffect(() => {
        if (currentIndex >= testimonials.length) {
            setCurrentIndex(0);
        }
    }, [testimonials.length]);

    const nextTestimonial = () => {
        if (testimonials.length === 0) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        if (testimonials.length === 0) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        })
    };

    if (!testimonials || testimonials.length === 0) {
        return (
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{testimonialContent.label}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{testimonialContent.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">{testimonialContent.highlight}</span></h2>
                    <p className="text-gray-500">No stories yet. Be the first to share yours!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-6xl mx-auto">
                    <div>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{testimonialContent.label}</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{testimonialContent.title} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">{testimonialContent.highlight}</span></h2>
                    </div>
                    <div className="flex gap-4 mt-6 md:mt-0">
                        <button onClick={prevTestimonial} className="p-4 rounded-full border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300">
                            <FaChevronLeft size={18} />
                        </button>
                        <button onClick={nextTestimonial} className="p-4 rounded-full border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300">
                            <FaChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="relative max-w-6xl mx-auto h-[600px] md:h-[400px]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "tween", ease: "anticipate", duration: 0.5 },
                                opacity: { duration: 0.4 }
                            }}
                            className="absolute w-full h-full"
                        >
                            <div className="w-full h-full flex flex-col md:flex-row gap-6 md:gap-8 items-center bg-white rounded-3xl p-4 md:p-2 shadow-sm border border-gray-50">
                                {/* Image Section */}
                                <div className="w-full md:w-1/2 h-64 md:h-full rounded-2xl overflow-hidden relative shadow-lg group">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 shadow-sm text-xs md:text-sm font-semibold text-gray-700">
                                        <FaCheckCircle className="text-blue-500" /> Verified Couple
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:pr-12 text-left">
                                    <div className="flex text-yellow-500 mb-4 md:mb-6 space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} size={16} className={i < testimonials[currentIndex].rating ? "fill-current" : "text-gray-200"} />
                                        ))}
                                    </div>

                                    <h3 className="text-base md:text-xl font-medium text-gray-800 leading-relaxed mb-4 md:mb-6 italic">
                                        "{testimonials[currentIndex].content || testimonials[currentIndex].text}"
                                    </h3>

                                    <div>
                                        <h4 className="text-lg md:text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                                        <p className="text-gray-500 text-xs md:text-sm mt-1">{testimonials[currentIndex].location} • {testimonials[currentIndex].date}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
