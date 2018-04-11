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
    <div class="results-list" v-else>
      <ul>
        <!-- TODO: Result item -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
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
}
</style>
