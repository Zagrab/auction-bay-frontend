import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { PiHouseLine } from 'react-icons/pi'
import { MdOutlinePerson } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'
import logo from '../assets/images/logo.png'
import { fetchCurrentUser, type User,  } from '../services/userService'

const Navigation: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchCurrentUser()
        setUser(data)
      } catch (error) {
        console.error('User fetch failed:', error)
      }
    }

    getUser()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-transparent">
        {/* Left section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
          </NavLink>

          {/* Toggle Nav */}
          <nav className="flex bg-white rounded-full">
            <NavLink
              to="/auctions"
              className={({ isActive }) =>
                `flex items-center gap-2 justify-center h-16 px-6 rounded-full text-sm font-normal ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <PiHouseLine
                    size={20}
                    className={isActive ? 'text-white' : 'text-black'}
                  />
                  Auctions
                </>
              )}
            </NavLink>
            <NavLink
              to="/my-auctions"
              className={({ isActive }) =>
                `flex items-center gap-2 justify-center h-16 px-6 rounded-full text-sm font-normal ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <MdOutlinePerson
                    size={20}
                    className={isActive ? 'text-white' : 'text-black'}
                  />
                  Profile
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center bg-white rounded-full px-2 py-1 gap-2">
          {/* Add button */}
          <button
            className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ backgroundColor: 'var(--Primary-50, #F4FF47)' }}
          >
            <FiPlus size={24} className="text-black" />
          </button>
          {/* Profile picture */}
          <img
            src={logo}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover cursor-pointer"
          />
        </div>
      </header>

      {/* Greeting row */}
      <div className="px-6 py-4">
        <h1 className="text-[32px] font-bold">
          {user ? `Hello ${user.firstName} ${user.lastName}!` : 'Hello!'}
        </h1>
      </div>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}

export default Navigation
