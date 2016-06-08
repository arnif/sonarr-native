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
};
