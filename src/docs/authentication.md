# Laravel Auth

This package handles your laravel project's api authentication. The following routes are already prepared for your project.

```$xslt
POST /api/register
POST /api/login
POST /api/logout
POST /api/password/email
POST /api/password/reset
GET  /api/email/resend
GET  /api/email/verify/{id}/{hash}
GET  /api/me
```

# Installation

#### 1. Install via composer

```
composer require wanmigs/laravel-auth
```

#### 2. Publish resource file

```
php artisan vendor:publish --tag=auth --force
```

This will publish the ReactJS components to your `/resources/js` folder. We have to add the `--force` flag because it will override the default `bootstrap.js` file inside the `/resources/js`.

If you have a separate frontend, you can copy the published files into your frontend app.

Aside from the ReactJS components, this command will also publish the `config/frontend.php` file and the `tests` files.

#### 3. Add the published files to `webpack.mix.js`

```js
mix
  .sass("resources/sass/app.scss", "public/css")
  .react("resources/js/auth/login.js", "public/js") // Add this line of code
  .react("resources/js/auth/register.js", "public/js") // Add this line of code
  .react("resources/js/auth/verification.js", "public/js") // Add this line of code
  .react("resources/js/auth/forget-password.js", "public/js") // Add this line of code
  .react("resources/js/auth/reset-password.js", "public/js") // Add this line of code
  .react("resources/js/home.js", "public/js") // Add this line of code
  .react("resources/js/admin/app.js", "public/js/admin") // Add this line of code
  .react("resources/js/admin/pages/login.js", "public/js/admin"); // Add this line of code

mix.webpackConfig({
  resolve: {
    extensions: [".js", ".json", ".vue"],
    alias: {
      "~": path.join(__dirname, "./resources/js/admin")
    }
  },
  output: {
    publicPath: "/",
    chunkFilename: "js/admin/[name].js"
  }
});
```

#### 4. Add `package.json` dependecies

```json
"@babel/preset-react": "^7.0.0",
"react": "^16.2.0",
"react-dom": "^16.2.0",
"js-cookie": "^2.2.1",
"lodash.debounce": "^4.0.8",
"pretty-checkbox-react": "^1.1.0",
"react-router-dom": "^5.1.2"
```

#### 5. Install the dependencies

```
npm install && npm run dev
```

#### 6. Run the passport migrations & commands

This package also installs the Laravel Passport automatically so you need to run the following commands for the Laravel Passport to work.

```
php artisan migrate
```

```
php artisan passport:install
```

#### 7. Prepare your `User` model

Your user model should have the following:

- Implement the `Illuminate\Contracts\Auth\MustVerifyEmail` contract
- Use the `Laravel\Passport\HasApiTokens` trait
- Use the `Fligno\Auth\Traits\EmailNotifications` trait

```php
<?php

namespace App;

use Fligno\Auth\Traits\EmailNotifications;
use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use Notifiable;
    use EmailNotifications;
}
```

#### 8. Add `Passport::routes()` to your `AuthServiceProvider@boot`

```php
/**
 * Register any authentication / authorization services.
 *
 * @return void
 */
public function boot()
{
    $this->registerPolicies();

    Passport::routes();
}
```

#### 9. Change your auth driver to `api` in your `config/auth.php`

```php
'defaults' => [
    'guard' => 'api', // change from 'web' to 'api'
    'passwords' => 'users',
],

'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport', // change from 'api' to 'passport'
        'provider' => 'users',
    ],
],
```

#### 10. Replace the `/` route with this:

```php
Route::view('/', 'Auth::welcome');
```

This is an optional step. This is only to demonstrate a homepage with the authentication links.
