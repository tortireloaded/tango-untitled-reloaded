/**
 * Link helper — prefixes URLs with ASTRO_BASE so the site works on
 * both GH Pages subpath preview and root-domain production.
 *
 * IMPORTANT (Astro 7 gotcha): the `base` config option does NOT prefix
 * `<a href="/x">` in the rendered HTML — only asset URLs (`/_astro/...`).
 * Use this helper everywhere instead of hardcoded absolute paths.
 */
const BASE = (process.env.ASTRO_BASE ?? '/').replace(/\/$/, '');
const buildLink = (href) => {
  if (!href) return BASE + '/';
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return href;
  if (href.startsWith('#')) return href;
  const clean = href.startsWith('/') ? href : '/' + href;
  if (clean === '/') return BASE + '/';
  return BASE + clean;
};

export { buildLink };
export const SITE_NAME_EN = 'Tango Untitled';
export const SITE_NAME_ZH = '無題探戈';
export const SITE_NAME_FULL = 'Tango Untitled · 無題探戈';
export const SITE_TAGLINE = 'Argentine Tango Hong Kong';
export const CONTACT_EMAIL = 'tango.untitled@gmail.com';
export const STUDIO_ADDRESS = "18/F, 361 Queen's Road Central, Nan Dao Commercial Building, Sheung Wan, Hong Kong";
export const PRACTICA_VENUE = 'Dance Concept, 7/F, Great Smart Tower, 230 Wanchai Road, Wan Chai, Hong Kong';
export const COUPON_BBTRIAL = 'BBTRIALCLASS';
