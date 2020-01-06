<template>
    <div class="nav">
      <div class="nav__item-wrap">
        <div class="nav__title-wrap">
          <button @click.prevent="" class="nav__title-btn">
            <h3 class="nav__title-txt">제목</h3>
          </button>
        </div>
        <div class="nav__content-wrap">
          <ul class="nav__list-wrap">
            <li>로컬스토리지에서 삭제</li>
            <li>2.test</li>
            <li>3.test</li>
            <li>4.test</li>
          </ul>
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
export default class SideNav extends Vue {
}
</script>

<style lang="scss" scoped>
  .nav {
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100vh;
    border-right: 1px solid #b6b6b6;
    text-align: left;
    font-weight: 400;
    padding: 30px 20px;
    background-color: #fff;
  }

  .nav__item-wrap {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
  }

  .nav__title-btn {
    background-color: transparent;
    text-align: left;
    border: 0;
    margin: 0;
    padding: 0;
  }

  .nav__title-txt {
    margin: 0;
    padding: 0;
  }

  .nav__content-wrap {
    margin-top: 5px;
    overflow: hidden;
  }

  .nav__list-wrap {
    margin: 0 0 0 10px;
    padding: 0;
    list-style: none;
  }
</style>
