import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PiHouseLine } from 'react-icons/pi'
import { MdOutlinePerson } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'
import { LuSettings2 } from 'react-icons/lu'
import logo from '../assets/images/logo.png'
import { fetchCurrentUser, type User } from '../services/userService'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import AddAuctionModal from '../components/AddAuctionModal'
import ProfileSettingsModal from '../components/ProfileSettingsModal'

const Navigation: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [profileModalOpen, setProfileModalOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { logout } = useAuth()

    const profileRoutes = ['/my-auctions', '/bidding', '/won']
    const isProfileSelected = profileRoutes.includes(location.pathname)

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
                    <NavLink to="/auctions">
                        <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
                    </NavLink>

                    <nav className="flex bg-white rounded-full">
                        <NavLink
                            to="/auctions"
                            className={({ isActive }) =>
                                `flex items-center gap-2 justify-center h-16 px-6 rounded-full text-sm font-normal ${isActive
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
                            className={() =>
                                `flex items-center gap-2 justify-center h-16 px-6 rounded-full text-sm font-normal ${isProfileSelected
                                    ? 'bg-black text-white'
                                    : 'text-gray-800 hover:bg-gray-100'
                                }`
                            }
                        >
                            <>
                                <MdOutlinePerson
                                    size={20}
                                    className={isProfileSelected ? 'text-white' : 'text-black'}
                                />
                                Profile
                            </>
                        </NavLink>
                    </nav>
                </div>

                {/* Right section */}
                <div className="flex items-center bg-white rounded-full px-2 py-1 gap-2 relative">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F4FF47] hover:bg-[#e3ee30] cursor-pointer transition"
                    >
                        <FiPlus size={24} className="text-black" />
                    </button>

                    {/* Profile picture with dropdown */}
                    <div className="relative">
                        <img
                            src={user?.picture ? `${api.defaults.baseURL}${user.picture}` : logo}
                            alt="Profile"
                            onClick={() => setDropdownOpen(prev => !prev)}
                            className="w-16 h-16 rounded-full object-cover cursor-pointer"
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-2xl z-50 py-4 px-4">
                                <button
                                    onClick={() => {
                                        setProfileModalOpen(true)
                                        setDropdownOpen(false)
                                    }}
                                    className="flex items-center gap-2 w-full text-left text-black text-base px-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                                >
                                    <LuSettings2 size={18} />
                                    Profile settings
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full mt-3 border border-black rounded-full text-black text-base py-2 hover:bg-gray-50 transition cursor-pointer"
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Second row heading */}
            {(isProfileSelected || location.pathname === '/auctions') && (
                <div className="px-6 py-4">
                    <h1 className="text-[32px] font-bold">
                        {isProfileSelected
                            ? user
                                ? `Hello ${user.firstName} ${user.lastName}!`
                                : 'Hello!'
                            : 'Auctions'}
                    </h1>
                </div>
            )}

            {isProfileSelected && (
                <div className="flex justify-center py-4">
                    <div className="inline-flex bg-[var(--Gray-10,#EDF4F2)] p-1 rounded-full">
                        <button
                            onClick={() => navigate('/my-auctions')}
                            className={`px-6 py-2 text-sm font-medium transition-colors rounded-full ${location.pathname === '/my-auctions'
                                ? 'bg-black text-white'
                                : 'text-black'
                                } cursor-pointer`}
                        >
                            My Auctions
                        </button>
                        <button
                            onClick={() => navigate('/bidding')}
                            className={`px-6 py-2 text-sm font-medium transition-colors rounded-full ${location.pathname === '/bidding'
                                ? 'bg-black text-white'
                                : 'text-black'
                                } cursor-pointer`}
                        >
                            Bidding
                        </button>
                        <button
                            onClick={() => navigate('/won')}
                            className={`px-6 py-2 text-sm font-medium transition-colors rounded-full ${location.pathname === '/won'
                                ? 'bg-black text-white'
                                : 'text-black'
                                } cursor-pointer`}
                        >
                            Won
                        </button>
                    </div>
                </div>
            )}

            <main className="flex-grow relative z-0">
                <Outlet />
            </main>

            {modalOpen && (
                <AddAuctionModal
                    onClose={() => setModalOpen(false)}
                    onSuccess={() => {
                        window.dispatchEvent(new Event('auction-added'))
                        setModalOpen(false)
                    }}
                />
            )}

            {profileModalOpen && user && (
                <ProfileSettingsModal
                    onClose={() => setProfileModalOpen(false)}
                    onSuccess={() => {
                        fetchCurrentUser().then(setUser).catch(console.error)
                    }}
                    initialData={{
                        name: user.firstName,
                        surname: user.lastName,
                        email: user.email,
                    }}
                />
            )}
        </div>
    )
}

export default Navigation
