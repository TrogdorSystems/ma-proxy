const axios = require('axios');
const fs = require('fs');
const { servicePaths, serviceLists } = require('./bundlePaths/servicePaths');

const bundles = [];

const getBundle = service =>
  axios.get(servicePaths[service]);

const writeBundle = service =>
  getBundle(service)
    .then(({ data }) =>
      new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(`./bundles/${service}-server.js`);
        writeStream.write(data);
        writeStream.end();
        writeStream.on('finish', () => resolve());
        writeStream.on('reject', () => reject());
      }))
    .catch(e => console.log(e));

const getAndWriteAllBundles = () => {
  const list = [writeBundle('menu')];
  return Promise.all(list);
};

const listAppComponents = () =>
  getAndWriteAllBundles()
    .then(() => bundles.push(require(`./bundles/menu-server.js`).default));

listAppComponents();

module.exports = bundles;
