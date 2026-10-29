
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPrayingHands, FaStar, FaSearch, FaUserTie, FaGraduationCap, FaMapMarkerAlt, FaHeart, FaArrowLeft, FaUsers, FaArrowRight, FaRulerVertical, FaMoon } from 'react-icons/fa';

import { useContent } from '../context/ContentContext';

// Helper to generate dynamic content based on community name (Fallback/Profiles)
const getCommunityData = (name) => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    // Default images if none provided by backend
    const defaultSliderImages = [
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    ];

    const profiles = [
        { id: 1, name: `Aarav`, surname: "Kumar", age: 28, location: "Mumbai", education: "MBA", profession: "Investment Banker", height: "5'10\"", starSign: "Leo", matchScore: 98, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 2, name: `Diya`, surname: "Singh", age: 26, location: "Delhi", education: "B.Tech", profession: "Software Engineer", height: "5'6\"", starSign: "Virgo", matchScore: 95, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 3, name: `Vivaan`, surname: "Patel", age: 30, location: "Bangalore", education: "MS", profession: "Architect", height: "6'0\"", starSign: "Libra", matchScore: 92, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 4, name: `Ananya`, surname: "Sharma", age: 25, location: "Pune", education: "MBBS", profession: "Doctor", height: "5'4\"", starSign: "Cancer", matchScore: 97, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 5, name: `Kabir`, surname: "Reddy", age: 29, location: "Hyderabad", education: "CA", profession: "Chartered Accountant", height: "5'11\"", starSign: "Aries", matchScore: 89, image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 6, name: `Ishita`, surname: "Verma", age: 27, location: "Chennai", education: "M.Sc", profession: "Professor", height: "5'5\"", starSign: "Pisces", matchScore: 94, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 7, name: `Arjun`, surname: "Nair", age: 31, location: "Kochi", education: "B.Arch", profession: "Entrepreneur", height: "5'9\"", starSign: "Gemini", matchScore: 91, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 8, name: `Mira`, surname: "Kapoor", age: 24, location: "Jaipur", education: "B.Des", profession: "Fashion Designer", height: "5'7\"", starSign: "Taurus", matchScore: 96, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 9, name: `Rohan`, surname: "Mehta", age: 29, location: "Ahmedabad", education: "MBA", profession: "Business Owner", height: "5'10\"", starSign: "Sagittarius", matchScore: 88, image: "https://images.unsplash.com/photo-1482961674540-0b018b680d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 10, name: `Sanya`, surname: "Malhotra", age: 26, location: "Chandigarh", education: "M.Pharm", profession: "Pharmacist", height: "5'5\"", starSign: "Aquarius", matchScore: 93, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 11, name: `Aditya`, surname: "Chopra", age: 32, location: "Lucknow", education: "PhD", profession: "Researcher", height: "6'1\"", starSign: "Capricorn", matchScore: 90, image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { id: 12, name: `Priya`, surname: "Iyer", age: 27, location: "Bangalore", education: "BDS", profession: "Dentist", height: "5'3\"", starSign: "Scorpio", matchScore: 94, image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
    ];

    return {
        formattedName,
        sliderImages: defaultSliderImages,
        title: `${formattedName} Matrimony`,
        subtitle: `Connecting ${formattedName} souls with values, tradition, and culture.`,
        description: `Find your perfect match within the ${formattedName} community.We bridge tradition with modern compatibility.`,
        tags: ["Tradition", "Culture", "Values", "Family"],
        profiles: profiles.map(p => ({ ...p, name: `${p.name} ${formattedName === 'Brahmin' ? 'Sharma' : (formattedName === 'Sikh' ? 'Singh' : p.surname)} ` }))
    };
};

const CommunityDetails = () => {
    const { name } = useParams();
    const { content } = useContent();

    // Find dynamic community data if available
    const dynamicCommunity = content.communities?.find(c => c.name.trim().toLowerCase() === name?.trim().toLowerCase());

    console.log("Community Page Debug:", {
        urlName: name,
        allCommunities: content.communities,
        foundDynamic: dynamicCommunity,
        hasProfiles: dynamicCommunity?.featuredProfiles?.length
    });

    const staticData = getCommunityData(name || "Community");

    const data = {
        ...staticData,
        // Override with dynamic data if present
        title: dynamicCommunity ? `${dynamicCommunity.name}` : staticData.title,
        subtitle: dynamicCommunity?.subtitle || staticData.subtitle,
        description: dynamicCommunity?.description || staticData.description,
        sliderImages: (dynamicCommunity?.sliderImages && dynamicCommunity.sliderImages.length > 0) ? dynamicCommunity.sliderImages : staticData.sliderImages,
        tags: (dynamicCommunity?.tags && dynamicCommunity.tags.length > 0) ? dynamicCommunity.tags : staticData.tags,
        // formattedName is used for display logic in profiles, keep consistent with dynamic name if found
        formattedName: dynamicCommunity ? dynamicCommunity.name : staticData.formattedName,
        profiles: (dynamicCommunity?.featuredProfiles && dynamicCommunity.featuredProfiles.length > 0)
            ? dynamicCommunity.featuredProfiles.map((p, i) => ({
                ...p,
                id: i,
                matchScore: 90 + (i % 9),
                starSign: 'Leo',
                height: p.height
            }))
            : staticData.profiles
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [name]);

    // Slider Timer
    useEffect(() => {
        if (!data.sliderImages || data.sliderImages.length === 0) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % data.sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [data.sliderImages]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Dynamic Full Screen Hero Section */}
            <div className="relative min-h-[85vh] w-full flex items-center bg-black overflow-hidden">
                {/* Background Slider */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${data.sliderImages[currentImageIndex]}')` }}
                        />
                        {/* Left-sided Gradient Overlay to match the reference look */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 w-full md:w-[70%]"></div>
                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Left Aligned Content */}
                <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                            Most Trusted <br />
                            <span className="text-white">{data.formattedName}</span> <br />
                            Matchmaking Service
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light tracking-wide">
                            Step into the world beyond matrimony
                        </p>

                        <button
                            onClick={() => document.getElementById('featured-matches').scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 bg-[#00BCD5] hover:bg-[#00ACC1] text-white rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-1"
                        >
                            Find Your Match
                        </button>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap gap-12 mt-16 text-white text-left"
                    >
                        <div>
                            <div className="text-3xl font-bold mb-1">350 Lakhs+</div>
                            <div className="text-sm text-gray-400">Registered Members</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1 col-span-2">80 Lakhs+</div>
                            <div className="text-sm text-gray-400">Success Stories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1 flex items-center gap-2">
                                4.4 <FaStar className="text-yellow-400 text-2xl" />
                            </div>
                            <div className="text-sm text-gray-400">417K reviews</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Breadcrumb / Back */}
            <div className="container mx-auto px-6 py-6 border-b border-gray-100">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium">
                    <FaArrowLeft className="mr-2" /> Back to Communities
                </Link>
            </div>

            {/* Exclusive Features Section (Universal) */}
            <section className="container mx-auto px-6 py-16">
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-orange-50 w-64 h-64 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 relative z-10">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Premium Features</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Why Choose {data.formattedName} Matrimony?</h2>
                        </div>
                        <Link to="/membership" className="text-primary font-bold hover:underline flex items-center gap-2">
                            View Membership Plans <FaArrowLeft className="rotate-180" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Search Feature */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-orange-50/50 rounded-2xl p-8 transition-all hover:bg-orange-50 border border-orange-100/50 hover:border-orange-100"
                        >
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 mb-6 text-2xl">
                                <FaSearch />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Advanced Filters</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Find your perfect match based on community specific preferences, education, and family values.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {data.tags.map((tag, i) => (
                                    <span key={i} className="text-xs bg-white border border-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Horoscope Matching */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-purple-50/50 rounded-2xl p-8 transition-all hover:bg-purple-50 border border-purple-100/50 hover:border-purple-100"
                        >
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600 mb-6 text-2xl">
                                <FaStar />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">100% Verified Profiles</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We prefer quality over quantity. Every profile is manually screened and verified for authenticity.
                            </p>
                            <span className="text-sm font-bold text-purple-600">Safe & Secure Matrimony</span>
                        </motion.div>

                        {/* Community Values */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-rose-50/50 rounded-2xl p-8 transition-all hover:bg-rose-50 border border-rose-100/50 hover:border-rose-100"
                        >
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-rose-600 mb-6 text-2xl">
                                <FaPrayingHands />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Cultural Compatibility</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Connect with families who share the same deep-rooted {data.formattedName} cultural values and traditions.
                            </p>
                            <span className="text-sm font-bold text-rose-600">Millions of Success Stories</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Profiles */}
            <section id="featured-matches" className="container mx-auto px-6 mb-24">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <FaHeart size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Featured <span className="text-primary">{data.formattedName}</span> Matches
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.profiles.slice(0, showAll ? data.profiles.length : 8).map((profile, index) => (
                        <motion.div
                            key={profile.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Full Background Image */}
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />

                            {/* Match Score Badge (Top Left) */}
                            <div className="absolute top-4 left-4 z-20">
                                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-lg">
                                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-[10px] text-white font-bold">%</span>
                                    <span className="text-sm font-bold text-white">{profile.matchScore}% Match</span>
                                </div>
                            </div>

                            {/* Like Button (Top Right) */}
                            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors shadow-lg">
                                    <FaHeart />
                                </button>
                            </div>

                            {/* Content Content - Slide Reveal Effect */}
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                {/* Only Name and Location initially visible if not hovered? simplified to always visible name, hover reveals details */}
                                <div className="mb-4">
                                    <h3 className="text-3xl font-bold leading-tight mb-1">{profile.name}</h3>
                                    <p className="text-gray-300 text-sm font-medium flex items-center gap-1">
                                        <FaMapMarkerAlt size={12} className="text-primary-light" /> {profile.location}
                                    </p>
                                </div>

                                {/* Hidden Details - Reveal on Hover */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                    <div className="overflow-hidden">
                                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
                                            {/* Age */}
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                                                <div className="text-xs text-black uppercase tracking-wider mb-1">Age</div>
                                                <div className="font-semibold text-sm">{profile.age} Yrs</div>
                                            </div>

                                            {/* Height */}
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                                                <div className="text-xs text-black uppercase tracking-wider mb-1 flex items-center gap-1"><FaRulerVertical size={10} /> Height</div>
                                                <div className="font-semibold text-sm">{profile.height}</div>
                                            </div>

                                            {/* Education */}
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 col-span-2">
                                                <div className="text-xs text-black uppercase tracking-wider mb-1 flex items-center gap-1"><FaGraduationCap size={10} /> Education</div>
                                                <div className="font-semibold text-sm truncate">{profile.education}, {profile.profession}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {!showAll && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-10 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 transition-all"
                        >
                            View All {data.formattedName} Profiles
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CommunityDetails;
