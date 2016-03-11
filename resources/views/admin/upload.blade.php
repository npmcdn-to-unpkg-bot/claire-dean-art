@extends('app')

@section('content')
<h3>Please upload files...</h3>

   {!! Form::open(array('url' => 'admin/gallery/upload/store', 'class' => 'form', 'files'=>true, 'id'=>'admin-gallery')) !!}

      <input type="text" name="title" class="input-field artwork-title" placeholder="Piece Title"/>
      <input type="file" name="artwork_file" placeholder="upload"/>
      <input type="submit"/>

   {!! Form::close() !!}
@stop
