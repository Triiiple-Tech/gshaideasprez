import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/gsha/HeroSection";
import Navigation from "@/components/gsha/Navigation";
import ExperienceSection from "@/components/gsha/ExperienceSection";
import TechExplainer from "@/components/gsha/TechExplainer";
import PersonalFlex from "@/components/gsha/PersonalFlex";
import ClosingCTA from "@/components/gsha/ClosingCTA";
import ExperienceModal from "@/components/gsha/ExperienceModal";
import ContactModal from "@/components/gsha/ContactModal";
import ParticleBackground from "@/components/gsha/ParticleBackground";
import { experiences, ExperienceData } from "@/lib/gsha-data";
import { initializeSound, soundManager, playIgniteSound } from "@/lib/sounds";

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceData | null>(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true); // Show navigation immediately

  const sectionsRef = useRef<{ [key: string]: HTMLElement }>({});

  // Initialize sound on component mount
  useEffect(() => {
    initializeSound();
    return () => {
      soundManager.stopAmbient();
    };
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);

      // Determine active section
      const sections = [
        "hero",
        ...experiences.map((exp) => exp.id),
        "tech",
        "personal",
        "cta",
      ];

      for (const sectionId of sections) {
        const element = sectionsRef.current[sectionId];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle section navigation
  const handleSectionClick = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle ignite button click
  const handleIgniteClick = () => {
    playIgniteSound();

    // Scroll to first experience with a fire animation
    setTimeout(() => {
      handleSectionClick(experiences[0].id);
    }, 500);
  };

  // Modal handlers
  const handleOpenExperienceModal = (experience: ExperienceData) => {
    setSelectedExperience(experience);
    setIsExperienceModalOpen(true);
  };

  const handleCloseExperienceModal = () => {
    setIsExperienceModalOpen(false);
    setSelectedExperience(null);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Register section refs
  const registerSectionRef = (id: string) => (ref: HTMLElement | null) => {
    if (ref) {
      sectionsRef.current[id] = ref;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground intensity={0.8} />

      {/* Navigation */}
      {showNavigation && (
        <Navigation
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          scrollProgress={scrollProgress}
        />
      )}

      {/* Hero Section */}
      <div ref={registerSectionRef("hero")}>
        <HeroSection onIgniteClick={handleIgniteClick} />
      </div>

      {/* Experience Sections */}
      {experiences.map((experience, index) => (
        <div key={experience.id} ref={registerSectionRef(experience.id)}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <ExperienceSection
              experience={experience}
              onOpenModal={handleOpenExperienceModal}
            />
          </motion.div>
        </div>
      ))}

      {/* Tech Explainer */}
      <div ref={registerSectionRef("tech")}>
        <TechExplainer />
      </div>

      {/* Personal Flex */}
      <div ref={registerSectionRef("personal")}>
        <PersonalFlex />
      </div>

      {/* Closing CTA */}
      <div ref={registerSectionRef("cta")}>
        <ClosingCTA onOpenContactModal={handleOpenContactModal} />
      </div>

      {/* Modals */}
      <ExperienceModal
        experience={selectedExperience}
        isOpen={isExperienceModalOpen}
        onClose={handleCloseExperienceModal}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />

      {/* Sound Control - Clear positioning away from logos */}
      <motion.button
        onClick={() => soundManager.toggleMute()}
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-black/80 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={soundManager.isSoundMuted() ? "Enable Sound" : "Mute Sound"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        style={{
          boxShadow: soundManager.isSoundMuted()
            ? "0 0 20px rgba(255,255,255,0.2)"
            : "0 0 30px rgba(0,255,0,0.4)",
        }}
      >
        <span className="text-lg">
          {soundManager.isSoundMuted() ? "🔇" : "🔊"}
        </span>

        {/* Enhanced sound wave animation when enabled */}
        {!soundManager.isSoundMuted() && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400/50"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-green-400/30"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </motion.button>

      {/* Accessibility */}
      <div className="sr-only" aria-live="polite">
        Currently viewing: {activeSection}
      </div>
    </div>
  );
}
