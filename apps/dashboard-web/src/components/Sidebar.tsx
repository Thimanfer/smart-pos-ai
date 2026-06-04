'use client'

import React from 'react'
import Link from 'next/link'

interface SidebarLink {
  href: string
  label: string
  icon: string
}

const links: SidebarLink[] = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/orders', label: 'Đơn hàng', icon: '📦' },
  { href: '/analytics', label: 'Phân tích', icon: '📈' },
  { href: '/forecast', label: 'Dự báo', icon: '🔮' },
  { href: '/settings', label: 'Cài đặt', icon: '⚙️' },
]

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Smart POS AI</h1>
        <p className="text-sm text-gray-400 mt-1">Enterprise Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span className="text-xl">{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500"></div>
          <div>
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-gray-400">admin@smartpos.ai</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
