"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ResponsiveNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Close drawer when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-6 right-6 sm:left-4 sm:right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">HOHAI</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors">
              About
            </a>
            <a href="#faq" className="text-gray-700 hover:text-red-600 transition-colors">
              FAQ
            </a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">
              Contact
            </a>
            <Link href="/contact">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-lg"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <motion.span
                  className="absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300"
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="absolute top-3 left-0 w-6 h-0.5 bg-current transform transition-all duration-300"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300"
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Side Drawer from Right */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? "0%" : "100%" }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[60] overflow-hidden"
          ref={drawerRef}
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100">
            <h2 className="text-xl font-bold text-red-600">HOHAI</h2>
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-lg hover:bg-white transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Menu Content */}
          <div className="p-6 space-y-4 overflow-y-auto h-full pb-24">
            {[
              { href: "#home", label: "Home" },
              { href: "#services", label: "Services" },
              { href: "#about", label: "About" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "Contact" },
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="block px-4 py-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium text-lg border-l-4 border-transparent hover:border-red-600"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.a>
            ))}
            <Link href="/contact">
              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg text-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Overlay for closing drawer */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[59] md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu overlay"
          />
        )}
      </div>
    </nav>
  );
} 