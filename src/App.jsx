import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { receipts } from "./data/receipts";
import { PrinterMachine } from "./components/PrinterMachine";
import { Receipt } from "./components/Receipt";
import "./App.css";

export default function App() {
  // Active receipt index in dataset
  const [receiptIndex, setReceiptIndex] = useState(0);
  // Animation state: "printing" | "holding" | "tearing" | "resetting"
  const [animState, setAnimState] = useState("printing");

  // Derived printing flag
  const isPrinting = animState === "printing";

  const receiptRef = useRef(null);
  const timerRef = useRef(null);

  const currentReceipt = receipts[receiptIndex] || receipts[0];

  // Fire confetti burst over the receipt
  const fireConfetti = useCallback((colors) => {
    try {
      const rect = receiptRef.current?.getBoundingClientRect();
      const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
      const originY = rect ? (rect.top + rect.height * 0.38) / window.innerHeight : 0.38;

      // Center burst
      confetti({
        particleCount: 50,
        spread: 65,
        angle: 90,
        origin: { x: originX, y: Math.max(0.18, Math.min(originY, 0.65)) },
        colors: colors || ["#d97706", "#22c55e", "#38bdf8", "#f59e0b", "#ffffff"],
        scalar: 0.9,
        gravity: 1.15,
        ticks: 200,
        zIndex: 9999,
        disableForReducedMotion: false,
      });

      // Left flank burst
      confetti({
        particleCount: 25,
        spread: 45,
        angle: 60,
        origin: { x: Math.max(0.08, originX - 0.1), y: Math.max(0.2, originY) },
        colors: colors || ["#d97706", "#f59e0b", "#ffffff"],
        scalar: 0.8,
        gravity: 1.2,
        ticks: 180,
        zIndex: 9999,
      });

      // Right flank burst
      confetti({
        particleCount: 25,
        spread: 45,
        angle: 120,
        origin: { x: Math.min(0.92, originX + 0.1), y: Math.max(0.2, originY) },
        colors: colors || ["#38bdf8", "#22c55e", "#ffffff"],
        scalar: 0.8,
        gravity: 1.2,
        ticks: 180,
        zIndex: 9999,
      });
    } catch {
      // Fallback safe confetti
    }
  }, []);

  // Main lifecycle loop (loops automatically through the 3 receipts)
  useEffect(() => {
    if (animState === "printing") {
      // 1. Printing duration: ~1.5s
      timerRef.current = setTimeout(() => {
        setAnimState("holding");
        // Confetti bursts when printing finishes
        fireConfetti(currentReceipt.confettiColors);
      }, 1500);
    } else if (animState === "holding") {
      // 2. Holds for ~2s
      timerRef.current = setTimeout(() => {
        setAnimState("tearing");
      }, 2000);
    } else if (animState === "tearing") {
      // 3. Tears off: rotates and falls away off-screen (~0.85s)
      timerRef.current = setTimeout(() => {
        setAnimState("resetting");
      }, 850);
    } else if (animState === "resetting") {
      // 4. Reset printer and cycle to next receipt
      timerRef.current = setTimeout(() => {
        setReceiptIndex((prev) => (prev + 1) % receipts.length);
        setAnimState("printing");
      }, 120);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [animState, currentReceipt, fireConfetti]);

  return (
    <div className="scene-viewport">
      {/* Full-screen Dark Blurred Café Photo Background */}
      <div className="cafe-backdrop-photo" aria-hidden="true" />
      <div className="cafe-ambient-overlay" aria-hidden="true" />
      <div className="bokeh-orb bokeh-orb-1" aria-hidden="true" />
      <div className="bokeh-orb bokeh-orb-2" aria-hidden="true" />

      {/* Main Scene: Printer and Sheet Only */}
      <main className="printer-experience-frame">
        <section className="printer-assembly-stage">
          {/* Centered Printer Machine Slot at top (Inline SVG, 380:60 aspect ratio) */}
          <div
            className="printer-chassis-wrapper"
            role="region"
            aria-label="Thermal Receipt Printer - Single Color Orange"
          >
            <PrinterMachine
              variant="orange"
              isPrinting={isPrinting}
              status={animState}
            />
          </div>

          {/* Paper Chute: White paper receipt with zig-zag torn edge slides smoothly out of slot */}
          <div className="paper-chute-viewport">
            <div
              ref={receiptRef}
              className={`receipt-slot-carriage carriage-${animState}`}
            >
              <Receipt
                receipt={currentReceipt}
                animState={animState}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
