@extends('app')
@section('metas')
   <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('content')

   <div class="gallery-main" id="admin-gallery">
      <div class="page-header-box">
         <h1 class="page-header-title">Gallery</h1>
      </div>

      @include('global/gallery_grid')

      @if(count($images) > 0)
         <div class="grid">
            <div class="grid-sizer"></div>
            @foreach ($images as $image)
               <div class="grid-item" id="{{$image->slug}}">
                  <img class="image" src="{{asset('images').'/'.$image->file_name}}" alt="{{$image->slug}}" />
                  <div class="image-title-box">
                     <p class="image-title">{{$image->title}}</p>
                  </div>
               </div>
            @endforeach
         </div>
      @else
         <div>
            <h4>No images found...</h4>
         </div>
      @endif
   </div>

@endsection

@section('script')
<script src="{{asset('js/imageViewer.js')}}"></script>
<script src="{{asset('js/admin/gallery.js')}}"></script>
@endsection('script')
