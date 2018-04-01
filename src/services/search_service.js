import QueryService from './query_service'

/**
 * A class to searching operations.
 * @class SearchService
 */
export default class SearchService extends QueryService {
  /**
   * Generates a sparql search query from given fields.
   * NOTE: This function is so complex need to refactor.
   *
   * @param { cameraNames, datasets, eventClassification, crowdDensity, crowdMovement, duration } Query fields
   * @returns {String} SRPARQL query
   */
  generateSearchQuery ({ cameraNames, datasets, eventClassification, crowdDensity, crowdMovement, duration }) {
    const selects = [
      '?cameraName',
      '?datasetName',
      '?videoDuration',
      '?segmentDuration',
      '?densityCategory ',
      '?crowdMovement ',
      '?eventClassification ',
      '?classificationConfidence '
    ]
    const where = [
      '?video a mpeg7:Video .',
      '?video cbo:cameraName ?cameraName .',
      '?video cbo:datasetName ?datasetName .',
      '?video ma-ont:duration ?videoDuration .',
      '?video mpeg7:spatio-temporal_decomposition ?segment .',
      '?segment a mpeg7:VideoSegment .',
      '?segment ma-ont:duration ?segmentDuration .',
      '?annotation a oa:Annotation .',
      '?annotation oa:hasTarget ?segment .',
      '?annotation cbo:densityCategory ?densityCategory .',
      '?annotation cbo:crowdMovement ?crowdMovement .',
      '?annotation cbo:eventClassification ?eventClassification .',
      '?annotation cbo:classificationConfidence ?classificationConfidence . '
    ]
    const constants = {
      'normal': 'cbo:NormalCrowdBehaviour',
      'abnormal': 'cbo:CrowdAlert',
      'notCrowded': 'cbo:NotCrowded',
      'crowded': 'cbo:Crowded',
      'veryCrowded': 'cbo:VeryCrowded',
      'walking': 'cbo:CrowdWalking',
      'running': 'cbo:CrowdRunning',
      'stationary': 'cbo:CrowdStationary'
    }

    let filters = []

    if (cameraNames.length > 0) {
      let cameraNameFilters = []
      cameraNames.forEach((cameraName) => {
        cameraNameFilters.push(`?cameraName = "${cameraName}"`)
      })
      filters.push(`( ${cameraNameFilters.join(' || ')} )`)
    }

    if (datasets.length > 0) {
      let datasetNameFilters = []
      datasets.forEach((datasetName) => {
        datasetNameFilters.push(`?datasetName = "${datasetName}"`)
      })
      filters.push(`( ${datasetNameFilters.join(' || ')} )`)
    }

    let durationFilters = []
    if (!isNaN(duration.start)) {
      durationFilters.push(`?segmentDuration >= ${duration.start}`)
    }
    if (!isNaN(duration.end)) {
      durationFilters.push(`?segmentDuration <= ${duration.end}`)
    }
    if (durationFilters.length > 0) {
      filters.push(`( ${durationFilters.join(' && ')} )`)
    }

    let values = []
    values.push(`VALUES ?eventClassification { ${constants[eventClassification]} }`)
    values.push(`VALUES ?crowdDensity { ${constants[crowdDensity]} }`)
    values.push(`VALUES ?crowdMovement { ${constants[crowdMovement]} }`)

    const filtersInline = (filters.length > 0)
      ? `FILTER (${filters.join(' && ')})`
      : ''

    const sparqlQuery = `SELECT ${selects.join(' ')}` +
      'WHERE {' +
        where.join(' ') +
        filtersInline +
        values.join(' ') +
      '}'
    if (this.debug) { console.log(sparqlQuery) }

    return sparqlQuery
  }

  /**
   * Get all search results.
   *
   * @param {Object} query
   * @returns {Array} Search results
   */
  getResults (query) {
    let results = []
    const sparqlQuery = this.generateSearchQuery(query)

    this.execute(sparqlQuery).then((response) => {
      response.results.bindings.forEach((result) => {
        results.push(result)
      })
    })

    if (this.debug) { console.log(results) }

    return results
  }
}
