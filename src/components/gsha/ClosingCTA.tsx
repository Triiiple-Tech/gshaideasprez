import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClosingCTAProps {
  onOpenContactModal: () => void;
}

export default function ClosingCTA({ onOpenContactModal }: ClosingCTAProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  return (
    <motion.section
      ref={ref}
      id="cta"
      className="min-h-screen py-16 px-6 bg-black relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.6 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Central ember */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-400"
            style={{
              filter: "blur(20px)",
              boxShadow: "0 0 100px rgba(255, 140, 0, 0.8)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Pulsing core */}
          <motion.div
            className="absolute inset-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </motion.div>

        {/* Floating embers */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo fusion animation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex items-center justify-center space-x-8"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Your logo */}
            <motion.div
              className="w-16 h-16 bg-black border-2 border-white/30 rounded-lg flex items-center justify-center"
              style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              animate={{
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <span className="text-white text-sm font-bold">YL</span>
            </motion.div>

            {/* Fusion point */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full" />

              {/* Fusion sparks */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${50 + 25 * Math.cos((i * 90 * Math.PI) / 180)}%`,
                    top: `${50 + 25 * Math.sin((i * 90 * Math.PI) / 180)}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 2 + i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            {/* Mosaic logo */}
            <motion.div
              className="w-16 h-16 bg-black border-2 border-white/30 rounded-lg flex items-center justify-center"
              style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              animate={{
                x: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <span className="text-white text-sm font-bold">M</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-['Permanent_Marker'] text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            textShadow: "0 0 40px rgba(255,140,0,0.4)",
          }}
        >
          Ready to ignite
          <br />
          <motion.span
            className="relative"
            animate={{
              textShadow: [
                "0 0 40px rgba(255,140,0,0.4)",
                "0 0 60px rgba(255,140,0,0.8)",
                "0 0 40px rgba(255,140,0,0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          >
            GSHA 2025?
            {/* Ember glow behind text */}
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(255,140,0,0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />
          </motion.span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-white/80 font-serif mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Let's turn performance into legend.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Button
            onClick={onOpenContactModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 px-12 py-6 text-xl font-semibold rounded-full group"
            style={{
              boxShadow:
                "0 0 40px rgba(255, 140, 0, 0.5), 0 0 80px rgba(255, 140, 0, 0.3)",
            }}
          >
            {/* Button spark effects */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={
                isHovered
                  ? {
                      background: [
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 30%)",
                        "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 30%)",
                        "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 30%)",
                        "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3) 0%, transparent 30%)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            />

            <span className="relative z-10 flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>Start the Conversation</span>
              <Sparkles className="w-6 h-6" />
            </span>

            {/* Click spark effect */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>
          </Button>

          <motion.p
            className="text-white/60 mt-4 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 }}
          >
            Let's Build Something Legendary.
          </motion.p>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.div
              className="w-8 h-8 bg-black border border-white/30 rounded flex items-center justify-center"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-white text-xs font-bold">YL</span>
            </motion.div>

            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <span className="text-white text-xs font-bold">M</span>
            </motion.div>
          </div>

          <motion.p
            className="text-white/40 text-sm"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Created by Your Name for Mosaic | 2024
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
