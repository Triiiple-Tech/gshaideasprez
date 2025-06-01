import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  speed = 50, // Faster for better UX
  onComplete,
  flickerWord,
  flickerReplace,
  autoStart = true,
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

  // Typing effect - simplified and more reliable
  useEffect(() => {
    if (!autoStart || isComplete) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Animation complete
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
    autoStart,
  ]);

  // Initialize with full text if autoStart is false
  useEffect(() => {
    if (!autoStart) {
      setDisplayText(text);
      setIsComplete(true);
    }
  }, [autoStart, text]);

  const getDisplayTextWithFlicker = () => {
    if (!flickerWord || !flickerReplace || !isFlickering) {
      return displayText;
    }
    return displayText.replace(flickerWord, flickerReplace);
  };

  return (
    <div className={`relative ${className}`}>
      <span className="text-gray-800 font-normal">
        {getDisplayTextWithFlicker()}
        {showCursor && !isComplete && (
          <span className="inline-block w-0.5 h-6 bg-gray-800 ml-1 animate-pulse" />
        )}
      </span>

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
