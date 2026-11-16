require "minitest/autorun"
require_relative "lib/tokmeme_caption_svg"
class PackageTest < Minitest::Test
  def test_svg
    svg = TokMemeCaptionSvg.render(top: "Hello", bottom: "World")
    assert_match(/<svg/, svg)
  end
end
