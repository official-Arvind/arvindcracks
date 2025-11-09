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

// POST /api/sync
// Fetches the hosted scraped JSON and writes it into Firestore `software` collection.
// Protect this endpoint by setting a sync key in functions config: `firebase functions:config:set sync.key="YOUR_SECRET"`
app.post('/api/sync', async (req, res) => {
  try {
    // check key
    const provided = req.query.key || req.get('x-sync-key');
    const cfg = functions.config && functions.config().sync;
    const expected = (cfg && cfg.key) || process.env.SYNC_KEY;
    if (!expected || provided !== expected) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const SCRAPED_JSON_URL = 'https://arvindjicracks.web.app/data/scraped_software.json';
    const fetch = require('node-fetch');
    const r = await fetch(SCRAPED_JSON_URL);
    if (!r.ok) return res.status(502).json({ success: false, message: 'Failed to fetch scraped JSON' });
    const items = await r.json();

    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Invalid JSON format' });

    // batch write
    const batchLimit = 400;
    let batch = db.batch();
    let ops = 0;
    let batches = 0;

    for (const item of items) {
      const id = item.id || (item.title && item.title.toLowerCase().replace(/[^a-z0-9-_]/g, '-')) || Math.random().toString(36).slice(2,10);
      const ref = db.collection('software').doc(id);
      const doc = Object.assign({}, item, {
        id,
        title_lower: (item.title || '').toLowerCase(),
        description_lower: (item.description || '').toLowerCase(),
      });
      batch.set(ref, doc, { merge: true });
      ops++;
      if (ops >= batchLimit) {
        await batch.commit();
        batches++;
        batch = db.batch();
        ops = 0;
      }
    }
    if (ops > 0) {
      await batch.commit();
      batches++;
    }

    res.json({ success: true, message: 'Synced', batches });
  } catch (err) {
    console.error('api/sync error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

exports.api = functions.https.onRequest(app);
