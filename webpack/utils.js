module.exports = {
  isProduction: () => {
    let isProd = false;
    if (process.argv.indexOf('-p') !== -1) {
      isProd = true;
    } else if (process.env.NODE_ENV === 'production') {
      isProd = true;
    }
    return isProd;
  },
};
