<script>
export default {
  props: ['id', 'index', 'title', 'backgroundColor', 'company', 'time', 'address', 'status', 'university', 'view'],
  emits: ['click'],
  methods: {
    click() {
      this.$emit('click', {
        id: this.$props.id,
      });
    },
  },
};
</script>

<template>
  <f7-card class="company" @click="click">
    <template v-slot:header>
      <div class="header" :style="{ backgroundColor }">
        <div class="header-no">No.{{index}}</div>
        <div class="header-title">{{company.name}}</div>
      </div>
    </template>
    <template v-slot:content>
      <div class="content">
        <div class="content-title">{{title}}</div>
        <div class="content-line">
          <span>{{time}}</span>
          <span v-if="status === 1" class="card-content-tag tag-info">进行中</span>
          <span v-else-if="status === 2" class="card-content-tag tag-warning">已取消</span>
          <span v-else-if="status === 3" class="card-content-tag tag-danger">已结束</span>
        </div>
        <div class="content-line">{{address}}</div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer-university">{{university}}</div>
      <div class="footer-view">浏览：{{view}}</div>
    </template>
  </f7-card>
</template>

<style>
.card-header {
  display: block;
  padding: 0;
}

.card-footer {
  min-height: 0;
  padding: 8px 16px;
  background-color: #f3f5f7;
}
</style>

<style lang="less" scoped>
.company {
  transition: transform .2s;
  will-change: transform;
  transform-origin: center center;
  user-select: none;

  &:active {
    transform: scale(.97) translate3d(0, 0, 0);
  }
}

.header {
  display: flex;
  position: relative;
  height: 120px;
  align-items: center;
  justify-content: center;
  color: #fff;

  &-title {
    font-size: 16px;
    margin: 0 16px;
    text-align: center;
  }

  &-no {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    padding: 3px 5px;
    border-radius: 2px;
  }
}

.content {
  &-title {
    font-weight: bold;
    margin-bottom: 12px;
  }

  &-line {
    color: #646a73;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.card-content-tag {
  background-color: #000;
  color: #fff;
  border-radius: 3px;
  margin-left: 10px;
  padding: 1px 5px;
  display: inline-block;
  font-size: 13px;
  font-weight: normal;
}

.tag-success {
  background: #5cb85c;
}

.tag-danger {
  background: #d9534f;
}

.tag-warning {
  background: #f0ad4e;
}

.tag-info {
  background: #45c8dc;
}
</style>
