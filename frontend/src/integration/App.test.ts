import { describe, it, expect } from 'vitest';
import fetch from 'node-fetch';

describe('Integration: Backend API', () => {
  it('should respond with 200 on GET /api/health', async () => {
    const res = await fetch('http://localhost:8000/api/health');
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe('ok');
  });
});
