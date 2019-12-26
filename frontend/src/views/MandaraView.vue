<template>
  <div class="mandara">
    <div class="container">
      <div class="row">
        <div class="col-sm border">
          One of three columns
        </div>
        <div class="col-sm border">
          One of three columns
        </div>
        <div class="col-sm border">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm border">
          One of three columns
        </div>
        <div class="col-sm border">
          One of three columns
        </div>
        <div class="col-sm border">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm border">
          One of three columns
        </div>
        <div class="col-sm border">
          One of three columns
        </div>
        <div class="col-sm border">
          One of three columns
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';

@Component
export default class MandaraView extends Vue {
}
</script>

<style lang="scss" scoped>
  .mandara {
  }

  .border {
    border: 1px solid #333333;
  }
</style>
