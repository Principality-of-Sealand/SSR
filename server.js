// require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const { ServerStyleSheet } = require('styled-components');
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props) => {
  sheet = new ServerStyleSheet()
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(sheet.collectStyles(component));
  });
};
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=86400')
  next()
})
app.get('/', (req, res) => {
  let props = {id: 6}
    let components = renderComponents(services);
    const styles = sheet.getStyleTags()
    res.end(Layout(
    'SSR Proxy',
    styles,
    App(...components),
    Scripts(Object.keys(services), props)
  ));
});
app.get('/:id', (req, res) => {
  let props = {id: req.params.id}
  let components = renderComponents(services);
  const styles = sheet.getStyleTags()
  res.end(Layout(
    'SSR Proxy',
    styles,
    App(...components),
    Scripts(Object.keys(services), props)
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
