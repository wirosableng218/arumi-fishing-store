const midtransClient = require('midtrans-client');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { items, subtotal, discount, total, product_id, price, name, email, phone } = JSON.parse(event.body);

    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    // Backward compatible: jika tidak ada items (keranjang), gunakan single item payload
    let itemDetails = [];
    let grossAmount = 0;
    let customerFirstName = 'Customer';
    let customerLastName = 'Umpan';

    if (Array.isArray(items) && items.length > 0) {
      itemDetails = items.map((it, idx) => ({
        id: (it.id ?? `item-${idx + 1}`).toString(),
        price: Number(it.price) || 0,
        quantity: Number(it.quantity) || 0,
        name: it.name ?? `Produk ${idx + 1}`,
      }));
      const subtotalNum = Number(subtotal) || 0;
      const discountNum = Number(discount) || 0;
      grossAmount = Number(total) || Math.max(subtotalNum - discountNum, 0);
      customerFirstName = 'Customer';
      customerLastName = 'Keranjang';
    } else {
      itemDetails = [
        {
          id: (product_id ?? '1').toString(),
          price: Number(price) || 0,
          quantity: 1,
          name: name ?? 'Umpan',
        },
      ];
      grossAmount = Number(price) || 0;
      customerFirstName = 'Customer';
      customerLastName = (name || 'Umpan').split(' ')[0];
    }

    // Validasi gross amount
    if (grossAmount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Gross amount must be greater than 0',
          grossAmount: grossAmount,
        })
      };
    }

    // Validasi item details
    if (itemDetails.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Item details cannot be empty',
        })
      };
    }

    const parameter = {
      transaction_details: {
        order_id: 'order-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9),
        gross_amount: Math.round(grossAmount),
      },
      item_details: itemDetails,
      customer_details: {
        first_name: customerFirstName || 'Customer',
        last_name: customerLastName || 'Arumi',
        email: email || 'arumifishing7@gmail.com',
        phone: phone || '088291675664',
      },
      credit_card: {
        secure: true,
      },
      enabled_payments: ['credit_card', 'gopay', 'shopeepay', 'bank_transfer', 'echannel', 'bca_klikpay', 'bca_klikbca', 'mandiri_clickpay', 'cimb_clicks', 'bri_epay', 'other_qris'],
      callbacks: {
        finish: process.env.SITE_URL || 'https://your-netlify-site.netlify.app/',
      },
    };

    console.log('Creating transaction with params:', JSON.stringify(parameter, null, 2));
    const transaction = await snap.createTransaction(parameter);
    console.log('Transaction created successfully:', transaction.token);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ snapToken: transaction.token })
    };

  } catch (error) {
    console.error('Midtrans Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message,
        details: error.ApiResponse || error,
      })
    };
  }
};
