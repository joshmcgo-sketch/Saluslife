// Vercel serverless function: GET/POST /api/reviews?productId=...
//
// Shared, cross-visitor product reviews, stored in Upstash Redis (connected
// via the Vercel Marketplace "Upstash Redis" integration). Credentials are
// read from the UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN env vars
// that integration injects automatically — never hardcode them here.
//
// Each product's reviews live in a Redis list under the key
// `reviews:<productId>`, newest first (LPUSH), each entry a JSON string.

import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

function reviewsKey(productId) {
  return `reviews:${productId}`
}

export default async function handler(req, res) {
  const productId = req.method === 'GET' ? req.query.productId : req.body?.productId
  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ error: 'productId is required.' })
  }

  if (req.method === 'GET') {
    try {
      const raw = await redis.lrange(reviewsKey(productId), 0, -1)
      const reviews = raw.map((r) => (typeof r === 'string' ? JSON.parse(r) : r))
      return res.status(200).json({ reviews })
    } catch (err) {
      console.error('Failed to load reviews:', err)
      return res.status(500).json({ error: 'Could not load reviews.' })
    }
  }

  if (req.method === 'POST') {
    const { rating, name, comment } = req.body || {}
    const numericRating = Number(rating)
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ error: 'Rating must be a whole number from 1 to 5.' })
    }

    const review = {
      id: Date.now(),
      rating: numericRating,
      name: (typeof name === 'string' ? name : '').trim().slice(0, 60) || 'Anonymous',
      comment: (typeof comment === 'string' ? comment : '').trim().slice(0, 500),
      date: new Date().toISOString(),
    }

    try {
      await redis.lpush(reviewsKey(productId), JSON.stringify(review))
      return res.status(200).json({ review })
    } catch (err) {
      console.error('Failed to save review:', err)
      return res.status(500).json({ error: 'Could not save review.' })
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}
