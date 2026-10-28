import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Compass, Flame, History, Music2, Radio, Gamepad2, Video, UserRound
} from 'lucide-react';
import { AppContext } from '../../context/appcontext.js';

const h = React.createElement;

function Sidebar() {
  const { isSidebarOpen, subscriptions, channelProfile, selectedCategory, setSelectedCategory } = useContext(AppContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const itemClass = (active) =>
    `flex items-center gap-6 px-3 py-2.5 rounded-xl text-sm transition-colors ${
      active ? 'bg-gray-100 font-semibold text-black' : 'font-medium text-gray-800 hover:bg-gray-100'
    }`;

  if (!isSidebarOpen) {
    const miniClass = (active) =>
      `flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-[10px] ${
        active ? 'bg-gray-100 font-semibold text-black' : 'text-gray-700 hover:bg-gray-100'
      }`;

    return h('aside', { className: 'w-[72px] bg-white p-1 flex flex-col gap-1 border-r border-gray-100 h-[calc(100vh-56px)] sticky top-14 select-none flex-shrink-0 max-md:hidden' },
      h(Link, { to: '/', className: miniClass(pathname === '/') }, h(Home, { className: 'w-5 h-5' }), 'Home'),
      h(Link, { to: '/shorts', className: miniClass(pathname === '/shorts') }, h(Flame, { className: 'w-5 h-5' }), 'Shorts'),
      h(Link, { to: `/channel/${encodeURIComponent(channelProfile.name)}`, className: miniClass(pathname.startsWith('/channel/')) },
        h(UserRound, { className: 'w-5 h-5' }), 'You'
      )
    );
  }

  return h('aside', { className: 'w-56 lg:w-60 bg-white px-3 py-3 flex flex-col gap-3 border-r border-gray-100 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto select-none flex-shrink-0 max-md:hidden' },
    h('nav', { className: 'flex flex-col gap-1 pb-3 border-b border-gray-200' },
      h(Link, { to: '/', className: itemClass(pathname === '/') }, h(Home, { className: 'w-5 h-5' }), 'Home'),
      h(Link, { to: '/shorts', className: itemClass(pathname === '/shorts') }, h(Flame, { className: 'w-5 h-5' }), 'Shorts'),
      h(Link, { to: '/subscriptions', className: itemClass(pathname === '/subscriptions') }, h(Video, { className: 'w-5 h-5' }), 'Subscriptions'),
      h(Link, { to: `/channel/${encodeURIComponent(channelProfile.name)}`, className: itemClass(pathname.startsWith('/channel/')) },
        h(UserRound, { className: 'w-5 h-5' }), 'You'
      ),
      h(Link, { to: '/history', className: itemClass(pathname === '/history') }, h(History, { className: 'w-5 h-5' }), 'History')
    ),
    h('div', { className: 'px-3 py-2 border-b border-gray-200 text-sm text-gray-700 leading-5' },
      h('p', null, 'Sign in to like videos, comment, and subscribe.'),
      h(Link, { to: '/admin', className: 'inline-flex items-center gap-2 mt-3 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-blue-700 hover:bg-blue-50' },
        h(UserRound, { className: 'w-4 h-4' }), 'Sign in'
      )
    ),
    h('section', { className: 'py-1 border-b border-gray-200' },
      h('h2', { className: 'px-3 pb-2 text-sm font-semibold text-gray-900' }, 'Explore'),
      h('button', { type: 'button', onClick: () => { setSelectedCategory('Music'); navigate('/'); }, className: itemClass(selectedCategory === 'Music') }, h(Music2, { className: 'w-5 h-5' }), 'Music'),
      h('button', { type: 'button', onClick: () => { setSelectedCategory('Live'); navigate('/'); }, className: itemClass(selectedCategory === 'Live') }, h(Radio, { className: 'w-5 h-5' }), 'Live'),
      h('button', { type: 'button', onClick: () => { setSelectedCategory('Gaming'); navigate('/'); }, className: itemClass(selectedCategory === 'Gaming') }, h(Gamepad2, { className: 'w-5 h-5' }), 'Gaming'),
      h(Link, { to: '/admin', className: itemClass(pathname === '/admin') }, h(Compass, { className: 'w-5 h-5' }), 'Creator Studio')
    ),
    h('section', { className: 'py-1 border-b border-gray-200' },
      h('h2', { className: 'px-3 pb-2 text-sm font-semibold text-gray-900' }, 'Subscriptions'),
      subscriptions.map((sub) =>
        h(Link, {
          key: sub.id,
          to: `/channel/${encodeURIComponent(sub.name)}`,
          className: 'flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl text-sm'
        },
          h('div', { className: 'w-6 h-6 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center text-xs flex-shrink-0' },
            sub.avatar || sub.name.charAt(0).toUpperCase()
          ),
          h('span', { className: 'truncate' }, sub.name)
        )
      )
    ),
    h('div', { className: 'px-3 py-2 text-xs text-gray-500 leading-5' },
      'About  Press  Copyright',
      h('br'),
      'Contact us  Creators',
      h('br'),
      'Terms  Privacy  Policy & Safety'
    )
  );
}

export default Sidebar;
