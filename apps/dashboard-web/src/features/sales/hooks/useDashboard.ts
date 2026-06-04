import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export const useDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch dashboard data here
    // const fetchData = async () => {
    //   try {
    //     setLoading(true)
    //     const response = await api.get('/dashboard')
    //     setData(response.data)
    //   } catch (err) {
    //     setError(err)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchData()
  }, [])

  return { data, loading, error }
}
