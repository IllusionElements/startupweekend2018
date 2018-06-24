/* eslint-env mocha */

import { assert, chai } from 'chai'
import AIService, { events } from '../api/ServiceModel'
import { Jobs, sampleKeywords } from './data'

chai.config.includeStack = true
const jobs = (name, ...keywordList) => ({ name, keywordList });

describe('AI Service', () => {
  const Job = Object
    .keys(Jobs)
    .map(job => jobs(job, ...Jobs[job]))

  it('should return a array', () => {
    const AI = new AIService({}, events)
    const mapped = AI.mapKeywordToList(Job, sampleKeywords)
    assert.isArray(mapped)
  })

  it('should be an array', () => {
    const AI = new AIService({}, events)
    const matched = AI
      .mapKeywordToList(Job, sampleKeywords)
      .matchKeywords()
    assert.isArray(matched)
  })

  it('should be an array', () => {
    const AI = new AIService({}, events)
    const matched = AI
      .mapKeywordToList(Job, sampleKeywords)
      .matchKeywords().sortKeywords()

    assert
      .isArray(matched)
  })
})
