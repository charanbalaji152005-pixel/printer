import React from "react";

export function PrinterMachine({
  variant = "orange", // Single color orange
  isPrinting = false,
  status = "ready", // "printing" | "holding" | "tearing" | "ready"
}) {
  const isMetallic = variant === "metallic";

  return (
    <div
      className={`printer-machine ${isPrinting ? "is-printing" : ""} printer-${variant}`}
      data-status={status}
      aria-label={`Thermal Receipt Printer - ${isMetallic ? "Metallic Grey" : "Single Color Orange"}`}
    >
      {/* 
        Inline SVG with 380:60 aspect ratio, max-width: 380px
        Soft drop-shadow: 0 12px 24px rgba(15, 23, 42, 0.08)
      */}
      <svg
        className="printer-svg"
        viewBox="0 0 380 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Drop shadow filter: 0 12px 24px rgba(15,23,42,.08) */}
          <filter id="printerSoftShadow" x="-15%" y="-15%" width="130%" height="170%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.08" />
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.3" />
          </filter>

          {/* METALLIC GREY GRADIENTS */}
          <linearGradient id="metallicBodyGrad" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#434a54" />
            <stop offset="18%" stopColor="#2e353f" />
            <stop offset="50%" stopColor="#232931" />
            <stop offset="85%" stopColor="#1a1e24" />
            <stop offset="100%" stopColor="#121519" />
          </linearGradient>

          <linearGradient id="metallicRim" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#717d8c" stopOpacity="0.5" />
            <stop offset="25%" stopColor="#9aa5b4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#373e48" stopOpacity="0.3" />
            <stop offset="75%" stopColor="#9aa5b4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#717d8c" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="metallicCutter" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="20%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="80%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* ORANGE VARIANT GRADIENTS - VIBRANT SINGLE COLOR ORANGE */}
          <linearGradient id="orangeBodyGrad" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff7333" />
            <stop offset="25%" stopColor="#ff5e18" />
            <stop offset="70%" stopColor="#f45110" />
            <stop offset="100%" stopColor="#e54504" />
          </linearGradient>

          <linearGradient id="orangeRim" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9a6b" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#ffbe9f" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#ffbe9f" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ff9a6b" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="orangeCutter" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c53e00" />
            <stop offset="25%" stopColor="#ff8547" />
            <stop offset="50%" stopColor="#e24e0b" />
            <stop offset="75%" stopColor="#ff8547" />
            <stop offset="100%" stopColor="#c53e00" />
          </linearGradient>

          {/* SLOT CAVITY SHADOW GRADIENT */}
          <linearGradient id="slotCavity" x1="0" y1="32" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#020406" />
            <stop offset="50%" stopColor="#080b0f" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* HARDWARE SCREW RADIAL GRADIENT */}
          <radialGradient id="screwGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isMetallic ? "#e2e8f0" : "#ff9c6b"} />
            <stop offset="45%" stopColor={isMetallic ? "#94a3b8" : "#f25a17"} />
            <stop offset="85%" stopColor={isMetallic ? "#475569" : "#c53e00"} />
            <stop offset="100%" stopColor={isMetallic ? "#1e293b" : "#8d2b00"} />
          </radialGradient>

          {/* LED GLOW FILTERS */}
          <filter id="pwrGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="feedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. MAIN CHASSIS HOUSING (Rounded Rectangle) */}
        <rect
          x="2"
          y="2"
          width="376"
          height="54"
          rx="10"
          ry="10"
          fill={isMetallic ? "url(#metallicBodyGrad)" : "url(#orangeBodyGrad)"}
          stroke={isMetallic ? "url(#metallicRim)" : "url(#orangeRim)"}
          strokeWidth="1.5"
          filter="url(#printerSoftShadow)"
        />

        {/* 2. CHASSIS INNER BEVEL SPECULAR HIGHLIGHT */}
        <path
          d="M 14 5 L 366 5 C 371 5 374 7 374 11"
          stroke={isMetallic ? "rgba(255, 255, 255, 0.28)" : "rgba(255, 255, 255, 0.55)"}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* 3. HARDWARE CORNER SCREWS */}
        {/* Left Screw */}
        <circle cx="16" cy="14" r="3.2" fill="url(#screwGradient)" />
        <circle cx="16" cy="14" r="2.8" stroke={isMetallic ? "#1e293b" : "#8d2b00"} strokeWidth="0.5" fill="none" />
        <line x1="14.2" y1="14" x2="17.8" y2="14" stroke={isMetallic ? "#ffffff" : "#ffedd5"} strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />
        <line x1="16" y1="12.2" x2="16" y2="15.8" stroke={isMetallic ? "#ffffff" : "#ffedd5"} strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />

        {/* Right Screw */}
        <circle cx="364" cy="14" r="3.2" fill="url(#screwGradient)" />
        <circle cx="364" cy="14" r="2.8" stroke={isMetallic ? "#1e293b" : "#8d2b00"} strokeWidth="0.5" fill="none" />
        <line x1="362.2" y1="14" x2="365.8" y2="14" stroke={isMetallic ? "#ffffff" : "#ffedd5"} strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />
        <line x1="364" y1="12.2" x2="364" y2="15.8" stroke={isMetallic ? "#ffffff" : "#ffedd5"} strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />

        {/* 4. HARDWARE ACCENT INLAY (Clean minimalist design without any wording) */}
        <rect
          x="34"
          y="10"
          width="80"
          height="8"
          rx="2"
          fill={isMetallic ? "rgba(0, 0, 0, 0.35)" : "rgba(141, 43, 0, 0.28)"}
          stroke={isMetallic ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.25)"}
          strokeWidth="0.5"
        />

        {/* Feed Direction Micro Indicators */}
        <g opacity={isMetallic ? "0.4" : "0.75"}>
          <path d="M 183 10 L 190 14 L 183 18" fill="none" stroke={isMetallic ? "#94a3b8" : "#ffeedd"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 197 10 L 190 14 L 197 18" fill="none" stroke={isMetallic ? "#94a3b8" : "#ffeedd"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* 5. STATUS LED INDICATORS (Minimalist bezels without text) */}
        <g transform="translate(322, 14)">
          {/* LED 1: POWER (Green) */}
          <circle cx="0" cy="0" r="4.2" fill={isMetallic ? "rgba(0, 0, 0, 0.45)" : "rgba(80, 20, 0, 0.5)"} stroke={isMetallic ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.3)"} strokeWidth="0.6" />
          <circle cx="0" cy="0" r="2.6" fill="#10b981" filter="url(#pwrGlow)" />

          {/* LED 2: DATA FEED / PRINTING */}
          <circle cx="16" cy="0" r="4.2" fill={isMetallic ? "rgba(0, 0, 0, 0.45)" : "rgba(80, 20, 0, 0.5)"} stroke={isMetallic ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.3)"} strokeWidth="0.6" />
          <circle
            cx="16"
            cy="0"
            r="2.6"
            fill={isPrinting ? "#38bdf8" : (isMetallic ? "#475569" : "#8d2b00")}
            filter={isPrinting ? "url(#feedGlow)" : "none"}
            className={isPrinting ? "led-pulsing" : ""}
          />
        </g>

        {/* 6. PRINTER SLOT RECESS CAVITY */}
        {/* Recessed bezel housing */}
        <rect
          x="24"
          y="28"
          width="332"
          height="24"
          rx="4"
          fill={isMetallic ? "#0d1117" : "#1a0801"}
          stroke={isMetallic ? "#1f242d" : "#c53e00"}
          strokeWidth="1"
        />

        {/* Dark interior slit where paper emerges */}
        <rect
          x="28"
          y="31"
          width="324"
          height="14"
          rx="2"
          fill="url(#slotCavity)"
        />

        {/* Slot interior top shadow */}
        <rect x="28" y="31" width="324" height="4" fill="#000000" opacity="0.95" />

        {/* Internal rubber feed roller hint */}
        <line x1="34" y1="36" x2="346" y2="36" stroke="#1e242d" strokeWidth="2" strokeDasharray="5 3" opacity="0.75" />

        {/* 7. TEAR CUTTER BLADE (Along the bottom of slot mouth) */}
        <rect
          x="26"
          y="43.5"
          width="328"
          height="3.5"
          rx="1"
          fill={isMetallic ? "url(#metallicCutter)" : "url(#orangeCutter)"}
        />

        {/* Micro-serration teeth on cutter blade */}
        <line
          x1="28"
          y1="46.8"
          x2="352"
          y2="46.8"
          stroke={isMetallic ? "#f8fafc" : "#ffedd5"}
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
          opacity="0.85"
        />

        {/* Lower chassis bevel lip */}
        <path
          d="M 12 55 L 368 55"
          stroke={isMetallic ? "rgba(0, 0, 0, 0.65)" : "rgba(141, 43, 0, 0.6)"}
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
