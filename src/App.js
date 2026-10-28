import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/appcontext.js';
import Header from './components/header/header.js';
import Sidebar from './components/sidebar/sidebar.js';
import Home from './pages/home.js';
import Watch from './pages/watch.js';
import SearchResults from './pages/searchresults.js';
import Shorts from './pages/shorts.js';
import Admin from './pages/admin.js';
import Channel from './pages/channel.js';
import Subscriptions from './pages/subscriptions.js';
import History from './pages/history.js';

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
            h(Route, { path: '/shorts', element: h(Shorts) }),
            h(Route, { path: '/watch/:id', element: h(Watch) }),
            h(Route, { path: '/search', element: h(SearchResults) }),
            h(Route, { path: '/admin', element: h(Admin) }),
            h(Route, { path: '/subscriptions', element: h(Subscriptions) }),
            h(Route, { path: '/history', element: h(History) }),
            h(Route, { path: '/channel/:channelName', element: h(Channel) })
          )
        )
      )
    )
  );
}

export default App;