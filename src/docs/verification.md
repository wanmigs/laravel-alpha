# Email Verification
Laravel Auth package also gives api-based app an easier approach to achieve email verification feature. You can make use of the following routes to your app:
```$xslt
GET /api/email/resend
GET /api/email/verify/{id}/{hash}
```

## Installation
#### 1. Add email verification column to users table
Your user table must contain an `email_verified_at` column to store the date and time that the email address was verified.

#### 2. Implement `Illuminate\Contracts\Auth\MustVerifyEmail` to `App\User` model
```php
<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    // ...
}
```

#### 3. Use `Fligno\Auth\Traits\ApiEmailVerification` trait inside the `App\User` model
```php
<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Fligno\Auth\Traits\ApiEmailVerification;

class User extends Authenticatable implements MustVerifyEmail
{
    use ApiEmailVerification;
}

```

#### 4. Add `verification.verify` route to your `web.php`
You can skip this step if you have a separate frontend app and follow step 5 instead.
```php
Route::view('email/verify', 'Auth::verification')->name('verification.verify')->middleware('signed');
```
The app will send a verification email and it will use the `verification.verify` route as the redirect action inside the email content.

You can specify other url name as you like as long as the route name is `verification.verify` with the `signed`
middleware.

#### 5. Add and specify `VERIFICATION_URL` to your `.env` file
You can skip this step if you don't have a separate frontend and follow step 4 instead.
```
VERIFICATION_URL=https://frontend.app/email/verify
```
**Note:** Don't add extra `/` in the end of the url.

#### 6. Add the `verification.js` to your `webpack.mix.js`
You can also skip this step if you have separate frontend app. Instead you can just copy the published resource file and reference it on how to use the `/api/email/verify` route.
```js
mix
  .js("resources/js/app.js", "public/js")
  .react("resources/js/auth/login.js", "public/js")
  .react("resources/js/auth/register.js", "public/js") 
  .react("resources/js/auth/verification.js", "public/js") // Add this line
  .react("resources/js/home.js", "public/js") 
  .sass("resources/sass/app.scss", "public/css");
```
