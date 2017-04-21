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

### put the bundle in the django app

```bash
cp dist/orotangi_vue.js ../orotangi/orotangi/static/
```

## Testing in Dev environment

Here the node devServer will start on port 8002 (see package.json) and will make calls of the Orotangi API on the port 8001

As the API calls are done from a connected user, once the both server are started, go to http://localhost:8001/ to log in then http://localhost:8002/

```
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
            "/api/orotangi": "http://localhost:8001"
    }
  },
```
