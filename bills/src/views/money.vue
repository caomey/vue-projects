<template>
  <div class="money">
    <body>
      <Nav></Nav>
      <number-pad></number-pad>
      <section class="types">
        <ul>
          <li
            :class="{ selected: this.$store.state.types === '-' }"
            @click="selectType('-')"
          >
            支出
          </li>
          <li
            :class="{ selected: this.$store.state.types === '+' }"
            @click="selectType('+')"
          >
            收入
          </li>
        </ul>
      </section>
      <section class="notes">
        <span>备注</span>
        <input type="text" v-model="notes" placeholder="请输入备注" />
      </section>
      <div class="wrapper">
        <section class="tags">
          <div class="items">
            <div
              :class="['item', { selected: tag === $store.state.selectedTags }]"
              v-for="tag in tags"
              :key="tag"
              @click="selectTags"
            >
              {{ tag }}
            </div>
          </div>
          <div class="addTag">
            <button @click="addTags">添加标签</button>
          </div>
        </section>
      </div>
    </body>
  </div>
</template>

<script>
import NumberPad from "@/components/NumberPad.vue";
import Nav from "@/components/Nav.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    NumberPad,
    Nav,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["initTags", "addTags"]),
    selectTags(e) {
      this.$store.state.selectedTags = e.target.innerText;
    },
    selectType(types) {
      if (types === "-") {
        this.$store.state.types = "-";
        console.log("支出");
      } else {
        this.$store.state.types = "+";
        console.log("收入");
      }
    },
  },
  computed: {
    ...mapState(["tags", "notes"]),
    notes: {
      get() {
        return this.$store.state.notes;
      },
      set(val) {
        this.$store.state.notes = val;
      },
    },
  },
  created() {
    this.initTags();
  },
};
</script>
<style lang="less" scoped>
.money {
  display: flex;
  flex-flow: column;
  justify-items: flex-end;
  height: 100vh;
  body {
    display: flex;
    flex-flow: column-reverse;
    .types ul {
      height: 4rem;
      display: flex;
      flex-direction: row;
      background: #ccc;
      color: #333;
      li {
        flex: 1;
        text-align: center;
        line-height: 4rem;
        font-size: 1.5rem;
        cursor: pointer;
        &.selected {
          border-bottom: 2px solid black;
        }
      }
    }
    .notes {
      height: 4rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.5rem;
      span {
        color: #333;
      }
      input {
        flex: 1;
        padding-left: 0.5rem;
      }
    }
    .wrapper {
      display: flex;
      flex-flow: column;
      justify-content: flex-end;
      flex: 1;
      .tags {
        .addTag {
          padding: 0.5rem 1rem;
          button {
            vertical-align: center;
            color: #999;
            border-bottom: 1px solid;
          }
        }
        .items {
          display: flex;
          flex-flow: row wrap;
          padding: 1rem 1rem;
          .item {
            cursor: pointer;
            margin: 0.1rem 0.4rem;
            height: 1.4rem;
            line-height: 1.4rem;
            padding: 0 0.5rem;
            background-color: #d9d9d9;
            border-radius: 0.7rem 0.7rem;
            &.selected {
              background-color: #bbb;
            }
          }
        }
      }
    }
  }
}
</style>
