import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ChevronRight } from 'lucide-react';
import CategoryTabs from '../components/categorytabs.js';
import VideoGrid from '../components/video/videogrid.js';
import { AppContext } from '../context/appcontext.js';

const h = React.createElement;

function ShortsShelf() {
  const { shorts } = useContext(AppContext);
  if (!shorts || shorts.length === 0) return null;

  return h('section', { className: 'px-4 pt-3 pb-10 border-t border-gray-200 mx-4' },
    h(Link, { to: '/shorts', className: 'inline-flex items-center gap-2 mb-4 text-lg font-bold text-gray-900' },
      h(Flame, { className: 'w-5 h-5 text-red-600 fill-red-600' }),
      'Shorts',
      h(ChevronRight, { className: 'w-5 h-5' })
    ),
    h('div', { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4' },
      shorts.slice(0, 5).map((short) => h(Link, {
        key: short.id,
        to: '/shorts',
        className: 'group min-w-0'
      },
        h('div', { className: 'aspect-[9/16] overflow-hidden rounded-xl bg-gray-100' },
          h('img', {
            src: short.thumbnail || short.videoUrl,
            alt: short.title,
            className: 'w-full h-full object-cover group-hover:scale-105 transition-transform'
          })
        ),
        h('p', { className: 'mt-2 text-sm font-semibold text-gray-900 line-clamp-2 leading-5' }, short.title),
        h('p', { className: 'text-xs text-gray-500 mt-1' }, `${short.likes || '0'} likes`)
      ))
    )
  );
}

function Home() {
  return h('div', { className: 'flex-1 bg-white flex flex-col min-w-0 h-[calc(100vh-56px)] overflow-y-auto' },
    h(CategoryTabs),
    h('main', { className: 'flex-1 py-2' },
      h(VideoGrid),
      h(ShortsShelf)
    )
  );
}

export default Home;
