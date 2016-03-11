@extends('app')

@section('metas')
   <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('content')

   <div class="gallery-main" id="admin-gallery">
      <div class="page-header-box">
         <h1 class="page-header-title">Gallery - Edit</h1>
      </div>

      @if(count($images) > 0)
         <div class="grid">
            <div class="grid-sizer"></div>
            @foreach ($images as $image)
               <div class="grid-item editable" id="{{$image->slug}}">
                  <img class="image" src="{{asset('images').'/'.$image->file_name}}" alt="{{$image->slug}}" />
                  <div class="image-title-box editable">
                     <p class="image-title editable">{{$image->title}}</p>
                  </div>
                  <div this-image="{{$image->slug}}" class="image-edit-toolbelt">
                     <div class="toolbar-edit-title toolbelt-item fa fa-pencil"></div>
                     <div class="toolbar-edit-description toolbelt-item fa fa-align-left"></div>
                     <div class="toolbar-edit-delete toolbelt-item fa fa-times"></div>
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
<script src="{{asset('js/admin/gallery_edit.js')}}"></script>
@endsection
