const createBaseHtml = (title, body, scripts) => `
<!DOCTYPE html>
<html>
  <head>
  <title>${title}</title>
</head>
<body>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <div id="main">
    <h1>THIS</h1>
    <h1>IS</h1>
    <h1>SERVER-SIDE RENDERING!</h1>
    ${body}
    ${scripts}
  </div>
</body>
</html>
`;

const createAppBody = (about, reservation, menu, review) => `
  <div id="about">${about}</div>
  <div id="reservations">${reservation}</div>
  <div id="menu">${menu}</div>
  <div id="reviews">${review}</div>
`;

const createHydrated = (about, reservation, menu, review) => `
  <script src='http://ec2-18-144-47-201.us-west-1.compute.amazonaws.com/menu/menu-bundle.js'></script>
  <script>
ReactDOM.hydrate(
  React.createElement(${menu}, { name: "quos999999"}),
  document.getElementById('menu')
);
  </script>
`;

module.exports = {
  createBaseHtml,
  createAppBody,
  createHydrated,
};
