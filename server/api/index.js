import glob from 'glob';

module.exports = function initModules(app) {
  return new Promise((resolve) => {
    glob(`${__dirname}/**/*.index.js`, (err, matches) => {
      if (err) {
        throw err;
      }

      matches.forEach((mod) => {
        const router = require(`${mod}`).default;

        app.use(router.routes()).use(router.allowedMethods({
          throw: true,
        }));
      });
      return resolve();
    });
  });
};
