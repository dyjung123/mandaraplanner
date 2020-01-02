import Vue from 'vue';
import Vuex from 'vuex';
import { stateType } from '../types/state';

Vue.use(Vuex);

const state: stateType = {
  isWriteRootGoal: false,
}

export default new Vuex.Store({
  state,
  mutations: {
    deleteRootGoal(state: stateType) {
      state.isWriteRootGoal = false;
    },
    writeRootGoal(state: stateType) {
      state.isWriteRootGoal = true;
    },
  },
  actions: {
    noRootGoal({ commit }) {
      console.log('actions noRootGoal');
      commit('deleteRootGoal');
    },
    existRootGoal({ commit }) {
      console.log('actions existRootGoal');
      commit('writeRootGoal');
    },
  },
});
