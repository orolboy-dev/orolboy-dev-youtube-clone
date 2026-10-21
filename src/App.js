import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/appcontext.js';
import Header from './components/header/header.js';
import Sidebar from './components/sidebar/sidebar.js';
import Home from './pages/home.js';
import Watch from './pages/watch.js';
import SearchResults from './pages/searchresults.js';

const h = React.createElement;

function App() {
  return h(AppProvider, null,
    h(Router, null,
      h('div', { className: 'min-h-screen bg-white flex flex-col' },
        h(Header),
        h('div', { className: 'flex flex-1' },
          h(Sidebar),
          h(Routes, null,
            h(Route, { path: '/', element: h(Home) }),
            h(Route, { path: '/watch/:id', element: h(Watch) }),
            h(Route, { path: '/search', element: h(SearchResults) })
          )
        )
      )
    )
  );
}

export default App;