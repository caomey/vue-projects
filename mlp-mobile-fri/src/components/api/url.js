export const login_url = '/mobile/login';

export const get_sq_list = '/mobile/task/sqlist';

export const get_mp_list = '/mobile/mlp/mpList';

export const get_road_name = '/mobile/mlp/asyRoadName';

export const get_xzxq_list = '/mobile/xzxq/list';

/**根据任务单id获取任务详情 */
export const get_task_temp = '/mobile/task/temp';
/**新增门牌业务 */
export const post_verified = '/mobile/task/insertVerified';
/**查询门牌是否存在 */
export const get_mp_exist = '/mobile/task/mpExist';

/**mj办理新增门牌、变更门牌、制牌安装、任务核实业务 */
export const post_mp_handle = '/mobile/task/Mp/add/handle';
/**标识牌提交 */
export const post_temporary = '/mobile/task/temporary';

/**中止任务 */
export const post_finish = '/mobile/task/finish'

/**申请撤回任务 */
export const post_rollback = '/mobile/task/rollback'

/**任务核实注销 */
export const post_unverify = '/mobile/task/unverify'

/**门楼牌管理列表 */
export const get_mpManageList = '/mobile/mlp/mpManageList'

/**门楼牌详情 */
export const get_mpDetail = '/mobile/mlp/mpDetail'


/**修改密码 */
export const modify_password = '/mobile/modify_password'

/**根据用户获取制牌安装列表 */
export const get_task_installList = '/mobile/task/installList'


/**搜索查阅未通过的安装反馈数据 */
export const get_installedList = '/mobile/installedList'

/**根据任务id获取制牌安装列表 */
export const get_task_installListInfo = '/mobile/task/installListInfo'

/**错误牌反馈 */
export const task_errorFeedBack = '/mobile/task/errorFeedBack'

/**查询字典值根据类型 */
export const get_dictitem_query_dictitem_type = '/dictitem/query_dictitem_type'

/**安装制牌信息 */
export const task_installTemp = '/mobile/task/installTemp'

/**处理查阅未通过信息 */
export const handle_again = '/mobile/record/handle_again'