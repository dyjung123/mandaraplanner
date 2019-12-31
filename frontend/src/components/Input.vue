<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
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
} from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  private name: string = '';

  private nameState: string | null = null;

  private submittedNames: Array<string> = [];

  checkFormValidity(): string | null {
    const valid = this.$refs.form.checkValidity();
    this.nameState = valid ? 'valid' : 'invalid';
    return valid;
  }

  resetModal(): void {
    this.name = '';
    this.nameState = null;
  }

  handleOk(bvModalEvt): void {
    bvModalEvt.preventDefault();
    this.handleSubmit();
  }

  handleSubmit(): void {
    if (!this.checkFormValidity()) {
      return;
    }

    this.submittedNames.push(this.name);

    this.$nextTick(() => {
      this.$refs.modal.hide();
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
