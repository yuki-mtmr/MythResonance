import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../Home'

describe('Home ページ', () => {
  it('サブタイトルが「20の問い」を含む', () => {
    render(
      <MemoryRouter>
        <Home setMode={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByText(/20の問い/)).toBeTruthy()
  })

  it('2つのモードボタンが表示される', () => {
    render(
      <MemoryRouter>
        <Home setMode={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByText('神話の神')).toBeTruthy()
    expect(screen.getByText('ダークサイド')).toBeTruthy()
  })
})
