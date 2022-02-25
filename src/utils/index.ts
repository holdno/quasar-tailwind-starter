export function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return Math.ceil(Math.random() * minNum + 1);
    case 2:
      return Math.ceil(Math.random() * (maxNum - minNum + 1) + minNum);
    default:
      return 0;
  }
}

import moment from "moment-timezone";

export function formatTimestamp(
  timestamp: number,
  fmt: string = "YYYY-MM-DD HH:mm"
) {
  const dt = moment(timestamp);
  return dt.format(fmt);
}
