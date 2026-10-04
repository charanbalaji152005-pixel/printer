import React from "react";

// Generate Barcode SVG with realistic varied bar widths
function BarcodeSVG({ code }) {
  const bars = [
    3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2,
    1, 4, 2, 3, 1, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1,
    4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1
  ];

  let currentX = 10;
  const barElements = bars.map((w, idx) => {
    const x = currentX;
    currentX += w + (idx % 2 === 0 ? 1.5 : 2);
    return (
      <rect
        key={idx}
        x={x}
        y="0"
        width={w}
        height="44"
        fill="#0f172a"
      />
    );
  });

  return (
    <div className="receipt-code-container">
      <svg
        viewBox={`0 0 ${currentX + 10} 46`}
        className="receipt-barcode-svg"
        preserveAspectRatio="none"
      >
        {barElements}
      </svg>
      <div className="receipt-code-caption mono">{code}</div>
    </div>
  );
}

// Generate genuine QR Code SVG matrix for Apple Store
function QRCodeSVG({ caption }) {
  const qrGrid = [
    [1,1,1,1,1,1,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,0,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,1,0,1,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,0,1,0,1,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1],
    [0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,0,1,1,0],
    [1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,1,0,1],
    [0,1,0,0,1,0,1,1,1,0,0,1,0,1,0,0,1,1,0,1,0],
    [1,1,1,0,0,1,0,0,1,1,1,0,1,0,1,0,0,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,1,0,0,1,0,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,0,1,1,1,0,1,1,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,1,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,1,1]
  ];

  return (
    <div className="receipt-qr-container">
      <div className="qr-wrapper">
        <svg viewBox="0 0 21 21" className="receipt-qr-svg" shapeRendering="crispEdges">
          {qrGrid.map((row, r) =>
            row.map((cell, c) =>
              cell ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#0f172a" /> : null
            )
          )}
        </svg>
      </div>
      <div className="receipt-code-caption">{caption}</div>
    </div>
  );
}

// Brand Logo SVGs
function BrandLogo({ type }) {
  if (type === "cafe") {
    return (
      <svg className="brand-logo-svg cafe-logo" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" stroke="#92400e" strokeWidth="1.6" strokeDasharray="3 2" />
        {/* Coffee Cup */}
        <path d="M 13 20 C 13 27, 18 30, 24 30 C 28 30, 31 27, 31 22 L 31 20 Z" fill="#b45309" />
        <path d="M 31 22 C 34.5 22, 35.5 24, 35.5 25.5 C 35.5 27.5, 33.5 28.5, 31 28.5" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" />
        <ellipse cx="22" cy="20" rx="9" ry="2.8" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
        {/* Steam Wisps */}
        <path d="M 18 15 Q 19 12 17 9" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 22 14 Q 23 11 21 8" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 26 15 Q 27 12 25 9" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "ticket") {
    return (
      <svg className="brand-logo-svg ticket-logo" viewBox="0 0 44 44" fill="none">
        <rect x="6" y="9" width="32" height="26" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1.8" />
        <circle cx="6" cy="22" r="4.5" fill="#ffffff" stroke="#15803d" strokeWidth="1.6" />
        <circle cx="38" cy="22" r="4.5" fill="#ffffff" stroke="#15803d" strokeWidth="1.6" />
        <line x1="16" y1="16" x2="28" y2="16" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2.5" />
        {/* Pass Star */}
        <polygon points="22,17 24,21 28,22 25,25 26,29 22,27 18,29 19,25 16,22 20,21" fill="#15803d" />
      </svg>
    );
  }

  // Apple Logo
  return (
    <svg className="brand-logo-svg apple-logo-svg" viewBox="0 0 170 170" fill="none">
      <path
        d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.56-7.71-11.61-14.01-6.19-9.68-11.07-20.91-14.65-33.68-3.58-12.77-5.37-24.63-5.37-35.58 0-16.1 4.29-29.28 12.87-39.54 8.58-10.26 19.34-15.54 32.28-15.85 4.58 0 9.87 1.25 15.87 3.75 6 2.5 9.94 3.79 11.83 3.87 1.53 0 5.63-1.37 12.31-4.11 6.68-2.74 12.35-3.93 17.01-3.57 12.87.87 23.32 5.56 31.35 14.07-11.21 6.83-16.66 16.32-16.36 28.47.3 9.47 4.02 17.41 11.16 23.82 7.14 6.41 15.59 10.07 25.35 10.98-2.22 6.83-4.85 13.56-7.89 20.19zM119.22 33.04c0-7.39 2.66-14.48 7.98-21.27 5.32-6.79 12.06-11.12 20.22-12.98.24 1.3.36 2.47.36 3.51 0 7.39-2.8 14.54-8.4 21.45-5.6 6.91-12.56 11.27-20.88 13.08-.24-1.19-.36-2.46-.36-3.79z"
        fill="#0f172a"
      />
    </svg>
  );
}

// Payment method badge with Card icon, Cardholder name & last 4 digits
function PaymentBadge({ payment }) {
  return (
    <div className="receipt-payment-row">
      <div className="payment-card-badge">
        {payment.type === "visa" && (
          <div className="card-brand-icon visa-icon" aria-label="Visa">
            <span className="visa-text">VISA</span>
          </div>
        )}
        {payment.type === "mastercard" && (
          <div className="card-brand-icon mc-icon" aria-label="Mastercard">
            <span className="mc-circle mc-red"></span>
            <span className="mc-circle mc-yellow"></span>
          </div>
        )}
        {payment.type === "applepay" && (
          <div className="card-brand-icon applepay-icon" aria-label="Apple Pay">
            <svg viewBox="0 0 170 170" className="ap-apple-logo">
              <path
                d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.56-7.71-11.61-14.01-6.19-9.68-11.07-20.91-14.65-33.68-3.58-12.77-5.37-24.63-5.37-35.58 0-16.1 4.29-29.28 12.87-39.54 8.58-10.26 19.34-15.54 32.28-15.85 4.58 0 9.87 1.25 15.87 3.75 6 2.5 9.94 3.79 11.83 3.87 1.53 0 5.63-1.37 12.31-4.11 6.68-2.74 12.35-3.93 17.01-3.57 12.87.87 23.32 5.56 31.35 14.07-11.21 6.83-16.66 16.32-16.36 28.47.3 9.47 4.02 17.41 11.16 23.82 7.14 6.41 15.59 10.07 25.35 10.98-2.22 6.83-4.85 13.56-7.89 20.19zM119.22 33.04c0-7.39 2.66-14.48 7.98-21.27 5.32-6.79 12.06-11.12 20.22-12.98.24 1.3.36 2.47.36 3.51 0 7.39-2.8 14.54-8.4 21.45-5.6 6.91-12.56 11.27-20.88 13.08-.24-1.19-.36-2.46-.36-3.79z"
                fill="#ffffff"
              />
            </svg>
            <span className="applepay-text">Pay</span>
          </div>
        )}
      </div>

      <div className="cardholder-details">
        <span className="cardholder-name">{payment.cardholder}</span>
        <span className="card-digits mono">•••• {payment.last4}</span>
      </div>
    </div>
  );
}

export function Receipt({ receipt, animState = "printing" }) {
  if (!receipt) return null;

  return (
    <article
      className={`receipt-paper receipt-anim-${animState}`}
      aria-label={`Receipt for ${receipt.brand}`}
    >
      {/* 1. CENTERED BRAND HEADER */}
      <header className="receipt-header">
        <div className="receipt-logo-container">
          <BrandLogo type={receipt.type} />
        </div>
        <h1 className="receipt-brand-title">{receipt.brand}</h1>
        <p className="receipt-subtitle">{receipt.subtitle}</p>
      </header>

      {/* 2. TOP PRIMARY STATS (Small-caps labels, Monospace values) */}
      <div className="receipt-stats-grid">
        <div className="stat-column">
          <span className="small-caps-label">{receipt.ticketLabel || "TICKET ID"}</span>
          <span className="stat-value-mono mono">{receipt.ticketId}</span>
        </div>
        <div className="stat-column stat-column-right">
          <span className="small-caps-label">AMOUNT</span>
          <span className="stat-value-amount mono">{receipt.amount}</span>
        </div>
      </div>

      {/* 3. DATE & TIME "19 Aug 2026 · 20:17" & STATUS PILL */}
      <div className="receipt-meta-row">
        <div className="meta-left">
          <span className="small-caps-label">DATE & TIME</span>
          <span className="meta-datetime mono">{receipt.dateTime}</span>
        </div>
        <div className="meta-right">
          <span className="small-caps-label">STATUS</span>
          <span
            className={`status-pill status-${receipt.status.variant}`}
            style={{
              backgroundColor: receipt.status.bg,
              color: receipt.status.color,
            }}
          >
            <span
              className="status-dot"
              style={{ backgroundColor: receipt.status.dot }}
            />
            {receipt.status.text}
          </span>
        </div>
      </div>

      {/* 4. DASHED DIVIDER WITH TICKET NOTCHES */}
      <div className="dashed-ticket-divider" role="separator">
        <span className="ticket-punch-notch notch-left" />
        <span className="dashed-line" />
        <span className="ticket-punch-notch notch-right" />
      </div>

      {/* 5. ITEM BREAKDOWN & LINE ITEMS */}
      <div className="receipt-items-list">
        {receipt.items && receipt.items.map((item, idx) => (
          <div key={idx} className="receipt-item-row">
            <span className="item-qty mono">{item.qty}x</span>
            <span className="item-name">{item.name}</span>
            <span className="item-price mono">{item.price}</span>
          </div>
        ))}

        {receipt.metaRows && receipt.metaRows.map((row, idx) => (
          <div key={idx} className="receipt-meta-info-row">
            <span className="small-caps-label">{row.label}</span>
            <span className="meta-info-value mono">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Subtotal & Tax breakdown */}
      <div className="receipt-subtotals">
        <div className="subtotal-line">
          <span className="small-caps-label">SUBTOTAL</span>
          <span className="subtotal-value mono">{receipt.subtotal}</span>
        </div>
        <div className="subtotal-line">
          <span className="small-caps-label">TAX / LEVY</span>
          <span className="subtotal-value mono">{receipt.tax}</span>
        </div>
      </div>

      {/* Secondary dashed divider */}
      <div className="dashed-ticket-divider sub-divider" role="separator">
        <span className="dashed-line" />
      </div>

      {/* 6. PAYMENT SECTION (Card icon + Cardholder name with last 4 digits) */}
      <div className="receipt-payment-section">
        <span className="small-caps-label payment-heading">PAYMENT METHOD</span>
        <PaymentBadge payment={receipt.payment} />
      </div>

      {/* 7. BARCODE OR QR CODE */}
      <div className="receipt-code-section">
        {receipt.codeType === "barcode" ? (
          <BarcodeSVG code={receipt.codeCaption || receipt.codeValue} />
        ) : (
          <QRCodeSVG caption={receipt.codeCaption} />
        )}
      </div>

      {/* 8. TINY FOOTER LINE */}
      <footer className="receipt-footer">
        <p className="tiny-footer-text">{receipt.footerText}</p>
        <div className="receipt-auth-watermark mono">
          AUDIT ID: #{receipt.ticketId.replace(/[^A-Za-z0-9]/g, "").slice(0, 10)} · 200 DPI THERMAL
        </div>
      </footer>

      {/* Zigzag torn bottom spacer */}
      <div className="receipt-bottom-torn-indicator" />
    </article>
  );
}
