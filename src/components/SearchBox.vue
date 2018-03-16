<template>
  <div class="search-box">
    <div class="ui form">
      <div class="ui error message"></div>
      <div class="field">
        <label>Camera Name(s)</label>
        <select class="ui dropdown" name="cameraNames" multiple v-model="query.cameraNames">
          <option v-for="cameraName in availableCameraNames" :key="cameraName" :value="cameraName">
            {{ cameraName }}
          </option>
        </select>
      </div>
      <div class="field">
        <label>Dataset(s)</label>
        <select class="ui dropdown" name="datasets" multiple v-model="query.datasets">
          <option v-for="dataset in availableDatasets" :key="dataset" :value="dataset">
            {{ dataset }}
          </option>
        </select>
      </div>
      <div class="field">
        <label>Event Classification</label>
        <select class="ui dropdown" name="eventClassification" v-model="query.eventClassification">
          <option value="normal">Normal</option>
          <option value="abnormal">Abnormal</option>
        </select>
      </div>
      <div class="field">
        <label>Crowd Density</label>
        <select class="ui dropdown" name="crowdDensity" v-model="query.crowdDensity">
          <option value="notCrowded">Not Crowded</option>
          <option value="crowded">Crowded</option>
          <option value="veryCrowded">Very Crowded</option>
        </select>
      </div>
      <div class="field">
        <label>Crowd Movement</label>
        <select class="ui dropdown" name="crowdMovement" v-model="query.crowdMovement">
          <option value="walking">Walking</option>
          <option value="running">Running</option>
          <option value="stationary">Stationary</option>
        </select>
      </div>
      <div class="two fields">
        <div class="field">
          <label>Duration start</label>
          <div class="ui action input">
            <input type="number" min="0" step="0.1" v-model.number.lazy="query.duration.start">
            <button class="ui icon button" tabindex="-1" @click="query.duration.start = NaN">
              <i class="remove icon"></i>
            </button>
          </div>
        </div>
        <div class="field">
          <label>Duration end</label>
          <div class="ui action input">
            <input type="number" step="0.1" :min="minimumEndDuration" v-model.number.lazy="query.duration.end">
            <button class="ui icon button" tabindex="-1" @click="query.duration.end = NaN">
              <i class="remove icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="ui right labeled icon big negative fluid button" @click="clearForm">
        <i class="remove icon"></i> Clear
      </button>
      <button class="ui right labeled icon big positive fluid button" @click="search">
        <i class="search icon"></i> Search
      </button>
    </div>
  </div>
</template>

<script>
import VideosService from '@/services/videos_service'
import SearchService from '@/services/search_service'

export default {
  name: 'search-box',
  props: {
    mode: {
      type: String,
      default: 'full',
      validator: (value) => {
        return (value === 'full' || value === 'sidebar')
      }
    }
  },
  data () {
    return {
      availableCameraNames: [],
      availableDatasets: [],
      query: {
        cameraNames: [],
        datasets: [],
        eventClassification: '',
        crowdDensity: '',
        crowdMovement: '',
        duration: { start: NaN, end: NaN }
      }
    }
  },
  created () {
    const videosService = new VideosService()
    this.availableCameraNames = videosService.getAllCameraNames()
    this.availableDatasets = videosService.getAllDatasets()
  },
  mounted () {
    $('.ui.dropdown').dropdown({ duration: 100 })
    $('.ui.form').form({
      fields: {
        cameraNames: 'minCount[1]',
        datasets: 'minCount[1]',
        eventClassification: 'empty',
        crowdDensity: 'empty',
        crowdMovement: 'empty'
      }
    })

    if (this.mode === 'sidebar' &&
        Object.keys(this.$query).includes('cameraNames')) {
      this.query = this.$query

      const queryFields = Object.keys(this.query).slice(0, 5)
      const values = Object.values(this.query).slice(0, 5)

      queryFields.forEach((field, index) => {
        $(`[name='${field}']`).dropdown('set selected', values[index])
      })

      // NOTE: This is definitely not a good solution
      setTimeout(() => {
        this.search()
      }, 100)
    }
  },
  watch: {
    query: {
      deep: true,
      handler () {
        if (this.query.duration.end <= this.query.duration.start) {
          this.query.duration.end = this.minimumEndDuration
        }
      }
    }
  },
  computed: {
    minimumEndDuration () {
      if (!isNaN(this.query.duration.start)) {
        return (this.query.duration.start + 0.1).toFixed(1)
      }
      return 0
    }
  },
  methods: {
    clearForm () {
      $('.ui.form').form('clear')
      this.query.duration = { start: NaN, end: NaN }
    },

    search () {
      if ($('.ui.form').form('validate form')) {
        if (this.mode === 'full') { this.$query = this.query }

        this.$router.push('/search')

        const searchService = new SearchService()
        const results = searchService.getResults(this.query)
        this.$bus.$emit('search-results', results)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  display: flex;
  flex-direction: column;

  .form {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-content: center;
  }
}
</style>
