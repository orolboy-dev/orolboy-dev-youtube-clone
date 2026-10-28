import React, { useContext } from 'react';
import { AppContext } from '../context/appcontext.js';
import VideoCard from '../components/video/videocard.js';

const h = React.createElement;

function History() {
  const { videos, watchHistory } = useContext(AppContext);
  const historyVideos = watchHistory
    .map((videoId) => videos.find((video) => String(video.id) === String(videoId)))
    .filter(Boolean);

  return h('main', { className: 'flex-1 min-w-0 bg-white h-[calc(100vh-56px)] overflow-y-auto px-4 sm:px-7 py-6' },
    h('h1', { className: 'text-2xl font-bold text-gray-900 mb-5' }, 'History'),
    historyVideos.length
      ? h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10' },
          historyVideos.map((video) => h(VideoCard, { key: video.id, video }))
        )
      : h('div', { className: 'py-20 text-center text-gray-500' }, 'Siz ko‘rgan videolar shu yerda ko‘rinadi.')
  );
}

export default History;
