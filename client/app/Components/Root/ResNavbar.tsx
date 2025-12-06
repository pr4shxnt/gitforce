'use client'

import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import ThemeToggle from '../UI/ThemeToggle'
import Link from 'next/link'

const ResNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <nav className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl rounded-3xl flex justify-between items-center px-6 py-4 backdrop-blur-md gap-4 surface-card z-50">
      {/* Logo */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
          <span style={{ color: 'var(--accent)' }}>गिट</span>Force
        </h2>
      </div>

      {/* Menu + Theme */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div  className="absolute backdrop-blur-2xl top-full mt-1 left-1/2 transform -translate-x-1/2 w-full rounded-2xl bg-background shadow-lg flex flex-col items-center justify-center font-medium gap-4 py-6 text-lg uppercase tracking-[0.35em] transition-all duration-300">
          <Link onClick={()=> setIsMenuOpen(false)} href="/" className="nav-link w-full text-center py-2 hover:bg-accent/10 rounded-xl">
            Home
          </Link>
          <Link onClick={()=> setIsMenuOpen(false)} href="/about" className="nav-link w-full text-center py-2 hover:bg-accent/10 rounded-xl">
            About
          </Link>
          <Link onClick={()=> setIsMenuOpen(false)} href="/team" className="nav-link w-full text-center py-2 hover:bg-accent/10 rounded-xl">
            Team
          </Link>
          <Link onClick={()=> setIsMenuOpen(false)} href="/gallery" className="nav-link w-full text-center py-2 hover:bg-accent/10 rounded-xl">
            Gallery
          </Link>
          <Link onClick={()=> setIsMenuOpen(false)} href="/projects" className="nav-link w-full text-center py-2 hover:bg-accent/10 rounded-xl">
            Projects
          </Link>
        </div>
      )}
    </nav>
  )
}

export default ResNavbar
