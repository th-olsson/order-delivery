// Converts string to url-friendly slug
export function strToSlug(str: string) {
  return str.toLowerCase().replace(/ /g, '-');
}