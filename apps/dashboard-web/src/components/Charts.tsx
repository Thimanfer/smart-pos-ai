'use client'

import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartProps {
  data: any[]
  title: string
  className?: string
}

export const RevenueLineChart: React.FC<ChartProps> = ({ data, title, className }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className || ''}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total_sales"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9' }}
            name="Doanh thu"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const ForecastChart: React.FC<ChartProps> = ({ data, title, className }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className || ''}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="forecasted_revenue"
            stroke="#a855f7"
            strokeWidth={2}
            name="Dự báo"
          />
          <Line
            type="monotone"
            dataKey="lower_bound"
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray="5 5"
            name="Giới hạn dưới"
          />
          <Line
            type="monotone"
            dataKey="upper_bound"
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray="5 5"
            name="Giới hạn trên"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const TopProductsChart: React.FC<ChartProps> = ({ data, title, className }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className || ''}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product_name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_sales" fill="#0ea5e9" name="Doanh thu" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface ProductPieChartProps {
  data: Array<{ product_name: string; revenue_percentage: number }>
  title: string
  className?: string
}

const COLORS = ['#0ea5e9', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#06b6d4']

export const ProductPieChart: React.FC<ProductPieChartProps> = ({ data, title, className }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className || ''}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ product_name, revenue_percentage }) =>
              `${product_name}: ${revenue_percentage.toFixed(1)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="revenue_percentage"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
