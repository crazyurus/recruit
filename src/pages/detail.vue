<script>
import { f7 } from 'framework7-vue';
import * as ics from 'ics';
import { getGeoLocation } from '../service';

export default {
  props: {
    id: String,
    f7router: Object,
  },
  computed: {
    article() {
      return this.$store.state.items.get(this.$props.id);
    },
  },
  created() {
    this.$store.dispatch('getSeminarDetail', {
      id: this.$props.id,
    });
  },
  methods: {
    share() {
      navigator.share({
        url: location.href,
        text: this.article.title,
      });
    },
    addToCalendar() {
      const time = this.article.time.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})-(\d{2}):(\d{2})$/);
      const startTime = time.slice(1, 6).map(Number);
      const endTime = [...time.slice(1, 4), ...time.slice(6, 8)].map(Number);
      const event = {
        start: startTime,
        end: endTime,
        title: this.article.title,
        description: this.article.content.replace(/<[^>]+>/g, ''),
        location: this.article.address,
        url: location.href,
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
      };

      if (this.article.contact.name && this.article.contact.email) {
        event.organizer = {
          name: this.article.contact.name,
          email: this.article.contact.email,
        };
      }

      ics.createEvent(event, (error, value) => {
        if (!error) {
          const blob = new Blob([value], {
            type: 'text/calendar', 
          });
          const url = window.URL.createObjectURL(blob);
          location.assign(url);
        }
      });
    },
    async showAddressMap() {
      const { latitude, longitude } = await getGeoLocation(this.article.university + ',' + this.article.address);

      location.assign(`https://apis.map.qq.com/uri/v1/marker?marker=coord:${latitude},${longitude};title:${this.article.university};addr:${this.article.address}`);
    },
    openPoster() {
      f7.photoBrowser.create({
        photos: [this.article.poster],
        navbar: false,
        toolbar: false,
        theme: 'dark',
      }).open();
    },
    openCompanyDetail() {
      this.$props.f7router.navigate('/company/' + this.article.company.id);
    },
  },
};
</script>

<template>
  <f7-page>
    <div class="seminar-header">
      <div class="seminar-title">
        <div class="seminar-title_text">
          <span>{{article.title}}</span>
        </div>
        <div class="seminar-source">来源：{{article.source}}</div>
      </div>
    </div>
    <div class="seminar-info">
      <div class="seminar-info-line seminar-info-address" @click="addToCalendar">
        <img class="seminar-info-icon" src="../assets/icons/time.png" />
        <span>举办时间：{{article.time}}</span>
      </div>
      <div class="seminar-info-line">
        <img class="seminar-info-icon" src="../assets/icons/university.png" />
        <span>举办学校：{{article.university}}</span>
      </div>
      <div v-if="article.address" :class="article.address === '线上宣讲会' ? 'seminar-info-line' : 'seminar-info-line seminar-info-address'" @click="showAddressMap">
        <img class="seminar-info-icon" src="../assets/icons/address.png" />
        <span v-if="article.address == '线上宣讲会'">{{article.address}}</span>
        <span v-else>举办地点：{{article.address}}</span>
      </div>
    </div>
    <div v-if="article.company.id" class="seminar-company" @click="openCompanyDetail">
      <img class="seminar-company_logo" :src="article.company.logo" />
      <div class="seminar-company_content">
        <div class="seminar-company_title">{{article.company.name}}</div>
        <div class="seminar-company_text">{{article.company.description}}</div>
      </div>
    </div>
    <div class="seminar-content">
      <template v-if="article.content">
        <div class="seminar-content_title">宣讲会内容</div>
        <div v-html="article.content" class="html"></div>
        <div v-if="article.poster" class="seminar-poster">
          <a @click="openPoster">查看海报</a>
        </div>
      </template>
      <template v-if="article.positions.length > 0">
        <div class="seminar-content_title">招聘专业</div>
        <div v-for="(position, index) in article.positions" :key="index">{{position}}</div>
      </template>
      <template v-if="article.contact.email">
        <div class="seminar-content_title">联系方式</div>
        <div>
          <a :href="'mailto:' + article.contact.email">{{article.contact.email}}</a>
        </div>
      </template>
      <template v-if="article.tips">
        <div class="seminar-content_title">本校提醒</div>
        <div v-html="article.tips" class="html"></div>
      </template>
      <div class="seminar-content-after">
        <span>阅读 {{article.view}}</span>
        <a href="https://support.qq.com/product/23796" target="_blank">反馈</a>
      </div>
    </div>
    <div class="seminar-share">
      <div class="button" @click="addToCalendar">添加到日程</div>
      <div class="button" @click="share">分享给同学</div>
    </div>
  </f7-page>
</template>

<style lang="less" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.seminar-header {
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #45c8dc;
}

.seminar-title {
  flex-grow: 1;
  width: calc(100% - 90px);
  padding: 0 16px;
}

.seminar-title_text {
  font-size: 16px;
  line-height: 1.6;
  color: #fff;
  width: calc(100% - 16px);
  .ellipsis();
}

.seminar-source {
  font-size: 14px;
  line-height: 1.33;
  color: rgba(255, 255, 255, 0.6);
  width: calc(100% - 16px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
}

.seminar-info {
  background: #fff;
  padding: 12px 16px;
}

.seminar-info-line {
  line-height: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.seminar-info-address, .seminar-company {
  padding-right: 16px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2060%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'm60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z'%20fill%3D'%23c7c7cc'%2F%3E%3C%2Fsvg%3E");
  background-size: 10px 20px;
  background-repeat: no-repeat;
  background-position: 100% center;
}

.seminar-company {
  display: flex;
  align-items: center;
  background-position: calc(100% - 16px) center;
  padding: 16px 32px 16px 16px !important;
}

.seminar-company:active {
  background-color: #ececec;
  opacity: 1;
}

.seminar-info-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 8px;
}

.seminar-content, .seminar-company {
  background-color: #fff;
  padding: 16px;
  margin: 16px 0;
}

.seminar-company_logo {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  margin-right: 12px;
}

.seminar-company_content {
  flex-grow: 1;
  overflow: hidden;
}

.seminar-company_title {
  font-size: 16px;
  margin-bottom: 4px;
  .ellipsis();
}

.seminar-company_text {
  color: #646a73;
  .ellipsis();
}

.seminar-content-after {
  margin: 20px 0 0;
  color: #8c8c8c;
  display: flex;
  justify-content: space-between;
  font-size: inherit;
}

.seminar-content-after button {
  color: #45c8dc;
  border: none;
  margin: 0;
  padding: 0;
  font-size: inherit;
  line-height: inherit;
}

.seminar-content_title {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  line-height: 0.7;
  margin: 16px 0 10px;
  border-bottom: 6px solid rgba(69,200,220,0.6);
}

.seminar-share {
  text-align: center;
  height: 120px;
}

.seminar-share .button {
  display: block;
  width: 140px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  margin: 16px auto 0;
  border-radius: 2px;
  color: #fff;
  background-color: #45c8dc;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  &:first-child {
    background-color: rgb(237, 157, 129);
  }
}

.seminar-poster {
  margin-top: 16px;
}

.html {
  overflow-x: auto;
}
</style>
