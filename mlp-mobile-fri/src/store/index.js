import vue from 'vue';


var myStore = {

    state: vue.observable({
        userInfo: null,
        mlpDataState: 0,
        topOverlayFlag: true,
        topOverlayShow: false,
        topOverlayShowStamp: 0,
        installDataState: 0

    }),
    setToken(token) {
        this.state.token = token;
    },
    setUserInfo(userInfo) {
        this.state.userInfo = userInfo;
    },
    /**通知更新mlp数据 */
    updateMlpDataState() {
        ++this.state.mlpDataState
    },
    updateInstallDataState() {
        ++this.state.installDataState
    },
    showOverlay() {
        this.state.topOverlayShow = true
        return ++this.state.topOverlayShowStamp
    },
    hideOverlay(stamp) {
        if (stamp >= this.state.topOverlayShowStamp) {
            this.state.topOverlayShow = false
        }
    }


};

export default myStore;