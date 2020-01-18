<template>
  <div class="nav">
    <transition name="fold-nav" mode="out-in" key="on">
      <div class="nav__wrap--on" v-if="isOnSideNav">
        <div class="nav__item-wrap">
          <span class="nav__icon-row--rev">
            <span class="nav__icon-wrap" @click.prevent="isOnSideNav = false">
              <img class="nav__icon" src="../assets/close.svg" alt="close">
            </span>
          </span>
          <ul class="list-unstyled m-0 p-0" v-for="(subCatList,priCat,priCatIdx) in categoryInfo" :key="priCatIdx">
            <li class="m-0 p-0 position-relative">
              <div class="border-bottom">
                <button class="nav__pri-cat" @click.prevent="subCatList['isOn'] = !subCatList['isOn']">
                  <span class="nav__pri-cat-txt" v-text="priCat" />
                </button>
              </div>
              <div class="overflow-hidden">
                <transition name="list-ani">
                  <div v-if="subCatList['isOn']" class="pb-2">
                    <ul class="list-unstyled m-0 p-0">
                      <li class="nav__sub-cat-li" v-for="(subCat,subCatIdx) in subCatList['subCategory']" :key="subCatIdx">
                        <a class="nav__sub-cat-wrap" tabindex="0" @click.prevent="clickedSubCat(subCat, subCatList['primaryCat'])">
                          <span class="nav__sub-cat-txt" v-text="subCat" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="nav__wrap--off" v-else key="off">
        <span class="nav__icon-row" @click.prevent="isOnSideNav = true">
          <span class="nav__icon-wrap">
            <img class="nav__icon" src="../assets/cheveron-right.svg" alt="cheveron_right_icon">
          </span>
          <span class="nav__icon-wrap">
            <img class="nav__icon" src="../assets/menu.svg" alt="menu_icon">
          </span>
        </span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class SideNav extends Vue {
  @Prop(Object)
  readonly myGoalsData!: object;

  private isOnLocalStorage: boolean = true;

  private categoryInfo: object = {
    로컬스토리지: {
      primaryCat: '로컬스토리지',
      subCategory: ['비우기', '저장하기', '끄기', '사용하기'],
      isOn: false,
    },
    기능2: {
      primaryCat: '기능2',
      subCategory: ['서브1', '서브2', '서브3', '서브4'],
      isOn: false,
    },
  };

  private isOnSideNav: boolean = false;

  clickedSubCat(clickedSubCat: string, clickedPriCat: string): void {
    if (clickedPriCat === '로컬스토리지') {
      if (clickedSubCat === '비우기') {
        localStorage.clear();
      } else if (clickedSubCat === '저장하기') {
        this.saveLocalStorage(this.myGoalsData);
      } else if (clickedSubCat === '끄기') {
        this.isOnLocalStorage = false;
        console.log(this.isOnLocalStorage);
      } else if (clickedSubCat === '사용하기') {
        this.isOnLocalStorage = true;
        console.log(this.isOnLocalStorage);
      }
    } else if (clickedPriCat === '기능2') {
      console.log('기능2');
    }
  }

  saveLocalStorage(data: object): void {
    localStorage.setItem('mandala_planner', JSON.stringify(data));
  }

  autoSaveLocalStorage(isOnLocalStorage: boolean, data: object): void {
    if (isOnLocalStorage === undefined || data === undefined) {
      if (this.isOnLocalStorage) {
        this.saveLocalStorage(this.myGoalsData);
      }
    } else if (isOnLocalStorage) {
      this.saveLocalStorage(data);
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin focus_category {
    border-color: #0070c9;
    outline: none;
    box-shadow: 0 0 0 .25rem rgba(131,192,253,.5);
  }

  @mixin nav_wrap {
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
  }

  .nav__wrap--on {
    @include nav_wrap;
    width: 200px;
    height: 100vh;
    border-right: 1px solid #b6b6b6;
    text-align: left;
    font-weight: 400;
    padding: 30px 20px;
    background-color: #fff;
  }

  .nav__wrap--off {
    @include nav_wrap;
    width: 100px;
  }

  /* fold side nav animation */
  .fold-nav-enter-active, .fold-nav-leave-active {
    transition: all .2s;
  }

  .fold-nav-enter, .fold-nav-leave-to {
    transform: translateX(-100%);
  }

  .nav__item-wrap {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }

  .nav__icon-row {
    display: flex;
    flex-direction: row;
    margin: 20px 0 20px 15px;
  }

  .nav__icon-row--rev {
    display: flex;
    flex-direction: row-reverse;
    margin: 7px 0;
  }

  .nav__icon-wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    line-height: .5;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .nav__pri-cat {
    display: block;
    width: 100%;
    text-align: left;
    margin: 0;
    padding: 0;
    box-sizing: content-box;
    border: 0;
    background-color: transparent;
    &:focus {
      @include focus_category;
    }
  }

  .nav__pri-cat-txt {
    letter-spacing: 0;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.5;
    vertical-align: middle;
  }

  .nav__sub-cat-li {
    margin: 3px 0;
    padding: 2px 8px;
  }

  .nav__sub-cat-wrap {
    cursor: pointer;
    &:focus {
      @include focus_category;
    }
  }

  .nav__sub-cat-txt {
    letter-spacing: 0;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
    color: #333;
  }

  .list-ani-enter-active, .list-ani-leave-active {
    transition: all .5s;
  }

  .list-ani-enter, .list-ani-leave-to {
    transform: translateY(-120px);
    opacity: 0;
  }
</style>
