import { get, put } from '@vercel/blob';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_aHZSuRWI1KYBGeY1_xPNUCHp3JzoMgGR0Flm9qK3K1xN3aX";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const blob = await get('projects.json', {
        access: 'private',
        token: BLOB_TOKEN,
        useCache: false
      });

      if (!blob) {
        return res.status(404).json({ error: 'projects.json not found in Vercel Blob' });
      }

      const data = await new Response(blob.stream).json();
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      return res.status(200).json(data);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      let bodyData = req.body;
      if (typeof bodyData === 'string') {
        bodyData = JSON.parse(bodyData);
      }

      if (!bodyData) {
        return res.status(400).json({ error: 'Missing projects body payload' });
      }

      const updatedBlob = await put('projects.json', JSON.stringify(bodyData, null, 2), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        token: BLOB_TOKEN
      });

      return res.status(200).json({ success: true, url: updatedBlob.url });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Vercel Blob API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
