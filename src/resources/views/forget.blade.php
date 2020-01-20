<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>{{ config('app.name') }} - Forget Password</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
  <script src="https://kit.fontawesome.com/964ddd7bbe.js" crossorigin="anonymous"></script>

  <!-- Styles -->
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

  <!-- Scripts -->
  <script src="{{asset('js/forget-password.js')}}" defer></script>

  <style>
    html, body {
      background-color: #fff;
      color: #636b6f;
      font-family: 'Nunito', sans-serif;
      font-weight: 200;
      height: 100vh;
      margin: 0;
    }
  </style>
</head>
<body class="bg-gray-200">
<div id="app"></div>
</body>
</html>
