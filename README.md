# [vue_abridge](vue3-abridge.netlify.app/)

This is a simple to do app powered by vue 3, tailwindcss, pinia and other various technologies

## Project Description

With consuming dummyjson apis vue_abridge can be used to view/add/update/delete tasks in todo, doing, under review and done board's stage 

This simple todo allows to drag task from one board section to another

As explained in dummyjson docs adding a new todo will not add it into the server, so during testing: updating/deleting newly added todo will not give expected result, but updating/deleting fetched todos will work as expected.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```


### Run Unit&Component Tests with

```sh
npm run test
```

### Run e2e Tests with

```sh
npm run cypress:open
```

### Run Headless e2e Tests with

```sh
npm run test:e2e
```
