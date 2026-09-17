// Vercel serverless function: POST /api/create-checkout-session
//
// Creates a real Stripe Checkout Session for the cart sent from the client
// and returns its URL for the browser to redirect to. The Stripe secret key
// never reaches the browser — it's read here, server-side, from the
// STRIPE_SECRET_KEY environment variable, which must be set in the Vercel
// project's settings (Settings → Environment Variables), never committed.
//
// Deliberately minimal: this only creates the Checkout Session and redirects.
// It does not verify payment status or store orders server-side — Stripe's
// own success/cancel redirect is the only signal the frontend acts on.

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set')
    return res.status(500).json({ error: 'Checkout is not configured.' })
  }

  const { items } = req.body || {}
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' })
  }

  try {
    const line_items = items.map((item) => ({
      quantity: item.qty,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100),
        product_data: { name: item.name },
      },
    }))

    const origin = req.headers.origin || `https://${req.headers.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session error:', err)
    return res.status(500).json({ error: 'Could not create checkout session.' })
  }
}
