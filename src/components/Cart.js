import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cart, setCart, products, onBackToHome, onCheckout }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';

    const items = cartItems.map(item => 
      `${item.quantity}x ${item.name} - Rp ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `🎣 *PESANAN PRODUK ARUMI FISHING* 🎣

%0A📋 *Detail Pesanan:*
%0A${items}
%0A💰 *Total Pembayaran: Rp ${totals.finalTotal.toLocaleString()}*
%0A📦 *Total Item: ${totals.totalUnits}*
%0A${totals.discountAmount > 0 ? `🎁 *Diskon: Rp ${totals.discountAmount.toLocaleString()}*` : ''}
%0A%0A📍 *Pengiriman:*
%0a• Alamat: [Mohon isi alamat lengkap]
%0a• No. HP: [Mohon isi nomor HP]
%0A%0A⏰ *Waktu Pemesanan:* ${new Date().toLocaleString('id-ID')}
%0A%0A🙏 Mohon konfirmasi ketersediaan stok dan total biaya pengiriman. Terima kasih!`;

    return message;
  };

  const generateEmailSubject = () => {
    return `Pesanan Arumi Fishing Store - ${cartItems.length} Item - Rp ${totals.total.toLocaleString()}`;
  };

  const generateEmailBody = () => {
    if (cartItems.length === 0) return '';

    const items = cartItems.map(item => 
      `${item.quantity}x ${item.name} - Rp ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    return `Halo Arumi Fishing Store,

Saya ingin memesan produk berikut:

${items}

Total: Rp ${totals.total.toLocaleString()}

Mohon informasikan ketersediaan produk dan cara pembayaran.

Terima kasih!
[Nama Pelanggan]
[No. Telepon/WhatsApp]`;
  };

  const handleBuyViaWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/6288291675664?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Countdown timer untuk maintenance
  useEffect(() => {
    const maintenanceEndTime = new Date();
    maintenanceEndTime.setHours(maintenanceEndTime.getHours() + 3); // 3 jam dari sekarang
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = maintenanceEndTime - now;
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeRemaining({
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        setTimeRemaining({ hours: '00', minutes: '00', seconds: '00' });
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const calculateTotals = (items) => {
    const totalUnits = items.reduce((acc, it) => acc + Number(it.quantity), 0);
    const subtotal = items.reduce((acc, it) => acc + Number(it.price) * Number(it.quantity), 0);
    let discountRate = 0;
    if (totalUnits >= 101 && totalUnits <= 200) discountRate = 0.3;
    else if (totalUnits >= 201 && totalUnits <= 500) discountRate = 0.35;
    else if (totalUnits >= 501 && totalUnits <= 1000) discountRate = 0.4;
    else if (totalUnits > 1000) discountRate = 0.45;
    const discountAmount = Math.floor(subtotal * discountRate);
    const finalTotal = Math.max(0, subtotal - discountAmount);
    const freeShippingByUnits = totalUnits > 1000;
    const freeShippingByValue = finalTotal > 2000000;
    const bonusInfo = {
      bonusUmpan: totalUnits > 200 ? 10 : 0,
      coolerBag: totalUnits > 500,
    };
    return { totalUnits, subtotal, discountRate, discountAmount, finalTotal, freeShippingByUnits, freeShippingByValue, bonusInfo };
  };

  const incrementQty = (productId) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const decrementQty = (productId) => {
    setCart((prev) => {
      const next = { ...prev, [productId]: Math.max(0, (prev[productId] || 0) - 1) };
      if (next[productId] === 0) delete next[productId];
      return { ...next };
    });
  };

  const setQty = (productId, value) => {
    const qty = Math.max(0, Number(value) || 0);
    setCart((prev) => {
      const next = { ...prev, [productId]: qty };
      if (qty === 0) delete next[productId];
      return next;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  // Get cart items with product details
  const cartItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([productId, qty]) => {
      const product = products.find((p) => p.id === Number(productId));
      return {
        ...product,
        quantity: qty,
        total: product.price * qty,
      };
    });

  const totals = calculateTotals(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <button
            className="back-btn"
            onClick={onBackToHome}
          >
            ← Kembali ke Beranda
          </button>
          <h1>Keranjang Belanja</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Keranjang Kosong</h2>
          <p>Belum ada produk di keranjang Anda. Mulai belanja untuk menambahkan produk!</p>
          <button
            className="shop-btn"
            onClick={onBackToHome}
          >
            Mulai Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button
          className="back-btn"
          onClick={onBackToHome}
        >
          ← Kembali ke Beranda
        </button>
        <h1>Keranjang Belanja</h1>
        <div className="cart-count">{totals.totalUnits} item</div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              {item.isVideo ? (
                <video
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    // Fallback to image if video fails
                    const fallbackImg = document.createElement('img');
                    fallbackImg.src = '/gambar-produk/essen.jpg';
                    fallbackImg.alt = item.name;
                    fallbackImg.className = 'cart-item-image';
                    e.currentTarget.parentNode.replaceChild(fallbackImg, e.currentTarget);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={item.image || '/gambar-produk/essen.jpg'}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/gambar-produk/essen.jpg';
                  }}
                />
              )}
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-description">{item.description}</p>
                <div className="cart-item-price">Rp {item.price.toLocaleString()}</div>
              </div>
              <div className="cart-item-controls">
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decrementQty(item.id)}
                  >
                    -
                  </button>
                  <input
                    className="qty-input"
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => setQty(item.id, e.target.value)}
                  />
                  <button
                    className="qty-btn"
                    onClick={() => incrementQty(item.id)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Rp {item.total.toLocaleString()}</div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Hapus dari keranjang"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Ringkasan Pembelian</h3>
          <div className="summary-row">
            <span>Total Item</span>
            <strong>{totals.totalUnits}</strong>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>Rp {totals.subtotal.toLocaleString()}</strong>
          </div>
          {totals.discountAmount > 0 && (
            <div className="summary-row discount">
              <span>Diskon {Math.round(totals.discountRate * 100)}%</span>
              <strong>- Rp {totals.discountAmount.toLocaleString()}</strong>
            </div>
          )}
          <div className="summary-divider" />
          <div className="summary-row total">
            <span>Total Bayar</span>
            <strong>Rp {totals.finalTotal.toLocaleString()}</strong>
          </div>

          {(totals.freeShippingByUnits || totals.freeShippingByValue) && <div className="summary-note">🚚 Gratis ongkir tersedia</div>}
          {totals.bonusInfo?.bonusUmpan > 0 && <div className="summary-note">🎁 Bonus {totals.bonusInfo.bonusUmpan} umpan gratis</div>}
          {totals.bonusInfo?.coolerBag && <div className="summary-note">🎒 Free cooler bag</div>}

          <div className="whatsapp-direct-section">
            <button
              className="whatsapp-checkout-btn"
              onClick={handleBuyViaWhatsApp}
            >
              <span className="whatsapp-icon">💬</span>
              <div className="whatsapp-text">
                <strong>Pesan via WhatsApp</strong>
                <span>Dapatkan respons cepat dari kami</span>
              </div>
              <span className="whatsapp-arrow">→</span>
            </button>
          </div>

          <div className="maintenance-notice">
            <div className="maintenance-header">
              <div className="maintenance-icon-wrapper">
                <div className="maintenance-icon">🔧</div>
                <div className="maintenance-spinner"></div>
              </div>
              <h4>Sistem Pembayaran Sedang Diperbarui</h4>
              <div className="maintenance-badge">MAINTENANCE</div>
            </div>
            
            <div className="maintenance-content">
              <p className="maintenance-main-text">
                Kami sedang meningkatkan sistem pembayaran untuk memberikan Anda pengalaman bertransaksi yang lebih aman dan nyaman.
              </p>
              
              <div className="maintenance-timeline">
                <div className="timeline-item">
                  <div className="timeline-icon">📋</div>
                  <div className="timeline-text">
                    <strong>Analisis Sistem</strong>
                    <span>Selesai</span>
                  </div>
                </div>
                <div className="timeline-item active">
                  <div className="timeline-icon">🔨</div>
                  <div className="timeline-text">
                    <strong>Pembaruan Sistem</strong>
                    <span>Sedang Berlangsung</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">✅</div>
                  <div className="timeline-text">
                    <strong>Uji Coba</strong>
                    <span>Menyusul</span>
                  </div>
                </div>
              </div>
              
              <div className="maintenance-contact">
                <h5>Butuh Bantuan? Hubungi Kami Langsung!</h5>
                <div className="contact-buttons">
                  <a 
                    href={`https://wa.me/6288291675664?text=${generateWhatsAppMessage()}`}
                    className="contact-btn whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="contact-icon">💬</span>
                    <div className="contact-details">
                      <strong>WhatsApp</strong>
                      <span>Pesan sekarang dengan detail keranjang</span>
                    </div>
                    <span className="contact-arrow">→</span>
                  </a>
                  
                  <a 
                    href={`mailto:arumifishing7@gmail.com?subject=${generateEmailSubject()}&body=${generateEmailBody()}`}
                    className="contact-btn email"
                  >
                    <span className="contact-icon">📧</span>
                    <div className="contact-details">
                      <strong>Email</strong>
                      <span>Kirim detail pesanan via email</span>
                    </div>
                    <span className="contact-arrow">→</span>
                  </a>
                </div>
              </div>
              
              <div className="maintenance-countdown">
                <h6>Estimasi Selesai Dalam:</h6>
                <div className="countdown-timer">
                  <div className="time-unit">
                    <span className="time-value">{timeRemaining?.hours || '00'}</span>
                    <span className="time-label">Jam</span>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-unit">
                    <span className="time-value">{timeRemaining?.minutes || '00'}</span>
                    <span className="time-label">Menit</span>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-unit">
                    <span className="time-value">{timeRemaining?.seconds || '00'}</span>
                    <span className="time-label">Detik</span>
                  </div>
                </div>
              </div>
              
              <div className="maintenance-note">
                <div className="note-icon">💡</div>
                <div className="note-content">
                  <p>
                    <strong>Penting:</strong> Sistem akan kembali online setelah maintenance selesai.
                  </p>
                  <p>
                    Pesanan Anda tetap aman di keranjang hingga sistem kembali aktif.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            className="checkout-btn disabled"
            disabled
            title="Pembayaran sedang maintenance"
          >
            <span className="btn-icon">🚫</span>
            <span className="btn-text">Sistem Pembayaran Maintenance</span>
            <span className="btn-subtext">
              {timeRemaining ? `Estimasi: ${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}` : 'Estimasi: 2-3 jam'}
            </span>
          </button>
        </div>
      </div>

      {showConfirm && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-card">
            <h3 className="modal-title">Konfirmasi Checkout</h3>
            <p className="modal-text">Apakah Anda yakin ingin checkout sekarang?</p>
            <div className="modal-summary">
              <div className="summary-row">
                <span>Total Item</span>
                <strong>{totals.totalUnits}</strong>
              </div>
              <div className="summary-row">
                <span>Total Bayar</span>
                <strong>Rp {totals.finalTotal.toLocaleString()}</strong>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </button>
              <button
                className="confirm-btn"
                onClick={() => {
                  setShowConfirm(false);
                  onCheckout(cartItems, totals);
                }}
              >
                Checkout Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
