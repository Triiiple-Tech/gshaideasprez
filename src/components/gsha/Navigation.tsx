import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { experiences } from "@/lib/gsha-data";

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  scrollProgress: number;
}

export default function Navigation({
  activeSection,
  onSectionClick,
  scrollProgress,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sections = [
    { id: "hero", name: "Home", color: "#FFFFFF" },
    ...experiences.map((exp) => ({
      id: exp.id,
      name: exp.name.split(" ").pop()!,
      color: exp.color,
    })),
    { id: "tech", name: "Tech", color: "#9F32E9" },
    { id: "personal", name: "Vision", color: "#FFD700" },
    { id: "cta", name: "Contact", color: "#FF4500" },
  ];

  const OrbButton = ({
    section,
    index,
  }: {
    section: (typeof sections)[0];
    index: number;
  }) => {
    const isActive = activeSection === section.id;

    return (
      <motion.button
        onClick={() => {
          onSectionClick(section.id);
          setIsOpen(false);
        }}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {/* Orb */}
        <div
          className={`
            w-12 h-12 rounded-full border-2 backdrop-blur-sm
            transition-all duration-300 relative overflow-hidden
            ${
              isActive
                ? "bg-white/20 border-white shadow-lg shadow-white/50"
                : "bg-black/20 border-white/30 hover:bg-white/10"
            }
          `}
          style={{
            boxShadow: isActive
              ? `0 0 20px ${section.color}50, 0 0 40px ${section.color}30`
              : undefined,
          }}
        >
          {/* Pulsing core */}
          <motion.div
            className="absolute inset-2 rounded-full opacity-50"
            style={{ backgroundColor: section.color }}
            animate={
              isActive
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Spark effect */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${section.color}40 0%, transparent 70%)`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Label */}
        <motion.span
          className="absolute top-14 left-1/2 transform -translate-x-1/2 text-xs text-white/80 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0.6 }}
          whileHover={{ opacity: 1 }}
        >
          {section.name}
        </motion.span>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${section.color} 0%, transparent 70%)`,
          }}
        />
      </motion.button>
    );
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile FAB */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 w-14 h-14 bg-black/80 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-20 right-4 z-40 bg-black/90 backdrop-blur-sm border border-white/30 rounded-xl p-4 space-y-3"
            >
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    onSectionClick(section.id);
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-all duration-200
                    ${
                      activeSection === section.id
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }
                  `}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: section.color }}
                  />
                  <span className="text-sm font-medium">{section.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 z-30"
          style={{ scaleX: scrollProgress, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
        />
      </>
    );
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center space-x-6">
          {sections.map((section, index) => (
            <OrbButton key={section.id} section={section} index={index} />
          ))}
        </div>
      </motion.nav>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-30"
        style={{
          background:
            "linear-gradient(90deg, #FF4500 0%, #9F32E9 25%, #0C5964 50%, #9D531F 75%, #FFD700 100%)",
        }}
      >
        <motion.div
          className="h-full bg-white/30"
          style={{ scaleX: scrollProgress, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
        />
      </motion.div>
    </>
  );
}
