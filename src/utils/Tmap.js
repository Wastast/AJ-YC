// 添加绘画房子功能
TTuJing.prototype.drawRange = function(item, color) {
  if (!item.range) {
    return;
  }
  var range = item.range;
  var mapid = item.id;
  var ppsMainBuild = SPoint.GetPointSFromString(range);
  var xlMansion = new SLineString(ppsMainBuild);
  var fsMansion = new SFeatureStyle();
  fsMansion.SetFillColor('transparent');
  // fsMansion.SetFillColor(color);
  // 模型边框外壳
  fsMansion.SetStrokeWidth(0);
  // fsMansion.SetStrokeColor("#B56FE2");
  fsMansion.SetHoverFillColor(color);
  fsMansion.SetHoverStrokeColor('#B56FE2');
  // 外壳2
  fsMansion.SetHoverStrokeWidth(2);
  fsMansion.SetHoverEnabled(true);
  // 范围 属性 TAG 扩展说明
  var pfMansion = new SFeature(xlMansion, fsMansion, mapid);
  this.GetVectorLayer().AddFeatures([pfMansion]);
  pfMansion.Activate();

  pfMansion.AddEventListener('mousemove', pfMansion, function() {
    TMapAPI.map.ShowLabelsByTag('house' + item.id);
  });
  pfMansion.AddEventListener('mouseout', pfMansion, function() {
    TMapAPI.map.HideLabelsByTag('house' + item.id);
  });
};
// 绘制标签lable
TTuJing.prototype.drawRangeLableDefault = function(item) {
  var infoText = `<div class="tmapWindowDefault">
                    <p>${item.name}</p>
                  </div>`;
  var sLonLat = new SLonLat(item.lon, item.lat);
  var lbl = new SLabel(null, sLonLat, null, infoText);
  lbl.SetTag('default' + item.id);
  lbl.SetOpacity(1);
  lbl.SetOffset(new SSize(15, -40));
  lbl.SetAdaptive();
  TMapAPI.map.AddLabel(lbl);
  lbl.GetDiv().style.zIndex = 9999;
};
// 绘制标签lable
TTuJing.prototype.drawRangeLableFire = function(item) {
  var infoText = `<div class="tmapWindowFire">
                    <p>党员之家:</p>
                    <p>姓名：${item.name}</p>
                    <p>地址：${item.address}</p>
                    <p>电话：${item.phone || ''}</p>
                  </div>`;
  var sLonLat = new SLonLat(item.lon, item.lat);
  var lbl = new SLabel(null, sLonLat, null, infoText);
  lbl.SetTag('fire' + item.id);
  lbl.SetOpacity(1);
  lbl.SetOffset(new SSize(15, -60));
  lbl.SetAdaptive();
  TMapAPI.map.AddLabel(lbl);
  lbl.GetDiv().style.zIndex = 9999;
};
// 绘制标签lable
TTuJing.prototype.drawRangeLableMs = function(item) {
  // 地址，联系人，联系电话，订餐桌数，房间数
  var countIn = parseInt((item.roomNum || 0) * 0.6);
  var countSy = item.roomNum - countIn;
  var p = 0;
  if (item.roomNum !== 0) {
    p = ((parseFloat(countIn) / parseFloat(item.roomNum)) * 100).toFixed(2);
  }
  var infoText = `<div class="tmapWindowFire">
                    <p>民宿</p>
                    <p>名称：${item.name}</p>
                    <p>地址：${item.address || ''}</p>
                    <p>联系人：${item.person || ''}</p>
                    <p>联系电话：${item.phone || ''}</p>
                    <p>订餐桌数：${item.tableNum || ''}</p>
                    <p>房间数：${item.roomNum || 0}</p>
                    <p>剩余房间数：${countSy}</p>
                    <p>入住率：${p}%</p>
                  </div>`;
  var sLonLat = new SLonLat(item.lon, item.lat);
  var lbl = new SLabel(null, sLonLat, null, infoText);
  lbl.SetTag('default' + item.id);
  lbl.SetOpacity(1);
  lbl.SetOffset(new SSize(15, -60));
  lbl.SetAdaptive();
  TMapAPI.map.AddLabel(lbl);
  lbl.GetDiv().style.zIndex = 9999;
};
// 绘制标签lable
TTuJing.prototype.drawRangeLable_house = function(item) {
  if (!item.range) {
    return;
  }
  // <p>户主姓名: ${item.name}</p>
  // <p>联系人电话: ${item.dimTourBasResidentInfo.phone}</p>
  // <p>家庭地址: ${item.address}</p>
  // <p>家庭人数: ${item.dimTourBasResidentInfo.memberNum}</p>
  // <p>美丽家庭: ${item.dimTourBasResidentInfo.houseTipName}</p>
  var sLonLat = new SLonLat(item.centerX, item.centerY);
  var infoText = `<div class="tmapWindow">
                    <p>户主姓名: ${item.name}</p>
                    <p>联系人电话: ${item.phone || ''}</p>
                    <p>家庭地址: ${item.address}</p>
                    <p>家庭人数: ${item.memberNum}</p>
                    <p>美丽家庭: ${item.houseTipName}</p>
                  </div>`;
  var lbl = new SLabel(null, sLonLat, null, infoText);
  lbl.SetTag('house' + item.id);
  lbl.SetOpacity(1);
  lbl.SetOffset(new SSize(0, 0));
  lbl.SetAdaptive();
  TMapAPI.map.AddLabel(lbl);
  lbl.GetDiv().style.zIndex = 9999;
};
/* <p>姓名：${item.dimTourBasResidentInfo.name}</p>
                    <p>地址：${item.address || ''}</p>
                    <p>电话：${item.dimTourBasResidentInfo.phone || ''}</p> */
// 绘制标签lable
TTuJing.prototype.drawRangeLable_dyzj = function(item) {
  var infoText = `<div class="tmapWindowFire">
                    <p>党员之家</p>
                    <p>姓名：${item.name}</p>
                    <p>地址：${item.address || ''}</p>
                    <p>电话：${item.phone || ''}</p>
                  </div>`;
  var sLonLat = new SLonLat(item.centerX, item.centerY);
  var lbl = new SLabel(null, sLonLat, null, infoText);
  lbl.SetTag('dyzj' + item.id);
  lbl.SetOpacity(1);
  lbl.SetOffset(new SSize(15, -60));
  lbl.SetAdaptive();
  TMapAPI.map.AddLabel(lbl);
  lbl.GetDiv().style.zIndex = 9999;
};
// 绘制标签lable
TTuJing.prototype.drawRangeLable_wxzj = function(item) {
  var infoText = `<div class="tmapWindowFire">
                    <p>五星之家</p>
                    <p>姓名：${item.name}</p>
                    <p>地址：${item.address || ''}</p>
                    <p>电话：${item.phone || ''}</p>
                  </div>`;
  var sLonLat = new SLonLat(item.centerX, item.centerY);
  var lbl = new SLabel(null, sLonLat, null, infoText);
  lbl.SetTag('wxzj' + item.id);
  lbl.SetOpacity(1);
  lbl.SetOffset(new SSize(15, -60));
  lbl.SetAdaptive();
  TMapAPI.map.AddLabel(lbl);
  lbl.GetDiv().style.zIndex = 9999;
};
