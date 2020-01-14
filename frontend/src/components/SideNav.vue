<template>
    <div class="nav">
      <div class="nav__item-wrap">
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
                      <a class="nav__sub-cat-wrap" tabindex="0">
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
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';

@Component
export default class SideNav extends Vue {
  private categoryInfo: object = {
    음식: {
      primaryCategory: '음식',
      subCategory: ['중식', '한식', '양식', '일식'],
      isOn: false,
    },
    '미술&사진': {
      primaryCategory: '미술&사진',
      subCategory: ['그림', '사진'],
      isOn: false,
    },
    아동: {
      primaryCategory: '아동',
      subCategory: ['동화', '그림책', '퍼즐'],
      isOn: false,
    },
    역사: {
      primaryCategory: '역사',
      subCategory: ['세계사', '국사'],
      isOn: false,
    },
    법: {
      primaryCategory: '법',
      subCategory: ['형법', '민법', '로스쿨', '실생활'],
      isOn: false,
    },
    '10대': {
      primaryCategory: '10대',
      subCategory: ['교과서', '만화', '대학입시', '라이트노벨'],
      isOn: false,
    },
    문학: {
      primaryCategory: '문학',
      subCategory: ['시', '소설', '수필', '희곡', '평론'],
      isOn: false,
    },
  };
}
</script>

<style lang="scss" scoped>
  @mixin focus_category {
    border-color: #0070c9;
    outline: none;
    box-shadow: 0 0 0 .25rem rgba(131,192,253,.5);
  }

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
