// 获取数据的类型
export const getDataType = obj => {
  let type;
  if (obj === null) {
    return String(obj);
  }
  if (typeof obj === 'object') {
    type = Object.prototype.toString
      .call(obj)
      .replace('[object ', '')
      .replace(']', '')
      .toLowerCase();
  } else {
    type = typeof obj;
  }
  return type;
};

// 自动创建下载标签
export const downTag = href => {
  const a = document.createElement('a'); // 创建a标签
  a.setAttribute('download', ''); // download属性
  a.setAttribute('href', href); // href链接
  a.click(); // 自执行点击事件
};
