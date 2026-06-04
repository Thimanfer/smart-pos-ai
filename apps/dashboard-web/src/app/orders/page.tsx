'use client'

import React from 'react'
import { useRecentOrders } from '@/hooks/useApi'
import { RealtimeOrders } from '@/components/RealtimeOrders'

export default function OrdersPage() {
  const { data: orders, isLoading } = useRecentOrders(50)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Đơn hàng</h1>
        <p className="text-gray-600 mt-2">Quản lý tất cả đơn hàng</p>
      </div>

      <RealtimeOrders orders={orders || []} isLoading={isLoading} />
    </div>
  )
}
