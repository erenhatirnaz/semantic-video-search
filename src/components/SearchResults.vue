<template>
  <div class="search-results">
    <div class="no-videos-found" v-if="noResults">
      <div class="ui center aligned segment">
        <i class="huge icons">
          <i class="red video icon"></i>
          <i class="corner red remove icon"></i>
        </i>
        <h2>No videos found!</h2>
      </div>
    </div>
    <div class="results-list" :class="layoutModeClass" v-else>
      <ul>
        <li is="result-item" v-for="result in results" :result="result" :class="layoutModeClass" :key="result.segment.value">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ResultItem from './ResultItem'

export default {
  name: 'SearchResults',
  components: { ResultItem },
  props: {
    results: {
      type: Array,
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
    noResults () {
      return this.results.length === 0
    },
    layoutModeClass () {
      return (this.layoutMode === 'List' ? 'list-type' : 'block-type')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-results {
  height: inherit;
  display: flex;

  .no-videos-found {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .results-list > ul {
    display: flex;
    width: 100%;

    .result-item {
      margin-bottom: 15px;
    }
  }

  .list-type {
    width: calc(100% - 20px);

    ul {
      flex-direction: column;
    }
  }

  .block-type {
    ul {
      flex-direction: row;
      flex-wrap: wrap;

      .result-item {
        margin-right: 15px;
      }
    }
  }
}
</style>
