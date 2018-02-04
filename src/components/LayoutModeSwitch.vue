<template>
  <div class="ui icon buttons">
    <button id="btnList" class="ui big icon active button" @click="changeLayoutMode('List')">
      <i class="list layout icon"></i>
    </button>
    <button id="btnBlock" class="ui big icon button" @click="changeLayoutMode('Block')">
      <i class="block layout icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LayoutModeSwitch',
  data () {
    return {
      layoutMode: 'List'
    }
  },
  watch: {
    layoutMode (value) {
      $('.active').removeClass('active')
      $('#btn' + value).addClass('active')
    }
  },
  methods: {
    changeLayoutMode (layoutMode) {
      if (this.layoutMode !== layoutMode) {
        this.$bus.$emit('layout-mode-switched', layoutMode)
        this.layoutMode = layoutMode
      }
    }
  }
}
</script>

<style style="scss" scoped>
</style>
