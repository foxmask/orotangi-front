# orotangi

> Your thoughts everywhere

## Build Setup


### install dependencies

```bash
npm install
```

### serve with hot reload at localhost:8002

```bash
npm run dev
```

### build for production with minification

```bash
npm run build
node_modules/.bin/webpack
```

### build for production and view the bundle analyzer report

```bash
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Install the Bundle

### put the bundle in the django app

```bash
cp dist/orotangi_vue.js ../orotangi/orotangi/static/build/
```

## Testing in Dev environment 

in the config/index.js file you can set the proxy 

```
  dev: {
    env: require('./dev.env'),
    port: 8002,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    proxyTable: {
     '/api/orotangi/': {
         target: 'http://localhost:8001/',
         changeOrigin: true,
         /*pathRewrite: {
             '^/api/orotangi': '/api/orotangi'
         }*/
       }
    },

```

Here the node server will start on port 8002 and will make call of the Django Rest Framework on the port 8001

As the API call are done from a connected user, once the both server are started, go to http://localhost:8001/ to log in then http://localhost:8002/

