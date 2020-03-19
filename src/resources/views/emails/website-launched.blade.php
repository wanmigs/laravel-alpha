@component('mail::message')
{{ $content }}

@component('mail::button', ['url' => config('app.url')])
Check it out now!
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
