@extends('app')


@section('content')

<div>
   <h1>Login Page</h1>
</div>

<div class="form-box login">
   {!! Form::open(array('url' => 'admin/login/auth', 'class' => 'form login', 'id'=>'admin-login')) !!}
      {{ csrf_field() }}
      <input type="email" name="email" class="input-field admin-email" placeholder="Email Address"/>
      <input type="password" name="password" class="input-field admin-password" placeholder="Super Secret Password"/>
      <input type="submit"/>

   {!! Form::close() !!}
</div>

@endsection
