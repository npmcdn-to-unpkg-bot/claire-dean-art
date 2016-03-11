@extends('app')

@section('content')

<div>
   <h1>Register as an Admin</h1>
</div>

@if (count($errors) > 0)
   <div class="error-box">
      @foreach ($errors->all() as $error)
         <p style="color:red">{{$error}}</p>
      @endforeach
   </div>
@endif

<div class="form-box register">
   {!! Form::open(array('url' => 'admin/register/auth', 'class' => 'form register', 'id'=>'admin-register')) !!}
      {!! csrf_field() !!}
      <input type="text" name="first_name" class="input-field" id="admin-first_name" value="{{ old('first_name') }}" placeholder="First Name"/>
      <input type="text" name="last_name" class="input-field" id="admin-last_name" value="{{ old('last_name') }}" placeholder="Last Name" />
      <input type="email" name="email" class="input-field" id="admin-email" value="{{ old('email') }}" placeholder="Email Address"/>
      <input type="password" name="password" class="input-field" id="admin-password" placeholder="Super Secret Password"/>
      <input type="submit"/>

   {!! Form::close() !!}
</div>

@endsection
