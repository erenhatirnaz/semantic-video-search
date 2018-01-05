import Vue from 'vue'
import MainPage from '@/components/MainPage'

describe('MainPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(MainPage)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('h1.logo').textContent).to.be.equal('Semantic Video Search')
    expect(vm.$el.querySelector('div.ui.segment')).to.not.equal(null)
  })
})
