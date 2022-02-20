<script>;
export default {
  props: ['id'],
  created() {
    console.log(this.$props)
    this.$store.dispatch('getSeminarDetail', {
      id: this.$props.id,
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
