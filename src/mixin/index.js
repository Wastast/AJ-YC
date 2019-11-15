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

// 地图模块混入mixin
export const MapMixin = {
  data () {
    return {
      imgRep: req.slice(0, -3)
    }
  },
  methods: {
    // 节流
    addPoint(item) {
      let iconValue = item
      let sLonLat = new SLonLat(iconValue.lon, iconValue.lat)
      let iconPath = this.imgRep + '/upload/icon/' + iconValue.img
      // 在地图内添加图标
      let sIcon = new SIcon(
        iconPath,
        new SSize(iconValue.width, iconValue.height),
        new SPixel(-iconValue.width / 2, -iconValue.height)
      )
      let sMarker = new SMarker(sLonLat, sIcon, iconValue.typeId)
      TMapAPI.markerLayer.AddMarker(sMarker)

      sMarker.AddEventListener('click', iconValue, () => {
        console.log(iconValue)
        // TMapAPI.map.SInfoWindow.Hide()
        // if (iconValue.dimTourDevcParkingAssistant) {
        //   getParking({
        //     code: iconValue.dimTourDevcParkingAssistant.code
        //   }).then(data => {
        //     let title = iconValue.name
        //     let { lastInCarCode, lastOutCarCode, todayIn, todayOut } = data.obj.data
        //     this.parlValue = { lastInCarCode, lastOutCarCode, todayIn, todayOut, title }
        //     this.popType = 'car'
        //   })
        // }
      })
      // let lbl = new SLabel(
      //   null,
      //   sLonLat,
      //   null,
      //   `<div class="cartext">
      //       <span>${iconValue.name}</span>
      //       </div>`,
      //   iconValue.typeId
      // )

      // lbl.SetOpacity(0.8)
      // lbl.SetOffset(new SSize(-iconValue.width - 22, -iconValue.height - 44))
      // lbl.SetAdaptive()
      // TMapAPI.GetMap().AddLabel(lbl)
    }
  }
}
