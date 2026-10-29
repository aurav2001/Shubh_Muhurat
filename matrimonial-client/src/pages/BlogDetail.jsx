import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaTag, FaArrowLeft, FaShare } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const BlogDetail = () => {
    const { id } = useParams();
    const { content } = useContent();
    const blogs = content.blogs || [];

    // Find the blog by ID (converting both to string since URL param is a string but DB id is an integer)
    const blog = blogs.find(b => String(b.id || b._id) === String(id));

    // If blog not found, redirect to blogs list
    if (!blog) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 font-sans">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
                    <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                    <Link to="/blogs" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                        <FaArrowLeft /> Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={blog.image || "https://images.unsplash.com/photo-1522673607200-1645062cd495"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 pb-12 text-white">
                    <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-4 transition-colors">
                        <FaArrowLeft /> Back to Blog
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <FaTag /> {blog.category || 'General'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight max-w-4xl">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm text-gray-300">
                            <span className="flex items-center gap-2"><FaUser /> {blog.author || 'Unknown'}</span>
                            <span className="flex items-center gap-2"><FaCalendar /> {blog.date || 'Unknown'}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-sm p-8 md:p-12"
                        >
                            {/* Excerpt */}
                            {blog.excerpt && (
                                <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">
                                    {blog.excerpt}
                                </p>
                            )}

                            {/* Main Content */}
                            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                {blog.content ? (
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</div>
                                ) : (
                                    <p className="text-gray-500 italic">Full article content coming soon...</p>
                                )}
                            </div>
                        </motion.article>

                        {/* Share Section */}
                        <div className="mt-8 flex items-center justify-between">
                            <Link to="/blogs" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                                <FaArrowLeft /> Back to all articles
                            </Link>
                            <button
                                onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}
                                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                            >
                                <FaShare /> Share
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
