const moment = require('moment');

const options = [
  '肖家松',
  '李新平',
  '谭世强',
  '李莎丽',
  '刘理彬',
  '李佳馨',
  '王晋',
  '王鑫柔',
  '吕红红',
  '王蕊',
  '陈楚楚',
  '张婷婷',
  '杨周末',
  '祝腾逸',
  '张罗陶',
  '李会玲',
  '杜柏锐',
  '陈文溢'
];

const getWeekDayStr = (num) => {
  switch (num) {
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    case 0:
      return '星期日';
  }
};

const randomArr = (arr) => {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  // console.log('random arr: ', JSON.stringify(arr));
  return [...arr];
};

const gcd = (a, b) => {
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  for (let i = max; i < max * min; i++) {
    if (i % a === 0 && i % b === 0) {
      console.log('最小公倍数: ', i);
      return i;
    }
  }
};

const wfh = (wfhSum, startDate) => {
  const start = moment(startDate) || moment();
  const length = options.length;
  const num = gcd(wfhSum, length);
  const times = num / length;
  let newArr = [];
  for (let i = 0; i < times; i++) {
    newArr = [...newArr, ...randomArr(options)];
  }
  const loopTimes = newArr.length / wfhSum;
  for (let j = 0; j < loopTimes; j++) {
    let date = start;
    if (j > 0) {
      date = start.add(1, 'days');
    }
    if (date.weekday() === 6) {
      date = date.add(1, 'days');
    }
    if (date.weekday() === 0) {
      date = date.add(1, 'days');
    }
    const dateStr = date.format('YYYY-MM-DD ');
    const weedayStr = getWeekDayStr(date.weekday());

    const person = newArr.splice(0, wfhSum);

    console.log(dateStr + weedayStr + ': ', JSON.stringify(person));
  }
};

wfh(8, '2021-11-01');
