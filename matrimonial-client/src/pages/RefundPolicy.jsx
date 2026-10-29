import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaCoins,
    FaClipboardList,
    FaStar,
    FaTimesCircle,
    FaCheckCircle,
    FaFileInvoice,
    FaSearchPlus,
    FaHourglassHalf,
    FaUserTimes,
    FaGavel,
    FaEdit,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';

const RefundPolicy = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: "general-policy",
            icon: FaClipboardList,
            title: "1. General Policy",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Our matrimonial services involve immediate access to digital features, profile visibility,
                    communication tools, and matchmaking services. Therefore, all purchases are generally
                    considered final and non-refundable unless otherwise stated in this policy.
                </p>
            )
        },
        {
            id: "paid-services",
            icon: FaStar,
            title: "2. Membership Plans and Paid Services",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Upon successful payment, users receive access to the selected membership plan or premium features. These services may include:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                        {[
                            "Premium Membership Plans",
                            "Profile Boosting Services",
                            "Featured Profile Listings",
                            "Contact Information Access",
                            "Personalized Matchmaking Services",
                            "Other Digital Services Offered on the Platform"
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
            id: "non-refundable",
            icon: FaTimesCircle,
            title: "3. Non-Refundable Services",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Refunds will not be provided under the following circumstances:
                    </p>
                    <ul className="space-y-2.5 pl-2">
                        {[
                            "Change of mind after purchase.",
                            "Dissatisfaction with the number or quality of matches received.",
                            "Failure to find a suitable partner.",
                            "Inactivity or non-use of the purchased membership.",
                            "Failure to cancel automatic renewals before renewal dates.",
                            "Suspension or termination of an account due to violation of our Terms of Use.",
                            "Incorrect information provided by the user during registration."
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
            id: "eligible-requests",
            icon: FaCheckCircle,
            title: "4. Eligible Refund Requests",
            content: (
                <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                        A refund may be considered only in the following situations:
                    </p>
                    <div className="space-y-4 pl-2">
                        <div>
                            <h4 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Duplicate Payment
                            </h4>
                            <p className="text-gray-600 text-sm pl-4">
                                If a user is charged multiple times for the same service due to a technical error.
                            </p>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                            <h4 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Unauthorized Transaction
                            </h4>
                            <p className="text-gray-600 text-sm pl-4">
                                If a payment is proven to have been made without the account holder's authorization.
                            </p>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                            <h4 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Technical Failure
                            </h4>
                            <p className="text-gray-600 text-sm pl-4">
                                If premium services cannot be activated due to a verified technical issue caused by the Platform and the issue cannot be resolved within a reasonable period.
                            </p>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                            <h4 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Service Not Delivered
                            </h4>
                            <p className="text-gray-600 text-sm pl-4">
                                If the purchased service was not provided as described and the issue is verified by our support team.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "request-process",
            icon: FaFileInvoice,
            title: "5. Refund Request Process",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        To request a refund, users must contact our support team within 7 days of the transaction date. The refund request must include:
                    </p>
                    <ul className="grid grid-cols-2 gap-2 pl-2">
                        {["Registered email address", "Transaction ID / payment reference", "Date of payment", "Description of the issue"].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-2 rounded-xl border border-gray-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-red-600 font-semibold pt-2">
                        Requests submitted after the specified period may not be eligible for review.
                    </p>
                </div>
            )
        },
        {
            id: "refund-review",
            icon: FaSearchPlus,
            title: "6. Refund Review",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>All refund requests are reviewed on a case-by-case basis. We reserve the right to:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Request additional information or documentation.",
                            "Approve or reject refund requests based on our investigation.",
                            "Determine the appropriate refund amount where applicable."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm font-semibold text-gray-700 pt-2 border-t border-gray-100">
                        The decision of ShubhMuhurat.biz regarding refund eligibility shall be final.
                    </p>
                </div>
            )
        },
        {
            id: "processing-time",
            icon: FaHourglassHalf,
            title: "7. Refund Processing Time",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>Approved refunds will be processed through the original payment method whenever possible. Refund processing times may vary but generally take:</p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "7–15 business days for credit/debit cards",
                            "5–10 business days for UPI and online banking transactions",
                            "As per the applicable payment gateway's policies"
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
            id: "cancellation",
            icon: FaUserTimes,
            title: "8. Cancellation of Subscription",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Users may cancel recurring subscriptions at any time through their account settings.
                    Cancellation prevents future billing but does not entitle the user to a refund for the current
                    billing period unless otherwise required by law.
                </p>
            )
        },
        {
            id: "disputes",
            icon: FaGavel,
            title: "9. Chargebacks and Payment Disputes",
            content: (
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                        If a user initiates a chargeback or payment dispute without first contacting our support team, we reserve the right to:
                    </p>
                    <ul className="space-y-2 pl-2">
                        {[
                            "Suspend or terminate the account.",
                            "Restrict access to services.",
                            "Contest the chargeback with supporting transaction records."
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            id: "changes",
            icon: FaEdit,
            title: "10. Changes to this Refund Policy",
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify this Refund Policy at any time.
                    Updated versions will be posted on the website along with the revised effective date.
                </p>
            )
        },
        {
            id: "contact",
            icon: FaEnvelope,
            title: "11. Contact Us",
            content: (
                <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 rounded-2xl border border-primary/10">
                    <p className="text-gray-700 mb-6 font-medium">
                        For refund-related inquiries, please contact:
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
                        Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-orange-500">Policy</span>
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
                        This Refund Policy explains the terms and conditions governing refunds for subscriptions, membership plans, and paid services offered through our matrimonial platform.
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

                    {/* Right Refund Document */}
                    <div className="w-full lg:w-3/4 space-y-6">
                        {/* Summary Box */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/60 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FaCoins className="text-primary text-2xl" />
                                Refund Agreement
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                By purchasing any paid service on our website, you agree to this Refund Policy. Please review the eligibility criteria and timelines outlined below.
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

export default RefundPolicy;
