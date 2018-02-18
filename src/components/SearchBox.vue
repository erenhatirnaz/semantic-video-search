<template>
  <div class="search-box">
    <div class="ui form">
      <div class="ui error message"></div>
      <div class="field">
        <label>Camera Name(s)</label>
        <select class="ui dropdown" name="camera_names" multiple v-model="query.camera_names">
          <option value="umnOutdoor1">UMNOutdoor1</option>
          <option value="umnOutdoor2">UMNOutdoor2</option>
          <option value="umnOutdoor3">UMNOutdoor3</option>
        </select>
      </div>
      <div class="field">
        <label>Dataset(s)</label>
        <select class="ui dropdown" name="datasets" multiple v-model="query.datasets">
          <option value="umn">UMN</option>
        </select>
      </div>
      <div class="field">
        <label>Event Classification</label>
        <select class="ui dropdown" name="event_classification" v-model="query.event_classification">
          <option value="normal">Normal</option>
          <option value="abnormal">Abnormal</option>
        </select>
      </div>
      <div class="field">
        <label>Crowd Destiny</label>
        <select class="ui dropdown" name="crowd_destiny" v-model="query.crowd_destiny">
          <option value="not_crowded">Not Crowded</option>
          <option value="crowded">Crowded</option>
          <option value="very_crowded">Very Crowded</option>
        </select>
      </div>
      <div class="field">
        <label>Crowd Movement</label>
        <select class="ui dropdown" name="crowd_movement" v-model="query.crowd_movement">
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
export default {
  name: 'search-box',
  data () {
    return {
      query: {
        camera_names: [],
        datasets: [],
        event_classification: '',
        crowd_destiny: '',
        crowd_movement: '',
        duration: { start: NaN, end: NaN }
      }
    }
  },
  mounted () {
    $('.ui.dropdown').dropdown({ duration: 100 })
    $('.ui.form').form({
      fields: {
        camera_names: 'minCount[1]',
        datasets: 'minCount[1]',
        event_classification: 'empty',
        crowd_destiny: 'empty',
        crowd_movement: 'empty'
      }
    })
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
        this.$router.push('/search')
        // TODO: Searching Service
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
