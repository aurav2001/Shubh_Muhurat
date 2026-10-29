import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaShieldAlt, 
    FaUserShield, 
    FaEye, 
    FaDatabase, 
    FaLock, 
    FaCookieBite, 
    FaHistory, 
    FaUserCheck, 
    FaBaby, 
    FaExternalLinkAlt, 
    FaEdit, 
    FaEnvelope, 
    FaPhone, 
    FaMapMarkerAlt
} from 'react-icons/fa';

const PrivacyPolicy = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: "info-collect",
            icon: FaUserShield,
            title: "1. Information We Collect",
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Personal Information
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            When you register or use our services, we may collect:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                            {[
                                "Full name",
                                "Gender",
                                "Date of birth and age",
                                "Marital status",
                                "Religion, caste, community, and ethnicity (where applicable)",
                                "Educational qualifications",
                                "Occupation and income details",
                                "Contact information (email address, phone number)",
                                "Location and address details",
                                "Profile photographs",
                                "Preferences for prospective matches",
                                "Verification documents (proof of age, address, income, etc.)"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Technical Information
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            We may automatically collect:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                            {[
                                "IP address",
                                "Browser type and version",
                                "Device information",
                                "Operating system",
                                "Website usage data",
                                "Cookies and similar tracking technologies"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: "info-use",
            icon: FaDatabase,
            title: "2. How We Use Your Information",
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p className="mb-4">We use your information to:</p>
                    <ul className="space-y-2.5 pl-2">
                        {[
                            "Create and manage your account",
                            "Provide matchmaking and matrimonial services",
                            "Display your profile to other registered members",
                            "Improve user experience and website functionality",
                            "Communicate important updates and notifications",
                            "Verify profile authenticity and prevent fraud",
                            "Respond to customer support inquiries",
                            "Comply with legal obligations"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold mt-0.5">
                                    {index + 1}
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            id: "visibility",
            icon: FaEye,
            title: "3. Profile Visibility",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    By creating an account, you understand that certain profile information may be
                    visible to other registered users for matrimonial purposes. You may have options to
                    control the visibility of specific information through your account settings.
                </p>
            )
        },
        {
            id: "sharing",
            icon: FaUserCheck,
            title: "4. Sharing of Information",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p className="font-semibold text-gray-800">
                        We do not sell your personal information to third parties.
                    </p>
                    <p>We may share information:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "With other registered members according to your privacy settings",
                            "With service providers assisting us in website operations",
                            "When required by law, court order, or government authority",
                            "To protect our rights, users, and website security",
                            "In connection with a merger, acquisition, or business transfer"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            id: "security",
            icon: FaLock,
            title: "5. Data Security",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We implement reasonable technical, administrative, and physical safeguards to
                    protect your personal information from unauthorized access, disclosure, alteration, or
                    destruction. However, no internet-based system can guarantee absolute security.
                </p>
            )
        },
        {
            id: "cookies",
            icon: FaCookieBite,
            title: "6. Cookies and Tracking Technologies",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>We use cookies and similar technologies to:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Remember user preferences",
                            "Improve website performance",
                            "Analyze traffic and usage patterns",
                            "Enhance security"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 pt-2 border-t border-gray-100 text-sm italic text-gray-500">
                        You may disable cookies through your browser settings, though some website
                        features may not function properly.
                    </p>
                </div>
            )
        },
        {
            id: "retention",
            icon: FaHistory,
            title: "7. Data Retention",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We retain your personal information as long as your account remains active or as
                    necessary to provide our services, comply with legal obligations, resolve disputes,
                    and enforce our agreements.
                </p>
            )
        },
        {
            id: "rights",
            icon: FaShieldAlt,
            title: "8. User Rights",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>Depending on applicable laws, you may have the right to:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Access your personal information",
                            "Correct inaccurate information",
                            "Update your profile details",
                            "Request deletion of your account and data",
                            "Withdraw consent where applicable"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                        Requests may be submitted through our contact details provided below.
                    </p>
                </div>
            )
        },
        {
            id: "children",
            icon: FaBaby,
            title: "9. Children's Privacy",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Our services are intended only for individuals who are legally eligible for marriage
                    under applicable laws. We do not knowingly collect information from individuals
                    below the legally permissible age.
                </p>
            )
        },
        {
            id: "links",
            icon: FaExternalLinkAlt,
            title: "10. Third-Party Links",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for the
                    privacy practices or content of such external websites.
                </p>
            )
        },
        {
            id: "changes",
            icon: FaEdit,
            title: "11. Changes to This Privacy Policy",
            content: (
                <p className="text-gray-600 leading-relaxed font-poppins">
                    We reserves the right to update, change or modify this Privacy Policy at any time.
                    The Privacy Policy shall come to effect from the date of publication of such update,
                    change or modification.
                </p>
            )
        },
        {
            id: "contact",
            icon: FaEnvelope,
            title: "12. Contact Us",
            content: (
                <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 rounded-2xl border border-primary/10">
                    <p className="text-gray-700 mb-6 font-medium">
                        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
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
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight"
                    >
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-orange-500">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg"
                    >
                        Welcome to Shubhmuhurat.biz. We are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly.
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

                    {/* Right Privacy Document */}
                    <div className="w-full lg:w-3/4 space-y-6">
                        {/* Summary Box */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/60 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FaShieldAlt className="text-primary text-2xl animate-pulse" />
                                Privacy Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                                information when you use our matrimonial website and related services.
                                By using our website, you acknowledge that you have read, understood, and agreed
                                to this Privacy Policy.
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

export default PrivacyPolicy;
