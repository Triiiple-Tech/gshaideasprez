class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isMuted: boolean = true; // Default to muted for better UX
  private volume: number = 0.3;

  constructor() {
    this.loadSounds();
  }

  private loadSounds() {
    const soundFiles = {
      click: "/sounds/click.mp3",
      spark: "/sounds/spark.mp3",
      ember: "/sounds/ember.mp3",
      ignite: "/sounds/ignite.mp3",
      ambient: "/sounds/ambient.mp3",
    };

    Object.entries(soundFiles).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.volume = this.volume;
      audio.preload = "auto";

      // Handle loading errors gracefully
      audio.addEventListener("error", () => {
        console.warn(`Could not load sound: ${src}`);
      });

      this.sounds.set(key, audio);
    });
  }

  play(soundName: string, volume?: number) {
    if (this.isMuted) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.volume = volume ?? this.volume;
      sound.currentTime = 0;

      // Use promise to handle play errors
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, ignore silently
        });
      }
    }
  }

  playAmbient() {
    if (this.isMuted) return;

    const ambient = this.sounds.get("ambient");
    if (ambient) {
      ambient.loop = true;
      ambient.volume = this.volume * 0.5;
      ambient.play().catch(() => {
        // Auto-play was prevented, ignore silently
      });
    }
  }

  stopAmbient() {
    const ambient = this.sounds.get("ambient");
    if (ambient) {
      ambient.pause();
      ambient.currentTime = 0;
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAmbient();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound) => {
      sound.volume = this.volume;
    });
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  isSoundMuted() {
    return this.isMuted;
  }
}

// Create global sound manager instance
export const soundManager = new SoundManager();

// Sound effect helpers
export const playClickSound = () => soundManager.play("click");
export const playSparkSound = () => soundManager.play("spark");
export const playEmberSound = () => soundManager.play("ember");
export const playIgniteSound = () => soundManager.play("ignite", 0.5);

// Initialize sound on user interaction
let soundInitialized = false;

export const initializeSound = () => {
  if (soundInitialized) return;

  const initSound = () => {
    soundManager.playAmbient();
    soundInitialized = true;

    // Remove listeners after first interaction
    document.removeEventListener("click", initSound);
    document.removeEventListener("touchstart", initSound);
    document.removeEventListener("keydown", initSound);
  };

  // Add listeners for user interaction
  document.addEventListener("click", initSound, { once: true });
  document.addEventListener("touchstart", initSound, { once: true });
  document.addEventListener("keydown", initSound, { once: true });
};

// Accessibility - respect user's preference for reduced motion
export const shouldPlaySounds = () => {
  if (typeof window === "undefined") return false;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  return !prefersReducedMotion.matches && !soundManager.isSoundMuted();
};
