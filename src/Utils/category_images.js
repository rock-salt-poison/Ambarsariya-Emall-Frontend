// Dynamically load all images in the category_images directory
const images = require.context('./images/category_images', false, /\.webp$/);

const categoryImages = images.keys().reduce((acc, path) => {
  const categoryName = path.replace('./', '').replace('.webp', ''); // Extract category name
  acc[categoryName] = images(path);
  return acc;
}, {});

const normalizeKey = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

// Helper function to get image for a category
export const getCategoryImage = (categoryName) => {
  if (!categoryName) return null;
  if (categoryImages[categoryName]) return categoryImages[categoryName];

  const targetKey = normalizeKey(categoryName);
  const matchedName = Object.keys(categoryImages).find(
    (name) => normalizeKey(name) === targetKey
  );

  return matchedName ? categoryImages[matchedName] : null;
};

export default categoryImages;

