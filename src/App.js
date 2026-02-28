import React, { useEffect, useState } from 'react';
import './App.css';
import Cart from './components/Cart';
import Chat from './components/Chat';
import PaymentCallback from './components/PaymentCallback';
import AdminPanel from './components/AdminPanel';
import PaymentHistory from './components/PaymentHistory';

// Midtrans configuration removed for security

// Default products jika belum ada di localStorage
const defaultProducts = [
  {
    id: 1,
    name: 'Umpan Magot Premium',
    price: 15000,
    description: 'Umpan magot berkualitas tinggi untuk ikan air tawar, segar dan efektif.',
    image: '/gambar-produk/umpan magot.jpg',
    category: 'umpan',
    badge: 'Best Seller',
    isNew: false,
  },
  {
    id: 2,
    name: 'Umpan Essen Mutiara',
    price: 20000,
    description: 'Essen mutiara dengan aroma kuat untuk ikan mas dan nila.',
    image: '/gambar-produk/essen.jpg',
    category: 'essen',
    badge: 'Popular',
    isNew: false,
  },
  {
    id: 3,
    name: 'Essen Mutiara Biru',
    price: 25000,
    description: 'Variasi essen mutiara warna biru untuk hasil maksimal.',
    image: '/gambar-produk/essent mutiara biru.jpg',
    category: 'essen',
    badge: null,
    isNew: true,
  },
  {
    id: 4,
    name: 'Magot Super',
    price: 18000,
    description: 'Magot super quality dengan aroma khas ikan.',
    image: '/gambar-produk/magot.jpg',
    category: 'umpan',
    badge: null,
    isNew: false,
  },
  {
    id: 5,
    name: 'Ulet Hongkong',
    price: 22000,
    description: 'Ulet hongkong premium untuk ikan predator besar.',
    image: '/gambar-produk/ulet hongkong.jpg',
    category: 'umpan',
    badge: 'Premium',
    isNew: false,
  },
  {
    id: 6,
    name: 'Perent Special',
    price: 17000,
    description: 'Perent khusus dengan formula rahasia Arumi Fishing.',
    image: '/gambar-produk/perent.jpg',
    category: 'umpan',
    badge: null,
    isNew: true,
  },
  {
    id: 7,
    name: 'Essen Mutira Ungu',
    price: 28000,
    description: 'Essen mutiara varian ungu dengan daya tarik maksimal.',
    image: '/gambar-produk/essen mutira ungu.jpg',
    category: 'essen',
    badge: 'Premium',
    isNew: false,
  },
  {
    id: 8,
    name: 'Video Pala Udang Premium',
    price: 35000,
    description: 'Video tutorial dan pala udang premium untuk hasil pancing maksimal.',
    image: '/gambar-produk/video pala udang .mp4',
    category: 'video',
    badge: 'New',
    isNew: true,
    isVideo: true,
  },
];

function App() {
  // Load products from localStorage or use default
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('arumi_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | paying | success | pending | failed | cancelled
  const [statusMessage, setStatusMessage] = useState('');
  const [lastSnapToken, setLastSnapToken] = useState(null);
  const [cart, setCart] = useState({}); // { [productId]: quantity }
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'cart' | 'callback' | 'admin' | 'history'
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showHistoryAuth, setShowHistoryAuth] = useState(false);
  const [historyPassword, setHistoryPassword] = useState('');

  // Product catalog states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // name | price-low | price-high | newest
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category || 'umpan'))];

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        (product.category || 'umpan') === selectedCategory
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.id - a.id;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  // Save products to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('arumi_products', JSON.stringify(products));
  }, [products]);

  // Check if URL contains payment callback parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('order_id') && urlParams.get('transaction_status')) {
      setCurrentPage('callback');
    }
  }, []);

  useEffect(() => {
    // Midtrans script loading removed for security
    console.log('Payment system is under maintenance');
  }, []);

  // Handle admin authentication
  const handleAdminLogin = () => {
    // Simple password check (you can change this password)
    if (adminPassword === 'admin123') {
      setCurrentPage('admin');
      setShowAdminAuth(false);
      setAdminPassword('');
    } else {
      alert('Password salah!');
    }
  };

  // Handle history authentication
  const handleHistoryLogin = () => {
    // Password untuk riwayat pembayaran (bisa sama atau beda dengan admin)
    if (historyPassword === 'admin123') {
      setCurrentPage('history');
      setShowHistoryAuth(false);
      setHistoryPassword('');
    } else {
      alert('Password salah!');
    }
  };

  // Handle product updates from admin panel
  const handleUpdateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  // Save transaction to localStorage
  const saveTransaction = (transactionData) => {
    const saved = localStorage.getItem('arumi_transactions');
    const transactions = saved ? JSON.parse(saved) : [];
    transactions.push(transactionData);
    localStorage.setItem('arumi_transactions', JSON.stringify(transactions));
  };

  const generateWhatsAppMessage = (product, quantity = 1) => {
    const orderId = `ORDER-${Date.now()}`;
    const totalPrice = product.price * quantity;
    
    const message = `🎣 *PESANAN PRODUK ARUMI FISHING* 🎣

%0A📋 *Detail Pesanan:*
%0A• ${product.name} (${quantity}x)
%0A• Harga: Rp ${product.price.toLocaleString()}/pcs
%0A• Total: Rp ${totalPrice.toLocaleString()}
%0A${product.description ? `%0A📝 *Deskripsi:* ${product.description}` : ''}
%0A%0A💰 *Total Pembayaran: Rp ${totalPrice.toLocaleString()}*
%0A📦 *Order ID:* ${orderId}
%0A%0A📍 *Pengiriman:*
%0a• Alamat: [Mohon isi alamat lengkap]
%0a• No. HP: [Mohon isi nomor HP]
%0A%0A⏰ *Waktu Pemesanan:* ${new Date().toLocaleString('id-ID')}
%0A%0A🙏 Mohon konfirmasi ketersediaan stok dan total biaya pengiriman. Terima kasih!`;

    return message;
  };

  const handleBuyNow = (product) => {
    const message = generateWhatsAppMessage(product, 1);
    const whatsappUrl = `https://wa.me/6288291675664?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const addToCart = (productId) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const retryPayment = () => {
    // Midtrans retry functionality removed for security
    alert('Sistem pembayaran sedang maintenance. Silakan hubungi kami langsung untuk pemesanan.');
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, qty) => total + qty, 0);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Memproses pembayaran...</div>
      </div>
    );
  }

  if (paymentStatus !== 'idle' && paymentStatus !== 'paying') {
    return (
      <div className="container">
        <div className={`status-card ${paymentStatus}`}>
          <h2 className="status-title">
            {paymentStatus === 'success' && 'Pembayaran Berhasil'}
            {paymentStatus === 'pending' && 'Pembayaran Sedang Diproses'}
            {paymentStatus === 'failed' && 'Pembayaran Gagal'}
            {paymentStatus === 'cancelled' && 'Pembayaran Dibatalkan'}
          </h2>
          <p className="status-message">{statusMessage}</p>
          <div className="status-actions">
            {paymentStatus !== 'success' && (
              <button
                className="buy-button"
                onClick={retryPayment}
                disabled={!lastSnapToken}
              >
                Kembali ke Pembayaran
              </button>
            )}
            <button
              className="contact-btn outline"
              onClick={() => {
                setPaymentStatus('idle');
                setStatusMessage('');
                setCurrentPage('home');
              }}
            >
              Lanjut Belanja
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show payment callback page
  if (currentPage === 'callback') {
    return <PaymentCallback />;
  }

  // Show admin panel
  if (currentPage === 'admin') {
    return (
      <AdminPanel
        products={products}
        onUpdateProducts={handleUpdateProducts}
        onClose={() => setCurrentPage('home')}
      />
    );
  }

  // Show payment history
  if (currentPage === 'history') {
    return <PaymentHistory onClose={() => setCurrentPage('home')} />;
  }

  // Show cart page
  if (currentPage === 'cart') {
    return (
      <Cart
        cart={cart}
        setCart={setCart}
        products={products}
        onBackToHome={() => setCurrentPage('home')}
        onCheckout={handleCheckout}
      />
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <img
              src="/arumi-logo.png"
              alt="Arumi Fishing Logo"
              className="brand-logo"
            />
            <span>Arumi Fishing Store</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a href="#products">Produk</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
            <button
              className="history-link-btn"
              onClick={() => setShowHistoryAuth(true)}
              title="Riwayat Pembayaran (Admin Only)"
            >
              📊 Riwayat
            </button>
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button
              className="history-icon-btn"
              onClick={() => setShowHistoryAuth(true)}
              title="Riwayat Pembayaran (Admin Only)"
            >
              📊
            </button>
          <button
            className="cart-icon-btn"
            onClick={() => setCurrentPage('cart')}
            title="Lihat Keranjang"
          >
            🛒
            {getCartItemCount() > 0 && <span className="cart-badge">{getCartItemCount()}</span>}
          </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="hamburger-btn"
            onClick={() => {
              console.log('Hamburger clicked, current state:', isMenuOpen);
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle Menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
          style={{ display: isMenuOpen ? 'block' : 'none' }}
        >
          <div className="mobile-menu-content">
            <a
              href="#products"
              onClick={() => setIsMenuOpen(false)}
            >
              Produk
            </a>
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </a>
            <button
              className="mobile-history-btn"
              onClick={() => {
                setShowHistoryAuth(true);
                setIsMenuOpen(false);
              }}
            >
              📊 Riwayat Pembayaran (Admin)
            </button>
          </div>
        </div>
      </nav>

      <header
        className="hero"
      >
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>Umpan Pancing Berkualitas untuk Hasil Pancing Maksimal</h1>
            <p>Temukan umpan terbaik pilihan pemancing. Segar, efektif, dan siap kirim hari ini.</p>
            <button
              className="cta-button"
              onClick={scrollToProducts}
            >
              Belanja Sekarang
            </button>
          </div>
          <div
            className="hero-art"
            aria-hidden
          >
            {/* Placeholder illustration */}
          </div>
        </div>
      </header>

      <main>
        <section
          id="products"
          className="section"
        >
          <div className="container">
            <div className="catalog-header">
              <h2 className="section-title">Katalog Produk</h2>
              <p className="section-subtitle">Temukan umpan pancing berkualitas tinggi untuk hasil maksimal</p>
              
              {/* Search and Filter Bar */}
              <div className="catalog-controls">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
                
                <div className="filter-controls">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="umpan">Umpan</option>
                    <option value="essen">Essen</option>
                    <option value="video">Video</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="name">Urutkan (A-Z)</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="newest">Terbaru</option>
                  </select>
                  
                  <div className="view-toggle">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Grid View"
                    >
                      ⊞
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      title="List View"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="results-info">
                <span>Menampilkan {getFilteredProducts().length} dari {products.length} produk</span>
                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                  >
                    ✕ Hapus pencarian
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`products-container ${viewMode}`}>
              {getFilteredProducts().length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>Tidak ada produk ditemukan</h3>
                  <p>Coba ubah kata kunci pencarian atau filter yang digunakan</p>
                  <button
                    className="reset-filters"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSortBy('name');
                    }}
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                getFilteredProducts().map((product) => (
                  <div
                    key={product.id}
                    className={`product-card ${viewMode === 'list' ? 'list-view' : ''}`}
                  >
                    {/* Product Badges */}
                    <div className="product-badges">
                      {product.isNew && <span className="badge new">Baru</span>}
                      {product.badge && <span className="badge featured">{product.badge}</span>}
                      {product.isVideo && <span className="badge video">🎥 Video</span>}
                    </div>
                    
                    {/* Product Media */}
                    <div className="product-media">
                      {product.isVideo ? (
                        <video
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                          autoPlay
                          muted
                          loop
                          playsInline
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            const fallbackImg = document.createElement('img');
                            fallbackImg.src = '/gambar-produk/essen.jpg';
                            fallbackImg.alt = product.name;
                            fallbackImg.className = 'product-image';
                            e.currentTarget.parentNode.replaceChild(fallbackImg, e.currentTarget);
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={product.image || '/gambar-produk/essen.jpg'}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/gambar-produk/essen.jpg';
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="product-info">
                      <div className="product-category">
                        {product.category === 'umpan' && '🪱 Umpan'}
                        {product.category === 'essen' && '🧪 Essen'}
                        {product.category === 'video' && '🎥 Video'}
                      </div>
                      
                      <h3 className="product-name">{product.name}</h3>
                      
                      <p className="product-description">{product.description}</p>
                      
                      <div className="product-price-row">
                        <div className="product-price">Rp {product.price.toLocaleString()}</div>
                        <div className="price-unit">/pcs</div>
                      </div>

                      {/* Action Buttons */}
                      <div className="action-buttons">
                        <button
                          className="buy-now-btn"
                          onClick={() => handleBuyNow(product)}
                        >
                          ⚡ Beli via WhatsApp
                        </button>
                        <button
                          className="add-to-cart-btn-alt"
                          onClick={(e) => {
                            addToCart(product.id);
                            const btn = e.target;
                            const originalText = btn.textContent;
                            btn.textContent = '✓ Ditambahkan!';
                            btn.style.background = '#27ae60';
                            setTimeout(() => {
                              btn.textContent = originalText;
                              btn.style.background = '';
                            }, 1500);
                          }}
                        >
                          🛒 Masukkan ke Keranjang
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section alt"
        >
          <div className="container about-grid">
            <div>
              <h2 className="section-title">Tentang Arumi Fishing Store</h2>
              <p className="about-text">Kami menyediakan umpan pancing berkualitas yang telah diuji di berbagai spot pemancingan. Fokus kami adalah hasil pancing Anda.</p>
            </div>
            <ul className="highlights">
              <li>✔ Bahan segar & terpilih</li>
              <li>✔ Pengiriman cepat</li>
              <li>✔ Banyak metode pembayaran</li>
            </ul>
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
        >
          <div className="container">
            <div className="contact-header">
              <h2 className="section-title">Hubungi Kami</h2>
              <p className="section-subtitle">Kami siap membantu Anda menemukan umpan pancing terbaik untuk target ikan favorit Anda</p>
            </div>

            <div className="contact-grid">
              {/* Contact Information Card */}
              <div className="contact-info-card">
                <h3 className="contact-card-title">Informasi Kontak</h3>

                <div className="contact-items">
                  <div className="contact-item">
                    <div className="contact-icon">📍</div>
                    <div className="contact-details">
                      <h4>Alamat Toko</h4>
                      <p>
                        Jl. Prima 3 No.19, Mekarsari
                        <br />
                        Kec. Rajeg, Kabupaten Tangerang
                        <br />
                        Banten 15540
                      </p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">📞</div>
                    <div className="contact-details">
                      <h4>Telepon / WhatsApp</h4>
                      <p>088291675664</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">📧</div>
                    <div className="contact-details">
                      <h4>Email</h4>
                      <p>arumifishing7@gmail.com</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">⏰</div>
                    <div className="contact-details">
                      <h4>Jam Operasional</h4>
                      <p>
                        Senin - Sabtu: 08:00 - 17:00
                        <br />
                        Minggu: Tutup
                      </p>
                    </div>
                  </div>
                </div>

                <div className="social-links">
                  <h4 className="social-title">Ikuti Kami</h4>
                  <div className="social-buttons">
                    <a
                      className="social-btn whatsapp"
                      href="https://wa.me/6288291675664"
                      target="_blank"
                      rel="noreferrer"
                      title="Chat WhatsApp"
                    >
                      <span className="social-icon">💬</span>
                      <span className="social-text">WhatsApp</span>
                    </a>
                    <a
                      className="social-btn instagram"
                      href="https://www.instagram.com/arumifishing"
                      target="_blank"
                      rel="noreferrer"
                      title="Follow Instagram"
                    >
                      <span className="social-icon">📷</span>
                      <span className="social-text">Instagram</span>
                    </a>
                    <a
                      className="social-btn email"
                      href="mailto:arumifishing7@gmail.com"
                      title="Kirim Email"
                    >
                      <span className="social-icon">✉️</span>
                      <span className="social-text">Email</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Card */}
              <div className="map-card-modern">
            <div className="map-embed-wrap">
              <iframe
                title="Lokasi Arumi Fishing Store"
                className="map-embed"
                loading="lazy"
                    allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0685178116046!2d106.53367487366262!3d-6.121480393865198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a00759f4cc2f9%3A0x65f98221008a46c3!2sJl.%20Prima%203%20No.19%2C%20Mekarsari%2C%20Kec.%20Rajeg%2C%20Kabupaten%20Tangerang%2C%20Banten%2015540!5e0!3m2!1sen!2sid!4v1760273226644!5m2!1sen!2sid"
              />
            </div>
          </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} Arumi Fishing Store</div>
          <div className="footer-links">
            Alamat Toko: Jl. Prima 3 No.19, Mekarsari, Kec. Rajeg, Kabupaten Tangerang, Banten 15540
            {' | '}
            <span
              className="admin-link"
              onClick={() => setShowAdminAuth(true)}
              title="Admin Panel"
            >
              🔐 Admin
            </span>
          </div>
        </div>
      </footer>

      {/* Admin Authentication Modal */}
      {showAdminAuth && (
        <div
          className="modal-backdrop"
          onClick={() => setShowAdminAuth(false)}
        >
          <div
            className="admin-auth-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>🔐 Login Admin</h3>
            <p>Masukkan password untuk mengakses panel admin</p>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Password Admin"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              autoFocus
            />
            <div className="admin-auth-actions">
              <button onClick={() => setShowAdminAuth(false)}>Batal</button>
              <button
                onClick={handleAdminLogin}
                className="primary"
              >
                Login
              </button>
            </div>
            <small style={{ marginBlockStart: '12px', display: 'block', color: '#6b7a8c' }}>
              Default password: <code>admin123</code>
            </small>
          </div>
        </div>
      )}

      {/* History Authentication Modal */}
      {showHistoryAuth && (
        <div
          className="modal-backdrop"
          onClick={() => setShowHistoryAuth(false)}
        >
          <div
            className="admin-auth-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>📊 Riwayat Pembayaran</h3>
            <p>⚠️ Halaman ini hanya untuk Admin/Pemilik Toko</p>
            <p style={{ fontSize: '0.9rem', color: '#e74c3c', marginBlockEnd: '16px' }}>Masukkan password untuk melihat riwayat pembayaran</p>
            <input
              type="password"
              value={historyPassword}
              onChange={(e) => setHistoryPassword(e.target.value)}
              placeholder="Password Admin"
              onKeyPress={(e) => e.key === 'Enter' && handleHistoryLogin()}
              autoFocus
            />
            <div className="admin-auth-actions">
              <button onClick={() => setShowHistoryAuth(false)}>Batal</button>
              <button
                onClick={handleHistoryLogin}
                className="primary"
              >
                Lihat Riwayat
              </button>
            </div>
            <small style={{ marginBlockStart: '12px', display: 'block', color: '#6b7a8c' }}>
              Default password: <code>admin123</code>
            </small>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <button
          className="chat-toggle"
          onClick={() => setIsChatOpen(true)}
          title="Live Chat - Tanyakan stok dan produk"
        >
          💬
        </button>
      )}

      {/* Chat Component */}
      <Chat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

export default App;
