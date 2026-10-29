import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaCookieBite,
    FaQuestionCircle,
    FaCogs,
    FaClipboardList,
    FaUsers,
    FaSlidersH,
    FaCompass,
    FaShieldAlt,
    FaEdit,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaChrome,
    FaFirefox,
    FaEdge,
    FaSafari,
    FaOpera
} from 'react-icons/fa';

const CookiePolicy = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: "what-are-cookies",
            icon: FaQuestionCircle,
            title: "1. What Are Cookies?",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Cookies are small text files that are stored on your computer, mobile device, or other
                    internet-enabled device when you visit a website. Cookies help websites remember
                    your preferences, improve user experience, and provide certain website
                    functionalities.
                </p>
            )
        },
        {
            id: "how-we-use",
            icon: FaCogs,
            title: "2. How We Use Cookies",
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p className="mb-4">We use cookies to:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                        {[
                            "Enable essential website functions",
                            "Maintain user login sessions",
                            "Remember user preferences and settings",
                            "Improve website performance and functionality",
                            "Analyse website traffic and user behaviour",
                            "Enhance security and prevent fraudulent activity",
                            "Personalize content and matchmaking experiences",
                            "Measure the effectiveness of marketing and promotional campaigns"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            id: "types-of-cookies",
            icon: FaClipboardList,
            title: "3. Types of Cookies We Use",
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Essential Cookies
                        </h4>
                        <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                            These cookies are necessary for the operation of our website and cannot be disabled. They help with:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                            {["User authentication", "Account security", "Navigation and website functionality", "Session management"].map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Performance and Analytics Cookies
                        </h4>
                        <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                            These cookies help us understand how visitors interact with our website by collecting anonymous information such as:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                            {["Number of visitors", "Pages visited", "Time spent on the website", "Website performance metrics"].map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Functional Cookies
                        </h4>
                        <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                            These cookies allow the website to remember choices you make, such as:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                            {["Language preferences", "Login details", "Search preferences", "Profile settings"].map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Advertising and Marketing Cookies
                        </h4>
                        <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                            These cookies may be used to:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                            {["Deliver relevant advertisements", "Measure advertising performance", "Limit repetitive advertisements", "Understand user interests and preferences"].map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: "third-party",
            icon: FaUsers,
            title: "4. Third-Party Cookies",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We may allow trusted third-party service providers to place cookies on our website
                    for analytics, advertising, payment processing, security, or other business purposes.
                    These third parties may collect information about your online activities in accordance
                    with their own privacy policies.
                </p>
            )
        },
        {
            id: "managing-cookies",
            icon: FaSlidersH,
            title: "5. Managing Cookies",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Most web browsers automatically accept cookies. However, you can modify your
                        browser settings to:
                    </p>
                    <ul className="space-y-2 pl-2">
                        {["Accept or reject cookies", "Delete existing cookies", "Receive notifications before cookies are stored"].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-600 text-sm italic border-l-2 border-primary/30 pl-4 py-1">
                        Please note that disabling certain cookies may affect website functionality and your user experience.
                    </p>
                    
                    <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-base font-bold text-gray-900 mb-4">Browser Support Links</h4>
                        <p className="text-gray-600 text-sm mb-4">You can manage cookies through your browser settings:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {[
                                { name: "Google Chrome", icon: FaChrome, url: "https://support.google.com/chrome/answer/95647" },
                                { name: "Mozilla Firefox", icon: FaFirefox, url: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" },
                                { name: "Microsoft Edge", icon: FaEdge, url: "https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" },
                                { name: "Safari", icon: FaSafari, url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
                                { name: "Opera", icon: FaOpera, url: "https://help.opera.com/en/latest/web-preferences/#cookies" }
                            ].map((browser, index) => {
                                const BrowserIcon = browser.icon;
                                return (
                                    <a 
                                        key={index} 
                                        href={browser.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-sm transition-all text-center group"
                                    >
                                        <BrowserIcon className="text-2xl text-gray-400 group-hover:text-primary transition-colors" />
                                        <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{browser.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "tracking-tech",
            icon: FaCompass,
            title: "6. Similar Tracking Technologies",
            content: (
                <div className="space-y-3">
                    <p className="text-gray-600 leading-relaxed">
                        In addition to cookies, we may use technologies such as:
                    </p>
                    <ul className="grid grid-cols-2 gap-3 pl-2">
                        {["Web beacons", "Pixels", "Local storage", "Session storage"].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-500 text-sm mt-3">
                        These technologies help us analyze website performance and improve our services.
                    </p>
                </div>
            )
        },
        {
            id: "data-protection",
            icon: FaShieldAlt,
            title: "7. Data Protection",
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        Information collected through cookies is handled in accordance with our Privacy Policy and applicable data protection laws.
                    </p>
                    <p>
                        We implement reasonable security measures to protect information collected through cookies from unauthorized access, disclosure, or misuse.
                    </p>
                </div>
            )
        },
        {
            id: "changes",
            icon: FaEdit,
            title: "8. Changes to This Cookies Policy",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We may update this Cookies Policy from time to time to reflect changes in
                    technology, legal requirements, or our business practices. Any updates will be posted on this page along with the revised effective date.
                </p>
            )
        },
        {
            id: "contact",
            icon: FaEnvelope,
            title: "9. Contact Us",
            content: (
                <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 rounded-2xl border border-primary/10">
                    <p className="text-gray-700 mb-6 font-medium">
                        If you have any questions regarding this Cookies Policy, please contact us:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Company</p>
                                <p className="text-gray-800 font-bold font-poppins">ShubhMuhurat.biz</p>
                            </div>
                        </div>
                        <a href="mailto:rm@shubhmuhurat.biz" className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 transition-all flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary group-hover:text-white rounded-full flex items-center justify-center text-primary transition-colors">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Email Us</p>
                                <p className="text-gray-800 font-bold group-hover:text-primary transition-colors font-poppins">rm@shubhmuhurat.biz</p>
                            </div>
                        </a>
                        <a href="tel:8826266711" className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 transition-all flex items-center gap-4 group md:col-span-2">
                            <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary group-hover:text-white rounded-full flex items-center justify-center text-primary transition-colors">
                                <FaPhone />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Call Us</p>
                                <p className="text-gray-800 font-bold group-hover:text-primary transition-colors font-poppins">8826266711</p>
                            </div>
                        </a>
                    </div>
                </div>
            )
        }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // adjust for sticky navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] font-poppins">
            {/* Header Section */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-b from-white to-[#F5F5F7] overflow-hidden border-b border-gray-200/50">
                <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4 uppercase tracking-widest"
                    >
                        Legal Documents
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight tracking-tight"
                    >
                        Cookies <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-orange-500">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6"
                    >
                        Last Updated: June 2026
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg"
                    >
                        This Cookies Policy explains how Shubhmuhurat.biz, We uses cookies and similar technologies when you visit or use our matrimonial website and related services.
                    </motion.p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Sticky Navigation (Table of Contents) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full lg:w-1/4 lg:sticky lg:top-28 bg-white p-6 rounded-3xl shadow-sm border border-gray-200/60 hidden lg:block"
                    >
                        <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4">On This Page</h3>
                        <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-600 rounded-xl hover:bg-primary/5 hover:text-primary transition-all group font-medium"
                                    >
                                        <Icon className="text-gray-400 group-hover:text-primary transition-colors text-base" />
                                        <span className="truncate">{section.title.split('. ')[1]}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </motion.div>

                    {/* Right Cookie Document */}
                    <div className="w-full lg:w-3/4 space-y-6">
                        {/* Summary Box */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/60 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FaCookieBite className="text-primary text-2xl" />
                                Cookies Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-3">
                                By continuing to browse or use our website, you agree to our use of cookies as described in this policy.
                            </p>
                            <p className="text-gray-500 text-xs">
                                Cookies are key to making our website work correctly and securely while personalized matching functions are active.
                            </p>
                        </motion.div>

                        {/* Sections List */}
                        {sections.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.2) }}
                                    className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/60 shadow-sm scroll-mt-28"
                                >
                                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl">
                                            <Icon />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                            {section.title}
                                        </h3>
                                    </div>
                                    <div className="text-gray-700 leading-relaxed">
                                        {section.content}
                                    </div>
                                </motion.section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
