import React from 'react';
import { FaVideo, FaClock, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ConnectSection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden w-full max-w-full">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16 relative">

                    {/* Text Content */}
                    <div className="w-full md:w-1/2">
                        <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2 block">Meet from Home</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight">
                            Impress them Over the <span className="text-primary">Distance</span>
                        </h2>

                        <div className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 bg-red-50 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FaClock size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Match Hour</h3>
                                </div>
                                <p className="text-gray-600 pl-16 leading-relaxed">
                                    Register to join an online event to connect with members of your community in a short time.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="group cursor-pointer"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 bg-red-50 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FaVideo size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Voice & Video Calling</h3>
                                </div>
                                <p className="text-gray-600 pl-16 leading-relaxed">
                                    Enjoy secure conversations using our voice & video calling services without revealing your number.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="group cursor-pointer"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 bg-red-50 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FaUserCircle size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Introducing Video Profiles</h3>
                                </div>
                                <p className="text-gray-600 pl-16 leading-relaxed">
                                    Stand out amongst others and engage faster! Introduce yourself by adding a video to your profile.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Visual Content */}
                    <div className="w-full md:w-1/2 relative flex justify-center">
                        <div className="relative w-[300px] h-[600px] bg-gray-100 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden">
                            {/* Phone Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>

                            {/* Screen Content */}
                            <video
                                src="https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-posing-for-photo-session-42823-large.mp4"
                                className="w-full h-full object-cover z-10"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />

                            {/* Floating Elements - Adjusted for mobile */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute top-10 md:top-20 right-2 md:right-[-20px] bg-white p-2 md:p-3 rounded-2xl shadow-lg flex items-center gap-2 z-10"
                            >
                                <FaVideo className="text-primary text-sm md:text-base" />
                                <span className="text-[10px] md:text-xs font-bold text-gray-700">Online Event</span>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.7, type: "spring" }}
                                className="absolute bottom-24 md:bottom-32 left-2 md:left-[-30px] bg-white p-3 md:p-4 rounded-2xl shadow-lg flex items-center gap-2 md:gap-3 z-10 max-w-[120px] md:max-w-[150px]"
                            >
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
                                <span className="text-[10px] md:text-xs font-bold text-gray-700 leading-tight">Connect with same community</span>
                            </motion.div>

                            {/* Gradient Overlay */}
                            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white text-center">
                                <p className="font-bold text-lg">Match Hour</p>
                                <p className="text-xs text-gray-300">The Biggest Matrimonial Event</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background blob safely clipped */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[500px] h-[320px] md:h-[500px] bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectSection;
