# Laravel Auth
This package handles your laravel project's api authentication. The following routes are already prepared for your project.
```$xslt
POST /api/register
POST /api/login
POST /api/logout
GET /api/me
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

#### 3. Add publish file to `webpack.mix.js`

```js
mix
  .js("resources/js/app.js", "public/js")
  .react("resources/js/auth/login.js", "public/js") // Add this line of code 
  .react("resources/js/auth/register.js", "public/js") // Add this line of code 
  .react("resources/js/home.js", "public/js") // Add this line of code 
  .sass("resources/sass/app.scss", "public/css");
```

#### 4. Add `package.json` dependecies
```json
"@babel/preset-react": "^7.0.0",
...
"react": "^16.2.0",
"react-dom": "^16.2.0",
"js-cookie": "^2.2.1"
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

#### 7. Import and use the `HasApiToken` trait to your `User` model
```php
<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;
    use Notifiable;
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


#### 10. Replace the `/` with this:
```php
Route::view('/', 'Auth::welcome');
```
This is an optional step. This is only to demonstrate a homepage with the authentication links.

# Todo
- Password Reset
- Email verification
