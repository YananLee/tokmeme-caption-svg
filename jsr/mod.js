/* @ts-self-types="./mod.d.ts" */
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

/** Render top and bottom captions on a solid background or image URL. */
export function renderMeme({ top = '', bottom = '', imageUrl = '' } = {}, options = {}) {
  const { width = 800, height = 800, background = '#222222' } = options;
  if (!String(top).trim() && !String(bottom).trim()) throw new TypeError('at least one caption is required');
  if (String(top).length > 100 || String(bottom).length > 100) throw new TypeError('captions must be at most 100 characters');
  if (!Number.isInteger(width) || width < 200 || !Number.isInteger(height) || height < 200 || !/^#[0-9a-fA-F]{6}$/.test(background)) throw new TypeError('invalid options');
  if (imageUrl && !/^https:\/\/[^\s"<>]+$|^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(imageUrl)) throw new TypeError('imageUrl must be HTTPS or a supported image data URL');
  const fontSize = Math.max(28, Math.min(58, Math.round(width / 14)));
  const label = escapeXml([top, bottom].filter(Boolean).join(' / '));
  const text = (value, y, baseline) => `<text x="50%" y="${y}" text-anchor="middle" dominant-baseline="${baseline}" font-family="Impact,Arial Black,sans-serif" font-weight="900" font-size="${fontSize}" fill="#ffffff" stroke="#000000" stroke-width="5" paint-order="stroke"${value.length > 20 ? ` textLength="${Math.round(width * 0.9)}" lengthAdjust="spacingAndGlyphs"` : ''}>${escapeXml(value)}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}"><rect width="100%" height="100%" fill="${background}"/>${imageUrl ? `<image href="${escapeXml(imageUrl)}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/>` : ''}${top ? text(top, 24, 'hanging') : ''}${bottom ? text(bottom, height - 24, 'text-after-edge') : ''}</svg>`;
}
