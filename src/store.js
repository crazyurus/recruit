import { createStore } from 'vuex';
import { getSeminarList } from './service';

const store = createStore({
  state() {
    return {
      list: [],
      page: 1,
      left: 0,
      items: new Map(),
    };
  },
  actions: {
    async getList(context, payload) {
      const { left, list } = await getSeminarList({
        page: context.state.page,
        left: context.state.left,
      });

      context.commit('saveList', {

      });
    },
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
});

export default store;
