<template>
  <div class="numberpad">
    <div class="shownum">
      {{ amount }}
    </div>
    <div class="buttons">
      <button class="num" @click="inputContent">1</button>
      <button class="num" @click="inputContent">2</button>
      <button class="num" @click="inputContent">3</button>
      <button class="del" @click="del">Del</button>
      <button class="num" @click="inputContent">4</button>
      <button class="num" @click="inputContent">5</button>
      <button class="num" @click="inputContent">6</button>
      <button class="clear" @click="clear">Clear</button>
      <button class="num" @click="inputContent">7</button>
      <button class="num" @click="inputContent">8</button>
      <button class="num" @click="inputContent">9</button>
      <button class="ok" @click="submit">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button class="num" @click="inputContent">.</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      amount: "0",
    };
  },
  methods: {
    ...mapMutations(["addBills"]),
    inputContent(e) {
      let content = e.target.innerText;
      if (this.amount === "0" && content !== ".") {
        this.amount = content;
      } else if (this.amount.length < 16) {
        this.amount += content;
      }
    },
    clear() {
      this.amount = "0";
    },
    del() {
      let s = this.amount;
      if (s.length === 1) {
        this.amount = "0";
      } else {
        this.amount = s.substring(0, s.length - 1);
      }
    },
    submit() {
      this.$store.state.currentAmount = parseInt(this.amount);
      let obj = {
        date: JSON.stringify(new Date()).slice(1, 11),
        tags: this.selectedTags,
        notes: this.notes,
        amount: this.$store.state.currentAmount,
        types: this.types,
        id: this.createId(),
      };
      this.notes = "";
      this.amount = "0";
      this.addBills(obj);
    },
    createId() {
      let id = parseInt(localStorage.getItem("billId") || "0") || 0;
      id++;
      localStorage.setItem("billId", id.toString());
      return id;
    },
  },
  computed: {
    ...mapState(["bills", "notes", "selectedTags", "types"]),
    notes: {
      get() {
        return this.$store.state.notes;
      },
      set(val) {
        this.$store.state.notes = val;
      },
    },
  },
};
</script>
<style lang="less">
.numberpad {
  .shownum {
    height: 4rem;
    text-align: right;
    line-height: 4rem;
    padding-right: 1rem;
    font-size: 2.5rem;
    color: black;
    font-family: monospace;
  }
  @bg: #f2f2f2;
  .buttons {
    // border: 1px solid green;
    height: 16rem;
    width: 100%;
    float: left;
    .num {
      height: 4rem;
      width: 25%;
    }
    .zero {
      height: 4rem;
      width: 50%;
    }
    .ok {
      float: right;
      height: 8rem;
      width: 25%;
    }
    .clear,
    .del {
      height: 4rem;
      width: 25%;
    }
    button {
      font-size: 1.5rem;
      @bg: #f2f2f2;
      &:nth-child(1) {
        background: @bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken(@bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken(@bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken(@bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken(@bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken(@bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken(@bg, 4 * 6%);
      }
    }
  }
}
</style>
