import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Video, Bell, UserRound } from 'lucide-react';
import SearchBar from './searchbar.js';
import { AppContext } from '../../context/appcontext.js';

const h = React.createElement;

function Header() {
  const { toggleSidebar } = useContext(AppContext);

  return h('header', { className: 'flex items-center justify-between px-4 h-14 bg-white sticky top-0 z-50 border-b border-gray-100 select-none' },
    
    // Logotip
    h('div', { className: 'flex items-center gap-4' },
      h('button', { onClick: toggleSidebar, className: 'p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer' },
        h(Menu, { className: 'w-6 h-6 text-gray-700' })
      ),
      h(Link, { to: '/', className: 'flex items-center gap-1 cursor-pointer' },
        h('div', { className: 'bg-red-600 text-white px-2 py-0.5 rounded-xl flex items-center justify-center' },
          h('svg', { className: 'w-5 h-3.5 fill-current', viewBox: '0 0 24 24' },
            h('path', { d: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' })
          )
        ),
        h('span', { className: 'font-bold text-lg tracking-tighter text-gray-900 ml-0.5' }, 'YouTube'),
        h('sup', { className: 'text-[9px] text-gray-500 ml-0.5 -mt-2' }, 'UZ')
      )
    ),

    // Search bar
    h(SearchBar),

    // O'ng tomondagi tugmalar va Avatar
    h('div', { className: 'flex items-center gap-2' },
      h(Link, { to: '/admin', title: 'Create video', className: 'p-2 hover:bg-gray-100 rounded-full transition-colors' },
        h(Video, { className: 'w-5 h-5 text-gray-700' })
      ),
      h(Link, { to: '/admin', title: 'Notifications', className: 'p-2 hover:bg-gray-100 rounded-full transition-colors max-sm:hidden' },
        h(Bell, { className: 'w-5 h-5 text-gray-700' })
      ),
      h(Link, { to: '/admin', title: 'Admin Panel', className: 'ml-1 inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors whitespace-nowrap' },
        h(UserRound, { className: 'w-4 h-4' }),
        h('span', { className: 'max-sm:hidden' }, 'Sign in')
      )
    )
  );
}

export default Header;