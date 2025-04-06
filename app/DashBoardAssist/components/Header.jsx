'use client';

import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">نظام إدارة المنصة التعليمية</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600">
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <FaUserCircle className="w-8 h-8 text-gray-600" />
            <div>
              <p className="font-medium">محمد أحمد</p>
              <p className="text-sm text-gray-500">موظف دعم فني</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;