"""Caption SVG for TokMeme workflows."""
from html import escape
import re


def render_meme(top="", bottom="", *, image_url="", width=800, height=800, background="#222222"):
    if not isinstance(top, str) or not isinstance(bottom, str) or (not top.strip() and not bottom.strip()) or len(top) > 100 or len(bottom) > 100:
        raise ValueError("provide at least one caption of at most 100 characters")
    if not isinstance(width, int) or width < 200 or not isinstance(height, int) or height < 200 or not re.fullmatch(r"#[0-9a-fA-F]{6}", background):
        raise ValueError("invalid options")
    if image_url and (not isinstance(image_url, str) or not re.fullmatch(r'https://[^\s"<>]+|data:image/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+', image_url)):
        raise ValueError("image_url must be HTTPS or supported image data")
    size = max(28, min(58, round(width / 14)))
    label = escape(" / ".join(x for x in (top, bottom) if x), quote=True)
    image = f'<image href="{escape(image_url, quote=True)}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/>' if image_url else ""
    def caption(value, y, baseline):
        if not value: return ""
        return f'<text x="50%" y="{y}" text-anchor="middle" dominant-baseline="{baseline}" font-family="Impact,Arial Black,sans-serif" font-weight="900" font-size="{size}" fill="#ffffff" stroke="#000000" stroke-width="5" paint-order="stroke">{escape(value)}</text>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{label}"><rect width="100%" height="100%" fill="{background}"/>{image}{caption(top,24,"hanging")}{caption(bottom,height-24,"text-after-edge")}</svg>'
