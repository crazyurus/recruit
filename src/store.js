import { createStore } from 'vuex';
import { getSeminarList, getSeminarDetail } from './service';

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
    async getList(context, payload = {}) {
      const result = await getSeminarList({
        page: context.state.page,
        left: context.state.left,
        search: payload.search,
      });

      context.commit('saveList', result);

      return result.list.length > 0;
    },
    async getSeminarDetail(context, payload) {
      const result = await getSeminarDetail({
        id: payload.id,
      });

      context.commit('saveDetail', result);
    }
  },
  mutations: {
    resetList(state) {
      state.list = [];
      state.page = 1;
      state.left = 0;
    },
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
    saveDetail(state, payload) {
      state.items.set(payload.id, payload);
    },
  },
});

export default store;
