// 转换时间的过滤器
const fiterYMD = value => {
  if (!value) {
    return '未知';
  }
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day} `;
};

export default {
  fiterYMD
};
