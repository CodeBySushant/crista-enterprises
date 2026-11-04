/** Tiny className joiner. */
export default function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
