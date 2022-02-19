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
    async getList(context) {
      const result = await getSeminarList({
        page: context.state.page,
        left: context.state.left,
      });

      context.commit('saveList', result);
    },
  },
  mutations: {
    saveList(state, payload) {
      state.left = payload.left;
      state.page++;
      state.list = state.list.concat(payload.list.map(item => {
        state.items.set(item.id, {
          ...state.items.get(item.id),
          ...item,
        });

        return item.id;
      }));
    },
  },
});

export default store;
