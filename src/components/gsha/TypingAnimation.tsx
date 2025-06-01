import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
  flickerWord?: string;
  flickerReplace?: string;
  autoStart?: boolean;
}

export default function TypingAnimation({
  text,
  className = "",
  speed = 80, // ~50 WPM (average typing speed)
  onComplete,
  flickerWord,
  flickerReplace,
  autoStart = true,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState(autoStart ? "" : text);
  const [currentIndex, setCurrentIndex] = useState(autoStart ? 0 : text.length);
  const [isComplete, setIsComplete] = useState(!autoStart);
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
    if (!autoStart) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);

      // Call onComplete after a short delay to ensure state is updated
      setTimeout(() => {
        onComplete?.();
      }, 100);

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
    autoStart,
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
        className="font-['Permanent_Marker'] text-gray-800"
      >
        {getDisplayTextWithFlicker()}
        {showCursor && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: showCursor ? 1 : 0 }}
            className="inline-block w-0.5 h-6 bg-gray-800 ml-1"
          />
        )}
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
