// 这是全局混入Mixin
export const resize = {
  data() {
    return {
      isScreen: false
    }
  },
  methods: {
    window_resize(e) {
      let width = window.innerHeight
      if (width > 1070) {
        document.querySelector('.home').style.cssText = 'width: 100vw;height: 100vh;'
      } else {
        document.querySelector('.home').style.cssText = ''
      }
    }
  },
  mounted() {
    this.window_resize()
    window.addEventListener('resize', this.window_resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.window_resize)
  }
}
