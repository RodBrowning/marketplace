export const  truncateString = ( str, n, useWordBoundary ) => {
  if (str.length <= n) { return str; }
  const subString = str.slice(0, n-1);
  return (useWordBoundary 
    ? subString.slice(0, subString.lastIndexOf(" ")) 
    : subString) + "&hellip;";
};
  
export const getPercentage = (price, oldPrice) => {
  return 100 - Math.round((price * 100) / oldPrice);
}
  
export const numToCurrency = (number, currencyInfo) => {
  return new Intl.NumberFormat(currencyInfo.locale, { style: 'currency', currency: currencyInfo.currencyCode }).format(number);
}

export const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }   
  return array;
}

export const roundToTwoDecimals = (num) => {
  return +(Math.round(num + "e+2")  + "e-2");
}