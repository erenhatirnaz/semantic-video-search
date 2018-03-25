<template>
  <div class="search-page">
    <div class="sidebar">
      <div class="sidebar-header">
        <router-link to="/" class="ui big icon text button">
          <i class="angle double left icon"></i>
          Back
        </router-link>
      </div>
      <div class="sidebar-content">
        <search-box mode="sidebar"></search-box>
      </div>
    </div>
    <div v-show="isLoading" class="ui active dimmer">
      <div class="ui text loader">Searching...</div>
    </div>
    <div class="content">
      <div class="options" v-if="results.length > 0">
        <div class="ui big green label">
          <i class="video icon"></i>
          {{ results.length }} search result(s) found!
        </div>
        <layout-mode-switch></layout-mode-switch>
      </div>
      <div class="results">
        <!-- TODO: Search results -->
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import LayoutModeSwitch from '@/components/LayoutModeSwitch'

export default {
  name: 'SearchPage',
  components: { LayoutModeSwitch, SearchBox },
  data () {
    return {
      isLoading: false,
      results: []
    }
  },
  created () {
    this.$bus.$on('search-results', (results) => {
      setTimeout(() => {
        this.isLoading = false
        this.results = results
      }, 1000)
    })
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
      height: 100%;
    }
  }
}
</style>
