import React from 'react';
import CategoryTabs from '../components/categorytabs.js';
import VideoGrid from '../components/video/videogrid.js';

const h = React.createElement;

function Home() {
  return h('div', { className: 'flex-1 flex flex-col h-[calc(100vh-56px)] overflow-y-auto' },
    h(CategoryTabs),
    h(VideoGrid)
  );
}

export default Home;