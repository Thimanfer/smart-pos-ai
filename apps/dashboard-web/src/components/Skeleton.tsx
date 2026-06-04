import React from 'react'

interface LoadingSkeletonProps {
  className?: string
  count?: number
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = 'h-10',
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${className} bg-gray-200 rounded animate-pulse`}
        />
      ))}
    </>
  )
}

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <LoadingSkeleton className="h-4 w-24 mb-4" />
      <LoadingSkeleton className="h-8 w-32 mb-2" />
      <LoadingSkeleton className="h-4 w-20" />
    </div>
  )
}

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <LoadingSkeleton className="h-6 w-48 mb-4" />
      <LoadingSkeleton className="h-80" />
    </div>
  )
}
