/**
 * @description: 全局主题样式变更
 * @param {String} color 主题色
 * @param {Array} keys css变量名数组
 * @return {*}
 */
function changeThemeColor(color, keys = []) {
  const root = document.querySelector(':root');
  if (!root || !Array.isArray(keys) || typeof color !== 'string') {
    return;
  }
  keys.forEach((key) => {
    root.style.setProperty(key, color);
  });
}

/**
 * @description: 判断对象为空
 * @param {Object} v 目标对象
 * @return {Boolean}
 */
const isEmpty = (v) => {
  if (typeof v === 'undefined') {
    return true;
  }
  if (v === undefined || v === 'undefined') {
    return true;
  }
  if (v === null) {
    return true;
  }
  if (v === '' || v === 'null') {
    return true;
  }
  if (v === 0) {
    return true;
  }
  switch (typeof v) {
    case 'string':
      if (v.trim().length === 0) {
        return true;
      }
      break;
    case 'boolean':
      if (!v) {
        return true;
      }
      break;
    case 'number':
      if (v === 0) {
        return true;
      }
      break;
    case 'object':
      return undefined !== v.length && v.length === 0;
    default:
      break;
  }
  return false;
};

/**
 * @description: 检测设备是否ios
 * @return {*}
 */
function isIos() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1;
}

/**
 * @description: 将base64转换为Blob
 * @param {String} dataurl 图片base64
 */
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

export { changeThemeColor, isEmpty, isIos, dataURLtoBlob };
