<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Admin Panel</title>
    <link href="{{ mix("css/style.min.css") }}" rel="stylesheet">
    <link href="{{ mix("css/icons.min.css") }}" rel="stylesheet">
    <link href="{{ mix("css/custom.min.css") }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

<div id="admin" class="c-app">
    <div class="d-flex justify-content-center align-items-center w-100" id="loader">
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</div>
<script src="{{ mix("js/scripts.min.js") }}"></script>
</body>
</html>
