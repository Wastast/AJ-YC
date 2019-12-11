// 这是全局混入Mixin
export const resize = {
  data() {
    return {
      isScreen: false
    };
  },
  methods: {
    window_resize(e) {
      let width = window.innerHeight;
      if (width > 1070) {
        document.querySelector('.home').style.cssText = 'width: 100vw;height: 100vh;';
      } else {
        document.querySelector('.home').style.cssText = '';
      }
    }
  },
  mounted() {
    this.window_resize();
    window.addEventListener('resize', this.window_resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.window_resize);
  }
};

// 地图模块混入mixin
export const MapMixin = {
  data() {
    return {
      imgRep: req.slice(0, -3)
    };
  },
  methods: {
    // 节流
    addPoint(item) {
      let iconValue = item;
      let sLonLat = new SLonLat(iconValue.lon, iconValue.lat);
      let iconPath = this.imgRep + '/upload/icon/' + iconValue.img;
      // 在地图内添加图标
      let sIcon = new SIcon(
        iconPath,
        new SSize(iconValue.width, iconValue.height),
        new SPixel(-iconValue.width / 2, -iconValue.height)
      );
      let sMarker = new SMarker(sLonLat, sIcon, iconValue.typeId);
      TMapAPI.markerLayer.AddMarker(sMarker);

      sMarker.AddEventListener('click', iconValue, () => {
        console.log(iconValue);
      });
    }
  }
};
