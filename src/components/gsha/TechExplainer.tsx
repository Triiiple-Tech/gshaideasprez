import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Database, Cpu, Zap, Projector, Share2 } from "lucide-react";
import { techNodes } from "@/lib/gsha-data";

const TechNode = ({
  node,
  index,
  onHover,
}: {
  node: (typeof techNodes)[0];
  index: number;
  onHover: (node: (typeof techNodes)[0] | null) => void;
}) => {
  const icons = {
    "live-data": Database,
    "gemini-ai": Cpu,
    "ar-badges": Zap,
    projection: Projector,
    social: Share2,
  };

  const Icon = icons[node.id as keyof typeof icons] || Database;

  const positions = [
    { x: 50, y: 20 }, // Top
    { x: 85, y: 40 }, // Top Right
    { x: 85, y: 70 }, // Bottom Right
    { x: 50, y: 90 }, // Bottom
    { x: 15, y: 60 }, // Left
  ];

  const position = positions[index % positions.length];

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
      onMouseEnter={() => onHover(node)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.1 }}
    >
      {/* Node circle */}
      <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-sm">
        <Icon className="w-8 h-8 text-white" />

        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />

        {/* Connection lines to center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <motion.line
            x1="50%"
            y1="50%"
            x2={`${50 - position.x + 50}%`}
            y2={`${50 - position.y + 50}%`}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
          />
        </svg>
      </div>

      {/* Label */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white text-sm font-medium whitespace-nowrap">
          {node.name}
        </p>
        <p className="text-white/60 text-xs whitespace-nowrap">
          {node.description}
        </p>
      </div>
    </motion.div>
  );
};

const GeminiAvatar = () => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.5, duration: 1, type: "spring" }}
    >
      {/* Avatar container */}
      <div className="relative w-full h-full bg-gradient-to-br from-orange-400 via-purple-500 to-blue-500 rounded-full flex items-center justify-center border-4 border-white/30 backdrop-blur-sm">
        {/* Breathing effect */}
        <motion.div
          className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* AI symbol */}
        <motion.div
          className="relative z-10 text-white text-2xl font-bold"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ⟡
        </motion.div>

        {/* Orbital rings */}
        <motion.div
          className="absolute inset-0 border-2 border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-2 border border-white/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/60 rounded-full"
          style={{
            left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
            top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
};

export default function TechExplainer() {
  const [hoveredNode, setHoveredNode] = useState<(typeof techNodes)[0] | null>(
    null,
  );
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  return (
    <motion.section
      ref={ref}
      id="tech"
      className="min-h-screen py-20 px-4 bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />

      {/* Digital circuit background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${20 + i * 15}%`}
              cy={`${30 + (i % 2) * 40}%`}
              r="2"
              fill="#9F32E9"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                r: [1, 3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}

          {[...Array(4)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${25 + i * 20}%`}
              y1="20%"
              x2={`${25 + i * 20}%`}
              y2="80%"
              stroke="#0C5964"
              strokeWidth="1"
              animate={{
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-['Permanent_Marker'] text-white mb-6">
            The Technology Stack
          </h2>
          <p className="text-xl text-white/80 font-serif max-w-3xl mx-auto">
            A symphony of cutting-edge technologies orchestrated to create
            unforgettable experiences
          </p>
        </motion.div>

        {/* Tech Diagram */}
        <div
          className="relative w-full max-w-4xl mx-auto mb-16"
          style={{ height: "600px" }}
        >
          {/* Central Gemini Avatar */}
          <GeminiAvatar />

          {/* Tech Nodes */}
          {techNodes.map((node, index) => (
            <TechNode
              key={node.id}
              node={node}
              index={index}
              onHover={setHoveredNode}
            />
          ))}

          {/* Hover Tooltip */}
          {hoveredNode && (
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h4 className="text-white font-semibold mb-2">
                {hoveredNode.name}
              </h4>
              <p className="text-white/70 text-sm">{hoveredNode.details}</p>
            </motion.div>
          )}
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {techNodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                <h4 className="text-white font-semibold">{node.name}</h4>
              </div>
              <p className="text-white/60 text-sm mb-2">{node.description}</p>
              <p className="text-white/80 text-sm">{node.details}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Credit Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center space-x-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full px-8 py-4">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-black border border-white/30 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">YL</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">
                  Concept, Creative & Vision
                </p>
                <p className="text-white/60 text-xs">Your Name for Mosaic</p>
              </div>
            </motion.div>

            <motion.div
              className="w-px h-8 bg-white/20"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">
                  Technical Excellence
                </p>
                <p className="text-white/60 text-xs">Mosaic Team</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
