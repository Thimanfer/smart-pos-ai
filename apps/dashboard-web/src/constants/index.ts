export const API_ENDPOINTS = {
  DASHBOARD: '/dashboard',
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_SALES: '/dashboard/sales/daily',
  DASHBOARD_PRODUCTS: '/dashboard/products/top',
  ORDERS: '/orders',
  ORDERS_RECENT: '/orders/recent',
  AI_FORECAST: '/ai/forecast/revenue',
  AI_PRODUCT: '/ai/forecast/product',
  AI_ANOMALIES: '/ai/anomalies',
}

export const QUERY_KEYS = {
  DASHBOARD: ['dashboard'],
  DASHBOARD_STATS: ['dashboard-stats'],
  DAILY_SALES: ['daily-sales'],
  TOP_PRODUCTS: ['top-products'],
  RECENT_ORDERS: ['recent-orders'],
  REVENUE_FORECAST: ['revenue-forecast'],
  ANOMALIES: ['anomalies'],
}

export const REFRESH_INTERVALS = {
  FAST: 30 * 1000, // 30 seconds
  MEDIUM: 60 * 1000, // 1 minute
  SLOW: 5 * 60 * 1000, // 5 minutes
  VERY_SLOW: 15 * 60 * 1000, // 15 minutes
}

export const CHART_COLORS = {
  PRIMARY: '#0ea5e9',
  SECONDARY: '#a855f7',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4',
}
