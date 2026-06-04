'use client'

import React from 'react'
import { useRevenueForecasting, useAnomalies } from '@/hooks/useApi'
import { ForecastChart } from '@/components/Charts'
import { ChartSkeleton, CardSkeleton } from '@/components/Skeleton'

export default function ForecastPage() {
  const { data: forecast, isLoading: forecastLoading } = useRevenueForecasting(90)
  const { data: anomalies, isLoading: anomaliesLoading } = useAnomalies(2.0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dự báo & Phân tích AI</h1>
        <p className="text-gray-600 mt-2">Dự báo doanh thu và phát hiện bất thường</p>
      </div>

      {/* Forecast Chart */}
      <div className="grid grid-cols-1 gap-6">
        {forecastLoading ? (
          <ChartSkeleton />
        ) : forecast?.forecast ? (
          <ForecastChart
            data={forecast.forecast}
            title="Dự báo doanh thu 90 ngày (AI)"
          />
        ) : null}
      </div>

      {/* Anomalies */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phát hiện bất thường</h3>

        {anomaliesLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : anomalies?.anomalies && anomalies.anomalies.length > 0 ? (
          <div className="space-y-3">
            {anomalies.anomalies.map((anomaly, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-l-4 ${
                  anomaly.type === 'spike'
                    ? 'border-green-400 bg-green-50'
                    : 'border-red-400 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {anomaly.type === 'spike' ? '📈 Tăng vọt' : '📉 Giảm mạnh'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Ngày {anomaly.date}: ${Number(anomaly.revenue).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {anomaly.z_score.toFixed(2)}σ
                    </p>
                    <p className="text-xs text-gray-600">Z-score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Không phát hiện bất thường</p>
        )}
      </div>
    </div>
  )
}
