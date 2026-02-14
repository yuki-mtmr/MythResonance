import { describe, it, expect } from 'vitest'
import questions from '../questions.json'
import deities from '../deities.json'
import { computeResult, Deity, Question } from '../../lib/scoring'

const deityIds = new Set(deities.map((d) => d.id))
const typedQuestions = questions as Question[]
const typedDeities = deities as Deity[]

describe('questions.json 整合性', () => {
  it('質問数が20問である', () => {
    expect(questions).toHaveLength(20)
  })

  it('各質問に4つの選択肢がある', () => {
    questions.forEach((q) => {
      expect(q.options).toHaveLength(4)
    })
  })

  it('スコア内のdeity IDが全てdeities.jsonに存在する', () => {
    questions.forEach((q) => {
      q.options.forEach((opt) => {
        Object.keys(opt.scores).forEach((deityId) => {
          expect(deityIds.has(deityId)).toBe(true)
        })
      })
    })
  })

  it('全ての神が少なくとも1つの選択肢で参照されている', () => {
    const referencedIds = new Set<string>()
    questions.forEach((q) => {
      q.options.forEach((opt) => {
        Object.keys(opt.scores).forEach((id) => referencedIds.add(id))
      })
    })
    deities.forEach((deity) => {
      expect(referencedIds.has(deity.id)).toBe(true)
    })
  })

  it('全ての神が「勝てる」（最適回答で最高スコアになる）', () => {
    // 各神について、最も有利な回答パターンを探す
    deities.forEach((deity) => {
      const bestAnswers: number[] = []
      typedQuestions.forEach((q) => {
        let bestOptionIndex = 0
        let bestScore = -1
        q.options.forEach((opt, optIdx) => {
          const score = (opt.scores as Record<string, number>)[deity.id] ?? 0
          if (score > bestScore) {
            bestScore = score
            bestOptionIndex = optIdx
          }
        })
        bestAnswers.push(bestOptionIndex)
      })
      const result = computeResult(bestAnswers, typedQuestions, typedDeities)
      expect(result.id).toBe(deity.id)
    })
  })
})
