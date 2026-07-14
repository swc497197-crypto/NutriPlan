const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export function formatToday(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日 ${weekdays[date.getDay()]}`;
}
