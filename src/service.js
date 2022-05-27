import request, { jsonp } from './utils/request';
import { unique, formatTimestamp } from './utils/utils';

function getStatus(status) {
  if (status.isInProgress) return 1;
  if (status.isCancel) return 2;
  if (status.isExpired) return 3;

  return 0;
}

function getCDNURL(url) {
  return url + '!y';
}

function getCompany(result) {
  return {
    id: result.id,
    name: result.name,
    logo: getCDNURL(result.logo_src),
    description: (!result.city_name || result.city_name === '市辖区' ? result.province_name : result.city_name) + ' ' + result.xingzhi_id_name + ' ' + result.business_name,
    type: result.xingzhi_id_name,
    region: result.province_name + (result.city_name === '市辖区' ? '' : result.city_name) + result.region_name,
    industry: result.business_name,
    scale: result.guimo_id_name,
    registeredCapital: result.catype_name,
    website: result.weburl,
    address: result.address,
    createTime: formatTimestamp(result.start_time),
    verifyTime: result.verify_time === 0 ? '' : formatTimestamp(result.verify_time),
    license: result.license,
    position: {
      latitude: result.latitude,
      longitude: result.longitude,
    },
  };
}

export async function getSeminarList(options) {
  const { page, left, search = '' } = options;
  const colorArray = ['#ed9d81', '#a7d59a', '#8c88ff', '#56b8a4', '#60bfd8', '#c9759d'];
  const data = await request('/preach/getlist', {
    page,
    size: 10,
    isunion: 2,
    laiyuan: 0,
    keywords: search,
  });

  return {
    list: data.list.map((item, i) => {
      return {
        id: item.id,
        title: item.title,
        company: {
          id: item.com_id,
          name: item.com_id_name,
          logo: getCDNURL(item.com_id_logosrc),
          description: '暂无',
        },
        backgroundColor: colorArray[(i + left) % colorArray.length],
        university: item.school_id_name,
        address: item.address || item.tmp_field_name || '线上宣讲会',
        view: item.viewcount,
        time: item.hold_date + ' ' + item.hold_starttime + '-' + item.hold_endtime,
        status: getStatus({
          isExpired: item.timestatus === 3,
          isCancel: item.publish_status === 2,
          isOfficial: item.istop === 1,
          isInProgress: item.timestatus === 1,
        }),
        contact: {},
        source: '武汉理工大学学生就业指导中心',
        positions: [],
      };
    }),
    left: left + (data.list.length % colorArray.length),
  };
}

export async function getSeminarDetail(options) {
  const { id } = options;
  const result = await request('/preach/detail', {
    id,
  });

  return {
    id: result.id,
    title: result.title,
    company: getCompany(result.comInfo),
    university: result.school_id_name,
    address: result.address || result.tmp_field_name || '线上宣讲会',
    view: result.viewcount,
    content: result.remarks,
    tips: result.schoolwarn,
    poster: result.haibao_id_src ? getCDNURL('https:' + result.haibao_id_src.linkpath) : '',
    time: result.hold_date + ' ' + result.hold_starttime + '-' + result.hold_endtime,
    status: getStatus({
      isExpired: result.timestatus === 3,
      isCancel: result.publish_status === 2,
      isOfficial: result.istop === 1,
      isInProgress: result.timestatus === 1,
    }),
    contact: {
      name: result.contacts,
      email: result.email,
      telephone: result.phone,
    },
    source: '武汉理工大学学生就业指导中心',
    positions: unique(result.ProfessionalList.map(item => item.professional_id_name)),
  };
}


export async function getCompanyDetail(options) {
  const { id } = options;
  const result = await request('/com/detail', {
    id,
  });

  return getCompany(result);
}

export async function getGeoLocation(address) {
  const { data } = await jsonp('https://apis.map.qq.com/ws/geocoder/v1/?address=' + encodeURIComponent(address) + '&output=jsonp&key=BP7BZ-6FXRV-6CNP3-UDXK2-GJ36S-VFBN7');

  return {
    latitude: data.result.location.lat,
    longitude: data.result.location.lng,
  };
}
