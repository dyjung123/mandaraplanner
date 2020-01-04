<!--<template>-->
<!--  <div class="mandara-box">-->
<!--    <div class="container">-->
<!--      <div class="row" v-for="(row, rowKey, rowIdx) in myGoals" :key="rowIdx">-->
<!--        <div class="col-sm border p-0" v-for="(myGoal, colKey, colIdx) in row" :key="colIdx">-->
<!--          <div class="goal-wrapper" :class="[isWriteRootGoal ? ['animation',] : ['',]]">-->
<!--&lt;!&ndash;            <button v-if="isBranchBox || isMainGoal(rowIdx, colIdx)" @click.prevent="modifyGoal" class="my-goal">&ndash;&gt;-->
<!--&lt;!&ndash;              <span v-text="myGoal">&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--&lt;!&ndash;            </button>&ndash;&gt;-->
<!--&lt;!&ndash;            <div v-else class="sub-goal">&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="sub-goal-txt" v-text="myGoal">&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--            <b-button @click.prevent="showModal(rowKey, colKey)" v-if="isBranchBox && isMainGoal(rowIdx, colIdx) || isWriteRootGoal && isBranchBox" class="my-goal">-->
<!--              <span v-text="myGoal">-->
<!--              </span>-->
<!--            </b-button>-->
<!--            <b-button v-b-modal.modal-prevent-closing v-else class="sub-goal">-->
<!--              <span class="sub-goal-txt" v-text="myGoal">-->
<!--              </span>-->
<!--            </b-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <b-modal-->
<!--      :id="`input-modal-${mandaraIdx}`"-->
<!--      ref="modal"-->
<!--      title="Submit Your Goal"-->
<!--      @show="onShowModal"-->
<!--      @hidden="onHideModal"-->
<!--      @ok.prevent="handleOk"-->
<!--      no-stacking-->
<!--    >-->
<!--&lt;!&ndash;      <form ref="form" @submit.stop.prevent="handleSubmit">&ndash;&gt;-->
<!--      <form ref="form">-->
<!--        <b-form-group-->
<!--          :state="nameState"-->
<!--          label="Goal"-->
<!--          label-for="goal-input"-->
<!--          invalid-feedback="Goal is required"-->
<!--        >-->
<!--          <b-form-input-->
<!--            id="goal-input"-->
<!--            v-model="goal"-->
<!--            :state="nameState"-->
<!--            required-->
<!--          ></b-form-input>-->
<!--        </b-form-group>-->
<!--      </form>-->
<!--    </b-modal>-->
<!--&lt;!&ndash;    <Input />&ndash;&gt;-->
<!--&lt;!&ndash;    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>&ndash;&gt;-->

<!--&lt;!&ndash;    <b-modal&ndash;&gt;-->
<!--&lt;!&ndash;      id="modal-prevent-closing"&ndash;&gt;-->
<!--&lt;!&ndash;      ref="modal"&ndash;&gt;-->
<!--&lt;!&ndash;      title="Submit Your Name"&ndash;&gt;-->
<!--&lt;!&ndash;      @show="resetModal"&ndash;&gt;-->
<!--&lt;!&ndash;      @hidden="resetModal"&ndash;&gt;-->
<!--&lt;!&ndash;      @ok.prevent="handleOk"&ndash;&gt;-->
<!--&lt;!&ndash;    >&ndash;&gt;-->
<!--&lt;!&ndash;      <form ref="form" @submit.stop.prevent="handleSubmit">&ndash;&gt;-->
<!--&lt;!&ndash;        <b-form-group&ndash;&gt;-->
<!--&lt;!&ndash;          :state="nameState"&ndash;&gt;-->
<!--&lt;!&ndash;          label="Name"&ndash;&gt;-->
<!--&lt;!&ndash;          label-for="name-input"&ndash;&gt;-->
<!--&lt;!&ndash;          invalid-feedback="Name is required"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <b-form-input&ndash;&gt;-->
<!--&lt;!&ndash;            id="name-input"&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="name"&ndash;&gt;-->
<!--&lt;!&ndash;            :state="nameState"&ndash;&gt;-->
<!--&lt;!&ndash;            required&ndash;&gt;-->
<!--&lt;!&ndash;          ></b-form-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </b-form-group>&ndash;&gt;-->
<!--&lt;!&ndash;      </form>&ndash;&gt;-->
<!--&lt;!&ndash;    </b-modal>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {-->
<!--  Vue,-->
<!--  Component,-->
<!--  Prop,-->
<!--} from 'vue-property-decorator';-->
<!--import { mapActions, mapState } from 'vuex';-->
<!--import Input from './Input.vue';-->

<!--@Component({-->
<!--  components: {-->
<!--    Input,-->
<!--  },-->
<!--  methods: {-->
<!--    ...mapActions([-->
<!--      'noRootGoal',-->
<!--      'existRootGoal',-->
<!--    ]),-->
<!--  },-->
<!--  computed: mapState([-->
<!--    'isWriteRootGoal',-->
<!--  ]),-->
<!--})-->
<!--export default class MandaraBoxFail extends Vue {-->
<!--  @Prop({ default: -1 })-->
<!--  readonly mandaraIdx!: number;-->

<!--  myGoals: object = {-->
<!--    row1: {-->
<!--      col1: '',-->
<!--      col2: '',-->
<!--      col3: '',-->
<!--    },-->
<!--    row2: {-->
<!--      col1: '',-->
<!--      col2: '',-->
<!--      col3: '',-->
<!--    },-->
<!--    row3: {-->
<!--      col1: '',-->
<!--      col2: '',-->
<!--      col3: '',-->
<!--    },-->
<!--  };-->

<!--  private goal: string = '';-->

<!--  private nameState: boolean | null = null;-->

<!--  private clickedRowCol: object = {-->
<!--    row: '',-->
<!--    col: '',-->
<!--  };-->

<!--  private isWriteMainGoal: boolean = false;-->

<!--  private isWriteSubGoal: boolean = false;-->

<!--  created() {-->
<!--    console.log('mandaraIdx', this.mandaraIdx);-->
<!--  }-->

<!--  modifyGoal(): void {-->
<!--    // this.isWriteMainGoal = !this.isWriteMainGoal;-->
<!--    // console.log(`row : ${rowIdx}, col : ${colIdx}`);-->
<!--  }-->

<!--  showModal(rowKey: string, colKey: string): void {-->
<!--    this.$bvModal.show(`input-modal-${this.mandaraIdx}`);-->
<!--    this.clickedRowCol.row = rowKey;-->
<!--    this.clickedRowCol.col = colKey;-->
<!--  }-->

<!--  isMainGoal(rowIdx: number, colIdx: number): boolean {-->
<!--    return rowIdx === 1 && colIdx === 1;-->
<!--  }-->

<!--  get-->
<!--  isBranchBox(): boolean {-->
<!--    return this.mandaraIdx === 5;-->
<!--  }-->

<!--  checkFormValidity(): boolean {-->
<!--    const valid = this.$refs.form.checkValidity();-->
<!--    this.nameState = valid;-->
<!--    return valid;-->
<!--  }-->

<!--  onShowModal(): void {-->
<!--    this.resetModal();-->
<!--  }-->

<!--  onHideModal(): void {-->
<!--    this.resetModal();-->
<!--    this.clickedRowCol.row = '';-->
<!--    this.clickedRowCol.col = '';-->
<!--  }-->

<!--  resetModal(): void {-->
<!--    this.goal = '';-->
<!--    this.nameState = null;-->
<!--  }-->

<!--  handleOk(): void {-->
<!--    this.handleSubmit();-->
<!--  }-->

<!--  handleSubmit(): void {-->
<!--    if (!this.checkFormValidity()) {-->
<!--      return;-->
<!--    }-->

<!--    this.myGoals[`${this.clickedRowCol.row}`][`${this.clickedRowCol.col}`] = this.goal;-->
<!--    // this.isWriteMainGoal = true;-->
<!--    if (this.clickedRowCol.row === 'row2' && this.clickedRowCol.col === 'col2') {-->
<!--      this.existRootGoal();-->
<!--    }-->

<!--    this.$nextTick(() => {-->
<!--      this.$refs.modal.hide();-->
<!--    });-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--  .goal-wrapper {-->
<!--    width: 50px;-->
<!--    height: 50px;-->
<!--  }-->

<!--  .animation {-->
<!--    animation: rrotate_ani linear 1s both;-->
<!--    -webkit-animation: rrotate_ani linear 1s both;-->
<!--  }-->

<!--  @keyframes rrotate_ani {-->
<!--    0% {-->
<!--      transform: rotateY(0);-->
<!--    }-->

<!--    100% {-->
<!--      transform: rotateY(360deg);-->
<!--    }-->
<!--  }-->

<!--  .my-goal {-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    box-sizing: border-box;-->
<!--    padding: 0;-->
<!--  }-->
<!--</style>-->
