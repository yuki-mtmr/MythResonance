import { describe, it, expect } from 'vitest'
import demonQuestions from '../demon-questions.json'
import demons from '../demons.json'
import { computeResult, Deity, Question } from '../../lib/scoring'

const demonIds = new Set(demons.map((d) => d.id))
const typedQuestions = demonQuestions as Question[]
const typedDemons = demons as unknown as Deity[]

describe('demon-questions.json 整合性', () => {
  it('質問数が20問である', () => {
    expect(demonQuestions).toHaveLength(20)
  })

  it('各質問に4つの選択肢がある', () => {
    demonQuestions.forEach((q) => {
      expect(q.options).toHaveLength(4)
    })
  })

  it('スコア内のdemon IDが全てdemons.jsonに存在する', () => {
    demonQuestions.forEach((q) => {
      q.options.forEach((opt) => {
        Object.keys(opt.scores).forEach((demonId) => {
          expect(demonIds.has(demonId)).toBe(true)
        })
      })
    })
  })

  it('全ての悪魔が少なくとも1つの選択肢で参照されている', () => {
    const referencedIds = new Set<string>()
    demonQuestions.forEach((q) => {
      q.options.forEach((opt) => {
        Object.keys(opt.scores).forEach((id) => referencedIds.add(id))
      })
    })
    demons.forEach((demon) => {
      expect(referencedIds.has(demon.id)).toBe(true)
    })
  })

  it('全ての悪魔が「勝てる」（最適回答で最高スコアになる）', () => {
    demons.forEach((demon) => {
      const bestAnswers: number[] = []
      typedQuestions.forEach((q) => {
        let bestOptionIndex = 0
        let bestScore = -1
        q.options.forEach((opt, optIdx) => {
          const score = (opt.scores as Record<string, number>)[demon.id] ?? 0
          if (score > bestScore) {
            bestScore = score
            bestOptionIndex = optIdx
          }
        })
        bestAnswers.push(bestOptionIndex)
      })
      const result = computeResult(bestAnswers, typedQuestions, typedDemons)
      expect(result.id).toBe(demon.id)
    })
  })
})
