import React from 'react'
import { useDashboard } from '../features/sales/hooks/useDashboard'

export const DashboardPage: React.FC = () => {
  const { data, loading, error } = useDashboard()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading dashboard</div>

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render dashboard content here */}
    </div>
  )
}

export default DashboardPage
