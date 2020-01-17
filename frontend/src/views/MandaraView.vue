<template>
  <div>
    <SideNav :my-goals-data="myGoals" ref="sideNav" />
    <div class="container min-width-768 pt-5">
      <div class="row justify-content-center" v-for="(row,_,rowIdx) in myGoals" :key="rowIdx">
        <div class="column" v-for="(myGoal,_,colIdx) in row" :key="colIdx">
          <div class="goal-wrapper">
            <transition name="animation">
              <b-button @click.prevent="showModal(rowIdx, colIdx)" v-if="isRootGoal(rowIdx, colIdx) || isMainGoal(rowIdx, colIdx) && isInputParentGoal(rowIdx, colIdx)" class="my-main-goal">
                <span class="goal-txt" v-text="myGoal['goal']" />
              </b-button>
              <b-button @click.prevent="showModal(rowIdx, colIdx)" v-else-if="!isMainGoal(rowIdx, colIdx) && isInputMainGoal(rowIdx, colIdx)" class="my-sub-goal">
                <span class="goal-txt" v-text="myGoal['goal']" />
              </b-button>
            </transition>
          </div>
        </div>
      </div>
      <b-modal
        :id="`input-goal-modal`"
        ref="modal"
        title="Submit Your Goal"
        @show="onShowModal"
        @hidden="onHideModal"
        @ok.prevent="handleOk"
        no-stacking
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            label="Goal"
            label-for="goal-input"
            invalid-feedback="Goal is required"
          >
            <b-form-input
              id="goal-input"
              v-model="goal"
              :state="nameState"
              required
            />
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';
import SideNav from '../components/SideNav.vue';

@Component({
  components: {
    SideNav,
  },
})
export default class MandaraView extends Vue {

  myGoals: object = {};

  private mandaraLevel: number = 2;

  private goal: string = '';

  private nameState: boolean | null = null;

  private clickedRowCol: object = {
    row: '',
    col: '',
  };

  // get
  // sumGoalBox(): number {
  //   return 9 ** this.mandaraLevel;
  // }

  get
  boxSideLength(): number {
    return 3 ** this.mandaraLevel;
  }

  created() {
    const storedMandaraPlanner: object | null = JSON.parse(localStorage.getItem('mandala_planner'));

    if (storedMandaraPlanner) {
      this.myGoals = storedMandaraPlanner;
      this.linkBetweenPairGoals(storedMandaraPlanner);
    } else {
      this.initMyGoals();
      this.linkBetweenPairGoals();
    }
  }

  private linkBetweenPairGoals(storedPlan: object): void {
    for (let row = 1; row <= this.boxSideLength; row += 1) {
      for (let col = 1; col <= this.boxSideLength; col += 1) {
        if (!storedPlan && this.isMainGoal(row - 1, col - 1) && !this.isRootGoal(row - 1, col - 1)) {
          const { mainGoalRowIdx, mainGoalColIdx } = this.getPairIdx(row - 1, col - 1);
          const goal = { goal: '' }
          this.myGoals[`row${row}`][`col${col}`] = goal;
          this.myGoals[`row${mainGoalRowIdx + 1}`][`col${mainGoalColIdx + 1}`] = goal;
        }

        if (storedPlan && this.isMainGoal(row - 1, col - 1) && !this.isRootGoal(row - 1, col - 1)) {
          const { mainGoalRowIdx, mainGoalColIdx } = this.getPairIdx(row - 1, col - 1);
          this.myGoals[`row${row}`][`col${col}`] = this.myGoals[`row${mainGoalRowIdx + 1}`][`col${mainGoalColIdx + 1}`];
        }
      }
    }
  }

  private initMyGoals(): void {
    for (let row = 1; row <= this.boxSideLength; row += 1) {
      this.myGoals[`row${row}`] = {};
      for (let col = 1; col <= this.boxSideLength; col += 1) {
        this.myGoals[`row${row}`][`col${col}`] = { goal: '' };
      }
    }
  }

  isRootGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx === Math.floor(this.boxSideLength / 2) && colIdx === Math.floor(this.boxSideLength / 2);
  }

  isMainGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx % 3 === 1 && colIdx % 3 === 1;
  }

  // 이 메서드가 발동될때는 메인골인 좌표일때
  isInputParentGoal(rowIdx: number, colIdx: number): boolean {
    if (this.mandaraLevel < 2) {
      return false;
    }

    const { mainGoalRowIdx, mainGoalColIdx } = this.getPairIdx(rowIdx, colIdx);

    if (this.myGoals[`row${mainGoalRowIdx + 1}`][`col${mainGoalColIdx + 1}`].goal.length > 0) {
      return true;
    }
    return false;
  }

  private getPairIdx(rowIdx: number, colIdx: number): object {
    const parentGoalRowIdx = 1 + (rowIdx - 1) / 3 ** (this.mandaraLevel - 1);
    const parentGoalColIdx = 1 + (colIdx - 1) / 3 ** (this.mandaraLevel - 1);

    let mainGoalRowIdx = Math.floor(this.boxSideLength / 2);
    let mainGoalColIdx = Math.floor(this.boxSideLength / 2);

    if (parentGoalRowIdx === 1) {
      mainGoalRowIdx -= 1;
    } else if (parentGoalRowIdx === 2) {

    } else if (parentGoalRowIdx === 3) {
      mainGoalRowIdx += 1;
    }

    if (parentGoalColIdx === 1) {
      mainGoalColIdx -= 1;
    } else if (parentGoalColIdx === 2) {

    } else if (parentGoalColIdx === 3) {
      mainGoalColIdx += 1;
    }
    return { mainGoalRowIdx, mainGoalColIdx };
  }

  isInputMainGoal(rowIdx: number, colIdx: number): boolean {
    let relativeRowIdx = rowIdx % 3 + 1;
    let relativeColIdx = colIdx % 3 + 1;

    if (relativeRowIdx === 1) {
      relativeRowIdx = rowIdx + 1;
    } else if (relativeRowIdx === 2) {
      relativeRowIdx = rowIdx;
    } else if (relativeRowIdx === 3) {
      relativeRowIdx = rowIdx - 1;
    }

    if (relativeColIdx === 1) {
      relativeColIdx = colIdx + 1;
    } else if (relativeColIdx === 2) {
      relativeColIdx = colIdx;
    } else if (relativeColIdx === 3) {
      relativeColIdx = colIdx - 1;
    }

    if (this.myGoals[`row${relativeRowIdx + 1}`][`col${relativeColIdx + 1}`].goal.length > 0) {
      return true;
    }
    return false;
  }

  showModal(rowKey: number, colKey: number): void {
    this.$bvModal.show('input-goal-modal');
    this.clickedRowCol.row = rowKey + 1;
    this.clickedRowCol.col = colKey + 1;
  }

  onShowModal(): void {
    this.resetModal();
  }

  onHideModal(): void {
    this.resetModal();
    this.clickedRowCol.row = '';
    this.clickedRowCol.col = '';
  }

  resetModal(): void {
    this.goal = '';
    this.nameState = null;
  }


  checkFormValidity(): boolean {
    const valid = this.$refs.form.checkValidity();
    this.nameState = valid;
    return valid;
  }

  handleOk(): void {
    this.handleSubmit();
  }

  handleSubmit(): void {
    if (!this.checkFormValidity()) {
      return;
    }

    this.myGoals[`row${this.clickedRowCol.row}`][`col${this.clickedRowCol.col}`].goal = this.goal;
    this.$refs.sideNav.autoSaveLocalStorage();

    this.$nextTick(() => {
      this.$refs.modal.hide();
    });
  }
}
</script>

<style lang="scss" scoped>
  @mixin my-goal() {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
    border: 1px solid #b4b4b3;
  }

  @mixin txt-len-limit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }

  .min-width-768 {
    min-width: 768px;
  }

  .column {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding: 0;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
  }

  .goal-wrapper {
    width: 55px;
    height: 55px;
  }

  .animation-enter-active, .animation-leave-active {
    transition: all .5s;
  }

  .animation-enter, .animation-leave-to {
    transform: scale(0.5);
    opacity: 0;
  }

  .my-main-goal {
    @include my-goal;
    background-color: #ffffff;
    color: #333333;
    &:focus, &:hover {
      background-color: #e5e5e5;
      color: #333333;
    }
  }

  .my-sub-goal {
    @include my-goal;
    background-color: #333333;
    color: #ffffff;
    &:focus, &:hover {
      background-color: #272727;
      color: #ffffff;
    }
  }

  .goal-txt {
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 14px;
    letter-spacing: -1px;
    @include txt-len-limit;
  }
</style>
