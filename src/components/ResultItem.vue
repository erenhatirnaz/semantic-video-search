<template>
  <div class="result-item" :class="layoutModeClass" @mouseover="playVideo" @mouseout="stopVideo" @click="navigateVideoDetails">
    <div class="first-side">
      <div class="summary-video">
        <video :src="summaryVideoSource" disabled=true @ended="replayVideo"></video>
        <div class="duration">
          <i class="play icon"></i> {{ duration }}
        </div>
      </div>
      <div class="text-info">
        <h3 class="cameraName">
          <i class="olive video camera icon"></i> {{ result.cameraName.value }}
        </h3>
        <h4 class="videoTitle">
          <i class="black file icon"></i> {{ fileName }}
        </h4>
        <p class="datasetName">
          <i class="black archive icon"></i> {{ result.datasetName.value }}
        </p>
      </div>
    </div>
    <div class="second-side">
      <div class="icon-info">
        <div class="crowd-density">
          <i :class="crowdDensity.iconClass" class="huge icon"></i>
          {{ crowdDensity.label }}
        </div>
        <div class="crowd-movement">
          <i class="huge icons">
            <i class="user icon"></i>
            <i class="corner icon" :class="crowdMovement.iconClass"></i>
          </i>
          {{ crowdMovement.label }}
        </div>
        <div class="event-classification">
          <div class="ui statistic">
            <div class="value">
              % {{ classification.confidence }}
            </div>
            <div class="label">
              {{ classification.event }}
            </div>
          </div>
        </div>
      </div>
      <div class="goto">
        <i class="angle double right icon huge"></i>
      </div>
    </div>
  </div>
</template>

<script>
const constants = {
  'http://www.crowdbehaviorannotation#CrowdAlert': 'Abnormal',
  'http://www.crowdbehaviorannotation#NormalCrowdBehaviour': 'Normal',
  'http://www.crowdbehaviorannotation#CrowdWalking': 'Crowd Walking',
  'http://www.crowdbehaviorannotation#CrowdRunning': 'Crowd Running',
  'http://www.crowdbehaviorannotation#CrowdStationary': 'Crowd Stationary',
  'http://www.crowdbehaviorannotation#VeryCrowded': 'Very Crowded',
  'http://www.crowdbehaviorannotation#Crowded': 'Crowded',
  'http://www.crowdbehaviorannotation#NotCrowded': 'Not Crowded'
}

export default {
  name: 'ResultItem',
  props: {
    result: {
      required: true
    }
  },
  data () {
    return {
      layoutMode: 'List'
    }
  },
  created () {
    this.$bus.$on('layout-mode-switched', (newLayoutMode) => {
      this.layoutMode = newLayoutMode
    })
  },
  computed: {
    layoutModeClass () {
      return (this.layoutMode === 'List' ? 'list-type' : 'block-type')
    },

    summaryVideoSource () {
      const fileName = this.result.segment.value.split('#')[1]

      return `static/videos/${fileName}_sum.mp4`
    },
    duration () {
      const duration = this.result.segmentDuration.value

      return parseFloat(duration).toFixed(2).toString().replace('.', ':')
    },
    fileName () {
      const videoNum = this.result.video.value.split('#')[1]
      const segmentNum = this.result.segment.value.split('Segment')[1]

      return `${videoNum} / Segment${segmentNum}`
    },
    crowdDensity () {
      const icons = {
        'Very Crowded': 'users',
        'Crowded': 'user',
        'Not Crowded': 'remove'
      }
      const label = constants[this.result.densityCategory.value]
      const iconClass = icons[label]

      return { iconClass, label }
    },
    crowdMovement () {
      const icons = {
        'Crowd Walking': 'play orange',
        'Crowd Running': 'forward green',
        'Crowd Stationary': 'stop red'
      }
      const label = constants[this.result.crowdMovement.value]
      const iconClass = icons[label]

      return { iconClass, label }
    },
    classification () {
      const event = constants[this.result.eventClassification.value]
      let confidence = parseFloat(this.result.classificationConfidence.value) * 100
      confidence = confidence.toFixed(1)

      return { event, confidence }
    }
  },
  methods: {
    playVideo () {
      $(this.$el).find('video')[0].play()
    },
    stopVideo () {
      let video = $(this.$el).find('video')[0]
      video.pause()
      video.currentTime = 0.0
    },
    navigateVideoDetails () {
      this.$bus.$emit('search-details', this.result)
    },
    replayVideo () {
      let video = $(this.$el).find('video')[0]
      video.currentTime = 0.0
      video.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.result-item {
  display: flex;
  padding: 10px;
  border-radius: 15px;
  background-color: #197bbd;

  .first-side {
    display: flex;
    color: #fff;

    .summary-video {
      position: relative;
      height: 130px;
      padding: 3px;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;

      .duration {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 60px;
        height: 20px;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 12px;
        background-color: #fff;
        color: #000;

        i {
          margin-left: 3px;
          margin-right: -2px;
        }
      }

      video {
        border-radius: 15px;
      }
    }

    .text-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .second-side {
    display: flex;

    .icon-info {
      background-color: #fefcfb;
      display: flex;

      .crowd-density, .crowd-movement, .event-classification {
        width: 150px;
        display: flex;
        font-size: 1.1em;
        font-weight: bold;
      }

      .event-classification {
        width: 200px;
      }
    }

    .goto {
      color: #fff;
    }
  }
}

.list-type {
  flex-direction: row;
  justify-content: space-between;

  .first-side {
    flex-direction: row;

    .summary-video {
      margin-right: 15px;

      video {
        height: 100%;
      }
    }
  }

  .second-side {
    flex-direction: row;
    width: 500px;

    .icon-info {
      flex-direction: row;
      width: 450px;
      border-radius: 25px;

      .crowd-density, .crowd-movement, .event-classification {
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .goto {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.block-type {
  flex-direction: column;
  justify-content: space-between;

  .first-side {
    flex-direction: column;

    .summary-video {
      height: 192px;
      margin-bottom: 15px;

      video {
        width: 100%;
        height: 100%;
      }
    }

    .text-info {
      align-items: flex-start;
    }
  }

  .second-side {
    flex-direction: column;
    margin-top: 15px;

    .icon-info {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 15px;

      .crowd-density, .crowd-movement, .event-classification {
        padding: 2px;
        width: calc(100% - 15px);
        flex-direction: row;
        margin-bottom: 15px;
        align-items: center;
        justify-content: center;
      }
    }

    .goto {
      display: none;
    }
  }
}

.result-item:hover {
  cursor: pointer;
  background-color: #166088;

  .summary-video, .icon-info {
    @include box-shadow(0px 10px 28px -8px #000);
  }

  .summary-video > .duration > i {
    animation: blink-animation 2s steps(3, start) infinite;
  }

  .goto {
    text-shadow: 2px 2px 8px #000;
  }
}
</style>
