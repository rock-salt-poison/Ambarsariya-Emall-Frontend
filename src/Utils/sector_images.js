// Dynamically load all images in the directory
const images = require.context('./images/sector_images', false, /\.webp$/);

const sectorImages = images.keys().reduce((acc, path) => {
  const sectorName = path.replace('./', '').replace('.webp', ''); // Extract sector name
  acc[sectorName] = images(path);
  return acc;
}, {});

// Helper function to get image
export const getSectorImage = (sectorName) => {
  return sectorImages[sectorName] || null;
};
