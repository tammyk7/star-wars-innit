import React, { useEffect, useState } from "react"

export default function UseFetch(url: string, dependency: any | any[]) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    const grabData = async () => {
      try {
        const response = await fetch(url)
        let data = await response.json()
        setData(data)
        setError(null)
        console.log(data)
      } catch (err: any) {
        setError(err)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    grabData()
  }, [dependency])

  return { data, loading, error }
}
