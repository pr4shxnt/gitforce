'use client'

import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../UI/ThemeToggle'
import Button from '../UI/Button'


const Navbar = () => {
  return (
    <>
    <nav
        className='md:flex hidden mx-auto mt-6 w-11/12 max-w-6xl rounded-3xl justify-between items-center px-8 py-4 backdrop-blur-md gap-6 surface-card'
    >
        <div className="w-full">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
                <span style={{ color: 'var(--accent)' }}>गिट</span>Force
            </h2>
        </div>

        <div className="flex items-center font-medium gap-3 justify-between w-full text-xs uppercase tracking-[0.35em]">
            <Link href='/' className='nav-link'>Home</Link>
            <Link href='/about' className='nav-link'>About</Link>
            <Link href='/team' className='nav-link'>Team</Link>
            <Link href='/gallery' className='nav-link'>Gallery</Link>
            <Link href='/projects' className='nav-link'>Projects</Link>
        </div>

        <div className="w-full flex items-center gap-3 justify-end">
            <ThemeToggle/>
            <Button name={`Contact`} link={`mailto:team@gitforce.dev`}/>
        </div>
    </nav>
    </>
  )
}

export default Navbar