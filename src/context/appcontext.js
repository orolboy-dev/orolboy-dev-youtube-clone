import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const h = React.createElement;

export function AppProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return h(AppContext.Provider, { 
    value: { isSidebarOpen, toggleSidebar, selectedCategory, setSelectedCategory } 
  }, children);
}