// Same rotating accent set used across the app — deep jewel tones, never one
// dominant color.
const ACCENTS = ['#A6395F', '#1F5C78', '#B9760F', '#2E6B4C']

export const CATEGORIES = [
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Shoes',
  'Accessories',
  'Other',
].map((label, i) => ({
  value: label,
  label,
  color: ACCENTS[i % ACCENTS.length],
}))

export const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter', 'All-season']

export const OCCASIONS = ['Casual', 'Work', 'Formal', 'Athletic', 'Other']

export function colorForCategory(category) {
  const match = CATEGORIES.find((c) => c.value === category)
  return match ? match.color : '#8A7052'
}
