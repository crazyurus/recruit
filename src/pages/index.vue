<script>
import { f7Page } from 'framework7-vue';

export default {
  components: {
    f7Page,
  },
  created() {
    this.$store.dispatch('getList');
  },
  computed: {
    list() {
      return this.$store.state.list.map(id => {
        return this.$store.state.items.get(id);
      });
    },
  },
};
</script>

<template>
  <f7-page>
    <div v-for="item in list" :key="item.id">{{item.title}}</div>
  </f7-page>
</template>
