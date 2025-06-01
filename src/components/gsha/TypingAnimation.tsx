import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
  flickerWord?: string;
  flickerReplace?: string;
}

export default function TypingAnimation({
  text,
  className = "",
  speed = 100,
  onComplete,
  flickerWord,
  flickerReplace,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isFlickering, setIsFlickering] = useState(false);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();

      // Trigger flicker effect if specified
      if (flickerWord && flickerReplace) {
        setTimeout(() => {
          setIsFlickering(true);
          setTimeout(() => {
            setIsFlickering(false);
          }, 200);
        }, 1000);
      }
    }
  }, [
    currentIndex,
    text,
    speed,
    isComplete,
    onComplete,
    flickerWord,
    flickerReplace,
  ]);

  const getDisplayTextWithFlicker = () => {
    if (!flickerWord || !flickerReplace || !isFlickering) {
      return displayText;
    }
    return displayText.replace(flickerWord, flickerReplace);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-['Permanent_Marker'] text-white"
      >
        {getDisplayTextWithFlicker()}
        <AnimatePresence>
          {showCursor && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-block w-1 h-8 bg-white ml-1 animate-pulse"
            />
          )}
        </AnimatePresence>
      </motion.span>

      {isFlickering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-orange-500 opacity-20 blur-sm"
        />
      )}
    </div>
  );
}
