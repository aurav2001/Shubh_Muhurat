import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaFileSignature,
    FaUserCheck,
    FaUserPlus,
    FaHandshake,
    FaExclamationTriangle,
    FaImage,
    FaLock,
    FaComments,
    FaCreditCard,
    FaBan,
    FaRegCopyright,
    FaExclamationCircle,
    FaBalanceScale,
    FaShieldAlt,
    FaFlag,
    FaEdit,
    FaGavel,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';

const TermsOfUse = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: "eligibility",
            icon: FaUserCheck,
            title: "1. Eligibility",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        To use our services, you must:
                    </p>
                    <ul className="space-y-2.5 pl-2">
                        {[
                            "Be legally eligible to marry under the laws applicable in your jurisdiction.",
                            "Be at least 18 years of age or the minimum legal age required by applicable law.",
                            "Have the legal capacity to enter into a binding agreement.",
                            "Provide accurate and truthful information during registration."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-700 font-semibold text-sm pt-2">
                        By using the Platform, you represent and warrant that you meet all eligibility requirements.
                    </p>
                </div>
            )
        },
        {
            id: "registration",
            icon: FaUserPlus,
            title: "2. Registration and Account Responsibility",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        You agree to:
                    </p>
                    <ul className="space-y-2.5 pl-2">
                        {[
                            "Provide accurate, current, and complete information.",
                            "Update your profile whenever necessary.",
                            "Maintain the confidentiality of your login credentials.",
                            "Accept responsibility for all activities conducted through your account."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-600 text-sm italic border-l-2 border-primary/30 pl-4 py-1">
                        You may not create multiple accounts for deceptive or fraudulent purposes.
                    </p>
                </div>
            )
        },
        {
            id: "nature-of-services",
            icon: FaHandshake,
            title: "3. Nature of Services",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        ShubhMuhurat.biz provides an online platform to facilitate matrimonial introductions and
                        communication between registered members.
                    </p>
                    <div className="pt-2">
                        <p className="font-semibold text-gray-800 mb-2">We do not:</p>
                        <ul className="space-y-2 pl-2">
                            {[
                                "Guarantee marriage, engagement, or relationship success.",
                                "Conduct background checks on all members.",
                                "Verify every statement made by users.",
                                "Guarantee the accuracy or authenticity of member profiles."
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-600 mt-2">
                        Users are responsible for conducting their own due diligence before entering into any
                        relationship or sharing personal information.
                    </p>
                </div>
            )
        },
        {
            id: "user-conduct",
            icon: FaExclamationTriangle,
            title: "4. User Conduct",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        You agree not to:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                        {[
                            "Post false, misleading, or fraudulent information.",
                            "Impersonate another person.",
                            "Upload offensive, abusive, defamatory, obscene, or illegal content.",
                            "Harass, threaten, stalk, or intimidate other members.",
                            "Solicit money, investments, loans, or financial assistance.",
                            "Use the Platform for commercial advertising or promotions.",
                            "Violate any applicable laws or regulations."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-red-600 font-bold bg-red-50 p-4 rounded-xl border border-red-100">
                        Any violation may result in immediate suspension or termination of your account.
                    </p>
                </div>
            )
        },
        {
            id: "profile-content",
            icon: FaImage,
            title: "5. Profile Content",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        You are solely responsible for the content you upload, including:
                    </p>
                    <ul className="grid grid-cols-2 gap-2 pl-2">
                        {["Personal information", "Photographs", "Messages", "Profile descriptions"].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-600 text-sm pt-2">
                        By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use,
                        display, reproduce, and distribute such content solely for operating and promoting the Platform.
                    </p>
                </div>
            )
        },
        {
            id: "privacy",
            icon: FaLock,
            title: "6. Privacy",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Your use of the Platform is also governed by our Privacy Policy and Cookies Policy, which
                    form an integral part of these Terms of Use.
                </p>
            )
        },
        {
            id: "communication",
            icon: FaComments,
            title: "7. Communication Between Members",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Members may communicate through the Platform's features. You acknowledge that:
                    </p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Any interaction with another member is at your own risk.",
                            "We are not responsible for the conduct of users.",
                            "We do not guarantee the truthfulness of information provided by members."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="font-semibold text-gray-800 text-sm bg-primary/5 p-4 rounded-xl border border-primary/10">
                        We encourage users to exercise caution when sharing personal information.
                    </p>
                </div>
            )
        },
        {
            id: "subscription",
            icon: FaCreditCard,
            title: "8. Subscription and Payments",
            content: (
                <div className="space-y-3">
                    <p className="text-gray-600 leading-relaxed">Where applicable:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Certain services may require payment of membership fees.",
                            "Fees are displayed before purchase.",
                            "Payments are generally non-refundable unless otherwise required by law.",
                            "We reserve the right to modify pricing and subscription plans at any time."
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
            id: "suspension",
            icon: FaBan,
            title: "9. Account Suspension and Termination",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>We reserve the right to suspend or terminate any account without prior notice if:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "These Terms are violated.",
                            "Fraudulent activity is detected.",
                            "False information is provided.",
                            "User behavior threatens the safety or integrity of the Platform."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm italic pt-2">
                        Termination does not waive any rights or remedies available to us.
                    </p>
                </div>
            )
        },
        {
            id: "intellectual-property",
            icon: FaRegCopyright,
            title: "10. Intellectual Property",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        All content, trademarks, logos, software, designs, and materials on the Platform are owned by
                        or licensed to ShubhMuhurat.biz.
                    </p>
                    <p className="font-semibold text-gray-800 mb-2">You may not:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Copy, reproduce, modify, or distribute Platform content.",
                            "Reverse engineer any part of the Platform.",
                            "Use our trademarks without prior written consent."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            id: "disclaimer",
            icon: FaExclamationCircle,
            title: "11. Disclaimer of Warranties",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        The Platform and services are provided on an "as is" and "as available" basis. We make no warranties regarding:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                        {[
                            "Availability of services",
                            "Accuracy of member information",
                            "Compatibility between members",
                            "Successful matchmaking outcomes",
                            "Security or uninterrupted access"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-gray-500 italic pt-2">
                        To the fullest extent permitted by law, all warranties are disclaimed.
                    </p>
                </div>
            )
        },
        {
            id: "liability",
            icon: FaBalanceScale,
            title: "12. Limitation of Liability",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                        To the maximum extent permitted by law, ShubhMuhurat.biz, its directors, employees,
                        affiliates, and partners shall not be liable for:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                        {[
                            "Indirect or consequential damages",
                            "Loss of data",
                            "Loss of profits",
                            "Emotional distress",
                            "Disputes between users",
                            "Actions or conduct of other members"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm font-semibold text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        Your use of the Platform is entirely at your own risk.
                    </p>
                </div>
            )
        },
        {
            id: "indemnification",
            icon: FaShieldAlt,
            title: "13. Indemnification",
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        You agree to indemnify and hold harmless ShubhMuhurat.biz, its officers, employees,
                        affiliates, and partners from any claims, damages, losses, liabilities, costs, or expenses arising from:
                    </p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Your use of the Platform",
                            "Your violation of these Terms",
                            "Your infringement of any third-party rights"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            id: "reporting-abuse",
            icon: FaFlag,
            title: "14. Reporting Abuse",
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        Users may report suspicious, fraudulent, or inappropriate behaviour through our support channels.
                    </p>
                    <p>
                        We reserve the right to investigate reported violations and take appropriate action.
                    </p>
                </div>
            )
        },
        {
            id: "changes-to-terms",
            icon: FaEdit,
            title: "15. Changes to Terms",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We may update these Terms of Use at any time. Updated versions will be posted on the Platform with the revised effective date. Continued use of the Platform after changes become effective constitutes acceptance of the updated Terms.
                </p>
            )
        },
        {
            id: "governing-law",
            icon: FaGavel,
            title: "16. Governing Law and Jurisdiction",
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of India.
                    </p>
                    <p>
                        Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the
                        courts located in Delhi, India.
                    </p>
                </div>
            )
        },
        {
            id: "contact",
            icon: FaEnvelope,
            title: "17. Contact Information",
            content: (
                <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 rounded-2xl border border-primary/10">
                    <p className="text-gray-700 mb-6 font-medium">
                        For questions regarding these Terms of Use, please contact:
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
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-orange-500">Use</span>
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
                        Welcome to Shubhmuhurat.biz. These Terms of Use govern your access to and use of our matrimonial website, mobile applications, and related services.
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

                    {/* Right Terms Document */}
                    <div className="w-full lg:w-3/4 space-y-6">
                        {/* Summary Box */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/60 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FaFileSignature className="text-primary text-2xl" />
                                Agreement Acceptance
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-3">
                                By registering, accessing, or using our services, you agree to be bound by these Terms of
                                Use. If you do not agree with these terms, please do not use our services.
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

export default TermsOfUse;
