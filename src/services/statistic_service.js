import QueryService from './query_service'

export default class StatisticService extends QueryService {
  getVideoStatistics ({ video, videoDuration }) {
    video = video.value.replace('http://www.crowdbehaviorannotation#', 'cbo:')
    videoDuration = parseFloat(videoDuration.value)

    const query = `SELECT
      ?eventClassification
      (SUM(?duration) AS ?totalDuration)
    WHERE {
      ?video a mpeg7:Video .
      ?video mpeg7:spatio-temporal_decomposition ?segment .
      ?segment a mpeg7:VideoSegment .
      ?segment ma-ont:duration ?duration .
      ?annotation a oa:Annotation .
      ?annotation oa:hasTarget ?segment .
      ?annotation cbo:eventClassification ?eventClassification .
      VALUES ?video { ${video} }
    } GROUP BY ?eventClassification`

    return this.execute(query).then((response) => {
      const normal = parseFloat(response.results.bindings[0].totalDuration.value)
      const abnormal = parseFloat(response.results.bindings[1].totalDuration.value)

      return { normal, abnormal }
    }).then((totals) => {
      const normal = (totals.normal * (1 / videoDuration)) * 100
      const abnormal = (totals.abnormal * (1 / videoDuration)) * 100

      return { normal, abnormal }
    })
  }

  getCameraStatistics (cameraName) {
    const query = `SELECT
      ?eventClassification
      (SUM(?duration) AS ?totalDuration)
    WHERE {
      ?video a mpeg7:Video .
      ?video cbo:cameraName ?cameraName .
      ?video mpeg7:spatio-temporal_decomposition ?segment .
      ?segment a mpeg7:VideoSegment .
      ?segment ma-ont:duration ?duration .
      ?annotation a oa:Annotation .
      ?annotation oa:hasTarget ?segment .
      ?annotation cbo:eventClassification ?eventClassification .
      FILTER (?cameraName = "${cameraName}")
    } GROUP BY ?eventClassification`

    return this.execute(query).then((response) => {
      const normal = parseFloat(response.results.bindings[0].totalDuration.value)
      const abnormal = parseFloat(response.results.bindings[1].totalDuration.value)
      const camera = normal + abnormal

      return { normal, abnormal, camera }
    }).then((totals) => {
      const normal = (totals.normal * (1 / totals.camera)) * 100
      const abnormal = (totals.abnormal * (1 / totals.camera)) * 100

      return { normal, abnormal }
    })
  }
}
