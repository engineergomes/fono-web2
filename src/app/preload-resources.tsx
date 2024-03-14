'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  ReactDOM.preload('/clean-gray-paper.webp', { as: 'image' });

  return null;
}
