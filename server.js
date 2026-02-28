require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Midtrans client removed for security

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Midtrans Snap configuration removed for security

// Middleware untuk logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Server Midtrans berjalan dengan baik');
});

app.post('/create-transaction', async (req, res) => {
  // Enhanced maintenance response with professional messaging
  const maintenanceInfo = {
    status: 'MAINTENANCE',
    title: 'Sistem Pembayaran Sedang Diperbarui',
    message: 'Kami sedang melakukan peningkatan sistem pembayaran untuk memberikan Anda pengalaman transaksi yang lebih aman dan nyaman.',
    estimatedTime: '2-3 jam',
    contact: {
      whatsapp: {
        number: '088291675664',
        link: 'https://wa.me/6288291675664?text=Halo%20Arumi%20Fishing,%20saya%20ingin%20melakukan%20pemesanan%20produk',
        label: 'WhatsApp'
      },
      email: {
        address: 'arumifishing7@gmail.com',
        link: 'mailto:arumifishing7@gmail.com?subject=Pemesanan%20Produk%20Arumi%20Fishing',
        label: 'Email'
      }
    },
    alternativeActions: [
      'Hubungi kami via WhatsApp untuk pemesanan langsung',
      'Kirim email dengan detail produk yang diinginkan',
      'Kunjungi toko fisik kami di Jl. Prima 3 No.19, Mekarsari'
    ],
    reassurance: {
      cartSafety: 'Pesanan Anda tetap aman di keranjang',
      notification: 'Kami akan mengirim notifikasi saat sistem kembali online',
      apology: 'Mohon maaf atas ketidaknyamanannya'
    }
  };

  res.status(503).json(maintenanceInfo);
});

// Serve React app for all other routes (production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
