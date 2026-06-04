'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    autoRefresh: true,
    refreshInterval: 60,
    theme: 'light',
    notifications: true,
    timezone: 'Asia/Ho_Chi_Minh',
  })

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = () => {
    localStorage.setItem('dashboard_settings', JSON.stringify(settings))
    alert('Cài đặt đã được lưu!')
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-600 mt-2">Quản lý cài đặt ứng dụng</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="divide-y divide-gray-200">
          {/* Auto Refresh Setting */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tự động làm mới</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Tự động cập nhật dữ liệu dashboard
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoRefresh}
                  onChange={(e) => handleChange('autoRefresh', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          {/* Refresh Interval */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Khoảng cập nhật</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Thời gian giữa các lần cập nhật (giây)
                </p>
              </div>
              <input
                type="number"
                min="30"
                max="300"
                value={settings.refreshInterval}
                onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none w-24"
              />
            </div>
          </div>

          {/* Theme */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Chủ đề</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Chọn chế độ hiển thị
                </p>
              </div>
              <select
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                <option value="light">Sáng</option>
                <option value="dark">Tối</option>
                <option value="auto">Tự động</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Thông báo</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Nhận thông báo về các sự kiện quan trọng
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          {/* Timezone */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Múi giờ</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Đặt múi giờ của bạn
                </p>
              </div>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                <option value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</option>
                <option value="Asia/Bangkok">GMT+7 (Bangkok)</option>
                <option value="Asia/Singapore">GMT+8 (Singapore)</option>
                <option value="Asia/Hong_Kong">GMT+8 (Hong Kong)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Lưu cài đặt
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Hủy
          </Link>
        </div>
      </div>
    </div>
  )
}
