/**
 * A class to querying operations.
 * @class QueryService
 */
export default class QueryService {
  /**
   * Creates an instance of QueryService.
   *
   * @param {boolean} [debug=false] Shows queries if true
   * @memberof QueryService
   */
  constructor (debug = false) {
    this.debug = debug
    this.endpoint = 'http://localhost:3030/videos/query'
    this.prefixes = [
      { alias: 'cbo', url: 'http://www.crowdbehaviorannotation#' },
      { alias: 'rdfs', url: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#' },
      { alias: 'ma-ont', url: 'http://www.w3.org/ns/ma-ont#' },
      { alias: 'ninsuna', url: 'http://multimedialab.elis.ugent.be/organon/ontologies/ninsuna#' },
      { alias: 'mpeg7', url: 'http://metadata.net/mpeg7/mpeg7.owl#' },
      { alias: 'oa', url: 'http://www.w3.org/ns/oa#' },
      { alias: 'opmv', url: 'http://purl.org/net/opmv/ns#' }
    ]
  }

  /**
   * Inserts prefixes to top of the SPARQL query.
   *
   * @param {String} sparqlQuery SPARQL query without prefixes
   * @memberof QueryService
   *
   * @returns {String} SPARQL query with prefixes
   * @throws Throw an error if argument is empty, null or contains undefined prefix.
   */
  prepare (sparqlQuery) {
    if (!sparqlQuery) { throw new Error('sparqlQuery is empty!') }

    let prefixes = ''

    const prefixSelector = new RegExp(/[a-zA-Z(\-)?0-9]*:/g)
    let match
    while ((match = prefixSelector.exec(sparqlQuery))) {
      let matchedAlias = match[0].slice(0, -1)
      let prefix = this.prefixes.find(prefix => prefix.alias === matchedAlias)
      if (prefix === undefined) {
        throw new Error(`Prefix '${matchedAlias}' is not defined!`)
      }
    }

    this.prefixes.forEach((prefix) => {
      if (sparqlQuery.includes(prefix.alias)) {
        prefixes += `PREFIX ${prefix.alias}: <${prefix.url}>`
      }
    })

    const query = prefixes + sparqlQuery
    if (this.debug) console.log(query)

    return encodeURIComponent(query)
  }

  /**
   * Posts SPARQL query to API endpoint and receives results of the SPARQL query.
   *
   * @param {String} sparqlQuery SPARQL query without prefixes
   * @memberof QueryService
   *
   * @returns {Promise} Results of SPARQL query
   */
  execute (sparqlQuery) {
    let results = fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `query=${this.prepare(sparqlQuery)}`
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      console.log(error)
    })

    return results
  }
}
