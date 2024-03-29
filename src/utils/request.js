import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

const instance = axios.create({
  baseURL: 'https://scc.whut.edu.cn/mobile.php',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Auth: 'Baisc MTAyNDY6MTAyNDY=',
  },
});

instance.interceptors.request.use(config => {
  Object.assign(config.data, {
    school_id: 'b525083d-b83c-4c7e-892f-29909421d961',
    login_user_id: 1,
    login_admin_school_code: '',
    login_admin_school_id: 'b525083d-b83c-4c7e-892f-29909421d961',
  });

  const query = new URLSearchParams(config.data);
  config.data = query.toString();

  return config;
});

instance.interceptors.response.use(response => {
  if (response.status !== 200) {
    return Promise.reject('服务器错误 ' + result.status);
  }

  if (response.data.code === 0) {
    return response.data.data;
  }

  return Promise.reject(response.data.msg);
}, error => {
  return Promise.reject(error);
});

function request(url, data) {
  return instance({
    url,
    data,
  });
}

export function jsonp(url) {
  return axios({
    method: 'GET',
    url,
    adapter: jsonpAdapter,
    callbackParamName: 'callback',
  });
}

export default request;
