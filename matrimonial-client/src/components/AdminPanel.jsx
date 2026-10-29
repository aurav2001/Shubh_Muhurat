import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTachometerAlt, FaUsers, FaLayerGroup, FaHeart, FaGem, FaCog, FaChartLine, FaEdit, FaSave, FaImage, FaCheckCircle, FaSearch, FaTrash, FaPlus, FaFilter, FaStar, FaQuoteLeft, FaCalendarAlt, FaCrown, FaList, FaPen, FaDownload, FaCompass, FaArrowRight, FaArrowLeft, FaSync } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import InlineLoader from './InlineLoader';

const AdminPanel = ({ isOpen, onClose }) => {
    const { 
        content, updateContent, resetContent, isLoading, isFetchingData,
        fetchAllCollections, fetchUsers, fetchCommunities, fetchTestimonials, fetchStories, fetchPlans, fetchBlogs,
        addUser, updateUser, deleteUser, 
        addCommunity, updateCommunity, deleteCommunity, 
        addTestimonial, updateTestimonial, deleteTestimonial, 
        addStory, updateStory, deleteStory, 
        addPlan, updatePlan, deletePlan, 
        addBlog, updateBlog, deleteBlog, 
        manualSave, exportData, login, logout, isAuthenticated 
    } = useContent();
    const [activeTab, setActiveTab] = useState('editor');
    const [notification, setNotification] = useState(null);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // User Management State
    const [searchTerm, setSearchTerm] = useState('');
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Community Management State
    const [communityModalOpen, setCommunityModalOpen] = useState(false);
    const [editingCommunity, setEditingCommunity] = useState(null);
    const [communitySubTab, setCommunitySubTab] = useState('list');

    // Testimonial Management State
    const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [testimonialSubTab, setTestimonialSubTab] = useState('list');

    // Story Management State
    const [storyModalOpen, setStoryModalOpen] = useState(false);
    const [editingStory, setEditingStory] = useState(null);
    const [storySubTab, setStorySubTab] = useState('list');

    // Plan Management State
    const [planModalOpen, setPlanModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [membershipSubTab, setMembershipSubTab] = useState('list');

    // Blog Management State
    const [blogModalOpen, setBlogModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [blogSubTab, setBlogSubTab] = useState('list');

    // About Page State
    const [aboutSubTab, setAboutSubTab] = useState('hero');

    const [tempImage, setTempImage] = useState(null); // For modal preview
    const [cardImage, setCardImage] = useState(null); // For community card upload
    const [tempProfiles, setTempProfiles] = useState([]); // For managing community Featured Profiles
    const [editingProfileIndex, setEditingProfileIndex] = useState(null); // Index of profile being edited
    const [profileFormData, setProfileFormData] = useState({ name: '', age: '', height: '', location: '', education: '', profession: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [isOperationLoading, setIsOperationLoading] = useState(false);

    // Fetch all collections when admin panel is opened & authenticated
    useEffect(() => {
        if (isOpen && isAuthenticated) {
            fetchAllCollections?.();
        }
    }, [isOpen, isAuthenticated]);

    // Safety fallback: fetch collection data if active tab is opened and its data array is empty
    useEffect(() => {
        if (!isOpen || !isAuthenticated) return;
        if (activeTab === 'users' && (!content.users || content.users.length === 0)) fetchUsers?.();
        else if (activeTab === 'membership' && (!content.plans || content.plans.length === 0)) fetchPlans?.();
        else if (activeTab === 'blogs' && (!content.blogs || content.blogs.length === 0)) fetchBlogs?.();
        else if (activeTab === 'community' && (!content.communities || content.communities.length === 0)) fetchCommunities?.();
        else if (activeTab === 'testimonials' && (!content.testimonials || content.testimonials.length === 0)) fetchTestimonials?.();
        else if (activeTab === 'stories' && (!content.stories || content.stories.length === 0)) fetchStories?.();
        else if (activeTab === 'dashboard') {
            if (!content.users || content.users.length === 0) fetchUsers?.();
            if (!content.stories || content.stories.length === 0) fetchStories?.();
            if (!content.plans || content.plans.length === 0) fetchPlans?.();
        }
    }, [activeTab, isOpen, isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(loginData.username, loginData.password);
        if (success) {
            setLoginError('');
            fetchAllCollections?.();
        } else {
            setLoginError('Invalid Username or Password');
        }
    };

    const handleManualSave = async () => {
        setIsSaving(true);
        const success = await manualSave();
        if (success) {
            showNotification("All Changes Saved!");
        } else {
            alert("Save failed. Check console.");
        }
        setIsSaving(false);
    };

    // Prevent background scrolling
    useEffect(() => {
        if (isOpen) { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = 'unset'; }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleImageUpload = (page, section, key, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateContent(page, section, key, reader.result);
                showNotification("Image updated successfully!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleModalImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setTempImage(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // --- SAVE HANDLERS ---
    const handleSaveUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            gender: formData.get('gender'),
            plan: formData.get('plan'),
            role: formData.get('role'),
            status: formData.get('status')
        };
        if (editingUser) { updateUser(editingUser.id || editingUser._id, userData); showNotification("User updated"); }
        else { addUser(userData); showNotification("User added"); }
        setUserModalOpen(false); setEditingUser(null);
    };

    const handleSaveCommunity = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const communityData = {
            name: formData.get('name'),
            subtitle: formData.get('subtitle'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(t => t),
            sliderImages: formData.get('sliderImages').split(',').map(img => img.trim()).filter(i => i),
            members: parseInt(formData.get('members') || '0'),
            status: formData.get('status'),
            country: formData.get('country'),
            description: formData.get('description'),
            featuredProfiles: tempProfiles, // Using local state for cards
            image: tempImage || editingCommunity?.image || "https://images.unsplash.com/photo-1511285560982-1351cdeb9821"
        };
        if (editingCommunity) { updateCommunity(editingCommunity.id || editingCommunity._id, communityData); showNotification("Community updated"); }
        else { addCommunity(communityData); showNotification("Community added"); }
        setCommunityModalOpen(false); setEditingCommunity(null); setTempImage(null); setTempProfiles([]);
    };

    const handleSaveTestimonial = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const testimonialData = {
            name: formData.get('name'),
            location: formData.get('location'),
            role: formData.get('location'), // Fallback/Alias
            date: formData.get('date'),
            rating: parseInt(formData.get('rating')),
            content: formData.get('text'), // Map text to content
            image: tempImage || editingTestimonial?.image || "https://placehold.co/150"
        };
        if (editingTestimonial) { updateTestimonial(editingTestimonial.id || editingTestimonial._id, testimonialData); showNotification("Testimonial updated"); }
        else { addTestimonial(testimonialData); showNotification("Testimonial added"); }
        setTestimonialModalOpen(false); setEditingTestimonial(null); setTempImage(null);
    };

    const handleSaveStory = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const storyData = {
            names: formData.get('names'),
            date: formData.get('date'),
            story: formData.get('story'),
            image: tempImage || editingStory?.image || "https://images.unsplash.com/photo-1621621667797-e06afc21085c?q=80&w=1976&auto=format&fit=crop"
        };
        if (editingStory) { updateStory(editingStory.id || editingStory._id, storyData); showNotification("Success Story updated"); }
        else { addStory(storyData); showNotification("Success Story added"); }
        setStoryModalOpen(false); setEditingStory(null); setTempImage(null);
    }

    const handleSavePlan = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const featuresText = formData.get('features');
        const featuresArray = featuresText.split('\n').filter(f => f.trim() !== '');

        const planData = {
            title: formData.get('title'),
            iconName: formData.get('iconName'),
            price: formData.get('price'),
            recommended: formData.get('recommended') === 'on',
            features: featuresArray,
            color: formData.get('color') || "from-gray-400 to-gray-500"
        };

        if (editingPlan) { updatePlan(editingPlan.id || editingPlan._id, planData); showNotification("Plan updated"); }
        else { addPlan(planData); showNotification("Plan added"); }
        setPlanModalOpen(false); setEditingPlan(null);
    }

    const handleSaveBlog = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const blogData = {
            title: formData.get('title'),
            category: formData.get('category'),
            author: formData.get('author'),
            date: formData.get('date'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            image: tempImage || editingBlog?.image || "https://images.unsplash.com/photo-1516055279266-9c4c74d6c6a8?q=80&w=2070&auto=format&fit=crop"
        };
        if (editingBlog) { updateBlog(editingBlog.id || editingBlog._id, blogData); showNotification("Blog Post updated"); }
        else { addBlog(blogData); showNotification("Blog Post published"); }
        setBlogModalOpen(false); setEditingBlog(null); setTempImage(null);
    }

    const menuItems = [
        { id: 'editor', label: 'Site Editor', icon: FaEdit },
        { id: 'navbar', label: 'Site Navigation', icon: FaCompass },
        { id: 'footer', label: 'Footer Manager', icon: FaList },
        { id: 'contact', label: 'Contact Page', icon: FaPen },
        { id: 'about', label: 'About Page', icon: FaUsers },
        { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
        { id: 'users', label: 'User Management', icon: FaUsers },
        { id: 'community', label: 'Communities', icon: FaLayerGroup },
        { id: 'testimonials', label: 'Testimonials', icon: FaQuoteLeft },
        { id: 'stories', label: 'Success Stories', icon: FaHeart },
        { id: 'blogs', label: 'Blogs', icon: FaPen },
        { id: 'membership', label: 'Membership Plans', icon: FaGem },
        { id: 'settings', label: 'Settings', icon: FaCog },
    ];

    // --- RENDER FUNCTIONS ---

    // 1. Render Editor (Global Site Content like Home Page)
    const renderEditor = () => {
        const home = content.home || {};
        const hero = home.hero || {};
        const trust = home.trust || {};

        return (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Home Page Hero</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Badge Text</label><input type="text" value={hero.badge || ''} onChange={(e) => updateContent('home', 'hero', 'badge', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={hero.title || ''} onChange={(e) => updateContent('home', 'hero', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Highlight Word</label><input type="text" value={hero.highlight || ''} onChange={(e) => updateContent('home', 'hero', 'highlight', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><textarea value={hero.subtitle || ''} onChange={(e) => updateContent('home', 'hero', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Background Image</label>
                            <div className="flex items-center gap-4"><img src={hero.bgImage} className="w-20 h-20 object-cover rounded-lg border" /><label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg inline-flex items-center gap-2"><FaImage /> Upload <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('home', 'hero', 'bgImage', e)} /></label></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Trust Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Label (Subtitle)</label><input type="text" value={trust.subtitle || ''} onChange={(e) => updateContent('home', 'trust', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={trust.title || ''} onChange={(e) => updateContent('home', 'trust', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Highlight Word</label><input type="text" value={trust.highlight || ''} onChange={(e) => updateContent('home', 'trust', 'highlight', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase">Card 1 Title</label>
                                <input type="text" value={trust.card1Title || ''} onChange={(e) => updateContent('home', 'trust', 'card1Title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                <label className="block text-xs font-bold text-gray-500 uppercase">Card 1 Desc</label>
                                <textarea value={trust.card1Desc || ''} onChange={(e) => updateContent('home', 'trust', 'card1Desc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase">Card 2 Title</label>
                                <input type="text" value={trust.card2Title || ''} onChange={(e) => updateContent('home', 'trust', 'card2Title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                <label className="block text-xs font-bold text-gray-500 uppercase">Card 2 Desc</label>
                                <textarea value={trust.card2Desc || ''} onChange={(e) => updateContent('home', 'trust', 'card2Desc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase">Card 3 Title</label>
                                <input type="text" value={trust.card3Title || ''} onChange={(e) => updateContent('home', 'trust', 'card3Title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                <label className="block text-xs font-bold text-gray-500 uppercase">Card 3 Desc</label>
                                <textarea value={trust.card3Desc || ''} onChange={(e) => updateContent('home', 'trust', 'card3Desc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderUsers = () => {
        const users = content.users || [];
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
        const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="relative w-full md:w-96"><FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => fetchUsers?.()} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"><FaSync className={isFetchingData ? "animate-spin" : ""} size={12} /> Sync</button>
                        <button onClick={() => { setEditingUser(null); setUserModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md shadow-primary/20"><FaPlus size={14} /> Add User</button>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100"><tr><th className="p-4 text-xs font-bold text-gray-500 uppercase">User Info</th><th className="p-4 text-xs font-bold text-gray-500 uppercase">Role</th><th className="p-4 text-xs font-bold text-gray-500 uppercase">Plan</th><th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th><th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th></tr></thead>
                            <tbody className="divide-y divide-gray-50">
                                {currentUsers.map((user) => (<tr key={user.id || user._id} className="hover:bg-gray-50/50 transition-colors group"><td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">{user.name?.charAt(0) || 'U'}</div><div><p className="font-semibold text-gray-800">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p>{user.phone && <p className="text-xs text-gray-400">{user.phone}</p>}</div></div></td><td className="p-4"><span className={`px-2 py-0.5 rounded text-xs font-bold border ${user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>{user.role || 'user'}</span></td><td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-600 border border-gray-100">{user.plan || 'Free'}</span></td><td className="p-4 text-green-600 font-medium text-sm">{user.status || 'Active'}</td><td className="p-4 text-right"><div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => { setEditingUser(user); setUserModalOpen(true); }} className="p-2 text-blue-600"><FaEdit /></button><button onClick={() => deleteUser(user.id || user._id)} className="p-2 text-red-500"><FaTrash /></button></div></td></tr>))}
                                {currentUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-400">
                                            {isFetchingData ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <FaSync className="animate-spin text-primary" /> Loading users...
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <p>No users found in database.</p>
                                                    <button onClick={() => fetchUsers?.()} className="px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary-dark">Reload Users</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div className="p-4 border-t border-gray-100 flex justify-between">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Prev</button>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Next</button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderCommunities = () => {
        const communities = content.communities || [];

        // Inline function to handle updating generic content for a specific community (since generic updateContent is for 'contents' collection, but communities are documents)
        // actually we use updateCommunity(id, data)
        const handleSaveContent = async (e) => {
            e.preventDefault();
            if (!editingCommunity) return;

            setIsOperationLoading(true);
            try {
                // Build data similar to handleSaveCommunity but preserving other fields
                const communityData = {
                    ...editingCommunity, // Keep existing fields
                    featuredProfiles: tempProfiles, // Update profiles
                    // We could also allow updating title/subtitle here if we add inputs
                };

                await updateCommunity(editingCommunity.id || editingCommunity._id, communityData);
                showNotification("Community Content Updated");
            } catch (error) {
                console.error('Error saving community:', error);
                showNotification("Error saving content");
            } finally {
                setIsOperationLoading(false);
            }
        };

        return (
            <div className="space-y-6 relative">
                {/* Loading Overlay */}
                {isOperationLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
                        <InlineLoader size="lg" text="Saving changes..." />
                    </div>
                )}

                {/* Removed Sub-tab Buttons - Using Card Navigation */}

                {communitySubTab === 'list' ? (
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
                            {/* Decorative Background bloop */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2">BROWSE CATEGORIES</h4>
                                    <h2 className="text-4xl font-extrabold text-gray-900">Select <span className="text-primary">Topic</span></h2>
                                    <p className="text-gray-500 mt-2 max-w-xl">Manage your community pages. Click a topic to edit its featured profiles or add a new one.</p>
                                </div>
                                <button onClick={() => fetchCommunities?.()} className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200"><FaSync className={isFetchingData ? "animate-spin" : ""} size={12} /> Sync Communities</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Add New Card */}
                            <button
                                onClick={() => { setEditingCommunity(null); setTempProfiles([]); setCommunityModalOpen(true); }}
                                className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-4 group min-h-[200px]"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                    <FaPlus />
                                </div>
                                <span className="font-bold text-gray-700 group-hover:text-primary">Create New Community</span>
                            </button>

                            {/* Community Cards */}
                            {communities.map((c) => (
                                <div
                                    key={c.id || c._id}
                                    onClick={() => {
                                        setEditingCommunity(c);
                                        setTempProfiles(c.featuredProfiles || []);
                                        setCommunitySubTab('content');
                                    }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 cursor-pointer transition-all group relative flex flex-col items-center text-center"
                                >
                                    {/* Action Buttons (Absolute) */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setEditingCommunity(c); setTempProfiles(c.featuredProfiles || []); setCommunityModalOpen(true); }}
                                            className="p-2 bg-white rounded-full text-blue-600 shadow-md hover:bg-blue-50"
                                            title="Edit Settings"
                                        >
                                            <FaCog size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteCommunity(c.id || c._id); }}
                                            className="p-2 bg-white rounded-full text-red-500 shadow-md hover:bg-red-50"
                                            title="Delete"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>

                                    {/* Icon/Image */}
                                    <div className="w-16 h-16 rounded-full bg-orange-50 mb-4 overflow-hidden relative">
                                        {c.image ? (
                                            <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-orange-500 text-2xl"><FaUsers /></div>
                                        )}
                                    </div>

                                    <h4 className="font-bold text-xl text-gray-800 mb-1">{c.name}</h4>

                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-500 mb-4">
                                        <FaUsers size={10} />
                                        <span>{c.members} Members</span>
                                    </div>

                                    <span className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                        Manage Profiles <FaArrowRight size={12} />
                                    </span>
                                </div>
                            ))}
                            {communities.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    {isFetchingData ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <FaSync className="animate-spin text-primary text-2xl" />
                                            <p className="text-gray-600 font-medium">Loading communities from server...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p>No communities found in database.</p>
                                            <button onClick={() => fetchCommunities?.()} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark">Reload Communities</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
                        {/* Back Button */}
                        <button
                            onClick={() => setCommunitySubTab('list')}
                            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors"
                        >
                            <FaArrowLeft /> Back to Topic Selection
                        </button>

                        {editingCommunity && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Featured Profiles Editor */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg">Featured Profile Cards</h4>
                                            <p className="text-sm text-gray-500">Manage the cards shown on the {editingCommunity.name} page</p>
                                        </div>
                                    </div>

                                    {/* Existing Profiles Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                        {tempProfiles.map((p, i) => (
                                            <div key={i} className="relative group bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center gap-3">
                                                <img src={p.image} className="w-12 h-12 rounded-full object-cover border" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm truncate">{p.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {p.profession} • {p.age} • <span className="text-gray-700 font-medium">{p.height || 'N/A'}</span>
                                                    </p>
                                                </div>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => {
                                                            setEditingProfileIndex(i);
                                                            setProfileFormData(p);
                                                            setCardImage(p.image);
                                                        }}
                                                        className="p-1.5 bg-white text-blue-600 rounded shadow-sm hover:bg-blue-50"
                                                        title="Edit Card"
                                                    >
                                                        <FaEdit size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => setTempProfiles(tempProfiles.filter((_, idx) => idx !== i))}
                                                        className="p-1.5 bg-white text-red-500 rounded shadow-sm hover:bg-red-50"
                                                        title="Delete Card"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {tempProfiles.length === 0 && <div className="col-span-full py-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed text-sm">No featured profiles added yet.</div>}
                                    </div>

                                    {/* Add New Profile Form */}
                                    <div className={`p-4 rounded-xl border border-gray-200 transition-colors ${editingProfileIndex !== null ? 'bg-blue-50 border-blue-200' : 'bg-gray-50/50'}`}>
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className={`font-bold text-sm uppercase ${editingProfileIndex !== null ? 'text-blue-700' : 'text-gray-700'}`}>
                                                {editingProfileIndex !== null ? 'Editing Card' : 'Add New Card'}
                                            </h5>
                                            {editingProfileIndex !== null && (
                                                <button
                                                    onClick={() => {
                                                        setEditingProfileIndex(null);
                                                        setProfileFormData({ name: '', age: '', height: '', location: '', education: '', profession: '' });
                                                        setCardImage(null);
                                                    }}
                                                    className="text-xs text-gray-500 hover:text-red-500 underline"
                                                >
                                                    Cancel Edit
                                                </button>
                                            )}
                                        </div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            const newProfile = {
                                                ...profileFormData,
                                                image: cardImage || (editingProfileIndex !== null ? tempProfiles[editingProfileIndex].image : "https://placehold.co/150")
                                            };

                                            if (editingProfileIndex !== null) {
                                                // Update existing
                                                const updated = [...tempProfiles];
                                                updated[editingProfileIndex] = newProfile;
                                                setTempProfiles(updated);
                                                setEditingProfileIndex(null);
                                            } else {
                                                // Add new
                                                setTempProfiles([...tempProfiles, newProfile]);
                                            }

                                            setProfileFormData({ name: '', age: '', height: '', location: '', education: '', profession: '' });
                                            setCardImage(null);
                                        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                                            <input
                                                required
                                                placeholder="Name"
                                                value={profileFormData.name}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                                                className="px-3 py-2 border rounded-lg text-sm bg-white"
                                            />
                                            <input
                                                required
                                                placeholder="Age"
                                                value={profileFormData.age}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, age: e.target.value })}
                                                className="px-3 py-2 border rounded-lg text-sm bg-white"
                                            />
                                            <input
                                                required
                                                placeholder="Height (e.g. 5'8&quot;)"
                                                value={profileFormData.height}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, height: e.target.value })}
                                                className="px-3 py-2 border rounded-lg text-sm bg-white"
                                            />
                                            <input
                                                required
                                                placeholder="Location"
                                                value={profileFormData.location}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, location: e.target.value })}
                                                className="px-3 py-2 border rounded-lg text-sm bg-white"
                                            />
                                            <input
                                                required
                                                placeholder="Education"
                                                value={profileFormData.education}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, education: e.target.value })}
                                                className="px-3 py-2 border rounded-lg text-sm bg-white"
                                            />
                                            <input
                                                required
                                                placeholder="Profession"
                                                value={profileFormData.profession}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, profession: e.target.value })}
                                                className="px-3 py-2 border rounded-lg text-sm bg-white"
                                            />

                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    id="card-image-upload"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => setCardImage(reader.result);
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor="card-image-upload"
                                                    className={`w-full px-3 py-2 border rounded-lg text-sm cursor-pointer flex items-center justify-center gap-2 transition-all ${cardImage ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-500'}`}
                                                >
                                                    {cardImage ? (
                                                        <><FaCheckCircle /> Image Selected</>
                                                    ) : (
                                                        <><FaImage /> Upload Image</>
                                                    )}
                                                </label>
                                                {cardImage && (
                                                    <div className="absolute top-full left-0 mt-2 z-20 bg-white p-1 rounded shadow-lg border">
                                                        <img src={cardImage} alt="Preview" className="w-20 h-20 object-cover rounded" />
                                                    </div>
                                                )}
                                            </div>

                                            <button type="submit" className="col-span-full mt-2 w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">+ Add Card to List</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="border-t pt-6 flex justify-end">
                                    <button
                                        onClick={handleSaveContent}
                                        disabled={isOperationLoading}
                                        className={`px-6 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transform hover:-translate-y-1 transition-all flex items-center gap-2 ${isOperationLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isOperationLoading ? (
                                            <><InlineLoader size="sm" text="" /> Saving...</>
                                        ) : (
                                            <><FaSave /> Save {editingCommunity.name} Content</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                        {!editingCommunity && <div className="text-center py-20 text-gray-400">Please select a community from the dropdown above to edit its content.</div>}
                    </div>
                )}
            </div>
        );
    };

    const renderTestimonials = () => {
        const testimonials = content.testimonials || [];
        const sectionContent = content.home?.testimonials || {};

        return (
            <div className="space-y-6">
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex gap-2">
                    <button onClick={() => setTestimonialSubTab('list')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${testimonialSubTab === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaList /> Manage Reviews ({testimonials.length})</button>
                    <button onClick={() => setTestimonialSubTab('content')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${testimonialSubTab === 'content' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaPen /> Edit Section Headers</button>
                </div>

                {testimonialSubTab === 'list' ? (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Manage Testimonials</h3>
                                <p className="text-xs text-gray-500">{testimonials.length} review(s) available</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => fetchTestimonials?.()} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"><FaSync className={isFetchingData ? "animate-spin" : ""} size={12} /> Sync</button>
                                <button onClick={() => { setEditingTestimonial(null); setTempImage(null); setTestimonialModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md shadow-primary/20"><FaPlus size={14} /> Add Testimonial</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.map((t) => (
                                <div key={t.id || t._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                                    <div className="h-48 overflow-hidden relative"><img src={t.image} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"><button onClick={() => { setEditingTestimonial(t); setTempImage(t.image); setTestimonialModalOpen(true); }} className="p-2 bg-white rounded-full text-blue-600"><FaEdit /></button><button onClick={() => deleteTestimonial(t.id || t._id)} className="p-2 bg-white rounded-full text-red-500"><FaTrash /></button></div></div>
                                    <div className="p-5 flex-1 flex flex-col"><h4 className="font-bold text-lg text-gray-800">{t.name}</h4><p className="text-xs text-gray-500 mb-3">{t.location} • {t.date}</p><p className="text-gray-600 text-sm line-clamp-3 italic">"{t.text || t.content}"</p></div>
                                </div>
                            ))}
                            {testimonials.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    {isFetchingData ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <FaSync className="animate-spin text-primary text-2xl" />
                                            <p className="text-gray-600 font-medium">Loading testimonials from server...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p>No testimonials found in database.</p>
                                            <button onClick={() => fetchTestimonials?.()} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark">Reload Testimonials</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Section Headers</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Label (Small Top Text)</label><input type="text" value={sectionContent.label || ''} onChange={(e) => updateContent('home', 'testimonials', 'label', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Main Title</label><input type="text" value={sectionContent.title || ''} onChange={(e) => updateContent('home', 'testimonials', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Highlight Word (Gradient)</label><input type="text" value={sectionContent.highlight || ''} onChange={(e) => updateContent('home', 'testimonials', 'highlight', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const renderPlans = () => {
        const plans = content.plans || [];
        const pageContent = content.membership || {};
        const faqs = pageContent.faqs || [];

        return (
            <div className="space-y-6">
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex gap-2">
                    <button onClick={() => setMembershipSubTab('list')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${membershipSubTab === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaList /> Manage Plans ({plans.length})</button>
                    <button onClick={() => setMembershipSubTab('content')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${membershipSubTab === 'content' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaPen /> Edit Page Content</button>
                </div>

                {membershipSubTab === 'list' ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Manage Membership Plans</h3>
                                <p className="text-xs text-gray-500">{plans.length} plan(s) available</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => fetchPlans?.()} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"><FaSync className={isFetchingData ? "animate-spin" : ""} size={12} /> Sync</button>
                                {plans.length < 3 && <button onClick={() => { setEditingPlan(null); setPlanModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md shadow-primary/20"><FaPlus size={14} /> Add Plan</button>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {plans.map((p) => (
                                <div key={p.id || p._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative group">
                                    <div className={`h-2 w-full bg-gradient-to-r ${p.color || 'from-gray-400 to-gray-500'}`}></div>
                                    {p.recommended && <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">Recommended</div>}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h4 className="font-bold text-xl text-gray-800 mb-2">{p.title}</h4>
                                        <p className="text-2xl font-bold text-primary mb-1">₹{p.price}</p>
                                        <div className="flex-1 space-y-2 mb-6">
                                            {Array.isArray(p.features) && p.features.slice(0, 3).map((f, i) => (<p key={i} className="text-sm text-gray-600 flex gap-2"><FaCheckCircle className="text-green-500 mt-0.5 shrink-0" /> {f}</p>))}
                                            {Array.isArray(p.features) && p.features.length > 3 && <p className="text-xs text-gray-400 italic">+ {p.features.length - 3} more features</p>}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingPlan(p); setPlanModalOpen(true); }} className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">Edit</button>
                                            <button onClick={() => deletePlan(p.id || p._id)} className="flex-1 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 font-medium">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {plans.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    {isFetchingData ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <FaSync className="animate-spin text-primary text-2xl" />
                                            <p className="text-gray-600 font-medium">Loading plans from server...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p>No membership plans found in database.</p>
                                            <button onClick={() => fetchPlans?.()} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark">Reload Plans</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <AnimatePresence>
                            {planModalOpen && (
                                <div className="fixed inset-0 z-[10000] flex items-center justify-center">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlanModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden m-4 max-h-[90vh] overflow-y-auto">
                                        <form onSubmit={handleSavePlan} className="p-8">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingPlan ? 'Edit Plan' : 'Add Plan'}</h3>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Plan Title</label><input required name="title" defaultValue={editingPlan?.title} placeholder="e.g. Gold" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
                                                    <select name="iconName" defaultValue={editingPlan?.iconName || 'FaStar'} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                                                        <option value="FaStar">Star (Gold)</option>
                                                        <option value="FaGem">Gem (Diamond)</option>
                                                        <option value="FaCrown">Crown (Platinum)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 mb-4">
                                                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label><input required name="price" defaultValue={editingPlan?.price || editingPlan?.priceMonthly} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Features (One per line)</label>
                                                <textarea required name="features" defaultValue={editingPlan?.features?.join('\n')} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none" placeholder="Unlimited Messages&#10;View 50 Contacts&#10;..." />
                                            </div>
                                            <div className="mb-6">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Theme Color</label>
                                                <div className="grid grid-cols-5 gap-2">
                                                    {[{ label: "Yellow/Orange", value: "from-yellow-400 to-orange-500" }, { label: "Blue/Cyan", value: "from-blue-400 to-cyan-500" }, { label: "Purple/Pink", value: "from-purple-500 to-pink-500" }, { label: "Green/Teal", value: "from-green-400 to-teal-500" }, { label: "Red/Rose", value: "from-red-400 to-rose-500" }].map(g => (
                                                        <label key={g.value} className="cursor-pointer">
                                                            <input type="radio" name="color" value={g.value} defaultChecked={editingPlan?.color === g.value} className="peer hidden" />
                                                            <div className={`h-8 w-full rounded bg-gradient-to-r ${g.value} ring-2 ring-transparent peer-checked:ring-offset-2 peer-checked:ring-gray-900 hover:opacity-80`}></div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <input type="checkbox" name="recommended" id="rec" defaultChecked={editingPlan?.recommended} className="w-5 h-5 accent-primary" />
                                                <label htmlFor="rec" className="text-gray-700 font-medium cursor-pointer">Mark as Recommended</label>
                                            </div>
                                            <div className="flex items-center justify-end gap-3">
                                                <button type="button" onClick={() => setPlanModalOpen(false)} className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                                                <button type="submit" className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark shadow-md hover:shadow-lg transition-all">{editingPlan ? 'Save Changes' : 'Create Plan'}</button>
                                            </div>
                                        </form>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Page Header</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={pageContent.header?.title || ''} onChange={(e) => updateContent('membership', 'header', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Highlight Word</label><input type="text" value={pageContent.header?.highlight || ''} onChange={(e) => updateContent('membership', 'header', 'highlight', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><textarea value={pageContent.header?.subtitle || ''} onChange={(e) => updateContent('membership', 'header', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6 border-b pb-2">
                                <h3 className="text-lg font-bold text-gray-800">FAQs</h3>
                                <button onClick={() => updateContent('membership', 'faqs', null, [...faqs, { q: 'New Question', a: 'Answer here...' }])} className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-bold transition-colors flex items-center gap-1"><FaPlus size={10} /> Add Q&A</button>
                            </div>

                            <div className="space-y-4">
                                {faqs.map((f, i) => (
                                    <div key={i} className="group relative border border-gray-200 p-4 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                                        <button onClick={() => updateContent('membership', 'faqs', null, faqs.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash size={14} /></button>
                                        <div className="mb-3">
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Question</label>
                                            <input
                                                className="w-full font-semibold text-gray-800 bg-transparent border-b border-transparent focus:border-primary focus:bg-white outline-none transition-all px-1 py-0.5"
                                                value={f.q}
                                                onChange={(e) => {
                                                    const newFaqs = [...faqs];
                                                    newFaqs[i] = { ...newFaqs[i], q: e.target.value };
                                                    updateContent('membership', 'faqs', null, newFaqs);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Answer</label>
                                            <textarea
                                                className="w-full text-sm text-gray-600 bg-transparent border border-transparent focus:border-primary focus:bg-white rounded-lg p-2 outline-none resize-none h-20 transition-all"
                                                value={f.a}
                                                onChange={(e) => {
                                                    const newFaqs = [...faqs];
                                                    newFaqs[i] = { ...newFaqs[i], a: e.target.value };
                                                    updateContent('membership', 'faqs', null, newFaqs);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {faqs.length === 0 && <div className="text-center text-gray-400 text-sm py-4">No FAQs added yet.</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const renderStories = () => {
        const stories = content.stories || [];
        const pageContent = content.successStories || {};
        const faqs = pageContent.faqs || [];

        return (
            <div className="space-y-6">
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex gap-2">
                    <button onClick={() => setStorySubTab('list')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${storySubTab === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaList /> Manage Stories ({stories.length})</button>
                    <button onClick={() => setStorySubTab('content')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${storySubTab === 'content' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaPen /> Edit Page Content</button>
                </div>

                {storySubTab === 'list' ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Manage Success Stories</h3>
                                <p className="text-xs text-gray-500">{stories.length} story/stories available</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => fetchStories?.()} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"><FaSync className={isFetchingData ? "animate-spin" : ""} size={12} /> Sync</button>
                                <button onClick={() => { setEditingStory(null); setTempImage(null); setStoryModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md shadow-primary/20"><FaPlus size={14} /> Add Story</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stories.map((s) => (
                                <div key={s.id || s._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                                    <div className="h-56 overflow-hidden relative">
                                        <img src={s.image} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button onClick={() => { setEditingStory(s); setTempImage(s.image); setStoryModalOpen(true); }} className="p-2 bg-white rounded-full text-blue-600 hover:text-blue-700 transition-colors shadow-lg"><FaEdit /></button>
                                            <button onClick={() => deleteStory(s.id || s._id)} className="p-2 bg-white rounded-full text-red-500 hover:text-red-600 transition-colors shadow-lg"><FaTrash /></button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                                            <h4 className="font-bold text-lg">{s.names}</h4>
                                            <p className="text-xs opacity-90">{s.date}</p>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1">
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 italic border-l-4 border-primary/30 pl-4 py-1">"{s.story}"</p>
                                    </div>
                                </div>
                            ))}
                            {stories.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    {isFetchingData ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <FaSync className="animate-spin text-primary text-2xl" />
                                            <p className="text-gray-600 font-medium">Loading stories from server...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p>No success stories found in database.</p>
                                            <button onClick={() => fetchStories?.()} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark">Reload Stories</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Hero Section</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={pageContent.hero?.title || ''} onChange={(e) => updateContent('successStories', 'hero', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><textarea value={pageContent.hero?.subtitle || ''} onChange={(e) => updateContent('successStories', 'hero', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Background Image</label>
                                    <div className="flex items-center gap-4"><img src={pageContent.hero?.bgImage} className="w-20 h-20 object-cover rounded-lg border" /><label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg inline-flex items-center gap-2"><FaImage /> Upload <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('successStories', 'hero', 'bgImage', e)} /></label></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Statistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {['1', '2', '3'].map(num => (
                                    <React.Fragment key={num}>
                                        <div><label className="block text-xs font-bold text-gray-500 uppercase">Stat {num} Number</label><input type="text" value={pageContent.stats?.[`stat${num}Num`] || ''} onChange={(e) => updateContent('successStories', 'stats', `stat${num}Num`, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                        <div><label className="block text-xs font-bold text-gray-500 uppercase">Stat {num} Label</label><input type="text" value={pageContent.stats?.[`stat${num}Label`] || ''} onChange={(e) => updateContent('successStories', 'stats', `stat${num}Label`, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">CTA Section</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={pageContent.cta?.title || ''} onChange={(e) => updateContent('successStories', 'cta', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><input type="text" value={pageContent.cta?.subtitle || ''} onChange={(e) => updateContent('successStories', 'cta', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Button Text</label><input type="text" value={pageContent.cta?.buttonText || ''} onChange={(e) => updateContent('successStories', 'cta', 'buttonText', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6 border-b pb-2">
                                <h3 className="text-lg font-bold text-gray-800">FAQs</h3>
                                <button onClick={() => updateContent('successStories', 'faqs', null, [...faqs, { q: 'New Question', a: 'Answer here...' }])} className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-bold transition-colors flex items-center gap-1"><FaPlus size={10} /> Add Q&A</button>
                            </div>

                            <div className="space-y-4">
                                {faqs.map((f, i) => (
                                    <div key={i} className="group relative border border-gray-200 p-4 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                                        <button onClick={() => updateContent('successStories', 'faqs', null, faqs.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash size={14} /></button>
                                        <div className="mb-3">
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Question</label>
                                            <input
                                                className="w-full font-semibold text-gray-800 bg-transparent border-b border-transparent focus:border-primary focus:bg-white outline-none transition-all px-1 py-0.5"
                                                value={f.q}
                                                onChange={(e) => {
                                                    const newFaqs = [...faqs];
                                                    newFaqs[i] = { ...newFaqs[i], q: e.target.value };
                                                    updateContent('successStories', 'faqs', null, newFaqs);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Answer</label>
                                            <textarea
                                                className="w-full text-sm text-gray-600 bg-transparent border border-transparent focus:border-primary focus:bg-white rounded-lg p-2 outline-none resize-none h-20 transition-all"
                                                value={f.a}
                                                onChange={(e) => {
                                                    const newFaqs = [...faqs];
                                                    newFaqs[i] = { ...newFaqs[i], a: e.target.value };
                                                    updateContent('successStories', 'faqs', null, newFaqs);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {faqs.length === 0 && <div className="text-center text-gray-400 text-sm py-4">No FAQs added yet.</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const renderBlogs = () => {
        const blogs = content.blogs || [];
        const pageContent = content.blogsPage || {};

        return (
            <div className="space-y-6">
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex gap-2">
                    <button onClick={() => setBlogSubTab('list')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${blogSubTab === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaList /> Manage Posts ({blogs.length})</button>
                    <button onClick={() => setBlogSubTab('content')} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${blogSubTab === 'content' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}><FaEdit /> Edit Page Header</button>
                </div>

                {blogSubTab === 'list' ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Manage Blog Posts</h3>
                                <p className="text-xs text-gray-500">{blogs.length} post(s) found</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => fetchBlogs?.()} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"><FaSync className={isFetchingData ? "animate-spin" : ""} size={12} /> Sync</button>
                                <button onClick={() => { setEditingBlog(null); setTempImage(null); setBlogModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md shadow-primary/20"><FaPlus size={14} /> Write New Post</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((b) => (
                                <div key={b.id || b._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={b.image} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button onClick={() => { setEditingBlog(b); setTempImage(b.image); setBlogModalOpen(true); }} className="p-2 bg-white rounded-full text-blue-600 hover:text-blue-700 transition-colors shadow-lg"><FaEdit /></button>
                                            <button onClick={() => deleteBlog(b.id || b._id)} className="p-2 bg-white rounded-full text-red-500 hover:text-red-600 transition-colors shadow-lg"><FaTrash /></button>
                                        </div>
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">{b.category}</div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h4 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{b.title}</h4>
                                        <p className="text-gray-500 text-xs mb-3 flex justify-between"><span>{b.author}</span> <span>{b.date}</span></p>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-2 flex-1">{b.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                            {blogs.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    {isFetchingData ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <FaSync className="animate-spin text-primary text-2xl" />
                                            <p className="text-gray-600 font-medium">Fetching blog posts from server...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p>No blog posts found in database.</p>
                                            <button onClick={() => fetchBlogs?.()} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark">Reload Blogs</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Hero Section</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={pageContent.hero?.title || ''} onChange={(e) => updateContent('blogsPage', 'hero', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><textarea value={pageContent.hero?.subtitle || ''} onChange={(e) => updateContent('blogsPage', 'hero', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Background Image</label>
                                <div className="flex items-center gap-4"><img src={pageContent.hero?.bgImage} className="w-20 h-20 object-cover rounded-lg border" /><label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg inline-flex items-center gap-2"><FaImage /> Upload <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('blogsPage', 'hero', 'bgImage', e)} /></label></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const renderNavbar = () => {
        const navbar = content.navbar || {};
        const links = navbar.links || [];

        return (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Branding & CTA</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Logo Text</label>
                            <input
                                type="text"
                                value={navbar.logoText || ''}
                                onChange={(e) => updateContent('navbar', null, 'logoText', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">CTA Button Text</label>
                                <input
                                    type="text"
                                    value={navbar.ctaText || ''}
                                    onChange={(e) => updateContent('navbar', null, 'ctaText', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">CTA Button Link</label>
                                <input
                                    type="text"
                                    value={navbar.ctaLink || ''}
                                    onChange={(e) => updateContent('navbar', null, 'ctaLink', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">Menu Links</h3>
                        <button
                            onClick={() => updateContent('navbar', null, 'links', [...links, { name: 'New Link', path: '/' }])}
                            className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-bold transition-colors flex items-center gap-1"
                        >
                            <FaPlus size={10} /> Add Link
                        </button>
                    </div>
                    <div className="space-y-3">
                        {links.map((link, index) => (
                            <div key={index} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100 group">
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Link Name"
                                        value={link.name}
                                        onChange={(e) => {
                                            const newLinks = [...links];
                                            newLinks[index] = { ...link, name: e.target.value };
                                            updateContent('navbar', null, 'links', newLinks);
                                        }}
                                        className="px-3 py-1.5 border border-gray-200 rounded text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Path (e.g. /about)"
                                        value={link.path}
                                        onChange={(e) => {
                                            const newLinks = [...links];
                                            newLinks[index] = { ...link, path: e.target.value };
                                            updateContent('navbar', null, 'links', newLinks);
                                        }}
                                        className="px-3 py-1.5 border border-gray-200 rounded text-sm font-mono text-gray-600"
                                    />
                                </div>
                                <button
                                    onClick={() => updateContent('navbar', null, 'links', links.filter((_, i) => i !== index))}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        ))}
                        {links.length === 0 && <div className="text-center text-gray-400 text-sm py-4">No menu links.</div>}
                    </div>
                </div>
            </div>
        );
    };

    const renderFooter = () => {
        const footer = content.footer || {};
        const companyLinks = footer.companyLinks || [];
        const supportLinks = footer.supportLinks || [];
        const legalLinks = footer.legalLinks || [];

        const renderLinkList = (title, items, listKey) => (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <button onClick={() => updateContent('footer', null, listKey, [...items, { name: 'New Link', path: '/' }])} className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-bold flex items-center gap-1 transition-colors"><FaPlus size={10} /> Add</button>
                </div>
                <div className="space-y-3">
                    {items.map((link, i) => (
                        <div key={i} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-100 group">
                            <input type="text" value={link.name} onChange={(e) => {
                                const newLinks = [...items]; newLinks[i] = { ...link, name: e.target.value };
                                updateContent('footer', null, listKey, newLinks);
                            }} className="flex-1 min-w-0 px-2 py-1.5 border border-gray-200 rounded text-xs bg-white focus:outline-none focus:border-primary" placeholder="Name" />
                            <input type="text" value={link.path} onChange={(e) => {
                                const newLinks = [...items]; newLinks[i] = { ...link, path: e.target.value };
                                updateContent('footer', null, listKey, newLinks);
                            }} className="flex-1 min-w-0 px-2 py-1.5 border border-gray-200 rounded text-xs font-mono text-gray-600 bg-white focus:outline-none focus:border-primary" placeholder="Path" />
                            <button onClick={() => updateContent('footer', null, listKey, items.filter((_, idx) => idx !== i))} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-full transition-all shrink-0"><FaTrash size={12} /></button>
                        </div>
                    ))}
                    {items.length === 0 && <div className="text-center text-gray-400 text-xs py-2">No links.</div>}
                </div>
            </div>
        );

        return (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">General Info</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Footer Description</label><textarea value={footer.description || ''} onChange={(e) => updateContent('footer', null, 'description', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Copyright Text</label><input type="text" value={footer.copyrightText || ''} onChange={(e) => updateContent('footer', null, 'copyrightText', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Facebook</label><input type="text" value={content.socialLinks?.facebook || ''} onChange={(e) => updateContent('socialLinks', null, 'facebook', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Instagram</label><input type="text" value={content.socialLinks?.instagram || ''} onChange={(e) => updateContent('socialLinks', null, 'instagram', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Twitter (X)</label><input type="text" value={content.socialLinks?.twitter || ''} onChange={(e) => updateContent('socialLinks', null, 'twitter', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">LinkedIn</label><input type="text" value={content.socialLinks?.linkedin || ''} onChange={(e) => updateContent('socialLinks', null, 'linkedin', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderLinkList("Company Links", companyLinks, 'companyLinks')}
                    {renderLinkList("Support Links", supportLinks, 'supportLinks')}
                    {renderLinkList("Legal Links", legalLinks, 'legalLinks')}
                </div>
            </div>
        );
    };

    const renderContact = () => {
        const contactPage = content.contactPage || {};
        const topSection = contactPage.topSection || {};
        const hero = contactPage.hero || {};
        const formSection = contactPage.formSection || {};
        const info = contactPage.info || {};

        return (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Page Header (Top)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Brand Title Part 1 (e.g. Shubh)</label><input type="text" value={topSection.titlePart1 || ''} onChange={(e) => updateContent('contactPage', 'topSection', 'titlePart1', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Brand Title Part 2 (Gradient)</label><input type="text" value={topSection.titlePart2 || ''} onChange={(e) => updateContent('contactPage', 'topSection', 'titlePart2', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div className="col-span-1 md:col-span-2"><label className="block text-sm font-semibold text-gray-600 mb-2">Tagline</label><input type="text" value={topSection.tagline || ''} onChange={(e) => updateContent('contactPage', 'topSection', 'tagline', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Promo Section (Left)</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Main Title (e.g. Let's start a)</label><input type="text" value={hero.title || ''} onChange={(e) => updateContent('contactPage', 'hero', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Highlight Word (Gradient)</label><input type="text" value={hero.highlight || ''} onChange={(e) => updateContent('contactPage', 'hero', 'highlight', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><textarea value={hero.subtitle || ''} onChange={(e) => updateContent('contactPage', 'hero', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Form Header (Right)</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title Part 1 (e.g. Send a)</label><input type="text" value={formSection.titlePart1 || ''} onChange={(e) => updateContent('contactPage', 'formSection', 'titlePart1', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title Part 2 (Gradient)</label><input type="text" value={formSection.titlePart2 || ''} onChange={(e) => updateContent('contactPage', 'formSection', 'titlePart2', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        </div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><input type="text" value={formSection.subtitle || ''} onChange={(e) => updateContent('contactPage', 'formSection', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Phone 1</label><input type="text" value={info.phone1 || ''} onChange={(e) => updateContent('contactPage', 'info', 'phone1', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Phone 2</label><input type="text" value={info.phone2 || ''} onChange={(e) => updateContent('contactPage', 'info', 'phone2', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Email 1</label><input type="text" value={info.email1 || ''} onChange={(e) => updateContent('contactPage', 'info', 'email1', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">Email 2</label><input type="text" value={info.email2 || ''} onChange={(e) => updateContent('contactPage', 'info', 'email2', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        <div className="col-span-1 md:col-span-2"><label className="block text-sm font-semibold text-gray-600 mb-2">Address</label><textarea value={info.address || ''} onChange={(e) => updateContent('contactPage', 'info', 'address', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 resize-none" /></div>
                        <div className="col-span-1 md:col-span-2"><label className="block text-sm font-semibold text-gray-600 mb-2">Google Maps Link</label><input type="text" value={info.mapLink || ''} onChange={(e) => updateContent('contactPage', 'info', 'mapLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    </div>
                </div>
            </div>
        );
    };

    const renderAbout = () => {
        const aboutPage = content.aboutPage || {};
        const hero = aboutPage.hero || {};
        const stats = aboutPage.stats || [];
        const story = aboutPage.story || {};
        const vision = aboutPage.vision || {};
        const milestones = aboutPage.milestones || {};
        const values = aboutPage.values || {};
        const faqs = aboutPage.faqs || [];
        const faqSection = aboutPage.faqSection || {};


        return (
            <div className="space-y-6">
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-2">
                    {[
                        { id: 'hero', label: 'Hero Section' },
                        { id: 'description', label: 'Description' },
                        { id: 'stats', label: 'Stats Banner' },
                        { id: 'story', label: 'Our Story' },
                        { id: 'vision', label: 'Vision/Video' },
                        { id: 'milestones', label: 'Milestones' },
                        { id: 'values', label: 'Core Values' },
                        { id: 'faqs', label: 'FAQs' }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setAboutSubTab(tab.id)} className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${aboutSubTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>{tab.label}</button>
                    ))}
                </div>

                {/* Hero Section */}
                {aboutSubTab === 'hero' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Hero Section</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Badge Text (e.g. EST. 2010)</label><input type="text" value={hero.badge || ''} onChange={(e) => updateContent('aboutPage', 'hero', 'badge', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={hero.title || ''} onChange={(e) => updateContent('aboutPage', 'hero', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Highlight Word (Gradient)</label><input type="text" value={hero.highlight || ''} onChange={(e) => updateContent('aboutPage', 'hero', 'highlight', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtitle</label><textarea value={hero.subtitle || ''} onChange={(e) => updateContent('aboutPage', 'hero', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Hero Image</label>
                                <div className="flex items-center gap-4"><img src={hero.image} className="w-32 h-24 object-cover rounded-lg border" /><label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg inline-flex items-center gap-2"><FaImage /> Upload <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('aboutPage', 'hero', 'image', e)} /></label></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Description Section */}
                {aboutSubTab === 'description' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">About Page Description</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Title</label><input type="text" value={aboutPage.description?.title || ''} onChange={(e) => updateContent('aboutPage', 'description', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Description Text</label><textarea value={aboutPage.description?.text || ''} onChange={(e) => updateContent('aboutPage', 'description', 'text', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-64 resize-none" placeholder="Enter detailed description here..." /></div>
                        </div>
                    </div>
                )}

                {/* Stats Banner */}
                {aboutSubTab === 'stats' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Stats Banner (4 Cards)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <h4 className="font-bold text-gray-700 mb-3">Stat {i + 1}</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Value</label><input type="number" value={stat.value || ''} onChange={(e) => { const newStats = [...stats]; newStats[i] = { ...newStats[i], value: parseInt(e.target.value) || 0 }; updateContent('aboutPage', 'stats', null, newStats); }} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Suffix</label><input type="text" value={stat.suffix || ''} onChange={(e) => { const newStats = [...stats]; newStats[i] = { ...newStats[i], suffix: e.target.value }; updateContent('aboutPage', 'stats', null, newStats); }} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="M+, +, etc" /></div>
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Label</label><input type="text" value={stat.label || ''} onChange={(e) => { const newStats = [...stats]; newStats[i] = { ...newStats[i], label: e.target.value }; updateContent('aboutPage', 'stats', null, newStats); }} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Our Story */}
                {aboutSubTab === 'story' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Our Story Section</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Label</label><input type="text" value={story.label || ''} onChange={(e) => updateContent('aboutPage', 'story', 'label', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title Line 1</label><input type="text" value={story.title || ''} onChange={(e) => updateContent('aboutPage', 'story', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title Line 2</label><input type="text" value={story.titleLine2 || ''} onChange={(e) => updateContent('aboutPage', 'story', 'titleLine2', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            </div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Paragraph 1</label><textarea value={story.paragraph1 || ''} onChange={(e) => updateContent('aboutPage', 'story', 'paragraph1', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Paragraph 2</label><textarea value={story.paragraph2 || ''} onChange={(e) => updateContent('aboutPage', 'story', 'paragraph2', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Button Text</label><input type="text" value={story.buttonText || ''} onChange={(e) => updateContent('aboutPage', 'story', 'buttonText', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Image</label>
                                <div className="flex items-center gap-4"><img src={story.image} className="w-32 h-24 object-cover rounded-lg border" /><label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg inline-flex items-center gap-2"><FaImage /> Upload <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('aboutPage', 'story', 'image', e)} /></label></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Vision/Video */}
                {aboutSubTab === 'vision' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Vision / Video Section</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Title</label><input type="text" value={vision.title || ''} onChange={(e) => updateContent('aboutPage', 'vision', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-semibold text-gray-600 mb-2">Highlight Word</label><input type="text" value={vision.highlight || ''} onChange={(e) => updateContent('aboutPage', 'vision', 'highlight', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            </div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Quote</label><textarea value={vision.quote || ''} onChange={(e) => updateContent('aboutPage', 'vision', 'quote', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 resize-none" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Subtext</label><input type="text" value={vision.subtext || ''} onChange={(e) => updateContent('aboutPage', 'vision', 'subtext', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Video URL (YouTube Embed or Direct .mp4 link)</label><input type="text" value={vision.videoUrl || ''} onChange={(e) => updateContent('aboutPage', 'vision', 'videoUrl', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="https://www.youtube.com/embed/VIDEO_ID or https://your-server.com/video.mp4" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Background Image URL</label><input type="text" value={vision.bgImage || ''} onChange={(e) => updateContent('aboutPage', 'vision', 'bgImage', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        </div>
                    </div>
                )}

                {/* Milestones */}
                {aboutSubTab === 'milestones' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Milestones Timeline</h3>
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Title</label><input type="text" value={milestones.title || ''} onChange={(e) => updateContent('aboutPage', 'milestones', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Subtitle</label><input type="text" value={milestones.subtitle || ''} onChange={(e) => updateContent('aboutPage', 'milestones', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        </div>
                        <h4 className="font-bold text-gray-700 mb-4">Timeline Items</h4>
                        <div className="space-y-4">
                            {(milestones.items || []).map((item, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Year</label><input type="text" value={item.year || ''} onChange={(e) => { const newItems = [...(milestones.items || [])]; newItems[i] = { ...newItems[i], year: e.target.value }; updateContent('aboutPage', 'milestones', 'items', newItems); }} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Title</label><input type="text" value={item.title || ''} onChange={(e) => { const newItems = [...(milestones.items || [])]; newItems[i] = { ...newItems[i], title: e.target.value }; updateContent('aboutPage', 'milestones', 'items', newItems); }} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                        <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 mb-1">Description</label><input type="text" value={item.description || ''} onChange={(e) => { const newItems = [...(milestones.items || [])]; newItems[i] = { ...newItems[i], description: e.target.value }; updateContent('aboutPage', 'milestones', 'items', newItems); }} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Core Values */}
                {aboutSubTab === 'values' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Core Values Section</h3>
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Title</label><input type="text" value={values.title || ''} onChange={(e) => updateContent('aboutPage', 'values', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Subtitle</label><textarea value={values.subtitle || ''} onChange={(e) => updateContent('aboutPage', 'values', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 resize-none" /></div>
                        </div>
                        <h4 className="font-bold text-gray-700 mb-4">Value Cards (3)</h4>
                        <div className="space-y-4">
                            {(values.items || []).map((item, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <div className="grid grid-cols-1 gap-3">
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Card {i + 1} Title</label><input type="text" value={item.title || ''} onChange={(e) => { const newItems = [...(values.items || [])]; newItems[i] = { ...newItems[i], title: e.target.value }; updateContent('aboutPage', 'values', 'items', newItems); }} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Description</label><textarea value={item.description || ''} onChange={(e) => { const newItems = [...(values.items || [])]; newItems[i] = { ...newItems[i], description: e.target.value }; updateContent('aboutPage', 'values', 'items', newItems); }} className="w-full px-3 py-2 border rounded-lg text-sm h-20 resize-none" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQs */}
                {aboutSubTab === 'faqs' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">FAQ Section Header</h3>
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Title</label><input type="text" value={faqSection.title || ''} onChange={(e) => updateContent('aboutPage', 'faqSection', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                            <div><label className="block text-sm font-semibold text-gray-600 mb-2">Section Subtitle</label><input type="text" value={faqSection.subtitle || ''} onChange={(e) => updateContent('aboutPage', 'faqSection', 'subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                        </div>
                        <div className="flex items-center justify-between mb-6 border-b pb-2">
                            <h3 className="text-lg font-bold text-gray-800">FAQ Items</h3>
                            <button onClick={() => updateContent('aboutPage', 'faqs', null, [...faqs, { q: 'New Question', a: 'Answer here...' }])} className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-bold transition-colors flex items-center gap-1"><FaPlus size={10} /> Add Q&A</button>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((f, i) => (
                                <div key={i} className="group relative border border-gray-200 p-4 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                                    <button onClick={() => updateContent('aboutPage', 'faqs', null, faqs.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash size={14} /></button>
                                    <div className="mb-3">
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Question</label>
                                        <input className="w-full font-semibold text-gray-800 bg-transparent border-b border-transparent focus:border-primary focus:bg-white outline-none transition-all px-1 py-0.5" value={f.q} onChange={(e) => { const newFaqs = [...faqs]; newFaqs[i] = { ...newFaqs[i], q: e.target.value }; updateContent('aboutPage', 'faqs', null, newFaqs); }} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Answer</label>
                                        <textarea className="w-full text-sm text-gray-600 bg-transparent border border-transparent focus:border-primary focus:bg-white rounded-lg p-2 outline-none resize-none h-20 transition-all" value={f.a} onChange={(e) => { const newFaqs = [...faqs]; newFaqs[i] = { ...newFaqs[i], a: e.target.value }; updateContent('aboutPage', 'faqs', null, newFaqs); }} />
                                    </div>
                                </div>
                            ))}
                            {faqs.length === 0 && <div className="text-center text-gray-400 text-sm py-4">No FAQs added yet.</div>}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderDashboard = () => {
        const totalUsers = content.users?.length || 0;
        const activeSubs = content.users?.filter(u => u.plan && u.plan !== 'Free').length || 0;
        const successStories = content.stories?.length || 0;

        // Calculate Revenue (Approximate based on plan names)
        const revenue = content.users?.reduce((acc, user) => {
            if (!user.plan) return acc;
            const p = user.plan.toLowerCase();
            if (p === 'gold') return acc + 2999;
            if (p === 'diamond') return acc + 5999;
            if (p === 'platinum') return acc + 9999;
            return acc;
        }, 0) || 0;

        const revenueDisplay = revenue > 100000
            ? `₹${(revenue / 100000).toFixed(2)}L`
            : `₹${revenue.toLocaleString()}`;

        const stats = [
            { label: 'Total Users', value: totalUsers, color: 'bg-blue-500', icon: FaUsers },
            { label: 'Active Subscriptions', value: activeSubs, color: 'bg-green-500', icon: FaGem },
            { label: 'Success Stories', value: successStories, color: 'bg-pink-500', icon: FaHeart },
            { label: 'Revenue (Monthly)', value: revenueDisplay, color: 'bg-purple-500', icon: FaChartLine }
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center text-xl`}>
                            <stat.icon />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'editor': return renderEditor();
            case 'navbar': return renderNavbar();
            case 'footer': return renderFooter();
            case 'contact': return renderContact();
            case 'about': return renderAbout();
            case 'users': return renderUsers();
            case 'community': return renderCommunities();
            case 'testimonials': return renderTestimonials();
            case 'stories': return renderStories();
            case 'blogs': return renderBlogs();
            case 'membership': return renderPlans();
            case 'dashboard': return renderDashboard();
            default: return <div className="p-10">Coming Soon</div>;
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    !isAuthenticated ? (
                        <motion.div
                            key="login-modal"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
                            >
                                <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-red-500 transition-colors">
                                    <FaTimes size={24} />
                                </button>
                                <div className="p-6 md:p-10">
                                    <div className="text-center mb-6 md:mb-8">
                                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                                            <FaCrown />
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900 mb-2">Admin Access</h2>
                                        <p className="text-gray-500 font-medium">Enter your credentials to continue</p>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={loginData.username}
                                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                                className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium bg-gray-50 focus:bg-white"
                                                placeholder="Enter admin username"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={loginData.password}
                                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium bg-gray-50 focus:bg-white"
                                                placeholder="••••••••"
                                                autoComplete="new-password"
                                            />
                                        </div>

                                        {loginError && (
                                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100 flex items-center justify-center gap-2">
                                                <FaTimes className="text-xs" /> {loginError}
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all active:scale-95"
                                        >
                                            Login to Dashboard
                                        </button>
                                    </form>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 md:px-10 md:py-6 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Secure Admin Area
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <div key="admin-dashboard" className="fixed inset-0 z-[9999] flex font-sans">
                            <AnimatePresence>
                                {notification && (
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-xl z-50 font-bold flex items-center gap-2">
                                        <FaCheckCircle /> {notification}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                            <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="relative w-64 bg-gray-900 text-white h-full flex flex-col shadow-2xl z-10">
                                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                                    <span className="font-bold text-xl tracking-wider">ADMIN<span className="text-primary">PANEL</span></span>
                                </div>
                                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                                    {menuItems.map((item) => (
                                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                                            <item.icon />
                                            <span className="font-medium text-sm">{item.label}</span>
                                        </button>
                                    ))}
                                </nav>
                                <div className="p-4 border-t border-gray-800">
                                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold">
                                        <FaTimes /> Logout
                                    </button>
                                </div>
                            </motion.div>            {/* Main Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="relative flex-1 bg-gray-50 h-full flex flex-col z-10"
                            >
                                {/* Header */}
                                <div className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-800">{menuItems.find(m => m.id === activeTab)?.label}</h2>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => {
                                                showNotification("Refreshing data from server...");
                                                fetchAllCollections?.();
                                            }} 
                                            title="Sync all data from database" 
                                            disabled={isFetchingData} 
                                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm shadow-sm disabled:opacity-70"
                                        >
                                            <FaSync className={isFetchingData ? "animate-spin" : ""} /> {isFetchingData ? "Syncing..." : "Refresh"}
                                        </button>
                                        <button onClick={handleManualSave} disabled={isSaving} className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium text-sm shadow-sm disabled:opacity-70">
                                            <FaSave /> {isSaving ? "Saving..." : "Save"}
                                        </button>
                                        <button onClick={exportData} title="Backup as JSON" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all font-medium text-sm shadow-sm">
                                            <FaDownload /> Save As
                                        </button>
                                        <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500">
                                            <FaTimes size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Scrollable Content */}
                                <div key={activeTab} className="flex-1 overflow-y-auto p-8 text-gray-800 relative">
                                    {renderContent()}
                                </div>
                            </motion.div>
                            {/* Modals */}
                            <AnimatePresence>{userModalOpen && (<div className="fixed inset-0 z-[10000] flex items-center justify-center"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setUserModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" /><motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden m-4"><form onSubmit={handleSaveUser} className="p-8"> <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label><input required name="name" defaultValue={editingUser?.name} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" /></div>
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label><select name="gender" defaultValue={editingUser?.gender || 'Male'} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>Male</option><option>Female</option><option>Other</option></select></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Email</label><input required name="email" defaultValue={editingUser?.email} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" /></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label><input name="phone" defaultValue={editingUser?.phone} type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" /></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Plan</label><select name="plan" defaultValue={editingUser?.plan || 'Free'} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>Free</option><option>Gold</option><option>Diamond</option><option>Platinum</option></select></div>
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Role</label><select name="role" defaultValue={editingUser?.role || 'user'} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"><option value="user">User</option><option value="admin">Admin</option></select></div>
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Status</label><select name="status" defaultValue={editingUser?.status || 'Active'} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>Active</option><option>Inactive</option><option>Blocked</option></select></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-8"> <button type="button" onClick={() => setUserModalOpen(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button> <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md">{editingUser ? 'Save' : 'Create'}</button> </div> </form></motion.div></div>)}</AnimatePresence>
                            <AnimatePresence>{communityModalOpen && (<div className="fixed inset-0 z-[10000] flex items-center justify-center"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCommunityModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" /><motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden m-4 max-h-[90vh] overflow-y-auto"><form onSubmit={handleSaveCommunity} className="p-8"> <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingCommunity ? 'Edit Community' : 'Add New Community'}</h3>
                                <div className="flex gap-6 mb-6">
                                    <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative group"> <img src={tempImage || editingCommunity?.image || "https://placehold.co/150"} className="w-full h-full object-cover" /> <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"> <FaImage className="text-white text-2xl" /> <input type="file" accept="image/*" className="hidden" onChange={handleModalImageUpload} /> </label> </div>
                                    <div className="flex-1 space-y-4">
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Name</label><input required name="name" defaultValue={editingCommunity?.name} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" /></div>
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label><input required name="subtitle" defaultValue={editingCommunity?.subtitle} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Connecting Souls" /></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Description</label><textarea required name="description" defaultValue={editingCommunity?.description} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Country</label><input required name="country" defaultValue={editingCommunity?.country} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="India" /></div>
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Members</label><input type="number" name="members" defaultValue={editingCommunity?.members || 100} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Status</label><select name="status" defaultValue={editingCommunity?.status || 'Active'} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>Active</option><option>Inactive</option></select></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tags (Comma separated)</label><input name="tags" defaultValue={editingCommunity?.tags?.join(', ')} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Tradition, Values, Family" /></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Slider Images (Comma separated URLs)</label><textarea name="sliderImages" defaultValue={editingCommunity?.sliderImages?.join(', ')} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 resize-none font-mono text-xs" placeholder="https://..., https://..." /></div>

                                    {/* Featured Cards Manager */}
                                    <div className="border-t pt-4">
                                        <label className="block text-sm font-bold text-gray-800 mb-3">Featured Profile Cards</label>
                                        <div className="space-y-3 mb-4 max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                                            {tempProfiles.length === 0 && <p className="text-xs text-gray-400 text-center italic">No featured cards added yet.</p>}
                                            {tempProfiles.map((p, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-white p-2 rounded shadow-sm border border-gray-100">
                                                    <img src={p.image} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-xs font-bold truncate">{p.name}</p>
                                                        <p className="text-[10px] text-gray-500 truncate">{p.age}y, {p.profession}</p>
                                                    </div>
                                                    <button type="button" onClick={() => setTempProfiles(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 p-1 hover:bg-red-50 rounded"><FaTrash size={12} /></button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                            <input id="newPName" placeholder="Name" className="px-2 py-1 text-xs border rounded" />
                                            <input id="newPAge" placeholder="Age" type="number" className="px-2 py-1 text-xs border rounded" />
                                            <input id="newPLoc" placeholder="Location" className="px-2 py-1 text-xs border rounded" />
                                            <input id="newPProf" placeholder="Profession" className="px-2 py-1 text-xs border rounded" />
                                            <input id="newPEdu" placeholder="Education" className="px-2 py-1 text-xs border rounded col-span-2" />
                                            <input id="newPImg" placeholder="Image URL" className="px-2 py-1 text-xs border rounded col-span-2" />
                                            <button type="button" onClick={() => {
                                                const name = document.getElementById('newPName').value;
                                                const age = document.getElementById('newPAge').value;
                                                const location = document.getElementById('newPLoc').value;
                                                const profession = document.getElementById('newPProf').value;
                                                const education = document.getElementById('newPEdu').value;
                                                const image = document.getElementById('newPImg').value || "https://placehold.co/150";
                                                if (name && age) {
                                                    setTempProfiles([...tempProfiles, { name, age, location, profession, education, image }]);
                                                    // Clear inputs
                                                    ['newPName', 'newPAge', 'newPLoc', 'newPProf', 'newPEdu', 'newPImg'].forEach(id => document.getElementById(id).value = '');
                                                }
                                            }} className="col-span-2 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700">Add Card</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-8"> <button type="button" onClick={() => setCommunityModalOpen(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button> <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md">{editingCommunity ? 'Save' : 'Create'}</button> </div> </form></motion.div></div>)}</AnimatePresence>
                            <AnimatePresence>{testimonialModalOpen && (<div className="fixed inset-0 z-[10000] flex items-center justify-center"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setTestimonialModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" /><motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden m-4 max-h-[90vh] overflow-y-auto"><form onSubmit={handleSaveTestimonial} className="p-8"> <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h3> <div className="flex gap-6 mb-6"> <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative group"> <img src={tempImage || editingTestimonial?.image || "https://via.placeholder.com/150"} className="w-full h-full object-cover" /> <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"> <FaImage className="text-white text-2xl" /> <input type="file" accept="image/*" className="hidden" onChange={handleModalImageUpload} /> </label> </div> <div className="flex-1 space-y-4"> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Couple Names</label><input required name="name" defaultValue={editingTestimonial?.name} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> <div className="grid grid-cols-2 gap-4"> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Location</label><input required name="location" defaultValue={editingTestimonial?.location} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Date</label><input required name="date" defaultValue={editingTestimonial?.date} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> </div> </div> </div> <div className="space-y-4"> <div> <label className="block text-sm font-semibold text-gray-700 mb-1">Review</label> <textarea required name="text" defaultValue={editingTestimonial?.text} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none" /> </div> <div> <label className="block text-sm font-semibold text-gray-700 mb-1">Rating</label> <div className="flex gap-4"> {[1, 2, 3, 4, 5].map(num => (<label key={num} className="flex items-center gap-2 cursor-pointer"><input type="radio" name="rating" value={num} defaultChecked={(editingTestimonial?.rating || 5) === num} className="accent-primary" /> <span className="text-gray-700 text-sm">{num} <FaStar className="inline text-yellow-400 -mt-1" /></span></label>))} </div> </div> </div> <div className="flex items-center justify-end gap-3 mt-8"> <button type="button" onClick={() => setTestimonialModalOpen(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button> <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md">{editingTestimonial ? 'Save' : 'Add'}</button> </div> </form></motion.div></div>)}</AnimatePresence>
                            <AnimatePresence>{storyModalOpen && (<div className="fixed inset-0 z-[10000] flex items-center justify-center"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setStoryModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" /><motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden m-4 max-h-[90vh] overflow-y-auto"><form onSubmit={handleSaveStory} className="p-8"> <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingStory ? 'Edit Success Story' : 'Add Success Story'}</h3> <div className="flex gap-6 mb-6"> <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative group"> <img src={tempImage || editingStory?.image || "https://images.unsplash.com/photo-1621621667797-e06afc21085c?q=80&w=1976&auto=format&fit=crop"} className="w-full h-full object-cover" /> <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"> <FaImage className="text-white text-2xl" /> <input type="file" accept="image/*" className="hidden" onChange={handleModalImageUpload} /> </label> </div> <div className="flex-1 space-y-4"> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Couple Names</label><input required name="names" defaultValue={editingStory?.names} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Marriage Date</label><input required name="date" defaultValue={editingStory?.date} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> </div> </div> <div className="space-y-4"> <div> <label className="block text-sm font-semibold text-gray-700 mb-1">Our Story</label> <textarea required name="story" defaultValue={editingStory?.story} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none" /> </div> </div> <div className="flex items-center justify-end gap-3 mt-8"> <button type="button" onClick={() => setStoryModalOpen(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button> <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md">{editingStory ? 'Save Changes' : 'Publish Story'}</button> </div> </form></motion.div></div>)}</AnimatePresence>
                            <AnimatePresence>{blogModalOpen && (<div className="fixed inset-0 z-[10000] flex items-center justify-center"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBlogModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" /><motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden m-4 max-h-[90vh] overflow-y-auto"><form onSubmit={handleSaveBlog} className="p-8"> <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingBlog ? 'Edit Post' : 'New Blog Post'}</h3> <div className="flex gap-6 mb-6"> <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative group"> <img src={tempImage || editingBlog?.image || "https://images.unsplash.com/photo-1516055279266-9c4c74d6c6a8?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover" /> <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"> <FaImage className="text-white text-2xl" /> <input type="file" accept="image/*" className="hidden" onChange={handleModalImageUpload} /> </label> </div> <div className="flex-1 space-y-4"> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Post Title</label><input required name="title" defaultValue={editingBlog?.title} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> <div className="grid grid-cols-2 gap-4"> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Category</label><input required name="category" defaultValue={editingBlog?.category} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Author</label><input required name="author" defaultValue={editingBlog?.author || 'Admin'} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> </div> </div> </div> <div className="space-y-4"> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Publish Date</label><input required type="date" name="date" defaultValue={editingBlog?.date || new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt (Short Summary)</label><textarea required name="excerpt" defaultValue={editingBlog?.excerpt} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 resize-none" /></div> <div><label className="block text-sm font-semibold text-gray-700 mb-1">Full Content</label><textarea required name="content" defaultValue={editingBlog?.content} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-40 resize-none" placeholder="Write your article here..." /></div> </div> <div className="flex items-center justify-end gap-3 mt-8"> <button type="button" onClick={() => setBlogModalOpen(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button> <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md">{editingBlog ? 'Update Post' : 'Publish Post'}</button> </div> </form></motion.div></div>)}</AnimatePresence>
                        </div>
                    )
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminPanel;
