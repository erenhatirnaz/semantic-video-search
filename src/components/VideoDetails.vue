<template>
  <div class="video-details">
    <h1 class="ui dividing header">
      {{ video.segment.value.split('#')[1].trim() }}
    </h1>
    <div class="video">
      <div class="player">
        <video :src="videoSource" controls></video>
      </div>
      <div class="details">
        <div class="table">
          <div class="field">
            <label>Dataset Name:</label>
            <p> {{ video.datasetName.value }} </p>
          </div>
          <div class="field">
            <label>Duration:</label>
            <p> {{ video.segmentDuration.value }} </p>
          </div>
          <div class="field">
            <label>Crowd Densinty:</label>
            <p> {{ video.densityCategory.value.split('#')[1] }} </p>
          </div>
          <div class="field">
            <label>Crowd Movement:</label>
            <p> {{ video.crowdMovement.value.split('#')[1] }} </p>
          </div>
          <div class="field">
            <label>Event Classification:</label>
            <p> {{ video.eventClassification.value.split('#')[1] }} </p>
          </div>
          <div class="field">
            <label>Classification Confidence:</label>
            <p> {{ video.classificationConfidence.value }} </p>
          </div>
        </div>
      </div>
    </div>
    <div class="charts">
      <div class="video-statistic">
        <div class="panel-title">
          <h2 class="ui dividing header">Video Statistic [{{ video.video.value.split('#')[1] }}] </h2>
        </div>
        <div class="chart">
          <canvas id="videoPieChart"></canvas>
        </div>
      </div>
      <div class="camera-statistic">
        <div class="panel-title">
          <h2 class="ui dividing header">Camera Statistic [{{ video.cameraName.value }}] </h2>
        </div>
        <div class="chart">
          <canvas id="cameraPieChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from 'chart.js'

import StatisticService from '@/services/statistic_service'

export default {
  name: 'VideoDetails',
  props: {
    video: {
      required: true
    }
  },
  computed: {
    videoSource () {
      const fileName = this.video.segment.value.split('#')[1]

      return `static/videos/${fileName}.mp4`
    }
  },
  mounted () {
    const statService = new StatisticService()
    statService.getVideoStatistics(this.video).then((stats) => {
      stats.normal = parseFloat(stats.normal.toFixed(2))
      stats.abnormal = parseFloat(stats.abnormal.toFixed(2))
      const videoPieChart = $(this.$el).find('#videoPieChart')[0].getContext('2d')
      // eslint-disable-next-line
      new chart(videoPieChart, {
        type: 'pie',
        data: {
          labels: [ 'Normal', 'Abnormal' ],
          datasets: [{
            data: [ stats.normal, stats.abnormal ],
            backgroundColor: [ '#197bbd', '#21ba45' ],
            borderWith: 2
          }]
        }
      })
    })
    statService.getCameraStatistics(this.video.cameraName.value).then((stats) => {
      stats.normal = parseFloat(stats.normal.toFixed(2))
      stats.abnormal = parseFloat(stats.abnormal.toFixed(2))
      const videoPieChart = $(this.$el).find('#cameraPieChart')[0].getContext('2d')
      // eslint-disable-next-line
      new chart(videoPieChart, {
        type: 'pie',
        data: {
          labels: [ 'Normal', 'Abnormal' ],
          datasets: [{
            data: [ stats.normal, stats.abnormal ],
            backgroundColor: [ '#197bbd', '#21ba45' ],
            borderWith: 2
          }]
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.video-details {
  .video {
    display: flex;
    margin-bottom: 15px;

    .player {
      height: 430px;
      background-color: #197bbd;
      padding: 15px;
      border-radius: 15px;

      video {
        height: 100%;
      }
    }

    .details {
      position: relative;
      background-color: #197bbd;
      width: 100%;
      border-radius: 15px;
      padding: 15px;
      margin-left: 15px;

      .table {
        height: 100%;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .field {
          background-color: #fff;
          padding: 5px;
          margin-bottom: 4px;
          border-radius: 10px;

          label {
            font-size: 1.2em;
            font-weight: bold;
            display: block;
            text-decoration: underline;
            text-decoration-color: #197bbd;
          }

          p {
            font-size: 1.5em;
          }
        }
      }
    }
  }

  .charts {
    width: 100%;
    display: flex;

    .video-statistic, .camera-statistic {
      width: 50%;

      h2 { text-align: center; }
    }

    .camera-statistic > .chart {
      border-left: #dedded 1px solid;
    }
  }
}
</style>
