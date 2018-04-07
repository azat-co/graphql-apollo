## Web app set up

```
brew install yarn
yarn install
npm start
```

Theme by Creative Tim: <https://www.creative-tim.com/bootstrap-themes>

## Local API set up

Install Docker, then run:

```
npm -v
npm install -g graphcool
cd dashboard-web
graphcool init
```

Copy schema into `types.graphql`, then run:


```
graphcool local up
```

Run and select local:

```
graphcool deploy
```

The debug option

```
export DEBUG="*"
```
