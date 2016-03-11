@extends('app')

@section('metas')
   <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection


@section('content')
   <h1>About Edit Page</h1>
   <button class="save-wysiwig">Save WYSIWIG</button>

   <div class="wysiwyg-editor-window">
      @if($user->about_html != null)
         <div contentEditable=true id="all-editable-content" class="editable-content">
            {!!html_entity_decode($user->about_html)!!}
         </div>
      @else
         <div contentEditable=true id="all-editable-content" class="editable-content">
            <p>There is no content yet!</p>
         </div>
      @endif

   </div>


@endsection

@section('script')
<script src="{{asset('js/WYSIWYG.js')}}"></script>
<script src="{{asset('js/admin/about_edit.js')}}"></script>
@endsection
