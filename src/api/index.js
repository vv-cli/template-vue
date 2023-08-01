import request from '../request';
import * as api from './constants';

// token查询
export function queryToken(data) {
  const url = api.QUERY_TOKEN;
  return request.post(url, data);
}

// 主题色查询
export function queryThemeColor() {
  const url = api.QUERY_THEME_COLOR;
  return request.get(url);
}
