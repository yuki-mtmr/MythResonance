import { describe, it, expect } from 'vitest'
import demons from '../demons.json'

describe('demons.json データ整合性', () => {
  it('合計80体以上存在する', () => {
    expect(demons.length).toBeGreaterThanOrEqual(80)
  })

  it('全フィールドが存在する', () => {
    demons.forEach((demon) => {
      expect(demon).toHaveProperty('id')
      expect(demon).toHaveProperty('name')
      expect(demon).toHaveProperty('category')
      expect(demon).toHaveProperty('vibe_keywords')
      expect(demon).toHaveProperty('summary')
      expect(demon).toHaveProperty('strengths')
      expect(demon).toHaveProperty('pitfalls')
      expect(demon).toHaveProperty('alignment_tips')
      expect(demon).toHaveProperty('share_text')
    })
  })

  it('vibe_keywordsが4個ある', () => {
    demons.forEach((demon) => {
      expect(demon.vibe_keywords).toHaveLength(4)
    })
  })

  it('strengthsが3個ある', () => {
    demons.forEach((demon) => {
      expect(demon.strengths).toHaveLength(3)
    })
  })

  it('pitfallsが3個ある', () => {
    demons.forEach((demon) => {
      expect(demon.pitfalls).toHaveLength(3)
    })
  })

  it('alignment_tipsが3個ある', () => {
    demons.forEach((demon) => {
      expect(demon.alignment_tips).toHaveLength(3)
    })
  })

  it('IDが一意である', () => {
    const ids = demons.map((d) => d.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})
