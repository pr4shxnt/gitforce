'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/AdminAuthSlice';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactElement;
  subItems?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/portal/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Chats',
    href: '/portal/chats',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    subItems: [
      { name: 'Calendar', href: '/portal/chats/calendar' },
      { name: 'General Meeting', href: '/portal/chats/general-meeting' },
      { name: 'Broadcast Service', href: '/portal/chats/broadcast-service' },
    ],
  },
  {
    name: 'Members',
    href: '/portal/members',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: 'Manage',
    href: '/portal/manage',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    subItems: [
      { name: 'Projects', href: '/portal/manage/projects' },
      { name: 'Gallery', href: '/portal/manage/gallery' },
      { name: 'Team', href: '/portal/manage/team' },
      { name: 'Content', href: '/portal/manage/content' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Chats', 'Manage']);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/portal');
  };

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    if (href === '/portal/dashboard') return pathname === href;
    return pathname?.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">G</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">GitForce</h1>
            <p className="text-xs text-purple-200/60">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              onClick={() => item.subItems && toggleExpanded(item.name)}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                  : 'text-purple-200/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </div>
              {item.subItems && (
                <svg
                  className={`w-4 h-4 transition-transform ${
                    expandedItems.includes(item.name) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>

            {/* Sub-items */}
            {item.subItems && expandedItems.includes(item.name) && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-white/10 pl-4">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`block px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      pathname === subItem.href
                        ? 'bg-purple-500/20 text-white font-medium'
                        : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl">
            👨‍💻
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Prashant</p>
            <p className="text-xs text-purple-200/60">Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-red-500/20 transition-all duration-200 group"
            title="Logout"
          >
            <svg className="w-5 h-5 text-purple-200 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-purple-500/20 backdrop-blur-xl border border-white/10 text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen bg-gradient-to-b from-indigo-950/50 via-purple-900/50 to-pink-900/50 backdrop-blur-xl border-r border-white/10 sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          ></div>
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-900 z-50 transform transition-transform duration-300">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
