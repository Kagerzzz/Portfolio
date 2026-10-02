import { get, put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptJsPath = path.join(__dirname, '..', 'js', 'script.js');

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_aHZSuRWI1KYBGeY1_xPNUCHp3JzoMgGR0Flm9qK3K1xN3aX";

async function main() {
  console.log("🔄 Starting TaskSync database sync to Vercel Blob Store (store_aHZSuRWI1KYBGeY1)...");

  // 1. Read script.js to extract all PROJECTS_DATA
  const scriptContent = fs.readFileSync(scriptJsPath, 'utf8');
  
  // Extract PROJECTS_DATA safely by finding the array block
  const match = scriptContent.match(/const PROJECTS_DATA = (\[[\s\S]*?\n\];)/);
  if (!match) {
    throw new Error("Could not find PROJECTS_DATA in script.js");
  }

  // Evaluate the extracted array safely
  const evaluatedProjects = eval(match[1]);
  console.log(`📋 Found ${evaluatedProjects.length} projects in local PROJECTS_DATA.`);

  const tasksyncProject = evaluatedProjects.find(p => p.id === 'tasksync');
  if (!tasksyncProject) {
    throw new Error("TaskSync project not found in PROJECTS_DATA");
  }

  // Normalize project structure for Vercel Blob / Admin Dashboard
  const tasksyncPayload = {
    ...tasksyncProject,
    image_url: tasksyncProject.image || "assets/tasksync/tasksync-cover.png"
  };

  // 2. Fetch current projects.json from Vercel Blob
  let existingProjects = [];
  try {
    console.log("📡 Fetching existing projects.json from Vercel Blob...");
    const blob = await get('projects.json', {
      access: 'private',
      token: BLOB_TOKEN,
      useCache: false
    });

    if (blob) {
      existingProjects = await new Response(blob.stream).json();
      console.log(`✅ Current Vercel Blob contains ${existingProjects.length} projects:`, existingProjects.map(p => p.id));
    } else {
      console.log("ℹ️ No existing projects.json found in Vercel Blob. Will initialize new.");
    }
  } catch (err) {
    console.warn("⚠️ Note while fetching blob (might not exist yet):", err.message);
  }

  // 3. Merge TaskSync: If exists, update; if not, prepend at index 0
  const existingIndex = existingProjects.findIndex(p => p.id === 'tasksync');
  let updatedList;
  if (existingIndex >= 0) {
    console.log(`🔄 TaskSync already exists in Blob at index ${existingIndex}. Updating content...`);
    existingProjects[existingIndex] = tasksyncPayload;
    updatedList = existingProjects;
  } else {
    console.log(`➕ Prepending TaskSync as the flagship #1 project in Blob Store...`);
    // If existing list is empty, populate with all projects from PROJECTS_DATA
    if (existingProjects.length === 0) {
      updatedList = evaluatedProjects.map(p => ({
        ...p,
        image_url: p.image || p.image_url || 'assets/saas.png'
      }));
    } else {
      updatedList = [tasksyncPayload, ...existingProjects];
    }
  }

  // 4. Save updated list back to Vercel Blob
  console.log(`💾 Uploading updated list of ${updatedList.length} projects to Vercel Blob...`);
  const result = await put('projects.json', JSON.stringify(updatedList, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    token: BLOB_TOKEN
  });

  console.log("🎉 SUCCESS: TaskSync successfully synced to Vercel Blob database!");
  console.log("Blob URL:", result.url);
  console.log("Total projects in Blob:", updatedList.length);
  updatedList.forEach((p, idx) => {
    console.log(`  [${idx + 1}] ID: ${p.id} | Title: ${p.title.substring(0, 40)}...`);
  });
}

main().catch(err => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
