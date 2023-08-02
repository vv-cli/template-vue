import axios from 'axios';
import { showDialog, showToast } from 'vant';
import { changeThemeColor } from 'utils';
import { queryThemeColor } from 'api';
import { CSS_VARS } from 'common/constants';
import useUserStore from '../store/user';

/**
 * @description: 全局前置守卫
 * @param {Object} to 前往路由对象
 * @param {Object} from 来自路由对象
 * @return {Boolean | Object | String}
 */
async function beforeEach() {
  const valid = await fetchToken();
  if (!valid) {
    return false;
  }
  await fetchThemeColor();
  await versionCheck();
}

/**
 * @description: 全局后置钩子
 * @param {Object} to 前往路由对象
 * @param {Object} from 来自路由对象
 */
function afterEach() {}

/**
 * @description: 版本检测
 * @return {*}
 */
const versionCheck = async () => {
  try {
    if (import.meta.env.MODE === 'development') return;
    const store = useUserStore();
    const timestamp = Date.now();
    const response = await axios.get(`version.json?_t${timestamp}`);
    // eslint-disable-next-line no-undef
    if (__APP_VERSION__ !== response.data.version) {
      showDialog({
        message: '检测到版本更新，请重新加载页面',
      }).then(() => {
        sessionStorage.setItem('userInfo', JSON.stringify(store.userInfo));
        window.location.reload();
      });
    } else if (sessionStorage.getItem('userInfo')) {
      store.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      sessionStorage.removeItem('userInfo');
    }
  } catch (err) {
    showToast(err.message || err.data?.message);
  }
};

/**
 * @description: 主题色查询
 * @return {*}
 */
async function fetchThemeColor() {
  const store = useUserStore();
  if (store.userInfo.getThemeColor) {
    return;
  }
  try {
    const res = await queryThemeColor();
    changeThemeColor(res.data.color || '#2462B3', CSS_VARS);
    store.userInfo = { ...store.userInfo, getThemeColor: true };
  } catch (err) {
    showToast(err.data?.message || err.message);
  }
}

/**
 * @description: 获取token
 * @return {*}
 */
async function fetchToken() {
  if (sessionStorage.getItem('token')) {
    return true;
  }
  const { updateUserInfo } = useUserStore();
  const err = await updateUserInfo({
    userName: 'test_user',
  });
  if (err) {
    showDialog({
      title: '温馨提示',
      message: err.message,
    });
    return false;
  }
  return true;
}

export { beforeEach, afterEach };
