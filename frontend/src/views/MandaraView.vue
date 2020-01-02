<template>
  <div class="mandara">
    <div class="container">
      <div class="row" v-for="(row,rowKey) in mandaraMatrix" :key="rowKey">
        <MandaraBox v-for="(col) in row" :key="col" :mandaraIdx="col"/>
      </div>
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
  mandaraMatrix: Array<Array<number>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
}
</script>

<style lang="scss" scoped>
  .mandara {
  }

  .border {
    border: 1px solid #333333;
  }
</style>
