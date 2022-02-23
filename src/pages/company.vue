<script>
export default {
  props: {
    id: String,
  },
  computed: {
    company() {
      return this.$store.state.company.get(this.$props.id);
    },
  },
  created() {
    this.$store.dispatch('getCompanyDetail', {
      id: this.$props.id,
    });
  },
};
</script>

<template>
  <f7-page>
    <f7-card>
      <template v-slot:content>
        <div class="form-label">企业名称</div>
        <div class="form-value">{{company.name}}</div>
        <div class="form-label">企业类型</div>
        <div class="form-value">{{company.type}}</div>
        <div class="form-label">所在地区</div>
        <div class="form-value">{{company.region}}</div>
        <div class="form-label">行业</div>
        <div class="form-value">{{company.industry}}</div>
        <div class="form-label">企业规模</div>
        <div class="form-value">{{company.scale}}</div>
        <div class="form-label">注册资本</div>
        <div class="form-value">{{company.registeredCapital}}</div>
        <div class="form-label">成立时间</div>
        <div class="form-value">{{company.createTime}}</div>
        <template v-if="company.website">
          <div class="form-label">企业网站</div>
          <a class="form-value" :href="company.website" target="_blank">{{company.website}}</a>
        </template>
        <template v-if="company.address">
          <div class="form-label">地址</div>
          <a class="form-value" :href="`https://apis.map.qq.com/uri/v1/marker?marker=coord:${company.position.latitude},${company.position.longitude};title:${company.name};addr:${company.address}`" target="_blank">{{company.address}}</a>
        </template>
        <div v-if="company.verifyTime" class="form-footer">该企业已于 {{company.verifyTime}} 通过审核</div>
      </template>
    </f7-card>
  </f7-page>
</template>

<style scoped>
.form-label {
  color: #646a73;
  margin-bottom: 4px;
}

.form-value {
  display: block;
  margin-bottom: 12px;
}

.form-value:not(a) {
  font-size: 16px;
  font-weight: bold;
}

.form-footer {
  color: #646a73;
  margin-top: 24px;
}
</style>