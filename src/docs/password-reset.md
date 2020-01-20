# Password Reset
Laravel Auth package has forget password and reset password api available along with the basic login and register feature. The following api route is made ready for you:
```$xslt
POST /api/password/email
POST /api/password/reset
```

## User Model Preparation
Your user model should have the following to ensure the password reset feature is working:
- Use the `Fligno\Auth\Traits\EmailNotifications` trait
```php
<?php

namespace App;

use Fligno\Auth\Traits\EmailNotifications;

class User extends Authenticatable
{
    use EmailNotifications;
}
```
The email verification feature is optional. If you don't want this feature, don't implement the `MustVerifyEmail` but also don't omit the `EmailNotifications` trait because the forget password feature is also dependent on this trait.
