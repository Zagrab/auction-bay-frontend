// src/pages/RegisterPage/index.tsx
import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { useSignUp } from '../../hooks/useSignUp';
import auctionsImage from '../../assets/images/auctions4.svg'

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName]     = useState('');
  const [lastName,  setLastName]      = useState('');
  const [email,     setEmail]         = useState('');
  const [password,  setPassword]      = useState('');
  const [confirm,   setConfirm]       = useState('');
  const { handleSignUp, loading, error } = useSignUp();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords don't match");
      return;
    }
    await handleSignUp({ firstName, lastName, email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left (2/3) */}
      <div className="flex-1 flex items-center justify-center">
        <img src={auctionsImage} alt="Auctions" className="max-w-full h-auto" />
      </div>

      {/* Right (1/4) */}
      <div className="w-1/4 min-h-screen bg-white rounded-3xl m-3 pt-16 px-8 pb-8 flex flex-col">
        {/* Logo */}
        <div className="w-16 h-16 bg-[#F4FF47] rounded-full flex items-center justify-center mb-6 mx-auto">
          <img src={logo} alt="Logo" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2 mt-24">
          Hello!
        </h1>
        <p className="text-base font-light text-gray-600 text-center mb-8">
          Please enter your details
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4 flex-1 flex flex-col mt-8">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>
          </div>

          {/* Repeat Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repeat password
            </label>
            <div className="relative">
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-center text-red-600 text-sm">{error}</p>
          )}

          {/* Sign up button */}
          <Button
            type="submit"
            variant="highlight"
            className="w-full h-[40px] rounded-2xl font-medium text-base leading-6 cursor-pointer mt-4"
            disabled={loading}
          >
            {loading ? 'Signing up…' : 'Sign up'}
          </Button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-700 mt-6 mb-8">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage
