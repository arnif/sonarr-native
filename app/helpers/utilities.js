module.exports = {
  capitalizeFirstLetter: (text) => text.charAt(0).toUpperCase() + text.slice(1),

  reverseObject: (Obj) => {
    const TempArr = [];
    const NewObj = {};
    for (let Key in Obj) { // eslint-disable-line
      TempArr.push(Key);
    }
    for (let i = TempArr.length - 1; i >= 0; i--) {
      NewObj[TempArr[i]] = Obj[TempArr[i]];
    }
    return NewObj;
  },

  padWithZero: (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  },

  humanFileSize: (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
  },
};
