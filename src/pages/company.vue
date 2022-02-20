<script>;
export default {
  created() {
    console.log(this)
    this.$store.dispatch('getSeminarDetail', {
      
    });
  },
  methods: {
  },
};
</script>

<template>
  <f7-page>

  </f7-page>
</template>
