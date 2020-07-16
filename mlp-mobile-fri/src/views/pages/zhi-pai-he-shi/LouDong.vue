<template>
  <div>
    <template v-if="enableLd">
      <van-row class="row-box" v-for="(ld,index) in ldList" :key="ld.mphm">
        <van-col span="4" class="left-box" @click="editLd(ldList,index)">
          <div class="ld-img-box col-table" style="height:100%;width:100%">
            <div class="cell-box">
              <img src="../../../assets/loudong.png" alt="单元" class="ld-img-box-img" />
              <div>{{ ld.mphm }}栋</div>
            </div>
          </div>
        </van-col>
        <van-col span="16" class="middle-box">
          <div class="list-box">
            <div
              class="ld-img-box ld-img-box-item"
              v-for="(dy,index) in ld.list"
              :key="dy.mphm"
              @click="editDy(ld.list,index,ld)"
            >
              <img src="../../../assets/danyuan.png" alt="单元" class="ld-img-box-img" />
              <div class="ld-img-lable">{{ dy.mphm }}单元</div>
            </div>

            <div class="ld-img-box ld-img-box-end"></div>
          </div>
        </van-col>
        <van-col span="4" class="right-box" v-show="enableEdit">
          <div class="col-table" style="height:100%;width:100%" @click="addDy(ld.list)">
            <div class="cell-box add-ld-box">
              <div class="iconfont iconadd"></div>
              <div class="add-lable">添加单元</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </template>
    <!-- 不能添加楼栋，只能添加单元 -->
    <template v-if="!enableLd">
      <van-row class="row-box">
        <van-col span="20" class="middle-box">
          <div class="list-box">
            <div
              class="ld-img-box ld-img-box-item"
              v-for="(dy,index) in dyList"
              :key="dy.mphm"
              @click="editDy(dyList,index)"
            >
              <img src="../../../assets/danyuan.png" alt="单元" class="ld-img-box-img" />
              <div class="ld-img-lable">{{ dy.mphm }}单元</div>
            </div>

            <div class="ld-img-box ld-img-box-end"></div>
          </div>
        </van-col>
        <van-col span="4" class="right-box" v-show="enableEdit">
          <div class="col-table" style="height:100%;width:100%" @click="addDy(dyList)">
            <div class="cell-box add-ld-box">
              <div class="iconfont iconadd"></div>
              <div class="add-lable">添加单元</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </template>

    <van-row v-if="enableLd && enableEdit">
      <van-col span="4" class="add-ld-col" @click="addLd">
        <div class="col-table" style="height:100%;width:100%">
          <div class="cell-box add-ld-box">
            <div class="iconfont iconadd"></div>
            <div class="add-lable">添加楼栋</div>
          </div>
        </div>
      </van-col>
      <van-col span="16" class="add-ld-box-middle"></van-col>
      <van-col span="4"></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ldList: [],
      dyList: [],
      deleteIds: []
    };
  },
  props: {
    ownLdList: {
      type: Array,
      default() {
        return [];
      }
    },
    enableLd: Boolean,
    rootTaskId: [Number, String],
    enableEdit: Boolean
  },
  watch: {
    ownLdList: {
      handler: function(val) {
        Object.assign(this.$data, this.$options.data());
        if (val) {
          this.ldList = [...val];
        }
      },
      immediate: true
    },
    enableLd: function() {
      Object.assign(this.$data, this.$options.data());
    }
  },

  methods: {
    addLd() {
      this.$router.push({
        name: "editLouPai",
        params: {
          receiveData: ldData => {
            const mphm = ldData.mphm;
            // 遍历楼栋号码是否重复
            for (let i = 0; i < this.ldList.length; i++) {
              const ld = this.ldList[i];
              if (ld.mphm === mphm) {
                return "楼栋号码已存在";
              }
            }
            ldData.handFlag = "add";
            ldData.list = [];
            this.ldList.push(ldData);
            this.$toast.success("添加楼栋完成");
          },
          ownData: null,
          enableEdit: this.enableEdit
        }
      });
    },
    editLd(ldList, index) {
      const ldData = ldList[index];
      this.$router.push({
        name: "editLouPai",
        params: {
          ownData: ldData,
          enableEdit: this.enableEdit,
          deleteData: () => {
            const mphm = ldData.mphm;
            const taskId = ldData.taskId;
            if (taskId) {
              this.deleteIds.push({
                taskId
              });
            }
            this.$delete(ldList, index);

            this.$toast.success(`${mphm}号楼栋信息已注销`);
          },
          receiveData: editData => {
            const mphm = editData.mphm;
            if (mphm != ldData.mphm) {
              // 遍历楼栋号码是否重复
              for (let i = 0; i < ldList.length; i++) {
                const ld = ldList[i];
                if (ld.mphm === mphm) {
                  return "楼栋号码已存在";
                }
              }
            }

            this.$set(ldList, index, {
              ...ldData,
              ...editData
            });
            // 存在taskId是之前添加的
            if (ldData.taskId) {
              ldData.handFlag = "edit";
            }
          }
        }
      });
    },
    addDy(dyList) {
      this.$router.push({
        name: "editDYPai",
        params: {
          receiveData: editData => {
            const mphm = editData.mphm;
            // 遍历号码是否重复
            for (let i = 0; i < dyList.length; i++) {
              const unit = dyList[i];
              if (unit.mphm === mphm) {
                return "单元牌号码已存在";
              }
            }
            editData.handFlag = "add";
            dyList.push(editData);
            this.$forceUpdate();
            this.$toast.success("添加单元完成");
          },
          ownData: null,
          enableEdit: this.enableEdit
        }
      });
    },
    editDy(dyList, index) {
      const dyData = dyList[index];
      this.$router.push({
        name: "editDYPai",
        params: {
          ownData: dyData,
          enableEdit: this.enableEdit,
          deleteData: () => {
            const mphm = dyData.mphm;
            const taskId = dyData.taskId;
            if (taskId) {
              this.deleteIds.push({
                taskId
              });
            }
            this.$delete(dyList, index);
            this.$forceUpdate();
            this.$toast.success(`${mphm}号单元信息已注销`);
          },
          receiveData: editData => {
            const mphm = editData.mphm;
            if (dyData.mphm != mphm) {
              // 遍历号码是否重复
              for (let i = 0; i < dyList.length; i++) {
                const unit = dyList[i];
                if (unit.mphm === mphm) {
                  return "单元牌号码已存在";
                }
              }
            }
            this.$set(dyList, index, {
              ...dyData,
              ...editData
            });
            if (dyData.taskId) {
              dyData.handFlag = "edit";
            }
            this.$toast.success("修改单元信息完成");
          }
        }
      });
    },
    getData() {
      /**如果可以编辑楼栋，楼栋数量不能少于2
       * 每栋单元不能少于2
       */
      let errMsg = null;
      if (this.ldList.length < 2 && this.dyList.length < 2) {
        errMsg = "楼栋单元数量不能少于2个";
      }
      const insertList = [];
      const updateList = [];
      const ldListCopy = JSON.parse(JSON.stringify(this.ldList));
      ldListCopy.forEach(ld => {
        if (ld.handFlag === "add") {
          delete ld.handFlag;
          ld.dataType = 2;
          if (ld.list.length < 2) {
            errMsg = "每栋单元数量不能少于2个";
          }
          ld.list.forEach(dy => {
            delete dy.handFlag;
            dy.dataType = 3;
          });
          insertList.push(ld);
        } else if (ld.handFlag === "edit") {
          delete ld.handFlag;
          const dyList = ld.list;
          this.judgeDy(
            insertList,
            updateList,
            JSON.parse(JSON.stringify(dyList))
          );
          delete ld.list;
          updateList.push(ld);
        }
      });
      this.judgeDy(
        insertList,
        updateList,
        JSON.parse(JSON.stringify(this.dyList))
      );
      // console.log('insertList,updateList,deleteIds: this.deleteIds',{insertList,updateList,deleteIds: this.deleteIds});

      return {
        errMsg,
        data: {
          insertList,
          updateList,
          deleteIds: this.deleteIds
        }
      };
    },
    judgeDy(insertList, updateList, dyList) {
      dyList.forEach(dy => {
        if (dy.handFlag === "add") {
          delete dy.handFlag;
          dy.dataType = 3;
          insertList.push(dy);
        } else if (dy.handFlag === "edit") {
          delete dy.handFlag;
          updateList.push(dy);
        }
      });
    },
    initData(ldList) {
      Object.assign(this.$data, this.$options.data());
      if (ldList) {
        this.ldList = [...ldList];
      }
    }
  }
};
</script>

<style lang="less" scoped>
@row-height: 3rem;

.row-box {
  border-bottom: 1px solid #ebedf0 !important;
  height: @row-height;
}

.left-box {
  text-align: center;
  border-right: 1px solid #ebedf0 !important;
  height: @row-height;
}

.right-box {
  border-left: 1px solid #ebedf0 !important;
  height: @row-height;
}

.add-ld-col {
  border-bottom: 1px solid #ebedf0 !important;
  border-right: 1px solid #ebedf0 !important;
  text-align: center;
}

.add-ld-box {
  height: @row-height;
  color: blue;
}

.add-lable {
  font-size: 0.7rem;
}

.middle-box {
  height: @row-height;
}

.list-box {
  overflow-x: auto;
  overflow-y: hidden;
  height: @row-height;
  white-space: nowrap;

  display: -webkit-flex;
  display: flex;
  text-align: left;
}

.dong-lable {
  font-size: 0.14rem;
}

.ld-img-box {
  text-align: center;
  width: 2.9rem;
  height: 2.6rem;
  font-size: 0.5rem;
}

.ld-img-box-item {
  padding: 5px;
}

.ld-img-box-end {
  padding-left: 25px;
}

.ld-img-box-img {
  margin-top: 3px;
  width: 1rem;
  height: 1.2rem;
}

.ld-img-lable {
  margin-top: 0;
  margin-bottom: 3px;
}
</style>