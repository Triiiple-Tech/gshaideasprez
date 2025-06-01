import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Flame, Zap, Trophy, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceData, geminiQuips, socialCards } from "@/lib/gsha-data";

interface ExperienceSectionProps {
  experience: ExperienceData;
  onOpenModal: (experience: ExperienceData) => void;
}

const InteractiveVisual = ({
  type,
  color,
}: {
  type: ExperienceData["interactiveType"];
  color: string;
}) => {
  const [interactions, setInteractions] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);

  const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    const newInteraction = { x, y, id: Date.now() };
    setInteractions((prev) => [...prev.slice(-10), newInteraction]);

    // Show random Gemini quip
    if (Math.random() > 0.7) {
      const quip = geminiQuips[Math.floor(Math.random() * geminiQuips.length)];
      console.log("Gemini says:", quip);
    }
  };

  const renderInteractiveContent = () => {
    switch (type) {
      case "flames":
        return (
          <div className="relative w-full h-full overflow-hidden cursor-pointer">
            {/* Base flames */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32"
              style={{
                background: `linear-gradient(to top, ${color}40, ${color}20, transparent)`,
              }}
              animate={{
                height: [100, 140, 100],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Interactive flames */}
            {interactions.map((interaction) => (
              <motion.div
                key={interaction.id}
                className="absolute w-8 h-8 pointer-events-none"
                style={{
                  left: `${interaction.x}%`,
                  top: `${interaction.y}%`,
                  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0, y: -50 }}
                transition={{ duration: 1.5 }}
              />
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className="w-16 h-16 text-orange-400 animate-pulse" />
            </div>
          </div>
        );

      case "maze":
        return (
          <div className="relative w-full h-full overflow-hidden cursor-pointer">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Maze paths */}
              <motion.path
                d="M20,20 L180,20 L180,80 L100,80 L100,120 L180,120 L180,180 L20,180 L20,100 L80,100 L80,60 L20,60 Z"
                fill="none"
                stroke={color}
                strokeWidth="3"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Interactive portals */}
              {interactions.map((interaction) => (
                <motion.circle
                  key={interaction.id}
                  cx={interaction.x * 2}
                  cy={interaction.y * 2}
                  r="0"
                  fill={color}
                  initial={{ r: 0, opacity: 1 }}
                  animate={{ r: 20, opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              ))}
            </svg>
          </div>
        );

      case "leaderboard":
        return (
          <div className="relative w-full h-full overflow-hidden cursor-pointer p-4">
            <motion.div
              className="space-y-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[1, 2, 3, 4, 5].map((rank) => (
                <motion.div
                  key={rank}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2"
                  style={{ borderLeft: `4px solid ${color}` }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black">
                    {rank}
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${100 - rank * 15}%` }}
                        transition={{ duration: 1, delay: rank * 0.1 }}
                      />
                    </div>
                  </div>
                  <Trophy className="w-4 h-4 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            {/* Interactive badges */}
            {interactions.map((interaction) => (
              <motion.div
                key={interaction.id}
                className="absolute w-6 h-6 pointer-events-none"
                style={{ left: `${interaction.x}%`, top: `${interaction.y}%` }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360, y: -20 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Trophy className="w-full h-full text-yellow-400" />
              </motion.div>
            ))}
          </div>
        );

      case "bubbles":
        return (
          <div className="relative w-full h-full overflow-hidden cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageCircle className="w-16 h-16 text-blue-400 animate-bounce" />
            </div>

            {/* Floating question bubbles */}
            <motion.div
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white"
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "What if...?"
            </motion.div>

            <motion.div
              className="absolute top-12 right-8 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white"
              animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              "How about..."
            </motion.div>

            {/* Interactive pop effects */}
            {interactions.map((interaction) => (
              <motion.div
                key={interaction.id}
                className="absolute pointer-events-none"
                style={{ left: `${interaction.x}%`, top: `${interaction.y}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 0] }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-8 h-8 rounded-full border-2 border-white/50" />
              </motion.div>
            ))}
          </div>
        );

      case "stars":
        return (
          <div className="relative w-full h-full overflow-hidden cursor-pointer bg-gradient-to-b from-transparent to-blue-900/20">
            {/* Background stars */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Interactive constellation lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {interactions.length > 1 &&
                interactions.slice(-3).map((interaction, index, arr) => {
                  if (index === 0) return null;
                  const prev = arr[index - 1];
                  return (
                    <motion.line
                      key={`${prev.id}-${interaction.id}`}
                      x1={`${prev.x}%`}
                      y1={`${prev.y}%`}
                      x2={`${interaction.x}%`}
                      y2={`${interaction.y}%`}
                      stroke={color}
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                  );
                })}
            </svg>

            {/* Interactive stars */}
            {interactions.map((interaction) => (
              <motion.div
                key={interaction.id}
                className="absolute pointer-events-none"
                style={{ left: `${interaction.x}%`, top: `${interaction.y}%` }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 180 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="w-full h-80 md:h-96 border border-white/20 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-shadow duration-300"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {renderInteractiveContent()}
    </div>
  );
};

const PhaseCard = ({
  phase,
  title,
  delay,
}: {
  phase: ExperienceData["phases"][keyof ExperienceData["phases"]];
  title: string;
  delay: number;
}) => {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <h4 className="text-xl font-bold text-white mb-3">{phase.title}</h4>
      <p className="text-white/80 leading-relaxed">{phase.description}</p>
    </motion.div>
  );
};

export default function ExperienceSection({
  experience,
  onOpenModal,
}: ExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-50%" });

  return (
    <motion.section
      ref={ref}
      id={experience.id}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at center, ${experience.color}40 0%, transparent 70%)`,
        }}
      />

      {/* Thematic background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {experience.interactiveType === "flames" && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-2 h-8 bg-gradient-to-t from-orange-500/20 to-transparent"
                style={{ left: `${10 + i * 12}%` }}
                animate={{
                  height: [20, 40, 20],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </>
        )}

        {experience.interactiveType === "stars" && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </>
        )}

        {experience.interactiveType === "maze" && (
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <motion.path
              d="M0,100 Q50,50 100,100 T200,100"
              stroke={experience.color}
              strokeWidth="1"
              fill="none"
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-['Permanent_Marker'] text-white mb-6"
            style={{ textShadow: `0 0 40px ${experience.color}60` }}
          >
            {experience.name}
          </h2>
          <p
            className="text-xl md:text-2xl font-serif text-center max-w-4xl mx-auto leading-relaxed"
            style={{ color: experience.color }}
          >
            {experience.tagline}
          </p>
        </motion.div>

        {/* Interactive Visual */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InteractiveVisual
            type={experience.interactiveType}
            color={experience.color}
          />
          <p className="text-white/70 text-center mt-6 text-base max-w-2xl mx-auto">
            Tap or hover to interact • {experience.description}
          </p>
        </motion.div>
        {/* Story Panels */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <PhaseCard
            phase={experience.phases.arrival}
            title="Arrival"
            delay={0.3}
          />
          <PhaseCard
            phase={experience.phases.mainEvent}
            title="Main Event"
            delay={0.4}
          />
          <PhaseCard
            phase={experience.phases.aftermath}
            title="Aftermath"
            delay={0.5}
          />
        </div>

        {/* See Full Concept */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => onOpenModal(experience)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-8 py-4 rounded-full group"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            See Full Concept
          </Button>
        </motion.div>

        {/* Social & FOMO */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="mb-8">
            <motion.div
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
              animate={{
                boxShadow: [
                  `0 0 20px ${experience.color}20`,
                  `0 0 40px ${experience.color}40`,
                  `0 0 20px ${experience.color}20`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-xl font-bold text-white">
                "This is how you build an event legend."
              </p>
            </motion.div>
          </div>

          {/* Social Cards */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {socialCards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-white/60">{card.platform}</span>
                  <span className="text-xs text-white/40">
                    {card.timestamp}
                  </span>
                </div>
                <p className="text-white/80 text-sm mb-2">{card.content}</p>
                <p className="text-white/60 text-xs">— {card.author}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-white/60 text-lg">
              <span className="text-blue-400">#GSHA2025</span> •{" "}
              <span className="text-orange-400">#IgniteYourPerformance</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
