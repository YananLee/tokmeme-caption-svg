import unittest
from xml.etree import ElementTree
from tokmeme_caption_svg import render_meme

class RenderTests(unittest.TestCase):
    def test_svg(self):
        svg = render_meme(top="TOP", bottom="BOTTOM")
        self.assertEqual(ElementTree.fromstring(svg).tag, "{http://www.w3.org/2000/svg}svg")

if __name__ == "__main__": unittest.main()
