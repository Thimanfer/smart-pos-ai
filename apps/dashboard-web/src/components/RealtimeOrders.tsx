import React from 'react'
import type { Order } from '@/types'

interface RealtimeOrdersProps {
  orders: Order[]
  isLoading?: boolean
}

export const RealtimeOrders: React.FC<RealtimeOrdersProps> = ({ orders, isLoading }) => {
  const formatMoney = (value: unknown) => {
    const numericValue = Number(value)
    return Number.isFinite(numericValue) ? numericValue.toFixed(2) : '0.00'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Đơn hàng Realtime</h3>
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Đang cập nhật</span>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Số lượng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Tổng cộng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Không có đơn hàng
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.product_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${formatMoney(order.unit_price)}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${formatMoney(order.total_amount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleTimeString('vi-VN')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
