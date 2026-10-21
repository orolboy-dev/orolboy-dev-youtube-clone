import React, { useContext } from 'react';
import { Home, Compass, Tv, Folder, History, Clock, ThumbsUp } from 'lucide-react';
import { AppContext } from '../../context/appcontext.js';

const h = React.createElement;

function SidebarItem({ icon: Icon, title, isActive, isCollapsed }) {
  const activeClass = isActive 
    ? 'bg-gray-100 font-semibold text-black' 
    : 'hover:bg-gray-100 text-gray-700';

  if (isCollapsed) {
    return h('div', { className: 'flex flex-col items-center justify-center py-3 px-1 rounded-xl cursor-pointer hover:bg-gray-100 gap-1' },
      h(Icon, { className: 'w-5 h-5' }),
      h('span', { className: 'text-[10px]' }, title)
    );
  }

  return h('div', { className: `flex items-center gap-6 px-3 py-2.5 rounded-xl cursor-pointer ${activeClass}` },
    h(Icon, { className: 'w-5 h-5' }),
    h('span', { className: 'text-sm' }, title)
  );
}

function Sidebar() {
  const { isSidebarOpen } = useContext(AppContext);

  if (!isSidebarOpen) {
    return h('aside', { className: 'w-18 h-[calc(100vh-56px)] p-1 flex flex-col gap-1 overflow-y-auto sticky top-14 left-0 border-r border-gray-100 bg-white' },
      h(SidebarItem, { icon: Home, title: 'Home', isActive: true, isCollapsed: true }),
      h(SidebarItem, { icon: Compass, title: 'Shorts', isCollapsed: true }),
      h(SidebarItem, { icon: Tv, title: 'Subscriptions', isCollapsed: true }),
      h(SidebarItem, { icon: Folder, title: 'You', isCollapsed: true })
    );
  }

  return h('aside', { className: 'w-60 h-[calc(100vh-56px)] p-3 flex flex-col gap-1 overflow-y-auto sticky top-14 left-0 border-r border-gray-100 bg-white shrink-0' },
    h(SidebarItem, { icon: Home, title: 'Home', isActive: true }),
    h(SidebarItem, { icon: Compass, title: 'Explore' }),
    h(SidebarItem, { icon: Tv, title: 'Subscriptions' }),
    
    h('hr', { className: 'my-2 border-gray-200' }),
    
    h(SidebarItem, { icon: Folder, title: 'Library' }),
    h(SidebarItem, { icon: History, title: 'History' }),
    h(SidebarItem, { icon: Clock, title: 'Watch Later' }),
    h(SidebarItem, { icon: ThumbsUp, title: 'Liked Videos' })
  );
}

export default Sidebar;