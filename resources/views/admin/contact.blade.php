@extends('app')

@section('metas')
   <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('content')
   <h1>Contact Page</h1>
   <div class='contact-form-box'>
      {!! Form::open(array('url' => 'admin/contact/dummyContact', 'class' => 'contact-me-form', 'id'=>'admin-login')) !!}
         <input type="text" name="name" class="input-field contact-name" placeholder="Your name..."/>
         <input type="email" name="email" class="input-field contact-email" placeholder="Your email address..."/>
         <input type="textarea" name="message" class="input-field-large contact-message" placeholder="What do you want to say to Claire?..."/>
         <input type="submit"/>
      {!! Form::close() !!}
   </div>
@endsection


@section('script')
<script src="{{asset('js/admin/contact.js')}}"></script>
@endsection
