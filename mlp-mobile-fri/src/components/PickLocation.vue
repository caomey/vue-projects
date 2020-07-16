<template>
  <van-field
    :label="label"
    readonly
    is-link
    @click="toLocation"
    ptype="textarea"
    autosize
    v-bind="$attrs"
  >
    <template v-slot:input>
      <div class="van-field__body" style="width: 100%" v-show="!locationMsgShow">
        <input
          type="text"
          readonly
          placeholder="请点击地理位置信息（定位）"
          class="van-field__control"
          style="width:100%"
        />
      </div>
      <div style="width: 100%" v-if="locationMsgShow">
        <div>
          <span style="color:blue">[X]</span>
          <span>{{ point.x }}</span>
        </div>
        <div>
          <span style="color:blue">[Y]</span>
          <span>{{ point.y }}</span>
        </div>
      </div>
    </template>
  </van-field>
</template>

<script>
export default {
  model: {
    prop: "point",
    event: "changePoint"
  },
  props: {
    label: {
      type: String,
      default: "地理位置"
    },
    point: {
      type: Object,
      default() {
        return {
          x: null,
          y: null
        };
      }
    },
    enableEdit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    locationMsgShow() {
      return !!this.point && !!this.point.x;
    }
  },
  methods: {
    toLocation() {
      this.$router.push({
        name: "mapLocation",
        params: {
          editEnable: this.enableEdit,
          updateLocation: point => {
            const x = point.lng;
            const y = point.lat;
            this.$emit("changePoint", { x, y });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>