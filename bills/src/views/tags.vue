<template>
  <div class="tags">
    <section>
      <span>点击修改标签</span>
      <div class="items">
        <div v-for="tag in tags" class="item" :key="tag">
          <span @click="updateTags(tag)">{{ tag }}</span>
          <a class="icon" @click="removeTags(tag)"></a>
        </div>
      </div>
    </section>

    <Nav></Nav>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Nav,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["removeTags", "updateTags", "initTags"]),
  },
  computed: {
    ...mapState(["tags"]), //取出state中的tags
  },
  created() {
    this.initTags();
  },
};
</script>

<style lang="less" scoped>
.tags {
  display: flex;
  flex-flow: column;
  height: 100vh;
  section {
    flex: 1;
    & > span {
      display: block;
      padding: 1rem 1rem;
    }
    .items {
      display: flex;
      flex-flow: row wrap;
      padding: 1rem 1rem;
      .item {
        margin: 0.1rem 0.4rem;
        height: 1.4rem;
        line-height: 1.4rem;
        span {
          background-color: #d9d9d9;
          padding: 0 0.5rem;
          height: 1.4rem;
          border-radius: 0.7rem;
          margin-right: 0.2rem;
        }
        .icon::after {
          content: "\e690";
          font-family: "iconfont";
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
