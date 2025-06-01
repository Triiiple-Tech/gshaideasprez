import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypingAnimation from "./TypingAnimation";
import ParticleBackground from "./ParticleBackground";

interface HeroSectionProps {
  onIgniteClick: () => void;
}

export default function HeroSection({ onIgniteClick }: HeroSectionProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    if (isTypingComplete) {
      // Show all elements after typing completes
      setTimeout(() => {
        setShowElements(true);
      }, 500);
    }
  }, [isTypingComplete]);

  const handleIgniteClick = () => {
    // Create enhanced flame burst effect
    const flameBurst = document.createElement('div');
    flameBurst.className = 'fixed inset-0 pointer-events-none z-[100]';
    flameBurst.innerHTML = `
      <div class="absolute inset-0 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-400 opacity-0 animate-flame-burst"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,140,0,0.8)_0%,_transparent_70%)] opacity-0" style="animation: ember-rise 1.2s ease-out forwards;"></div>
    `;

    // Add enhanced flame animation styles
    if (!document.querySelector('#enhanced-flame-styles')) {
      const style = document.createElement('style');
      style.id = 'enhanced-flame-styles';
      style.textContent = `
        @keyframes ember-rise {
          0% { opacity: 0; transform: scale(0.5) translateY(100px); }
          30% { opacity: 1; transform: scale(1.2) translateY(0px); }
          70% { opacity: 0.8; transform: scale(1.5) translateY(-50px); }
          100% { opacity: 0; transform: scale(2) translateY(-200px); }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(flameBurst);

    setTimeout(() => {
      if (document.body.contains(flameBurst)) {
        document.body.removeChild(flameBurst);
      }
      onIgniteClick();
    }, 1200);
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <ParticleBackground intensity={1} />

      {/* Main Content Container - Unified Hero Block */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
             style={{ boxShadow: '0 0 60px rgba(255, 140, 0, 0.1)' }}>
        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative bg-white rounded-full p-5 shadow-2xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <TypingAnimation
                  text="How do you ignite a room full of Canada's boldest marketers?"
                  className="text-xl md:text-2xl"
                  speed={50}
                  onComplete={() => setIsTypingComplete(true)}
                  flickerWord="ignite"
                  flickerReplace="set on fire"
                  autoStart={true}
                />
              </div>
            </div>

            {/* Animated border - spins twice then stops */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #9F32E9, #9D531F, #0C5964, #9F32E9)',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
              animate={{
                rotate: [0, 360, 720]
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
            />
          </div>
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showElements ? 1 : 0, y: showElements ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center space-x-8 md:space-x-12">
            {/* Your Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-white text-lg md:text-xl font-bold bg-black/60 px-6 py-3 rounded-xl border border-white/30 backdrop-blur-sm"
              style={{
                boxShadow: "0 0 30px rgba(255,255,255,0.2)",
              }}
            >
              YOUR LOGO
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl"
            >
              ✨
            </motion.div>

            {/* Mosaic Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-white text-lg md:text-xl font-bold bg-black/60 px-6 py-3 rounded-xl border border-white/30 backdrop-blur-sm"
              style={{
                boxShadow: "0 0 30px rgba(255,255,255,0.2)",
              }}
            >
              MOSAIC
            </motion.div>
          </div>
        </motion.div>

        {/* IGNITE Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: showElements ? 1 : 0,
            scale: showElements ? 1 : 0.9,
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Button
            onClick={handleIgniteClick}
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 px-12 py-6 text-2xl font-bold rounded-full shadow-2xl"
            style={{
              boxShadow: "0 0 40px rgba(255, 140, 0, 0.5)",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <span className="relative z-10 flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>IGNITE</span>
              <Sparkles className="w-6 h-6" />
            </span>
          </Button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showElements ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/70 mt-4 text-lg"
          >
            Go ahead. Start the fire.
          </motion.p>
        </motion.div>

        {/* Main Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showElements ? 1 : 0, y: showElements ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-['Permanent_Marker'] text-white mb-8 leading-tight"
            animate={{
              textShadow: [
                "0 0 30px rgba(255,140,0,0.5)",
                "0 0 50px rgba(255,140,0,0.8)",
                "0 0 30px rgba(255,140,0,0.5)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            GSHA 2025:
            <br />
            Ignite Your Performance
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 font-serif max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Six disruptive experience concepts for Google Search
            Honours—designed for culture, clout, and connection.
          </motion.p>
        </motion.div>

        </div> {/* Close unified hero block */}
      </div>

      {/* Fixed Corner Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showElements ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 z-50 text-white text-sm font-bold bg-black/80 px-3 py-2 rounded border border-white/20 backdrop-blur-sm"
      >
        YOUR LOGO
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showElements ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50 text-white text-sm font-bold bg-black/80 px-3 py-2 rounded border border-white/20 backdrop-blur-sm"
      >
        MOSAIC
      </motion.div>
    </section>
  );
}