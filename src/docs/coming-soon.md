# Coming Soon Newsletter
The following routes are already prepared for your project.

```$xslt
# adds new email to the newsletter
POST /api/newsletters

# gets list of submitted emails
GET /api/newsletters

# deletes array of emails
DELETE /api/newsletters

# sends email to the submitted email address
POST /api/newsletters/mail/send

# get the coming_soon value in app settings
GET /api/app-settings/coming-soon

# toggle the coming_soon in app_settings
PATCH /api/app-settings/coming-soon

# gets the email subject and content values for the coming soon email
GET /api/app-settings/email

# update the value for email subject and content of the coming soon email
PATCH /api/app-settings/email
```

## Migrations
This feature comes with two database migration files for the following tables:
- `newsletters`
- `app_settings`

When you run the `php artisan migrate` in the installation, this two tables will be migrated along with the other migrations.

## Middleware
Add the `\Fligno\Auth\Http\Middlewares\ComingSoon` to the web middleware in your `App\Http\Kernel` to display the coming soon page when the coming soon setting is enabled.

```php
protected $middlewareGroups = [
    'web' => [
        // other middlewares...
        \Fligno\Auth\Http\Middlewares\ComingSoon::class,
    ],
];
```

## Route preparation
This feature has a default view for the coming soon page. But, you have to manually add the route to your `web.php` file.
```php
Route::view('/coming-soon', 'Auth::coming-soon');
```
Just be sure to run `yarn dev` first because the page is dependent to the `coming-soon.js` file. You can also create your own coming soon page, just simply hook it to the `/coming-soon` route.


## Email queueing
The email class is implementing `ShouldQueue` by default so you won't have to wait very long until all the emails are sent and the request sends back an http response. You should setup your queue driver in your `.env` or `config/database.php`.
