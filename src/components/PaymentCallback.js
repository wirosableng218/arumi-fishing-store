import React, { useEffect, useState } from 'react';
import './PaymentCallback.css';

const PaymentCallback = () => {
  const [transactionData, setTransactionData] = useState({
    orderId: '',
    statusCode: '',
    transactionStatus: '',
  });
  const [countdown, setCountdown] = useState(10);

  const closeWindow = () => {
    window.close();
    // If window.close() doesn't work
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  const redirectToHome = () => {
    window.location.href = '/';
  };

  const redirectToDashboard = () => {
    // Check if user is admin (you might want to implement proper authentication)
    const isAdmin = localStorage.getItem('arumi_admin_authenticated') === 'true';
    if (isAdmin) {
      window.location.href = '/?view=admin';
    } else {
      window.location.href = '/';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'capture':
      case 'settlement':
        return '✅';
      case 'pending':
        return '⏳';
      case 'deny':
      case 'expire':
      case 'cancel':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'capture':
      case 'settlement':
        return 'success';
      case 'pending':
        return 'pending';
      case 'deny':
      case 'expire':
      case 'cancel':
        return 'failed';
      default:
        return 'pending';
    }
  };

  const getStatusTitle = (status) => {
    switch (status) {
      case 'capture':
      case 'settlement':
        return 'Transaksi Berhasil!';
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'deny':
        return 'Transaksi Ditolak';
      case 'expire':
        return 'Transaksi Kadaluarsa';
      case 'cancel':
        return 'Transaksi Dibatalkan';
      default:
        return 'Status Transaksi';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'capture':
      case 'settlement':
        return 'Pembayaran Anda telah berhasil diproses. Pesanan akan segera kami kirim. Terima kasih atas kepercayaan Anda!';
      case 'pending':
        return 'Pembayaran Anda sedang menunggu konfirmasi. Silakan selesaikan pembayaran sesuai instruksi yang diberikan.';
      case 'deny':
        return 'Pembayaran Anda ditolak. Silakan hubungi bank atau coba metode pembayaran lain.';
      case 'expire':
        return 'Waktu pembayaran telah habis. Silakan lakukan pemesanan ulang.';
      case 'cancel':
        return 'Transaksi telah dibatalkan. Jika ini bukan tindakan Anda, silakan hubungi customer service.';
      default:
        return 'Status transaksi Anda sedang diproses.';
    }
  };

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('transaction_status') || 'unknown';
    const orderId = urlParams.get('order_id') || 'N/A';
    
    console.log('Payment Callback Debug:', {
      status,
      orderId,
      isAdmin: localStorage.getItem('arumi_admin_authenticated') === 'true'
    });
    
    setTransactionData({
      orderId: orderId,
      statusCode: urlParams.get('status_code') || 'N/A',
      transactionStatus: status,
    });

    // Auto-redirect immediately for successful transactions
    if (status === 'capture' || status === 'settlement') {
      const isAdmin = localStorage.getItem('arumi_admin_authenticated') === 'true';
      console.log('Successful transaction detected, redirecting to dashboard...');
      
      // Redirect after 3 seconds instead of waiting for countdown
      setTimeout(() => {
        if (isAdmin) {
          console.log('Redirecting to admin dashboard...');
          window.location.href = '/?view=admin';
        } else {
          console.log('Redirecting to home (not admin)...');
          window.location.href = '/';
        }
      }, 3000);
    }

    // Start countdown for non-successful transactions
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (status === 'capture' || status === 'settlement') {
            // This is a backup redirect
            const isAdmin = localStorage.getItem('arumi_admin_authenticated') === 'true';
            if (isAdmin) {
              window.location.href = '/?view=admin';
            } else {
              window.location.href = '/';
            }
          } else {
            closeWindow();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { orderId, statusCode, transactionStatus } = transactionData;
  const icon = getStatusIcon(transactionStatus);
  const statusClass = getStatusClass(transactionStatus);
  const title = getStatusTitle(transactionStatus);
  const message = getStatusMessage(transactionStatus);

  return (
    <div className="payment-callback-container">
      <div className="callback-card">
        <div className={`callback-icon ${statusClass}`}>{icon}</div>
        <h1 className="callback-title">{title}</h1>
        <p className="callback-message">{message}</p>

        <div className="order-info">
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Status Code:</strong> {statusCode}
          </p>
          <p>
            <strong>Status Transaksi:</strong> {transactionStatus}
          </p>
          <p>
            <strong>Waktu:</strong> {new Date().toLocaleString('id-ID')}
          </p>
        </div>

        <p className="callback-question">Apakah Anda ingin kembali ke halaman website?</p>

        <div className="callback-buttons">
          <button
            className="btn-callback btn-primary"
            onClick={redirectToHome}
          >
            🏠 Kembali ke Website
          </button>
          {(transactionStatus === 'capture' || transactionStatus === 'settlement') && (
            <button
              className="btn-callback btn-success"
              onClick={redirectToDashboard}
            >
              📊 Lihat Dashboard
            </button>
          )}
          <button
            className="btn-callback btn-secondary"
            onClick={closeWindow}
          >
            ✖️ Tutup Halaman
          </button>
        </div>

        <div className="callback-countdown">
          {(transactionStatus === 'capture' || transactionStatus === 'settlement') 
            ? `Akan dialihkan ke dashboard dalam ${countdown} detik...`
            : `Halaman akan tertutup otomatis dalam ${countdown} detik`
          }
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
