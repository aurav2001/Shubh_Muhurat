import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaTag, FaArrowRight } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const Blogs = () => {
    const { content, fetchBlogs } = useContent();
    const { hero } = content.blogsPage || {};
    const blogs = content.blogs || [];

    useEffect(() => {
        if (blogs.length === 0) fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={hero?.bgImage || "https://images.unsplash.com/photo-1522673607200-1645062cd495?q=80&w=2070&auto=format&fit=crop"}
                        alt="Blogs Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        {hero?.title || "Our Latest Perspectives"}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl font-light text-gray-200 max-w-3xl mx-auto leading-relaxed"
                    >
                        {hero?.subtitle || "Insights, stories, and advice for your journey together."}
                    </motion.p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {blogs.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-2xl text-gray-400 font-bold">No articles published yet.</h3>
                            <p className="text-gray-500 mt-2">Check back soon for new content!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full"
                                >
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                                            <FaTag /> {blog.category}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
                                            <span className="flex items-center gap-1"><FaUser /> {blog.author}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="flex items-center gap-1"><FaCalendar /> {blog.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 text-sm flex-1 leading-relaxed line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                        <Link
                                            to={`/blogs/${blog.id || blog._id}`}
                                            className="text-primary font-bold text-sm uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all mt-auto"
                                        >
                                            Read Article <FaArrowRight />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
