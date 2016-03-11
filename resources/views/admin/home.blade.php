@extends('app')

@section('content')
   <div class="admin-home main">
      <h1>Welcome, {{$user->first_name}}!</h1>
   </div>
@stop
