const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

const app = express();

if (!admin.apps.length) {
  // Initialize using default credentials. In production this will use the function's service account.
  admin.initializeApp();
}
const db = admin.firestore();

// GET /api/software
// Supports query params: search, category, limit, page, minRating, verified
app.get('/api/software', async (req, res) => {
  try {
    const { category, search, limit = 50, page = 1, minRating, verified } = req.query;

    let q = db.collection('software');
    if (category && category !== 'all') {
      q = q.where('category', '==', category);
    }
    if (verified !== undefined) {
      const v = String(verified).toLowerCase() === 'true';
      q = q.where('isVerified', '==', v);
    }
    if (minRating !== undefined) {
      const r = Number(minRating) || 0;
      q = q.where('rating', '>=', r);
    }

    // Fetch a reasonable cap (we'll paginate in-memory). Firestore limits are handled by `.limit`.
    const cap = 1000;
    const snapshot = await q.limit(cap).get();
    let items = snapshot.docs.map(d => d.data());

    if (search) {
      const s = String(search).toLowerCase();
      items = items.filter(item => (item.title || '').toLowerCase().includes(s) || (item.description || '').toLowerCase().includes(s));
    }

    const lim = Math.min(parseInt(limit, 10) || 50, 500);
    const pg = Math.max(parseInt(page, 10) || 1, 1);
    const start = (pg - 1) * lim;
    const paged = items.slice(start, start + lim);

    res.json({ success: true, data: paged, total: items.length });
  } catch (err) {
    console.error('api/software error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/software/:id
app.get('/api/software/:id', async (req, res) => {
  try {
    const doc = await db.collection('software').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: doc.data() });
  } catch (err) {
    console.error('api/software/:id error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const snapshot = await db.collection('software').select('category').get();
    const categories = Array.from(new Set(snapshot.docs.map(d => d.get('category')).filter(Boolean)));
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error('api/categories error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

exports.api = functions.https.onRequest(app);
