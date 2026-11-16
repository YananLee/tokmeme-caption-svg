# TokMeme SVG for Ruby

A small local SVG utility. For the full product, visit [TokMeme](https://tokmeme.com/).

```sh
gem install tokmeme_caption_svg
```

```ruby
require "tokmeme_caption_svg"
svg = TokMemeCaptionSvg.render(top: "Hello", bottom: "World")
File.write("output.svg", svg)
```

This gem generates a basic SVG and does not call the website's AI service. MIT licensed; no runtime dependencies.
