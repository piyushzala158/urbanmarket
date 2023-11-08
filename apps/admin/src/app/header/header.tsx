import { TagIcon } from '@heroicons/react/24/outline';
import { auth } from '@reatfirebase/shared-ui';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [user,setUser]= useState<User | null>(null)
useEffect(()=>{
  const user = auth.currentUser
  setUser(user)
},[user,auth])
  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <div className="flex flex-col w-64 bg-white rounded-r-3xl overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
        </div>
        <ul className="flex flex-col py-4 grow">
          <li>
            <Link
              to={'/'}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-home"></i>
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>

      
          <li>
            <Link
              to={'/addproduct'}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-shopping-bag"></i>
              </span>
              <span className="text-sm font-medium">Add Products</span>
            </Link>
          </li>
             <li>
            <Link
              to={'/category'}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className='bx bx-category'></i>

              </span>
              <span className="text-sm font-medium">Category</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to={'/profile'}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-user"></i>
              </span>
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/login'}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-log-out"></i>
              </span>
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Header;
