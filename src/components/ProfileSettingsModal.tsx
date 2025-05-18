import React, { useState } from 'react'
import { updateUser } from '../services/authService'
import ChangePasswordModal from './common/ChangePasswordModal'

interface ProfileSettingsModalProps {
    onClose: () => void
    onSuccess?: () => void
    initialData?: { name: string; surname: string; email: string }
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
    onClose,
    onSuccess,
    initialData = { name: '', surname: '', email: '' },
}) => {
    const [name, setName] = useState(initialData.name)
    const [surname, setSurname] = useState(initialData.surname)
    const [email, setEmail] = useState(initialData.email)
    const [loading, setLoading] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const handleSave = async () => {
        try {
            setLoading(true)
            await updateUser({ firstName: name, lastName: surname, email })
            if (onSuccess) onSuccess()
            onClose()
        } catch (error) {
            console.error('Failed to update user:', error)
            alert('Something went wrong while updating your profile.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-2xl w-[533px] h-[404px] p-6 shadow-lg relative z-50 overflow-hidden">
                    <h2 className="text-2xl font-bold mb-6">Profile settings</h2>

                    <div className="flex gap-3 mb-4">
                        <div className="w-1/2">
                            <label className="text-sm mb-1 block">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-[#DDE9E6] rounded-xl px-4 py-2"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm mb-1 block">Surname</label>
                            <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                className="w-full border border-[#DDE9E6] rounded-xl px-4 py-2"
                            />
                        </div>
                    </div>

                    <label className="text-sm mb-1 block">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#DDE9E6] rounded-xl px-4 py-2 mb-4"
                    />

                    <p
                        className="text-black text-sm mb-4 cursor-pointer hover:underline"
                        onClick={() => setShowPasswordModal(true)}
                    >
                        Change password
                    </p>
                    <p className="text-black text-sm mb-6 cursor-pointer hover:underline">
                        Change profile picture
                    </p>

                    <div className="flex justify-end gap-2 mt-10">
                        <button
                            onClick={onClose}
                            className="bg-gray-100 px-4 py-2 rounded-full text-black hover:opacity-90 transition cursor-pointer"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-yellow-300 px-4 py-2 rounded-full text-black hover:opacity-90 transition cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </div>
            </div>

            {showPasswordModal && (
                <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
            )}
        </>
    )
}

export default ProfileSettingsModal
