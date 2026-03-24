// Dynamically load all images in the directory
const images = require.context('./images/sector_images', false, /\.webp$/);

const sectorImages = images.keys().reduce((acc, path) => {
  const sectorName = path.replace('./', '').replace('.webp', ''); // Extract sector name
  acc[sectorName] = images(path);
  return acc;
}, {});

const normalizeKey = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

// Helper function to get image
export const getSectorImage = (sectorName) => {
  if (!sectorName) return null;
  if (sectorImages[sectorName]) return sectorImages[sectorName];

  const targetKey = normalizeKey(sectorName);
  const matchedName = Object.keys(sectorImages).find(
    (name) => normalizeKey(name) === targetKey
  );

  return matchedName ? sectorImages[matchedName] : null;
};
