'use client'

import React from 'react'
import {
  useDashboard,
  useRevenueForecasting,
  useRecentOrders,
} from '@/hooks/useApi'
import { StatCard } from '@/components/StatCard'
import {
  RevenueLineChart,
  ForecastChart,
  TopProductsChart,
  ProductPieChart,
} from '@/components/Charts'
import { RealtimeOrders } from '@/components/RealtimeOrders'
import { CardSkeleton, ChartSkeleton } from '@/components/Skeleton'

export default function DashboardPage() {
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard()
  const { data: forecast, isLoading: forecastLoading } = useRevenueForecasting(30)
  const { data: recentOrders, isLoading: ordersLoading } = useRecentOrders(10)

  if (dashboardLoading || !dashboard) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Doanh thu tổng',
      value: `$${Number(dashboard.stats.total_revenue).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: '💰',
      trend: { value: 12.5, direction: 'up' as const },
    },
    {
      title: 'Tổng đơn hàng',
      value: dashboard.stats.total_orders.toLocaleString('en-US'),
      icon: '📦',
      trend: { value: 8.2, direction: 'up' as const },
    },
    {
      title: 'Giá trị trung bình',
      value: `$${Number(dashboard.stats.average_order_value).toFixed(2)}`,
      icon: '📊',
      trend: { value: 3.1, direction: 'down' as const },
    },
    {
      title: 'Đơn hôm nay',
      value: dashboard.stats.orders_today,
      icon: '📈',
      trend: { value: 5.4, direction: 'up' as const },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dashboard.daily_sales && dashboard.daily_sales.length > 0 ? (
          <RevenueLineChart
            data={dashboard.daily_sales}
            title="Doanh thu hàng ngày (30 ngày)"
          />
        ) : (
          <ChartSkeleton />
        )}

        {forecast?.forecast && forecast.forecast.length > 0 ? (
          <ForecastChart
            data={forecast.forecast}
            title="Dự báo doanh thu AI (30 ngày)"
          />
        ) : (
          <ChartSkeleton />
        )}
      </div>

      {/* Product Sales Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dashboard.top_products && dashboard.top_products.length > 0 ? (
          <>
            <TopProductsChart
              data={dashboard.top_products}
              title="Top sản phẩm bán chạy"
            />
            <ProductPieChart
              data={dashboard.top_products}
              title="Phân bổ doanh thu theo sản phẩm"
            />
          </>
        ) : (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        )}
      </div>

      {/* Realtime Orders */}
      <RealtimeOrders orders={recentOrders || []} isLoading={ordersLoading} />
    </div>
  )
}
