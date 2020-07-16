<template>
  <div>
    <div class="hide-pen" @click.stop="hideDrop" @touchstart="hideDrop" v-show="hidePenShow">
    </div>
    <van-field :label="label" readonly :required="enableEdit && required" :error-message="errorMessage"
      :is-link="enableEdit" :arrow-direction="dropShow ? 'up': 'down'" @click="fieldClick" style="overflow: visible;">
      <div slot="input">

        <div class="van-field__body">
          <input type="text" readonly="readonly" class="van-field__control drop-cell-select-value" :value="selectText"
            style="width:100%" />
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
  export default {
    name: 'selectDrop',
    data() {
      return {
        dropShow: false,
        hidePenShow: false,
        getOptionVlaue: () => {},
        getOptionText: () => {},
      };
    },
    model: {
      prop: "selectOption",
      event: "selected"
    },
    props: {
      label: String,
      errorMessage: String,
      options: {
        type: Array,
        default () {
          return []
        }
      },
      textKey: {
        type: String,
      },
      valueKey: {
        type: String,
      },
      enableEdit: {
        type: Boolean,
        default: true
      },
      selectOption: {

      },
      required: Boolean
    },
    created: function () {
      // 判断选项是否为对象，如果指定了key就是对象
      if (this.valueKey) {
        // console.log('created this', this);

        this.getOptionVlaue = op => {
          return op[this.valueKey]
        }
        this.getOptionText = op => {
          return op[this.textKey]
        }
      } else {
        this.getOptionVlaue = op => {
          return op;
        }
        this.getOptionText = op => {
          return op;
        }
      }

    },
    computed: {


      selectText: function () {

        if (this.selectOption) {
          const text = this.getOptionText(this.selectOption);
          if (text != null) {
            return text
          }
        }
        return this.options ? '--请选择--' : ''
      }
    },

    methods: {
      cellClick(item) {
        this.$emit("selected", item);
        this.hideDrop();
      },
      fieldClick() {
        console.log('this.enableEdit', this.enableEdit);
        console.log('this.options', this.options);
        if (!this.enableEdit) {
          return false;
        }
        if (this.dropShow) {
          this.hideDrop();
        } else {
          this.showDrop();
        }
      },
      showDrop() {
        this.dropShow = true;
        this.hidePenShow = true;
      },
      hideDrop() {
        this.dropShow = false;
        this.hidePenShow = false;
      },

    }
  };
</script>