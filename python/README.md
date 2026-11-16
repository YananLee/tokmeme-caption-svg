# tokmeme-caption-svg

A small local SVG generator for [TokMeme](https://tokmeme.com/). It does not call the site or provide full video/export functionality.

Install: `pip install tokmeme-caption-svg`.

```python
from tokmeme_caption_svg import render_meme
svg = render_meme(top="TOP", bottom="BOTTOM")
```

MIT licensed.
