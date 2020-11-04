# Tailer Studio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Known issue
In `package.json`, we will have to remove the `resolutions` property when [this issue](https://github.com/scrumpy/tiptap/issues/577) will be closed. 
```json
"resolutions": {
  "prosemirror-model": "1.8.2"
}
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
