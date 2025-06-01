import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypingAnimation from "./TypingAnimation";
import ParticleBackground from "./ParticleBackground";

interface HeroSectionProps {
  onIgniteClick: () => void;
}

export default function HeroSection({ onIgniteClick }: HeroSectionProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        setShowButton(true);
        setLogoAnimationComplete(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  useEffect(() => {
    if (showButton) {
      const idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
      return () => clearTimeout(idleTimer);
    }
  }, [showButton]);

  const handleIgniteClick = () => {
    setIsIdle(false);
    onIgniteClick();
  };

  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <ParticleBackground intensity={1} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="relative bg-white rounded-full p-4 shadow-2xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <TypingAnimation
                  text="How do you ignite a room full of Canada's boldest marketers?"
                  className="text-lg md:text-xl text-gray-800"
                  speed={50}
                  onComplete={() => setIsTypingComplete(true)}
                  flickerWord="ignite"
                  flickerReplace="set on fire"
                />
              </div>
            </div>

            {/* Animated border highlights */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                background:
                  "linear-gradient(45deg, #9F32E9, #9D531F, #0C5964, #9F32E9) border-box",
                WebkitMask:
                  "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              animate={{
                background: [
                  "linear-gradient(0deg, #9F32E9, #9D531F, #0C5964, #9F32E9)",
                  "linear-gradient(360deg, #9F32E9, #9D531F, #0C5964, #9F32E9)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Logos */}
        <AnimatePresence>
          {isTypingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center space-x-8 mb-4">
                <motion.div
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={
                    logoAnimationComplete ? { x: -100, y: 100, scale: 0.3 } : {}
                  }
                  transition={{ duration: 1, delay: 2 }}
                  className="text-white text-2xl font-bold bg-black px-4 py-2 rounded-lg border border-white/20"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  YOUR LOGO
                </motion.div>

                <motion.div
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-4xl"
                >
                  ✨
                </motion.div>

                <motion.div
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={
                    logoAnimationComplete ? { x: 100, y: 100, scale: 0.3 } : {}
                  }
                  transition={{ duration: 1, delay: 2 }}
                  className="text-white text-2xl font-bold bg-black px-4 py-2 rounded-lg border border-white/20"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  MOSAIC
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* IGNITE Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <Button
                onClick={handleIgniteClick}
                className={`
                  relative overflow-hidden bg-white/10 hover:bg-white/20 text-white border border-white/30
                  backdrop-blur-sm px-8 py-4 text-xl font-semibold rounded-full
                  transition-all duration-300 group
                  ${isIdle ? "animate-pulse shadow-lg shadow-orange-500/50" : ""}
                `}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,140,0,0.2))",
                  boxShadow:
                    "0 0 30px rgba(255, 140, 0, 0.3), inset 0 0 20px rgba(255,255,255,0.1)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100"
                  animate={isIdle ? { opacity: [0, 0.3, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <span className="relative z-10 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>IGNITE</span>
                  <Sparkles className="w-5 h-5" />
                </span>

                {/* Floating embers */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(255,140,0,0.3) 0%, transparent 30%)",
                      "radial-gradient(circle at 80% 50%, rgba(255,140,0,0.3) 0%, transparent 30%)",
                      "radial-gradient(circle at 50% 20%, rgba(255,140,0,0.3) 0%, transparent 30%)",
                      "radial-gradient(circle at 50% 80%, rgba(255,140,0,0.3) 0%, transparent 30%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </Button>

              <p className="text-white/60 mt-4 text-sm">
                Go ahead. Start the fire.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Headlines */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-['Permanent_Marker'] text-white mb-6"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,140,0,0.5)",
                    "0 0 30px rgba(255,140,0,0.8)",
                    "0 0 20px rgba(255,140,0,0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                GSHA 2025: Ignite Your Performance
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 font-serif max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Six disruptive experience concepts for Google Search
                Honours—designed for culture, clout, and connection.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed logos for after animation */}
      <AnimatePresence>
        {logoAnimationComplete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed bottom-4 right-4 z-50 text-white text-sm font-bold bg-black/80 px-3 py-1 rounded border border-white/20 backdrop-blur-sm"
            >
              YOUR LOGO
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed bottom-4 left-4 z-50 text-white text-sm font-bold bg-black/80 px-3 py-1 rounded border border-white/20 backdrop-blur-sm"
            >
              MOSAIC
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
