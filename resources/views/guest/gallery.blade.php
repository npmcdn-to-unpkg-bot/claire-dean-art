@extends('app')
@section('metas')
   <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('css')
   <link href="{{asset('css/admin/gallery.css')}}" rel="stylesheet" type="text/css"/>
@endsection

@section('content')



   <div class="gallery-main" id="admin-gallery">
      <div class="page-header-box">
         <h1 class="page-header-title">Gallery</h1>
      </div>

      @include('global/gallery_grid')

   </div>

@endsection

@section('script')
<script src="{{asset('js/imageViewer.js')}}"></script>
<script src="{{asset('js/admin/gallery.js')}}"></script>
@endsection('script')
