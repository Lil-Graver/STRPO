import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, test, expect } from 'vitest'
import App from './App'

describe('App', () => {
  test('renders app', () => {
    render(<App />)
    expect(screen.getByText(/прогноз погоды/i)).toBeInTheDocument()
  })
})
