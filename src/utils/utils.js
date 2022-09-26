export const  truncateString = ( str, n, useWordBoundary ) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1);
    return (useWordBoundary 
      ? subString.slice(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;";
  };

  
  export const getPercentage = (price, oldPrice) => {
  return Math.round((price * 100) / oldPrice);
}
  
export const numToCurrency = (number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}
