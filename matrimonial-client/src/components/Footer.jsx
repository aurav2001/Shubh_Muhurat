import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaHeart, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Footer = () => {
    const { content } = useContent();
    const footer = content.footer || {};

    // Default Fallbacks (if context not loaded yet)
    const companyLinks = footer.companyLinks || [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blogs" },
        { name: "Contact", path: "/contact" }
    ];

    const supportLinks = footer.supportLinks || [
        { name: "Help Center", path: "/help" },
        { name: "Safety Tips", path: "/safety" },
        { name: "Membership", path: "/membership" },
        { name: "Report Issues", path: "/report" }
    ];

    const legalLinks = footer.legalLinks || [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Use", path: "/terms" },
        { name: "Cookie Policy", path: "/cookie" },
        { name: "Refund Policy", path: "/refund" }
    ];

    return (
        <footer className="bg-[#111] text-white pt-20 pb-10 relative overflow-hidden w-full max-w-full">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-20%] right-[-10%] w-[320px] md:w-[600px] h-[320px] md:h-[600px] bg-purple-900 rounded-full blur-[80px] md:blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary rounded-full blur-[70px] md:blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:w-1/3">
                        <Link to="/" className="text-3xl font-black flex items-center gap-2 mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Shubh Mhurat</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
                            {footer.description || "Connecting souls, creating stories. The most trusted platform to find your perfect life partner with safety and privacy at its core."}
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            {[
                                { icon: FaFacebookF, url: content.socialLinks?.facebook },
                                { icon: FaTwitter, url: content.socialLinks?.twitter },
                                { icon: FaInstagram, url: content.socialLinks?.instagram },
                                { icon: FaLinkedinIn, url: content.socialLinks?.linkedin }
                            ].map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.url || "#"}
                                    target={item.url ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, backgroundColor: "#fff", color: "#E11D48" }}
                                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300"
                                >
                                    <item.icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
                            <ul className="space-y-4">
                                {companyLinks.map((link, i) => (
                                    <li key={i}><Link to={link.path} className="text-sm md:text-base text-gray-400 hover:text-white transition-colors">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
                            <ul className="space-y-4">
                                {supportLinks.map((link, i) => (
                                    <li key={i}><Link to={link.path} className="text-sm md:text-base text-gray-400 hover:text-white transition-colors">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h4 className="text-lg font-bold mb-6 text-white">Legal</h4>
                            <ul className="space-y-4">
                                {legalLinks.map((link, i) => (
                                    <li key={i}><Link to={link.path} className="text-sm md:text-base text-gray-400 hover:text-white transition-colors">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="col-span-2 sm:col-span-3 md:col-span-1 mt-4 md:mt-0">
                            <h4 className="text-lg font-bold mb-6 text-white">Stay Updated</h4>
                            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for latest updates.</p>
                            <form className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-white transition-colors p-2">
                                    <FaPaperPlane />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>{footer.copyrightText || `© ${new Date().getFullYear()} Shubh Mhurat. All rights reserved.`}</p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Link to="/admin" className="text-gray-500 hover:text-primary transition-colors text-xs font-medium">
                            Admin Login
                        </Link>
                        <div className="flex items-center gap-2">
                            <span>Made with</span>
                            <FaHeart className="text-red-500 animate-pulse" />
                            <span>in India</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
