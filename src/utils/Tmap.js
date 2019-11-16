// 添加绘画房子功能
TTuJing.prototype.drawRange = function(item, color) {
  if (!item.range) {
    return
  }
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
    let position = item.range.split(',')[0].split(' ')
    var infoText = `<div class="tmapWindow">
                      <p>户主姓名: ${item.name}</p>
                      <p>联系人电话: ${item.dimTourBasResidentInfo.phone}</p>
                      <p>家庭地址: ${item.address}</p>
                      <p>家庭人数: ${item.dimTourBasResidentInfo.memberNum}</p>
                      <p>家庭: ${item.dimTourBasResidentInfo.houseTip}</p>
                    </div>`
    var lonlat = new SLonLat(position[0], position[1])
    // TMapAPI.GetMap().SInfoWindow.SetLonLat(lonlat, null, false)
    TMapAPI.GetMap().SInfoWindow.SetLonLat(lonlat, null, false)
    // 信息面板显示内容
    TMapAPI.GetMap().SInfoWindow.SetInnerHTML(infoText)
    // 面板底部对应图标位置
    TMapAPI.GetMap().SInfoWindow.SetOffset(new SSize(0, 0))
    // 信息面板长宽
    TMapAPI.GetMap().SInfoWindow.SetSize(new SSize(250, 200))
    TMapAPI.GetMap().SInfoWindow.Show()
    // 当前点居中,3是层级（0-3层）
    TMapAPI.GetMap().SetCenter(lonlat, 2)
    // TMapAPI.GetMap().SInfoWindow2.ReWriteInfoClose(function() {
    //   alert(1)
    //   TMapAPI.GetMap().SInfoWindow2.Hide()
    // })
  })
}
