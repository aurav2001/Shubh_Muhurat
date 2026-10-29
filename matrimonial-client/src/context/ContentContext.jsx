import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

// Dynamic API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to safely spread objects and prevent RangeError: Too many properties to enumerate
// This happens if we try to spread a massive string or non-object by accident.
const safeSpread = (target, source) => {
    if (!source || typeof source !== 'object' || Array.isArray(source)) return target;
    const result = { ...target };
    Object.keys(source).forEach(key => {
        const sourceVal = source[key];
        const targetVal = target[key];
        if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
            result[key] = safeSpread(targetVal || {}, sourceVal);
        } else if (sourceVal !== undefined && sourceVal !== null && sourceVal !== "") {
            result[key] = sourceVal;
        } else if (targetVal !== undefined) {
            result[key] = targetVal;
        }
    });
    return result;
};

// Seed Data (separated from default state to prevent ghost IDs)
const SEED_PLANS = [
    {
        id: 0,
        title: "Gold",
        category: "Essential Matchmaking",
        tagline: "Start your journey today",
        iconName: "FaStar",
        price: "₹2,999",
        period: "/ 3 months",
        description: "Perfect for those just starting their search. Get access to verified profiles and start connecting.",
        features: ["Send unlimited messages", "View 50 contact numbers", "Profile highlighted", "Priority Support"],
        color: "from-yellow-400 to-orange-500",
        recommended: false
    },
    {
        id: 1,
        title: "Diamond",
        category: "Priority Search",
        tagline: "Most popular choice",
        iconName: "FaGem",
        price: "₹5,999",
        period: "/ 6 months",
        description: "Accelerate your search with higher visibility and direct contact access. Ideal for serious seekers.",
        features: ["All Gold Features", "View 150 contact numbers", "Standout Profile Highlighter", "Relationship Manager (1 mo)"],
        color: "from-blue-400 to-cyan-500",
        recommended: true
    },
    {
        id: 2,
        title: "Platinum",
        category: "Elite Experience",
        tagline: "The ultimate VIP treatment",
        iconName: "FaCrown",
        price: "₹9,999",
        period: "/ 12 months",
        description: "Complete peace of mind with a dedicated relationship manager and unlimited access.",
        features: ["All Diamond Features", "Unlimited Contacts", "Personal Relationship Manager (3 mo)", "Background Verification"],
        color: "from-purple-500 to-pink-500",
        recommended: false
    }
];

const defaultContent = {
    navbar: {
        logoText: "Matrimonial",
        ctaText: "Let's Get Started",
        ctaLink: "/contact",
        links: [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Membership', path: '/membership' },
            { name: 'Success Story', path: '/success-stories' },
            { name: 'Blogs', path: '/blogs' },
            { name: 'Contact US', path: '/contact' }
        ]
    },
    home: {
        hero: {
            title: "Find Your Perfect",
            highlight: "Life Partner",
            badge: "#1 Trusted Matrimonial Site",
            subtitle: "Discover verified profiles, tailored matches, and a secure platform to find your soulmate. Begin your beautiful journey today.",
            bgImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        },
        trust: {
            subtitle: "Why Choose Us",
            title: "The Most Trusted Matchmaking Service",
            card1Title: "100% Verified Profiles",
            card1Desc: "Every profile is thoroughly verified via mobile number, ID proof, and social links to ensure complete safety and trust.",
            card2Title: "Secure & Private",
            card2Desc: "Your privacy is our utmost priority. Control who sees your photos, contact info, and personal details easily.",
            card3Title: "Tailored Matching",
            card3Desc: "Our smart matching system helps you find highly compatible matches based on values, beliefs, and preferences."
        },
        testimonials: {
            label: "Success Stories",
            title: "Happy",
            highlight: "Couples"
        }
    },
    membership: {
        header: {
            title: "Choose the Perfect",
            highlight: "Membership Plan",
            subtitle: "Find your perfect match with our tailored subscription options designed to give you premium visibility and connection tools."
        }
    },
    successStories: {
        hero: {
            title: "Success Stories",
            subtitle: "Real couples, real love stories that started right here.",
            bgImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        },
        stats: {
            stat1Num: "10,000+", stat1Label: "Matches Made",
            stat2Num: "100%", stat2Label: "Verified Users",
            stat3Num: "24/7", stat3Label: "Customer Support"
        },
        cta: {
            title: "Ready to Write Your Own Story?",
            subtitle: "Join thousands of happy couples who found their perfect lifetime partner on our platform.",
            buttonText: "Register Now"
        },
        faqs: []
    },
    blogsPage: {
        hero: {
            title: "Our Latest Insights",
            subtitle: "Read helpful advice, tips, and inspiration for your relationship journey.",
            bgImage: "https://images.unsplash.com/photo-1522673607200-1645062cd495?q=80&w=2070&auto=format&fit=crop"
        }
    },
    contactPage: {
        topSection: {
            titlePart1: "We are here to",
            titlePart2: "Help You",
            tagline: "Have questions or need assistance? Reach out to our dedicated support team."
        },
        hero: {
            title: "Let's start a",
            highlight: "Conversation",
            subtitle: "Whether you're looking for a match or need assistance, our team is ready to help you write your success story."
        },
        formSection: {
            titlePart1: "Send Us a",
            titlePart2: "Message",
            subtitle: "Fill out the form below and we will get back to you within 24 hours."
        },
        info: {
            phone1: "+91 98765 43210",
            phone2: "+91 87654 32109",
            email1: "info@shubhmuhurat.biz",
            email2: "support@shubhmuhurat.biz",
            address: "123, Shubh Muhurat Plaza, Delhi, India",
            mapLink: "https://maps.google.com"
        }
    },
    aboutPage: {
        hero: {
            badge: "EST. 2010",
            title: "Bringing Hearts",
            highlight: "Together",
            subtitle: "We are dedicated to helping you write your own happily ever after.",
            image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        stats: [],
        story: {
            label: "Our Story",
            title: "How We Started",
            titleLine2: "With a Vision of Love",
            paragraph1: "Shubh Muhurat was founded with a simple yet powerful vision: to help people find genuine, lifelong companionship in a secure and respectful environment.",
            paragraph2: "We combine traditional values with modern matchmaking technology to bring you highly compatible profiles verified by real humans.",
            buttonText: "Learn More",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        vision: {
            title: "Our Vision & Mission",
            highlight: "Creating Happy Homes",
            quote: "A successful marriage requires falling in love many times, always with the same person.",
            subtext: "We strive to build a community where trust, compatibility, and respect form the foundation of every lifetime relationship.",
            videoUrl: "",
            bgImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        },
        milestones: {
            title: "Our Milestones",
            subtitle: "A timeline of our achievements and journey.",
            items: []
        },
        values: {
            title: "Our Values",
            subtitle: "The core principles that guide us.",
            items: []
        },
        faqs: [],
        description: {
            title: "About Us",
            text: ""
        },
        faqSection: {
            title: "Frequently Asked Questions",
            subtitle: "Got questions? We've got answers."
        }
    },
    socialLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: ""
    },
    footer: {
        description: "Helping you find your perfect life partner. Trusted, secure, and successful matchmaking.",
        copyrightText: "© 2026 Shubh Muhurat Matrimonial. All Rights Reserved.",
        companyLinks: [],
        supportLinks: [],
        legalLinks: []
    },
    blogs: [],
    users: [],
    communities: [],
    testimonials: [],
    stories: [],
    plans: []
};

export const ContentProvider = ({ children }) => {
    // Initialize State (Caching disabled to prevent QuotaExceededError with large JSON)
    const [content, setContent] = useState(defaultContent);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [hasLoadedSuccessfully, setHasLoadedSuccessfully] = useState(false); // New flag for safety
    const [hasChanges, setHasChanges] = useState(false); // Track dirty/edited state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('guest');

    // Safe item normalizer to avoid undefined/invalid JSON slices
    const safeParseItem = (item) => {
        if (!item || typeof item !== 'object') return item;
        let parsedItem = { ...item, id: item.id || item._id };
        ['features', 'featuredProfiles', 'socialLinks', 'tags', 'sliderImages'].forEach(key => {
            const isArrayType = ['features', 'featuredProfiles', 'tags', 'sliderImages'].includes(key);
            if (typeof parsedItem[key] === 'string') {
                try {
                    const parsed = JSON.parse(parsedItem[key]);
                    parsedItem[key] = isArrayType ? (Array.isArray(parsed) ? parsed : [parsed]) : (typeof parsed === 'object' && parsed !== null ? parsed : {});
                } catch (e) {
                    parsedItem[key] = isArrayType ? (parsedItem[key].includes(',') ? parsedItem[key].split(',').map(s => s.trim()).filter(Boolean) : (parsedItem[key] ? [parsedItem[key]] : [])) : {};
                }
            } else if (isArrayType && !Array.isArray(parsedItem[key])) {
                parsedItem[key] = parsedItem[key] ? [parsedItem[key]] : [];
            }
        });
        return parsedItem;
    };

    const normalize = (items) => {
        if (!Array.isArray(items)) return [];
        return items.map(safeParseItem);
    };

    const normOne = safeParseItem;

    // --- Dynamic Data Fetching Functions ---
    const fetchUsers = async () => { 
        try { 
            const res = await axios.get(`${API_URL}/users`, { timeout: 15000 }); 
            const data = normalize(res.data);
            setContent(prev => ({ ...prev, users: data })); 
            return data;
        } catch (err) { 
            console.error("fetchUsers error:", err); 
            return [];
        } 
    };

    const fetchCommunities = async () => { 
        try { 
            const res = await axios.get(`${API_URL}/communities`, { timeout: 15000 }); 
            const data = normalize(res.data);
            setContent(prev => ({ ...prev, communities: data })); 
            return data;
        } catch (err) { 
            console.error("fetchCommunities error:", err); 
            return [];
        } 
    };

    const fetchTestimonials = async () => { 
        try { 
            const res = await axios.get(`${API_URL}/testimonials`, { timeout: 15000 }); 
            const data = normalize(res.data);
            setContent(prev => ({ ...prev, testimonials: data })); 
            return data;
        } catch (err) { 
            console.error("fetchTestimonials error:", err); 
            return [];
        } 
    };

    const fetchStories = async () => { 
        try { 
            const res = await axios.get(`${API_URL}/stories`, { timeout: 15000 }); 
            const data = normalize(res.data);
            setContent(prev => ({ ...prev, stories: data })); 
            return data;
        } catch (err) { 
            console.error("fetchStories error:", err); 
            return [];
        } 
    };

    const fetchPlans = async () => { 
        try { 
            const res = await axios.get(`${API_URL}/plans`, { timeout: 15000 }); 
            const data = normalize(res.data);
            setContent(prev => ({ ...prev, plans: data })); 
            return data;
        } catch (err) { 
            console.error("fetchPlans error:", err); 
            return [];
        } 
    };

    const fetchBlogs = async () => { 
        try { 
            const res = await axios.get(`${API_URL}/blogs`, { timeout: 15000 }); 
            const data = normalize(res.data);
            setContent(prev => ({ ...prev, blogs: data })); 
            return data;
        } catch (err) { 
            console.error("fetchBlogs error:", err); 
            return [];
        } 
    };

    const fetchAllCollections = async () => {
        setIsFetchingData(true);
        try {
            await Promise.allSettled([
                fetchUsers(),
                fetchCommunities(),
                fetchTestimonials(),
                fetchStories(),
                fetchPlans(),
                fetchBlogs()
            ]);
        } finally {
            setIsFetchingData(false);
        }
    };

    // Check for existing session (safely wrapped for Safari Private Mode)
    useEffect(() => {
        try {
            const token = localStorage.getItem('adminToken');
            if (token && token.startsWith('mock-token-')) {
                setIsAuthenticated(true);
                setUserRole('admin');
                fetchAllCollections();
            } else {
                localStorage.removeItem('adminToken');
                setIsAuthenticated(false);
                setUserRole('guest');
            }
        } catch (e) {
            console.warn("localStorage inaccessible (e.g. Safari Private Mode):", e);
            setIsAuthenticated(false);
            setUserRole('guest');
        }
    }, []);

    const login = async (username, password) => {
        console.log("Attempting login to:", `${API_URL}/admin/login`);
        try {
            const res = await axios.post(`${API_URL}/admin/login`, { username, password }, { timeout: 10000 });
            console.log("Login successful:", res.data);
            if (res.data.success) {
                setIsAuthenticated(true);
                setUserRole('admin');
                try {
                    localStorage.setItem('adminToken', res.data.token);
                } catch (e) {
                    console.warn("Could not save token to localStorage:", e);
                }
                fetchAllCollections();
                return true;
            }
        } catch (error) {
            console.error("Login Error Details:", error.response ? error.response.data : error.message);
            return false;
        }
        return false;
    };

    const logout = () => {
        console.log("Logging out...");
        try {
            localStorage.removeItem('adminToken');
        } catch (e) {}
        setIsAuthenticated(false);
        setUserRole('guest');
        console.log("Logged out. isAuthenticated set to false.");
    };

    // Initial Load - Split Strategy with timeout safety
    useEffect(() => {
        const loadData = async () => {
            try {
                // Do not swallow errors. Let network/CORS failures drop to the outer catch block.
                const res = await axios.get(`${API_URL}/content`, { timeout: 12000 });
                const contentData = res.data || {};

                // Update with critical data with type safety
                setContent(prev => {
                    const merged = safeSpread(prev, contentData);
                    return {
                        ...merged,
                        home: safeSpread(defaultContent.home, contentData.home),
                        membership: safeSpread(defaultContent.membership, contentData.membership),
                        successStories: safeSpread(defaultContent.successStories, contentData.successStories),
                    };
                });

                // Set loading to false as soon as critical content is ready
                setIsLoading(false);
                setHasLoadedSuccessfully(true);
                setHasChanges(false); // Ensure clean state on successful load

            } catch (e) {
                console.error("Error fetching critical content", e);
                setIsLoading(false);
                setHasLoadedSuccessfully(false);
                setHasChanges(false);
            }

            // The following collections will now be fetched on demand via dedicated functions
            // to improve initial load speed.
        };
        loadData();
    }, []);

    // Save CMS Content (Debounced) - Only if loaded successfully and has changes!
    useEffect(() => {
        if (isLoading || !hasLoadedSuccessfully || !hasChanges) return; // CRITICAL: Only save if loaded successfully and user edited!

        const saveContent = async () => {
            try {
                // Strip collections from the object we send for content storage
                const { users, communities, testimonials, stories, plans, blogs, ...siteData } = content;
                await axios.post(`${API_URL}/content`, { data: siteData });
                setHasChanges(false); // Reset dirty flag
            } catch (err) {
                // console.error("Failed to save content:", err); // Suppress frequent logs
            }
        };

        const timeoutId = setTimeout(saveContent, 5000); // 5s debounce
        return () => clearTimeout(timeoutId);
    }, [content.home, content.membership, content.successStories, content.blogsPage, content.navbar, content.contactPage, content.footer, content.socialLinks, content.aboutPage, isLoading, hasLoadedSuccessfully, hasChanges]);

    // --- Helper Actions ---

    const updateContent = (page, section, key, value) => {
        setHasChanges(true); // User made an edit!
        setContent(prev => {
            const currentPage = prev[page] || {};
            // If section is null, we are updating a direct property of the page (e.g. navbar.logoText)
            if (section === null) {
                return {
                    ...prev,
                    [page]: {
                        ...currentPage,
                        [key]: value
                    }
                };
            }
            // Otherwise we are updating a sub-section (e.g. home.hero.title)
            return {
                ...prev,
                [page]: {
                    ...currentPage,
                    [section]: key === null
                        ? value // Replace entire section (e.g. array)
                        : {
                            ...(currentPage[section] || {}),
                            [key]: value
                        }
                }
            };
        });
    };
    // Generic Helper Wrappers

    // Users
    const addUser = async (userData) => { try { const res = await axios.post(`${API_URL}/users`, userData); setContent(prev => ({ ...prev, users: [normOne(res.data), ...(prev.users || [])] })); } catch (err) { console.error(err); alert("Failed"); } };
    const updateUser = async (id, data) => { try { const res = await axios.put(`${API_URL}/users/${id}`, data); setContent(prev => ({ ...prev, users: prev.users.map(u => (u.id || u._id) === id ? normOne(res.data) : u) })); } catch (err) { console.error(err); alert("Failed"); } };
    const deleteUser = async (id) => { if (!window.confirm("Delete?")) return; try { await axios.delete(`${API_URL}/users/${id}`); setContent(prev => ({ ...prev, users: prev.users.filter(u => (u.id || u._id) !== id) })); } catch (err) { console.error(err); alert("Failed"); } };

    // Communities
    const addCommunity = async (data) => { try { const res = await axios.post(`${API_URL}/communities`, data); setContent(prev => ({ ...prev, communities: [normOne(res.data), ...(prev.communities || [])] })); } catch (err) { console.error(err); alert("Failed"); } };
    const updateCommunity = async (id, data) => { try { const res = await axios.put(`${API_URL}/communities/${id}`, data); setContent(prev => ({ ...prev, communities: prev.communities.map(c => (c.id || c._id) === id ? normOne(res.data) : c) })); } catch (err) { console.error(err); alert("Failed"); } };
    const deleteCommunity = async (id) => { if (!window.confirm("Delete?")) return; try { await axios.delete(`${API_URL}/communities/${id}`); setContent(prev => ({ ...prev, communities: prev.communities.filter(c => (c.id || c._id) !== id) })); } catch (err) { console.error(err); alert("Failed"); } };

    // Testimonials (Optimistic Updates)
    const addTestimonial = async (data) => {
        // Optimistic: Add immediately with temp ID
        const tempId = 'temp-' + Date.now();
        const optimisticItem = { ...data, id: tempId, _id: tempId };
        setContent(prev => ({ ...prev, testimonials: [optimisticItem, ...(prev.testimonials || [])] }));
        try {
            const res = await axios.post(`${API_URL}/testimonials`, data);
            // Replace temp item with real one
            setContent(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === tempId ? normOne(res.data) : t) }));
        } catch (err) {
            // Rollback on failure
            setContent(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== tempId) }));
            console.error(err); alert("Failed to add testimonial");
        }
    };
    const updateTestimonial = async (id, data) => {
        // Optimistic: Update immediately
        const backup = content.testimonials.find(t => (t.id || t._id) === id);
        setContent(prev => ({ ...prev, testimonials: prev.testimonials.map(t => (t.id || t._id) === id ? { ...t, ...data } : t) }));
        try {
            const res = await axios.put(`${API_URL}/testimonials/${id}`, data);
            // Sync with server response
            setContent(prev => ({ ...prev, testimonials: prev.testimonials.map(t => (t.id || t._id) === id ? normOne(res.data) : t) }));
        } catch (err) {
            // Rollback on failure
            if (backup) setContent(prev => ({ ...prev, testimonials: prev.testimonials.map(t => (t.id || t._id) === id ? backup : t) }));
            console.error(err); alert("Failed to update testimonial");
        }
    };
    const deleteTestimonial = async (id) => {
        if (!window.confirm("Delete?")) return;
        // Optimistic: Remove immediately
        const backup = content.testimonials.find(t => (t.id || t._id) === id);
        setContent(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => (t.id || t._id) !== id) }));
        try {
            await axios.delete(`${API_URL}/testimonials/${id}`);
        } catch (err) {
            // Rollback on failure
            if (backup) setContent(prev => ({ ...prev, testimonials: [backup, ...prev.testimonials] }));
            console.error(err); alert("Failed to delete testimonial");
        }
    };

    // Stories (Optimistic Updates)
    const addStory = async (data) => {
        const tempId = 'temp-' + Date.now();
        const optimisticItem = { ...data, id: tempId, _id: tempId };
        setContent(prev => ({ ...prev, stories: [optimisticItem, ...(prev.stories || [])] }));
        try {
            const res = await axios.post(`${API_URL}/stories`, data);
            setContent(prev => ({ ...prev, stories: prev.stories.map(s => s.id === tempId ? normOne(res.data) : s) }));
        } catch (err) {
            setContent(prev => ({ ...prev, stories: prev.stories.filter(s => s.id !== tempId) }));
            console.error(err); alert("Failed to add story");
        }
    };
    const updateStory = async (id, data) => {
        const backup = content.stories.find(s => (s.id || s._id) === id);
        setContent(prev => ({ ...prev, stories: prev.stories.map(s => (s.id || s._id) === id ? { ...s, ...data } : s) }));
        try {
            const res = await axios.put(`${API_URL}/stories/${id}`, data);
            setContent(prev => ({ ...prev, stories: prev.stories.map(s => (s.id || s._id) === id ? normOne(res.data) : s) }));
        } catch (err) {
            if (backup) setContent(prev => ({ ...prev, stories: prev.stories.map(s => (s.id || s._id) === id ? backup : s) }));
            console.error(err); alert("Failed to update story");
        }
    };
    const deleteStory = async (id) => {
        if (!window.confirm("Delete?")) return;
        const backup = content.stories.find(s => (s.id || s._id) === id);
        setContent(prev => ({ ...prev, stories: prev.stories.filter(s => (s.id || s._id) !== id) }));
        try {
            await axios.delete(`${API_URL}/stories/${id}`);
        } catch (err) {
            if (backup) setContent(prev => ({ ...prev, stories: [backup, ...prev.stories] }));
            console.error(err); alert("Failed to delete story");
        }
    };

    // Plans
    const addPlan = async (data) => { try { const res = await axios.post(`${API_URL}/plans`, data); setContent(prev => ({ ...prev, plans: [normOne(res.data), ...(prev.plans || [])] })); } catch (err) { console.error(err); alert("Failed"); } };
    const updatePlan = async (id, data) => { try { const res = await axios.put(`${API_URL}/plans/${id}`, data); setContent(prev => ({ ...prev, plans: prev.plans.map(p => (p.id || p._id) === id ? normOne(res.data) : p) })); } catch (err) { console.error(err); alert("Failed"); } };
    const deletePlan = async (id) => { if (!window.confirm("Delete?")) return; try { await axios.delete(`${API_URL}/plans/${id}`); setContent(prev => ({ ...prev, plans: prev.plans.filter(p => (p.id || p._id) !== id) })); } catch (err) { console.error(err); alert("Failed"); } };

    // Blogs (Optimistic Updates)
    const addBlog = async (data) => {
        const tempId = 'temp-' + Date.now();
        const optimisticItem = { ...data, id: tempId, _id: tempId };
        setContent(prev => ({ ...prev, blogs: [optimisticItem, ...(prev.blogs || [])] }));
        try {
            const res = await axios.post(`${API_URL}/blogs`, data);
            setContent(prev => ({ ...prev, blogs: prev.blogs.map(b => b.id === tempId ? normOne(res.data) : b) }));
        } catch (err) {
            setContent(prev => ({ ...prev, blogs: prev.blogs.filter(b => b.id !== tempId) }));
            console.error(err); alert("Failed to add blog");
        }
    };
    const updateBlog = async (id, data) => {
        const backup = content.blogs.find(b => (b.id || b._id) === id);
        setContent(prev => ({ ...prev, blogs: prev.blogs.map(b => (b.id || b._id) === id ? { ...b, ...data } : b) }));
        try {
            const res = await axios.put(`${API_URL}/blogs/${id}`, data);
            setContent(prev => ({ ...prev, blogs: prev.blogs.map(b => (b.id || b._id) === id ? normOne(res.data) : b) }));
        } catch (err) {
            if (backup) setContent(prev => ({ ...prev, blogs: prev.blogs.map(b => (b.id || b._id) === id ? backup : b) }));
            console.error(err); alert("Failed to update blog");
        }
    };
    const deleteBlog = async (id) => {
        if (!window.confirm("Delete?")) return;
        const backup = content.blogs.find(b => (b.id || b._id) === id);
        setContent(prev => ({ ...prev, blogs: prev.blogs.filter(b => (b.id || b._id) !== id) }));
        try {
            await axios.delete(`${API_URL}/blogs/${id}`);
        } catch (err) {
            if (backup) setContent(prev => ({ ...prev, blogs: [backup, ...prev.blogs] }));
            console.error(err); alert("Failed to delete blog");
        }
    };

    const resetContent = () => { if (window.confirm("Reset View? Backend persists.")) { setContent(defaultContent); } }

    // Manual Save (For "Save" button)
    const manualSave = async () => {
        try {
            // Strip collections, same as auto-save
            const { users, communities, testimonials, stories, plans, blogs, ...siteData } = content;
            await axios.post(`${API_URL}/content`, { data: siteData });
            setHasChanges(false); // Reset dirty flag
            return true;
        } catch (err) {
            console.error("Manual save failed:", err);
            return false;
        }
    };

    // Export Data (For "Save As" button)
    const exportData = () => {
        try {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `shubh_mhurat_backup_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        } catch (err) {
            console.error("Export failed:", err);
            alert("Failed to export data.");
        }
    };

    return (
        <ContentContext.Provider value={{
            content, updateContent, resetContent, isLoading, isFetchingData,
            login, logout, isAuthenticated, userRole,
            fetchAllCollections,
            fetchUsers, fetchCommunities, fetchTestimonials, fetchStories, fetchPlans, fetchBlogs,
            addUser, updateUser, deleteUser,
            addCommunity, updateCommunity, deleteCommunity,
            addTestimonial, updateTestimonial, deleteTestimonial,
            addStory, updateStory, deleteStory,
            addPlan, updatePlan, deletePlan,
            addBlog, updateBlog, deleteBlog,
            manualSave, exportData
        }}>
            {children}
        </ContentContext.Provider>
    );
};
