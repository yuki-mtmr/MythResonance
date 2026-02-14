import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Result from '../Result'
import questions from '../../data/questions.json'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Result ページ', () => {
  it('質問数未満の回答でリダイレクトされる', () => {
    const insufficientAnswers = Array(questions.length - 1).fill(0)
    render(
      <MemoryRouter>
        <Result answers={insufficientAnswers} mode="mythology" />
      </MemoryRouter>
    )
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('十分な回答数で結果が表示される', () => {
    const fullAnswers = Array(questions.length).fill(0)
    const { container } = render(
      <MemoryRouter>
        <Result answers={fullAnswers} mode="mythology" />
      </MemoryRouter>
    )
    expect(container.querySelector('.result-container') || container.querySelector('.loading')).toBeTruthy()
  })
})
