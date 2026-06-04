export type DashboardStats = {
  total_revenue: number
  total_orders: number
  average_order_value: number
  orders_today: number
}

export type ProductSales = {
  product_name: string
  quantity: number
  total_sales: number
  revenue_percentage: number
}

export type DailySales = {
  date: string
  total_sales: number
  order_count: number
  average_order_value: number
}

export type ForecastData = {
  date: string
  forecasted_revenue: number
  lower_bound: number
  upper_bound: number
  confidence: number
}

export type DashboardResponse = {
  stats: DashboardStats
  top_products: ProductSales[]
  daily_sales: DailySales[]
  revenue_forecast: ForecastData[]
}

export type Order = {
  id: number
  product_name: string
  quantity: number
  unit_price: number
  total_amount: number
  created_at: string
}
