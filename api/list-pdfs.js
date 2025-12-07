// This file will run securely on Vercel's Node.js environment.

const cloudinary = require('cloudinary').v2;

// The credentials are read from Vercel's environment variables (hidden from public)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Uses the Admin API with secure credentials
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'raw',
      max_results: 30,
      fields: ['public_id', 'secure_url', 'created_at'],
    });

    const pdfList = result.resources.map(asset => ({
      publicId: asset.public_id,
      url: asset.secure_url,
      uploaded: asset.created_at,
    }));

    // Return the safe list to the React frontend
    res.status(200).json({ assets: pdfList });

  } catch (error) {
    console.error("Cloudinary List Error:", error);
    res.status(500).json({ error: 'Failed to retrieve assets securely.' });
  }
}