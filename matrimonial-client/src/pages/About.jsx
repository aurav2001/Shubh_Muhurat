import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaUsers, FaShieldAlt, FaHandshake, FaGlobe, FaAward, FaPlay, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const Counter = ({ value, duration = 2 }) => {
    const ref = React.useRef(null);
    const inView = React.useRef(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !inView.current) {
                    inView.current = true;
                    let start = 0;
                    const end = parseInt(value.toString(), 10);
                    if (start === end) return;

                    const totalMilSec = duration * 1000;
                    const incrementTime = (totalMilSec / end) * 5;

                    const timer = setInterval(() => {
                        start += 1;
                        if (ref.current) ref.current.textContent = start;
                        if (start === end) clearInterval(timer);
                    }, Math.max(incrementTime, 50));
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value, duration]);

    return <span ref={ref}>0</span>;
};

const StatCard = ({ icon: Icon, value, suffix, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="relative group p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-default"
    >
        {/* Glow Effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all duration-500"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary text-xl mb-2 shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                <Icon />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                <Counter value={value} />{suffix}
            </h3>
            <p className="text-white/80 font-medium tracking-wide uppercase text-[10px] md:text-xs mt-0">{label}</p>
        </div>
    </motion.div>
);

const ValueCard = ({ title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6">
            <FaShieldAlt />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

const About = () => {
    const { content } = useContent();
    const [showVideo, setShowVideo] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

    // Get content from context with fallbacks
    const aboutPage = content.aboutPage || {};
    const hero = aboutPage.hero || {};
    const stats = aboutPage.stats || [];
    const story = aboutPage.story || {};
    const vision = aboutPage.vision || {};
    const milestones = aboutPage.milestones || {};
    const values = aboutPage.values || {};
    const faqs = aboutPage.faqs || [];
    const faqSection = aboutPage.faqSection || {};

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // Icon mapping for stats
    const statIcons = [FaHeart, FaUsers, FaGlobe, FaAward];

    return (
        <div className="min-h-screen bg-[#F5F5F7]">
            {/* Hero Section - Split Layout */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center cursor-default gap-12 lg:gap-20">
                        {/* Text Side (Left) */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block py-2 px-4 rounded-full bg-white border border-gray-200 text-primary text-sm font-bold mb-6 shadow-sm"
                            >
                                {hero.badge !== undefined ? hero.badge : 'EST. 2010'}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight"
                            >
                                {hero.title !== undefined ? hero.title : 'Bringing Hearts'} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-orange-500">
                                    {hero.highlight !== undefined ? hero.highlight : 'Together'}
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-gray-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                {hero.subtitle !== undefined ? hero.subtitle : 'We are dedicated to helping you write your own happily ever after.'}
                            </motion.p>
                        </div>

                        {/* Image Side (Right) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl z-10 border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src={hero.image || "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                                    alt="Happy Couple"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative Background Elements */}
                            <div className="absolute top-10 right-10 w-full h-full bg-gradient-to-bl from-primary/20 to-purple-200/20 rounded-[3rem] -z-10 transform translate-x-6 translate-y-6"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* About Description Section */}
            <section className="py-20 px-4 max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                    {(aboutPage.description && aboutPage.description.title) || 'About Our Mission'}
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 leading-relaxed whitespace-pre-line"
                >
                    {(aboutPage.description && aboutPage.description.text) || 'We are dedicated to bringing people together.'}
                </motion.div>
            </section>

            {/* Stats Banner */}
            <div className="bg-primary py-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 max-w-6xl relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={i} icon={statIcons[i] || FaHeart} value={stat.value} suffix={stat.suffix} label={stat.label} delay={0.1 * (i + 1)} />
                    ))}
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-24 px-4 container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-5/12 relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                            <img
                                src={story.image || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                alt="Our Journey"
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        {/* Decorative background blob */}
                        <div className="absolute top-10 left-10 w-full h-full bg-orange-100 rounded-[3rem] -z-10 transform translate-x-4 translate-y-4"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-7/12"
                    >
                        <h4 className="text-primary font-bold uppercase tracking-widest mb-2">{story.label || 'Our Story'}</h4>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tigth">{story.title || 'Built on Trust,'} <br />{story.titleLine2 || 'Driven by Love.'}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {story.paragraph1 || 'Shubh Mhurat began with a simple mission: to provide a superior matchmaking experience.'}
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {story.paragraph2 || 'We have set a mandate to create a platform that would not only help people find their partner.'}
                        </p>
                        <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all hover:-translate-y-1 shadow-lg">
                            {story.buttonText || 'Read Full Story'}
                        </button>
                    </motion.div>
                </div>
            </section>


            {/* Video / Vision Section - Cinematic Upgrade */}
            <section className="relative py-24 min-h-[600px] flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('${vision.bgImage || "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}')` }}>
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/40 to-black/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 text-center text-white px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                    >
                        {vision.title || 'See How We'} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-purple-200">
                            {vision.highlight || 'Connect Souls'}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        "{vision.quote || 'Matches are made in heaven, but we help you find them here on earth.'}" <br />
                        <span className="text-base opacity-80 mt-2 block font-sans">{vision.subtext || 'Watch our journey of 2 million+ success stories.'}</span>
                    </motion.p>

                    {/* Inline Video Player */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/20 bg-black mt-12"
                    >
                        {(() => {
                            let url = vision.videoUrl || "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0";

                            // Automatically convert YouTube Shorts or Watch URLs to proper Embed URLs
                            try {
                                if (url.includes('youtube.com/') || url.includes('youtu.be/')) {
                                    let videoId = '';
                                    if (url.includes('youtube.com/shorts/')) {
                                        videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
                                    } else if (url.includes('youtube.com/watch?v=')) {
                                        videoId = url.split('v=')[1].split('&')[0];
                                    } else if (url.includes('youtu.be/')) {
                                        videoId = url.split('youtu.be/')[1].split('?')[0];
                                    }

                                    if (videoId) {
                                        url = `https://www.youtube.com/embed/${videoId}`;
                                    }
                                }
                            } catch (e) { console.error("Video URL Parse Error", e); }

                            const isDirectVideo = url.match(/\.(mp4|webm|ogg)$/i);

                            return isDirectVideo ? (
                                <video
                                    src={url}
                                    controls
                                    className="w-full h-full object-cover"
                                    preload="metadata"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={url}
                                    title="Wedding Cinematic"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            );
                        })()}
                    </motion.div>
                </div>
            </section>

            {/* Milestones / Timeline */}
            <section className="py-24 bg-[#F5F5F7]">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{milestones.title || 'Our Milestones'}</h2>
                        <p className="text-gray-600">{milestones.subtitle || 'A look back at our journey of love and trust.'}</p>
                    </div>

                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

                        {(milestones.items || []).map((item, i) => (
                            <div key={i} className={`relative flex items-center justify-between ${i < (milestones.items?.length || 0) - 1 ? 'mb-16' : ''}`}>
                                {i % 2 === 0 ? (
                                    <>
                                        <div className="w-5/12 text-right pr-12">
                                            <h3 className="text-2xl font-bold text-primary mb-2">{item.year}</h3>
                                            <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                                        <div className="w-5/12 pl-12"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-5/12 text-right pr-12"></div>
                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-lg z-10"></div>
                                        <div className="w-5/12 pl-12">
                                            <h3 className="text-2xl font-bold text-primary mb-2">{item.year}</h3>
                                            <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{values.title || 'Why Choose Shubh Mhurat?'}</h2>
                        <p className="text-xl text-gray-500">{values.subtitle || 'Our promise to you goes beyond just matchmaking.'}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {(values.items || []).map((item, i) => (
                            <ValueCard
                                key={i}
                                title={item.title}
                                description={item.description}
                                delay={0.1 * (i + 1)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-[#F5F5F7] relative">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-gray-900 mb-4"
                        >
                            {faqSection.title || 'Common Questions'}
                        </motion.h2>
                        <p className="text-xl text-gray-500">{faqSection.subtitle || 'Everything you need to know about our company.'}</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full p-4 md:p-6 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors"
                                >
                                    <span className={`text-base md:text-lg font-bold ${activeAccordion === index ? 'text-primary' : 'text-gray-800'}`}>
                                        {faq.q}
                                    </span>
                                    <span className={`transform transition-transform duration-300 ml-4 flex-shrink-0 ${activeAccordion === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                                        {activeAccordion === index ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeAccordion === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed boundary-content">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setShowVideo(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                            >
                                <FaTimes size={20} />
                            </button>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`${vision.videoUrl || "https://www.youtube.com/embed/ysz5S6PUM-U"}?autoplay=1&rel=0`}
                                title="Wedding Cinematic"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default About;
