import React, { useContext } from 'react';
import { AppContext } from '../context/appcontext.js';
import VideoCard from '../components/video/videocard.js';

const h = React.createElement;

function Subscriptions() {
  const { videos, subscriptions } = useContext(AppContext);
  const followedChannels = new Set(subscriptions.map((subscription) => subscription.name));
  const subscribedVideos = videos.filter((video) => followedChannels.has(video.channel));

  return h('main', { className: 'flex-1 min-w-0 bg-white h-[calc(100vh-56px)] overflow-y-auto px-4 sm:px-7 py-6' },
    h('h1', { className: 'text-2xl font-bold text-gray-900 mb-5' }, 'Subscriptions'),
    subscribedVideos.length
      ? h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10' },
          subscribedVideos.map((video) => h(VideoCard, { key: video.id, video }))
        )
      : h('div', { className: 'py-20 text-center text-gray-500' },
          h('p', { className: 'font-semibold text-gray-800' }, 'Obuna bo‘lgan kanallaringizda yangi video yo‘q'),
          h('p', { className: 'text-sm mt-2' }, 'Kanal sahifasiga o‘tib Subscribe tugmasini bosing.')
        )
  );
}

export default Subscriptions;
