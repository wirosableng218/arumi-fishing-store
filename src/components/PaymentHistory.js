import React, { useState, useEffect } from 'react';
import './PaymentHistory.css';

const PaymentHistory = ({ onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, success, failed

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const saved = localStorage.getItem('arumi_transactions');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Sort by date, newest first
      const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sorted);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
      case 'settlement':
      case 'capture':
        return '✅';
      case 'pending':
        return '⏳';
      case 'failed':
      case 'deny':
      case 'expire':
      case 'cancel':
        return '❌';
      default:
        return '❓';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'success':
      case 'settlement':
      case 'capture':
        return 'status-success';
      case 'pending':
        return 'status-pending';
      case 'failed':
      case 'deny':
      case 'expire':
      case 'cancel':
        return 'status-failed';
      default:
        return 'status-unknown';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
      case 'settlement':
      case 'capture':
        return 'Berhasil';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Gagal';
      case 'deny':
        return 'Ditolak';
      case 'expire':
        return 'Kadaluarsa';
      case 'cancel':
        return 'Dibatalkan';
      default:
        return 'Unknown';
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterStatus === 'all') return true;
    return t.status === filterStatus;
  });

  const calculateStats = () => {
    const total = transactions.length;
    const success = transactions.filter((t) =>
      ['success', 'settlement', 'capture'].includes(t.status)
    ).length;
    const pending = transactions.filter((t) => t.status === 'pending').length;
    const failed = transactions.filter((t) =>
      ['failed', 'deny', 'expire', 'cancel'].includes(t.status)
    ).length;
    const totalRevenue = transactions
      .filter((t) => ['success', 'settlement', 'capture'].includes(t.status))
      .reduce((sum, t) => sum + t.total, 0);

    return { total, success, pending, failed, totalRevenue };
  };

  const stats = calculateStats();

  const clearHistory = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat transaksi?')) {
      localStorage.removeItem('arumi_transactions');
      setTransactions([]);
    }
  };

  const deleteTransaction = (id) => {
    if (window.confirm('Hapus transaksi ini?')) {
      const updated = transactions.filter((t) => t.id !== id);
      localStorage.setItem('arumi_transactions', JSON.stringify(updated));
      setTransactions(updated);
    }
  };

  return (
    <div className="payment-history">
      <div className="history-header">
        <h1>📊 Riwayat Pembayaran</h1>
        <button className="close-history-btn" onClick={onClose}>
          ✕ Tutup
        </button>
      </div>

      <div className="history-stats">
        <div className="stat-card total">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Transaksi</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-value">{stats.success}</div>
            <div className="stat-label">Berhasil</div>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="stat-card failed">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <div className="stat-value">{stats.failed}</div>
            <div className="stat-label">Gagal</div>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-value">Rp {stats.totalRevenue.toLocaleString()}</div>
            <div className="stat-label">Total Pendapatan</div>
          </div>
        </div>
      </div>

      <div className="history-controls">
        <div className="filter-tabs">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Semua ({transactions.length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'success' ? 'active' : ''}`}
            onClick={() => setFilterStatus('success')}
          >
            ✅ Berhasil ({stats.success})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            ⏳ Pending ({stats.pending})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'failed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('failed')}
          >
            ❌ Gagal ({stats.failed})
          </button>
        </div>

        <button className="clear-history-btn" onClick={clearHistory}>
          🗑️ Hapus Semua
        </button>
      </div>

      <div className="transactions-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>Belum Ada Transaksi</h3>
            <p>
              {filterStatus === 'all'
                ? 'Belum ada riwayat transaksi. Transaksi akan muncul di sini setelah checkout.'
                : `Tidak ada transaksi dengan status "${getStatusText(filterStatus)}"`}
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-header">
                <div className="transaction-id">
                  <strong>Order #{transaction.orderId || transaction.id}</strong>
                  <span className={`status-badge ${getStatusClass(transaction.status)}`}>
                    {getStatusIcon(transaction.status)} {getStatusText(transaction.status)}
                  </span>
                </div>
                <button
                  className="delete-transaction-btn"
                  onClick={() => deleteTransaction(transaction.id)}
                  title="Hapus transaksi"
                >
                  🗑️
                </button>
              </div>

              <div className="transaction-date">
                📅 {new Date(transaction.date).toLocaleString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="transaction-items">
                <h4>Item yang dibeli:</h4>
                <ul>
                  {transaction.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} = Rp {(item.price * item.quantity).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="transaction-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <strong>Rp {transaction.subtotal.toLocaleString()}</strong>
                </div>
                {transaction.discount > 0 && (
                  <div className="summary-row discount">
                    <span>Diskon:</span>
                    <strong>- Rp {transaction.discount.toLocaleString()}</strong>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total:</span>
                  <strong>Rp {transaction.total.toLocaleString()}</strong>
                </div>
              </div>

              {transaction.email && (
                <div className="transaction-info">
                  <span>📧 {transaction.email}</span>
                  {transaction.phone && <span>📞 {transaction.phone}</span>}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

