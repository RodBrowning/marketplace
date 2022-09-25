export function truncateString( str, n, useWordBoundary ){
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1);
    return (useWordBoundary 
      ? subString.slice(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;";
  };