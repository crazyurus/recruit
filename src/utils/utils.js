import dayjs from 'dayjs';

export function unique(arr) {
  return Array.from(new Set(arr));
}

export function formatTimestamp(timestamp) {
  return dayjs(timestamp * 1000).format('YYYY-M-D');
}
