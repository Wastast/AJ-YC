// 添加点位
const addPoint = Icon => {
  let iconPath = imgRep + '/upload/icon25D/' + Icon.img25d;
  let icon = new T.Icon({
    // 创建图片对象
    iconUrl: iconPath,
    // iconSize: new T.Point(Icon.width, Icon.height),
    iconSize: new T.Point(20, 20)
    // iconAnchor: new T.Point(-30 / 2, -30)
  });
  let ptt = JZbConvert.GetGpsLonLatFromSw(new SPoint(Icon.lon, Icon.lat));
  let x = ptt.GetLon();
  let y = ptt.GetLat();
  // 向地图上添加自定义标注;
  let marker = new T.Marker(new T.LngLat(x, y), { icon: icon });
  mapWorld.addOverLay(marker);
};

// 添加标注框
const addLable = Icon => {
  let ptt = JZbConvert.GetGpsLonLatFromSw(new SPoint(Icon.lon, Icon.lat));
  let x = ptt.GetLon();
  let y = ptt.GetLat();
  let latlng = new T.LngLat(x, y);
  let label = new T.Label({
    text: Icon.name,
    position: latlng,
    offset: new T.Point(Icon.width / 2, Icon.height)
  });
  // 创建地图文本对象
  mapWorld.addOverLay(label);
};

export default { addPoint, addLable };
