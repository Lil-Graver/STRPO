import { describe, it, expect } from 'vitest'

describe('Integration: Backend API', () => {
  it('should respond with 200 on GET /api/forecast/ with required params', async () => {
    const url = new URL('http://localhost:8000/api/forecast/')
    url.searchParams.append('lat', '55.7558')       // Москва широта
    url.searchParams.append('lon', '37.6173')       // Москва долгота
    url.searchParams.append('city', 'Москва')
    url.searchParams.append('country', 'RU')

    const res = await fetch(url.toString())

    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toHaveProperty('hourly')
  })
})
