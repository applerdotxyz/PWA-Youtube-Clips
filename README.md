#############################################################
## Dockerized,Reacting,Reduxed,WebPacked,Firebased         ##
#############################################################



```
A Starter Kit (yet Another) which gives you Node and React+Redux Capabilities with a docker based container and webpack 2 based frontend build setup
```

#### How to run this up ?

```
- copy and rename `frontend/src/config.sample.js` as `frontend/src/config.js`. adjust values
- docker-compose up --build
```

##### What this starter has ?

- `Firebase` for mBaaS
- `React` + `Redux` based frontend view layer
- `Webpack 2` as the build tool
- `Docker` and `docker-compose` to glue the setup up

#### Frontend app dev environment
- `cd frontend`
- copy & edit `src/config/index.sample.js`, save as `src/config/index.js`
- `rm -rf node_modules && yarn`
- `yarn start`

#### Frontend app dist environment
- `cd frontend`
- copy & edit `src/config/index.sample.js`, save as `src/config/index.js`
- `rm -rf node_modules && yarn`
- `yarn dist`




#### Frontend app has

- `react` for views
- `redux` for state management
- `material-ui` for eye candy (material design)
- `firebase` interaction
- `mocha` and `enzyme` based view layer tests
- `superagent` to fetch data from `Youtube Data API`
- `google` auth


#### TODOs
- [ ] add modal for video being played
- [ ] add disqus thread using in modal
- [ ] add search-bar to search videos
- [ ] add sidebar to show related videos
- [ ] better player view(non-standard YT)
- [ ] cropping functionality via UI
- [ ] show profile information using google user
- [ ] make authentication must
- [ ] better UI
