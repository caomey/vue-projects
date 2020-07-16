import router from "../router";
import store from "../store";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import HmacSHA1 from "crypto-js/hmac-sha1";
import Base64 from "crypto-js/enc-base64";
const dateTime = new Date().toGMTString();
const SecretId = "AKID9w3aNB0v2Nao1TsO6RDCr1uTfn8cHHp5kH07";
const SecretKey = "5y5ua6N9j03l17ifq96f2bvejgcyiaiI7cywi0wn";
const source = "source";
const auth =
  'hmac id="' +
  SecretId +
  '", algorithm="hmac-sha1", headers="x-date source", signature="';
const signStr = "x-date: " + dateTime + "\n" + "source: " + source;
let sign = HmacSHA1(signStr, SecretKey);
sign = Base64.stringify(sign);
sign = auth + sign + '"';
const hmacHeder = {
  Source: source,
  "X-Date": dateTime,
  Authorization: sign,
};
axios.defaults.headers = {
  ...axios.defaults.headers,
  ...hmacHeder,
};
axios.defaults.baseURL = "/mlp-api";
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.userInfo) {
      config.headers.token = store.state.userInfo.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    if (!response.data) {
      throw "服务响应为空";
    }
    switch (response.data.status) {
      case 200:
        return response.data;
      case 403:
        router.push("/login");
        throw response.data;
      default:
        Toast.fail(response.data.msg + "\n" + response.data.status);
        throw response.data;
    }
  },
  (error) => {
    if (error.message) {
      if (error.message.includes("timeout")) {
        Toast.fail("网络超时");
      } else if (error.message.includes("Network")) {
        Toast.fail("网络连接异常");
      } else {
        Toast.fail("系统错误");
      }
    } else {
      Toast.fail("系统错误");
    }
    return Promise.reject(error);
  }
);
const buildAxios = (axiosPromise) => {
  const stmap = store.showOverlay();
  console.log("请求次数stmap：", stmap);

  return axiosPromise
    .then((data) => {
      store.hideOverlay(stmap);
      return data;
    })
    .catch((err) => {
      store.hideOverlay(stmap);
      throw err;
    });
};
const timeout = 60000;
const pageSize = 10;
export default {
  postByData(api, params) {
    return buildAxios(
      axios({
        method: "post", // 请求协议
        url: api, // 请求的地址
        data: qs.stringify(params), // post 请求的数据
        timeout,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
    );
  },
  postByMultipart(api, data, params) {
    return buildAxios(
      axios({
        method: "post", // 请求协议
        url: api, // 请求的地址
        data, // post 请求的数据
        params,
        timeout,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  post(api, params) {
    return buildAxios(
      axios({
        method: "post",
        url: api,
        params,
        timeout,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
    );
  },
  get(api, params) {
    return buildAxios(
      axios({
        method: "get",
        url: api,
        params, // get 请求时带的参数
        timeout,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
    );
  },
  getList(api, params) {
    if (!params.pageSize) {
      params.pageSize = pageSize;
    }
    return buildAxios(
      this.get(api, params).then((response) => {
        response.finished = response.total <= params.currentPage * pageSize;
        // response.finished = response.data.length < pageSize
        return response;
      })
    );
  },
};
