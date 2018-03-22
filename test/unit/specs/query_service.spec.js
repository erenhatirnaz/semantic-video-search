import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import QueryService from '@/services/query_service'

const expect = chai.expect
chai.use(sinonChai)

const exampleQuery = 'SELECT ?cName ?duration WHERE { ?video a mpeg7:Video . ?video cbo:cameraName ?cName . ?video ma-ont:duration ?duration . }'

describe('QueryService', () => {
  it('should initialize correctly', () => {
    const q = new QueryService(true)
    const prefix = q.prefixes.find(prefix => prefix.alias === 'cbo')

    expect(q.debug).to.be.true
    expect(q.endpoint).to.be.equal('http://localhost:3030/videos/query')
    expect(q.prefixes).to.be.an('Array')
    expect(prefix.alias).to.be.equal('cbo')
    expect(prefix.url).to.be.equal('http://www.crowdbehaviorannotation#')
  })

  describe('prepare function', () => {
    let q

    beforeEach(() => {
      q = new QueryService()
    })

    it('should add prefixes correctly', () => {
      const preparedQuery = q.prepare(exampleQuery)
      const expectedPrefixes = [
        'PREFIX cbo: <http://www.crowdbehaviorannotation#>',
        'PREFIX mpeg7: <http://metadata.net/mpeg7/mpeg7.owl#>',
        'PREFIX ma-ont: <http://www.w3.org/ns/ma-ont#>'
      ]

      expect(preparedQuery).to.be.an('String')
      expectedPrefixes.forEach((expectedPrefix) => {
        expect(preparedQuery).to.include(encodeURIComponent(exampleQuery))
      })
      expect(preparedQuery).to.not.include(encodeURIComponent('PREFIX ninsuna: <http://multimedialab.elis.ugent.be/organon/ontologies/ninsuna#>'))
    })

    it('should throw an error when query is empty', () => {
      expect(() => { q.prepare('') }).to.throw('sparqlQuery is empty!')
    })

    it('should throw an error when query contains undefined prefix', () => {
      const query = 'SELECT ?bar WHERE { ?f foo:bar ?bar . }'
      expect(() => { q.prepare(query) }).to.throw(/Prefix '.*' is not defined!/)
    })

    it('should log the query to console when debug mode is true', () => {
      q.debug = true
      sinon.spy(console, 'log')
      q.prepare(exampleQuery)

      expect(console.log).to.be.calledOnce

      console.log.restore()
    })
  })

  describe('execute function', () => {
    let q

    beforeEach(() => {
      q = new QueryService()
    })

    it('should returns results correctly', async () => {
      // NOTE: I'm not sure this test is done well. Needs refactor.
      const response = await q.execute(exampleQuery)

      expect(response).to.be.an('object')
      expect(response).to.have.own.property('head')
      expect(response.head).to.be.an('object')
      expect(response.head.vars).to.be.an('array')
      expect(response.head.vars).to.have.lengthOf.at.least(1)
      expect(response).to.have.own.property('results')
      expect(response.results).to.be.an('object')
      expect(response.results).to.have.own.property('bindings')
      expect(response.results.bindings).to.be.an('array')
      expect(response.results.bindings).to.have.lengthOf.at.least(1)
      expect(response.results.bindings[0]).to.be.an('object')
      expect(response.results.bindings[0]).to.have.own.property('cName')
      expect(response.results.bindings[0].cName).to.have.any.keys('type', 'value')
    })
  })
})
