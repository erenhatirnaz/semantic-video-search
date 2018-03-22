export default [
  {
    query: {
      cameraNames: ['UMNOutdoor1', 'UMNIndoor1'],
      datasets: ['UMN'],
      eventClassification: 'abnormal',
      crowdDensity: 'crowded',
      crowdMovement: 'running',
      duration: { start: NaN, end: NaN }
    },
    expectations: {
      includes: [
        'FILTER (( ?cameraName = "UMNOutdoor1" || ?cameraName = "UMNIndoor1" ) && ( ?datasetName = "UMN" ))',
        'VALUES ?eventClassification { cbo:CrowdAlert }',
        'VALUES ?crowdDensity { cbo:Crowded }',
        'VALUES ?crowdMovement { cbo:CrowdRunning }'
      ],
      notIncludes: [
        '?segment_duration >=',
        '?segment_duration <='
      ]
    }
  },
  {
    query: {
      cameraNames: [],
      datasets: [],
      eventClassification: 'normal',
      crowdDensity: 'crowded',
      crowdMovement: 'stationary',
      duration: { start: 6, end: NaN }
    },
    expectations: {
      includes: [
        '( ?segment_duration >= 6 )'
      ],
      notIncludes: [
        '?cameraName =',
        '?datasetName =',
        '?segment_duration <=',
        '(  ) && (  )'
      ]
    }
  },
  {
    query: {
      cameraNames: [],
      datasets: [],
      eventClassification: 'normal',
      crowdDensity: 'crowded',
      crowdMovement: 'stationary',
      duration: { start: NaN, end: 10.1 }
    },
    expectations: {
      includes: [
        '( ?segment_duration <= 10.1 )'
      ],
      notIncludes: [
        '?cameraName =',
        '?datasetName =',
        '?segment_duration >=',
        '(  ) && (  )'
      ]
    }
  },
  {
    query: {
      cameraNames: [],
      datasets: [],
      eventClassification: 'normal',
      crowdDensity: 'crowded',
      crowdMovement: 'stationary',
      duration: { start: 6.1, end: 10.5 }
    },
    expectations: {
      includes: [
        '( ?segment_duration >= 6.1 && ?segment_duration <= 10.5 )'
      ],
      notIncludes: [
        '?cameraName =',
        '?datasetName =',
        '(  ) && (  )'
      ]
    }
  },
  {
    query: {
      cameraNames: [],
      datasets: [],
      eventClassification: 'abnormal',
      crowdDensity: 'crowded',
      crowdMovement: 'running',
      duration: { start: NaN, end: NaN }
    },
    expectations: {
      includes: [
        'VALUES ?eventClassification { cbo:CrowdAlert }',
        'VALUES ?crowdDensity { cbo:Crowded }',
        'VALUES ?crowdMovement { cbo:CrowdRunning }'
      ],
      notIncludes: [
        '?cameraName =',
        '?datasetName =',
        '?segment_duration >=',
        '?segment_duration <='
      ]
    }
  }
]
