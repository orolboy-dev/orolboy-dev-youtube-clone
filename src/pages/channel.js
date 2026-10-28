import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bell, ChevronDown, Search, Video } from 'lucide-react';
import VideoCard from '../components/video/videocard.js';
import { AppContext } from '../context/appcontext.js';

const h = React.createElement;

function Channel() {
  const { channelName } = useParams();
  const { videos, shorts, subscriptions, toggleSubscription, channelProfile } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Home');
  const channel = channelName || '';
  const isOwnChannel = channel === channelProfile.name;
  const isSubscribed = subscriptions.some((subscription) => subscription.name === channel);
  const channelVideos = videos.filter((video) => video.channel === channel);
  const channelShorts = shorts.filter((short) => short.channel === channel);
  const tabs = ['Home', 'Videos', 'Shorts'];

  return h('div', { className: 'flex-1 min-w-0 bg-white h-[calc(100vh-56px)] overflow-y-auto' },
    h('main', { className: 'max-w-[1200px] mx-auto px-4 sm:px-8 pb-12' },
      h('div', {
        className: `mt-4 h-28 sm:h-40 lg:h-52 rounded-2xl overflow-hidden ${
          channelProfile.banner && isOwnChannel ? '' : 'bg-gradient-to-r from-gray-950 via-gray-800 to-gray-950'
        }`
      },
        channelProfile.banner && isOwnChannel
          ? h('img', { src: channelProfile.banner, alt: 'Kanal banneri', className: 'w-full h-full object-cover' })
          : isOwnChannel && h('div', { className: 'h-full flex items-center justify-center text-white text-2xl sm:text-4xl font-bold tracking-tight' }, channel)
      ),
      h('section', { className: 'flex flex-col sm:flex-row gap-5 sm:gap-7 items-start sm:items-center py-6 sm:py-7' },
        h('div', { className: 'w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-purple-600 text-white flex items-center justify-center text-4xl sm:text-5xl font-semibold flex-shrink-0 overflow-hidden' },
          isOwnChannel && channelProfile.avatar
            ? h('img', { src: channelProfile.avatar, alt: channel, className: 'w-full h-full object-cover' })
            : channel.charAt(0).toUpperCase()
        ),
        h('div', { className: 'flex-1 min-w-0' },
          h('h1', { className: 'text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2' },
            channel,
            isOwnChannel && h('span', { className: 'text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600' }, 'Sizning kanalingiz')
          ),
          h('p', { className: 'text-sm text-gray-600 mt-1' },
            `@${channel.replace(/\s+/g, '')} · ${isOwnChannel ? '1' : '12.4K'} subscribers · ${channelVideos.length} videos`
          ),
          h('p', { className: 'text-sm text-gray-700 mt-3 max-w-2xl line-clamp-2' },
            (isOwnChannel && channelProfile.bio) || `${channel} kanaliga xush kelibsiz. Yangi videolarni o'tkazib yubormang.`
          ),
          h(Link, { to: '/admin', className: 'inline-block text-sm text-gray-600 hover:text-blue-700 mt-2' },
            isOwnChannel ? 'Kanalni sozlash' : '...more'
          )
        ),
        isOwnChannel
          ? h(Link, { to: '/admin', className: 'px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 whitespace-nowrap' }, 'Kanalni sozlash')
          : h('button', {
              type: 'button',
              onClick: () => toggleSubscription(channel),
              className: `px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                isSubscribed ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              }`
            },
              isSubscribed
                ? h('span', { className: 'inline-flex items-center gap-2' }, h(Bell, { className: 'w-4 h-4' }), 'Subscribed', h(ChevronDown, { className: 'w-4 h-4' }))
                : 'Subscribe'
            )
      ),
      h('nav', { className: 'flex items-center border-b border-gray-200 gap-7 sticky top-0 bg-white z-10' },
        tabs.map((tab) => h('button', {
          key: tab,
          type: 'button',
          onClick: () => setActiveTab(tab),
          className: `py-3 text-sm font-semibold border-b-2 ${
            activeTab === tab ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'
          }`
        }, tab)),
        h('button', { type: 'button', className: 'p-2 text-gray-600 hover:bg-gray-100 rounded-full', 'aria-label': 'Search channel' },
          h(Search, { className: 'w-5 h-5' })
        )
      ),
      activeTab === 'Shorts'
        ? channelShorts.length
          ? h('div', { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6' },
              channelShorts.map((short) => h(Link, { key: short.id, to: '/shorts', className: 'min-w-0' },
                h('img', { src: short.thumbnail || short.videoUrl, alt: short.title, className: 'w-full aspect-[9/16] object-cover rounded-xl' }),
                h('p', { className: 'font-semibold text-sm mt-2 line-clamp-2' }, short.title)
              ))
            )
          : h('div', { className: 'py-20 text-center text-gray-500' }, 'Hozircha Shorts videolar yo‘q.')
        : channelVideos.length
          ? h('section', { className: 'py-6' },
              activeTab === 'Home' && h('h2', { className: 'text-lg font-bold mb-4' }, 'New uploads'),
              h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10' },
                channelVideos.map((video) => h(VideoCard, { key: video.id, video }))
              )
            )
          : h('div', { className: 'py-20 flex flex-col items-center text-center text-gray-500' },
              h(Video, { className: 'w-10 h-10 mb-3' }),
              h('p', { className: 'font-semibold text-gray-800' }, 'Bu kanalda hali video yo‘q'),
              h('p', { className: 'text-sm mt-1' }, isOwnChannel ? 'Admin paneldan birinchi videongizni yuklang.' : 'Yangi videolar keyinroq shu yerda ko‘rinadi.')
            )
    )
  );
}

export default Channel;
