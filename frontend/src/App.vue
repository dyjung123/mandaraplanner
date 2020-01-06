<template>
  <div id="app">
    <Header />
    <SideNav />
    <router-view/>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';
import Header from './components/Header.vue';
import SideNav from './components/SideNav.vue';

@Component({
  components: {
    Header,
    SideNav,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
