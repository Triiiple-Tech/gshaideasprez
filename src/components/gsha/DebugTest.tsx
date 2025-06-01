import React from "react";
import { motion } from "framer-motion";

export default function DebugTest() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-red-500 text-white p-2 rounded text-xs">
      <motion.div
        className="w-20 h-2 bg-white"
        style={{ scaleX: 0.5, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2 }}
      />
      <p>Transform test</p>
    </div>
  );
}
