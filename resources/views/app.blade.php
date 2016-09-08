<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      @yield('metas')
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
      <title>Claire Dean Art</title>
      <link rel="stylesheet" href="{{asset('css/main.css')}}">
   </head>
   <body>
      <i class="loader fa fa-spinner fa-pulse" id="loader"></i>
      <div class="main fadein">
         <!-- FIXME: Create Auth::check if else for menu bar -->
         @include('global.menu')

         @if(Auth::check())
            <!-- Edit Pages Menu for Admin - Inner Elements Generated in JS -->
            <div class="admin-edit-menu-btn">
               <i class="admin-edit-menu-btn-inner fa fa-pencil">
               </i>
            </div>
            <div class="admin-settings-menu-btn">
               <i class="admin-settings-menu-btn-inner fa fa-cogs">
               </i>
            </div>
         @endif

         <div id="app">
            @yield('content')
         </div>
      </div>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
      <script src="https://unpkg.com/packery@2.0/dist/packery.pkgd.min.js"></script>
      <script src="https://unpkg.com/draggabilly@2.1/dist/draggabilly.pkgd.min.js"></script>
      <!-- Global App Script -->
      <script src="{{asset('js/app.js')}}"></script>
      <!-- Specific to Page View-->
      @yield('script')

   </body>
</html>
