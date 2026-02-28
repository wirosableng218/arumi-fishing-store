import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ products, onUpdateProducts, onClose }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image: '',
    imageType: 'url', // 'url' | 'upload'
  });
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Format file tidak didukung! Gunakan JPG, PNG, GIF, atau WebP');
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert('Ukuran file terlalu besar! Maksimal 2MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData((prev) => ({
        ...prev,
        image: base64String,
      }));
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleImageTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      imageType: type,
      image: '',
    }));
    setImagePreview('');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      id: Date.now(),
      name: '',
      price: '',
      description: '',
      image: '',
      imageType: 'url',
    });
    setImagePreview('');
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      imageType: product.image.startsWith('data:') ? 'upload' : 'url',
    });
    setImagePreview(product.image);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updatedProducts = products.filter((p) => p.id !== productId);
      onUpdateProducts(updatedProducts);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description) {
      alert('Mohon lengkapi semua field!');
      return;
    }

    const productData = {
      id: editingProduct ? editingProduct.id : formData.id,
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      image: formData.image || 'https://via.placeholder.com/300x200/4a90e2/ffffff?text=Produk',
    };

    let updatedProducts;
    if (editingProduct) {
      // Update existing product
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? productData : p));
    } else {
      // Add new product
      updatedProducts = [...products, productData];
    }

    onUpdateProducts(updatedProducts);
    setShowForm(false);
    setFormData({
      id: '',
      name: '',
      price: '',
      description: '',
      image: '',
      imageType: 'url',
    });
    setImagePreview('');
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      id: '',
      name: '',
      price: '',
      description: '',
      image: '',
      imageType: 'url',
    });
    setImagePreview('');
    setEditingProduct(null);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛠️ Panel Admin - Manajemen Produk</h1>
        <button
          className="close-admin-btn"
          onClick={onClose}
        >
          ✕ Tutup Admin
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-actions">
          <button
            className="add-product-btn"
            onClick={handleAddProduct}
          >
            ➕ Tambah Produk Baru
          </button>
          <div className="product-count">
            Total Produk: <strong>{products.length}</strong>
          </div>
        </div>

        {showForm && (
          <div className="product-form-modal">
            <div className="product-form-card">
              <h2>{editingProduct ? '✏️ Edit Produk' : '➕ Tambah Produk Baru'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nama Produk *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Umpan Cacing Segar"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Harga (Rp) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="15000"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Deskripsi *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Deskripsi produk..."
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gambar Produk</label>
                  <div className="image-input-tabs">
                    <button
                      type="button"
                      className={`tab-btn ${formData.imageType === 'upload' ? 'active' : ''}`}
                      onClick={() => handleImageTypeChange('upload')}
                    >
                      📤 Upload File
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${formData.imageType === 'url' ? 'active' : ''}`}
                      onClick={() => handleImageTypeChange('url')}
                    >
                      🔗 URL Gambar
                    </button>
                  </div>

                  {formData.imageType === 'upload' ? (
                    <div className="upload-area">
                      <input
                        type="file"
                        id="imageFile"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleFileUpload}
                        className="file-input"
                      />
                      <label
                        htmlFor="imageFile"
                        className="file-label"
                      >
                        <div className="upload-icon">📁</div>
                        <div className="upload-text">
                          <strong>Klik untuk upload gambar</strong>
                          <br />
                          <small>Format: JPG, PNG, GIF, WebP (Max 2MB)</small>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="url-input"
                      />
                      <small>Masukkan URL gambar atau kosongkan untuk gambar default</small>
                    </>
                  )}
                </div>

                {(imagePreview || formData.image) && (
                  <div className="image-preview">
                    <div className="preview-label">Preview Gambar:</div>
                    <img
                      src={imagePreview || formData.image}
                      alt="Preview"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/ccc/666?text=Error+Loading+Image';
                      }}
                    />
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                  >
                    {editingProduct ? '💾 Update Produk' : '➕ Tambah Produk'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image || 'https://via.placeholder.com/80x60/cccccc/666?text=No+Image'}
                      alt={product.name}
                      className="product-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://via.placeholder.com/80x60/cccccc/666?text=No+Image';
                      }}
                    />
                  </td>
                  <td className="product-name-col">{product.name}</td>
                  <td className="price-col">Rp {product.price.toLocaleString()}</td>
                  <td className="description-col">{product.description}</td>
                  <td className="actions-col">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditProduct(product)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="empty-state">
              <p>📦 Belum ada produk. Klik "Tambah Produk Baru" untuk mulai menambahkan katalog.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
