Gitbook Plugin for custom-js-css
==============




## Usage

Add the plugin to your `book.json`:

```json
{
  "plugins": ["custom-js-css"]
}
```

## Options


put your js file and css file in the current book folder,for example in my book folder,the `my.js` and `my.css` in `my` folder is my custom js and css.and below is the option:

```json
"pluginsConfig": {
  "custom-js-css": {
    "js": [
      "./my/my.js"
    ],
    "css": [
      "./my/my.css"
    ]
  }
}
```



## License

Apache 2
