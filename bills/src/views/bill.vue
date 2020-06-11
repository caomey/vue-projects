<template>
  <div class="bill">
    <section>
      <div class="types">
        <ul>
          <li :class="{ selected: types === '-' }" @click="selectType('-')">
            支出
          </li>
          <li :class="{ selected: types === '+' }" @click="selectType('+')">
            收入
          </li>
        </ul>
      </div>
      <div class="bills">
        <div
          class="billitem"
          v-for="(bill, date) in filteredBills"
          :key="bill.index"
        >
          <div class="title">
            <div class="date">{{ date }}</div>
            <div class="sum">{{ dayAmount(date) }}￥</div>
          </div>
          <div class="onedayitems" @click="removeBills">
            <div class="item" v-for="item in bill" :key="item.index">
              <div class="content">
                <div class="tag">{{ item.tags }}</div>
                <div class="notes">{{ item.notes }}</div>
              </div>
              <div class="amount">
                <span>{{ types }}{{ item.amount }}￥</span>
                <a class="icon" @click="removeBills(item.id)"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Nav,
  },
  data() {
    return {};
  },
  methods: {
    selectType(a) {
      if (a === "-") {
        this.types = "-";
        console.log("支出");
      } else {
        this.types = "+";
        console.log("收入");
      }
    },
    ...mapMutations(["removeBills", "initBills"]),
    dayAmount(date) {
      console.log(111, JSON.stringify(this.bills, null, 2));
      let targetbill = this.bills.filter(
        (bills) => bills.date + "" === date && bills.types == this.types
      );
      console.log(666, JSON.stringify(targetbill, null, 2));
      let sum = targetbill.reduce((x, y) => {
        return x + y.amount;
      }, 0);
      return sum;
    },
    removeBills(id) {
      this.bills = this.bills.filter((bills) => bills.id !== id);
      this.$store.commit("saveBills");
      this.initBills();
    },
  },
  computed: {
    types: {
      set(val) {
        this.$store.state.types = val;
      },
      get() {
        return this.$store.state.types;
      },
    },
    bills: {
      set(val) {
        this.$store.state.bills = val;
      },
      get() {
        return this.$store.state.bills;
      },
    },
    filteredBills: {
      get() {
        let a = this.bills
          .filter((bills) => bills.types == this.types)
          .reduce((dateItems, bills) => {
            dateItems[bills.date] = dateItems[bills.date] || [];
            dateItems[bills.date].push({
              tags: bills.tags,
              amount: bills.amount,
              notes: bills.notes,
              id: bills.id,
            });
            return dateItems;
          }, {});
        console.log("filteredBills:", JSON.stringify(a, null, 2));
        return a;
      },
    },
  },
  watch: {},
  created() {
    this.initBills(); //初始化账单
  },
};
</script>

<style lang="less">
.bill {
  display: flex;
  flex-flow: column;
  height: 100vh;
  section {
    flex: 1;
    .types ul {
      height: 4rem;
      display: flex;
      flex-direction: row;
      margin-bottom: 1rem;
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
    .bills {
      display: flex;
      flex-flow: column;
      .billitem {
        .title {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          height: 2rem;
          line-height: 2rem;
          padding: 0 1rem;
          font-size: 1.3rem;
          border-bottom: 2px solid #ddd;
        }
        .onedayitems {
          display: flex;
          flex-flow: column;
          .item {
            display: flex;
            flex-flow: row;
            min-height: 2rem;
            padding: 0 1rem;
            align-items: center;
            .content {
              display: flex;
              flex-direction: row;
              align-items: center;
              flex: 1;
              .tag {
                padding-right: 0.5rem;
                word-break: keep-all; // 文字在一行显示
                color: black;
                font-weight: 700;
              }
              .notes {
                font-size: 0.5rem;
              }
            }
          }
          .amount {
            color: black;
            font-size: 1.2rem;
            .icon::after {
              content: "\e690";
              font-family: "iconfont";
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
