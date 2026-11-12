/** Add a study's styles without changing the selected design's base classes. */
export function designClasses(base: Record<string, string>, overrides?: Record<string, string>): Record<string, string> {
  if (!overrides) return base;
  return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, overrides[key] ? `${value} ${overrides[key]}` : value]));
}
