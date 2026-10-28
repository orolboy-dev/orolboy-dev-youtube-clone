import React, { useContext } from 'react';
import { AppContext } from '../context/appcontext.js';

const h = React.createElement;

const CATEGORIES = [
  'All', 'Gaming', 'Live', 'Music', 'News', 'Coding', 'Sports',
  'Camping', 'Fast food', 'Rocket League', 'History', 'Podcasts'
];

function CategoryTabs() {
  const { selectedCategory, setSelectedCategory } = useContext(AppContext);

  return h('div', { className: 'flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar bg-white sticky top-0 z-30' },
    CATEGORIES.map(category => 
      h('button', {
        key: category,
        onClick: () => setSelectedCategory(category),
        className: `px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
          selectedCategory === category
            ? 'bg-black text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`
      }, category)
    )
  );
}

export default CategoryTabs;