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
      </div>
    </div>
    <div class="content">
      <div class="options">
        <!-- TODO: Layout mode switch -->
      </div>
      <div class="results">
        <!-- TODO: Search results -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage'
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
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 80%;

    .options {
      height: 67px;
    }

    .results {
      height: 100%;
    }
  }
}
</style>
