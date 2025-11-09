#!/usr/bin/env node
/**
 * Upload data/scraped_software.json into Firestore collection `software`.
 * Usage:
 *   - Ensure GOOGLE_APPLICATION_CREDENTIALS is set to a service account JSON with Firestore permissions,
 *     or run this from an environment with Application Default Credentials (Cloud Shell / CI with permissions).
 *   - npm run upload-data
 */
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

async function main() {
  const file = path.join(__dirname, '..', 'data', 'scraped_software.json');
  if (!fs.existsSync(file)) {
    console.error('scraped_software.json not found at', file);
    process.exit(1);
  }

  const raw = fs.readFileSync(file, 'utf8');
  let items;
  try {
    items = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse JSON:', err.message);
    process.exit(1);
  }

  if (!admin.apps.length) {
    admin.initializeApp({});
  }
  const db = admin.firestore();

  console.log('Uploading', (items || []).length, 'items to Firestore collection `software`');

  const batchLimit = 400; // keep under 500
  let batch = db.batch();
  let ops = 0;
  let batches = 0;

  for (const item of items) {
    const id = item.id || item.title && item.title.toLowerCase().replace(/[^a-z0-9-_]/g, '-') || Math.random().toString(36).slice(2,10);
    const ref = db.collection('software').doc(id);

    // normalize: store lowercase fields to help naive search
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
      console.log('Committed batch', batches);
      batch = db.batch();
      ops = 0;
    }
  }

  if (ops > 0) {
    await batch.commit();
    batches++;
    console.log('Committed final batch', batches);
  }

  console.log('Upload complete. Total batches:', batches);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
