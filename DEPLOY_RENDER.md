# 🎨 Deploy ke Render - Panduan Lengkap

Panduan deploy Arumi Fishing Store ke Render (100% GRATIS, tanpa kartu kredit).

---

## ✨ Kenapa Render?

- ✅ **100% GRATIS** (tidak perlu kartu kredit)
- ✅ **Full Backend Support** (Node.js + Express)
- ✅ **Auto-deploy** dari GitHub
- ✅ **SSL/HTTPS** otomatis
- ✅ **Custom Domain** support
- ✅ **Unlimited apps** (free tier)
- ⚠️ Cold start (sleep setelah 15 menit tidak ada traffic)

---

## 🚀 Langkah Deploy (15 Menit)

### 1️⃣ Buka Render

1. Buka browser
2. Kunjungi: **https://render.com**
3. Klik **"Get Started for Free"** atau **"Sign Up"**

### 2️⃣ Sign Up dengan GitHub

1. Klik **"Sign up with GitHub"**
2. Authorize Render untuk akses GitHub
3. Login akan otomatis selesai

### 3️⃣ Create New Web Service

1. Di Render Dashboard, klik **"New +"** (pojok kanan atas)
2. Pilih **"Web Service"**
3. Akan muncul list repository GitHub Anda

### 4️⃣ Connect Repository

1. Cari repository: **`arumifishing7/arumifishing`**
2. Klik **"Connect"** di sebelah kanan repository

### 5️⃣ Configure Web Service

Isi form dengan detail berikut:

**Name:**

```
arumi-fishing-store
```

**Region:**

```
Singapore (Southeast Asia) - Terdekat dengan Indonesia
```

**Branch:**

```
main
```

**Root Directory:**

```
(kosongkan)
```

**Runtime:**

```
Node
```

**Build Command:**

```
npm install && npm run build
```

**Start Command:**

```
node server.js
```

**Instance Type:**

```
Free (pilih yang paling atas)
```

### 6️⃣ Tambahkan Environment Variables

Scroll ke bawah sampai section **"Environment Variables"**

Klik **"Add Environment Variable"**, tambahkan **satu per satu**:

**Variable #1:**

```
Key: MIDTRANS_SERVER_KEY
Value: your-midtrans-server-key-here
```

**Variable #2:**

```
Key: MIDTRANS_CLIENT_KEY
Value: your-midtrans-client-key-here
```

**Variable #3:**

```
Key: REACT_APP_MIDTRANS_CLIENT_KEY
Value: your-midtrans-client-key-here
```

**Variable #4:**

```
Key: NODE_ENV
Value: production
```

**Variable #5:**

```
Key: PORT
Value: 10000
```

⚠️ **PENTING**: Port di Render harus `10000` (bukan 5000)

### 7️⃣ Deploy!

1. Scroll ke paling bawah
2. Klik tombol **"Create Web Service"** (besar & biru)
3. Render akan mulai deploy otomatis!

**Tunggu 5-10 menit** untuk proses:

- ✅ Clone repository
- ✅ npm install (install dependencies)
- ✅ npm run build (build React app)
- ✅ node server.js (start server)

### 8️⃣ Cek Status Deploy

Di dashboard, Anda akan lihat:

- **"In Progress"** → Sedang deploy
- **"Live"** (hijau) → Deploy berhasil! 🎉

URL website otomatis muncul di atas:

```
https://arumi-fishing-store.onrender.com
```

### 9️⃣ Test Website! 🎊

1. **Klik URL** yang muncul
2. Test semua fitur:
   - ✅ Homepage loading
   - ✅ Katalog produk
   - ✅ Add to cart
   - ✅ Checkout
   - ✅ Payment (test dengan Midtrans sandbox)
   - ✅ Admin panel
   - ✅ Payment history

---

## 🎉 SELAMAT! Website Sudah LIVE!

Website Anda sekarang:

- ✅ **Online 24/7**
- ✅ **SSL/HTTPS** secure
- ✅ **Bisa diakses** dari mana saja
- ✅ **Auto-deploy** setiap push ke GitHub

---

## 📱 Langkah Selanjutnya

### 1. Update Midtrans Callback URL

1. Login ke **Midtrans Dashboard**: https://dashboard.midtrans.com
2. Masuk ke **Settings** → **Configuration**
3. Update **Payment Notification URL**:
   ```
   https://arumi-fishing-store.onrender.com/
   ```
4. Update **Finish Redirect URL**:
   ```
   https://arumi-fishing-store.onrender.com/
   ```
5. **Save** settings

### 2. Share Link Website

Bagikan ke:

- 📱 WhatsApp Business
- 📷 Instagram Bio & Story
- 📘 Facebook Page
- 🗺️ Google My Business

### 3. Monitor Website

Di Render Dashboard:

- **Logs**: Lihat real-time logs
- **Metrics**: Cek usage & performance
- **Events**: Deploy history

---

## 🔄 Auto-Deploy

Setiap kali Anda update code:

```bash
git add .
git commit -m "Update produk baru"
git push origin main
```

Render akan **otomatis detect** dan **redeploy** dalam 3-5 menit! 🚀

---

## 🌍 Custom Domain (Opsional)

Jika punya domain sendiri (misal: `arumifishing.com`):

1. Di Render dashboard, klik **"Settings"**
2. Scroll ke **"Custom Domain"**
3. Klik **"Add Custom Domain"**
4. Masukkan domain: `arumifishing.com`
5. Render kasih instruksi DNS records
6. Tambahkan DNS di provider domain Anda:

   ```
   Type: CNAME
   Name: www
   Value: arumi-fishing-store.onrender.com

   Type: A
   Name: @
   Value: (lihat di Render dashboard)
   ```

7. Tunggu propagasi DNS (1-24 jam)

---

## ⚠️ Catatan Penting: Cold Start

**Free tier Render** akan sleep setelah 15 menit tidak ada traffic.

**Artinya:**

- Visitor pertama setelah lama tidak ada traffic → loading 30-60 detik
- Setelah itu normal & cepat

**Solusi:**

1. **Gratis**: Pakai uptime monitoring (seperti UptimeRobot) untuk ping website tiap 5 menit
2. **Upgrade**: Paid plan $7/bulan (no sleep)

---

## 📊 Monitoring & Logs

### Cek Logs Real-time

1. Di Render dashboard, klik service Anda
2. Klik tab **"Logs"**
3. Lihat console output real-time

### Cek Metrics

1. Klik tab **"Metrics"**
2. Lihat:
   - Response time
   - Memory usage
   - CPU usage
   - Request count

---

## 🐛 Troubleshooting

### Build Failed

**Cek di Logs:**

```
Common issues:
- npm install error → cek package.json
- Build error → test local: npm run build
- Missing dependencies → npm install package-name
```

**Solusi:**

```bash
# Test build di local dulu
npm install
npm run build
npm start

# Jika berhasil, commit & push
git add .
git commit -m "Fix build error"
git push origin main
```

### Deploy Success tapi Website Error 500

**Cek:**

1. Environment variables sudah lengkap?
2. PORT = 10000 (bukan 5000)
3. NODE_ENV = production
4. Midtrans keys benar?

**Restart:**

1. Di dashboard, klik **"Manual Deploy"**
2. Pilih **"Clear build cache & deploy"**

### Midtrans Payment Tidak Berfungsi

**Cek:**

1. ✅ MIDTRANS_SERVER_KEY ada & benar
2. ✅ MIDTRANS_CLIENT_KEY ada & benar
3. ✅ REACT_APP_MIDTRANS_CLIENT_KEY ada (penting untuk frontend!)
4. ✅ Callback URL di Midtrans dashboard sudah update

**Test:**

- Gunakan Midtrans sandbox/test mode dulu
- Test dengan test card number

### Website Sleep/Lambat

**Penyebab:**

- Free tier sleep setelah 15 menit tidak ada traffic

**Solusi Gratis:**

1. Buat akun **UptimeRobot**: https://uptimerobot.com
2. Add monitor untuk ping website Anda tiap 5 menit
3. Website akan tetap awake

---

## 💰 Pricing

### Free Tier (Yang Anda Pakai):

- ✅ **750 hours/month** compute time
- ✅ **100 GB bandwidth/month**
- ✅ **512 MB RAM**
- ⚠️ Sleep after 15 min inactivity
- ✅ SSL/HTTPS gratis
- ✅ Auto-deploy gratis

### Starter ($7/month):

- ✅ **No sleep** (always on)
- ✅ More resources
- ✅ Priority support

---

## ✅ Checklist Deploy

- [ ] Buka Render.com
- [ ] Sign up dengan GitHub
- [ ] Create Web Service
- [ ] Connect repository arumifishing7/arumifishing
- [ ] Configure settings (nama, region, commands)
- [ ] Pilih Instance Type: Free
- [ ] Tambah 5 environment variables
- [ ] Create Web Service
- [ ] Tunggu deploy selesai (status: Live)
- [ ] Copy URL website
- [ ] Test homepage
- [ ] Test katalog produk
- [ ] Test add to cart
- [ ] Test checkout & payment
- [ ] Test admin panel
- [ ] Update Midtrans callback URL
- [ ] Share link ke customer! 🎉

---

## 🎯 Tips & Best Practices

### 1. Monitoring

- Cek logs secara berkala
- Monitor uptime dengan UptimeRobot
- Setup email notification untuk deploy failures

### 2. Performance

- Optimize gambar produk (compress dulu)
- Gunakan CDN untuk assets
- Monitor response time

### 3. Security

- Jangan commit API keys ke GitHub
- Update Midtrans keys berkala
- Monitor transaction logs

### 4. Backup

- Export data produk dari localStorage berkala
- Screenshot transaction history
- Backup .env file

---

## 📞 Support

### Render Support:

- Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### Project Support:

- Email: arumifishing7@gmail.com
- WhatsApp: 088291675664

---

## 🎊 Selamat!

Website Anda sekarang:

- ✅ **Live 24/7** di internet
- ✅ **GRATIS** selamanya
- ✅ **Secure** dengan HTTPS
- ✅ **Auto-deploy** setiap update
- ✅ **Siap terima orderan!** 🎣🛒💰

---

**Deploy Date**: 2025  
**Platform**: Render  
**URL**: https://arumi-fishing-store.onrender.com (sesuaikan dengan URL Anda)
