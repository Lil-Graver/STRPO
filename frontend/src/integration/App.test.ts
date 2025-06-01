import { describe, it, expect } from 'vitest';

describe('Integration: Backend API', () => {
  it('should respond with 200 on GET /api/weather', async () => {
  const res = await fetch('http://localhost:8000/api/weather');
  expect(res.status).toBe(200);
  // можно также проверить структуру ответа
});
});
