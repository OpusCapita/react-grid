module.exports = {
  getTarget: () => {
    let target = 'development';
    if (process.argv.indexOf('-p') !== -1) {
      target = 'production';
    } else if (process.env.NODE_ENV === 'production') {
      target = 'production';
    } else if (process.env.BUILD_TARGET === 'production') {
      target = 'production';
    }
    if (process.env.BUILD_TARGET === 'release') {
      target = 'release';
    }
    return target;
  },
};
