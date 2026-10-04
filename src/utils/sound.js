// Web Audio API sound synthesizer for authentic thermal printer sounds
let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const SoundEngine = {
  muted: false,

  setMuted(val) {
    this.muted = val;
  },

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  },

  // Thermal printer stepper motor stepping chatter during printing
  playPrintLoop() {
    if (this.muted) return () => {};
    const ctx = getAudioContext();
    if (!ctx) return () => {};

    let isPlaying = true;
    const interval = setInterval(() => {
      if (!isPlaying || this.muted) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140 + Math.random() * 40, ctx.currentTime);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.045);
      } catch {
        // Ignore audio interruptions
      }
    }, 55);

    return () => {
      isPlaying = false;
      clearInterval(interval);
    };
  },

  // Paper tearing snap
  playTearSound() {
    if (this.muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.18);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime);
    } catch {
      // Ignore
    }
  },

  // Celebration pop / chime when confetti bursts
  playConfettiChime() {
    if (this.muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.38);
      });
    } catch {
      // Ignore
    }
  }
};
