<template>
  <div class="header">
    <div class="header__title-wrapper">
      <h1 class="m-0">Mandala Planner</h1>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
  .header {
    color: #333333;
    width: 100%;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #b6b6b6;
  }

  .header__title-wrapper {
    padding: 3rem 0 3rem;
    margin: 0 auto;
  }
</style>
