<script>
import routes from './routes';

export default {
  setup() {
    return {
      routes,
    };
  },
};
</script>

<template>
  <f7-app theme="ios" name="就业招聘" id="team.token.recruit" :routes="routes" :clicks="{ externalLinks: 'a' }">
    <f7-view main class="safe-areas" url="/"></f7-view>
  </f7-app>
</template>
