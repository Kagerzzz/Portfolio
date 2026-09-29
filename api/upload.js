import { put } from '@vercel/blob';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_aHZSuRWI1KYBGeY1_xPNUCHp3JzoMgGR0Flm9qK3K1xN3aX";

export const config = {
  api: {
    bodyParser: false, // Handled as stream
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-filename');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = req.headers['x-filename'] || `upload-${Date.now()}.png`;
    const blob = await put(filename, req, {
      access: 'private',
      addRandomSuffix: true,
      token: BLOB_TOKEN,
    });

    return res.status(200).json(blob);
  } catch (error) {
    console.error('Upload to Vercel Blob failed:', error);
    return res.status(500).json({ error: error.message });
  }
}
