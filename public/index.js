/* eslint-disable require-jsdoc */

// initialize userId/roomId
$("#userId").val("user_" + parseInt(Math.random() * 100000000));
$("#roomId").val("889988");

let rtc = new AJClient();

rtc.onRemoteView(id => {
  addView(id);
});

$("#join").on("click", function(e) {
  e.preventDefault();
  rtc.join();
});

$("#publish").on("click", function(e) {
  e.preventDefault();
  console.log("publish");
  if (!rtc) {
    Toast.error("请先加入房间！");
    return;
  }
  rtc.publish();
});

$("#unpublish").on("click", function(e) {
  e.preventDefault();
  console.log("unpublish");
  if (!rtc) {
    Toast.error("请先加入房间！");
    return;
  }
  rtc.unpublish();
});

$("#leave").on("click", function(e) {
  e.preventDefault();
  console.log("leave");
  if (!rtc) {
    Toast.error("请先加入房间！");
    return;
  }
  rtc.leave();
});

$("#settings").on("click", function(e) {
  e.preventDefault();
  $("#settings").toggleClass("btn-raised");
  $("#setting-collapse").collapse();
});
