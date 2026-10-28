import React from 'react';
import { Link } from 'react-router-dom';

const h = React.createElement;

function VideoCard({ video }) {
  const channelUrl = `/channel/${encodeURIComponent(video.channel || 'Kanal')}`;
  const avatar = video.channelAvatar || '';

  return h('article', { className: 'group min-w-0' },
    h(Link, { to: `/watch/${video.id}`, className: 'block overflow-hidden rounded-xl bg-gray-100 aspect-video relative' },
      h('img', {
        src: video.thumbnail,
        alt: video.title,
        className: 'w-full h-full object-cover group-hover:rounded-none transition-all'
      }),
      video.duration && h('span', { className: 'absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded' }, video.duration)
    ),
    h('div', { className: 'flex gap-3 mt-3' },
      h(Link, {
        to: channelUrl,
        title: video.channel,
        className: 'w-9 h-9 rounded-full bg-gray-200 text-gray-700 font-semibold flex items-center justify-center text-sm flex-shrink-0 overflow-hidden'
      },
        avatar
          ? h('img', { src: avatar, alt: '', className: 'w-full h-full object-cover' })
          : (video.channel || 'U').charAt(0).toUpperCase()
      ),
      h('div', { className: 'min-w-0 flex-1' },
        h(Link, { to: `/watch/${video.id}`, className: 'text-sm font-semibold text-gray-900 line-clamp-2 leading-5 hover:text-gray-700' }, video.title),
        h(Link, { to: channelUrl, className: 'block text-xs text-gray-600 mt-1 truncate hover:text-gray-900' }, video.channel),
        h('p', { className: 'text-xs text-gray-500 mt-0.5' }, `${video.views || '0 views'} · ${video.time || 'Just now'}`)
      )
    )
  );
}

export default VideoCard;
