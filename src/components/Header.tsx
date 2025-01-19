import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Search, MessageCircle } from 'lucide-react';

function Header() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-medium ${
      isActive ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-gray-800'
    }`;

  return (
    <header className="relative flex items-center px-8 py-4 bg-white shadow">
      {/* Logo */}
      <NavLink to="/" className="flex items-center space-x-4">
        <img src="../Public/Icon.png" alt="Logo" className="w-32" />
      </NavLink>

      {/* Navigasi (di tengah) */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex space-x-4">
        <NavLink to="/" className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/historyPage" className={linkClasses}>
          History
        </NavLink>
        <NavLink to="/mapoverview" className={linkClasses}>
          Map Overview
        </NavLink>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-4 ml-auto">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <MessageCircle className="w-5 h-5 text-gray-600" />
        </button>
        <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
          Emergency Call
        </button>
      </div>
    </header>
  );
}

export default Header;
