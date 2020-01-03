<template>
  <div class="mandara-box">
    <div class="container">
      <div class="row" v-for="(row, rowKey, rowIdx) in myGoals" :key="rowIdx">
        <div class="col-sm border p-0" v-for="(myGoal, colKey, colIdx) in row" :key="colIdx">
          <div class="goal-wrapper" :class="[isWriteMainGoal ? ['animation',] : ['',]]">
            <b-button @click.prevent="showModal(rowKey, colKey)" v-if="isOkShow && isMainGoal(rowIdx, colIdx)" class="my-main-goal"><span v-text="myGoal">
            </span>
            </b-button>
            <b-button @click.prevent="showModal(rowKey, colKey)" v-else-if="isWriteMainGoal" class="my-sub-goal"><span v-text="myGoal">
            </span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      :id="`input-modal-${mandaraIdx}`"
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

  private isOkShow: boolean = false;

  myGoals: object = {
    row1: {
      col1: '',
      col2: '',
      col3: '',
    },
    row2: {
      col1: '',
      col2: '',
      col3: '',
    },
    row3: {
      col1: '',
      col2: '',
      col3: '',
    },
  };

  private clickedRowCol: object = {
    row: '',
    col: '',
  };

  private isWriteMainGoal: boolean = false;

  private goal: string = '';

  private nameState: boolean | null = null;

  created() {
    this.isOkShow = this.mandaraIdx === 5;
  }

  destroyed() {
  }

  clickedMainGoal(): void {

  }

  clickedSubGoal(): void {

  }

  showModal(rowKey: string, colKey: string): void {
    this.$bvModal.show(`input-modal-${this.mandaraIdx}`);
    this.clickedRowCol.row = rowKey;
    this.clickedRowCol.col = colKey;
  }

  isMainGoal(rowIdx: number, colIdx: number): boolean {
    return rowIdx === 1 && colIdx === 1;
  }

  get
  isBranchBox(): boolean {
    return this.mandaraIdx === 5;
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
    if (this.clickedRowCol.row === 'row2' && this.clickedRowCol.col === 'col2') {
      this.existRootGoal();
    } else {
    }

    // TODO : 만약 제출한게 mainGoal이면 isWriteMainGoal=true

    this.$nextTick(() => {
      this.$refs.modal.hide();
    });
  }
}
</script>

<style lang="scss" scoped>
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

  .my-main-goal,
  .my-sub-goal {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
  }
</style>
