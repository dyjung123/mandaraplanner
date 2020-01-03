<template>
  <div class="mandara">
    <div class="container">
      <div class="row" v-for="(row,rowKey,rowIdx) in myGoals" :key="rowIdx">
        <div class="column border p-0" v-for="(myGoal,colKey,colIdx) in row" :key="colIdx">
          <div class="goal-wrapper" :class="[false ? ['animation',] : ['',]]">
            <b-button @click.prevent="showModal(rowKey, colKey)" v-if="isRootGoal(rowIdx, colIdx) || isMainGoal(rowIdx, colIdx) && isInputParentGoal(rowIdx, colIdx)" class="my-main-goal">
              <span v-text="myGoal">
              </span>
            </b-button>
            <b-button @click.prevent="showModal(rowKey, colKey)" v-else class="my-sub-goal"><span v-text="myGoal">
            </span>
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

  showModal(rowKey: string, colKey: string): void {
    this.$bvModal.show('input-goal-modal');
    this.clickedRowCol.row = rowKey;
    this.clickedRowCol.col = colKey;
  }

  isRootGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx === Math.floor(this.boxSideLength / 2) && colIdx === Math.floor(this.boxSideLength / 2);
  }

  isMainGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx % 3 === 1 && colIdx % 3 === 1;
  }

  isInputParentGoal(rowIdx: number, colIdx: number): boolean {
    // TODO : mainGoal의 부모가 되는 subView가 입력 되었는가를 판단하여 true,false 반환
  }

  checkFormValidity(): boolean {
    const valid = this.$refs.form.checkValidity();
    this.nameState = valid;
    return valid;
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
