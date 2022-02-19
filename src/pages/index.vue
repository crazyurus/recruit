<script>;
import tokenCompany from '../components/company.vue';

let lock = false;

export default {
  data() {
    return {
      search: '',
      showPreloader: true,
    };
  },
  components: {
    tokenCompany,
  },
  created() {
    this.loadMore();
  },
  computed: {
    list() {
      return this.$store.state.list.map(id => {
        return this.$store.state.items.get(id);
      });
    },
  },
  methods: {
    search(e) {
      //const { value } = e.target;
      console.log(e)

      // this.search = value;
      // this.$store.commit('resetList');
      // this.loadMore();
      // console.log(value)
    },
    async loadMore() {
      if (lock) return;
      lock = true;

      const more = await this.$store.dispatch('getList', {
        search: this.search,
      });

      this.showPreloader = more;
      lock = false;
    },
  },
};
</script>

<template>
  <f7-page
    infinite 
    :infinite-distance="40"
    :infinite-preloader="showPreloader"
    @infinite="loadMore"
  >
    <f7-searchbar
      disable-button-text="取消"
      placeholder="职位/公司名"
      :clear-button="true"
    ></f7-searchbar>
    <div class="container">
      <token-company
        v-for="(item, index) in list"
        :key="item.id"
        :index="index + 1"
        :id="item.id"
        :title="item.title"
        :company="item.company"
        :address="item.address"
        :time="item.time"
        :university="item.university"
        :view="item.view"
        :backgroundColor="item.backgroundColor"
      />
    </div>
  </f7-page>
</template>
