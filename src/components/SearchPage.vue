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
        <search-box></search-box>
      </div>
    </div>
    <div class="content">
      <div class="options">
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
  components: { LayoutModeSwitch, SearchBox }
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
      justify-content: flex-end;
      align-items: flex-end;
      padding-right: 15px;
    }

    .results {
      height: 100%;
    }
  }
}
</style>
