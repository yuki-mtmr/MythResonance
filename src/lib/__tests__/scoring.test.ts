import { describe, it, expect } from 'vitest'
import { computeResult, Deity, Question } from '../scoring'

const makeDeity = (id: string, name = id): Deity => ({
  id,
  name,
  pantheon: 'Test',
  vibe_keywords: ['a', 'b', 'c', 'd'],
  summary: 'test summary',
  strengths: ['s1', 's2', 's3'],
  pitfalls: ['p1', 'p2', 'p3'],
  alignment_tips: ['t1', 't2', 't3'],
  share_text: 'share',
})

describe('computeResult', () => {
  it('最高スコアの神が返される', () => {
    const deities = [makeDeity('a'), makeDeity('b'), makeDeity('c')]
    const questions: Question[] = [
      {
        id: 'q1',
        text: 'test',
        options: [
          { label: 'opt1', scores: { a: 1, b: 3, c: 2 } },
          { label: 'opt2', scores: { a: 3, b: 1, c: 2 } },
          { label: 'opt3', scores: { a: 2, b: 2, c: 3 } },
          { label: 'opt4', scores: { a: 2, b: 2, c: 2 } },
        ],
      },
    ]
    const result = computeResult([0], questions, deities)
    expect(result.id).toBe('b')
  })

  it('同点時は配列順で先の神が勝つ', () => {
    const deities = [makeDeity('a'), makeDeity('b')]
    const questions: Question[] = [
      {
        id: 'q1',
        text: 'test',
        options: [
          { label: 'opt1', scores: { a: 2, b: 2 } },
          { label: 'opt2', scores: {} },
          { label: 'opt3', scores: {} },
          { label: 'opt4', scores: {} },
        ],
      },
    ]
    const result = computeResult([0], questions, deities)
    expect(result.id).toBe('a')
  })

  it('不明なdeity IDのスコアは無視される', () => {
    const deities = [makeDeity('a'), makeDeity('b')]
    const questions: Question[] = [
      {
        id: 'q1',
        text: 'test',
        options: [
          { label: 'opt1', scores: { a: 1, b: 2, unknown: 10 } },
          { label: 'opt2', scores: {} },
          { label: 'opt3', scores: {} },
          { label: 'opt4', scores: {} },
        ],
      },
    ]
    const result = computeResult([0], questions, deities)
    expect(result.id).toBe('b')
  })

  it('20問・40体以上での動作確認', () => {
    const deities = Array.from({ length: 41 }, (_, i) => makeDeity(`deity_${i}`))
    const questions: Question[] = Array.from({ length: 20 }, (_, i) => ({
      id: `q${i + 1}`,
      text: `Question ${i + 1}`,
      options: [
        { label: 'opt1', scores: { [`deity_${i % 41}`]: 3 } },
        { label: 'opt2', scores: { [`deity_${(i + 10) % 41}`]: 3 } },
        { label: 'opt3', scores: { [`deity_${(i + 20) % 41}`]: 3 } },
        { label: 'opt4', scores: { [`deity_${(i + 30) % 41}`]: 3 } },
      ],
    }))

    // 全問opt1を選ぶ → deity_0が最高スコア
    const answers = Array(20).fill(0)
    const result = computeResult(answers, questions, deities)
    expect(result).toBeDefined()
    expect(deities.some((d) => d.id === result.id)).toBe(true)
  })
})
