const React = require('react');
const ReactDOM = require('react-dom/server');
const serviceList = require('./getServerBundles');
const { createBaseHtml, createAppBody, createHydrated } = require('./templates/base');

const serveHtml = (response) => {
  const component = React.createElement(serviceList[0], { name: 'quos999999' });
  const componentString = ReactDOM.renderToString(component);
  response.statusCode = 200;
  // pass the strings through spread operator in the createAppBody
  response.end(createBaseHtml(
    'START',
    createAppBody('ABOUT', 'RESERVE', componentString, 'REVIEWS'),
    createHydrated('', '', 'MenuView', ''),
  ));
};

module.exports = serveHtml;
