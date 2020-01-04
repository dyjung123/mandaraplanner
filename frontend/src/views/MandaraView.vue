<template>
  <div class="mandara">
    <div class="container">
      <div class="row" v-for="(row,rowKey,rowIdx) in myGoals" :key="rowIdx">
        <div class="column border p-0" v-for="(myGoal,colKey,colIdx) in row" :key="colIdx">
          <div class="goal-wrapper" :class="[false ? ['animation',] : ['',]]">
            <b-button @click.prevent="showModal(rowKey, colKey)" v-if="isRootGoal(rowIdx, colIdx) || isMainGoal(rowIdx, colIdx) && isInputParentGoal(rowIdx, colIdx)" class="my-main-goal">
              <span v-text="myGoal" />
            </b-button>
            <b-button @click.prevent="showModal(rowKey, colKey)" v-else-if="!isMainGoal(rowIdx, colIdx) && isInputMainGoal(rowIdx, colIdx)" class="my-sub-goal">
              <span v-text="myGoal" />
            </b-button>
          </div>
<!--        <MandaraBox v-for="(col) in row" :key="col" :mandaraIdx="col"/>-->
<!--        <div class="mandara-box">-->
<!--          <div class="container">-->
<!--            <div class="row" v-for="(row, rowKey, rowIdx) in myGoals" :key="rowIdx">-->
<!--              <div class="col-sm border p-0" v-for="(myGoal, colKey, colIdx) in row" :key="colIdx">-->
<!--                <div class="goal-wrapper" :class="[isWriteMainGoal ? ['animation',] : ['',]]">-->
<!--                  <b-button @click.prevent="showModal(rowKey, colKey)" v-if="isOkShow && isMainGoal(rowIdx, colIdx)" class="my-main-goal"><span v-text="myGoal">-->
<!--            </span>-->
<!--                  </b-button>-->
<!--                  <b-button @click.prevent="showModal(rowKey, colKey)" v-else-if="isWriteMainGoal" class="my-sub-goal"><span v-text="myGoal">-->
<!--            </span>-->
<!--                  </b-button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <b-modal-->
<!--            :id="`input-modal-${mandaraIdx}`"-->
<!--            ref="modal"-->
<!--            title="Submit Your Goal"-->
<!--            @show="onShowModal"-->
<!--            @hidden="onHideModal"-->
<!--            @ok.prevent="handleOk"-->
<!--            no-stacking-->
<!--          >-->
<!--            &lt;!&ndash;      <form ref="form" @submit.stop.prevent="handleSubmit">&ndash;&gt;-->
<!--            <form ref="form">-->
<!--              <b-form-group-->
<!--                :state="nameState"-->
<!--                label="Goal"-->
<!--                label-for="goal-input"-->
<!--                invalid-feedback="Goal is required"-->
<!--              >-->
<!--                <b-form-input-->
<!--                  id="goal-input"-->
<!--                  v-model="goal"-->
<!--                  :state="nameState"-->
<!--                  required-->
<!--                ></b-form-input>-->
<!--              </b-form-group>-->
<!--            </form>-->
<!--          </b-modal>-->
        </div>
        <!-- branch box인가 아닌가를 MandaraBox -->
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
        <!--      <form ref="form" @submit.stop.prevent="handleSubmit">-->
        <form ref="form">
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
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
<!--    <Input />-->
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';
import MandaraBox from '../components/MandaraBox.vue';
import Input from '../components/Input.vue';

@Component({
  components: {
    MandaraBox,
    Input,
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

  created() {
    for (let i = 1; i <= this.boxSideLength; i += 1) {
      this.myGoals[`row${i}`] = {};
      for (let j = 1; j <= this.boxSideLength; j += 1) {
        this.myGoals[`row${i}`][`col${j}`] = '';
      }
    }
    console.log('created', this.myGoals);
  }

  get
  sumGoalBox(): number {
    return 9 ** this.mandaraLevel;
  }

  get
  boxSideLength(): number {
    return 3 ** this.mandaraLevel;
  }

  isRootGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx === Math.floor(this.boxSideLength / 2) && colIdx === Math.floor(this.boxSideLength / 2);
  }

  isMainGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx % 3 === 1 && colIdx % 3 === 1;
  }

  isInputParentGoal(rowIdx: number, colIdx: number): boolean {
    // 이거 발동될때는 메인골인 좌표일때
    // TODO : mainGoal의 부모가 되는 subView가 입력 되었는가를 판단하여 true,false 반환
    if (this.mandaraLevel < 2) {
      return false;
    }
    /*
    let distance = 1 + (3**(this.mandaraLevel-1))*(i-1) = 1or4or7
    ((rowIdx - 1)/3**(this.mandaraLevel-1)) + 1 = i
     */

    const parentGoalRowIdx = 1 + (rowIdx - 1)/3**(this.mandaraLevel - 1);
    const parentGoalColIdx = 1 + (colIdx - 1)/3**(this.mandaraLevel - 1);

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

    if (this.myGoals[`row${mainGoalRowIdx + 1}`][`col${mainGoalColIdx + 1}`].length > 0) {
      return true;
    }
    return false;

    /*
    this.myGoals[][]
    1,1 -> 3,3
    1,4 -> 3,4
    1,7 -> 3,5
    4,1 -> 4,3
    4,7 -> 4,5
    7,1 -> 5,3
    7,4 -> 5,4
    7,7 -> 5,5
    */
  }

  isInputMainGoal(rowIdx: number, colIdx: number): boolean {
    let relativeRowIdx = rowIdx % 3 + 1;
    let relativeColIdx = colIdx % 3 + 1;

    // console.log(`rowIdx : ${relativeRowIdx},  colIdx : ${relativeColIdx}`);

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

    if (this.myGoals[`row${relativeRowIdx + 1}`][`col${relativeColIdx + 1}`].length > 0) {
      return true;
    }
    return false;
  }

  showModal(rowKey: string, colKey: string): void {
    this.$bvModal.show('input-goal-modal');
    this.clickedRowCol.row = rowKey;
    this.clickedRowCol.col = colKey;
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

    this.myGoals[`${this.clickedRowCol.row}`][`${this.clickedRowCol.col}`] = this.goal;
    // this.isWriteMainGoal = true;
    // if (this.clickedRowCol.row === 'row2' && this.clickedRowCol.col === 'col2') {
    //   this.existRootGoal();
    // } else {
    //
    // }

    // TODO : 만약 제출한게 mainGoal이면 isWriteMainGoal=true

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
  }

  .border {
    border: 1px solid #333333;
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
    width: 50px;
    height: 50px;
  }

  .animation {
    animation: rrotate_ani linear 1s both;
    -webkit-animation: rrotate_ani linear 1s both;
  }

  @keyframes rrotate_ani {
    0% {
      transform: rotateY(0);
    }

    100% {
      transform: rotateY(360deg);
    }
  }

  .my-main-goal {
    @include my-goal;
    background-color: red;
  }

  .my-sub-goal {
    @include my-goal;
  }
</style>
