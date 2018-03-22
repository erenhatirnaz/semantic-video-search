import QueryService from './query_service'

export default class VideosService extends QueryService {
  getAllCameraNames () {
    const cameraNames = []
    const query = 'SELECT DISTINCT ?cameraName WHERE { ?video a mpeg7:Video . ?video cbo:cameraName ?cameraName . } ORDER BY ?cameraName'

    this.execute(query).then((response) => {
      response.results.bindings.forEach((result) => {
        cameraNames.push(result.cameraName.value)
      })
    })

    return cameraNames
  }

  getAllDatasets () {
    const datasets = []
    const query = 'SELECT DISTINCT ?dataset WHERE { ?video a mpeg7:Video . ?video cbo:datasetName ?dataset . }'

    this.execute(query).then((response) => {
      response.results.bindings.forEach((result) => {
        datasets.push(result.dataset.value)
      })
    })

    return datasets
  }
}
