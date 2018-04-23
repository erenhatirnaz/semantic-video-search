<template>
  <div class="search-page">
    <div class="sidebar">
      <div class="sidebar-header">
        <button class="ui big icon text button" @click="back">
          <i class="angle double left icon"></i>
          Back to {{ backButtonLabel }}
        </button>
      </div>
      <div class="sidebar-content">
        <search-box mode="sidebar"></search-box>
      </div>
    </div>
    <div v-if="isLoading" class="ui active dimmer">
      <div class="ui text loader">Searching...</div>
    </div>
    <div class="content">
      <div class="options" v-if="results.length > 0 && !videoDetailsMode">
        <div class="ui big green label">
          <i class="video icon"></i>
          {{ results.length }} search result(s) found!
        </div>
        <layout-mode-switch></layout-mode-switch>
      </div>
      <div class="results">
        <search-results :results="results" v-if="!videoDetailsMode"></search-results>
        <video-details :video="video" v-else></video-details>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import LayoutModeSwitch from '@/components/LayoutModeSwitch'
import SearchResults from '@/components/SearchResults'
import VideoDetails from '@/components/VideoDetails'

export default {
  name: 'SearchPage',
  components: { LayoutModeSwitch, SearchBox, SearchResults, VideoDetails },
  data () {
    return {
      isLoading: false,
      results: [],
      video: ''
    }
  },
  created () {
    this.$bus.$on('search-results', (results) => {
      this.video = ''
      setTimeout(() => {
        this.isLoading = false
        this.results = results
      }, 1000)
    })
    this.$bus.$on('search-details', (video) => {
      this.video = video
    })
  },
  computed: {
    videoDetailsMode () {
      return (this.video !== '')
    },
    backButtonLabel () {
      return (this.videoDetailsMode) ? 'search results' : 'home page'
    }
  },
  methods: {
    back () {
      if (this.videoDetailsMode) {
        this.video = ''
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$sidebar: #197bbd;

.search-page {
  width: 100vw;
  height: 100vh;
  display: flex;

  .sidebar {
    background-color: $sidebar;
    width: 20%;
    padding: 15px;

    &-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &-content {
      margin-top: 15px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 80%;

    .options {
      height: 67px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 15px;
      padding-left: 15px;
    }

    .results {
      padding: 15px;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
