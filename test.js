import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMeme } from './index.js';

test('renders captions safely', () => {
  const svg = renderMeme({ top: 'WHEN <CODE>', bottom: 'WORKS & SHIPS' });
  assert.match(svg, /WHEN &lt;CODE&gt;/);
  assert.match(svg, /WORKS &amp; SHIPS/);
});

test('rejects script URLs', () => assert.throws(() => renderMeme({ top: 'Hi', imageUrl: 'javascript:alert(1)' })));
