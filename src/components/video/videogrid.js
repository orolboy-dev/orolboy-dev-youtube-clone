import React, { useContext } from 'react';
import VideoCard from './videocard.js';
import { AppContext } from '../../context/appcontext.js';

const h = React.createElement;

const mockVideos = [
  {
    id: '1',
    category: 'Sports',
    title: 'ПСЖ – Барселона. Обзор матча Лиги чемпионов. 20.10.2026',
    channelTitle: 'Qsport Uzbekistan',
    views: '682K views',
    time: '14h ago',
    duration: '11:13',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=60',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    category: 'Gaming',
    title: 'BUTUN DUNYO URUSH QA\'RIDAI - Call of Duty: Modern Warfare® 4 (LIVE)',
    channelTitle: 'FEZOT',
    views: '447 watching',
    time: 'LIVE',
    duration: 'LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60',
    channelAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    category: 'Music',
    title: 'Lana Del Rey Late Night Drive Songs',
    channelTitle: 'unaccept',
    views: '5.8M views',
    time: '11mo ago',
    duration: '46:41',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '4',
    category: 'Live',
    title: 'OMONAT | Nasriddinning sarguzashtlari (Multfilm)',
    channelTitle: 'Bolajon Telekanali',
    views: '715K views',
    time: '8mo ago',
    duration: '11:22',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60',
    channelAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '5',
    category: 'Gaming',
    title: 'GTA 6 Gameplay Trailer Breakdown & Secrets',
    channelTitle: 'Gamer Zone',
    views: '1.2M views',
    time: '2 days ago',
    duration: '18:45',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=60',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '6',
    category: 'Coding',
    title: 'React.js Full Course 2026 - Build Modern Web Apps',
    channelTitle: 'Code Master',
    views: '350K views',
    time: '1 week ago',
    duration: '2:15:00',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60',
    channelAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60'
  }
];

function VideoGrid() {
  const { selectedCategory } = useContext(AppContext);

  const filteredVideos = selectedCategory === 'All'
    ? mockVideos
    : mockVideos.filter((v) => v.category === selectedCategory);

  return h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 px-6 py-6' },
    filteredVideos.map((video) => h(VideoCard, { key: video.id, video }))
  );
}

export default VideoGrid;