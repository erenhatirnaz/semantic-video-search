import chai from 'chai'
import sinonChai from 'sinon-chai'

import SearchService from '@/services/search_service'
import testSamples from './test_samples'

const expect = chai.expect
chai.use(sinonChai)

describe('SearchService', () => {
  describe('generateSearchQuery function', () => {
    let searchService

    beforeEach(() => {
      searchService = new SearchService()
    })

    it('should generates correct sparql search query', () => {
      testSamples.forEach((sample) => {
        const sparqlQuery = searchService.generateSearchQuery(sample.query)

        expect(sparqlQuery).to.be.a('string')
        sample.expectations.includes.forEach((expression) => {
          expect(sparqlQuery).to.includes(expression)
        })

        sample.expectations.notIncludes.forEach((expression) => {
          expect(sparqlQuery).to.not.includes(expression)
        })
      })
    })

    it('should log sparql query to console when debug mode is true', () => {
      searchService.debug = true
      sinon.spy(console, 'log')

      searchService.generateSearchQuery(testSamples[0].query)

      expect(console.log).to.be.calledOnce

      console.log.restore()
    })
  })
})
