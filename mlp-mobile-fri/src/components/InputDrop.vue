<template>
  <div>
    <div class="hide-pen" @click="hideDrop" @touchstart="hideDrop" v-show="hidePenShow"></div>
    <van-field :label="label" :required="enableEdit" :is-link="enableEdit" :arrow-direction="dropShow ? 'up' : 'down'"
      @click.stop="fieldClick">
      <div slot="input">
        <div class="van-field__body">
          <input type="text" :readonly="!enableEdit" class="van-field__control" placeholder="请输入搜索内容" style="width:100%"
            v-model="selectText" @input="inputChange" />
        </div>
        <div class="fild-drop-box" v-show="dropShow">
          <div v-for="(item,index) in options" :key="index" class="van-hairline--bottom">
            <van-cell clickable :border="false" :title="item[textKey] || item" @click.stop="cellClick(item)" />
          </div>
          <p class="no-option-msg">没有了</p>
        </div>
      </div>
    </van-field>
    <div class="hide-pen-bottom" @click.stop="hideDrop" @touchstart="hideDrop" v-show="hidePenShow"></div>
  </div>
</template>

<script>
  import debounce from "lodash/debounce";
  export default {
    data() {
      return {
        dropShow: false,
        options: [],
        currentOption: null,
        hidePenShow: false,
        inputText: ""
      };
    },
    model: {
      prop: "selectOption",
      event: "selected"
    },
    props: {
      label: String,
      getOptions: Function,
      textKey: {
        type: String,
        default: "text"
      },
      enableEdit: {
        type: Boolean,
        default: true
      },
      selectOption: {}
    },
    created() {
      // 判断选项是否为对象，如果指定了key就是对象
      if (this.textKey) {
        this.getOptionText = op => {
          return op[this.textKey];
        };
      } else {
        this.getOptionText = op => {
          return op;
        };
      }
      this.debouncedQuery = debounce(this.queryData, 1000);
    },
    computed: {
      /**
       * 如果有选中值显示选择项
       * 如果离开输入焦点未选择值清空
       *
       */
      selectText: {
        get: function () {

          if (this.currentOption != null) {
            return this.getOptionText(this.currentOption);
          } else {
            // 遮罩层关闭表示离开焦点
            if (this.hidePenShow) {
              return this.inputText;
            } else {
              if (this.selectOption) {
                return this.getOptionText(this.selectOption);
              }
              return "";
            }
          }
        },
        set: function (val) {

          this.inputText = val;
        }
      }
    },
    methods: {
      cellClick(item) {
        this.currentOption = item;
        console.log("this.currentOption", this.currentOption);

        this.$emit("selected", item);
        this.hideDrop();
      },

      queryData() {
        const value = this.inputText;
        if (value.length > 0) {
          this.showDrop();
          this.getOptions(value).then(data => {
            this.options = data;
          });
        }
      },
      fieldClick() {
        if (!this.enableEdit) {
          return false;
        }
        if (this.dropShow) {
          this.hideDrop();
        } else {
          this.showDrop();
        }
      },
      inputChange() {
        this.currentOption = null;
        this.debouncedQuery();
      },
      showDrop() {
        // console.log('showDrop...');
        this.dropShow = true;
        this.hidePenShow = true;
      },

      hideDrop() {
        // console.log('hideDrop...');
        this.inputText = ''
        this.dropShow = false;
        this.hidePenShow = false;
      }
    }
  };
</script>

<style lang="less" scoped>
  .no-data-msg {
    color: @border-color;
    position: absolute;
    z-index: -1;
  }
</style>