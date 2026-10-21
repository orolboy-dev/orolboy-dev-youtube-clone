import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const h = React.createElement;

function VideoCard({ video }) {
  return h(Link, { to: `/watch/${video.id}`, className: 'flex flex-col gap-2 cursor-pointer group' },
    h('div', { className: 'relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden' },
      h('img', { 
        src: video.thumbnail, 
        alt: video.title, 
        className: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-200',
        onError: (e) => {
          e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60';
        }
      }),
      video.duration && h('span', { className: 'absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium' }, video.duration)
    ),
    h('div', { className: 'flex gap-3 mt-1' },
      h('div', { className: 'w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden' },
        h('img', { src: video.channelAvatar, alt: video.channelTitle, className: 'w-full h-full object-cover' })
      ),
      h('div', { className: 'flex flex-col flex-1 overflow-hidden' },
        h('h3', { className: 'text-sm font-semibold text-gray-900 line-clamp-2 leading-tight' }, video.title),
        h('div', { className: 'flex items-center gap-1 mt-1 text-xs text-gray-600' },
          h('span', { className: 'truncate' }, video.channelTitle),
          h(CheckCircle, { className: 'w-3.5 h-3.5 text-gray-600 fill-gray-600/20 shrink-0' })
        ),
        h('div', { className: 'text-xs text-gray-600' },
          h('span', null, video.views),
          h('span', { className: 'mx-1' }, '•'),
          h('span', null, video.time)
        )
      )
    )
  );
}

export default VideoCard;