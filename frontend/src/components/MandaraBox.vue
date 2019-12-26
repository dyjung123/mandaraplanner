<template>
  <div class="mandara-box">
    <div class="container">
<!--      <div class="row" v-for="(row,key,index) in myGoals.row1" :key="index">-->
      <div class="row" v-for="(value,index) in test" :key="index">
        <div class="col-sm border">
          {{ value }}
        </div>
      </div>
<!--        <div class="col-sm border p-0" v-for="(myGoal,k) in row" :key="k">-->
<!--          <div class="goal-wrapper">-->
<!--            <button @click.prevent="modifyGoal(key,k)" class="my-goal">-->
<!--              <span v-text="myGoal">-->
<!--              </span>-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <input type="text" v-model="index" placeholder="index">
    <input type="text" v-model="value" placeholder="value">
    <button @click.prevent="modifyGoal"></button>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';

@Component
export default class MandaraBox extends Vue {
  myGoals: object = {
    row1: [1, 2, 3],
    row2: [4, 5, 6],
    row3: [7, 8, 9],
  };

  test: Array<number> = [1, 2, 3];

  index: number = 0;

  value: number = 0;

  modifyGoal(): void {
    this.test[this.index] = this.value;
    // console.log(`row : ${rowIdx}, col : ${colIdx}`);
  }
}
</script>

<style lang="scss" scoped>
  .goal-wrapper {
    width: 50px;
    height: 50px;
  }

  .my-goal {
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    padding: 0;
  }
</style>
