import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import { useContent } from '../context/ContentContext';

const Navbar = () => {
  const { content } = useContent();
  const navbar = content.navbar || {};
  const { logoText, ctaText, ctaLink, links: navLinks } = navbar;

  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const defaultLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Membership', path: '/membership' },
    { name: 'Success Story', path: '/success-stories' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact US', path: '/contact' }
  ];

  const links = navLinks || defaultLinks;

  const isDark = scrolled || location.pathname !== '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
          <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-full text-white shadow-lg overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHeart />
            </motion.div>
          </div>
          <span className={`text-2xl font-bold tracking-tight ${isDark ? 'text-gray-800' : 'text-white'} group-hover:text-primary transition-colors`}>
            {logoText || "Shubh Mhurat"}
          </span>
        </Link>

        <div className="md:hidden text-2xl cursor-pointer text-primary z-[60]" onClick={handleClick}>
          {click ? <FaTimes className={scrolled ? 'text-gray-800' : 'text-white'} /> : <FaBars className={isDark ? 'text-gray-800' : 'text-white'} />}
        </div>

        {/* Mobile menu overlay */}
        <div className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${click ? 'opacity-100 z-[40]' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>

        <ul className={`fixed md:static top-0 right-0 h-screen md:h-auto w-[280px] md:w-auto bg-white md:bg-transparent flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 shadow-2xl md:shadow-none p-8 md:p-0 transition-transform duration-300 ease-in-out z-[50] ${click ? 'translate-x-0 flex' : 'translate-x-full md:translate-x-0 hidden md:flex'}`}>
          {/* Mobile Menu Header */}
          <li className="md:hidden w-full border-b border-gray-100 pb-4 mb-2">
            <span className="text-xl font-bold text-gray-800">Menu</span>
          </li>

          {links.map((link) => (
            <li key={link.name} className="relative w-full md:w-auto text-left md:text-center">
              <Link
                to={link.path}
                className={`py-2 block text-base font-medium transition-colors relative z-10 ${click ? 'text-gray-700 hover:text-primary w-full' :
                    (isDark ? 'text-gray-700 hover:text-primary' : 'text-gray-100 hover:text-white')
                  }`}
                onClick={closeMobileMenu}
              >
                {link.name}
                {location.pathname === link.path && !click && (
                  <motion.div
                    layoutId="underline"
                    className={`absolute bottom-0 left-0 w-full h-[2px] ${isDark ? 'bg-primary' : 'bg-white'}`}
                  />
                )}
                {/* Mobile active indicator */}
                {location.pathname === link.path && click && (
                  <div className="absolute left-[-1rem] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            </li>
          ))}
          <li className="mt-8 md:mt-0 w-full md:w-auto">
            <Link to={ctaLink || "/contact"} onClick={closeMobileMenu}>
              <button className="w-full md:w-auto px-6 py-3 md:py-2.5 rounded-xl md:rounded-full bg-primary hover:bg-primary-dark text-white font-medium shadow-lg hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5">
                {ctaText || "Let's Get Started"}
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav >
  );
};

export default Navbar;
