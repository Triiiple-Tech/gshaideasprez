import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceData } from "@/lib/gsha-data";

interface ExperienceModalProps {
  experience: ExperienceData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceModal({
  experience,
  isOpen,
  onClose,
}: ExperienceModalProps) {
  if (!experience) return null;

  const handleDownloadPDF = () => {
    // In a real implementation, this would trigger a PDF download
    console.log(`Downloading PDF for ${experience.name}`);
    // You could implement actual PDF generation here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div
                className="relative p-6 border-b border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${experience.color}20, transparent)`,
                }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.h2
                  className="text-3xl md:text-4xl font-['Permanent_Marker'] text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Get the Full Vision
                </motion.h2>

                <motion.h3
                  className="text-xl md:text-2xl text-white/90 mb-4"
                  style={{ color: experience.color }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {experience.name}
                </motion.h3>

                <motion.p
                  className="text-white/70"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Every detail, every phase. Downloadable and ready to share.
                </motion.p>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Tagline */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Experience Tagline
                  </h4>
                  <p
                    className="text-lg italic font-serif"
                    style={{ color: experience.color }}
                  >
                    {experience.tagline}
                  </p>
                </motion.div>

                {/* Full Concept */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Complete Concept
                  </h4>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <p className="text-white/80 leading-relaxed">
                      {experience.fullConcept}
                    </p>
                  </div>
                </motion.div>

                {/* Detailed Phases */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Experience Journey
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(experience.phases).map(
                      ([phaseKey, phase], index) => (
                        <motion.div
                          key={phaseKey}
                          className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <div className="flex items-start space-x-4">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black flex-shrink-0"
                              style={{ backgroundColor: experience.color }}
                            >
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h5 className="text-white font-semibold mb-2">
                                {phase.title}
                              </h5>
                              <p className="text-white/70 text-sm mb-2">
                                {phase.description}
                              </p>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                <span className="text-xs text-white/50">
                                  Animation: {phase.animation}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>

                {/* Interactive Features */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Interactive Elements
                  </h4>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: experience.color }}
                      />
                      <span className="text-white/80 capitalize">
                        {experience.interactiveType} interactions with real-time
                        responsiveness
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Implementation Notes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Technical Implementation
                  </h4>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <ul className="text-white/70 text-sm space-y-2">
                      <li>
                        • Real-time data integration with live audience metrics
                      </li>
                      <li>
                        • AR/VR compatible with mobile and desktop experiences
                      </li>
                      <li>
                        • Social media integration for instant sharing and FOMO
                        generation
                      </li>
                      <li>
                        • Personalized takeaways and shareable content creation
                      </li>
                      <li>
                        • Scalable architecture supporting 500+ concurrent
                        participants
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t border-white/20 bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="text-center sm:text-left">
                    <p className="text-white/80 text-sm">
                      Ready to bring this experience to life?
                    </p>
                    <p className="text-white/60 text-xs">
                      Full technical specifications and timeline available in
                      the PDF
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleDownloadPDF}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>

                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
