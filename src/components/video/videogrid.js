import React, { useContext } from 'react';
import VideoCard from './videocard.js';
import { AppContext } from '../../context/appcontext.js';

const h = React.createElement;

const CATEGORY_KEYWORDS = {
  Gaming: ['gaming', 'game', 'pubg', 'minecraft', 'counter', 'cs', 'dota', 'gta', 'o\'yin', 'play'],
  Music: ['music', 'song', 'musiqa', 'qo\'shiq', 'track', 'remix', 'concert', 'sing'],
  Live: ['live', 'stream', 'prayamoy', 'jonli'],
  News: ['news', 'yangilik', 'xabar', 'dunyoda'],
  Coding: ['coding', 'react', 'js', 'programming', 'code', 'python', 'css', 'html', 'dars'],
  Sports: ['sports', 'football', 'ufc', 'match', 'sport', 'futbol'],
  Podcasts: ['podcast', 'suhbat', 'interview']
};

function VideoGrid() {
  const { videos, selectedCategory } = useContext(AppContext);

  // Home sahifasida faqat long videolar ko'rsatiladi.
  const filteredVideos = (videos || []).filter(video => {
    if (selectedCategory === 'All') return true;

    const category = selectedCategory.toLowerCase();
    const title = (video.title || '').toLowerCase();
    const videoCategory = (video.category || '').toLowerCase();
    const hashtag = (video.hashtag || '').toLowerCase();

    if (videoCategory === category || hashtag.includes(category)) return true;
    return (CATEGORY_KEYWORDS[selectedCategory] || []).some(keyword => title.includes(keyword));
  });

  if (!filteredVideos.length) {
    return h('div', { className: 'px-4 py-16 text-center text-gray-500' }, 'Bu bo‘limda hozircha videolar yo‘q.');
  }

  return h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 px-4 py-5' },
    filteredVideos.map(video => 
      h(VideoCard, { key: video.id, video: video })
    )
  );
}

export default VideoGrid;