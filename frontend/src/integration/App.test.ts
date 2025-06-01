import { describe, it, expect } from 'vitest'

describe('Integration: Backend API', () => {
  it('should respond with 200 on GET /api/forecast/?city=Москва', async () => {
    const res = await fetch('http://localhost:8000/api/forecast/?city=Москва')
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toHaveProperty('forecast') // проверь нужный ключ
  })
})
