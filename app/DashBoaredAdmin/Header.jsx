// components/Header.jsx
import React from 'react';

const Header = () => (
  <header className="bg-white shadow-sm fixed left-0 right-0 top-0 z-10">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex items-center space-x-6">
        <button className="relative">
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs">
            3
          </span>
          <i className="fas fa-bell text-2xl text-gray-600"></i>
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="/avatar.png"
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-gray-700">أحمد محمد</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;