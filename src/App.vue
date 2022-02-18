<script>
import { f7App, f7View } from 'framework7-vue';
import routes from './routes';

export default {
  components: {
    f7App,
    f7View,
  },
  setup() {
    return {
      routes,
    };
  },
};
</script>

<template>
  <f7-app theme="ios" name="就业招聘" id="team.token.recruit" :routes="routes">
    <f7-view main class="safe-areas" />
  </f7-app>
</template>
