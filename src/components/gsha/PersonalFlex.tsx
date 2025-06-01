import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function PersonalFlex() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  return (
    <motion.section
      ref={ref}
      id="personal"
      className="min-h-screen py-20 px-4 bg-black relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
        {/* Logo Animation - Mathematically centered */}
        <motion.div
          className="flex items-center justify-center space-x-16 mb-16 min-h-[200px]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Your Logo */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="w-32 h-32 bg-black border-2 border-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm"
              style={{
                boxShadow:
                  "0 0 40px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)",
              }}
            >
              <span className="text-white text-2xl font-bold">YOUR LOGO</span>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl opacity-30"
              style={{
                background:
                  "linear-gradient(45deg, rgba(255,255,255,0.1), transparent)",
                filter: "blur(10px)",
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Connecting spark */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Sparks */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                  top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3 + 1,
                }}
              />
            ))}
          </motion.div>

          {/* Mosaic Logo */}
          <motion.div
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="w-32 h-32 bg-black border-2 border-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm"
              style={{
                boxShadow:
                  "0 0 40px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)",
              }}
            >
              <span className="text-white text-2xl font-bold">MOSAIC</span>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl opacity-30"
              style={{
                background:
                  "linear-gradient(-45deg, rgba(255,255,255,0.1), transparent)",
                filter: "blur(10px)",
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Quote - With ample breathing room */}
        <motion.div
          className="mb-16 py-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-['Permanent_Marker'] text-white leading-tight"
            style={{
              textShadow: "0 0 30px rgba(255,140,0,0.3)",
            }}
            animate={{
              textShadow: [
                "0 0 30px rgba(255,140,0,0.3)",
                "0 0 50px rgba(255,140,0,0.5)",
                "0 0 30px rgba(255,140,0,0.3)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "If you want the room to remember,
            <br />
            you have to set it on fire first."
          </motion.h2>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p className="text-lg md:text-xl text-white/80 font-serif">
            Event experience and concept by{" "}
            <span className="text-white font-semibold">Your Name</span>,
            <span className="text-orange-400"> Mosaic Creative Lead</span>.
          </p>
        </motion.div>

        {/* Signature Animation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {/* Logos fuse animation */}
          <motion.div
            className="flex items-center justify-center space-x-8 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.div
              className="w-8 h-8 bg-black border border-white/30 rounded flex items-center justify-center"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
            >
              <span className="text-white text-xs font-bold">YL</span>
            </motion.div>

            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center"
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
            >
              <span className="text-white text-xs font-bold">M</span>
            </motion.div>
          </motion.div>

          {/* Rising spark trail */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                style={{ left: "50%", bottom: `${i * 20}px` }}
                initial={{ scale: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  y: [0, -100, -200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 3.5 + i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Subtle brand elements */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="flex items-center space-x-4 text-white/40 text-sm">
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>Performance</span>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>Innovation</span>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>Excellence</span>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
