import React from 'react'
import clsx from 'clsx'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={clsx('mt-2 text-sm font-medium', {
                'text-green-600': trend.direction === 'up',
                'text-red-600': trend.direction === 'down',
              })}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="text-4xl text-gray-400">{icon}</div>
      </div>
    </div>
  )
}
