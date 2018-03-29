const axios = require('axios');
const fs = require('fs');
const path = require('path');

const { servicePaths, serviceLists } = require('./bundlePaths/servicePaths');

const bundles = [];

const getBundle = service =>
  axios.get(`${servicePaths[service]}/${service}-bundle-server.js`);

const writeBundle = service =>
  getBundle(service)
    .then(({ data }) =>
      new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(path.resolve(__dirname, `./bundles/${service}-server.js`));
        writeStream.write(data);
        writeStream.end();
        writeStream.on('finish', () => resolve());
        writeStream.on('reject', () => reject());
      }))
    .catch(e => console.log(e));

const getAndWriteAllBundles = () => {
  const list = [];
  serviceLists.forEach(service => list.push(writeBundle(service)));
  console.log('GET AND WRITE');
  return Promise.all(list);
};

const listAppComponents = () =>
  getAndWriteAllBundles()
    .then(() => {
      bundles.push(require(`./bundles/menu-server.js`).default);
    })
    .catch((e) => console.log(e));

listAppComponents();

module.exports = bundles;
