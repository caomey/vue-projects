import http from "../../components/httpUtil";
import * as url from "./url";
import store from "../../store";

export const doLogin = (username, password) =>
  http.postByData(url.login_url, {
    username,
    password,
  });
export const getDictitemByType = (type) => {
  return http.get(url.get_dictitem_query_dictitem_type, {
    type,
  });
};
const imgHost = "https://msjwt.ga.sz.gov.cn/mlp/image";

/**获取图片访问路径 */
export const getImgSrc = (imgUrl) =>
  imgUrl && imgUrl.length > 7 ? imgHost + imgUrl : "";

const userInfo = () => store.state.userInfo;

export const getSqList = () =>
  http.get(url.get_sq_list, {
    userId: userInfo().userId,
  });

export const getMpList = (currentPage, field, verifyState, type, dsh) => {
  const params = {
    currentPage,
    field,
    verifyState,
    type,
    userId: userInfo().userId,
    jwsq: userInfo().jwsq,
  };
  if (dsh) {
    params.dsh = dsh;
  }
  return http.getList(url.get_mp_list, params);
};

export const getRoadName = (roadName) => {
  return http.get(url.get_road_name, {
    roadName,
  });
};

export const getXzxqList = (id) => {
  return http.get(url.get_xzxq_list, {
    id,
  });
};
/**根据任务单id获取任务详情 */
export const getTaskTemp = (taskId) => {
  return http.get(url.get_task_temp, {
    taskId,
  });
};
/**根据jxl： 道路名称 mphm 判断mphm是否存在 */
export const getMpExist = (jlx, mphm) => {
  return http.get(url.get_mp_exist, {
    jlx,
    mphm,
    sspcs: store.state.userInfo.sspcs,
  });
};

/**新增门牌业务 */
export const insertVerified = (photo3, taskButchVos) => {
  const formData = new FormData();
  formData.append("photo3", photo3);
  formData.append("taskButchVos", JSON.stringify(taskButchVos));
  return http.postByMultipart(url.post_verified, formData);
};
/**mj办理新增门牌、变更门牌、制牌安装、任务核实业务 */
export const mpHandle = (photo3, taskButchVos) => {
  const formData = new FormData();
  formData.append("photo3", photo3);
  formData.append("taskButchVos", JSON.stringify(taskButchVos));
  return http.postByMultipart(url.post_mp_handle, formData);
};
/**编设标识牌 */
export const taskTemporary = (photo3, photo4, taskId) => {
  const formData = new FormData();
  formData.append("photo3", photo3);
  formData.append("photo4", photo4);
  const userId = userInfo().userId;
  const roleId = userInfo().roleId;
  return http.postByMultipart(url.post_temporary, formData, {
    taskId,
    userId,
    roleId,
  });
};
/**中止任务 */
export const taskFinish = (taskId) => {
  const formData = new FormData();
  formData.append("taskId", taskId);
  formData.append("userId", userInfo().userId);
  return http.postByMultipart(url.post_finish, formData);
};

/**申请撤回任务 */
export const taskRollback = (taskId, content) => {
  const formData = new FormData();
  formData.append("taskId", taskId);
  formData.append("content", content);
  formData.append("userId", userInfo().userId);
  formData.append("roleId", userInfo().roleId);
  return http.postByMultipart(url.post_rollback, formData);
};

/**任务核实注销 */
export const taskUnverify = (taskId, mpId, content) => {
  const formData = new FormData();
  formData.append("taskId", taskId);
  formData.append("mpId", mpId);
  formData.append("content", content);
  formData.append("userId", userInfo().userId);
  formData.append("roleId", userInfo().roleId);
  return http.postByMultipart(url.post_unverify, formData);
};

function buildParamNotEmpty(params, param) {
  for (let key in param) {
    const value = param[key];
    if (value && value.length > 0) {
      params[key] = value;
    }
  }
}
/**门楼牌管理列表 */
export const mpManageList = (page, roadName, mphm, szxq) => {
  const params = {
    ...page,
  };

  buildParamNotEmpty(params, {
    roadName,
    mphm,
    szxq,
  });

  return http.getList(url.get_mpManageList, params);
};

/**根据用户id获取制牌安装列表  */
export const taskInstallList = () => {
  const userId = userInfo().userId;
  // const userId = 23
  return http.get(url.get_task_installList, {
    userId,
  });
};
/**搜索查阅未通过的安装反馈数据  */
export const installedList = (page) => {
  // const ssfj = userInfo().ssfj
  const ssfj = "福田分局";
  const params = {
    ...page,
    ssfj,
  };
  return http.getList(url.get_installedList, params);
};

/**根据任务id获取制牌安装列表  */
export const taskInstallListInfo = (taskId) => {
  return http.get(url.get_task_installListInfo, {
    taskId,
  });
};
/**错误牌反馈  */
export const taskErrorFeedBack = (taskId, reason, content) => {
  return http.post(url.task_errorFeedBack, {
    taskId,
    reason,
    content,
  });
};

/**保存安装制牌信息  */
export const taskInstallTemp = (taskId, content, lat, lng, photo1, photo2) => {
  const formData = new FormData();
  formData.append("photo1", photo1);
  formData.append("photo2", photo2);
  return http.postByMultipart(url.task_installTemp, formData, {
    taskId,
    content,
    lat,
    lng,
  });
};

/**保存安装制牌信息  */
export const handleAgain = (addressId, addressType, photo1, photo2) => {
  const formData = new FormData();
  formData.append("photo1", photo1);
  formData.append("photo2", photo2);
  return http.postByMultipart(url.handle_again, formData, {
    addressId,
    addressType,
  });
};

/**门楼牌详情 */
export const getMpDetail = (mpId) => {
  return http.get(url.get_mpDetail, {
    mpId,
  });
};

/**修改密码 */
export const modifyPassword = (password, newPassword) => {
  const username = userInfo().userName;
  return http.postByData(url.modify_password, {
    password,
    newPassword,
    username,
  });
};
