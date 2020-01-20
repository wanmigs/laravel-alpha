# Email Verification
Laravel Auth package also gives api-based app an easier approach to achieve email verification feature. You can make use of the following routes to your app:
```$xslt
GET /api/email/resend
GET /api/email/verify/{id}/{hash}
```

## User Model Preparation
Your user model should have the following to ensure the email verification feature is working:
- Implement the `Illuminate\Contracts\Auth\MustVerifyEmail` contract
- Use the `Fligno\Auth\Traits\EmailNotifications` trait
```php
<?php

namespace App;

use Fligno\Auth\Traits\EmailNotifications;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use EmailNotifications;
}
```
The email verification feature is optional. If you don't want this feature, you can simply omit the `MustVerifyEmail` implementation but don't omit the `EmailNotifications` trait because the forget password feature is also dependent on that trait.

## Users table preparation
Your user table must contain an `email_verified_at` column to store the date and time that the email address was verified.

## For separate frontend
This package already has an email verification redirect route prepared for you but it does not work well if you have a separate frontend app.

To specify your frontend's verification redirect url, you should add and specify `VERIFICATION_URL` to your `.env` file.

```
VERIFICATION_URL=https://frontend.app/email/verify
```
**Note:** Don't add extra `/` in the end of the url.
