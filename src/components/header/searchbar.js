import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic } from 'lucide-react';

const h = React.createElement;

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return h('form', { onSubmit: handleSubmit, className: 'flex items-center flex-1 max-w-[600px] mx-4' },
    h('div', { className: 'flex items-center flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus-within:border-blue-500 shadow-inner h-10' },
      h('input', {
        type: 'text',
        value: query,
        onChange: (e) => setQuery(e.target.value),
        placeholder: 'Search',
        className: 'w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500'
      })
    ),
    h('button', {
      type: 'submit',
      className: 'bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-6 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors'
    },
      h(Search, { className: 'w-5 h-5 text-gray-600' })
    ),
    h('button', {
      type: 'button',
      className: 'ml-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors hidden sm:flex items-center justify-center'
    },
      h(Mic, { className: 'w-5 h-5 text-gray-700' })
    )
  );
}

export default SearchBar;