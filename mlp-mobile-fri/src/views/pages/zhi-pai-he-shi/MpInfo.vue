<template>
  <div>
    <div class="mp-cell-box">
      <van-cell-group class="cell-group-padding">
        <select-drop
          label="地址类型"
          required
          :enable-edit="getEnableEdit('address')"
          :error-message="addressErr"
          text-key="name"
          value-key="value"
          :options="addresstypeList"
          v-model="addressSelect"
          @click.native="addressErr = ''"
        ></select-drop>
        <select-drop
          label="行政街道"
          required
          :enable-edit="getEnableEdit('xzjd')"
          :options="xzjdList"
          v-model="xzjdSelect"
          text-key="xzName"
          value-key="xzId"
          :error-message="xzjdErr"
          @click.native="xzjdErr = ''"
        ></select-drop>
        <select-drop
          label="行政社区"
          required
          :enable-edit="getEnableEdit('xzsq')"
          :options="xzsqList"
          v-model="xzsqSelect"
          text-key="xzName"
          value-key="xzId"
          :error-message="xzsqErr"
          @click.native="xzsqErr = ''"
        />
        <input-drop
          label="街路巷名称"
          :enable-edit="getEnableEdit('roadName')"
          :getOptions="getAsyRoadName"
          text-key="roadName"
          v-model="roadSelect"
          :error-message="roadErr"
          @click.native="roadErr = ''"
        />
        <van-field
          label="门牌号码"
          :readonly="!getEnableEdit('mphm')"
          :required="getEnableEdit('mphm')"
          v-model="mphm"
          :placeholder="getPlaceholder('mphm','例：1303') "
          :error-message="mphmErr"
          @click.native="mphmErr = ''"
        />
        <select-drop
          label="规格"
          required
          :enable-edit="getEnableEdit('mpgg')"
          :options="mpggList"
          v-model="mpggSelect"
          value-key="value"
          text-key="name"
          :error-message="mpggErr"
          @click.native="mpggErr = ''"
        />
        <van-field
          label="原门牌号码"
          :readonly="!getEnableEdit('ymphm')"
          v-model="ymphm"
          :placeholder="getPlaceholder('ymphm','多个请用“/”分隔！')"
        />
        <van-field
          :label="buildNameLable"
          :required="
            buildNameRequired && getEnableEdit('buildName')
          "
          label-width="auto"
          :error-message="buildNameRequired ? buildNameErr : ''"
          @click.native="buildNameErr = ''"
        >
          <template v-slot:input>
            <div style="padding-left:10px">
              <div class="van-field__body">
                <input
                  type="text"
                  :readonly="
                     getEnableEdit('buildName') ? false : true
                  "
                  v-model="buildname"
                  :placeholder="getPlaceholder('buildName','请输入...') "
                  class="van-field__control"
                  style="width:100%"
                />
              </div>
            </div>
          </template>
        </van-field>
        <van-field
          label="俗称/别称"
          :readonly="!getEnableEdit('buildsc')"
          v-model="buildsc"
          :placeholder=" getPlaceholder('buildsc','多个请用“/”分隔！')"
        />
        <van-field
          label="建筑物编码"
          :readonly="!getEnableEdit('buildcode')"
          v-model="buildcode"
          v-if="!buildNameRequired"
          :required="!buildNameRequired && getEnableEdit('buildcode') && !noRequird.buildcode"
          :error-message="buildcodeErr"
          @click.native="buildcodeErr = ''"
          maxlength="19"
          :show-word-limit="getEnableEdit('buildcode')"
        />
        <van-cell title="是否贴临时标识牌" class="van-cell-label" :required="getEnableEdit('temporary')">
          <van-radio-group
            v-model="temporary"
            direction="horizontal"
            :disabled="!getEnableEdit('temporary')"
          >
            <van-radio :name="1">是</van-radio>
            <van-radio :name="2">否</van-radio>
          </van-radio-group>
        </van-cell>
        <pick-location v-model="point" :required="getEnableEdit('location')" />
      </van-cell-group>
      <van-field
        v-model="content"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        :readonly="!getEnableEdit('content')"
        :placeholder="getPlaceholder('content','请输入备注，总字数不能超过50个字符') "
        :show-word-limit="getEnableEdit('content')"
        class="cell-group-padding"
      />
      <van-cell-group class="cell-group-padding" style="padding: 5px 5px;">
        <div class="upload-title">照片上传</div>

        <van-row>
          <van-col span="12" style="text-align: center">
            <upload-img
              v-model="photo3"
              title="门牌照片"
              :disabled="!getEnableEdit('mpPhoto')"
              :deletable="getEnableEdit('mpPhoto')"
            />
          </van-col>

          <van-col span="12" style="text-align: center">
            <upload-img
              v-if="bspPhotoShow && !noShow.bspPhoto"
              v-model="photo4"
              title="标识牌照片"
              :disabled="!getEnableEdit('bspPhoto')"
              :deletable="getEnableEdit('bspPhoto')"
            />
          </van-col>
        </van-row>
      </van-cell-group>
      <div class="cell-group-padding bottom-div"></div>
      <lou-dong
        v-if="enableDy"
        :enable-ld="enableLd"
        :own-ld-list="ownLdList"
        class="ld-dy"
        ref="ldDy"
        :enable-edit="getEnableEdit('lddy')"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import louDong from "./LouDong";
import api from "../../../components/api";
import { RadioGroup, Radio } from "vant";
Vue.use(Radio);
Vue.use(RadioGroup);
import {
  addresstypeList,
  addresstypeModel
} from "../../../components/Constant";
import uploadImg from "../../../components/UploaderImg";
import pickLocation from "../../../components/PickLocation";
export default {
  name: "mpInfo",
  data() {
    return {
      addressErr: "",
      xzjdErr: "",
      xzsqErr: "",
      roadErr: "",
      mphmErr: "",
      mpggErr: "",
      buildNameErr: "",
      buildcodeErr: "",
      ownLdList: [],
      addresstypeList,
      bspPhotoShow: false,
      ldShow: false,
      enableDy: false,
      enableLd: false,
      xzjdList: [],
      xzsqList: [],
      mpggList: [],

      selectXzId: null,
      mpPhoto: [],
      photo3: null,
      photo4: null,
      bspPhoto: [],

      // 组件原因只能绑定data
      temporary: null,
      point: {
        x: null,
        y: null
      },
      addressSelect: {
        name: null,
        value: null
      },
      xzjdSelect: {
        xzName: null,
        xzId: null
      },
      xzsqSelect: {
        xzName: null,
        xzId: null
      },
      roadSelect: {
        roadName: null,
        roadId: null
      },
      mpggSelect: {
        value: null,
        name: null
      },
      content: "",
      mphm: "",
      ymphm: "",
      buildname: "",
      buildsc: "",
      buildcode: ""
    };
  },
  components: {
    louDong,
    uploadImg,
    pickLocation
  },
  props: {
    enableEdit: Object,
    noRequird: {
      type: Object,
      default() {
        return {};
      }
    },
    noShow: {
      type: Object,
      default() {
        return {};
      }
    },
    tempData: Object
  },
  computed: {
    locationMsgShow: function() {
      return this.point.x === null;
    },
    buildNameRequired: function() {
      if (this.addressSelect.name) {
        const addressName = this.addressSelect.name;
        return addressName === "小区" || addressName === "单位院";
      }
      return false;
    },
    buildNameLable: function() {
      if (this.addressSelect.name) {
        return this.addressSelect.name + "名称";
      } else {
        return "建筑物名称";
      }
    }
  },
  watch: {
    "xzjdSelect.xzId": {
      handler: function(xzId) {
        this.xzsqSelect = {
          xzName: null,
          xzId: null
        };
        if (xzId != null && xzId != "") {
          api.getXzxqList(xzId).then(reponseData => {
            this.xzsqList = reponseData.data;
          });
        } else {
          this.xzsqList = [];
        }
      },
      immediate: true
    },
    "addressSelect.value": {
      handler: function(addressType) {
        if (addressType != null) {
          const model = addresstypeModel[addressType];
          this.mpggList = model.mpggList;
          this.enableDy = model.enableDy;
          this.enableLd = model.enableLd;
        }
      },
      immediate: true
    }
  },
  created() {
    // 数据可以编辑加载下拉选项
    if (!this.enableEdit || this.enableEdit.szjd) {
      if (this.xzjdList.length == 0) {
        // 加载行政街道
        api
          .getXzxqList(this.$store.state.userInfo.ssfjCode)
          .then(reponseData => {
            this.xzjdList = reponseData.data;
          });
      }
    }
    this.initData(this.tempData);
  },
  methods: {
    getEnableEdit(key) {
      return !this.enableEdit || !!this.enableEdit[key];
    },
    getPlaceholder(key, str) {
      return !this.enableEdit || !!this.enableEdit[key] ? str : "";
    },
    getAsyRoadName: roadName =>
      api.getRoadName(roadName).then(reponse => {
        return reponse.data;
      }),
    // 主动调用刷新数据，观察有BUG
    initData(taskData) {
      if (taskData) {
        const taskTemp = taskData.taskTemp;
        this.temporary = taskTemp.temporary;
        this.point = {
          x: taskTemp.x,
          y: taskTemp.y
        };
        this.addressSelect = {
          name: taskTemp.addressName,
          value: taskTemp.addresstype
        };
        (this.xzjdSelect = {
          xzName: taskTemp.szjd,
          xzId: null
        }),
          (this.xzsqSelect = {
            xzName: taskTemp.szsq,
            xzId: null
          });
        (this.roadSelect = {
          roadName: taskTemp.roadName,
          roadId: taskTemp.roadId
        }),
          (this.mpggSelect = {
            value: taskTemp.mpgg,
            name: taskTemp.mpggName
          });
        this.content = taskTemp.content ? taskTemp.content : "";
        this.mphm = taskTemp.mphm;
        this.ymphm = taskTemp.ymphm;
        this.buildname = taskTemp.buildname;
        this.buildsc = taskTemp.buildsc;
        this.buildcode = taskTemp.buildcode ? taskTemp.buildcode : "";
        this.photo3 = taskTemp.photo3;
        this.photo4 = taskTemp.photo4;
        this.ownLdList = taskData.children;
        this.bspPhotoShow = true;
      }
    },
    getData() {
      let errMsg = this.checkData();
      let ldDyData = { deleteIds: [], updateList: [], insertList: [] };
      if (this.enableDy) {
        const ldDyPkData = this.$refs.ldDy.getData();
        if (ldDyPkData.errMsg) {
          errMsg = ldDyPkData.errMsg;
        }
        ldDyData = ldDyPkData.data;
      }
      const { ssfj, sspcs, jwsq, userId, roleId } = this.$store.state.userInfo;
      let oldTemp = {};

      if (this.tempData && this.tempData.taskTemp) {
        oldTemp = { taskId: this.tempData.taskTemp.taskId };
      }
      const packData = {
        photo3: this.photo3,
        photo4: this.photo4,
        taskButchVos: {
          ...ldDyData,
          taskTemp: {
            ...oldTemp,
            addressName: this.addressSelect.name,
            addresstype: this.addressSelect.value,
            ymphm: this.ymphm,
            mphm: this.mphm,
            buildname: this.buildname,
            buildsc: this.buildsc,
            buildcode: this.buildcode,
            content: this.content,
            szjd: this.xzjdSelect.xzName,
            szsq: this.xzsqSelect.xzName,
            roadName: this.roadSelect.roadName,
            roadId: this.roadSelect.roadId,
            mpggName: this.mpggSelect.name,
            mpgg: this.mpggSelect.value,
            temporary: this.temporary,
            dataType: 1,
            operateType: 1,
            x: this.point.x,
            y: this.point.y,
            ssfj,
            sspcs,
            jwsq
          },
          userId,
          roleId
        }
      };
      return {
        packData,
        errMsg
      };
    },
    checkData() {
      let errMsg = null;
      if (this.addressSelect.name == null) {
        this.addressErr = "请选择";
        errMsg = "地址类型未选择";
      }
      if (this.xzjdSelect.xzName == null) {
        this.xzjdErr = "请选择";
        errMsg = "行政街道未选择";
      }
      if (this.xzsqSelect.xzName == null) {
        this.xzsqErr = "请选择";
        errMsg = "行政社区未选择";
      }
      if (this.roadSelect.roadName == null) {
        this.roadErr = "请输入并选择街路巷";
        errMsg = "街路巷未选择";
      }
      if (this.mphm.length == 0) {
        this.mphmErr = "请输入门牌号";
        errMsg = "门牌号未输入";
      }
      if (this.mpggSelect.name == null) {
        this.mpggErr = "请选择";
        errMsg = "门牌规格未选择";
      }
      if (this.buildNameRequired) {
        if (this.buildname.length == 0) {
          this.buildNameErr = `请输入${this.addressSelect.name}名称`;
          errMsg = `${this.addressSelect.name}名称未输入`;
        }
      } else if (!this.noRequird.buildcode) {
        if (this.buildcode.length == 0) {
          this.buildcodeErr = "请输入建筑物编码";
          errMsg = `建筑物编码未输入`;
        } else {
          if (/(^$)|(^[0-9T]+$)/.test(this.buildcode) === false) {
            this.buildCodeErr = errMsg =
              "建筑物编码只能为数字或字母T，字母T只能放在第15位";
          } else {
            if (
              this.buildcode.indexOf("T") != -1 &&
              this.buildcode.indexOf("T") != 14
            ) {
              this.buildCodeErr = errMsg = "建筑物编码字母T只能放在第15位";
            }
          }
        }
      }

      if (this.temporary == null) {
        errMsg = `未勾选是否贴临时牌标识`;
      }
      if (this.point.x == null) {
        errMsg = `未选取地理位置坐标`;
      }

      return errMsg;
    }
  }
};
</script>

<style lang="less" scoped>
.lddy-box {
  padding-top: @padding-top;
  margin-top: @padding-top;
}

.ld-dy {
  background-color: #fff;
}
</style>