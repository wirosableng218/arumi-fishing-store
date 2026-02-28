import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Halo! Selamat datang di Arumi Fishing Store. Ada yang bisa saya bantu? 😊',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const autoReply = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Auto-reply untuk stok barang
    if (message.includes('stok') || message.includes('ada') || message.includes('tersedia')) {
      return 'Untuk informasi stok terbaru, silakan cek halaman produk kami. Jika ada barang yang tidak tersedia, kami bisa memesannya khusus untuk Anda! 📦';
    }

    // Auto-reply untuk permintaan barang
    if (message.includes('pesan') || message.includes('order') || message.includes('minta') || message.includes('permintaan')) {
      return 'Kami menerima pesanan khusus! Silakan beri tahu barang apa yang Anda butuhkan, dan kami akan cek ketersediaannya. 🎣';
    }

    // Auto-reply untuk harga
    if (message.includes('harga') || message.includes('berapa') || message.includes('mahal') || message.includes('murah')) {
      return 'Harga produk kami sangat kompetitif! Silakan cek halaman produk untuk melihat harga terbaru. Ada diskon khusus untuk pembelian dalam jumlah banyak! 💰';
    }

    // Auto-reply untuk pengiriman
    if (message.includes('kirim') || message.includes('ongkir') || message.includes('pengiriman') || message.includes('jne') || message.includes('jnt')) {
      return 'Kami melayani pengiriman ke seluruh Indonesia! Ongkir dihitung berdasarkan lokasi dan berat barang. Gratis ongkir untuk pembelian di atas Rp 500.000! 🚚';
    }

    // Auto-reply untuk garansi
    if (message.includes('garansi') || message.includes('return') || message.includes('tukar') || message.includes('ganti')) {
      return 'Semua produk kami bergaransi! Jika ada kerusakan atau tidak sesuai, bisa ditukar dalam 7 hari. Customer satisfaction adalah prioritas kami! ✅';
    }

    // Auto-reply untuk umpan
    if (message.includes('umpan') || message.includes('cacing') || message.includes('pelet') || message.includes('lure')) {
      return 'Kami punya berbagai jenis umpan pancing berkualitas! Mulai dari umpan alami, pelet, hingga lure import. Ada yang khusus untuk ikan air tawar dan laut! 🐟';
    }

    // Auto-reply untuk reel dan rod
    if (message.includes('reel') || message.includes('rod') || message.includes('joran') || message.includes('spinning')) {
      return 'Kami menyediakan reel dan rod dari berbagai merek ternama! Mulai dari Shimano, Daiwa, hingga produk lokal berkualitas. Ada yang sesuai untuk pemula hingga profesional! 🎣';
    }

    // Auto-reply default
    const defaultReplies = [
      'Terima kasih atas pertanyaannya! Tim customer service kami akan segera merespons. Sementara itu, silakan cek katalog produk kami! 😊',
      'Pertanyaan bagus! Untuk informasi lebih detail, silakan hubungi WhatsApp kami di 0882-9167-5664 atau email ke arumifishing7@gmail.com 📞',
      'Kami siap membantu! Apakah ada produk spesifik yang ingin Anda tanyakan? Silakan sebutkan nama atau kategori produknya! 🛍️',
      'Terima kasih sudah menghubungi kami! Tim kami akan segera merespons pertanyaan Anda. Jangan ragu untuk bertanya lebih lanjut! 💬',
    ];

    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        text: autoReply(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <img
                src="/cs.png"
                alt="Customer Service"
                className="avatar-image"
              />
            </div>
            <div className="chat-header-text">
              <h3>Arumi Fishing Store</h3>
              <p>Online • Siap membantu</p>
            </div>
          </div>
          <button
            className="chat-close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tanyakan tentang stok, harga, atau produk..."
              className="message-input"
            />
            <button
              onClick={handleSendMessage}
              className="send-btn"
              disabled={inputMessage.trim() === ''}
            >
              <span>📤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
