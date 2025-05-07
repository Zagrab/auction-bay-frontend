import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'highlight'
  to?: string       
}

const VARIANT_CLASSES = {
  primary: 'bg-black text-white hover:bg-gray-800',
  accent:  'bg-yellow-300 text-black hover:bg-yellow-400',
  highlight: 'bg-[#F4FF47] text-black hover:bg-[#E0E033]',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  to,
  children,
  className = '',
  ...props
}) => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      e.preventDefault()
      navigate(to)
    }
    props.onClick?.(e)
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`
        px-4 py-2 rounded-full font-semibold focus:outline-none
        ${VARIANT_CLASSES[variant]} ${className}
      `}
    >
      {children}
    </button>
  )
}
