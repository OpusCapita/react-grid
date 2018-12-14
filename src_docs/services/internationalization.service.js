/* eslint-disable import/prefer-default-export */

// Determine locale formats by Intl output to get best support for parsing user input
export const getLocaleFormatData = (region) => {
  let decimalSeparator = '';
  let thousandSeparator = '';
  let dateFormat = 'L';
  const number1 = 1.1;
  const number2 = 1000;

  const formattedNumber1 = number1.toLocaleString(region);
  const formattedNumber2 = number2.toLocaleString(region);
  decimalSeparator = formattedNumber1.substr(1, 1);
  thousandSeparator = formattedNumber2.substr(1, 1);
  if (!isNaN(decimalSeparator)) { // eslint-disable-line
    decimalSeparator = '';
  }
  if (!isNaN(thousandSeparator)) { // eslint-disable-line
    thousandSeparator = '';
  }
  const formattedDate = new Date(2017, 2, 5).toLocaleDateString(region);
  const determinedFormat = formattedDate
    .replace('03', 'MM')
    .replace('3', 'M')
    .replace('05', 'DD')
    .replace('5', 'D')
    .replace('2017', 'YYYY');
  if (
    determinedFormat.indexOf('M') > -1
    && determinedFormat.indexOf('D') > -1
    && determinedFormat.indexOf('Y') > -1
  ) {
    dateFormat = determinedFormat;
  }
  return {
    dateFormat,
    thousandSeparator,
    decimalSeparator,
  };
};
