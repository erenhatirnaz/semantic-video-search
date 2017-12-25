<template>
  <div class="main-page">
    <div class="container">
      <h1 class="logo">Semantic Video Search</h1>
      <div class="ui segment">
        <!-- TODO: SearchBox component will comes here -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style lang="scss" scoped>
$main-page: #197bbd;
$logo-text: #f7ebec;
$segment: #e8e9f3;
$box-shadow: #2d2d34;

.main-page {
  background-color: $main-page;
  width: 100vw;
  height: 100vh;

  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      font-size: 50px;
      color: $logo-text;
    }

    .ui.segment {
      background-color: $segment;
      @include box-shadow(0px 0px 28px -8px $box-shadow);
      /* TODO: These properties sets after search box component */
      // width: 60%;
      // height: 100px;
    }
  }
}
</style>
