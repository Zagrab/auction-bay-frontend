import React from 'react'
import logo from '../assets/images/logo.png'
import { Button } from '../components/common/Button'
import { Link } from 'react-router-dom'
import preview from '../assets/images/auction-mockup.svg'

export const LandingPage: React.FC = () => (
  <div className="font-inter bg-gray-50 min-h-screen flex flex-col">
    {/* Header */}
    <header className="flex justify-between items-center py-6 px-8">
      <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
      <nav className="space-x-3">
        <Link
          to="/login"
          className="text-base font-bold leading-6 tracking-normal text-gray-800 hover:underline"
        >
          Log in
        </Link>
        <span className="font-light">or</span>
        <Button
          variant="primary"
          to="/register"
          className="gap-2 py-2 px-4 rounded-2xl font-medium text-base leading-6 tracking-normal cursor-pointer"
        >
          Sign Up
        </Button>
      </nav>
    </header>

    {/* Hero Section */}
    <main className="flex-grow pt-32 px-4 flex flex-col items-center text-center">
      <h1 className="font-bold text-[64px] leading-[120%] tracking-normal text-gray-900">
        E-auctions made easy!
      </h1>
      <p className="mt-4 font-light text-base leading-6 tracking-normal text-gray-600 max-w-lg">
        Simple way for selling your unused products, or getting a deal on product you want!
      </p>
      <Button
        to="/login"
        variant="highlight"
        className="
          mt-8
          w-[132px]
          h-[40px]
          min-h-[40px]
          py-2
          px-4
          rounded-2xl
          font-medium
          text-base
          leading-6
          tracking-normal
          cursor-pointer
        "
      >
        Start bidding
      </Button>
    </main>

    {/* Preview Section */}
    <section className="pt-24 px-4 pb-0">
      <img
        src={preview}
        alt="Auction dashboard preview"
        className="mx-auto w-full max-w-screen-xl"
      />
    </section>
  </div>
)

export default LandingPage


