import { describe, expect, it } from 'vitest'
import { getErrorMessage } from './error-message'

describe('getErrorMessage', () => {
  it('reads Error.message', () => {
    expect(getErrorMessage(new Error('Network failed'))).toBe('Network failed')
  })

  it('returns string errors as-is', () => {
    expect(getErrorMessage('timeout')).toBe('timeout')
  })

  it('falls back for unknown values', () => {
    expect(getErrorMessage({ code: 500 })).toBe('Unknown error')
  })
})
