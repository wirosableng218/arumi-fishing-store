import midtransClient from 'midtrans-client';

export async function POST(request) {
  try {
    const { product_id, price, name, email, phone } = await request.json();

    // Initialize Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY || 'YOUR-SERVER-KEY-HERE',
      clientKey: process.env.MIDTRANS_CLIENT_KEY || 'YOUR-CLIENT-KEY-HERE',
    });

    const parameter = {
      transaction_details: {
        order_id: 'order-' + Math.floor(Date.now() * Math.random()).toString(36),
        gross_amount: price,
      },
      item_details: [
        {
          id: product_id.toString(),
          price: price,
          quantity: 1,
          name: name,
        },
      ],
      customer_details: {
        first_name: 'Customer',
        last_name: name.split(' ')[0] || 'Umpan',
        email: email || 'arumifishing7@gmail.com',
        phone: phone || '088291675664',
      },
      credit_card: { secure: true },
      enabled_payments: ['credit_card', 'gopay', 'bank_transfer', 'mandiri_clickpay'],
    };

    const transaction = await snap.createTransaction(parameter);

    return Response.json({
      success: true,
      snapToken: transaction.token,
    });
  } catch (error) {
    console.error('Error generating Snap token:', error);
    return Response.json(
      {
        success: false,
        error: error.message || 'Failed to generate Snap token',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    message: 'Midtrans Token API is running',
    endpoint: '/api/token',
    method: 'POST',
  });
}
