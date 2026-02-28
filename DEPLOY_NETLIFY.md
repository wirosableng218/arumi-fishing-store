# Deploy Arumi Fishing Store ke Netlify

## 🚀 Cara Deploy ke Netlify

### 1. Persiapan Environment Variables di Netlify

Buka Netlify Dashboard → Site Settings → Environment Variables, tambahkan:

```
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key  
MIDTRANS_IS_PRODUCTION=false
SITE_URL=https://your-site-name.netlify.app/
NODE_ENV=production
```

### 2. Deploy via Git (Recommended)

1. Push code ke GitHub/GitLab/Bitbucket
2. Hubungkan repository ke Netlify
3. Netlify akan otomatis detect `netlify.toml`
4. Deploy akan berjalan otomatis

### 3. Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
npm run build
netlify deploy --prod --dir=build
```

## ⚙️ Konfigurasi yang Telah Ditambahkan

### 1. Netlify Functions (`netlify/functions/create-transaction.js`)
- Menggantikan Express server untuk Midtrans API
- Handle CORS untuk cross-origin requests
- Production-ready dengan error handling

### 2. Netlify Configuration (`netlify.toml`)
- Build configuration untuk React app
- Redirect rules untuk API calls
- Environment variables setup

### 3. Dynamic API URL (`src/App.js`)
- Otomatis menggunakan `/api/create-transaction` di production
- Menggunakan `localhost:5000` di development

## 🔧 Testing Local Development

```bash
# Install dependencies
npm install

# Start development server (React + Express)
npm run dev

# Test Netlify Functions locally
npm install -g netlify-cli
netlify dev
```

## ✅ Midtrans Compatibility

### ✅ Akan Berjalan Normal:
- Pembayaran via Snap Token
- Semua payment methods (GoPay, ShopeePay, Bank Transfer, etc.)
- Callback handling
- Transaction notifications

### ⚠️ Catatan Penting:
1. **Environment Variables** WAJIB diisi di Netlify
2. **Midtrans Sandbox** untuk testing
3. **Production Keys** untuk live transactions
4. **CORS** sudah dihandle di Netlify Functions

## 🌐 Domain Custom (Optional)

1. Buka Netlify Dashboard → Domain Settings
2. Add custom domain
3. Update `SITE_URL` environment variable
4. Update Midtrans callback URLs di dashboard Midtrans

## 📱 SEO & Performance

- ✅ SEO meta tags sudah dioptimasi
- ✅ PWA manifest sudah dikonfigurasi  
- ✅ Static assets akan di-serve via CDN
- ✅ Automatic HTTPS certificate

## 🚨 Troubleshooting

### Error: "Cannot POST /create-transaction"
- Pastikan Netlify Functions terdeploy dengan benar
- Check environment variables di Netlify dashboard

### Error: "Midtrans API Key Invalid"
- Verify MIDTRANS_SERVER_KEY dan MIDTRANS_CLIENT_KEY
- Pastikan menggunakan keys yang benar (sandbox vs production)

### CORS Issues
- Sudah dihandle di Netlify Functions
- Pastikan menggunakan `/api/` prefix untuk API calls

## 📞 Support

- WhatsApp: 088291675664
- Email: arumifishing7@gmail.com
- Instagram: @arumifishing
