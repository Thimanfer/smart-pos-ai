import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { dashboardService, orderService, aiService } from '@/services/api'
import type { DashboardResponse, Order } from '@/types'

export const useDashboard = (): UseQueryResult<DashboardResponse> => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.getDashboard(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60, // 1 minute
  })
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getStats(),
    staleTime: 1000 * 60 * 5,
  })
}

export const useDailySales = (days: number = 30) => {
  return useQuery({
    queryKey: ['daily-sales', days],
    queryFn: () => dashboardService.getDailySales(days),
    staleTime: 1000 * 60 * 5,
  })
}

export const useTopProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: ['top-products', limit],
    queryFn: () => dashboardService.getTopProducts(limit),
    staleTime: 1000 * 60 * 5,
  })
}

export const useRecentOrders = (limit: number = 20): UseQueryResult<Order[]> => {
  return useQuery({
    queryKey: ['recent-orders', limit],
    queryFn: () => orderService.getRecentOrders(limit),
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 30,
  })
}

export const useRevenueForecasting = (days: number = 30) => {
  return useQuery({
    queryKey: ['revenue-forecast', days],
    queryFn: () => aiService.getRevenueForecasting(days),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export const useAnomalies = (threshold: number = 2.0) => {
  return useQuery({
    queryKey: ['anomalies', threshold],
    queryFn: () => aiService.detectAnomalies(threshold),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}
