import { describe, it, expect } from 'vitest'
import deities from '../deities.json'

describe('deities.json データ整合性', () => {
  it('合計40体以上存在する', () => {
    expect(deities.length).toBeGreaterThanOrEqual(40)
  })

  it('全フィールドが存在する', () => {
    deities.forEach((deity) => {
      expect(deity).toHaveProperty('id')
      expect(deity).toHaveProperty('name')
      expect(deity).toHaveProperty('pantheon')
      expect(deity).toHaveProperty('vibe_keywords')
      expect(deity).toHaveProperty('summary')
      expect(deity).toHaveProperty('strengths')
      expect(deity).toHaveProperty('pitfalls')
      expect(deity).toHaveProperty('alignment_tips')
      expect(deity).toHaveProperty('share_text')
    })
  })

  it('vibe_keywordsが4個ある', () => {
    deities.forEach((deity) => {
      expect(deity.vibe_keywords).toHaveLength(4)
    })
  })

  it('strengthsが3個ある', () => {
    deities.forEach((deity) => {
      expect(deity.strengths).toHaveLength(3)
    })
  })

  it('pitfallsが3個ある', () => {
    deities.forEach((deity) => {
      expect(deity.pitfalls).toHaveLength(3)
    })
  })

  it('alignment_tipsが3個ある', () => {
    deities.forEach((deity) => {
      expect(deity.alignment_tips).toHaveLength(3)
    })
  })

  it('IDが一意である', () => {
    const ids = deities.map((d) => d.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('9つの神話体系を含む', () => {
    const pantheons = new Set(deities.map((d) => d.pantheon))
    const required = ['Greek', 'Norse', 'Japanese', 'Egyptian', 'Hindu', 'Celtic', 'Chinese', 'Mesopotamian', 'Aztec']
    required.forEach((p) => {
      expect(pantheons.has(p)).toBe(true)
    })
  })
})
