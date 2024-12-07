module.exports = function override(config, env) {
  config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];

  return config;
};
