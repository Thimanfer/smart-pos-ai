import apiClient from './apiClient'
import type { DashboardResponse, Order } from '@/types'

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const { data } = await apiClient.get('/dashboard')
    return data
  },

  getStats: async () => {
    const { data } = await apiClient.get('/dashboard/stats')
    return data
  },

  getDailySales: async (days: number = 30) => {
    const { data } = await apiClient.get(`/dashboard/sales/daily?days=${days}`)
    return data
  },

  getTopProducts: async (limit: number = 10) => {
    const { data } = await apiClient.get(`/dashboard/products/top?limit=${limit}`)
    return data
  },
}

export const orderService = {
  getOrders: async (limit: number = 100, offset: number = 0) => {
    const { data } = await apiClient.get(`/orders?limit=${limit}&offset=${offset}`)
    return data
  },

  getRecentOrders: async (limit: number = 20): Promise<Order[]> => {
    const { data } = await apiClient.get(`/orders/recent?limit=${limit}`)
    return data
  },

  createOrder: async (order: Omit<Order, 'id' | 'created_at'>) => {
    const { data } = await apiClient.post('/orders', order)
    return data
  },
}

export const aiService = {
  getRevenueForecasting: async (days: number = 30) => {
    const { data } = await apiClient.get(`/ai/forecast/revenue?days=${days}`)
    return data
  },

  predictProductDemand: async (productName: string, days: number = 30) => {
    const { data } = await apiClient.get(`/ai/forecast/product/${productName}?days=${days}`)
    return data
  },

  detectAnomalies: async (threshold: number = 2.0) => {
    const { data } = await apiClient.get(`/ai/anomalies?threshold=${threshold}`)
    return data
  },
}

