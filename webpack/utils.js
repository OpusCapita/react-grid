module.exports = {
  isProduction: () => {
    let isProduction = false;
    if (process.argv.indexOf('-p') !== -1 || process.env.NODE_ENV === 'production') {
      isProduction = 'production';
    }
    return isProduction;
  },
};
