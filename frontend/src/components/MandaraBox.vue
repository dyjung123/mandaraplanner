<template>
  <div class="mandara-box">
    <div class="container">
      <div class="row" v-for="(row,_,rowIdx) in myGoals" :key="rowIdx">
        <div class="col-sm border p-0" v-for="(myGoal,colIdx) in row" :key="colIdx">
          <div class="goal-wrapper">
            <button v-if="isBranchBox || isMainGoal(rowIdx, colIdx)" @click.prevent="modifyGoal" class="my-goal" :class="[isWriteMainGoal ? ['animation',] : ['',]]">
              <span v-text="myGoal">
              </span>
            </button>
            <div v-else class="sub-goal">
              <span class="sub-goal-txt" v-text="myGoal">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class MandaraBox extends Vue {
  @Prop({ default: -1 })
  readonly mandaraIdx!: number;

  myGoals: object = {
    row1: [1, 2, 3],
    row2: [4, 5, 6],
    row3: [7, 8, 9],
  };

  test: Array<number> = [1, 2, 3];

  index: number = 0;

  value: number = 0;

  isWriteMainGoal: boolean = false;

  created() {
    console.log('mandaraIdx', this.mandaraIdx);
  }

  modifyGoal(): void {
    this.isWriteMainGoal = !this.isWriteMainGoal;
    // console.log(`row : ${rowIdx}, col : ${colIdx}`);
  }

  isMainGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx === 1 && colIdx === 1;
  }

  get
  isBranchBox(): boolean {
    return this.mandaraIdx === 5;
  }
}
</script>

<style lang="scss" scoped>
  .goal-wrapper {
    width: 50px;
    height: 50px;
    animation: rrotate_ani linear 1s infinite both;
    -webkit-animation: rrotate_ani linear 1s infinite both;
  }

  @keyframes rrotate_ani {
    0% {
      transform: rotateY(0);
    }

    100% {
      transform: rotateY(360deg);
    }
  }

  .my-goal {
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    padding: 0;
  }
</style>
