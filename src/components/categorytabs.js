import React, { useContext } from 'react';
import { AppContext } from '../context/appcontext.js';

const h = React.createElement;

const categories = [
  'All', 'Gaming', 'Music', 'Live', 'News', 'Coding', 'Sports', 'Podcasts'
];

function CategoryTabs() {
  const { selectedCategory, setSelectedCategory } = useContext(AppContext);

  return h('div', { className: 'flex items-center gap-3 px-6 py-3 bg-white sticky top-0 z-30 border-b border-gray-100 overflow-x-auto no-scrollbar' },
    categories.map((cat) => {
      const isSelected = selectedCategory === cat;
      const btnClass = isSelected
        ? 'bg-black text-white font-semibold'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 font-medium';

      return h('button', {
        key: cat,
        onClick: () => setSelectedCategory(cat),
        className: `px-3.5 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors cursor-pointer ${btnClass}`
      }, cat);
    })
  );
}

export default CategoryTabs;