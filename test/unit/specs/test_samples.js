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
        'VALUES ?densityCategory { cbo:Crowded }',
        'VALUES ?crowdMovement { cbo:CrowdRunning }'
      ],
      notIncludes: [
        '?segmentDuration >=',
        '?segmentDuration <='
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
        '( ?segmentDuration >= 6 )'
      ],
      notIncludes: [
        '?cameraName =',
        '?datasetName =',
        '?segmentDuration <=',
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
        '( ?segmentDuration <= 10.1 )'
      ],
      notIncludes: [
        '?cameraName =',
        '?datasetName =',
        '?segmentDuration >=',
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
        '( ?segmentDuration >= 6.1 && ?segmentDuration <= 10.5 )'
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
        'VALUES ?densityCategory { cbo:Crowded }',
        'VALUES ?crowdMovement { cbo:CrowdRunning }'
      ],
      notIncludes: [
        '?cameraName =',
        '?datasetName =',
        '?segmentDuration >=',
        '?segmentDuration <='
      ]
    }
  }
]
