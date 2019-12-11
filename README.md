### Publish resource file

```
php artisan vendor:publish --tag=auth 
```

### Add publish file to `webpack.mix.js`

```
mix
  .js("resources/js/app.js", "public/js")
  .react("resources/js/auth.js", "public/js") // Add this line of code 
  .sass("resources/sass/app.scss", "public/css");
```

### Add `package.json` dependecies
```
"@babel/preset-react": "^7.0.0",
...
"react": "^16.2.0",
"react-dom": "^16.2.0",
```

`yarn install && npm run dev`
