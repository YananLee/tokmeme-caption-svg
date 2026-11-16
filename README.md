# TokMeme caption SVG

Create a simple captioned meme SVG locally. Pass an HTTPS image URL or supported image data URL, or use a solid background. This package does not fetch templates or use TokMeme's AI services. For meme discovery, templates, and editing, use [TokMeme](https://tokmeme.com/).

```sh
npm install tokmeme-caption-svg
```

```js
import { renderMeme } from 'tokmeme-caption-svg';
import { writeFileSync } from 'node:fs';

writeFileSync('meme.svg', renderMeme({ top: 'WHEN IT WORKS', bottom: 'ON THE FIRST TRY' }));
```

Options: `width`, `height`, and `background`. Remote image URLs remain external references in the SVG. MIT licensed, no runtime dependencies.

RubyGems source and tests are in [`ruby/`](./ruby/). Install with `gem install tokmeme_caption_svg`.
