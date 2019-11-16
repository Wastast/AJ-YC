<template>
  <div class="map">
    <div class="" id="map"></div>
  </div>
</template>

<script>
import { getHouse, getShouye, getFire } from '@/api/mapapi'
export default {
  name: 'Map',
  data() {
    return {
      list: [],
      timer: null,
      imgRep: req.slice(0, -3),
      isDraw: false
    }
  },
  methods: {
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
      sMarker.AddEventListener('mousemove', iconValue, () => {
        if (item.typeId) {
          TMapAPI.map.ShowLabelsByTag('default' + item.id)
        } else {
          TMapAPI.map.ShowLabelsByTag('fire' + item.id)
        }
      })
      sMarker.AddEventListener('mouseout', iconValue, () => {
        if (item.typeId) {
          TMapAPI.map.HideLabelsByTag('default' + item.id)
        } else {
          TMapAPI.map.HideLabelsByTag('fire' + item.id)
        }
      })
    },
    // 绘制房屋
    drawHouse() {
      getHouse().then(data => {
        if (data.code === 200) {
          this.list = data.data
          this.list.forEach(e => {
            TMapAPI.drawRange(e, '#B56FE2')
          })
        }
      })
    },
    // 获取地图层级
    getZoom() {
      let zoom = TMapAPI.map.GetZoom()
      if (zoom >= 2) {
        if (this.isDraw !== true) {
          this.isDraw = true
          this.drawHouse()
        }
      } else {
        this.isDraw = false
        TMapAPI.ClearFeatures()
      }
    }
  },
  mounted() {
    TMapAPI.InitMap('map')
    TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1)
    getShouye().then(data => {
      if (data.code === 200) {
        data.data.forEach(item => {
          this.addPoint(item)
          TMapAPI.drawRangeLableDefault(item)
        })
        TMapAPI.map.HideLabels()
      }
    })
    getFire().then(data => {
      if (data.code === 200) {
        data.data.forEach(item => {
          this.addPoint(item)
          TMapAPI.drawRangeLableFire(item)
        })
        TMapAPI.map.HideLabels()
      }
    })
    getHouse().then(data => {
      if (data.code === 200) {
        this.list = data.data
        this.list.forEach(e => {
          TMapAPI.drawRangeLable_house(e)
        })
        TMapAPI.map.HideLabels()
      }
    })
    TMapAPI.GetMap().AddEventListener('zoomend', () => {
      this.getZoom()
    })
  },
  beforeDestroy() {
    TMapAPI.GetMap().ReleaseEventListener('zoomend', this.getZoom())
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: px2rem(820rem);
  height: px2rem(652rem);
  position: absolute;
  top: px2rem(125rem);
  left: px2rem(555rem);
  border: 1px solid #2fd2ef;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
