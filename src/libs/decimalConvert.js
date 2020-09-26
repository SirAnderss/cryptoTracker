const decimalConvert = (n) => {
  let t = n.toString();
  let regex = /(\d*.\d{0,2})/;
  return t.match(regex)[0];
};

export default decimalConvert;
