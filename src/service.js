import request from './utils/request';

function getStatus(status) {
  if (status.isInProgress) return 1;
  if (status.isCancel) return 2;
  if (status.isExpired) return 3;

  return 0;
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
        company: item.com_id_name,
        backgroundColor: colorArray[(i + left) % colorArray.length],
        university: item.school_id_name,
        address: item.address || item.tmp_field_name || '空中宣讲会',
        view: item.viewcount,
        time: item.hold_date + ' ' + item.hold_starttime + '-' + item.hold_endtime,
        status: getStatus({
          isExpired: item.timestatus === 3,
          isCancel: item.publish_status === 2,
          isOfficial: item.istop === 1,
          isInProgress: item.timestatus === 1,
        }),
      };
    }),
    left: left + (data.list.length % colorArray.length),
  };
}
