import { describe, it, expect } from 'vitest'

describe('Integration: Backend API', () => {
  it('should respond with 200 on GET /api/forecast/', async () => {
    const res = await fetch('http://localhost:8000/api/forecast/')
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toHaveProperty('forecast') // Пример: проверь ключ в ответе
  })
})
