# 🎣 Arumi Fishing Store

**E-commerce modern untuk produk umpan pancing dan perlengkapan memancing.**

Website toko online lengkap dengan sistem pembayaran Midtrans, admin panel, dan riwayat transaksi.

---

## ✨ Fitur Utama

- 🛒 **Shopping Cart** - Keranjang belanja dengan sistem quantity dan diskon
- 💳 **Midtrans Payment** - Integrasi pembayaran dengan berbagai metode (GoPay, Transfer Bank, Kartu Kredit, dll)
- 🎨 **Modern UI/UX** - Desain minimalis, clean, dan profesional
- 📱 **Responsive Design** - Optimal di desktop, tablet, dan mobile
- 💬 **Live Chat** - Auto-reply chatbot untuk customer service
- 🔐 **Admin Panel** - Kelola produk (CRUD) dengan mudah
- 📤 **Image Upload** - Upload foto produk langsung atau via URL
- 📊 **Payment History** - Tracking status pembayaran (Admin only)
- 🗺️ **Google Maps** - Lokasi toko terintegrasi
- 🎯 **SEO Ready** - Meta tags dan struktur optimal untuk search engine

---

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ dan npm
- Akun Midtrans (untuk payment gateway)
- Git (untuk deployment)

### Instalasi

```bash
# Clone repository
git clone https://github.com/username-anda/arumi-fishing-store.git
cd arumi-fishing-store

# Install dependencies
npm install

# Jalankan development server
npm start
```

Website akan buka di `http://localhost:3000`

### Jalankan Backend Server

Buka terminal baru:

```bash
# Jalankan server Midtrans
npm run server
```

Server backend akan berjalan di `http://localhost:5000`

---

## 📦 Tech Stack

**Frontend:**

- React 18
- CSS3 (Modern Design)
- Axios (HTTP Client)

**Backend:**

- Node.js + Express
- Midtrans Payment Gateway

**Storage:**

- localStorage (Product Data & Transactions)

**Deployment:**

- Vercel / Railway / Netlify

---

## 🎯 Fitur Detail

### 1. Shopping Experience

- Katalog produk dengan gambar & deskripsi
- Add to cart / Buy now
- Quantity selector
- Automatic discount calculation
- Order summary

### 2. Payment Gateway

- Midtrans Snap integration
- Multiple payment methods:
  - Credit Card (Visa, MasterCard, JCB)
  - E-Wallet (GoPay, ShopeePay, OVO)
  - Bank Transfer (BCA, Mandiri, BNI, BRI, Permata)
  - QRIS
- Real-time payment status
- Transaction history

### 3. Admin Panel

- ✅ Add new products
- ✅ Edit product details
- ✅ Delete products
- ✅ Upload product images (file or URL)
- ✅ Live preview
- 🔐 Password protected (default: `admin123`)

### 4. Payment History

- View all transactions
- Filter by status (Success/Pending/Failed)
- Transaction details
- Admin only access

### 5. Customer Service

- Auto-reply chatbot
- WhatsApp integration
- Email contact
- Instagram link

---

## 🔧 Konfigurasi

### Midtrans Setup

1. Daftar di [Midtrans](https://midtrans.com)
2. Dapatkan Server Key & Client Key
3. Update di `server.js`:

```javascript
const snap = new midtransClient.Snap({
  isProduction: false, // true untuk production
  serverKey: 'YOUR-SERVER-KEY',
  clientKey: 'YOUR-CLIENT-KEY',
});
```

### Ubah Informasi Kontak

Edit `src/App.js`:

```javascript
// Nomor WhatsApp
<a href="https://wa.me/6288291675664">

// Email
<a href="mailto:arumifishing7@gmail.com">

// Instagram
<a href="https://www.instagram.com/arumifishing">
```

### Ubah Password Admin

Edit `src/App.js` (sekitar line 123):

```javascript
const ADMIN_PASSWORD = 'admin123'; // Ganti dengan password baru
```

---

## 📱 Deployment

### Deploy dalam 10 Menit! 🚀

Lihat panduan lengkap di: **[QUICK_START_DEPLOY.md](QUICK_START_DEPLOY.md)**

Atau baca dokumentasi detail: **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

### Platform Rekomendasi:

1. **Vercel** (Gratis, Auto-deploy) ⭐⭐⭐⭐⭐
2. **Railway** (Gratis $5/bulan, Full backend) ⭐⭐⭐⭐⭐
3. **Netlify** (Gratis, Easy setup) ⭐⭐⭐⭐

---

## 📖 Dokumentasi Lengkap

- 📘 **[ADMIN_PANEL_GUIDE.md](ADMIN_PANEL_GUIDE.md)** - Cara menggunakan Admin Panel
- 🚀 **[QUICK_START_DEPLOY.md](QUICK_START_DEPLOY.md)** - Deploy cepat dalam 10 menit
- 📚 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Panduan deployment lengkap

---

## 🛠️ Development Scripts

```bash
# Development mode (React only)
npm start

# Run backend server
npm run server

# Build untuk production
npm run build

# Run tests
npm test
```

---

## 📂 Struktur Project

```
arumi-fishing-store/
├── public/               # Static files
│   ├── index.html
│   ├── arumi-logo.png
│   └── payment-callback.html
├── src/
│   ├── components/       # React components
│   │   ├── Cart.js       # Shopping cart
│   │   ├── Chat.js       # Live chat
│   │   ├── AdminPanel.js # Admin management
│   │   └── PaymentHistory.js
│   ├── App.js            # Main component
│   ├── App.css           # Main styles
│   └── index.js          # Entry point
├── server.js             # Backend Express server
├── package.json
└── README.md
```

---

## 🔒 Security

- ✅ Password-protected admin panel
- ✅ HTTPS enabled on deployment
- ✅ Environment variables for API keys
- ✅ Input validation
- ✅ Secure payment with Midtrans

⚠️ **Catatan**: Jangan commit API keys ke GitHub!

---

## 🎨 Customization

### Ubah Tema Warna

Edit `src/App.css`:

```css
:root {
  --primary-color: #0b2e4e;
  --secondary-color: #0d9488;
  --accent-color: #10b981;
}
```

### Tambah/Edit Produk

1. Buka website
2. Scroll ke footer → Klik **"Admin"**
3. Login dengan password
4. Tambah/edit produk melalui panel

---

## 🐛 Troubleshooting

### Build Error

```bash
# Clear cache
rm -rf node_modules
npm install
npm run build
```

### Midtrans tidak berfungsi

- Cek Server Key & Client Key
- Pastikan environment sudah benar (Sandbox/Production)
- Cek console browser untuk error

### Gambar tidak muncul

- Pastikan URL gambar valid & accessible
- Gunakan fitur upload image di Admin Panel

---

## 📞 Kontak & Support

**Arumi Fishing Store**

- 📍 Alamat: Jl. Prima 3 No.19, Mekarsari, Kec. Rajeg, Kabupaten Tangerang, Banten 15540
- 📧 Email: arumifishing7@gmail.com
- 📱 WhatsApp: 088291675664
- 📷 Instagram: [@arumifishing](https://www.instagram.com/arumifishing)

---

## 📝 License

This project is private and proprietary.

---

## 🙏 Credits

- **Framework**: React (Create React App)
- **Payment**: Midtrans
- **Icons**: Emoji
- **Fonts**: System fonts

---

## 🚀 Ready to Launch!

Setelah setup selesai, website Anda siap:

- ✅ Menerima pesanan online 24/7
- ✅ Proses pembayaran otomatis
- ✅ Kelola produk dengan mudah
- ✅ Tracking semua transaksi

**Selamat berjualan! 🎣💰**

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Built with** ❤️ **for Arumi Fishing Store**
# arumi-fishing-store
