'use client'

import React from 'react'
import { useDailySales, useTopProducts } from '@/hooks/useApi'
import { RevenueLineChart, TopProductsChart } from '@/components/Charts'
import { ChartSkeleton } from '@/components/Skeleton'

export default function AnalyticsPage() {
  const { data: dailySalesData, isLoading: dailySalesLoading } = useDailySales(60)
  const { data: topProductsData, isLoading: topProductsLoading } = useTopProducts(10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Phân tích</h1>
        <p className="text-gray-600 mt-2">Phân tích doanh số bán hàng chi tiết</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dailySalesLoading ? (
          <ChartSkeleton />
        ) : dailySalesData?.daily_sales ? (
          <RevenueLineChart
            data={dailySalesData.daily_sales}
            title="Doanh thu 60 ngày qua"
          />
        ) : null}

        {topProductsLoading ? (
          <ChartSkeleton />
        ) : topProductsData?.top_products ? (
          <TopProductsChart
            data={topProductsData.top_products}
            title="Top 10 sản phẩm"
          />
        ) : null}
      </div>
    </div>
  )
}
