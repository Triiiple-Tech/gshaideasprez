import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [activeTab, setActiveTab] = useState<
    "calendar" | "message" | "contact"
  >("calendar");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    phone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleCalendarBooking = () => {
    // In a real implementation, this would open a calendar booking widget
    console.log("Opening calendar booking...");
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would trigger a PDF download
    console.log("Downloading complete concept PDF...");
  };

  const tabs = [
    { id: "calendar", label: "Book a Call", icon: Calendar },
    { id: "message", label: "Send Message", icon: Mail },
    { id: "contact", label: "Direct Contact", icon: Phone },
  ];

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
            <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-white/20 bg-gradient-to-r from-orange-500/20 to-purple-500/20">
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
                  Start the Conversation
                </motion.h2>

                <motion.p
                  className="text-white/70"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Let's turn performance into legend.
                </motion.p>
              </div>

              {/* Tabs */}
              <div className="border-b border-white/20">
                <div className="flex">
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`
                          flex-1 flex items-center justify-center space-x-2 p-4 transition-all duration-300
                          ${
                            activeTab === tab.id
                              ? "bg-white/10 text-white border-b-2 border-orange-400"
                              : "text-white/60 hover:text-white/80 hover:bg-white/5"
                          }
                        `}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "calendar" && (
                    <motion.div
                      key="calendar"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Book a Strategy Session
                        </h3>
                        <p className="text-white/70 text-sm">
                          Let's discuss how these concepts can transform your
                          next event
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-orange-400" />
                            <span className="text-white">
                              30-minute strategy call
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 rounded-full bg-green-400" />
                            <span className="text-white">
                              Available this week
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 rounded-full bg-blue-400" />
                            <span className="text-white">
                              Virtual or in-person
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleCalendarBooking}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Your Session
                      </Button>
                    </motion.div>
                  )}

                  {activeTab === "message" && (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Send a Message
                        </h3>
                        <p className="text-white/70 text-sm">
                          Tell us about your event vision and we'll get back to
                          you within 24 hours
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                          <Input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>

                        <Input
                          placeholder="Company/Organization"
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        <Textarea
                          placeholder="Tell us about your event vision..."
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                          required
                        />

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {activeTab === "contact" && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Direct Contact
                        </h3>
                        <p className="text-white/70 text-sm">
                          Reach out directly for immediate response
                        </p>
                      </div>

                      <div className="space-y-4">
                        <motion.a
                          href="mailto:contact@yourname.com"
                          className="flex items-center space-x-4 p-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Email</p>
                            <p className="text-white/70 text-sm">
                              contact@yourname.com
                            </p>
                          </div>
                        </motion.a>

                        <motion.a
                          href="tel:+1234567890"
                          className="flex items-center space-x-4 p-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Phone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Phone</p>
                            <p className="text-white/70 text-sm">
                              +1 (234) 567-8900
                            </p>
                          </div>
                        </motion.a>
                      </div>

                      <div className="border-t border-white/20 pt-4">
                        <p className="text-white/60 text-sm text-center mb-4">
                          Response time: Within 4 business hours
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t border-white/20 bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                  <p className="text-white/60 text-sm text-center sm:text-left">
                    Ready to download the complete concept deck?
                  </p>

                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download All Concepts PDF
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
