/**
 * Vercel Blob Store Configuration & Client Helpers
 * Store ID: store_aHZSuRWI1KYBGeY1
 */

const VERCEL_BLOB_CONFIG = {
  storeId: "store_aHZSuRWI1KYBGeY1",
  token: "vercel_blob_rw_aHZSuRWI1KYBGeY1_xPNUCHp3JzoMgGR0Flm9qK3K1xN3aX",
  apiUrl: "/api/projects"
};

/**
 * Fetch projects from Vercel Blob via API Route
 */
async function fetchProjectsFromVercelBlob() {
  try {
    const response = await fetch(VERCEL_BLOB_CONFIG.apiUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      console.log('✅ Loaded', data.length, 'projects from Vercel Blob Store!');
      return data;
    }
    return null;
  } catch (error) {
    console.warn('⚠️ Could not load from Vercel Blob API (using static fallback):', error.message);
    return null;
  }
}

/**
 * Save updated projects list to Vercel Blob
 */
async function saveProjectsToVercelBlob(projectsArray) {
  try {
    const response = await fetch(VERCEL_BLOB_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(projectsArray)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Successfully saved projects to Vercel Blob!', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to save projects to Vercel Blob:', error);
    throw error;
  }
}
