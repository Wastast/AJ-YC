// 添加绘画房子功能
TTuJing.prototype.drawRange = function(item, color) {
  var range = item.range
  var mapid = item.id
  var ppsMainBuild = SPoint.GetPointSFromString(range)
  var xlMansion = new SLineString(ppsMainBuild)
  var fsMansion = new SFeatureStyle()
  fsMansion.SetFillColor('transparent')
  // fsMansion.SetFillColor(color);
  // 模型边框外壳
  fsMansion.SetStrokeWidth(0)
  // fsMansion.SetStrokeColor("#B56FE2");
  fsMansion.SetHoverFillColor(color)
  fsMansion.SetHoverStrokeColor('#B56FE2')
  // 外壳2
  fsMansion.SetHoverStrokeWidth(2)
  fsMansion.SetHoverEnabled(true)
  // 范围 属性 TAG 扩展说明
  var pfMansion = new SFeature(xlMansion, fsMansion, mapid)
  this.GetVectorLayer().AddFeatures([pfMansion])
  pfMansion.Activate()
  // 点击事件
  pfMansion.AddEventListener('click', pfMansion, function() {
    console.log(item)
  })
}
